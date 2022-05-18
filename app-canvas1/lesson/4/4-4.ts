import { Ball } from '@app-canvas1/model'
import { createCanvas } from '@app-canvas1/utils'

const { canvas, ctx, center, point } = createCanvas('4-4.[案例]橡皮筋')

const spring = 0.03 // 弹动系数
const friction = 0.95 // 摩擦力系数
const g = 2.5 // 重力加速度

const ball = new Ball({ x: center.x, y: center.y, radius: 30 })

;(function move() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 1.距离
  const dx = point.x - ball.x
  const dy = point.y - ball.y
  // 2.加速度
  const ax = dx * spring
  let ay = dy * spring
  // 3.重力加速度
  ay += g
  // 4.速度
  ball.vx += ax
  ball.vy += ay
  // 5.摩擦力
  ball.vx *= friction
  ball.vy *= friction

  ball.x += ball.vx
  ball.y += ball.vy
  ball.render(ctx)

  // 绘制橡皮筋
  ctx.save()
  ctx.beginPath()
  ctx.strokeStyle = 'red'
  ctx.moveTo(ball.x, ball.y)
  ctx.lineTo(point.x, point.y)
  ctx.stroke()
  ctx.restore()
  requestAnimationFrame(move)
})()
