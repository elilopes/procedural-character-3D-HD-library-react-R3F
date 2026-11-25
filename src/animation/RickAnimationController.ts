import type { RickMotion, RickPoseMode, RickWeaponId } from "../characters/RickTaylorCharacter3DHD";
import { createRickMotionPreset, type RickMotionPresetOptions } from "./rickMotionPresets";

export type RickAnimationOptions = {
  duration?: number;
  speed?: number;
  transitionDuration?: number;
  interruptible?: boolean;
  weapon?: RickWeaponId | null;
  preset?: RickMotionPresetOptions;
};
export type RickAnimationSnapshot = {
  motion: RickMotion;
  pose: RickPoseMode;
  elapsed: number;
  duration: number;
  speed: number;
  playing: boolean;
  transitioning: boolean;
};

/** Stateful animation orchestrator. Call update(deltaSeconds) from the host render loop. */
export class RickAnimationController {
  private current: RickMotion;
  private from: RickMotion;
  private target: RickMotion;
  private elapsed = 0;
  private duration = 1;
  private speed = 1;
  private transitionDuration = 0.22;
  private transitionElapsed = 0;
  private playing = true;
  private interruptible = true;
  private pose: RickPoseMode = "idle";
  constructor(initial: RickMotion = createRickMotionPreset("idle")) {
    this.current = initial; this.from = initial; this.target = initial;
  }
  get snapshot(): RickAnimationSnapshot {
    return { motion: this.current, pose: this.pose, elapsed: this.elapsed, duration: this.duration, speed: this.speed, playing: this.playing, transitioning: this.transitionElapsed < this.transitionDuration };
  }
  play() { this.playing = true; }
  pause() { this.playing = false; }
  setSpeed(value: number) { this.speed = Math.max(0.05, Math.min(4, value)); }
  setDuration(seconds: number) { this.duration = Math.max(0.05, seconds); this.elapsed = Math.min(this.elapsed, this.duration); }
  setInterruptible(value: boolean) { this.interruptible = value; }
  stop(reset: RickPoseMode = "idle") {
    this.playing = false; this.transitionTo(reset, { transitionDuration: 0 });
    this.elapsed = 0;
  }
  transitionTo(pose: RickPoseMode, options: RickAnimationOptions = {}) {
    if (!this.interruptible && this.playing && this.elapsed < this.duration) return false;
    this.from = this.current;
    this.pose = pose;
    this.target = createRickMotionPreset(pose, { ...options.preset, weapon: options.weapon ?? options.preset?.weapon ?? this.current.weapon });
    this.transitionDuration = Math.max(0, options.transitionDuration ?? this.transitionDuration);
    this.transitionElapsed = 0;
    this.duration = Math.max(0.05, options.duration ?? this.duration);
    this.speed = Math.max(0.05, Math.min(4, options.speed ?? this.speed));
    this.elapsed = 0; this.playing = true;
    if (this.transitionDuration === 0) this.current = this.target;
    return true;
  }
  /** Blend compatible scalar channels; discrete weapon/style fields switch at transition midpoint. */
  update(deltaSeconds: number): RickMotion {
    if (!this.playing) return this.current;
    const dt = Math.max(0, deltaSeconds) * this.speed;
    this.elapsed += dt;
    this.transitionElapsed += Math.max(0, deltaSeconds);
    const t = this.transitionDuration <= 0 ? 1 : Math.min(1, this.transitionElapsed / this.transitionDuration);
    const mix = (a: number | undefined, b: number | undefined) => (a ?? 0) + ((b ?? 0) - (a ?? 0)) * t;
    this.current = {
      ...this.target,
      moving: t < 0.5 ? this.from.moving : this.target.moving,
      weapon: t < 0.5 ? this.from.weapon : this.target.weapon,
      attackStyle: t < 0.5 ? this.from.attackStyle : this.target.attackStyle,
      attackTime: mix(this.from.attackTime, this.target.attackTime),
      attackProgress: mix(this.from.attackProgress, this.target.attackProgress),
      grabTime: mix(this.from.grabTime, this.target.grabTime),
      jumpHeight: mix(this.from.jumpHeight, this.target.jumpHeight),
      leftFlex: mix(this.from.leftFlex, this.target.leftFlex),
      rightFlex: mix(this.from.rightFlex, this.target.rightFlex),
      legFlex: mix(this.from.legFlex, this.target.legFlex),
    };
    if (this.elapsed >= this.duration && this.pose !== "attack" && this.pose !== "grab" && this.pose !== "jump") this.elapsed = this.duration;
    return this.current;
  }
  /** Additive upper-body/leg channel overlay for aiming, recoil or locomotion layering. */
  combine(overlay: Partial<Pick<RickMotion, "leftFlex" | "rightFlex" | "legFlex" | "shotgunAimPitch" | "shotgunAimYaw">>): RickMotion {
    return { ...this.current, ...overlay,
      leftFlex: Math.max(-1, Math.min(1, (this.current.leftFlex ?? 0) + (overlay.leftFlex ?? 0))),
      rightFlex: Math.max(-1, Math.min(1, (this.current.rightFlex ?? 0) + (overlay.rightFlex ?? 0))),
      legFlex: Math.max(-1, Math.min(1, (this.current.legFlex ?? 0) + (overlay.legFlex ?? 0))) };
  }
}
