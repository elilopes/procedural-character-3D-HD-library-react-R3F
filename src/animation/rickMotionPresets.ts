import type { RickMotion, RickPoseMode, RickWeaponId } from "../characters/RickTaylorCharacter3DHD";

export interface RickMotionPresetOptions {
  weapon?: RickWeaponId | null;
  attackStyle?: RickMotion["attackStyle"];
  attackProgress?: number;
  attackTime?: number;
  grabTime?: number;
  jumpHeight?: number;
  grabStyle?: RickMotion["grabStyle"];
  specialMove?: RickMotion["specialMove"];
  leftFlex?: number;
  rightFlex?: number;
  legFlex?: number;
}

/** Complete motion state consumed by RickTaylorRig. The rig owns procedural animation in useFrame. */
export function createRickMotionPreset(pose: RickPoseMode, options: RickMotionPresetOptions = {}): RickMotion {
  const base: RickMotion = {
    moving: pose === "walk",
    attackTime: pose === "attack" ? 0.4 : 0,
    attackStyle: pose === "attack" ? "bat" : null,
    attackProgress: pose === "attack" ? 0.5 : 0,
    grabTime: pose === "grab" ? 0.4 : 0,
    jumpHeight: pose === "jump" ? 0.35 : 0,
    weapon: options.weapon ?? null,
    leftFlex: 0.15, rightFlex: 0.18, legFlex: 0.1,
  };
  return { ...base, ...options };
}

export const createRickIdleMotion = (weapon: RickWeaponId | null = null) => createRickMotionPreset("idle", { weapon });
export const createRickWalkMotion = (weapon: RickWeaponId | null = null) => createRickMotionPreset("walk", { weapon });
export const createRickAttackMotion = (options: RickMotionPresetOptions = {}) => createRickMotionPreset("attack", options);
export const createRickGrabMotion = (options: RickMotionPresetOptions = {}) => createRickMotionPreset("grab", options);
export const createRickJumpMotion = (options: RickMotionPresetOptions = {}) => createRickMotionPreset("jump", options);
