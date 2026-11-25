import React, { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import JSZip from "jszip";
import type { HeadFineTuningParams } from "../anatomy/parametricHead3DMM";
import { RickTaylorRig, type RickMotion, type RickWeaponId, type RickPoseMode } from "../characters/RickTaylorCharacter3DHD";

export interface CharacterWebViewerProps {
  height?: string | number;
  initialPose?: RickPoseMode;
  initialWeapon?: RickWeaponId | null;
  bloodIntensity?: number;
  headTuning?: Partial<HeadFineTuningParams>;
  showControls?: boolean;
}

type ExportFile = { key: string; folder: string; original: string; suggestion: string; source: string };
const RAW = "https://raw.githubusercontent.com/elilopes/procedural-character-3D-HD-library-react-R3F/main/";
const FILES: Omit<ExportFile, "source">[] = [
  { key: "character", folder: "src/characters", original: "RickTaylorCharacter3DHD.tsx", suggestion: "RickTaylorCharacter3DHD.tsx" },
  { key: "head", folder: "src/anatomy", original: "parametricHead3DMM.ts", suggestion: "parametricHead3DMM.ts" },
  { key: "materials", folder: "src/materials", original: "proceduralSurfaceMaps.ts", suggestion: "proceduralSurfaceMaps.ts" },
  { key: "motion", folder: "src/animation", original: "rickMotionPresets.ts", suggestion: "rickMotionPresets.ts" },
];
const panel: React.CSSProperties = { background: "#171923", color: "#e8eaf2", border: "1px solid #343849", borderRadius: 10, padding: 16, marginTop: 12, font: "13px/1.55 system-ui" };
const codeStyle: React.CSSProperties = { display: "block", whiteSpace: "pre", overflowX: "auto", background: "#0b0d13", color: "#c9e6d4", padding: 12, borderRadius: 8, fontSize: 12, marginTop: 8 };

function Guide({ language }: { language: "en" | "pt" }) {
  const pt = language === "pt";
  const [step, setStep] = useState(0);
  const codeInstall = "npm install three @types/three react @react-three/fiber @react-three/drei";
  const tree = `src/
  characters/
    RickTaylorCharacter3DHD.tsx
  anatomy/
    parametricHead3DMM.ts
  materials/
    proceduralSurfaceMaps.ts
  animation/
    rickMotionPresets.ts
  game/
    RickInGame.tsx`;
  const importCode = `import { Canvas } from "@react-three/fiber";
import { RickTaylorRig, createRickWalkMotion } from "./characters";`;
  const gameCode = `import React from "react";
import { Canvas } from "@react-three/fiber";
import { RickTaylorRig, createRickIdleMotion } from "../index";

export function RickInGame() {
  const motion = createRickIdleMotion("pipe");

  return (
    <Canvas camera={{ position: [0, 2, -4], fov: 42 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 5, 2]} intensity={1.4} castShadow />
      <RickTaylorRig
        motion={motion}
        equippedWeapon="pipe"
        bloodIntensity={0.5}
      />
    </Canvas>
  );
}`;
  const animateCode = `import { useState } from "react";
import { RickTaylorRig, createRickWalkMotion, createRickIdleMotion } from "../index";

export function RickController() {
  const [moving, setMoving] = useState(false);
  const motion = moving ? createRickWalkMotion("pipe") : createRickIdleMotion("pipe");

  return <>
    <button onClick={() => setMoving(v => !v)}>Toggle walk</button>
    <RickTaylorRig motion={motion} equippedWeapon="pipe" />
  </>;
}`;
  return <div style={panel}>
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
      {(pt ? ["1. Dependências", "2. Pastas e arquivos", "3. Copiar módulos", "4. Invocar no jogo", "5. Movimentação"] : ["1. Dependencies", "2. Folders and files", "3. Copy modules", "4. Use in game", "5. Animation"]).map((label, i) =>
        <button key={label} onClick={() => setStep(i)} style={{ background: step === i ? "#536dfe" : "#292d3b", color: "white", border: 0, borderRadius: 6, padding: "7px 10px", cursor: "pointer" }}>{label}</button>)}
    </div>
    {step === 0 && <><h3>{pt ? "Instale as dependências" : "Install dependencies"}</h3><p>{pt ? "O personagem usa React, Three.js e React Three Fiber. O Drei fornece utilitários usados pelo visualizador." : "The character uses React, Three.js and React Three Fiber. Drei provides utilities used by the web viewer."}</p><pre style={codeStyle}>{codeInstall}</pre><p>{pt ? "A versão principal do React deve ser compatível com a versão do Fiber: Fiber 8 com React 18; Fiber 9 com React 19." : "The React major version must match Fiber: Fiber 8 with React 18; Fiber 9 with React 19."}</p></>}
    {step === 1 && <><h3>{pt ? "Crie esta estrutura dentro de src/" : "Create this structure inside src/"}</h3><pre style={codeStyle}>{tree}</pre><p>{pt ? "Os caminhos relativos são importantes: o rig importa a cabeça e os mapas PBR dessas pastas. Não coloque os quatro arquivos soltos na mesma pasta sem ajustar os imports." : "Relative paths matter: the rig imports the head and PBR maps from these folders. Do not flatten the four files into one folder unless you also update their imports."}</p></>}
    {step === 2 && <><h3>{pt ? "Copie os módulos da biblioteca" : "Copy the library modules"}</h3><ol><li>{pt ? "Abra o repositório GitHub e entre em src/." : "Open the GitHub repository and navigate to src/."}</li><li>{pt ? "Crie characters, anatomy, materials e animation no seu projeto." : "Create characters, anatomy, materials and animation in your project."}</li><li>{pt ? "Copie cada arquivo correspondente para a pasta indicada na árvore acima." : "Copy each matching file into the folder shown in the tree above."}</li><li>{pt ? "Mantenha os nomes originais ou ajuste os imports relativos se renomear." : "Keep the original names or update relative imports if you rename files."}</li></ol><p><a style={{ color: "#9fb2ff" }} href="https://github.com/elilopes/procedural-character-3D-HD-library-react-R3F/tree/main/src" target="_blank" rel="noreferrer">{pt ? "Abrir os arquivos-fonte no GitHub" : "Open source files on GitHub"}</a></p></>}
    {step === 3 && <><h3>{pt ? "Invoque o personagem em uma cena R3F" : "Mount the character in an R3F scene"}</h3><pre style={codeStyle}>{gameCode}</pre><p>{pt ? "Salve como src/game/RickInGame.tsx e renderize <RickInGame /> na sua tela de jogo. O Canvas deve ser criado uma única vez no nível da cena; se o jogo já possui Canvas, insira apenas RickTaylorRig dentro dele." : "Save as src/game/RickInGame.tsx and render <RickInGame /> in your game screen. Create Canvas once at scene level; if your game already has a Canvas, mount only RickTaylorRig inside it."}</p></>}
    {step === 4 && <><h3>{pt ? "Controle a movimentação pelo estado" : "Drive animation from game state"}</h3><pre style={codeStyle}>{animateCode}</pre><p>{pt ? "Os presets criam estados RickMotion. O rig executa a animação procedural no useFrame, mas o jogo precisa controlar o tempo/progresso de ataques e agarrões e atualizar as props a cada mudança. Física, colisão, dano e IA pertencem ao jogo." : "Presets create RickMotion states. The rig performs procedural animation in useFrame, but the game must drive attack/grab timing and progress and update props when state changes. Physics, collision, damage and AI belong to the game."}</p></>}
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14 }}>
      <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}>{pt ? "Anterior" : "Previous"}</button>
      <button onClick={() => setStep(s => Math.min(4, s + 1))} disabled={step === 4}>{pt ? "Próximo" : "Next"}</button>
    </div>
  </div>;
}

