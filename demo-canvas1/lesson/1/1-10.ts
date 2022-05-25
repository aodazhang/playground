import { Ball } from '../../model'
import { createCanvas } from '../../utils'

const { canvas, ctx } = createCanvas('1-10.加速度')

const ball = new Ball({ x: 50, y: 50, radius: 20 })
ball.render(ctx)

/**
 * 1.任意方向加速度
 */
// let vx = 0
// let vy = 0
// let angle = toRad(30)
// let a = 0.1

// ;(function move() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height)
//   let ax = a * Math.cos(angle)
//   let ay = a * Math.sin(angle)
//   ball.x += vx
//   ball.y += vy
//   vx += ax
//   vy += ay
//   ball.render(ctx)
//   requestAnimationFrame(move)
// })()

/**
 * 2.重力加速度
 */
let vy = 0
const g = 0.2

;(function move() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ball.y += vy
  vy += g
  // 碰撞检测
  if (ball.y + ball.radius >= canvas.height) {
    ball.y = canvas.height - ball.radius
    vy *= -0.6 // 不使用-1是为了模拟空气阻力
  }
  ball.render(ctx)
  requestAnimationFrame(move)
})()
