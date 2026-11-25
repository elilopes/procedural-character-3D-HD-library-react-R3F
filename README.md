# Procedural Character 3D HD

React/Three.js library architecture for customizable, procedural, playable HD characters.

## Design goals
- Procedural anatomy and parametric head/body controls.
- PBR surface generation (normal, AO, roughness and albedo).
- Rig, skinning and blendshape interfaces.
- Pluggable animation/controller and physics adapters.
- Engine-agnostic game controls with React Three Fiber rendering integration.

## Proposed dependencies
- React and React Three Fiber
- Three.js (including TSL/WebGPU where supported)
- @react-three/drei (optional helpers)
- Physics adapter interface; a concrete provider can be implemented for Rapier or another engine.

## API sketch
```tsx
<ProceduralCharacter3DHD
  config={characterConfig}
  controller={controller}
  physics={physicsAdapter}
  customization={{ body: { shoulderWidth: 0.2 }, head: { cranialWidth: 0.1 } }}
/>
```

This is the initial package scaffold. The original Rick implementation in
[Splatterhouse](https://github.com/elilopes/splatterhouse-clone), including
`RickTaylorCharacter3DHD.tsx`, `parametricHead3DMM.ts` and `proceduralSurfaceMaps.ts`,
is the reference implementation to extract and decouple in the next development stage.
Those modules are not yet included in this scaffold.

## Architecture
- `src/core`: component lifecycle and factory
- `src/anatomy`: body/head generators and morph controls
- `src/materials`: procedural PBR maps and material providers
- `src/rig`: skeleton and skinning
- `src/animation`: animation controller interfaces
- `src/physics`: collision and physics adapter interfaces
- `src/customization`: presets and customization schema

See `src/types.ts` and `src/index.ts` for the starter public API.
