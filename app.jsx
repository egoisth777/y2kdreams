// y2kdream — design system showcase + UI mockup
// Lives inside #root. Uses tokens.css for all color values.

const { useState, useEffect, useMemo } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "hueShift": 0,
  "saturation": 1.0,
  "contrast": 1.0,
  "accent": "forest",
  "showGlass": true
}/*EDITMODE-END*/;

const ACCENT_PRESETS = {
  forest:   { h: 135, c: 0.060 },
  peach:    { h: 50,  c: 0.085 },
  rose:     { h: 15,  c: 0.085 },
  butter:   { h: 88,  c: 0.080 },
  lavender: { h: 295, c: 0.080 },
  sky:      { h: 232, c: 0.075 },
};

// ── Ramps to render in the swatch grid (raw palette anchors) ──
const RAMPS = [
  { name: "Forest",   desc: "Hero accent",    base: { h: 135, c: 0.060 } },
  { name: "Peach",    desc: "Sunset glow",    base: { h: 50,  c: 0.085 } },
  { name: "Rose",     desc: "Secondary",      base: { h: 15,  c: 0.085 } },
  { name: "Butter",   desc: "Highlight",      base: { h: 88,  c: 0.075 } },
  { name: "Blush",    desc: "Surface tint",   base: { h: 8,   c: 0.045 } },
  { name: "Lavender", desc: "Tertiary",       base: { h: 295, c: 0.080 } },
  { name: "Sky",      desc: "Info / link",    base: { h: 232, c: 0.075 } },
  { name: "Cream",    desc: "Background",     base: { h: 70,  c: 0.025 } },
  { name: "Ink",      desc: "Foreground",     base: { h: 48,  c: 0.018 } },
];

// 8 lightness stops per ramp
const STOPS = [97, 92, 86, 78, 68, 56, 42, 28];

function buildRamp(base, hueShift = 0, satMul = 1) {
  return STOPS.map((L) => {
    const c = (base.c * satMul).toFixed(3);
    const h = ((base.h + hueShift) % 360 + 360) % 360;
    return { L, c, h, css: `oklch(${L}% ${c} ${h})` };
  });
}

// ── Token cards (semantic) ──
const SEMANTIC_TOKENS = [
  { group: "Surface", items: [
    { name: "--bg",          desc: "Page background" },
    { name: "--bg-elevated", desc: "Elevated card / panel" },
    { name: "--surface",     desc: "Sidebar, secondary panel" },
    { name: "--surface-2",   desc: "Hover / nested" },
    { name: "--surface-sunk",desc: "Sunken input / well" },
  ]},
  { group: "Text", items: [
    { name: "--text",        desc: "Primary copy" },
    { name: "--text-muted",  desc: "Secondary copy" },
    { name: "--text-subtle", desc: "Captions, hints" },
    { name: "--text-inverse",desc: "On dark / on accent" },
  ]},
  { group: "Border", items: [
    { name: "--border",        desc: "Default 1px line" },
    { name: "--border-strong", desc: "Buttons, focus ring base" },
    { name: "--divider",       desc: "Subtle internal rule" },
  ]},
  { group: "Accent", items: [
    { name: "--accent",      desc: "Primary action" },
    { name: "--accent-soft", desc: "Tinted bg for accent" },
    { name: "--accent-2",    desc: "Rose secondary" },
    { name: "--accent-3",    desc: "Lavender tertiary" },
  ]},
  { group: "Semantic", items: [
    { name: "--success", desc: "Positive state" },
    { name: "--warning", desc: "Caution state" },
    { name: "--danger",  desc: "Error / destructive" },
    { name: "--info",    desc: "Neutral info" },
  ]},
];

function Sparkle() {
  return <span className="sparkle">✦</span>;
}

function Hero({ theme }) {
  return (
    <div className="hero">
      <div>
        <div className="tag">y2kdream &nbsp;·&nbsp; v1.0 &nbsp;·&nbsp; {theme} mode</div>
        <h1 className="wordmark">y2k<em>dream</em></h1>
        <p className="lede">
          A nostalgic, eye-friendly color system. Forest, butter, and rose
          drift across warm cream by day and warm charcoal by night —
          dusty saturation kept low for long sessions.
        </p>
      </div>
      <div className="meta">
        <div><b>Hue family</b>&nbsp;&nbsp; warm</div>
        <div><b>Color space</b>&nbsp;&nbsp; oklch</div>
        <div><b>Modes</b>&nbsp;&nbsp; light · dark</div>
        <div><b>Tokens</b>&nbsp;&nbsp; 48 semantic</div>
        <div style={{marginTop: 8, color: 'var(--accent)'}}>✦ &nbsp; Saved Apr 27, 2026</div>
      </div>
    </div>
  );
}

