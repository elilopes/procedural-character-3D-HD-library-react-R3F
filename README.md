# Procedural Character 3D HD — React / React Three Fiber

A procedural 3D character library for React, Three.js and React Three Fiber (R3F). Rick Taylor, extracted from the [Splatterhouse Clone](https://github.com/elilopes/splatterhouse-clone), is the reference implementation.

## Features

- Procedural Rick Taylor character rig with skinned body geometry and a parametric 3DMM head.
- Facial morph targets, anthropometric presets and head fine-tuning.
- Procedural PBR surface maps (normal, ambient occlusion and roughness).
- Procedural movement in the R3F frame loop: locomotion, weapon poses, attacks, grabs, jumps and special moves.
- Browser-based 3D viewer with pose/weapon controls, integration walkthrough and source exporter (ZIP or folder where supported).

## Requirements and installation

Use matching React and React Three Fiber major versions: Fiber 8 with React 18, or Fiber 9 with React 19.

```bash
npm install react three @react-three/fiber @react-three/drei
```

Install the library package from this repository using your preferred Git dependency or package publishing workflow.

## Quick start

Mount the rig inside an existing R3F `Canvas`:

```tsx
import { Canvas } from "@react-three/fiber";
import { RickTaylorRig, createRickIdleMotion } from "@elilopes/procedural-character-3dhd";

export function GameCharacter() {
  const motion = createRickIdleMotion("pipe");
  return (
    <Canvas camera={{ position: [0, 2, -4], fov: 42 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 5, 2]} intensity={1.4} castShadow />
      <RickTaylorRig motion={motion} equippedWeapon="pipe" />
    </Canvas>
  );
}
```

If your game already creates a `Canvas`, do not nest another one. Render `RickTaylorRig` as a child of the existing scene.

## Integration in a new game (copy source files)

Copy these modules into your game's `src/` directory and preserve their relative folder structure:

```text
src/
  characters/RickTaylorCharacter3DHD.tsx
  anatomy/parametricHead3DMM.ts
  materials/proceduralSurfaceMaps.ts
  animation/rickMotionPresets.ts
```

1. Create the four folders/files exactly as shown.
2. Copy each source module from this repository's `src/` directory into the matching folder.
3. Keep the filenames unchanged, or update the relative imports if you rename them.
4. Install the dependencies listed above.
5. Import the rig and motion presets into your gameplay component.

Example movement state:

```tsx
import { RickTaylorRig, createRickWalkMotion } from "../index";

<RickTaylorRig
  motion={createRickWalkMotion("pipe")}
  equippedWeapon="pipe"
/>
```

The motion preset functions create a complete `RickMotion` value. The game updates that value as input/gameplay changes. The rig performs the procedural pose animation in `useFrame`; the game remains responsible for attack/grab timing, hit detection, physics, collision, damage, AI and weapon pickup logic.

## Viewer

```tsx
import { CharacterWebViewer } from "@elilopes/procedural-character-3dhd";

export function CharacterPreviewPage() {
  return <CharacterWebViewer height="85vh" initialPose="idle" initialWeapon="pipe" />;
}
```

The viewer includes:
- 3D preview with orbit camera;
- idle, walk, attack, grab and jump poses;
- weapon selection;
- bilingual integration guide;
- export controls to download the source modules as a ZIP or save them to a selected folder in supported browsers.

The folder picker requires a browser supporting the File System Access API, generally on HTTPS or localhost. ZIP download is the fallback. Export fetches the current source files from this repository's public `main` branch.

## Public API

- `RickTaylorRig`: low-level procedural rig for an existing R3F scene.
- `RickTaylorCharacter3DHDPlayer` / `ProceduralCharacter3DHD`: higher-level character components.
- `createRickIdleMotion`, `createRickWalkMotion`, `createRickAttackMotion`, `createRickGrabMotion`, `createRickJumpMotion`: motion-state factories.
- `createParametricHumanHeadGeometry`: parametric 3D head geometry generator.
- `createProceduralSurfaceMaps`: procedural PBR map generator.
- `createWebGPUSurfaceNodeMaterial`: TSL/WebGPU node material helper.

## Rendering and WebGPU notes

The viewer uses the default WebGL renderer provided by React Three Fiber. The TSL node-material helper is a separate WebGPU-oriented API and requires a compatible Three.js version and explicit WebGPU renderer setup by the consuming application. Do not assume that the WebGPU material helper is automatically used by the viewer.

## Validation status

The repository source and relative module layout have been assembled. Run dependency installation, TypeScript checks, production build and browser/device testing in the target game before shipping. A successful repository update does not by itself certify compilation or runtime compatibility in every consumer project.

## Source provenance

Character source modules were extracted and adapted from:
- `apps/web/src/game/characters/RickTaylorCharacter3DHD.tsx`
- `apps/web/src/game/characters/parametricHead3DMM.ts`
- `apps/web/src/game/characters/proceduralSurfaceMaps.ts`

Original project: [elilopes/splatterhouse-clone](https://github.com/elilopes/splatterhouse-clone).
