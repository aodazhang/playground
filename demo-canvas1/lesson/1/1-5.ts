import { Ball } from '../../model'
import { createCanvas } from '../../utils'

const { canvas, ctx, center } = createCanvas('1-5.正弦波的应用')

const radius = 30 // 小球半径

const ball1 = new Ball({ x: center.x, y: center.y - 150, radius })
const ball2 = new Ball({ x: center.x, y: center.y, radius })
const ball3 = new Ball({ x: center.x, y: center.y + 150, radius })

ball1.render(ctx)
ball2.render(ctx)
ball3.render(ctx)

/**
 * 1.平滑运动
 */
let angle1 = 0 // 起始弧度
;(function move() {
  ctx.clearRect(0, ball1.y - radius * 1.5, canvas.width, radius * 3)
  ball1.x = center.x + Math.sin(angle1) * 160
  angle1 += 0.06
  angle1 %= Math.PI * 2
  ball1.render(ctx)
  requestAnimationFrame(move)
})()

/**
 * 2.线性运动
 */
let angle2 = 0.5
;(function move() {
  ctx.clearRect(0, ball2.y - radius * 1.5, canvas.width, radius * 3)
  ball2.x += 1
  ball2.y = center.y + Math.sin(angle2) * 30
  angle2 += 0.06
  angle2 %= Math.PI * 2
  ball2.render(ctx)
  requestAnimationFrame(move)
})()

/**
 * 3.脉冲运动：sin函数运用到缩放
 */
let angle3 = 0.5
;(function move() {
  ctx.clearRect(0, ball3.y - radius * 1.5, canvas.width, radius * 3)
  ball3.scaleX = ball3.scaleY = 1 * Math.sin(angle3) * 1.5
  angle3 += 0.06
  angle3 %= Math.PI * 2
  ball3.render(ctx)
  requestAnimationFrame(move)
})()
