import { Ball } from '@demo-canvas1/model'
import { createCanvas } from '@demo-canvas1/utils'

const { canvas, ctx } = createCanvas('4-1.缓出ease out')

const easing = 0.05 // 比例系数
const targetX = canvas.width - 60 // 终点位置
const targetY = canvas.height - 60 // 终点位置

const ball = new Ball({ x: 60, y: 60, radius: 40 })

;(function move() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 1.计算物体与目标点之间的距离
  const dx = targetX - ball.x
  const dy = targetY - ball.y

  // 2.计算速度，速度 = 距离 * 比例系数
  const vx = dx * easing
  const vy = dy * easing

  // 3.用当前的位置加上速度计算新的位置
  ball.x += vx
  ball.y += vy

  ball.render(ctx)
  requestAnimationFrame(move)
})()
