import { Ball } from '@demo-canvas1/model'
import { createCanvas, detectionCircle } from '@demo-canvas1/utils'
import { randomRgbColor } from '@tool/random'

const { canvas, ctx, point } = createCanvas('5-3.圆的碰撞检测')

const ball1 = new Ball({
  x: 150,
  y: 150,
  radius: 50,
  fillStyle: randomRgbColor()
})
const ball2 = new Ball({ x: 400, y: 400, radius: 50 })

let isMove = false
let dx = 0
let dy = 0

canvas.addEventListener('mousedown', e => {
  e.preventDefault()
  if (ball1.isPoint(point)) {
    isMove = true
    dx = point.x - ball1.x
    dy = point.y - ball1.y
  }
})
canvas.addEventListener('mouseup', () => (isMove = false))
canvas.addEventListener('mouseout', () => (isMove = false))
;(function move() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (isMove) {
    ball1.x = point.x - dx
    ball1.y = point.y - dy
  }

  if (detectionCircle(ball1, ball2)) {
    console.log('圆发生碰撞')
  }

  ball1.render(ctx)
  ball2.render(ctx)

  requestAnimationFrame(move)
})()
