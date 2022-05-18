import { Ball } from '@app-canvas1/model'
import { createCanvas } from '@app-canvas1/utils'

const { canvas, ctx, center } = createCanvas('1-7.圆运动')

const ball = new Ball({ x: center.x, y: center.y, radius: 20 })
ball.render(ctx)

// function drawCirclePath(r: number) {
//   ctx.save()
//   ctx.beginPath()
//   ctx.arc(center.x, center.y, r, 0, 2 * Math.PI)
//   ctx.stroke()
//   ctx.restore()
// }

/**
 * 正圆运动
 */
// let angle = 0
// let r = 150 // 运动半径
// ;(function move() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height)
//   ball.x = center.x + r * Math.cos(angle)
//   ball.y = center.y + r * Math.sin(angle)
//   angle += 0.06
//   angle %= 2 * Math.PI
//   drawCirclePath(r)
//   ball.render(ctx)
//   requestAnimationFrame(move)
// })()

function drawEllipsePath(r1: number, r2: number) {
  ctx.save()
  ctx.beginPath()
  ctx.ellipse(center.x, center.y, r1, r2, 0, 0, 2 * Math.PI)
  ctx.stroke()
  ctx.restore()
}

/**
 * 椭圆运动
 */
let angle = 0
const r1 = 200 // 运动半径x
const r2 = 80 // 运动半径y
;(function move() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ball.x = center.x + r1 * Math.cos(angle)
  ball.y = center.y + r2 * Math.sin(angle)
  angle += 0.06
  angle %= 2 * Math.PI
  drawEllipsePath(r1, r2)
  ball.render(ctx)
  requestAnimationFrame(move)
})()
