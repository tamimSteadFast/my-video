import React from "react";
import {
  At,
  CinematicTitle,
  DeveloperCharacter,
  GlitchSlice,
  LaptopScene,
  LockIcon,
  NetworkTunnel,
  RemoteServer,
  StoryScene,
  Tag,
  WebsiteWindow,
  prog,
  useSec,
  win,
} from "./kit";
import { F_BN, F_EN, F_MONO, K, cue, getSshScene } from "./narration";

/* ───────────── Scene 1 — The Hook ───────────── */
export const Scene01: React.FC = () => {
  const t = useSec();
  const s = getSshScene(1);
  const tNotif = cue(1, "Notification");
  const tDown = cue(1, "কাজ করছে না");
  const tMiles = cue(1, "হাজার মাইল");
  const tQ = cue(1, "ছুটে");
  const errP = prog(t, tDown - 0.2, tDown + 0.4);
  const notif = prog(t, tNotif, tNotif + 0.45);
  const notifOut = 1 - prog(t, tNotif + 2.2, tNotif + 2.7);

  return (
    <StoryScene
      id={1}
      tint={errP > 0.5 ? K.err : K.accent}
      cam={[
        { t: 0, z: 1, y: 0 },
        { t: tDown, z: 1.1, y: -20 },
        { t: tMiles, z: 1.55, y: 150 },
        { t: s.voiceSec, z: 1.7, y: 190 },
      ]}
      sfx={[
        { at: tNotif, type: "pop" },
        { at: tDown, type: "riser", vol: 0.22 },
        { at: tDown + 0.3, type: "whoosh", vol: 0.2 },
        { at: tMiles, type: "whoosh" },
      ]}
    >
      <At x={540} y={800}>
        <LaptopScene w={800} h={500} glow={errP > 0.5 ? K.err : K.accent} flicker={errP > 0.5 ? 0.6 : 0.1} tilt={3}>
          {errP < 0.5 ? (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#0B1530,#08101F)" }}>
              <div style={{ fontFamily: F_MONO, fontSize: 28, color: K.muted }}>~/projects/mysite</div>
            </div>
          ) : (
            <WebsiteWindow state="down" width={788} height={488} />
          )}
        </LaptopScene>
      </At>
      <At x={540} y={1265}>
        <DeveloperCharacter glow={errP > 0.5 ? K.err : K.accent} />
      </At>

      {/* phone notification */}
      <At x={540} y={310 + (1 - notif) * -90} opacity={notif * notifOut}>
        <div
          style={{
            width: 780,
            padding: "26px 32px",
            borderRadius: 34,
            background: "rgba(20,26,50,0.92)",
            border: "1px solid rgba(148,163,184,0.25)",
            boxShadow: `0 0 70px ${K.warn}40`,
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div style={{ width: 78, height: 78, borderRadius: 20, background: K.warn, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F_EN, fontWeight: 800, fontSize: 46, color: "#1a1204" }}>!</div>
          <div>
            <div style={{ fontFamily: F_EN, fontWeight: 700, fontSize: 36, color: K.text }}>Uptime Alert</div>
            <div style={{ fontFamily: F_EN, fontSize: 30, color: K.muted }}>mysite.com is not responding</div>
          </div>
        </div>
      </At>

      {/* hero text */}
      <At x={540} y={470} opacity={win(t, tDown + 0.1, tMiles + 0.6)}>
        <CinematicTitle text="Your Website" t={t} at={tDown + 0.1} size={98} spacing={0.02} />
      </At>
      <At x={540} y={590} opacity={win(t, tDown + 0.3, tMiles + 0.6)}>
        <CinematicTitle text="Is Down!" t={t} at={tDown + 0.3} size={128} color={K.err} glow={K.err} spacing={0.02} />
      </At>
      <At x={540} y={500} opacity={win(t, tMiles + 0.2, tQ + 1.2)}>
        <div style={{ fontFamily: F_EN, fontWeight: 600, fontSize: 52, color: K.warn, textAlign: "center", lineHeight: 1.25, textShadow: `0 0 30px ${K.warn}55` }}>
          But the Server is
          <br />
          Miles Away...
        </div>
      </At>
      <GlitchSlice t={t} at={tDown} />
      <GlitchSlice t={t} at={tMiles} dur={0.2} color={K.warn} />
    </StoryScene>
  );
};

/* ───────────── Scene 2 — The Problem ───────────── */
export const Scene02: React.FC = () => {
  const t = useSec();
  const s = getSshScene(2);
  const tNo = 0.4;
  const tHome = cue(2, "ঘরে বসেই");
  const tHow = cue(2, "কীভাবে");
  const zoom = prog(t, 0.2, 2.6);
  const tryP = prog(t, 3.5, 6.5);
  const fail = Math.max(0, Math.sin(t * 7)) * (t > 7 ? 0.4 : 0);

  return (
    <StoryScene
      id={2}
      tint={K.primary}
      cam={[
        { t: 0, z: 1.6, y: 260 },
        { t: 2.6, z: 1, y: 0 },
        { t: s.voiceSec, z: 1.06, y: -20 },
      ]}
      sfx={[
        { at: 0.5, type: "whoosh" },
        { at: 3.2, type: "click" },
        { at: tHow, type: "riser", vol: 0.2 },
      ]}
    >
      {/* map dots */}
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, opacity: zoom * 0.7 }}>
        {Array.from({ length: 120 }).map((_, i) => {
          const x = 90 + (i % 10) * 100 + (Math.floor(i / 10) % 2) * 50;
          const y = 380 + Math.floor(i / 10) * 100;
          const live = Math.sin(t * 1.4 + i) > 0.7;
          return <circle key={i} cx={x} cy={y} r={live ? 5 : 3} fill={live ? K.accent : "#2A3560"} />;
        })}
      </svg>

      {/* remote server (top) */}
      <At x={540} y={540} opacity={prog(t, 1.2, 2.2)} scale={0.8 + 0.2 * prog(t, 1.2, 2.2)}>
        <RemoteServer w={320} units={4} label="REMOTE SERVER" active={0.3} />
      </At>
      <At x={540} y={290} opacity={prog(t, 1.6, 2.4)}>
        <Tag text="REMOTE SERVER" color={K.primary} size={34} t={t} at={1.6} />
      </At>

      {/* local laptop (bottom) */}
      <At x={540} y={1330} opacity={prog(t, 0.4, 1.2)}>
        <LaptopScene w={560} h={340} glow={K.accent} tilt={2}>
          <div style={{ width: "100%", height: "100%", background: "#0A1226", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F_MONO, fontSize: 24, color: K.muted }}>
            {t > tHome ? "ssh ???" : "mysite.com ✕"}
          </div>
        </LaptopScene>
      </At>
      <At x={540} y={1530} opacity={prog(t, 0.6, 1.4)}>
        <Tag text="LOCAL COMPUTER" color={K.accent} size={34} t={t} at={0.6} />
      </At>

      {/* distance line */}
      <NetworkTunnel x1={540} y1={860} x2={540} y2={1130} progress={prog(t, 2.2, 3.4)} color={K.muted} dashed packets={0} />
      <At x={720} y={1000} opacity={prog(t, 2.6, 3.4)}>
        <div style={{ fontFamily: F_MONO, fontSize: 36, color: K.warn, background: "rgba(8,12,26,0.7)", padding: "6px 18px", borderRadius: 12 }}>
          1000+ miles
        </div>
      </At>

      {/* failed connection attempt */}
      {tryP > 0 ? (
        <NetworkTunnel x1={540} y1={1130} x2={540} y2={860} progress={tryP * (t > 6.8 ? 0.55 : 1)} color={fail > 0 ? K.err : K.accent} packets={t < 6.8 ? 2 : 0} dashed={false} />
      ) : null}

      {/* question */}
      <At x={540} y={1100} opacity={win(t, tHow, tHow + 4.2)} scale={0.9 + 0.1 * prog(t, tHow, tHow + 0.5)}>
        <div style={{ fontFamily: F_EN, fontWeight: 700, fontSize: 60, color: K.text, textAlign: "center", lineHeight: 1.2, background: "rgba(8,12,26,0.78)", padding: "26px 40px", borderRadius: 28, border: `2px solid ${K.warn}66`, textShadow: `0 0 30px ${K.warn}44` }}>
          How do you control
          <br />
          <span style={{ color: K.warn }}>a remote computer?</span>
        </div>
      </At>
      <At x={540} y={190} opacity={win(t, tNo, tHome, 0.3)}>
        <div style={{ fontFamily: F_BN, fontWeight: 700, fontSize: 70, color: K.ok }}>না! যেতে হবে না</div>
      </At>
    </StoryScene>
  );
};