function SwatchRamp({ name, desc, base, hueShift, sat }) {
  const ramp = useMemo(() => buildRamp(base, hueShift, sat), [base, hueShift, sat]);
  return (
    <div className="ramp">
      <div className="ramp-name">
        <b>{name}</b>
        <span style={{fontSize: 11, color: 'var(--text-subtle)'}}>{desc}</span>
      </div>
      {ramp.map((s, i) => (
        <div key={i} className="swatch" style={{ background: s.css }} title={s.css}>
          <span className="lbl">{STOPS[i]}</span>
        </div>
      ))}
    </div>
  );
}

function Palette({ hueShift, sat }) {
  return (
    <section>
      <h2>Palette</h2>
      <div className="sec-sub">8-step ramps · oklch · low chroma</div>
      <div className="swatch-row">
        {RAMPS.map((r) => (
          <SwatchRamp key={r.name} {...r} hueShift={hueShift} sat={sat} />
        ))}
      </div>
    </section>
  );
}

function TokenChip({ varName, desc }) {
  return (
    <div className="token-card">
      <div className="chip checker">
        <div className="chip-inner" style={{ background: `var(${varName})` }} />
      </div>
      <div>
        <div className="tk-name">{varName}</div>
        <div className="tk-val" style={{textAlign:'left', color:'var(--text-subtle)'}}>{desc}</div>
      </div>
    </div>
  );
}

function Tokens() {
  return (
    <section>
      <h2>Semantic tokens</h2>
      <div className="sec-sub">Mapped per theme · use these in your app</div>
      {SEMANTIC_TOKENS.map((g) => (
        <div key={g.group} style={{marginBottom: 22}}>
          <div style={{fontSize: 11.5, color: 'var(--text-muted)', margin: '6px 0 10px', letterSpacing: '.06em', textTransform:'uppercase'}}>{g.group}</div>
          <div className="tokens-grid">
            {g.items.map((t) => <TokenChip key={t.name} varName={t.name} desc={t.desc} />)}
          </div>
        </div>
      ))}
    </section>
  );
}

function Typography() {
  return (
    <section>
      <h2>Type</h2>
      <div className="sec-sub">Fraunces · Inter · JetBrains Mono</div>
      <div className="type-grid">
        <div className="type-card">
          <div className="label">Display · Fraunces</div>
          <p className="specimen-1">Soft <em>summer</em> futures</p>
          <p className="specimen-2">A serif with optical sizing — italic and roman alternate to feel hand-set, not hand-made.</p>
        </div>
        <div className="type-card">
          <div className="label">Mono · JetBrains Mono</div>
<pre className="specimen-mono">{`const dream = {
  hue: "forest",
  mood: "soft",
  era: 2002,
};`}</pre>
        </div>
      </div>
    </section>
  );
}

