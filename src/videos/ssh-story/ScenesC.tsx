import React from "react";
import { interpolate } from "remotion";
import {
  At,
  DeveloperCharacter,
  GlitchSlice,
  KeyIcon,
  LaptopScene,
  LockIcon,
  NetworkTunnel,
  RemoteServer,
  ShieldIcon,
  StoryScene,
  Tag,
  TerminalWindow,
  WebsiteWindow,
  prog,
  typed,
  useSec,
  win,
  type TermLine,
} from "./kit";
import { F_EN, F_MONO, K, cue, getSshScene } from "./narration";

/* ───────────── Scene 7 — Real terminal demo ───────────── */
export const Scene07: React.FC = () => {
  const t = useSec();
  const s = getSshScene(7);
  const end = s.voiceSec + 0.4;
  const tOpen = cue(7, "Terminal Open");
  const tType = cue(7, "লিখো");
  const tEnter = Math.max(cue(7, "Enter"), tType + 2.5);
  const tAuth = Math.max(cue(7, "Authentication সফল"), tEnter + 2.4);
  const tCmd = Math.max(cue(7, "whoami"), tAuth + 1.5);
  const gap = Math.min(1.9, (end - tCmd - 1) / 3);

  const ssh = "ssh user@192.168.1.100";
  const tStart = tType + 0.8;
  const cps = ssh.length / Math.max(1.2, tEnter - 0.25 - tStart);
  const lines: TermLine[] = [];
  const remote = t > tAuth;
  const prompt = "user@ubuntu:~$ ";

  if (t >= tOpen) lines.push({ text: typed(ssh, t, tStart, cps), prompt: true });
  if (t >= tEnter) lines.push({ text: "Connecting to 192.168.1.100...", color: K.muted });
  if (t >= tEnter + 1.1) lines.push({ text: "Authentication successful.", color: K.ok });
  if (t >= tAuth) lines.push({ text: "Welcome to Ubuntu Server.", color: K.accent });
  if (t >= tAuth + 0.6) lines.push({ text: "", color: K.text });
  const cmds: { c: string; out: string }[] = [
    { c: "whoami", out: "user" },
    { c: "pwd", out: "/home/user" },
    { c: "ls", out: "app  logs  public  server.js" },
  ];
  cmds.forEach((m, i) => {
    const a = tCmd + i * gap;
    if (t >= a - 0.1) lines.push({ text: prompt + typed(m.c, t, a, 9), color: K.text });
    if (t >= a + m.c.length / 9 + 0.25) lines.push({ text: m.out, color: K.warn });
  });
  if (remote && t >= tCmd + 3 * gap - 0.1) lines.push({ text: prompt, color: K.text });

  const zoom = prog(t, tEnter, tEnter + 1.2);
  return (
    <StoryScene
      id={7}
      tint={remote ? K.ok : K.accent}
      cam={[
        { t: 0, z: 0.96, y: 40 },
        { t: tStart, z: 1.05, y: 0 },
        { t: tEnter + 0.6, z: 1.12, y: -30 },
        { t: s.voiceSec, z: 1.16, y: -60 },
      ]}
      sfx={[
        { at: tOpen, type: "pop" },
        { at: tEnter, type: "click" },
        { at: tAuth, type: "chime" },
        { at: tCmd, type: "click", vol: 0.16 },
        { at: tCmd + gap, type: "click", vol: 0.16 },
        { at: tCmd + 2 * gap, type: "click", vol: 0.16 },
      ]}
    >
      <At x={540} y={380} opacity={win(t, 0.4)}>
        <Tag text={remote ? "REMOTE SERVER · 192.168.1.100" : "LOCAL LAPTOP"} color={remote ? K.ok : K.accent} size={30} t={t} at={0.4} />
      </At>
      <At x={540} y={980} scale={0.94 + 0.06 * zoom}>
        <TerminalWindow
          lines={lines}
          width={960}
          height={900}
          fontSize={38}
          title={remote ? "user@ubuntu: ~" : "user@laptop: ~"}
          glow={remote ? K.ok : K.accent}
        />
      </At>
    </StoryScene>
  );
};