function ExportPanel() {
  const [names, setNames] = useState<Record<string, string>>(() => Object.fromEntries(FILES.map(f => [f.key, f.suggestion])));
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [includeMotion, setIncludeMotion] = useState(true);
  const [includeViewer, setIncludeViewer] = useState(false);
  const files = FILES.filter(f => includeMotion || f.key !== "motion");
  const loadFiles = async () => Promise.all(files.map(async f => {
    const response = await fetch(RAW + f.folder + "/" + f.original);
    if (!response.ok) throw new Error("Could not download " + f.original + " (" + response.status + ")");
    return { ...f, source: await response.text(), name: names[f.key].trim() || f.suggestion };
  }));
  const prepare = async () => {
    const loaded = await loadFiles();
    const targetNames = Object.fromEntries(loaded.map(f => [f.key, f.name]));
    return loaded.map(f => {
      let source = f.source;
      if (f.key === "character") {
        source = source.replace("../materials/proceduralSurfaceMaps", "../materials/" + targetNames.materials.replace(/\.tsx?$/, ""));
        source = source.replace("../anatomy/parametricHead3DMM", "../anatomy/" + targetNames.head.replace(/\.tsx?$/, ""));
      }
      if (f.key === "motion") source = source.replace("../characters/RickTaylorCharacter3DHD", "../characters/" + targetNames.character.replace(/\.tsx?$/, ""));
      return { path: f.folder + "/" + f.name, source };
    });
  };
  const downloadZip = async () => {
    setBusy(true); setStatus("");
    try {
      const entries = await prepare();
      const zip = new JSZip();
      entries.forEach(f => zip.file(f.path, f.source));
      zip.file("INTEGRATION-README.txt", "Procedural Character 3D HD - integration files\nCopy the src/ folders into your React + React Three Fiber project. Install three, @react-three/fiber and @react-three/drei. See the repository README for usage examples.\n");
      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.download = "procedural-character-3d-hd.zip"; a.click();
      URL.revokeObjectURL(url);
      setStatus("ZIP ready.");
    } catch (e) { setStatus(e instanceof Error ? e.message : "Export failed."); }
    finally { setBusy(false); }
  };
  const saveFolder = async () => {
    const picker = (window as any).showDirectoryPicker;
    if (!picker) { setStatus("Folder export is not supported in this browser. Use ZIP export."); return; }
    setBusy(true); setStatus("");
    try {
      const entries = await prepare();
      const root = await picker({ mode: "readwrite" });
      for (const f of entries) {
        const parts = f.path.split("/");
        let dir = root;
        for (const part of parts.slice(0, -1)) dir = await dir.getDirectoryHandle(part, { create: true });
        const handle = await dir.getFileHandle(parts[parts.length - 1], { create: true });
        const writable = await handle.createWritable(); await writable.write(f.source); await writable.close();
      }
      setStatus("Files saved to the selected folder.");
    } catch (e) { setStatus(e instanceof Error ? e.message : "Folder export cancelled or failed."); }
    finally { setBusy(false); }
  };
  return <div style={panel}>
    <h3 style={{ marginTop: 0 }}>Export character source files</h3>
    <p>Change each filename before exporting. The exporter preserves the folder structure and rewrites internal relative imports when you rename a module.</p>
    {FILES.map(f => <label key={f.key} style={{ display: "block", margin: "10px 0" }}>
      <span style={{ display: "block", color: "#b8c0d8" }}>{f.folder}/</span>
      <input value={names[f.key]} onChange={e => setNames(v => ({ ...v, [f.key]: e.target.value }))} placeholder={f.suggestion} style={{ width: "min(100%, 420px)", padding: 8, borderRadius: 6, border: "1px solid #454b60", background: "#0d1018", color: "white" }} />
      <small style={{ display: "block", color: "#aeb6ca" }}>💡 Tip: {f.suggestion}</small>
    </label>)}
    <label style={{ display: "block", margin: "10px 0" }}><input type="checkbox" checked={includeMotion} onChange={e => setIncludeMotion(e.target.checked)} /> Include animation presets</label>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      <button disabled={busy} onClick={downloadZip}>{busy ? "Preparing…" : "Download ZIP"}</button>
      <button disabled={busy} onClick={saveFolder}>Save to selected folder</button>
    </div>
    <p style={{ color: "#aeb6ca" }}>Folder export requires a browser with the File System Access API (typically Chromium-based browsers on HTTPS or localhost). ZIP works as the fallback.</p>
    {status && <p role="status">{status}</p>}
  </div>;
}

