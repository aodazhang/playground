import { Ball } from '@app-canvas1/model'
import { createCanvas } from '@app-canvas1/utils'

const { canvas, ctx, center } = createCanvas('4-3.缓出ease out')

const spring = 0.02 // 弹动系数
const friction = 0.95 // 摩擦力系数

const ball = new Ball({ x: 60, y: center.y, radius: 30 })

;(function move() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 1.计算加速度
  const ax = (center.x - ball.x) * spring
  // 2.小球速度不断加速
  ball.vx += ax
  // 3.小球速度加入摩擦力系数
  ball.vx *= friction

  ball.x += ball.vx
  ball.render(ctx)
  requestAnimationFrame(move)
})()
