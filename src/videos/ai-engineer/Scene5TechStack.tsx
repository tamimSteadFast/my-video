import React from "react";
import { interpolate, spring } from "remotion";
import { SPRING_HEADLINE, SPRING_UI } from "../../shared/theme";
import { AIE_C, AIE_DISPLAY, AIE_LEAD_SEC, AIE_MONO } from "./narration";
import { AieSceneShell, useAieVoice } from "./SceneShell";

const STACK_ITEMS = [
  { name: "Python", sub: "Core AI & Backend", atSec: 1.75, accent: "#38BDF8" },
  { name: "JavaScript", sub: "Frontend & Full-Stack", atSec: 2.5, accent: "#F59E0B" },
  { name: "FastAPI", sub: "High-Speed Backend API", atSec: 3.55, accent: "#10B981" },
  { name: "Large Language Models", sub: "GPT • Gemini • Claude", atSec: 4.55, accent: "#A855F7" },
  { name: "Vector Database", sub: "Embeddings & Semantic Search", atSec: 5.95, accent: "#00E5FF" },
  { name: "LangChain", sub: "Chains, RAG & Agents", atSec: 7.1, accent: "#818CF8" },
] as const;

const CODE_LINES = [
  { num: "01", code: "from fastapi import FastAPI", accent: "#10B981", minSec: 1.75, hiStart: 1.75, hiEnd: 4.5 },
  { num: "02", code: "from langchain_core.prompts import ChatPromptTemplate", accent: "#818CF8", minSec: 7.1, hiStart: 7.1, hiEnd: 8.1 },
  { num: "03", code: "from services import vector_db, llm_client", accent: "#A855F7", minSec: 4.55, hiStart: 4.55, hiEnd: 7.05 },
  { num: "04", code: "", accent: "#64748B", minSec: 0, hiStart: 99, hiEnd: 99 },
  { num: "05", code: "app = FastAPI(title='AI-Engineer-API')", accent: "#10B981", minSec: 3.55, hiStart: 3.55, hiEnd: 4.55 },
  { num: "06", code: "", accent: "#64748B", minSec: 0, hiStart: 99, hiEnd: 99 },
  { num: "07", code: "@app.post('/v1/intelligent-query')", accent: "#38BDF8", minSec: 3.55, hiStart: 3.55, hiEnd: 4.55 },
  { num: "08", code: "async def handle_query(prompt: str):", accent: "#38BDF8", minSec: 1.75, hiStart: 1.75, hiEnd: 2.5 },
  { num: "09", code: "    docs = await vector_db.search(prompt, top_k=5)", accent: "#00E5FF", minSec: 5.95, hiStart: 5.95, hiEnd: 7.1 },
  { num: "10", code: "    answer = await llm_client.generate(prompt, docs)", accent: "#C084FC", minSec: 4.55, hiStart: 4.55, hiEnd: 5.95 },
  { num: "11", code: "    return {'status': 'ok', 'response': answer}", accent: "#34D399", minSec: 7.9, hiStart: 7.9, hiEnd: 11.4 },
] as const;

