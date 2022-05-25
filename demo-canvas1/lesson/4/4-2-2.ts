import { Ball } from '../../model'
import { createCanvas } from '../../utils'

const { canvas, ctx, center, point } = createCanvas('4-2.[案例]拖拽和缓动')

let isMove = false
let dx = 0
let dy = 0
const easing = 0.05

const ball = new Ball({ x: center.x, y: center.y, radius: 40 })

canvas.addEventListener('mousedown', e => {
  e.preventDefault()
  if (ball.isPoint(point)) {
    isMove = true
    dx = point.x - ball.x
    dy = point.y - ball.y
  }
})
canvas.addEventListener('mouseup', () => {
  isMove = false
})
canvas.addEventListener('mouseout', () => {
  isMove = false
})
;(function move() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (isMove) {
    // 1.拖拽
    ball.x = point.x - dx
    ball.y = point.y - dy
  } else {
    // 2.缓动
    ball.x += (center.x - ball.x) * easing
    ball.y += (center.y - ball.y) * easing
  }
  ball.render(ctx)
  requestAnimationFrame(move)
})()
