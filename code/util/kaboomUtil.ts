import kaboom from "kaboom";



export type Vec2N = {
  x: number;
  y: number;
}

export function vec2N(x: number, y: number): Vec2N { return <Vec2N>{x, y}; }

export function vec2NToString(vec: Vec2N): string {
  return vec.x + ", " + vec.y;
}