export const Scene5TechStack: React.FC<{
  readonly showSubtitles?: boolean;
}> = ({ showSubtitles = true }) => {
  const { frame, fps, voiceSec } = useAieVoice("scene5");

  const editorP = spring({
    frame: frame - Math.round((AIE_LEAD_SEC + 0.15) * fps),
    fps,
    config: SPRING_HEADLINE,
  });

  const cloudP = spring({
    frame: frame - Math.round((AIE_LEAD_SEC + 7.9) * fps),
    fps,
    config: SPRING_HEADLINE,
  });

  const cloudLit = voiceSec >= 7.9;

  return (
    <AieSceneShell
      id="scene5"
      showSubtitles={showSubtitles}
      backdropImage="ai-engineer/server-cloud-backdrop.png"
      backdropOpacity={0.35}
      sfx={[
        { atSec: AIE_LEAD_SEC + 1.75, type: "click", volume: 0.2 },
        { atSec: AIE_LEAD_SEC + 2.5, type: "click", volume: 0.2 },
        { atSec: AIE_LEAD_SEC + 3.55, type: "click", volume: 0.2 },
        { atSec: AIE_LEAD_SEC + 4.55, type: "pop", volume: 0.22 },
        { atSec: AIE_LEAD_SEC + 5.95, type: "pop", volume: 0.22 },
        { atSec: AIE_LEAD_SEC + 7.1, type: "pop", volume: 0.22 },
        { atSec: AIE_LEAD_SEC + 7.9, type: "chime", volume: 0.28 },
      ]}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "0.98fr 1.02fr",
          gap: 28,
          height: "100%",
          paddingTop: 10,
          paddingBottom: 14,
        }}
      >
        {/* LEFT MONITOR: Live Python / FastAPI / LLM / Vector DB Code & Terminal */}
        <div
          style={{
            opacity: editorP,
            transform: `translate3d(${interpolate(editorP, [0, 1], [-22, 0])}px, 0px, 0px)`,
            background: "rgba(6, 10, 26, 0.92)",
            border: `1.5px solid ${AIE_C.borderBlue}`,
            borderRadius: 22,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            backdropFilter: "blur(16px)",
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.65)",
          }}
        >
          {/* IDE Title Bar */}
          <div
            style={{
              height: 52,
              padding: "0 20px",
              background: "rgba(12, 18, 42, 0.95)",
              borderBottom: `1px solid ${AIE_C.borderSubtle}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 11, height: 11, borderRadius: 99, background: "#F43F5E" }} />
              <span style={{ width: 11, height: 11, borderRadius: 99, background: "#F59E0B" }} />
              <span style={{ width: 11, height: 11, borderRadius: 99, background: "#10B981" }} />
              <span style={{ fontFamily: AIE_MONO, fontSize: 14, color: "#E2E8F0", marginLeft: 10 }}>
                ai_backend_service.py
              </span>
            </div>
            <span style={{ fontFamily: AIE_MONO, fontSize: 12, color: AIE_C.cyan }}>
              PYTHON 3.12 · FASTAPI
            </span>
          </div>

          {/* Code Canvas */}
          <div
            style={{
              padding: "24px 22px",
              fontFamily: AIE_MONO,
              fontSize: 17.5,
              lineHeight: 1.92,
              flex: 1,
            }}
          >
            {CODE_LINES.map((line) => {
              const revealed = voiceSec >= line.minSec || line.minSec === 0;
              const spotlight = voiceSec >= line.hiStart && voiceSec <= line.hiEnd;
              return (
                <div
                  key={line.num}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: "2px 10px",
                    borderRadius: 8,
                    background: spotlight ? `${line.accent}22` : "transparent",
                    borderLeft: spotlight ? `3px solid ${line.accent}` : "3px solid transparent",
                    opacity: revealed ? 1 : 0.25,
                  }}
                >
                  <span style={{ color: "#475569", fontSize: 13, width: 24, flexShrink: 0 }}>
                    {line.num}
                  </span>
                  <span style={{ color: revealed ? line.accent : "#64748B", whiteSpace: "pre" }}>
                    {line.code}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Live Vector & Cloud Telemetry Terminal */}
          <div
            style={{
              background: "rgba(9, 13, 34, 0.96)",
              borderTop: `1px solid ${AIE_C.borderPurple}`,
              padding: "16px 22px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              fontFamily: AIE_MONO,
              fontSize: 13.5,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", color: AIE_C.textDim }}>
              <span>RUNTIME TELEMETRY</span>
              <span style={{ color: AIE_C.emerald }}>● CONNECTED</span>
            </div>
            <div style={{ color: "#BAE6FD" }}>
              ▸ POST /v1/intelligent-query → Vector DB (14ms) → LLM Stream (200 OK)
            </div>
            <div style={{ color: "#D8B4FE" }}>
              ▸ Embedding: [0.842, -0.319, 0.504, 0.912, ...] · Cloud Region: Global Edge
            </div>
          </div>
        </div>

        {/* RIGHT MONITOR: 7 Core Technologies Illuminating On-Beat */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              flex: 1,
            }}
          >
            {STACK_ITEMS.map((item, idx) => {
              const sp = spring({
                frame: frame - Math.round((AIE_LEAD_SEC + item.atSec) * fps),
                fps,
                config: SPRING_UI,
              });
              const lit = voiceSec >= item.atSec;
              const nextSec = STACK_ITEMS[idx + 1]?.atSec ?? 7.9;
              const isCurrent = lit && voiceSec < nextSec;
              return (
                <div
                  key={item.name}
                  style={{
                    background: lit
                      ? "linear-gradient(145deg, rgba(13, 20, 48, 0.94), rgba(26, 15, 58, 0.92))"
                      : "rgba(9, 14, 34, 0.55)",
                    border: `1.5px solid ${lit ? item.accent : AIE_C.borderSubtle}`,
                    borderRadius: 20,
                    padding: "22px 24px",
                    opacity: 0.25 + sp * 0.75,
                    transform: `scale(${isCurrent ? 1.03 : interpolate(sp, [0, 1], [0.95, 1])})`,
                    boxShadow: isCurrent
                      ? `0 18px 46px ${item.accent}35`
                      : lit
                        ? "0 12px 30px rgba(0, 0, 0, 0.45)"
                        : "none",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span
                      style={{
                        fontFamily: AIE_MONO,
                        fontSize: 12,
                        fontWeight: 700,
                        color: item.accent,
                        letterSpacing: 1.2,
                      }}
                    >
                      TECH 0{idx + 1}
                    </span>
                    <span
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 99,
                        background: lit ? item.accent : AIE_C.textDim,
                        boxShadow: lit ? `0 0 12px ${item.accent}` : "none",
                      }}
                    />
                  </div>
                  <div>
                    <div style={{ fontFamily: AIE_DISPLAY, fontSize: 26, fontWeight: 800, color: AIE_C.text, marginBottom: 6 }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: 15, color: AIE_C.textMuted }}>
                      {item.sub}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cloud Technologies Full-Width Infrastructure Card (7.90s) */}
          <div
            style={{
              height: 196,
              background: cloudLit
                ? "linear-gradient(135deg, rgba(12, 24, 58, 0.96), rgba(44, 18, 92, 0.94))"
                : "rgba(9, 14, 34, 0.55)",
              border: `1.5px solid ${cloudLit ? AIE_C.cyan : AIE_C.borderSubtle}`,
              borderRadius: 22,
              padding: "22px 28px",
              opacity: 0.25 + cloudP * 0.75,
              transform: `translate3d(0px, ${interpolate(cloudP, [0, 1], [18, 0])}px, 0px)`,
              boxShadow: cloudLit ? "0 20px 55px rgba(56, 189, 248, 0.26)" : "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: AIE_MONO, fontSize: 12.5, color: AIE_C.cyan, letterSpacing: 1.5 }}>
                  TECH 07 · INFRASTRUCTURE &amp; SCALE
                </div>
                <div style={{ fontFamily: AIE_DISPLAY, fontSize: 30, fontWeight: 800, color: AIE_C.text, marginTop: 4 }}>
                  Cloud Technologies
                </div>
              </div>
              <div
                style={{
                  fontFamily: AIE_MONO,
                  fontSize: 13,
                  color: AIE_C.emerald,
                  background: "rgba(16, 185, 129, 0.14)",
                  border: "1px solid rgba(16, 185, 129, 0.4)",
                  padding: "6px 14px",
                  borderRadius: 99,
                }}
              >
                ● AUTO-SCALING READY
              </div>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              {["Docker Containers", "AWS / Google Cloud", "Kubernetes", "Serverless GPU", "CI/CD Pipelines"].map(
                (pill) => (
                  <div
                    key={pill}
                    style={{
                      fontFamily: AIE_MONO,
                      fontSize: 13,
                      color: "#E0F2FE",
                      background: "rgba(56, 189, 248, 0.14)",
                      border: `1px solid ${AIE_C.borderBlue}`,
                      padding: "8px 14px",
                      borderRadius: 10,
                    }}
                  >
                    {pill}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </AieSceneShell>
  );
};
