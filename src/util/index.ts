import red from "../assets/sprites/red.png"
import redData from "../assets/sprites/red.json"
import blackData from "../assets/sprites/black.json"
import black from "../assets/sprites/black.png"
import playerData from "../assets/sprites/sprite.json"
import player from "../assets/sprites/sprite.png"

type Direction = "North" | "South" | "East" | "West"
import type { SpriteProps } from "@react-three/fiber"

const directionMap = {
  North: ["North", "West", "South", "East"],
  South: ["South", "East", "North", "West"],
  West: ["West", "South", "East", "North"],
  East: ["East", "North", "West", "South"],
}

export const generateDirections = (initialDirection: Direction) => {
  const directions = directionMap[initialDirection]

  return (degrees: number) => {
    if (degrees > 315 || degrees < 45) return directions[0]

    if (degrees > 45 && degrees <= 135) return directions[1]

    if (degrees > 135 && degrees <= 225) return directions[2]

    if (degrees > 225 && degrees <= 315) return directions[3]
  }
}

export interface SpriteFigure extends SpriteProps {
  action: string
  direction: "North" | "South" | "East" | "West"
  texture: string
  meta: any
}

export const spriteData: SpriteFigure[] = [
  {
    position: [0, 0, 0],
    direction: "North",
    action: "AttackB",
    texture: player,
    meta: playerData,
  },
  {
    position: [3, 0, -1],
    direction: "South",
    action: "IdleDrawn",
    texture: black,
    meta: blackData,
  },
  {
    position: [2, 0, 1],
    direction: "South",
    action: "Idle",
    texture: black,
    meta: blackData,
  },
  {
    position: [-1, 0, 2],
    direction: "East",
    action: "IdleDrawn",
    texture: red,
    meta: redData,
  },
  {
    position: [-2, 0, 0],
    direction: "North",
    action: "Idle",
    texture: black,
    meta: blackData,
  },
  {
    position: [1, 0, 0],
    direction: "South",
    action: "AttackA",
    texture: black,
    meta: blackData,
  },
  {
    position: [0, 0, -2],
    direction: "West",
    action: "IdleDrawn",
    texture: black,
    meta: blackData,
  },
  {
    position: [2, 0, -3],
    direction: "West",
    action: "IdleDrawn",
    texture: red,
    meta: redData,
  },
  {
    position: [-2, 0, -3],
    direction: "West",
    action: "IdleDrawn",
    texture: red,
    meta: redData,
  },
  {
    position: [1, 0, 2],
    direction: "East",
    action: "Idle",
    texture: black,
    meta: blackData,
  },
  {
    position: [0, 0, 1.5],
    direction: "East",
    action: "IdleDrawn",
    texture: red,
    meta: redData,
  },
]