/* ───────────── Scene 8 — The developer's world ───────────── */
type Item = { k: "cmd" | "out"; text: string; color?: string };
const PANELS: { label: string; sub: string; color: string; items: Item[] }[] = [
  {
    label: "Manage Linux Servers",
    sub: "services · logs · updates",
    color: K.accent,
    items: [
      { k: "cmd", text: "sudo systemctl status nginx" },
      { k: "out", text: "● nginx.service - active (running)", color: K.ok },
      { k: "cmd", text: "sudo apt update && sudo apt upgrade" },
      { k: "out", text: "All packages are up to date.", color: K.muted },
    ],
  },
  {
    label: "Deploy Node.js Apps",
    sub: "build · restart · ship",
    color: K.ok,
    items: [
      { k: "cmd", text: "npm run build" },
      { k: "out", text: "✓ Build completed", color: K.ok },
      { k: "cmd", text: "pm2 restart app" },
      { k: "out", text: "[PM2] app → online", color: K.ok },
    ],
  },
  {
    label: "Access Git Repositories",
    sub: "pull · push · review",
    color: K.warn,
    items: [
      { k: "cmd", text: "git pull origin main" },
      { k: "out", text: "Updating a1b2c3d..e4f5a6b", color: K.muted },
      { k: "out", text: "3 files changed, 42 insertions(+)", color: K.warn },
      { k: "cmd", text: "git log --oneline -1" },
      { k: "out", text: "e4f5a6b fix: restore homepage", color: K.text },
    ],
  },
  {
    label: "Manage Remote Databases",
    sub: "query · backup · inspect",
    color: K.primary,
    items: [
      { k: "cmd", text: "psql -h 10.0.0.5 -U app" },
      { k: "out", text: "app=# SELECT count(*) FROM users;", color: K.muted },
      { k: "out", text: " count: 12840", color: K.primary },
    ],
  },
  {
    label: "Execute Remote Commands",
    sub: "one line, any server",
    color: K.accent,
    items: [
      { k: "cmd", text: "ssh user@server 'df -h /'" },
      { k: "out", text: "/dev/vda1   40G   17G   42%  /", color: K.accent },
      { k: "cmd", text: "ssh user@server uptime" },
      { k: "out", text: "up 41 days, load average: 0.12", color: K.accent },
    ],
  },
];

export const Scene08: React.FC = () => {
  const t = useSec();
  const s = getSshScene(8);
  const tNode = cue(8, "Node.js");
  const tGit = cue(8, "Git Repository");
  const tRem = cue(8, "Remote Server-এর");
  const tDaily = cue(8, "প্রতিদিনের");
  const bounds = [0.3, tNode - 0.2, tGit - 0.2, tRem - 0.2, (tRem + tDaily) / 2 - 0.1, tDaily];
  let idx = 0;
  bounds.forEach((b, i) => {
    if (i < PANELS.length && t >= b) idx = i;
  });
  const start = bounds[idx] as number;
  const endT = bounds[idx + 1] as number;
  const panel = PANELS[idx] as (typeof PANELS)[number];
  const enter = prog(t, start, start + 0.55);
  const exit = idx < PANELS.length ? 1 - prog(t, endT - 0.35, endT) : 1;

  // schedule typed lines
  const lines: TermLine[] = [];
  let at = start + 0.5;
  for (const it of panel.items) {
    if (it.k === "cmd") {
      const dur = it.text.length / 20;
      if (t >= at) lines.push({ text: typed(it.text, t, at, 20), prompt: true });
      at += dur + 0.3;
    } else {
      if (t >= at) lines.push({ text: it.text, color: it.color });
      at += 0.35;
    }
  }
  const finale = prog(t, tDaily, tDaily + 0.7);

  return (
    <StoryScene
      id={8}
      tint={panel.color}
      cam={[
        { t: 0, z: 1.0, x: 0 },
        { t: s.voiceSec, z: 1.08, x: 0 },
      ]}
      sfx={[
        { at: 0.3, type: "whoosh" },
        { at: tNode - 0.2, type: "whoosh" },
        { at: tGit - 0.2, type: "whoosh" },
        { at: tRem - 0.2, type: "whoosh" },
        { at: bounds[4] as number, type: "whoosh" },
        { at: tDaily, type: "chime" },
      ]}
    >
      <div style={{ opacity: 1 - finale * 0.85 }}>
        {/* progress dots */}
        <At x={540} y={300}>
          <div style={{ display: "flex", gap: 14 }}>
            {PANELS.map((p, i) => (
              <div key={p.label} style={{ width: i === idx ? 58 : 18, height: 14, borderRadius: 7, background: i <= idx ? p.color : "#2A3560", boxShadow: i === idx ? `0 0 16px ${p.color}` : "none" }} />
            ))}
          </div>
        </At>
        <At x={540 + (1 - enter) * 160} y={430} opacity={enter * exit}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: F_EN, fontWeight: 800, fontSize: 62, color: K.text, textShadow: `0 0 34px ${panel.color}77` }}>{panel.label}</div>
            <div style={{ fontFamily: F_EN, fontSize: 32, color: panel.color, letterSpacing: "0.14em", marginTop: 8 }}>{panel.sub.toUpperCase()}</div>
          </div>
        </At>
        <At x={540 + (1 - enter) * 220 - (1 - exit) * 220} y={1010} opacity={enter * exit} scale={0.96 + 0.04 * enter}>
          <TerminalWindow lines={lines} width={960} height={700} fontSize={34} title={`user@server · ${panel.label.toLowerCase()}`} glow={panel.color} />
        </At>
      </div>
      <At x={540} y={880} opacity={finale} scale={0.9 + 0.1 * finale}>
        <div style={{ textAlign: "center", background: "rgba(8,12,26,0.88)", padding: "40px 56px", borderRadius: 34, border: `2px solid ${K.accent}77`, boxShadow: `0 0 80px ${K.accent}33` }}>
          <div style={{ fontFamily: F_EN, fontWeight: 800, fontSize: 72, color: K.text, lineHeight: 1.1 }}>
            Backend <span style={{ color: K.accent }}>+</span> DevOps
          </div>
          <div style={{ fontFamily: F_EN, fontWeight: 600, fontSize: 44, color: K.accent, marginTop: 14 }}>SSH is an everyday tool</div>
        </div>
      </At>
    </StoryScene>
  );
};

