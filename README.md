# Procedural Character 3D HD — React / R3F

Biblioteca de personagens humanos 3D procedurais para React, Three.js e React Three Fiber. Rick Taylor é o personagem de referência, extraído do [Splatterhouse Clone](https://github.com/elilopes/splatterhouse-clone).

## Módulos implementados
- Rig procedural do Rick com geometria corporal skinned, cabeça paramétrica 3DMM, morph targets faciais e presets antropométricos.
- Mapas PBR procedurais para pele e denim: normal, AO e roughness.
- Materiais TSL/WebGPU do código original.
- Componente jogável por props e rig de baixo nível para integração em cenas R3F.
- Visualizador web para inspecionar o personagem antes de integrá-lo ao jogo, com câmera orbital, poses e armas.

## Instalação
```bash
npm install react three @react-three/fiber @react-three/drei
```

## Visualizador web
```tsx
import { CharacterWebViewer } from "@elilopes/procedural-character-3dhd";
export function CharacterPreviewPage() {
  return <CharacterWebViewer height="85vh" initialPose="idle" initialWeapon="pipe" />;
}
```
O preview permite orbitar a câmera, alternar entre idle/walk/attack/grab/jump e trocar armas. O Canvas usa WebGL pelo R3F para ampla compatibilidade. A exportação do material TSL/WebGPU pode ser usada em aplicações que inicializem explicitamente o WebGPURenderer.

## Integração em jogo
```tsx
import { ProceduralCharacter3DHD } from "@elilopes/procedural-character-3dhd";
<ProceduralCharacter3DHD motion={{ moving:false, attackTime:0, attackStyle:null, attackProgress:0, grabTime:0, jumpHeight:0, weapon:null }} />
```
Use `RickTaylorRig` diretamente dentro de um `Canvas` R3F para controle fino.

## Estrutura
- `src/characters/RickTaylorCharacter3DHD.tsx`: corpo, rig/skinning, poses e personagem referência.
- `src/anatomy/parametricHead3DMM.ts`: cabeça, presets, antropometria, landmarks e blendshapes.
- `src/materials/proceduralSurfaceMaps.ts`: mapas PBR e material TSL.
- `src/viewer/CharacterWebViewer.tsx`: preview web independente do jogo.

## Limitações e validação
- Requer React 18+, Three.js compatível com TSL/WebGPU, R3F 8+ e Drei.
- O viewer usa WebGL pelo R3F. O material TSL/WebGPU é exportado separadamente e requer configuração explícita do renderer pelo consumidor.
- O rig expõe poses/estado de movimento, mas não incorpora o sistema de física ou colisão do jogo. Isso permanece como integração do jogo consumidor.
- A extração foi feita a partir dos três arquivos indicados do repositório Splatterhouse; ainda é necessário executar instalação, typecheck, build e validação visual em navegador para certificar compatibilidade no ambiente consumidor.

## Origem
- `apps/web/src/game/characters/RickTaylorCharacter3DHD.tsx`
- `apps/web/src/game/characters/parametricHead3DMM.ts`
- `apps/web/src/game/characters/proceduralSurfaceMaps.ts`
