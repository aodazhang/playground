import { Ball } from '../../model'
import { createCanvas, toRad } from '../../utils'

const { canvas, ctx } = createCanvas('1-8.速度向量')

const ball = new Ball({ x: 50, y: 50, radius: 20 })
ball.render(ctx)

// let vx = 0.5
// let vy = 0.5
// ;(function move() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height)
//   ball.x += vx
//   ball.y += vy
//   ball.render(ctx)
//   requestAnimationFrame(move)
// })()

const speed = 2
const angle = 20
;(function move() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  const vx = speed * Math.cos(toRad(angle))
  const vy = speed * Math.sin(toRad(angle))
  ball.x += vx
  ball.y += vy
  ball.render(ctx)
  requestAnimationFrame(move)
})()
