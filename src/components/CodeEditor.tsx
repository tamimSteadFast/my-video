import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS, FONTS, LAYOUT, SHADOWS } from "../theme";

export interface CodeEditorProps {
  readonly code: string;
  /** 1-based line numbers (relative to the `code` string) to highlight */
  readonly highlightLines?: readonly number[];
  readonly highlightColor?: string;
  readonly typingStartFrame?: number;
  /** 1-based line numbers to dim to 40% opacity */
  readonly dimLines?: readonly number[];
  /** Number of characters already visible immediately before typingStartFrame (e.g. previous lines) */
  readonly preTypedLines?: number;
  readonly tabTitle?: string;
  /** Alias for tabTitle */
  readonly filename?: string;
  readonly charsPerFrame?: number;
  readonly fontSize?: number;
  readonly width?: number | string;
  /** Optional smooth vertical scroll offset in px (positive scrolls content upward) */
  readonly scrollOffsetY?: number;
  /** Optional max height for the code viewport when scrolling */
  readonly maxBodyHeight?: number;
  /** Optional line-number gutter width (default 58) */
  readonly gutterWidth?: number;
  readonly style?: React.CSSProperties;
}

interface Token {
  text: string;
  color: string;
}

function splitExpressions(text: string, baseColor: string): Token[] {
  const parts: Token[] = [];
  const exprRegex = /(\$\{\{[^}]*\}\})/g;
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = exprRegex.exec(text)) !== null) {
    if (m.index > lastIndex) {
      parts.push({ text: text.slice(lastIndex, m.index), color: baseColor });
    }
    parts.push({ text: m[1], color: "#D2A8FF" });
    lastIndex = m.index + m[1].length;
  }
  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), color: baseColor });
  }
  return parts.length > 0 ? parts : [{ text, color: baseColor }];
}

