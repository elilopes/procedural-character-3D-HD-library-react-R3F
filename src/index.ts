export type { BodyMorphParameters, HeadMorphParameters, CharacterCustomization, CharacterConfig, CharacterPhysicsAdapter, CharacterController } from "./types";
export { RickTaylorRig, RickTaylorCharacter3DHDPlayer, ProceduralCharacter3DHD, DEFAULT_RICK_BODY_3DMM } from "./characters/RickTaylorCharacter3DHD";
export type { RickWeaponId, RickBody3DMMParams, RickPipeAttackStyle, RickPoseMode, RickMotion, RickTaylorCharacterProps } from "./characters/RickTaylorCharacter3DHD";
export { createParametricHumanHeadGeometry, computeHeadAnthropometry, resolveHeadFineTuning, DEFAULT_HEAD_FINE_TUNING, HEAD_3DMM_PRESETS, FACIAL_BLENDSHAPE_NAMES, DEFAULT_FACIAL_BLENDSHAPES } from "./anatomy/parametricHead3DMM";
export type { HeadFineTuningParams, Head3DMMPresetId, FacialBlendshapeName, FacialBlendshapeWeights, ParametricHeadResult, HeadAnthropometry, FaceMeshLandmarkPoint } from "./anatomy/parametricHead3DMM";
export { createProceduralSurfaceMaps, createWebGPUSurfaceNodeMaterial } from "./materials/proceduralSurfaceMaps";
export type { ProceduralPBRMaps, WebGPUSurfaceMaterialOptions } from "./materials/proceduralSurfaceMaps";
export { CharacterWebViewer } from "./viewer/CharacterWebViewer";
export type { CharacterWebViewerProps } from "./viewer/CharacterWebViewer";

export { createRickMotionPreset, createRickIdleMotion, createRickWalkMotion, createRickAttackMotion, createRickGrabMotion, createRickJumpMotion } from "./animation/rickMotionPresets";
export type { RickMotionPresetOptions } from "./animation/rickMotionPresets";

export { RickAnimationController } from "./animation/RickAnimationController";
export type { RickAnimationOptions, RickAnimationSnapshot } from "./animation/RickAnimationController";
export { RICK_WEAPON_MOUNTS, RICK_WEAPON_IDS } from "./weapons/rickWeaponMounts";
export type { RickWeaponMountTransform } from "./weapons/rickWeaponMounts";
