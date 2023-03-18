import { useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { Texture } from "three"
import { textures } from "./assets/background"
import { useScroll } from "@react-three/drei"

const r = 5
const h = 3
const d = 2
const segments = 32

const cameraRadius = 2.5
const TWO_PI = Math.PI * 2

const cameraLookat = new THREE.Vector3(0, 0, 0)

export default function ScrollRig() {
  const maps = useTexture(textures, (textures) => {
    if (textures instanceof Array)
      return textures.map((t: Texture) => {
        t.wrapS = t.wrapT = THREE.RepeatWrapping
        t.repeat.set(5, 1)
        t.minFilter = t.magFilter = THREE.NearestFilter
      })
  })

  const scroll = useScroll()

  useFrame(({ camera }) => {
    camera.lookAt(cameraLookat)
    const x = cameraRadius * Math.sin(scroll.offset * TWO_PI)
    const y = cameraRadius * Math.cos(scroll.offset * TWO_PI)

    camera.position.set(x, 1.2, y)
  })

  return (
    <group position={[0, h * 0.5, 0]}>
      {maps.map((t, i) => (
        <mesh key={t.id}>
          <cylinderGeometry
            args={[r + i * d, r + i * d, h, segments, 1, true]}
          />
          <meshBasicMaterial map={t} side={THREE.BackSide} alphaTest={1} />
        </mesh>
      ))}
    </group>
  )
}
