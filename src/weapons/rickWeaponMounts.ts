import type { Vector3Tuple } from "three";
import type { RickWeaponId } from "../characters/RickTaylorCharacter3DHD";

export type RickWeaponMountTransform = { position: Vector3Tuple; rotation: Vector3Tuple; scale: Vector3Tuple; grip: "right-hand" | "two-hand" };
/** Local transforms relative to the standardized right-hand grip pivot (meters, radians). */
export const RICK_WEAPON_MOUNTS: Record<RickWeaponId, RickWeaponMountTransform> = {
  pipe: { position: [0.02, -0.47, -0.025], rotation: [0, 0, 0], scale: [1, 1, 1], grip: "right-hand" },
  machete: { position: [0.02, -0.47, -0.025], rotation: [0, 0, 0], scale: [1, 1, 1], grip: "right-hand" },
  sickle: { position: [0.02, -0.47, -0.025], rotation: [0, 0, 0], scale: [1, 1, 1], grip: "right-hand" },
  shotgun: { position: [0.02, -0.47, -0.025], rotation: [0, 0, 0], scale: [1, 1, 1], grip: "two-hand" },
};
export const RICK_WEAPON_IDS: RickWeaponId[] = ["pipe", "machete", "shotgun", "sickle"];
