import React, { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
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

/** Interactive browser preview for reviewing the library character before game integration. */
export function CharacterWebViewer({
  height = "720px",
  initialPose = "idle",
  initialWeapon = "pipe",
  bloodIntensity = 0.65,
  headTuning,
  showControls = true,
}: CharacterWebViewerProps) {
  const [pose, setPose] = useState<RickPoseMode>(initialPose);
  const [weapon, setWeapon] = useState<RickWeaponId | null>(initialWeapon);
  const motion: RickMotion = useMemo(() => ({
    moving: pose === "walk",
    attackTime: pose === "attack" ? 0.4 : 0,
    attackStyle: pose === "attack" ? "bat" : null,
    attackProgress: pose === "attack" ? 0.5 : 0,
    grabTime: pose === "grab" ? 0.4 : 0,
    jumpHeight: pose === "jump" ? 0.35 : 0,
    weapon,
  }), [pose, weapon]);

  return (
    <section style={{ width: "100%", height, minHeight: 420, position: "relative", overflow: "hidden", background: "#15151b", borderRadius: 12 }}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0.18, 2.18, -3.2], fov: 40 }}>
        <color attach="background" args={["#18181f"]} />
        <ambientLight intensity={0.65} />
        <directionalLight position={[-2.5, 4.5, -3.5]} intensity={1.45} castShadow />
        <directionalLight position={[3, 2.5, 3]} intensity={0.75} color="#9bb8ff" />
        <RickTaylorRig motion={motion} equippedWeapon={weapon} bloodIntensity={bloodIntensity} headTuning={headTuning} hideMask={false} />
        <ContactShadows position={[0, 0, 0]} opacity={0.55} scale={6} blur={1.8} />
        <Environment preset="studio" />
        <OrbitControls target={[0, 1.15, 0]} />
      </Canvas>
      {showControls && <div style={{ position: "absolute", left: 12, top: 12, display: "flex", flexWrap: "wrap", gap: 8, padding: 10, borderRadius: 8, background: "rgba(12,12,18,.88)", color: "white", font: "12px system-ui" }}>
        <label>Pose <select value={pose} onChange={e => setPose(e.target.value as RickPoseMode)}>
          <option value="idle">Idle</option><option value="walk">Walk</option><option value="attack">Attack</option><option value="grab">Grab</option><option value="jump">Jump</option>
        </select></label>
        <label>Arma <select value={weapon ?? ""} onChange={e => setWeapon((e.target.value || null) as RickWeaponId | null)}>
          <option value="">Nenhuma</option><option value="pipe">Cano</option><option value="machete">Facão</option><option value="shotgun">Escopeta</option><option value="sickle">Foice</option>
        </select></label>
      </div>}
      <div style={{ position: "absolute", right: 12, bottom: 10, color: "#ddd", font: "11px system-ui", background: "rgba(12,12,18,.65)", padding: "5px 8px", borderRadius: 6 }}>Rick Taylor · Procedural 3D HD · arraste para orbitar</div>
    </section>
  );
}

export default CharacterWebViewer;
