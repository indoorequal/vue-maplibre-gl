export enum Position {
  TOP_LEFT = "top-left",
  TOP_RIGHT = "top-right",
  BOTTOM_LEFT = "bottom-left",
  BOTTOM_RIGHT = "bottom-right",
}

export const PositionValues = Object.values(Position);

export type PositionProp =
  | Position
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";
