import { useMemo, useRef } from "react"
import * as THREE from "three"
import { shaderMaterial } from "@react-three/drei"
import { extend, useFrame } from "@react-three/fiber"

const ParticleMaterial = shaderMaterial(
  {
    uTime: 0,
  },
  /*glsl*/ ` 
  uniform float uTime; 
  attribute float aRadius; 
  attribute float aSpeed; 

  void main() {
      vec3 transformedPosition = position; 

      float wave = fract(uTime * aSpeed); 
      float x = aRadius * sin(wave * 3.142 * 2.0); 
      float y = aRadius * cos(wave * 3.142 * 2.0); 

      transformedPosition.x += x; 
      transformedPosition.z += y; 

      vec4 modelPosition = modelMatrix * vec4(transformedPosition, 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;
      gl_Position = projectedPosition;

      gl_PointSize = 30.0;
      gl_PointSize *= (1.0 / - viewPosition.z);

      
  }`,
  /*glsl*/ `  
  void main() {
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 10.0);

    if(strength < 0.2) discard; 
    
    gl_FragColor = vec4(vec3(245.0/255.0, 200.0/255.0, 66.0/255.0), strength);
  }`
)

extend({ ParticleMaterial })

const COUNT = 1000

export default function Particle() {
  const [points, radius, speed] = useMemo(() => {
    const p = new Array(COUNT)
      .fill(0)
      .flatMap((v) => [
        (0.5 - Math.random()) * 5,
        Math.random() * 5,
        (0.5 - Math.random()) * 5,
      ])

    const r = new Array(COUNT).fill(0).map((v) => (0.5 - Math.random()) * 0.2)
    const s = new Array(COUNT).fill(0).map((v) => (0.5 - Math.random()) * 0.5)

    return [
      new THREE.BufferAttribute(new Float32Array(p), 3),
      new THREE.BufferAttribute(new Float32Array(r), 1),
      new THREE.BufferAttribute(new Float32Array(s), 1),
    ]
  }, [])

  const ref = useRef<any | null>(null)

  useFrame(({ clock }) => {
    ref.current.uTime = clock.getElapsedTime()
  })

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach={"attributes-position"}
          {...points}
          itemSize={3}
        />
        <bufferAttribute attach={"attributes-aRadius"} {...radius} />
        <bufferAttribute attach={"attributes-aSpeed"} {...speed} />
      </bufferGeometry>
      {/* @ts-ignore */}
      <particleMaterial
        ref={ref}
        blending={THREE.AdditiveBlending}
        transparent={true}
      />
    </points>
  )
}