function MockupTerminal() {
  return (
    <section>
      <h2>In situ — “dreambox” terminal</h2>
      <div className="sec-sub">An original UI built with the palette · light/dark toggles below</div>
      <div className="mock-frame">
        <div className="mock-titlebar">
          <span className="traffic"><span /><span /><span /></span>
          <div className="mock-tabs">
            <div className="mock-tab active">~ · base</div>
            <div className="mock-tab">~/dev</div>
            <div className="mock-tab">notes.md</div>
          </div>
          <div className="mock-search">⌕ &nbsp; Search sessions, files…</div>
        </div>
        <div className="mock-body">
          <aside className="mock-side">
            <div className="side-search">⌕ &nbsp; Search tabs</div>
            <div className="side-group">Sessions</div>
            <div className="side-item active"><span className="dot" /> base ~</div>
            <div className="side-item"><span className="dot" /> ~/dev</div>
            <div className="side-item"><span className="dot" /> ~/repos</div>
            <div className="side-group" style={{marginTop: 16}}>Workspace</div>
            <div className="side-item">⚙︎ &nbsp; Settings</div>
            <div className="side-item">✦ &nbsp; Themes</div>
            <div className="side-item">⌥ &nbsp; Keybinds</div>
          </aside>

          <div className="mock-pane">
            <div className="pane-prompt">base&nbsp;~&nbsp; <span className="t">(0.68s)</span></div>
            <div className="pane-line">Welcome to <span className="link">dreambox</span> 2026.4 — y2kdream theme active.</div>
            <div className="pane-line"><span className="pane-bullet">✦</span> Docs:&nbsp;&nbsp; <span className="link">help.dreambox.dev</span></div>
            <div className="pane-line"><span className="pane-bullet">✦</span> Updates:&nbsp; <span className="link">dreambox.dev/release</span></div>
            <div className="pane-line"><span className="pane-bullet">✦</span> Soft confined sessions keep memory tidy. Eye-friendly by default.</div>
            <div className="pane-prev">Previous session · Mon Apr 27 at 8:52 PM</div>
            <div className="pane-prompt">base&nbsp;~&nbsp; <span className="t">(0.13s)</span></div>
            <div className="pane-line"><b style={{color:'var(--text)'}}>ls</b></div>
            <div className="pane-files">
              <span>applications</span><span>configs</span><span>dev</span>
              <span>downloads</span><span>git-repos</span><span>go</span>
              <span>repos</span><span>snap</span><span>temp</span>
            </div>
          </div>

          <div className="mock-pane">
            <div className="pane-prompt">base&nbsp;~&nbsp; <span className="t">(0.13s)</span></div>
            <div className="pane-line"><b style={{color:'var(--text)'}}>cd E:\repos</b></div>
            <div className="pane-error">
              <span className="err">bash:</span> cd: E:repos: No such file or directory
            </div>
            <div className="pane-prompt">base&nbsp;~&nbsp; <span className="t">(0.20s)</span></div>
            <div className="pane-line"><b style={{color:'var(--text)'}}>cd ~/dev && ls</b></div>
            <div className="pane-files">
              <span>cli</span><span>dreambox</span><span>notes</span>
              <span>playground</span><span>scratch</span><span>web</span>
            </div>
            <div className="pane-prompt" style={{marginTop:10}}>base&nbsp;~/dev&nbsp; <span className="t">(0.04s)</span></div>
            <div className="pane-line"><b style={{color:'var(--text)'}}>git status</b></div>
            <div className="pane-line" style={{color:'var(--syn-string)'}}>nothing to commit, working tree clean</div>
            <div className="pane-line" style={{color:'var(--text-subtle)', marginTop:6}}>● connected · 2 agents idle</div>
          </div>
        </div>
        <div className="mock-runbar">
          <span className="pill">⌘ K</span><span>Run command</span>
          <span style={{marginLeft:'auto'}}>ctrl+shift+/ &nbsp;·&nbsp; new agent conversation</span>
        </div>
      </div>
    </section>
  );
}

