import { Ball } from '@app-canvas1/model'
import { createCanvas } from '@app-canvas1/utils'

const { canvas, ctx, center, point } = createCanvas('3-2.拖拽绘制对象')

const ball = new Ball({ x: center.x, y: center.y, radius: 100 })
let isMove = false
let dx = 0
let dy = 0

canvas.addEventListener('mousedown', e => {
  e.preventDefault()
  if (ball.isPoint(point)) {
    isMove = true
    dx = point.x - ball.x
    dy = point.y - ball.y
  }
})

canvas.addEventListener('mousemove', () => {
  if (!isMove) {
    return
  }
  ball.x = point.x - dx
  ball.y = point.y - dy
})

canvas.addEventListener('mouseup', () => {
  isMove = false
})

canvas.addEventListener('mouseout', () => {
  isMove = false
})
;(function move() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ball.render(ctx)
  requestAnimationFrame(move)
})()
