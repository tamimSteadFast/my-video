import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";

export type CharacterName = "rafi" | "nadia";
export type CharacterExpression =
  | "neutral"
  | "tired"
  | "shocked"
  | "happy"
  | "smile"
  | "worried";

export interface CharacterProps {
  readonly name: CharacterName;
  readonly expression: CharacterExpression;
  readonly talking?: boolean;
  readonly size?: number;
  readonly style?: React.CSSProperties;
  /**
   * Set to true once PNG assets exist at public/characters/{name}-{expression}.png
   * to automatically swap the vector rig for raster art.
   */
  readonly usePng?: boolean;
  /** Optional subtle lighting tint (e.g. blue laptop glow in Scene 01) */
  readonly faceGlowColor?: string;
  readonly faceGlowOpacity?: number;
  /** Optional horizontal flip */
  readonly flipX?: boolean;
  /** Optional squash-and-stretch factor (1 = normal) */
  readonly stretchY?: number;
}

export const Character: React.FC<CharacterProps> = ({
  name,
  expression,
  talking = false,
  size = 320,
  style,
  usePng = false,
  faceGlowColor,
  faceGlowOpacity = 0,
  flipX = false,
  stretchY = 1,
}) => {
  const frame = useCurrentFrame();

  // Idle breathing bob (sine, 2px amplitude)
  const breathY = Math.sin((frame / 30) * Math.PI * 1.15) * 2;

  // Deterministic auto-blink every ~90 frames (offset per character so they don't blink in unison)
  const blinkOffset = name === "rafi" ? 18 : 52;
  const blinkCycle = (frame + blinkOffset) % 90;
  const isBlinking =
    expression !== "shocked" && blinkCycle >= 84 && blinkCycle <= 87;
  const eyeScaleY = isBlinking
    ? interpolate(blinkCycle, [84, 85.5, 87], [1, 0.08, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  // Animated mouth flap while talking=true (frame-based, multi-aperture)
  const talkPhase = Math.sin(frame * 0.72) * 0.5 + 0.5;
  const talkPhase2 = Math.sin(frame * 1.15 + 1.2) * 0.5 + 0.5;
  const mouthOpen = talking ? 0.25 + 0.75 * talkPhase * (0.6 + 0.4 * talkPhase2) : 0;

  // Squash & stretch inverse width preservation
  const stretchX = stretchY !== 1 ? 1 / Math.sqrt(stretchY) : 1;

  if (usePng) {
    return (
      <div
        style={{
          width: size,
          height: size * 1.15,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          transform: `translateY(${breathY.toFixed(2)}px) scale(${
            (flipX ? -1 : 1) * stretchX
          }, ${stretchY})`,
          transformOrigin: "bottom center",
          ...style,
        }}
      >
        <Img
          src={staticFile(`characters/${name}-${expression}.png`)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>
    );
  }

  const isRafi = name === "rafi";
  const skinBase = isRafi ? "#D8A47F" : "#DFB08E";
  const skinShadow = isRafi ? "#C48D68" : "#CA9874";
  const hairColor = "#1B1D26";
  const glowId = `face-glow-${name}-${expression}`;

  const renderEyebrows = () => {
    if (expression === "worried") {
      return (
        <>
          <path
            d="M 102 117 Q 115 114 129 107"
            stroke={hairColor}
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 151 107 Q 165 114 178 117"
            stroke={hairColor}
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />
        </>
      );
    }
    if (expression === "tired") {
      return (
        <>
          <path
            d="M 103 116 Q 116 112 128 119"
            stroke={hairColor}
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 152 119 Q 164 112 177 116"
            stroke={hairColor}
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />
        </>
      );
    }
    if (expression === "shocked") {
      return (
        <>
          <path
            d="M 102 106 Q 116 96 130 105"
            stroke={hairColor}
            strokeWidth="4.8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 150 105 Q 164 96 178 106"
            stroke={hairColor}
            strokeWidth="4.8"
            strokeLinecap="round"
            fill="none"
          />
        </>
      );
    }
    if (expression === "happy" || expression === "smile") {
      return (
        <>
          <path
            d="M 103 111 Q 116 105 129 111"
            stroke={hairColor}
            strokeWidth="4.4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 151 111 Q 164 105 177 111"
            stroke={hairColor}
            strokeWidth="4.4"
            strokeLinecap="round"
            fill="none"
          />
        </>
      );
    }
    return (
      <>
        <path
          d="M 104 113 Q 116 110 128 113"
          stroke={hairColor}
          strokeWidth="4.4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 152 113 Q 164 110 176 113"
          stroke={hairColor}
          strokeWidth="4.4"
          strokeLinecap="round"
          fill="none"
        />
      </>
    );
  };

  const renderEyes = () => {
    const leftX = 117;
    const rightX = 163;
    const eyeY = 131;

    if (expression === "shocked") {
      return (
        <g>
          <circle cx={leftX} cy={eyeY} r={11.5} fill="#FFFFFF" stroke="#1F2430" strokeWidth="2.5" />
          <circle cx={leftX} cy={eyeY} r={4.5} fill="#141824" />
          <circle cx={leftX + 2.5} cy={eyeY - 2.5} r={1.8} fill="#FFFFFF" />
          <circle cx={rightX} cy={eyeY} r={11.5} fill="#FFFFFF" stroke="#1F2430" strokeWidth="2.5" />
          <circle cx={rightX} cy={eyeY} r={4.5} fill="#141824" />
          <circle cx={rightX + 2.5} cy={eyeY - 2.5} r={1.8} fill="#FFFFFF" />
        </g>
      );
    }

    if (expression === "happy") {
      return (
        <g
          transform={`translate(0, ${eyeY}) scale(1, ${eyeScaleY}) translate(0, ${-eyeY})`}
        >
          <path
            d={`M ${leftX - 9} ${eyeY + 2} Q ${leftX} ${eyeY - 9} ${leftX + 9} ${eyeY + 2}`}
            stroke="#161A24"
            strokeWidth="4.2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d={`M ${rightX - 9} ${eyeY + 2} Q ${rightX} ${eyeY - 9} ${rightX + 9} ${eyeY + 2}`}
            stroke="#161A24"
            strokeWidth="4.2"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      );
    }

    return (
      <g>
        <g
          transform={`translate(0, ${eyeY}) scale(1, ${eyeScaleY}) translate(0, ${-eyeY})`}
        >
          <ellipse cx={leftX} cy={eyeY} rx={7.5} ry={expression === "tired" ? 6 : 8} fill="#161A24" />
          <circle cx={leftX + 2.2} cy={eyeY - 2.5} r={2.3} fill="#FFFFFF" />
          <ellipse cx={rightX} cy={eyeY} rx={7.5} ry={expression === "tired" ? 6 : 8} fill="#161A24" />
          <circle cx={rightX + 2.2} cy={eyeY - 2.5} r={2.3} fill="#FFFFFF" />
          {expression === "tired" ? (
            <>
              <rect x={leftX - 9} y={eyeY - 8} width={18} height={6} fill={skinBase} />
              <rect x={rightX - 9} y={eyeY - 8} width={18} height={6} fill={skinBase} />
              <line x1={leftX - 9} y1={eyeY - 2} x2={leftX + 9} y2={eyeY - 2} stroke="#2B2F3D" strokeWidth="2.5" strokeLinecap="round" />
              <line x1={rightX - 9} y1={eyeY - 2} x2={rightX + 9} y2={eyeY - 2} stroke="#2B2F3D" strokeWidth="2.5" strokeLinecap="round" />
            </>
          ) : null}
        </g>
        {expression === "tired" ? (
          <>
            <path
              d={`M ${leftX - 9} ${eyeY + 10} Q ${leftX} ${eyeY + 15} ${leftX + 9} ${eyeY + 10}`}
              stroke="#7B5E7B"
              strokeOpacity="0.55"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d={`M ${rightX - 9} ${eyeY + 10} Q ${rightX} ${eyeY + 15} ${rightX + 9} ${eyeY + 10}`}
              stroke="#7B5E7B"
              strokeOpacity="0.55"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </>
        ) : null}
      </g>
    );
  };

  const renderMouth = () => {
    const cx = 140;
    const cy = 166;

    if (talking) {
      const h = 5 + mouthOpen * 12;
      const w = 13 + mouthOpen * 4;
      return (
        <g>
          <path
            d={`M ${cx - w} ${cy - 2} Q ${cx} ${cy - 5} ${cx + w} ${cy - 2} Q ${cx} ${cy + h * 1.4} ${cx - w} ${cy - 2} Z`}
            fill="#6E2832"
            stroke="#2B1A1E"
            strokeWidth="2.2"
          />
          {mouthOpen > 0.45 ? (
            <ellipse
              cx={cx}
              cy={cy + h * 0.52}
              rx={w * 0.45}
              ry={h * 0.28}
              fill="#D96B78"
            />
          ) : null}
          <path
            d={`M ${cx - w * 0.72} ${cy - 1} L ${cx + w * 0.72} ${cy - 1}`}
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      );
    }

    if (expression === "shocked") {
      return (
        <ellipse
          cx={cx}
          cy={cy + 2}
          rx={10}
          ry={13}
          fill="#6E2832"
          stroke="#2B1A1E"
          strokeWidth="2.8"
        />
      );
    }
    if (expression === "happy") {
      return (
        <g>
          <path
            d={`M ${cx - 18} ${cy - 3} Q ${cx} ${cy + 22} ${cx + 18} ${cy - 3} Z`}
            fill="#7D2E39"
            stroke="#2B1A1E"
            strokeWidth="2.4"
          />
          <path
            d={`M ${cx - 14} ${cy - 2} L ${cx + 14} ${cy - 2}`}
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
      );
    }
    if (expression === "smile") {
      return (
        <path
          d={`M ${cx - 14} ${cy - 1} Q ${cx} ${cy + 13} ${cx + 14} ${cy - 1}`}
          stroke="#2B1A1E"
          strokeWidth="3.8"
          strokeLinecap="round"
          fill="none"
        />
      );
    }
    if (expression === "worried") {
      return (
        <path
          d={`M ${cx - 13} ${cy + 6} Q ${cx} ${cy - 4} ${cx + 13} ${cy + 6}`}
          stroke="#2B1A1E"
          strokeWidth="3.6"
          strokeLinecap="round"
          fill="none"
        />
      );
    }
    if (expression === "tired") {
      return (
        <path
          d={`M ${cx - 12} ${cy + 5} Q ${cx} ${cy - 2} ${cx + 12} ${cy + 5}`}
          stroke="#2B1A1E"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
      );
    }
    return (
      <path
        d={`M ${cx - 11} ${cy + 1} Q ${cx} ${cy + 4} ${cx + 11} ${cy + 1}`}
        stroke="#2B1A1E"
        strokeWidth="3.4"
        strokeLinecap="round"
        fill="none"
      />
    );
  };

  return (
    <div
      style={{
        width: size,
        height: size * 1.15,
        display: "inline-flex",
        alignItems: "flex-end",
        justifyContent: "center",
        transform: `translateY(${breathY.toFixed(2)}px) scale(${
          (flipX ? -1 : 1) * stretchX
        }, ${stretchY})`,
        transformOrigin: "bottom center",
        ...style,
      }}
    >
      <svg
        viewBox="0 0 280 320"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {faceGlowColor && faceGlowOpacity > 0 ? (
            <radialGradient id={glowId} cx="50%" cy="62%" r="55%">
              <stop
                offset="0%"
                stopColor={faceGlowColor}
                stopOpacity={faceGlowOpacity}
              />
              <stop offset="100%" stopColor={faceGlowColor} stopOpacity="0" />
            </radialGradient>
          ) : null}
        </defs>

        {/* Subtle ground/drop shadow */}
        <ellipse cx="140" cy="308" rx="92" ry="10" fill="rgba(0,0,0,0.28)" />

        {/* Back hair for Nadia */}
        {!isRafi ? (
          <path
            d="M 80 120 C 72 175 76 232 95 258 L 185 258 C 204 232 208 175 200 120 C 194 74 172 52 140 52 C 108 52 86 74 80 120 Z"
            fill={hairColor}
          />
        ) : null}

        {/* Torso / Outfit */}
        {isRafi ? (
          /* Rafi: Dark grey hoodie */
          <g>
            <path
              d="M 52 308 C 54 242 78 210 112 204 L 168 204 C 202 210 226 242 228 308 Z"
              fill="#2B313C"
            />
            {/* Hoodie shoulder shading */}
            <path
              d="M 52 308 C 56 254 74 222 104 210 L 106 308 Z"
              fill="#222731"
            />
            <path
              d="M 228 308 C 224 254 206 222 176 210 L 174 308 Z"
              fill="#222731"
            />
            {/* Hood collar */}
            <path
              d="M 96 208 Q 140 236 184 208 Q 178 242 140 246 Q 102 242 96 208 Z"
              fill="#38404E"
            />
            {/* Hoodie drawstrings */}
            <path
              d="M 122 234 L 118 282"
              stroke="#C9D1D9"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M 158 234 L 162 282"
              stroke="#C9D1D9"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle cx="118" cy="284" r="3" fill="#8B949E" />
            <circle cx="162" cy="284" r="3" fill="#8B949E" />
          </g>
        ) : (
          /* Nadia Apu: Teal kurti with draped scarf */
          <g>
            <path
              d="M 56 308 C 60 244 82 212 114 205 L 166 205 C 198 212 220 244 224 308 Z"
              fill="#157F82"
            />
            {/* Kurti neckline embroidery */}
            <path
              d="M 118 208 L 140 238 L 162 208"
              fill="none"
              stroke="#7EE7E2"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1="140"
              y1="238"
              x2="140"
              y2="278"
              stroke="#7EE7E2"
              strokeWidth="2.2"
              strokeDasharray="4 4"
            />
            {/* Draped scarf (ornna) over left shoulder */}
            <path
              d="M 86 208 C 98 232 128 242 162 234 C 188 228 202 216 208 236 L 218 308 L 178 308 L 168 248 C 134 256 102 252 78 234 Z"
              fill="#1FA6A8"
            />
            <path
              d="M 74 218 C 86 238 118 248 158 240 L 144 308 L 76 308 Z"
              fill="#12686B"
              opacity="0.38"
            />
            {/* Scarf accent stripe */}
            <path
              d="M 88 222 C 118 242 160 242 198 228"
              fill="none"
              stroke="#A5F3FC"
              strokeWidth="2.4"
              opacity="0.65"
            />
          </g>
        )}

        {/* Neck */}
        <rect x="122" y="182" width="36" height="32" rx="14" fill={skinShadow} />

        {/* Ears */}
        <ellipse cx="86" cy="136" rx="10" ry="14" fill={skinShadow} />
        <ellipse cx="194" cy="136" rx="10" ry="14" fill={skinShadow} />

        {/* Head */}
        <rect x="88" y="66" width="104" height="128" rx="48" fill={skinBase} />

        {/* Cheek blush for happy/smile */}
        {expression === "happy" || expression === "smile" ? (
          <>
            <ellipse cx="106" cy="152" rx="10" ry="5.5" fill="#E87A7A" opacity="0.28" />
            <ellipse cx="174" cy="152" rx="10" ry="5.5" fill="#E87A7A" opacity="0.28" />
          </>
        ) : null}

        {/* Subtle nose */}
        <path
          d="M 140 135 L 137 148 Q 140 151 144 148"
          stroke={skinShadow}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Hair Front */}
        {isRafi ? (
          /* Rafi: short black hair */
          <path
            d="M 84 122 C 82 82 104 54 142 54 C 178 54 198 80 196 122 C 190 98 178 88 164 84 C 152 94 128 96 108 86 C 95 92 88 106 84 122 Z"
            fill={hairColor}
          />
        ) : (
          /* Nadia: parted dark hair framing face */
          <>
            <path
              d="M 84 126 C 84 78 106 54 140 54 C 174 54 196 78 196 126 C 186 98 166 86 146 82 C 122 86 96 98 84 126 Z"
              fill={hairColor}
            />
            <path
              d="M 142 56 C 126 70 104 82 86 106"
              stroke="#2D3142"
              strokeWidth="2.5"
              fill="none"
              opacity="0.55"
            />
          </>
        )}

        {/* Facial features */}
        {renderEyebrows()}
        {renderEyes()}
        {renderMouth()}

        {/* Nadia's Glasses */}
        {!isRafi ? (
          <g>
            <rect
              x="98"
              y="117"
              width="38"
              height="27"
              rx="10"
              fill="rgba(255,255,255,0.12)"
              stroke="#202836"
              strokeWidth="3.6"
            />
            <rect
              x="144"
              y="117"
              width="38"
              height="27"
              rx="10"
              fill="rgba(255,255,255,0.12)"
              stroke="#202836"
              strokeWidth="3.6"
            />
            <path
              d="M 136 129 Q 140 126 144 129"
              stroke="#202836"
              strokeWidth="3.4"
              fill="none"
            />
            <line x1="90" y1="127" x2="98" y2="128" stroke="#202836" strokeWidth="3.2" />
            <line x1="182" y1="128" x2="190" y2="127" stroke="#202836" strokeWidth="3.2" />
            {/* Subtle lens reflection */}
            <line
              x1="104"
              y1="122"
              x2="112"
              y2="122"
              stroke="#FFFFFF"
              strokeOpacity="0.5"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <line
              x1="150"
              y1="122"
              x2="158"
              y2="122"
              stroke="#FFFFFF"
              strokeOpacity="0.5"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </g>
        ) : null}

        {/* Optional face glow overlay (e.g., laptop screen light in Scene 01) */}
        {faceGlowColor && faceGlowOpacity > 0 ? (
          <rect
            x="88"
            y="66"
            width="104"
            height="128"
            rx="48"
            fill={`url(#${glowId})`}
          />
        ) : null}
      </svg>
    </div>
  );
};