/* ───────────── Scene 9 — Security warning ───────────── */
export const Scene09: React.FC = () => {
  const t = useSec();
  const s = getSshScene(9);
  const tKey = cue(9, "Private Key");
  const tStrong = cue(9, "Strong Authentication");
  const tAcc = cue(9, "Access Permission");
  const lockP = prog(t, tKey, tKey + 0.9);
  const shield = prog(t, tKey + 0.6, tKey + 1.6);
  const msgs = [
    { at: tKey, text: "Protect Your Private Keys.", c: K.warn },
    { at: tStrong, text: "Use Strong Authentication.", c: K.accent },
    { at: tAcc, text: "Control Server Access.", c: K.primary },
  ];
  return (
    <StoryScene
      id={9}
      tint={K.warn}
      cam={[
        { t: 0, z: 1.0, y: 40 },
        { t: tKey + 1, z: 1.1, y: -30 },
        { t: s.voiceSec, z: 1.02, y: 0 },
      ]}
      sfx={[
        { at: 0.2, type: "riser", vol: 0.18 },
        { at: tKey + 0.1, type: "click" },
        { at: tKey + 0.8, type: "chime" },
        { at: tStrong, type: "pop" },
        { at: tAcc, type: "pop" },
      ]}
    >
      <At x={540} y={620}>
        <LaptopScene w={760} h={460} glow={K.warn} tilt={3}>
          <div style={{ width: "100%", height: "100%", background: "#0A1226", padding: 36, fontFamily: F_MONO, fontSize: 28, color: K.muted }}>
            <div style={{ color: K.accent, marginBottom: 14 }}>~/.ssh</div>
            <div style={{ opacity: 0.6, marginBottom: 12 }}>known_hosts</div>
            <div style={{ opacity: 0.6, marginBottom: 12 }}>id_ed25519.pub</div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, background: `${K.warn}1f`, border: `2px solid ${K.warn}`, borderRadius: 14, padding: "12px 18px", color: K.warn, fontWeight: 700, boxShadow: `0 0 ${30 * lockP}px ${K.warn}66` }}>
              <KeyIcon size={44} color={K.warn} />
              id_ed25519
              <span style={{ marginLeft: "auto", opacity: lockP }}>
                <LockIcon size={44} color={K.warn} />
              </span>
            </div>
            <div style={{ marginTop: 22, color: K.ok, opacity: prog(t, tKey + 0.5, tKey + 1.2) }}>
              $ chmod 600 id_ed25519
            </div>
          </div>
        </LaptopScene>
      </At>
      <At x={540} y={620} opacity={shield} scale={0.5 + 0.55 * shield}>
        <ShieldIcon size={560} color={K.accent} check={false} />
      </At>

      {msgs.map((m, i) => {
        const p = prog(t, m.at, m.at + 0.5);
        return (
          <At key={m.text} x={540} y={1050 + i * 150} opacity={p} scale={0.94 + 0.06 * p}>
            <div style={{ display: "flex", alignItems: "center", gap: 20, background: "rgba(8,12,26,0.85)", border: `2px solid ${m.c}88`, padding: "20px 38px", borderRadius: 24, boxShadow: `0 0 40px ${m.c}28`, transform: `translateX(${(1 - p) * 90}px)` }}>
              <div style={{ width: 20, height: 20, borderRadius: 10, background: m.c, boxShadow: `0 0 16px ${m.c}` }} />
              <div style={{ fontFamily: F_EN, fontWeight: 700, fontSize: 46, color: K.text, whiteSpace: "nowrap" }}>{m.text}</div>
            </div>
          </At>
        );
      })}
    </StoryScene>
  );
};

