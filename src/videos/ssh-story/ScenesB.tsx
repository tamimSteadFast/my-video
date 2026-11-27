import React from "react";
import {
  At,
  KeyIcon,
  LaptopScene,
  LockIcon,
  NetworkTunnel,
  RemoteServer,
  ShieldIcon,
  StoryScene,
  Tag,
  prog,
  scramble,
  typed,
  useSec,
  win,
} from "./kit";
import { F_EN, F_MONO, K, cue, getSshScene } from "./narration";

/* ───────────── Scene 4 — How SSH works ───────────── */
export const Scene04: React.FC = () => {
  const t = useSec();
  const s = getSshScene(4);
  const tClient = cue(4, "SSH Client");
  const tServer = cue(4, "SSH Server");
  const tReq = cue(4, "Connection Request");
  const tAuth = cue(4, "Authentication সফল");
  const tSecure = tAuth + 0.9;
  const steps = [
    { n: "1", label: "SSH Client", at: tClient, c: K.accent },
    { n: "2", label: "Connection Request", at: tReq, c: K.primary },
    { n: "3", label: "SSH Server", at: tServer, c: K.accent },
    { n: "4", label: "Authentication", at: tAuth - 0.6, c: K.warn },
    { n: "5", label: "Secure Connection", at: tSecure, c: K.ok },
  ];
  // request goes up, response comes down
  const req = prog(t, tReq, tReq + 1.8);
  const secure = prog(t, tSecure, tSecure + 1.2);

  return (
    <StoryScene
      id={4}
      tint={K.primary}
      cam={[
        { t: 0, z: 1.08, y: 160 },
        { t: tServer - 0.3, z: 1.0, y: 0 },
        { t: tAuth, z: 1.12, y: -120 },
        { t: s.voiceSec, z: 1.0, y: 0 },
      ]}
      sfx={[
        { at: tClient, type: "pop" },
        { at: tReq, type: "whoosh" },
        { at: tServer, type: "pop" },
        { at: tAuth, type: "chime" },
        { at: tSecure, type: "click" },
      ]}
    >
      <At x={540} y={520} opacity={prog(t, tServer - 0.2, tServer + 0.5)} scale={0.9 + 0.1 * prog(t, tServer - 0.2, tServer + 0.5)}>
        <RemoteServer w={300} units={3} active={0.5 + 0.4 * req} glow={K.primary} />
      </At>
      <At x={540} y={730} opacity={prog(t, tServer, tServer + 0.5)}>
        <Tag text="SSH SERVER" color={K.primary} size={32} t={t} at={tServer} />
      </At>
      <At x={540} y={1440} opacity={prog(t, 0.2, 0.8)}>
        <LaptopScene w={500} h={300} tilt={2}>
          <div style={{ width: "100%", height: "100%", background: "#0A1226", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F_MONO, fontSize: 28, color: K.accent }}>
            ssh user@server
          </div>
        </LaptopScene>
      </At>
      <At x={540} y={1640} opacity={prog(t, tClient, tClient + 0.5)}>
        <Tag text="SSH CLIENT" color={K.accent} size={32} t={t} at={tClient} />
      </At>

      <NetworkTunnel x1={540} y1={1270} x2={540} y2={760} progress={Math.max(req, 0.001)} color={K.accent} packets={req > 0.05 ? 3 : 0} dashed={secure < 0.1} secure={secure > 0.5} packetColor={secure > 0.5 ? K.ok : K.text} reverse={t > tAuth - 0.6} />

      {steps.map((st, i) => {
        const left = i % 2 === 0;
        const p = prog(t, st.at, st.at + 0.45);
        return (
          <At key={st.n} x={left ? 250 : 830} y={820 + i * 86} opacity={p} scale={0.92 + 0.08 * p}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(8,12,26,0.82)", border: `2px solid ${st.c}88`, padding: "10px 22px 10px 12px", borderRadius: 18, boxShadow: `0 0 28px ${st.c}25` }}>
              <div style={{ width: 46, height: 46, borderRadius: 23, background: st.c, color: "#06101a", fontFamily: F_EN, fontWeight: 800, fontSize: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {st.n}
              </div>
              <div style={{ fontFamily: F_EN, fontWeight: 700, fontSize: 31, color: K.text, whiteSpace: "nowrap" }}>{st.label}</div>
            </div>
          </At>
        );
      })}

      <At x={540} y={250} opacity={win(t, tSecure + 0.2)}>
        <div style={{ fontFamily: F_EN, fontWeight: 800, fontSize: 34, letterSpacing: "0.06em", color: K.text, textAlign: "center", textShadow: `0 0 28px ${K.accent}77` }}>
          CLIENT <span style={{ color: K.accent }}>→</span> <span style={{ color: K.ok }}>SECURE CONNECTION</span> <span style={{ color: K.accent }}>→</span> SERVER
        </div>
      </At>
      <At x={540} y={1090} opacity={secure}>
        <LockIcon size={110} color={K.ok} />
      </At>
    </StoryScene>
  );
};

/* ───────────── Scene 5 — Encryption ───────────── */
export const Scene05: React.FC = () => {
  const t = useSec();
  const s = getSshScene(5);
  const tCatch = cue(5, "ধরে ফেলে");
  const tEnc = cue(5, "Encrypted");
  const tInt = cue(5, "Intercept");
  const tPort = cue(5, "Port হলো 22");
  const plain = "ls -la /var/www";
  const cipher = "8f3a9c1e7b2d04a6";
  const travel = prog(t, 0.6, tEnc + 3);
  const encAmount = prog(t, tEnc, tEnc + 1.4);
  const frameSeed = Math.floor(t * 12);
  const shown = encAmount < 0.02 ? plain : encAmount > 0.98 ? cipher : scramble(plain, encAmount, frameSeed);
  const shield = prog(t, tEnc + 0.2, tEnc + 1.2);
  const cardY = 1330 - travel * 700;

  return (
    <StoryScene
      id={5}
      tint={K.accent}
      cam={[
        { t: 0, z: 1.0 },
        { t: tEnc, z: 1.12, y: -40 },
        { t: tPort - 0.5, z: 1.0, y: 0 },
        { t: s.voiceSec, z: 1.05, y: 20 },
      ]}
      sfx={[
        { at: tCatch, type: "riser", vol: 0.2 },
        { at: tEnc, type: "chime" },
        { at: tEnc + 0.3, type: "whoosh" },
        { at: tInt, type: "pop" },
        { at: tPort, type: "click" },
      ]}
    >
      <At x={540} y={380}>
        <RemoteServer w={260} units={3} active={0.5} />
      </At>
      <At x={540} y={1620}>
        <LaptopScene w={420} h={240} tilt={2}>
          <div style={{ width: "100%", height: "100%", background: "#0A1226" }} />
        </LaptopScene>
      </At>
      <NetworkTunnel x1={540} y1={1480} x2={540} y2={590} progress={1} color={shield > 0.3 ? K.accent : K.warn} secure={shield > 0.3} dashed={shield < 0.3} />

      {/* data card travelling */}
      <At x={540} y={cardY} opacity={prog(t, 0.4, 1)}>
        <div
          style={{
            fontFamily: F_MONO,
            fontWeight: 700,
            fontSize: 44,
            padding: "20px 34px",
            borderRadius: 18,
            background: "rgba(8,12,26,0.92)",
            color: encAmount > 0.5 ? K.accent : K.ok,
            border: `2px solid ${encAmount > 0.5 ? K.accent : K.ok}88`,
            boxShadow: `0 0 36px ${encAmount > 0.5 ? K.accent : K.ok}44`,
            whiteSpace: "nowrap",
            minWidth: 560,
            textAlign: "center",
          }}
        >
          {shown}
        </div>
        <div style={{ textAlign: "center", fontFamily: F_EN, fontSize: 26, color: K.muted, marginTop: 8, letterSpacing: "0.1em" }}>
          {encAmount > 0.98 ? "ENCRYPTED" : "READABLE"}
        </div>
      </At>

      {/* observer who cannot read it */}
      <At x={885} y={1000} opacity={win(t, tCatch)}>
        <div style={{ textAlign: "center" }}>
          <svg width={110} height={80} viewBox="0 0 100 70">
            <path d="M6 35 C 25 6, 75 6, 94 35 C 75 64, 25 64, 6 35 Z" fill="none" stroke={K.warn} strokeWidth={6} />
            <circle cx={50} cy={35} r={14} fill={K.warn} />
          </svg>
          <div style={{ fontFamily: F_MONO, fontSize: 28, marginTop: 6, color: t > tInt ? K.err : K.warn }}>
            {t > tInt ? scramble("????????", 1, frameSeed) : "sniffing..."}
          </div>
        </div>
      </At>
      <NetworkTunnel x1={845} y1={1000} x2={600} y2={960} progress={win(t, tCatch + 0.4)} color={K.warn} dashed />

      {/* shield around the tunnel */}
      <At x={540} y={960} opacity={shield} scale={0.5 + 0.7 * shield}>
        <ShieldIcon size={330} />
      </At>

      <At x={540} y={190} opacity={win(t, tEnc)}>
        <div style={{ fontFamily: F_EN, fontWeight: 800, fontSize: 50, color: K.text, textAlign: "center", textShadow: `0 0 30px ${K.accent}77`, letterSpacing: "0.02em" }}>
          Encrypted Data
          <br />
          <span style={{ color: K.accent }}>Transmission</span>
        </div>
      </At>
      <At x={540} y={1180} opacity={win(t, tPort - 0.2)} scale={0.9 + 0.1 * prog(t, tPort - 0.2, tPort + 0.4)}>
        <div style={{ textAlign: "center" }}>
          <Tag text="DEFAULT PORT: 22" color={K.warn} size={46} t={t} at={tPort - 0.2} />
          <div style={{ fontFamily: F_EN, fontSize: 28, color: K.muted, marginTop: 12, background: "rgba(8,12,26,0.7)", padding: "6px 16px", borderRadius: 10 }}>
            the default door — encryption happens inside
          </div>
        </div>
      </At>
    </StoryScene>
  );
};

/* ───────────── Scene 6 — Authentication ───────────── */
export const Scene06: React.FC = () => {
  const t = useSec();
  const s = getSshScene(6);
  const tPass = cue(6, "Password দিয়ে");
  const tKey = cue(6, "SSH Key");
  const tPub = cue(6, "Public Key");
  const tSig = cue(6, "Signature");
  const part1 = win(t, 0.3, tKey - 0.3, 0.5);
  const part2 = win(t, tKey, undefined, 0.5);
  const pwP = prog(t, tPass, tPass + 1.4);
  const send = prog(t, tPass + 1.6, tPass + 2.8);
  const ok1 = prog(t, tPass + 3, tPass + 3.5);
  const challenge = prog(t, tPub + 0.8, tPub + 2);
  const signature = prog(t, tSig - 0.2, tSig + 1.2);
  const verified = prog(t, tSig + 1.4, tSig + 2);

  return (
    <StoryScene
      id={6}
      tint={K.warn}
      cam={[
        { t: 0, z: 1.0 },
        { t: tKey - 0.4, z: 1.1, y: -30 },
        { t: tKey + 0.6, z: 1.0, y: 0 },
        { t: s.voiceSec, z: 1.06, y: 0 },
      ]}
      sfx={[
        { at: tPass + 0.4, type: "click" },
        { at: tPass + 1.6, type: "whoosh" },
        { at: tPass + 3, type: "chime", vol: 0.18 },
        { at: tKey, type: "whoosh" },
        { at: tPub, type: "pop" },
        { at: tSig, type: "pop" },
        { at: tSig + 1.4, type: "chime" },
      ]}
    >
      {/* ── PART 1: password ── */}
      <div style={{ opacity: part1, position: "absolute", inset: 0 }}>
        <At x={540} y={290}>
          <Tag text="PASSWORD AUTHENTICATION" color={K.warn} size={34} t={t} at={0.3} />
        </At>
        <At x={540} y={760}>
          <div style={{ width: 760, padding: 40, borderRadius: 28, background: "rgba(12,18,40,0.95)", border: "2px solid #263153", boxShadow: `0 0 70px ${K.warn}22` }}>
            {[
              { l: "Username", v: typed("user", t, tPass, 6) },
              { l: "Password", v: "•".repeat(typed("hunter2xx", t, tPass + 0.6, 9).length) },
            ].map((r) => (
              <div key={r.l} style={{ marginBottom: 24 }}>
                <div style={{ fontFamily: F_EN, fontSize: 28, color: K.muted, marginBottom: 8 }}>{r.l}</div>
                <div style={{ fontFamily: F_MONO, fontSize: 42, color: K.text, background: "#080C1C", borderRadius: 14, padding: "14px 22px", minHeight: 64, border: "1px solid #2A3560" }}>
                  {r.v}
                  <span style={{ opacity: Math.floor(t * 2) % 2 ? 0 : 1, color: K.accent }}>|</span>
                </div>
              </div>
            ))}
            <div style={{ fontFamily: F_EN, fontWeight: 700, fontSize: 32, textAlign: "center", color: "#1a1204", background: K.warn, borderRadius: 14, padding: "14px 0", opacity: 0.4 + 0.6 * pwP }}>
              Login
            </div>
          </div>
        </At>
        <NetworkTunnel x1={540} y1={1090} x2={540} y2={1420} progress={send} color={K.warn} packets={send > 0.1 ? 2 : 0} />
        <At x={540} y={1580} opacity={prog(t, tPass + 1.2, tPass + 1.8)}>
          <RemoteServer w={280} units={2} glow={K.warn} label="SERVER" active={0.6} />
        </At>
        <At x={800} y={1520} opacity={ok1}>
          <ShieldIcon size={120} color={K.ok} />
        </At>
        <At x={540} y={1090} opacity={prog(t, tPass + 1.8, tPass + 2.2) * (1 - ok1)}>
          <div style={{ fontFamily: F_EN, fontSize: 30, color: K.warn }}>username + password →</div>
        </At>
      </div>

      {/* ── PART 2: SSH key ── */}
      <div style={{ opacity: part2, position: "absolute", inset: 0 }}>
        <At x={540} y={250}>
          <Tag text="SSH KEY AUTHENTICATION" color={K.accent} size={34} t={t} at={tKey} />
        </At>
        {/* server with PUBLIC key */}
        <At x={540} y={560}>
          <RemoteServer w={300} units={3} active={0.4} label="SERVER" />
        </At>
        <At x={850} y={560} opacity={prog(t, tPub - 0.1, tPub + 0.5)}>
          <div style={{ textAlign: "center" }}>
            <KeyIcon color={K.accent} size={120} />
            <div style={{ fontFamily: F_EN, fontWeight: 700, fontSize: 28, color: K.accent }}>PUBLIC KEY</div>
            <div style={{ fontFamily: F_EN, fontSize: 22, color: K.muted }}>stored on server</div>
          </div>
        </At>
        {/* laptop with PRIVATE key (never leaves) */}
        <At x={540} y={1330}>
          <LaptopScene w={460} h={270} tilt={2}>
            <div style={{ width: "100%", height: "100%", background: "#0A1226", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <KeyIcon color={K.warn} size={110} />
            </div>
          </LaptopScene>
        </At>
        <At x={230} y={1330} opacity={prog(t, tKey + 0.6, tKey + 1.2)}>
          <div style={{ textAlign: "center" }}>
            <LockIcon size={90} color={K.warn} />
            <div style={{ fontFamily: F_EN, fontWeight: 700, fontSize: 26, color: K.warn }}>PRIVATE KEY</div>
            <div style={{ fontFamily: F_EN, fontSize: 22, color: K.muted }}>never leaves</div>
          </div>
        </At>
        {/* challenge down, signature up */}
        <NetworkTunnel x1={470} y1={800} x2={470} y2={1130} progress={challenge} color={K.primary} packets={challenge > 0.05 ? 1 : 0} dashed={false} />
        <At x={330} y={960} opacity={challenge}>
          <div style={{ fontFamily: F_MONO, fontSize: 26, color: K.primary }}>challenge</div>
        </At>
        <NetworkTunnel x1={610} y1={1130} x2={610} y2={800} progress={signature} color={K.accent} packets={signature > 0.05 && verified < 0.5 ? 1 : 0} packetColor={K.accent} />
        <At x={770} y={960} opacity={signature}>
          <div style={{ fontFamily: F_MONO, fontSize: 26, color: K.accent }}>signature ✍</div>
        </At>
        <At x={540} y={1650} opacity={verified} scale={0.8 + 0.2 * verified}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <ShieldIcon size={120} color={K.ok} />
            <div style={{ fontFamily: F_EN, fontWeight: 800, fontSize: 48, color: K.ok }}>Identity Verified</div>
          </div>
        </At>
      </div>
    </StoryScene>
  );
};
