<!-- chatgpt sucks at this, idk what it does but fun! d3-->
<template>
  <div class="flex flex-col items-center justify-center">
    <canvas ref="canvasRef" class="hidden"></canvas>
    <svg
      v-if="points.length > 0"
      :width="canvasSize.width"
      :height="canvasSize.height"
      class="border"
    >
      <circle v-for="(p, i) in points" :key="i" :cx="p[0]" :cy="p[1]" :r="0.8" fill="black" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import * as d3 from 'd3'

// Types
type Point = [number, number]

const canvasRef = ref<HTMLCanvasElement | null>(null)
const points = ref<Point[]>([])
const canvasSize = reactive({ width: 0, height: 0 })

let imageData: ImageData | null = null

onMounted(() => {
  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.src = '/favicon.ico'
  img.onload = () => {
    const canvas = canvasRef.value!
    const ctx = canvas.getContext('2d')!
    canvas.width = img.width
    canvas.height = img.height
    canvasSize.width = img.width
    canvasSize.height = img.height
    ctx.drawImage(img, 0, 0)

    imageData = ctx.getImageData(0, 0, img.width, img.height)
    points.value = generateStippling(img.width, img.height, 800, 20)
  }
})

function getBrightness(x: number, y: number): number {
  if (!imageData) return 1
  const ix = Math.floor(x)
  const iy = Math.floor(y)
  if (ix < 0 || iy < 0 || ix >= imageData.width || iy >= imageData.height) return 1
  const i = (iy * imageData.width + ix) * 4
  const [r, g, b] = [imageData.data[i], imageData.data[i + 1], imageData.data[i + 2]]
  return (r + g + b) / 3 / 255
}

function relax(points: Point[], width: number, height: number): Point[] {
  const delaunay = d3.Delaunay.from(points)
  const voronoi = delaunay.voronoi([0, 0, width, height])

  return points.map((point, i) => {
    const cell = voronoi.cellPolygon(i)
    if (!cell) return point

    let cx = 0,
      cy = 0
    for (const [x, y] of cell) {
      cx += x
      cy += y
    }
    cx /= cell.length
    cy /= cell.length

    const brightness = getBrightness(cx, cy)
    const weight = 1 - brightness
    return [point[0] + (cx - point[0]) * weight * 0.5, point[1] + (cy - point[1]) * weight * 0.5]
  })
}

function generateStippling(
  width: number,
  height: number,
  pointCount: number,
  iterations: number,
): Point[] {
  let pts: Point[] = Array.from({ length: pointCount }, () => [
    Math.random() * width,
    Math.random() * height,
  ])
  for (let i = 0; i < iterations; i++) {
    pts = relax(pts, width, height)
  }
  return pts
}
</script>

<style scoped>
svg {
  background-color: white;
}
</style>