function tokenizeYamlLine(line: string): Token[] {
  if (!line) return [{ text: " ", color: COLORS.text }];

  const tokens: Token[] = [];
  const commentIdx = line.indexOf("#");
  const codePart = commentIdx >= 0 ? line.slice(0, commentIdx) : line;
  const commentPart = commentIdx >= 0 ? line.slice(commentIdx) : "";

  // Match indentation + optional list dash + key + colon + value
  const match = codePart.match(/^(\s*)(-\s+)?([A-Za-z0-9_-]+)(:)(.*)$/);
  if (match) {
    const [, indent, dash, key, colon, rest] = match;
    if (indent) tokens.push({ text: indent, color: COLORS.text });
    if (dash) tokens.push({ text: dash, color: COLORS.step });
    tokens.push({ text: key, color: "#79C0FF" });
    tokens.push({ text: colon, color: COLORS.muted });

    if (rest) {
      // Colorize special values
      const trimmed = rest.trim();
      if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
        const leadingSpace = rest.slice(0, rest.indexOf("["));
        const inner = trimmed.slice(1, -1);
        if (leadingSpace) tokens.push({ text: leadingSpace, color: COLORS.text });
        tokens.push({ text: "[", color: COLORS.muted });
        tokens.push({ text: inner, color: "#A5D6FF" });
        tokens.push({ text: "]", color: COLORS.muted });
      } else if (/^\d+$/.test(trimmed)) {
        tokens.push({ text: rest, color: "#F2CC60" });
      } else if (trimmed.includes("/") && trimmed.includes("@")) {
        tokens.push({ text: rest, color: "#7EE787" });
      } else if (key === "run") {
        tokens.push(...splitExpressions(rest, "#FFA657"));
      } else {
        tokens.push(...splitExpressions(rest, "#A5D6FF"));
      }
    }
  } else {
    // Multiline shell command inside `run: |`
    const shellMatch = codePart.match(/^(\s*)(mkdir|echo|chmod|ssh-keyscan|rsync)(\b.*)$/);
    if (shellMatch) {
      const [, indent, cmd, rest] = shellMatch;
      if (indent) tokens.push({ text: indent, color: COLORS.text });
      tokens.push({ text: cmd, color: "#7EE787" });
      tokens.push(...splitExpressions(rest, "#FFA657"));
    } else {
      tokens.push(...splitExpressions(codePart, COLORS.text));
    }
  }

  if (commentPart) {
    tokens.push({ text: commentPart, color: COLORS.muted });
  }

  return tokens;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  highlightLines = [],
  highlightColor = COLORS.event,
  typingStartFrame = 0,
  dimLines = [],
  preTypedLines = 0,
  tabTitle = "ci.yml",
  filename,
  charsPerFrame = 2,
  fontSize = 25,
  width = 960,
  scrollOffsetY = 0,
  maxBodyHeight,
  gutterWidth = 58,
  style,
}) => {
  const resolvedTabTitle = filename ?? tabTitle;
  const frame = useCurrentFrame();
  const allLines = code.split("\n");

  // Compute how many characters of the non-preTyped portion have been revealed
  const preLinesText =
    preTypedLines > 0 ? allLines.slice(0, preTypedLines).join("\n") + "\n" : "";
  const typingPart = code.slice(preLinesText.length);
  const elapsedTyping = Math.max(0, frame - typingStartFrame);
  const revealedTypingChars = Math.min(
    typingPart.length,
    Math.floor(elapsedTyping * charsPerFrame),
  );
  const totalRevealedChars = preLinesText.length + revealedTypingChars;
  const isActivelyTyping =
    frame >= typingStartFrame && revealedTypingChars < typingPart.length;

  const cursorVisible = Math.floor(frame / 14) % 2 === 0;

  // Map totalRevealedChars into per-line visible slices
  let remaining = totalRevealedChars;
  const renderedLines = allLines.map((line, idx) => {
    const lineNum = idx + 1;
    const take = Math.max(0, Math.min(line.length, remaining));
    const visibleText = line.slice(0, take);
    const isCursorLine =
      remaining >= 0 && remaining <= line.length && (isActivelyTyping || idx === allLines.length - 1);
    // Account for newline character
    remaining -= line.length + 1;
    return {
      lineNum,
      visibleText,
      isVisible: take > 0 || remaining >= -1 || lineNum <= preTypedLines,
      isCursorLine,
    };
  });

  const highlightSet = new Set(highlightLines);
  const dimSet = new Set(dimLines);

  return (
    <div
      style={{
        width,
        backgroundColor: COLORS.panel,
        borderRadius: LAYOUT.cardRadius,
        border: `1.5px solid ${COLORS.border}`,
        boxShadow: SHADOWS.card,
        overflow: "hidden",
        fontFamily: FONTS.code,
        ...style,
      }}
    >
      {/* VS Code Title Bar + Tab */}
      <div
        style={{
          height: 54,
          backgroundColor: "#11161D",
          borderBottom: `1px solid ${COLORS.border}`,
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          gap: 18,
        }}
      >
        <div style={{ display: "flex", gap: 9 }}>
          <div style={{ width: 13, height: 13, borderRadius: "50%", backgroundColor: "#FF5F56" }} />
          <div style={{ width: 13, height: 13, borderRadius: "50%", backgroundColor: "#FFBD2E" }} />
          <div style={{ width: 13, height: 13, borderRadius: "50%", backgroundColor: "#27C93F" }} />
        </div>
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            gap: 10,
            backgroundColor: COLORS.panel,
            padding: "0 20px",
            borderRight: `1px solid ${COLORS.border}`,
            borderLeft: `1px solid ${COLORS.border}`,
            borderTop: `2.5px solid ${highlightColor}`,
            fontFamily: FONTS.ui,
            fontSize: 19,
            fontWeight: 600,
            color: COLORS.text,
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 3,
              backgroundColor: highlightColor,
              display: "inline-block",
            }}
          />
          {resolvedTabTitle}
        </div>
        <div
          style={{
            marginLeft: "auto",
            fontFamily: FONTS.ui,
            fontSize: 15,
            color: COLORS.muted,
          }}
        >
          .github/workflows/{resolvedTabTitle}
        </div>
      </div>

      {/* Code Lines */}
      <div
        style={{
          overflow: "hidden",
          maxHeight: maxBodyHeight,
        }}
      >
        <div
          style={{
            padding: "18px 0 22px 0",
            transform: scrollOffsetY ? `translateY(${-scrollOffsetY}px)` : undefined,
          }}
        >
        {renderedLines.map(({ lineNum, visibleText, isVisible, isCursorLine }) => {
          const isHighlighted = highlightSet.has(lineNum);
          const isDimmed = dimSet.has(lineNum);
          const tokens = tokenizeYamlLine(visibleText);

          return (
            <div
              key={lineNum}
              style={{
                display: "flex",
                alignItems: "center",
                minHeight: Math.round(fontSize * 1.56),
                padding: "2px 24px 2px 0",
                position: "relative",
                backgroundColor: isHighlighted
                  ? `${highlightColor}24`
                  : "transparent",
                opacity: !isVisible ? 0 : isDimmed ? 0.4 : 1,
              }}
            >
              {/* Glowing left accent bar on highlighted lines */}
              {isHighlighted ? (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 5,
                    backgroundColor: highlightColor,
                    boxShadow: `0 0 14px ${highlightColor}`,
                  }}
                />
              ) : null}

              {/* Line Number Gutter */}
              <div
                style={{
                  width: gutterWidth,
                  textAlign: "right",
                  paddingRight: gutterWidth < 50 ? 12 : 20,
                  fontSize: Math.round(fontSize * 0.78),
                  color: isHighlighted ? highlightColor : "#484F58",
                  userSelect: "none",
                  flexShrink: 0,
                }}
              >
                {lineNum}
              </div>

              {/* Syntax-colored text */}
              <div
                style={{
                  fontSize,
                  lineHeight: 1.5,
                  whiteSpace: "pre",
                  color: COLORS.text,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {tokens.map((tok, i) => (
                  <span key={i} style={{ color: tok.color }}>
                    {tok.text}
                  </span>
                ))}
                {isCursorLine && cursorVisible && frame >= typingStartFrame ? (
                  <span
                    style={{
                      display: "inline-block",
                      width: 11,
                      height: fontSize * 1.05,
                      backgroundColor: highlightColor,
                      marginLeft: 2,
                      borderRadius: 2,
                    }}
                  />
                ) : null}
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
};
