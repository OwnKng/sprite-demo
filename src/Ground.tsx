import { useTexture } from "@react-three/drei"
import ground from "./assets/background/ground.png"
import * as THREE from "three"

export default function Ground() {
  const texture = useTexture(ground)

  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(10, 10)
  texture.minFilter = texture.magFilter = THREE.NearestFilter

  return (
    <mesh receiveShadow rotation={[-Math.PI * 0.5, 0, 0]} position={[0, 0, 0]}>
      <planeBufferGeometry args={[10, 10, 1, 1]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  )
}