/* ───────────── Scene 10 — Cinematic ending ───────────── */
export const Scene10: React.FC = () => {
  const t = useSec();
  const s = getSshScene(10);
  const tNotif = cue(10, "Notification");
  const tFind = cue(10, "সমস্যা খুঁজে");
  const tUp = cue(10, "সচল");
  const tTitle = cue(10, "এটাই SSH");
  const tCta = cue(10, "শেখা শুরু");
  const up = t > tUp;
  const upP = prog(t, tUp, tUp + 0.8);
  const col = up ? K.ok : K.accent;
  const titleP = prog(t, tTitle, tTitle + 1) * (1 - prog(t, tCta - 0.3, tCta + 0.3));
  const ctaP = prog(t, tCta - 0.1, tCta + 0.6);

  const lines: TermLine[] = [];
  const c1 = "ssh user@192.168.1.100";
  const c2 = "tail -n 2 error.log";
  const c3 = "sudo systemctl restart nginx";
  if (t > tNotif + 0.2) lines.push({ text: typed(c1, t, tNotif + 0.2, 16), prompt: true });
  if (t > tNotif + 2) lines.push({ text: "Authentication successful.", color: K.ok });
  if (t > tFind - 0.4) lines.push({ text: "user@ubuntu:~$ " + typed(c2, t, tFind - 0.4, 14) });
  if (t > tFind + 1.3) lines.push({ text: "nginx: worker process crashed", color: K.err });
  if (t > tFind + 2.2) lines.push({ text: "user@ubuntu:~$ " + typed(c3, t, tFind + 2.2, 14) });
  if (t > tFind + 4) lines.push({ text: "● nginx restarted — active", color: K.ok });

  return (
    <StoryScene
      id={10}
      tint={col}
      fadeOut={1.1}
      cam={[
        { t: 0, z: 1.0, y: 30 },
        { t: tUp, z: 1.12, y: -40 },
        { t: tTitle, z: 1.0, y: 0 },
        { t: s.voiceSec, z: 1.04, y: 0 },
      ]}
      sfx={[
        { at: 0.3, type: "pop" },
        { at: tFind + 4, type: "click" },
        { at: tUp, type: "chime" },
        { at: tUp + 0.1, type: "riser", vol: 0.18 },
        { at: tTitle, type: "whoosh" },
        { at: tCta, type: "chime", vol: 0.2 },
      ]}
    >
      <At x={540} y={250} opacity={0.9}>
        <RemoteServer w={230} units={2} alert={!up} active={up ? 0.8 : 0.2} glow={col} />
      </At>
      <NetworkTunnel x1={540} y1={1010} x2={540} y2={380} progress={prog(t, 0.4, 1.6)} color={col} secure packets={up ? 4 : 2} packetColor={up ? K.ok : K.text} />

      <At x={540} y={1180} opacity={prog(t, 0, 0.5)}>
        <LaptopScene w={760} h={470} glow={col} tilt={3}>
          {up && upP > 0.4 ? (
            <WebsiteWindow state="up" width={748} height={458} />
          ) : (
            <TerminalWindow lines={lines} width={748} height={458} fontSize={26} title="user@laptop" glow={col} />
          )}
        </LaptopScene>
      </At>
      <At x={540} y={1650}>
        <DeveloperCharacter glow={col} typing={!up} />
      </At>
      <GlitchSlice t={t} at={tUp} dur={0.25} color={K.ok} />

      {/* final title */}
      <At x={540} y={640} opacity={titleP}>
        <div style={{ textAlign: "center", background: "radial-gradient(ellipse, rgba(8,12,26,0.9) 45%, transparent 75%)", padding: "30px 60px" }}>
          <div style={{ fontFamily: F_EN, fontWeight: 800, fontSize: 130, color: K.text, textShadow: `0 0 50px ${K.accent}88`, letterSpacing: "0.05em" }}>SSH</div>
          <div style={{ fontFamily: F_EN, fontWeight: 700, fontSize: 54, color: K.accent, marginTop: 4 }}>The Invisible Connection</div>
          <div style={{ fontFamily: F_EN, fontWeight: 500, fontSize: 40, color: K.muted, marginTop: 8 }}>Behind Every Developer.</div>
        </div>
      </At>
      {/* CTA */}
      <At x={540} y={650} opacity={ctaP} scale={interpolate(ctaP, [0, 1], [0.94, 1])}>
        <div style={{ textAlign: "center", fontFamily: F_EN, fontWeight: 800, fontSize: 76, lineHeight: 1.22, color: K.text, background: "radial-gradient(ellipse, rgba(8,12,26,0.9) 45%, transparent 78%)", padding: "30px 40px" }}>
          LEARN SSH.
          <br />
          <span style={{ color: K.accent }}>CONTROL YOUR SERVER.</span>
          <br />
          BUILD WITH <span style={{ color: K.ok }}>CONFIDENCE.</span>
        </div>
      </At>
    </StoryScene>
  );
};
