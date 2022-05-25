import { randomBetweenNumber } from '@tool/random'
import { Ball } from '../../model'
import { createCanvas, toRad } from '../../utils'

const { canvas, ctx } = createCanvas('2-5.摩擦力')

const angle = toRad(30)
let speed = randomBetweenNumber(30, 50)
const friction = 3 // 摩擦力系数
const ball = new Ball({ x: 80, y: 80, radius: 40 })

;(function move() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  // 正确方法
  speed = speed > friction ? speed - friction : 0
  // 简单方法：一般设置0.9左右
  // speed *= 0.9
  // speed < 0.01 && (speed = 0)

  const vx = speed * Math.cos(angle)
  const vy = speed * Math.sin(angle)

  ball.x += vx
  ball.y += vy

  ball.render(ctx)
  requestAnimationFrame(move)
})()
