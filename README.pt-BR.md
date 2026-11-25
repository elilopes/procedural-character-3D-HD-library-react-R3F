# Biblioteca Procedural Character 3D HD — React / React Three Fiber

Biblioteca de personagens 3D procedurais para React, Three.js e React Three Fiber (R3F). Rick Taylor, extraído do [Splatterhouse Clone](https://github.com/elilopes/splatterhouse-clone), é a implementação de referência.

## Recursos

- Rig procedural do Rick Taylor com geometria corporal skinned e cabeça paramétrica 3DMM.
- Morph targets faciais, presets antropométricos e ajuste fino da cabeça.
- Mapas de superfície PBR procedurais (normal, oclusão ambiente e roughness).
- Movimentação procedural no loop de frames do R3F: locomoção, poses com armas, ataques, agarrões, saltos e movimentos especiais.
- Visualizador 3D no navegador com controles de pose/arma, guia de integração e exportador de arquivos-fonte (ZIP ou pasta, quando compatível).

## Requisitos e instalação

Mantenha as versões principais do React e do React Three Fiber compatíveis: Fiber 8 com React 18 ou Fiber 9 com React 19.

```bash
npm install react three @react-three/fiber @react-three/drei
```

Instale o pacote desta biblioteca usando Git como dependência ou publique-o no registro de pacotes de sua preferência.

## Início rápido

Adicione o rig dentro de um `Canvas` R3F existente:

```tsx
import { Canvas } from "@react-three/fiber";
import { RickTaylorRig, createRickIdleMotion } from "@elilopes/procedural-character-3dhd";

export function PersonagemDoJogo() {
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

Se o jogo já cria um `Canvas`, não crie outro dentro dele. Renderize `RickTaylorRig` como filho da cena existente.

## Integração em um novo jogo (copiar arquivos-fonte)

Copie estes módulos para a pasta `src/` do jogo e preserve a estrutura relativa:

```text
src/
  characters/RickTaylorCharacter3DHD.tsx
  anatomy/parametricHead3DMM.ts
  materials/proceduralSurfaceMaps.ts
  animation/rickMotionPresets.ts
```

1. Crie as quatro pastas/arquivos exatamente como indicado.
2. Copie cada módulo-fonte da pasta `src/` deste repositório para a pasta correspondente.
3. Preserve os nomes dos arquivos ou atualize os imports relativos se renomeá-los.
4. Instale as dependências listadas acima.
5. Importe o rig e os presets de movimento no componente de gameplay.

Exemplo de estado de movimentação:

```tsx
import { RickTaylorRig, createRickWalkMotion } from "../index";

<RickTaylorRig
  motion={createRickWalkMotion("pipe")}
  equippedWeapon="pipe"
/>
```

As funções preset criam um estado completo `RickMotion`. O jogo atualiza esse estado conforme os comandos e eventos de gameplay mudam. O rig executa a animação procedural das poses em `useFrame`; o jogo continua responsável pelo tempo/progresso dos ataques e agarrões, detecção de acertos, física, colisões, dano, IA e lógica de coleta de armas.

## Visualizador web

```tsx
import { CharacterWebViewer } from "@elilopes/procedural-character-3dhd";

export function PaginaDePreview() {
  return <CharacterWebViewer height="85vh" initialPose="idle" initialWeapon="pipe" />;
}
```

O visualizador oferece:
- prévia 3D com câmera orbital;
- poses idle, walk, attack, grab e jump;
- seleção de armas;
- guia de integração bilíngue;
- exportação dos módulos-fonte em ZIP ou gravação em uma pasta selecionada, nos navegadores compatíveis.

A seleção de pasta exige navegador com suporte à File System Access API, normalmente em HTTPS ou localhost. O download ZIP é a alternativa. A exportação busca os arquivos-fonte atuais na branch pública `main` deste repositório.

## API pública

- `RickTaylorRig`: rig procedural de baixo nível para uma cena R3F existente.
- `RickTaylorCharacter3DHDPlayer` / `ProceduralCharacter3DHD`: componentes de personagem de nível mais alto.
- `createRickIdleMotion`, `createRickWalkMotion`, `createRickAttackMotion`, `createRickGrabMotion`, `createRickJumpMotion`: fábricas de estados de movimento.
- `createParametricHumanHeadGeometry`: gerador de geometria de cabeça 3D paramétrica.
- `createProceduralSurfaceMaps`: gerador de mapas PBR procedurais.
- `createWebGPUSurfaceNodeMaterial`: helper de material TSL/WebGPU.

## Observações sobre renderização e WebGPU

O visualizador utiliza o renderer WebGL padrão do React Three Fiber. O helper de material TSL é uma API separada voltada a WebGPU e exige versão compatível do Three.js e configuração explícita de WebGPU Renderer pelo projeto consumidor. O visualizador não utiliza automaticamente esse helper.

## Status de validação

Os arquivos-fonte e a estrutura relativa dos módulos foram organizados. Antes de publicar o jogo, execute instalação de dependências, verificação TypeScript, build de produção e testes em navegador/dispositivo no projeto de destino. A atualização do repositório, por si só, não certifica compilação ou compatibilidade em todos os projetos consumidores.

## Origem dos arquivos

Os módulos do personagem foram extraídos e adaptados de:
- `apps/web/src/game/characters/RickTaylorCharacter3DHD.tsx`
- `apps/web/src/game/characters/parametricHead3DMM.ts`
- `apps/web/src/game/characters/proceduralSurfaceMaps.ts`

Projeto original: [elilopes/splatterhouse-clone](https://github.com/elilopes/splatterhouse-clone).
