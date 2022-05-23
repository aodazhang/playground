import { Box } from '@demo-canvas1/model'
import { createCanvas, detectionRect } from '@demo-canvas1/utils'
import { randomRgbColor } from '@tool/random'

const { canvas, ctx, point } = createCanvas('5-1.矩形的碰撞检测')

const rect1 = new Box({ x: 50, y: 50, fillStyle: randomRgbColor() })
const rect2 = new Box({ x: 300, y: 300 })

let isMove = false
let dx = 0
let dy = 0

canvas.addEventListener('mousedown', e => {
  e.preventDefault()
  if (rect1.isPoint(point)) {
    isMove = true
    dx = point.x - rect1.x
    dy = point.y - rect1.y
  }
})
canvas.addEventListener('mouseup', () => (isMove = false))
canvas.addEventListener('mouseout', () => (isMove = false))
;(function move() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  if (isMove) {
    rect1.x = point.x - dx
    rect1.y = point.y - dy
  }
  if (detectionRect(rect1, rect2)) {
    console.log('矩形发生碰撞')
  }
  rect1.render(ctx)
  rect2.render(ctx)
  requestAnimationFrame(move)
})()