/* ───────────── Scene 3 — The Reveal ───────────── */
export const Scene03: React.FC = () => {
  const t = useSec();
  const s = getSshScene(3);
  const tName = cue(3, "SSH");
  const tFull = cue(3, "Secure Shell");
  const tProto = cue(3, "Network Protocol");
  const tunnel = prog(t, 0.2, 2.2);
  const lockP = prog(t, 1.8, 2.5);
  const titleHide = 1 - prog(t, tProto + 1.2, tProto + 2);

  return (
    <StoryScene
      id={3}
      tint={K.accent}
      cam={[
        { t: 0, z: 1.2, y: 0 },
        { t: tName, z: 1.0, y: 0 },
        { t: tName + 0.5, z: 1.14, y: 0 },
        { t: s.voiceSec, z: 1.0, y: -30 },
      ]}
      sfx={[
        { at: 0.2, type: "riser", vol: 0.24 },
        { at: tName, type: "chime" },
        { at: tName + 0.05, type: "whoosh" },
        { at: 2.0, type: "click" },
        { at: tProto, type: "pop" },
      ]}
    >
      <At x={540} y={420}>
        <RemoteServer w={300} units={3} active={0.8} />
      </At>
      <At x={540} y={1450}>
        <LaptopScene w={520} h={310} tilt={2}>
          <div style={{ width: "100%", height: "100%", background: "#0A1226", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F_MONO, fontSize: 30, color: K.accent }}>
            $ ssh _
          </div>
        </LaptopScene>
      </At>
      <NetworkTunnel x1={540} y1={1290} x2={540} y2={640} progress={tunnel} secure packets={4} packetColor={K.text} />
      <At x={540} y={965} opacity={lockP} scale={0.6 + 0.4 * lockP}>
        <LockIcon size={150} />
      </At>

      <At x={540} y={760} opacity={titleHide}>
        <div style={{ textAlign: "center", background: "radial-gradient(ellipse, rgba(8,12,26,0.85) 40%, transparent 75%)", padding: "40px 120px" }}>
          <CinematicTitle text="SSH" t={t} at={tName} size={300} />
          <div style={{ marginTop: 6, opacity: prog(t, tFull, tFull + 0.5), transform: `translateY(${(1 - prog(t, tFull, tFull + 0.5)) * 24}px)` }}>
            <CinematicTitle text="SECURE SHELL" t={t} at={tFull} size={62} color={K.accent} glow={K.accent} spacing={0.2} weight={700} />
          </div>
        </div>
      </At>
      <At x={540} y={1130} opacity={win(t, tProto - 0.3, undefined)}>
        <div style={{ fontFamily: F_EN, fontWeight: 600, fontSize: 46, color: K.text, textAlign: "center", lineHeight: 1.25, background: "rgba(8,12,26,0.7)", padding: "18px 34px", borderRadius: 22, border: `1px solid ${K.accent}55` }}>
          Your Secure Gateway
          <br />
          <span style={{ color: K.accent }}>to Remote Servers.</span>
        </div>
      </At>
    </StoryScene>
  );
};
