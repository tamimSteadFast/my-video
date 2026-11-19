import React from "react";
import { interpolate, spring } from "remotion";
import { SPRING_HEADLINE, SPRING_UI } from "../../shared/theme";
import { AIE_C, AIE_DISPLAY, AIE_LEAD_SEC, AIE_MONO } from "./narration";
import { AieSceneShell, useAieVoice } from "./SceneShell";

const TRAD_ITEMS = [
  { label: "Product Management", sub: "Catalog, Pricing & Inventory", atSec: 5.0 },
  { label: "Database", sub: "Users, Orders & Transactions", atSec: 6.45 },
  { label: "REST API", sub: "Auth, Cart & Order Endpoints", atSec: 7.45 },
  { label: "Payment System", sub: "Encrypted Checkout Gateway", atSec: 8.45 },
] as const;

const PRODUCTS = [
  { name: "Neural Studio Headphones", price: "$249", match: "98% AI Match", tag: "Audio" },
  { name: "Mechanical Dev Keyboard", price: "$179", match: "95% AI Match", tag: "Setup" },
  { name: "4K Ultrawide Monitor", price: "$699", match: "93% AI Match", tag: "Display" },
] as const;

export const Scene3EcommerceApp: React.FC<{
  readonly showSubtitles?: boolean;
}> = ({ showSubtitles = true }) => {
  const { frame, fps, voiceSec } = useAieVoice("scene3");

  const appP = spring({
    frame: frame - Math.round((AIE_LEAD_SEC + 0.1) * fps),
    fps,
    config: SPRING_HEADLINE,
  });

  const tradHeaderP = spring({
    frame: frame - Math.round((AIE_LEAD_SEC + 3.25) * fps),
    fps,
    config: SPRING_UI,
  });

  const aiRecP = spring({
    frame: frame - Math.round((AIE_LEAD_SEC + 10.35) * fps),
    fps,
    config: SPRING_HEADLINE,
  });

  const aiChatP = spring({
    frame: frame - Math.round((AIE_LEAD_SEC + 14.55) * fps),
    fps,
    config: SPRING_HEADLINE,
  });

  const aiModeActive = voiceSec >= 10.35;

  return (
    <AieSceneShell
      id="scene3"
      showSubtitles={showSubtitles}
      backdropImage="ai-engineer/server-cloud-backdrop.png"
      backdropOpacity={0.28}
      sfx={[
        { atSec: AIE_LEAD_SEC + 5.0, type: "click", volume: 0.2 },
        { atSec: AIE_LEAD_SEC + 6.45, type: "click", volume: 0.2 },
        { atSec: AIE_LEAD_SEC + 7.45, type: "click", volume: 0.2 },
        { atSec: AIE_LEAD_SEC + 8.45, type: "click", volume: 0.2 },
        { atSec: AIE_LEAD_SEC + 10.35, type: "chime", volume: 0.28 },
        { atSec: AIE_LEAD_SEC + 14.55, type: "pop", volume: 0.28 },
      ]}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "385px 1fr 405px",
          gap: 24,
          height: "100%",
          paddingTop: 10,
          paddingBottom: 12,
        }}
      >
        {/* LEFT COLUMN: Traditional Software Engineer */}
        <div
          style={{
            background: AIE_C.panel,
            border: `1.5px solid ${!aiModeActive && voiceSec >= 3.25 ? AIE_C.blue : AIE_C.borderSubtle}`,
            borderRadius: 22,
            padding: 22,
            display: "flex",
            flexDirection: "column",
            gap: 14,
            opacity: 0.28 + tradHeaderP * 0.72,
            transform: `translate3d(${interpolate(tradHeaderP, [0, 1], [-22, 0])}px, 0px, 0px)`,
            backdropFilter: "blur(14px)",
          }}
        >
          <div style={{ borderBottom: `1px solid ${AIE_C.borderSubtle}`, paddingBottom: 14 }}>
            <div style={{ fontFamily: AIE_MONO, fontSize: 12, color: AIE_C.blue, letterSpacing: 1.4 }}>
              FOUNDATION LAYER
            </div>
            <div style={{ fontFamily: AIE_DISPLAY, fontSize: 25, fontWeight: 800, color: AIE_C.text, marginTop: 4 }}>
              Traditional Software Engineer
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, flex: 1, justifyContent: "center" }}>
            {TRAD_ITEMS.map((item, idx) => {
              const p = spring({
                frame: frame - Math.round((AIE_LEAD_SEC + item.atSec) * fps),
                fps,
                config: SPRING_UI,
              });
              const active = voiceSec >= item.atSec;
              return (
                <div
                  key={item.label}
                  style={{
                    background: active ? "rgba(56, 189, 248, 0.12)" : "rgba(15, 23, 42, 0.55)",
                    border: `1px solid ${active ? AIE_C.blue : AIE_C.borderSubtle}`,
                    borderRadius: 14,
                    padding: "16px 18px",
                    opacity: 0.3 + p * 0.7,
                    transform: `translate3d(${interpolate(p, [0, 1], [-14, 0])}px, 0px, 0px)`,
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 10,
                      background: active ? "rgba(56, 189, 248, 0.24)" : "rgba(148, 163, 184, 0.12)",
                      color: active ? AIE_C.cyan : AIE_C.textDim,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: AIE_MONO,
                      fontWeight: 700,
                      fontSize: 15,
                      flexShrink: 0,
                    }}
                  >
                    {active ? "✓" : `0${idx + 1}`}
                  </div>
                  <div>
                    <div style={{ fontFamily: AIE_DISPLAY, fontSize: 19, fontWeight: 700, color: AIE_C.text }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: 13.5, color: AIE_C.textMuted, marginTop: 2 }}>
                      {item.sub}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CENTER STAGE: Live E-Commerce Application Interface */}
        <div
          style={{
            background: "linear-gradient(180deg, #0A1128 0%, #0D1433 100%)",
            border: `1.5px solid ${aiModeActive ? AIE_C.purple : AIE_C.borderBlue}`,
            borderRadius: 24,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            opacity: appP,
            transform: `scale(${interpolate(appP, [0, 1], [0.95, 1])})`,
            boxShadow: aiModeActive
              ? "0 26px 70px rgba(124, 58, 237, 0.32)"
              : "0 22px 54px rgba(0, 0, 0, 0.6)",
          }}
        >
          {/* App Browser Top Bar */}
          <div
            style={{
              height: 54,
              padding: "0 20px",
              background: "rgba(6, 10, 26, 0.92)",
              borderBottom: `1px solid ${AIE_C.borderSubtle}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 11, height: 11, borderRadius: 99, background: "#F43F5E" }} />
              <span style={{ width: 11, height: 11, borderRadius: 99, background: "#F59E0B" }} />
              <span style={{ width: 11, height: 11, borderRadius: 99, background: "#10B981" }} />
              <span style={{ fontFamily: AIE_DISPLAY, fontSize: 18, fontWeight: 800, color: AIE_C.text, marginLeft: 12 }}>
                NovaShop
              </span>
              <span
                style={{
                  fontFamily: AIE_MONO,
                  fontSize: 11,
                  color: aiModeActive ? AIE_C.purple : AIE_C.blue,
                  background: aiModeActive ? "rgba(168, 85, 247, 0.2)" : "rgba(56, 189, 248, 0.14)",
                  padding: "3px 9px",
                  borderRadius: 6,
                }}
              >
                {aiModeActive ? "AI-POWERED STORE" : "E-COMMERCE APP"}
              </span>
            </div>
            <div style={{ fontFamily: AIE_MONO, fontSize: 12, color: AIE_C.textDim }}>
              https://novashop.app
            </div>
          </div>

          {/* Storefront Content */}
          <div style={{ padding: 22, display: "flex", flexDirection: "column", gap: 18, flex: 1 }}>
            {/* Search + System Status Pills */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <div
                style={{
                  flex: 1,
                  height: 42,
                  borderRadius: 10,
                  background: "rgba(15, 23, 52, 0.85)",
                  border: `1px solid ${AIE_C.borderSubtle}`,
                  padding: "0 14px",
                  display: "flex",
                  alignItems: "center",
                  color: AIE_C.textDim,
                  fontSize: 14,
                }}
              >
                Search developer gear, audio, monitors...
              </div>
              <div
                style={{
                  padding: "9px 14px",
                  borderRadius: 10,
                  background: "rgba(56, 189, 248, 0.15)",
                  border: `1px solid ${AIE_C.borderBlue}`,
                  fontFamily: AIE_MONO,
                  fontSize: 12.5,
                  color: AIE_C.cyan,
                }}
              >
                CART (2) · PAY
              </div>
            </div>

            {/* AI Recommended Header Banner (lights up at 10.35s) */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 16px",
                borderRadius: 12,
                background: aiModeActive
                  ? "linear-gradient(90deg, rgba(124, 58, 237, 0.28), rgba(56, 189, 248, 0.2))"
                  : "rgba(15, 23, 46, 0.65)",
                border: `1px solid ${aiModeActive ? AIE_C.purple : AIE_C.borderSubtle}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 99,
                    background: aiModeActive ? AIE_C.purple : AIE_C.blue,
                    boxShadow: aiModeActive ? `0 0 12px ${AIE_C.purple}` : "none",
                  }}
                />
                <span style={{ fontFamily: AIE_DISPLAY, fontSize: 17, fontWeight: 700, color: AIE_C.text }}>
                  {aiModeActive ? "AI Personalized Recommendations For You" : "Featured Product Catalog"}
                </span>
              </div>
              <span style={{ fontFamily: AIE_MONO, fontSize: 12, color: aiModeActive ? "#E9D5FF" : AIE_C.textDim }}>
                {aiModeActive ? "RANKING MODEL ACTIVE" : "STANDARD CATALOG"}
              </span>
            </div>

            {/* 3 Product Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
              {PRODUCTS.map((prod, idx) => (
                <div
                  key={prod.name}
                  style={{
                    background: "rgba(14, 21, 50, 0.9)",
                    border: `1.5px solid ${aiModeActive ? AIE_C.purple : AIE_C.borderSubtle}`,
                    borderRadius: 16,
                    padding: 14,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    transform: aiModeActive
                      ? `translate3d(0px, ${interpolate(aiRecP, [0, 1], [10, 0])}px, 0px)`
                      : undefined,
                    boxShadow: aiModeActive ? "0 12px 30px rgba(124, 58, 237, 0.22)" : "none",
                  }}
                >
                  {/* Clean Graphic Product Visual */}
                  <div
                    style={{
                      height: 112,
                      borderRadius: 12,
                      background:
                        idx === 0
                          ? "linear-gradient(135deg, #1E1B4B, #312E81)"
                          : idx === 1
                            ? "linear-gradient(135deg, #0F172A, #1E3A8A)"
                            : "linear-gradient(135deg, #1E1046, #0C4A6E)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: 82,
                        height: 50,
                        borderRadius: 14,
                        border: `1.5px solid ${aiModeActive ? AIE_C.cyan : "rgba(148,163,184,0.35)"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: AIE_MONO,
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#E0F2FE",
                      }}
                    >
                      {prod.tag}
                    </div>
                    {aiModeActive ? (
                      <div
                        style={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          background: "linear-gradient(90deg, #7C3AED, #0284C7)",
                          color: "#FFFFFF",
                          fontFamily: AIE_MONO,
                          fontSize: 11,
                          fontWeight: 700,
                          padding: "3px 8px",
                          borderRadius: 99,
                          opacity: aiRecP,
                        }}
                      >
                        {prod.match}
                      </div>
                    ) : null}
                  </div>
                  <div style={{ fontFamily: AIE_DISPLAY, fontSize: 15.5, fontWeight: 700, color: AIE_C.text, lineHeight: 1.25 }}>
                    {prod.name}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: AIE_MONO, fontSize: 17, fontWeight: 700, color: AIE_C.cyan }}>
                      {prod.price}
                    </span>
                    <span
                      style={{
                        fontFamily: AIE_MONO,
                        fontSize: 11,
                        padding: "4px 9px",
                        borderRadius: 8,
                        background: "rgba(56, 189, 248, 0.16)",
                        color: AIE_C.blue,
                      }}
                    >
                      + ADD
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive AI Support Chatbot Popup inside E-Commerce App (at 14.55s) */}
            <div
              style={{
                marginTop: "auto",
                opacity: aiChatP,
                transform: `translate3d(0px, ${interpolate(aiChatP, [0, 1], [28, 0])}px, 0px)`,
                background: "linear-gradient(135deg, rgba(16, 14, 46, 0.98), rgba(11, 24, 56, 0.98))",
                border: `1.5px solid ${AIE_C.cyan}`,
                borderRadius: 18,
                padding: "16px 20px",
                boxShadow: "0 18px 46px rgba(0, 229, 255, 0.22)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 99, background: AIE_C.emerald }} />
                  <span style={{ fontFamily: AIE_DISPLAY, fontSize: 16, fontWeight: 700, color: AIE_C.text }}>
                    AI Customer Support Agent
                  </span>
                </div>
                <span style={{ fontFamily: AIE_MONO, fontSize: 11.5, color: AIE_C.cyan }}>
                  24/7 INSTANT RESOLUTION
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 14.5 }}>
                <div
                  style={{
                    alignSelf: "flex-end",
                    background: "rgba(56, 189, 248, 0.18)",
                    border: "1px solid rgba(56, 189, 248, 0.32)",
                    borderRadius: 12,
                    padding: "8px 14px",
                    color: "#E0F2FE",
                  }}
                >
                  Customer: &quot;Where is my order #4821? Can I add express delivery?&quot;
                </div>
                <div
                  style={{
                    alignSelf: "flex-start",
                    background: "rgba(168, 85, 247, 0.18)",
                    border: "1px solid rgba(168, 85, 247, 0.42)",
                    borderRadius: 12,
                    padding: "9px 14px",
                    color: "#F5F3FF",
                  }}
                >
                  AI Agent: &quot;Order #4821 is dispatched! Express upgrade applied — arriving tomorrow by 2:00 PM.&quot;
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: AI Engineer Intelligence Layer */}
        <div
          style={{
            background: aiModeActive
              ? "linear-gradient(180deg, rgba(24, 14, 58, 0.92), rgba(10, 18, 44, 0.92))"
              : AIE_C.panel,
            border: `1.5px solid ${aiModeActive ? AIE_C.purple : AIE_C.borderSubtle}`,
            borderRadius: 22,
            padding: 22,
            display: "flex",
            flexDirection: "column",
            gap: 18,
            opacity: 0.25 + aiRecP * 0.75,
            transform: `translate3d(${interpolate(aiRecP, [0, 1], [24, 0])}px, 0px, 0px)`,
            backdropFilter: "blur(14px)",
            boxShadow: aiModeActive ? "0 24px 60px rgba(124, 58, 237, 0.3)" : "none",
          }}
        >
          <div style={{ borderBottom: `1px solid ${AIE_C.borderPurple}`, paddingBottom: 14 }}>
            <div style={{ fontFamily: AIE_MONO, fontSize: 12, color: AIE_C.purple, letterSpacing: 1.4 }}>
              INTELLIGENCE LAYER
            </div>
            <div style={{ fontFamily: AIE_DISPLAY, fontSize: 25, fontWeight: 800, color: AIE_C.text, marginTop: 4 }}>
              AI Engineer Adds
            </div>
          </div>

          {/* AI Feature 1: Product Recommendations */}
          <div
            style={{
              background: "rgba(124, 58, 237, 0.18)",
              border: `1.5px solid ${AIE_C.purple}`,
              borderRadius: 18,
              padding: 20,
              opacity: aiRecP,
              transform: `scale(${interpolate(aiRecP, [0, 1], [0.94, 1])})`,
              boxShadow: "0 14px 36px rgba(124, 58, 237, 0.22)",
            }}
          >
            <div style={{ fontFamily: AIE_MONO, fontSize: 12, color: "#D8B4FE", marginBottom: 8 }}>
              AI MODULE 01
            </div>
            <div style={{ fontFamily: AIE_DISPLAY, fontSize: 22, fontWeight: 800, color: AIE_C.text, marginBottom: 8 }}>
              Intelligent Product Recommendations
            </div>
            <div style={{ fontSize: 15, color: AIE_C.textMuted, lineHeight: 1.45 }}>
              Real-time behavioral embeddings &amp; semantic ranking match each buyer with the right product.
            </div>
            <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
              <span style={{ fontFamily: AIE_MONO, fontSize: 12, color: AIE_C.cyan, background: "rgba(0, 229, 255, 0.12)", padding: "5px 10px", borderRadius: 8 }}>
                +38% Conversion
              </span>
              <span style={{ fontFamily: AIE_MONO, fontSize: 12, color: "#E9D5FF", background: "rgba(168, 85, 247, 0.2)", padding: "5px 10px", borderRadius: 8 }}>
                Vector Match
              </span>
            </div>
          </div>

          {/* AI Feature 2: AI Customer Support */}
          <div
            style={{
              background: voiceSec >= 14.55 ? "rgba(0, 229, 255, 0.14)" : "rgba(15, 23, 42, 0.5)",
              border: `1.5px solid ${voiceSec >= 14.55 ? AIE_C.cyan : AIE_C.borderSubtle}`,
              borderRadius: 18,
              padding: 20,
              opacity: 0.25 + aiChatP * 0.75,
              transform: `scale(${interpolate(aiChatP, [0, 1], [0.94, 1])})`,
              boxShadow: voiceSec >= 14.55 ? "0 14px 36px rgba(0, 229, 255, 0.22)" : "none",
            }}
          >
            <div style={{ fontFamily: AIE_MONO, fontSize: 12, color: AIE_C.cyan, marginBottom: 8 }}>
              AI MODULE 02
            </div>
            <div style={{ fontFamily: AIE_DISPLAY, fontSize: 22, fontWeight: 800, color: AIE_C.text, marginBottom: 8 }}>
              AI Customer Support System
            </div>
            <div style={{ fontSize: 15, color: AIE_C.textMuted, lineHeight: 1.45 }}>
              Context-aware AI chatbot connected to order APIs for instant automated support.
            </div>
            <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
              <span style={{ fontFamily: AIE_MONO, fontSize: 12, color: AIE_C.emerald, background: "rgba(16, 185, 129, 0.14)", padding: "5px 10px", borderRadius: 8 }}>
                &lt;1.2s Reply
              </span>
              <span style={{ fontFamily: AIE_MONO, fontSize: 12, color: AIE_C.blue, background: "rgba(56, 189, 248, 0.14)", padding: "5px 10px", borderRadius: 8 }}>
                Tool Calling
              </span>
            </div>
          </div>
        </div>
      </div>
    </AieSceneShell>
  );
};