/** Interactive browser preview and integration/export guide. */
export function CharacterWebViewer({
  height = "720px", initialPose = "idle", initialWeapon = "pipe", bloodIntensity = 0.65, headTuning, showControls = true,
}: CharacterWebViewerProps) {
  const [pose, setPose] = useState<RickPoseMode>(initialPose);
  const [weapon, setWeapon] = useState<RickWeaponId | null>(initialWeapon);
  const [language, setLanguage] = useState<"en" | "pt">("pt");
  const [tab, setTab] = useState<"preview" | "guide" | "export">("preview");
  const motion: RickMotion = useMemo(() => ({
    moving: pose === "walk", attackTime: pose === "attack" ? 0.4 : 0,
    attackStyle: pose === "attack" ? "bat" : null, attackProgress: pose === "attack" ? 0.5 : 0,
    grabTime: pose === "grab" ? 0.4 : 0, jumpHeight: pose === "jump" ? 0.35 : 0, weapon,
  }), [pose, weapon]);

  return <div style={{ width: "100%", color: "#e8eaf2", fontFamily: "system-ui" }}>
    <nav style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
      {(["preview", "guide", "export"] as const).map(t => <button key={t} onClick={() => setTab(t)} style={{ padding: "9px 14px", border: 0, borderRadius: 7, background: tab === t ? "#536dfe" : "#292d3b", color: "white", cursor: "pointer" }}>{t === "preview" ? "3D Preview" : t === "guide" ? "Integration guide" : "Export files"}</button>)}
      <span style={{ flex: 1 }} />
      <button onClick={() => setLanguage(v => v === "pt" ? "en" : "pt")}>{language === "pt" ? "English" : "Português"}</button>
    </nav>
    {tab === "preview" && <section style={{ width: "100%", height, minHeight: 420, position: "relative", overflow: "hidden", background: "#15151b", borderRadius: 12 }}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0.18, 2.18, -3.2], fov: 40 }}>
        <color attach="background" args={["#18181f"]} /><ambientLight intensity={0.65} />
        <directionalLight position={[-2.5, 4.5, -3.5]} intensity={1.45} castShadow />
        <directionalLight position={[3, 2.5, 3]} intensity={0.75} color="#9bb8ff" />
        <RickTaylorRig motion={motion} equippedWeapon={weapon} bloodIntensity={bloodIntensity} headTuning={headTuning} hideMask={false} />
        <ContactShadows position={[0, 0, 0]} opacity={0.55} scale={6} blur={1.8} />
        <Environment preset="studio" /><OrbitControls target={[0, 1.15, 0]} />
      </Canvas>
      {showControls && <div style={{ position: "absolute", left: 12, top: 12, display: "flex", flexWrap: "wrap", gap: 8, padding: 10, borderRadius: 8, background: "rgba(12,12,18,.88)", color: "white", font: "12px system-ui" }}>
        <label>Pose <select value={pose} onChange={e => setPose(e.target.value as RickPoseMode)}><option value="idle">Idle</option><option value="walk">Walk</option><option value="attack">Attack</option><option value="grab">Grab</option><option value="jump">Jump</option></select></label>
        <label>Weapon <select value={weapon ?? ""} onChange={e => setWeapon((e.target.value || null) as RickWeaponId | null)}><option value="">None</option><option value="pipe">Pipe</option><option value="machete">Machete</option><option value="shotgun">Shotgun</option><option value="sickle">Sickle</option></select></label>
      </div>}
      <div style={{ position: "absolute", right: 12, bottom: 10, color: "#ddd", font: "11px system-ui", background: "rgba(12,12,18,.65)", padding: "5px 8px", borderRadius: 6 }}>Rick Taylor · Procedural 3D HD · drag to orbit</div>
    </section>}
    {tab === "guide" && <Guide language={language} />}
    {tab === "export" && <ExportPanel />}
  </div>;
}

export default CharacterWebViewer;
