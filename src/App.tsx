import { Canvas } from "@react-three/fiber"
import { ScrollControls, Text } from "@react-three/drei"
import Figure from "./Figure"
import Particles from "./Particles"
import Ground from "./Ground"
import { spriteData } from "./util"
import ScrollRig from "./ScrollRig"

function App() {
  return (
    <Canvas>
      <fog attach='fog' args={["#1e2124", 4, 20]} />
      <ScrollControls damping={1} pages={10}>
        {spriteData.map((d, i) => (
          <Figure key={`sprite-${i}`} {...d} />
        ))}
        <Ground />
        <ScrollRig />
        <Particles />
      </ScrollControls>
    </Canvas>
  )
}

export default App
