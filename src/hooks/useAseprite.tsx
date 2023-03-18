import { useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef, useMemo, useCallback } from "react"
import * as THREE from "three"

interface FrameType {
  name: string
  from: number
  to: number
  direction: string
}

interface TagType {
  frame: { x: number; y: number; w: number; h: number }
  rotated: boolean
  trimmed: boolean
  spriteSourceSize: { x: number; y: number; w: number; h: number }
  sourceSize: { w: number; h: number }
  duration: number
}

interface JsonType {
  frames: { [name: string]: TagType }
  meta: {
    size: {
      w: number
      h: number
    }
    app: string
    version: string
    image: string
    format: string
    scale: string
    frameTags: FrameType[]
  }
}

const framesToArray = (json: JsonType) => Object.values(json.frames)

const getAnimationFrames = (
  json: JsonType,
  frame: string,
  frameTags: FrameType[]
) => {
  const tag = frameTags.find((f) => f.name === frame)

  if (!tag) return []

  const allFrames = framesToArray(json)
  return allFrames.slice(tag.from, tag.to + 1)
}

export const useAseprite = (
  src: string,
  json: JsonType,
  initialFrame: string,
  paused: boolean
): [THREE.Texture, (f: string) => void] => {
  const texture: THREE.Texture = useTexture(src)
  const time = useRef(0)
  const index = useRef(0)

  const previousFrame = useRef<string | null>(null)
  const currentFrame = useRef<string>(initialFrame)

  const setCurrentFrame = (f: string) => (currentFrame.current = f)

  const tex: THREE.Texture = useMemo(() => {
    const tex = texture.clone()

    tex.wrapS = tex.wrapT = THREE.RepeatWrapping
    tex.minFilter = THREE.NearestFilter
    tex.magFilter = THREE.NearestFilter
    tex.needsUpdate = true

    return tex
  }, [texture])

  let w = json.meta.size.w
  let h = json.meta.size.h

  const getFrames = useCallback(
    (frame: string) => getAnimationFrames(json, frame, json.meta.frameTags),
    [texture, json]
  )

  const resetTickers = () => (time.current = index.current = 0)

  useFrame((_, delta) => {
    if (previousFrame.current !== currentFrame.current) resetTickers()

    const frames = getFrames(currentFrame.current)
    const f = frames[index.current]

    if (!f) return

    tex.repeat.set(f.frame.w / w, f.frame.h / h)

    if (!paused) {
      time.current += delta * 1000

      if (time.current >= f.duration) {
        index.current += 1
        if (index.current >= frames.length) {
          index.current = 0
        }

        time.current = 0
      }
    }

    const frameOffset = f.frame.h / h
    tex.offset.set(f.frame.x / w, 1.0 - f.frame.y / h - frameOffset)

    previousFrame.current = currentFrame.current
  })

  return [tex, setCurrentFrame]
}
