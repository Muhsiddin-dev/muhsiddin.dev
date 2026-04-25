"use client"

import { useEffect, useMemo, useState } from "react"
import { cn } from "@/lib/utils"

type Grid = {
  rows: number
  cols: number
}

const DEFAULT_GRIDS: Record<string, Grid> = {
  "6x4": { rows: 4, cols: 6 },
  "8x8": { rows: 8, cols: 8 },
  "8x3": { rows: 3, cols: 8 },
  "4x6": { rows: 6, cols: 4 },
  "3x8": { rows: 8, cols: 3 },
}

type PredefinedGridKey = keyof typeof DEFAULT_GRIDS

interface PixelImageProps {
  src: string
  grid?: PredefinedGridKey
  customGrid?: Grid
  grayscaleAnimation?: boolean
  pixelFadeInDuration?: number // in ms
  maxAnimationDelay?: number // in ms
  colorRevealDelay?: number // in ms
}


export const PixelImage = ({
  src,
  grid = "6x4",
  grayscaleAnimation = true,
  pixelFadeInDuration = 3000,
  maxAnimationDelay = 3000,
  colorRevealDelay = 3000,
  customGrid,
}: PixelImageProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [showColor, setShowColor] = useState(false)
  const [randomDelays, setRandomDelays] = useState<number[]>([])

  const MIN_GRID = 1
  const MAX_GRID = 16

  const { rows, cols } = useMemo(() => {
    const isValidGrid = (grid?: Grid) => {
      if (!grid) return false
      const { rows, cols } = grid
      return (
        Number.isInteger(rows) &&
        Number.isInteger(cols) &&
        rows >= MIN_GRID &&
        cols >= MIN_GRID &&
        rows <= MAX_GRID &&
        cols <= MAX_GRID
      )
    }
    return isValidGrid(customGrid) ? customGrid! : DEFAULT_GRIDS[grid]
  }, [customGrid, grid])

  // ХАТОГИИ 2: Танҳо як useEffect кифоя аст
  useEffect(() => {
    const total = rows * cols
    const delays = Array.from({ length: total }, () => Math.random() * maxAnimationDelay)
    setRandomDelays(delays)

    // БА ИНҶО ДИҚҚАТ КУН:
    // Мо setIsVisible-ро дар дохили як requestAnimationFrame ё setTimeout мемонем
    // то ки аввал DOM сохта шавад, баъд аниматсия сар шавад.
    const animationTimeout = setTimeout(() => {
      setIsVisible(true)
    }, 50) // 50ms кифоя аст, ки браузер "нафас" гирад

    const colorTimeout = setTimeout(() => {
      setShowColor(true)
    }, colorRevealDelay)

    return () => {
      clearTimeout(animationTimeout)
      clearTimeout(colorTimeout)
    }
  }, [colorRevealDelay, rows, cols, maxAnimationDelay])

  // ХАТОГИИ 3: Дар pieces дигар Math.random лозим нест
  const pieces = useMemo(() => {
    const total = rows * cols
    return Array.from({ length: total }, (_, index) => {
      const row = Math.floor(index / cols)
      const col = index % cols

      return {
        clipPath: `polygon(
          ${col * (100 / cols)}% ${row * (100 / rows)}%,
          ${(col + 1) * (100 / cols)}% ${row * (100 / rows)}%,
          ${(col + 1) * (100 / cols)}% ${(row + 1) * (100 / rows)}%,
          ${col * (100 / cols)}% ${(row + 1) * (100 / rows)}%
        )`
      }
    })
  }, [rows, cols])

  // То тавлид шудани рақамҳои тасодуфӣ чизе нишон намедиҳем (пешгирӣ аз Hydration Error)
  if (randomDelays.length === 0) return null

  return (
    <div className="relative h-72 w-72 select-none md:h-96 md:w-96">
      {pieces.map((piece, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-all ease-out",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          style={{
            clipPath: piece.clipPath,
            transitionDelay: `${randomDelays[index]}ms`, // Аз state мегирем
            transitionDuration: `${pixelFadeInDuration}ms`,
          }}
        >
          <img
            src={src}
            alt={`Pixel image piece ${index + 1}`}
            className={cn(
              "z-1 rounded-[2.5rem] object-cover h-full w-full", // h-full w-full илова шуд
              grayscaleAnimation && (showColor ? "grayscale-0" : "grayscale")
            )}
            style={{
              transition: grayscaleAnimation
                ? `filter ${pixelFadeInDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
                : "none",
            }}
            draggable={false}
          />
        </div>
      ))}
    </div>
  )
}