function Components({ showGlass }) {
  return (
    <section>
      <h2>Components</h2>
      <div className="sec-sub">Buttons · inputs · badges · glass · code · progress</div>
      <div className="comps">

        <div className="comp-card">
          <div className="comp-label">Buttons</div>
          <div className="row">
            <button className="btn btn-primary">Continue</button>
            <button className="btn">Cancel</button>
            <button className="btn btn-soft">Tinted</button>
            <button className="btn btn-ghost">Ghost</button>
          </div>
          <div className="row" style={{marginTop:14}}>
            <span className="badge success"><span className="dot"/> Synced</span>
            <span className="badge warning"><span className="dot"/> Drafting</span>
            <span className="badge danger"><span className="dot"/> Offline</span>
            <span className="badge info"><span className="dot"/> Beta</span>
          </div>
        </div>

        <div className="comp-card">
          <div className="comp-label">Form</div>
          <div className="input-shell">
            <label>Project name</label>
            <input className="input" defaultValue="dreambox-cli" />
          </div>
          <div className="input-shell" style={{marginTop:12}}>
            <label>Notes</label>
            <input className="input" placeholder="Write something soft…" />
          </div>
          <div style={{marginTop:14}}>
            <div style={{display:'flex', justifyContent:'space-between', fontSize:11.5, color:'var(--text-muted)', marginBottom:6}}>
              <span>Indexing</span><span>74%</span>
            </div>
            <div className="progress"><i style={{width:'74%'}} /></div>
          </div>
        </div>

        {showGlass && (
        <div className="comp-card" style={{
          background: 'linear-gradient(135deg, var(--accent-soft), var(--accent-3-soft) 60%, var(--accent-2-soft))',
          padding: 28,
        }}>
          <div className="comp-label" style={{color:'var(--text-muted)'}}>Frosted glass · aero</div>
          <div className="glass">
            <h3 className="glass-title">A cloud you can read</h3>
            <p className="glass-desc">Backdrop blur + saturate over the dreamy gradient. Use sparingly — once per screen, max.</p>
            <div className="row" style={{marginTop:14}}>
              <button className="btn btn-primary">Open</button>
              <button className="btn btn-ghost">Later</button>
            </div>
          </div>
        </div>
        )}

        <div className="comp-card">
          <div className="comp-label">Code · syntax</div>
          <div className="codeblock">
<span className="c">{`// y2kdream syntax sample`}</span>{`\n`}
<span className="k">import</span> {' '}<span className="v">{`{ palette }`}</span> <span className="k">from</span> <span className="s">'./dream'</span><span className="pn">;</span>{`\n\n`}
<span className="k">const</span> <span className="f">dream</span> <span className="pn">=</span> <span className="pn">(</span><span className="v">mood</span><span className="pn">)</span> <span className="pn">{'=>'}</span> <span className="pn">{'{'}</span>{`\n`}
{`  `}<span className="k">return</span> <span className="v">palette</span><span className="pn">[</span><span className="s">'forest'</span><span className="pn">]</span><span className="pn">;</span>{`\n`}
<span className="pn">{'}'}</span><span className="pn">;</span>{`\n\n`}
<span className="t">{`<Sky`}</span> <span className="p">opacity</span><span className="pn">=</span><span className="s">"0.62"</span> <span className="t">/{'>'}</span>
          </div>
        </div>

      </div>
    </section>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', t.theme);
  }, [t.theme]);

  // Apply live accent override (for Tweaks: forest/rose/butter/lavender/sky)
  useEffect(() => {
    const root = document.documentElement;
    const preset = ACCENT_PRESETS[t.accent] || ACCENT_PRESETS.forest;
    const h = ((preset.h + Number(t.hueShift)) % 360 + 360) % 360;
    const c = (preset.c * Number(t.saturation)).toFixed(3);
    const cSoft = (preset.c * 0.55 * Number(t.saturation)).toFixed(3);
    const isDark = t.theme === 'dark';

    // contrast multiplier — pushes text darker (light) / lighter (dark)
    const ctr = Number(t.contrast);
    if (isDark) {
      root.style.setProperty('--accent',      `oklch(${82}% ${c} ${h})`);
      root.style.setProperty('--accent-hover',`oklch(${88}% ${c} ${h})`);
      root.style.setProperty('--accent-soft', `oklch(${32}% ${cSoft} ${h})`);
      root.style.setProperty('--text',        `oklch(${Math.min(98, 94 * ctr)}% 0.018 70)`);
      root.style.setProperty('--text-muted',  `oklch(${Math.min(95, 74 * ctr)}% 0.020 60)`);
    } else {
      root.style.setProperty('--accent',      `oklch(${74.5}% ${c} ${h})`);
      root.style.setProperty('--accent-hover',`oklch(${66}% ${c} ${h})`);
      root.style.setProperty('--accent-soft', `oklch(${92}% ${cSoft} ${h})`);
      root.style.setProperty('--text',        `oklch(${Math.max(14, 28 / ctr)}% 0.018 45)`);
      root.style.setProperty('--text-muted',  `oklch(${Math.max(30, 48 / ctr)}% 0.020 45)`);
    }
  }, [t.accent, t.hueShift, t.saturation, t.contrast, t.theme]);

  return (
    <>
      <div className="atmosphere" />
      <main>
        <Hero theme={t.theme} />
        <Palette hueShift={Number(t.hueShift)} sat={Number(t.saturation)} />
        <Tokens />
        <Typography />
        <MockupTerminal />
        <Components showGlass={t.showGlass} />
        <div className="footnote">
          <span className="star">✦</span>&nbsp;&nbsp; y2kdream &nbsp;·&nbsp; soft on the eyes, soft on the heart &nbsp;&nbsp;<span className="star">✦</span>
        </div>
      </main>

      <TweaksPanel>
        <TweakSection label="Theme" />
        <TweakRadio
          label="Mode"
          value={t.theme}
          options={['light', 'dark']}
          onChange={(v) => setTweak('theme', v)}
        />
        <TweakSelect
          label="Accent family"
          value={t.accent}
          options={['forest', 'peach', 'rose', 'butter', 'lavender', 'sky']}
          onChange={(v) => setTweak('accent', v)}
        />
        <TweakToggle
          label="Frosted glass"
          value={t.showGlass}
          onChange={(v) => setTweak('showGlass', v)}
        />

        <TweakSection label="Color tuning" />
        <TweakSlider
          label="Hue shift"
          value={Number(t.hueShift)}
          min={-60} max={60} step={1} unit="°"
          onChange={(v) => setTweak('hueShift', v)}
        />
        <TweakSlider
          label="Saturation"
          value={Number(t.saturation)}
          min={0.2} max={1.8} step={0.05}
          onChange={(v) => setTweak('saturation', v)}
        />
        <TweakSlider
          label="Contrast"
          value={Number(t.contrast)}
          min={0.8} max={1.4} step={0.02}
          onChange={(v) => setTweak('contrast', v)}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
