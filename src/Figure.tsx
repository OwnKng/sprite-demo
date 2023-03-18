import { useAseprite } from "./hooks/useAseprite"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { generateDirections } from "./util"
import type { SpriteFigure } from "./util"

const tempVector = new THREE.Vector3(0, 0, 0)

export default function Enemy({
  action,
  direction = "North",
  texture,
  meta,
  ...props
}: SpriteFigure) {
  const [t, setFrame] = useAseprite(
    texture,
    meta,
    `${action}${direction}`,
    false
  )

  const setDirection = generateDirections(direction)

  const ref = useRef<THREE.Sprite>(null!)

  useFrame(({ camera }) => {
    camera.getWorldDirection(tempVector)

    const theta = THREE.MathUtils.radToDeg(
      Math.atan2(tempVector.x, tempVector.z) + Math.PI
    )

    const direction = setDirection(theta)
    setFrame(`${action}${direction}`)
  })

  return (
    <sprite ref={ref} center={new THREE.Vector2(0.5, 0.25)} {...props}>
      <spriteMaterial map={t} />
    </sprite>
  )
}
