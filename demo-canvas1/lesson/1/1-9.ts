import { Arrow } from '@demo-canvas1/model'
import { createCanvas } from '@demo-canvas1/utils'

const { canvas, ctx, center, point } =
  createCanvas('1-9.[案例]箭头跟随鼠标运动')

const arrow = new Arrow({ x: center.x, y: center.y, width: 80, height: 30 })
arrow.render(ctx)

const speed = 3 // 大小

;(function move() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  const dx = point.x - arrow.x
  const dy = point.y - arrow.y
  const angle = Math.atan2(dy, dx) // 方向
  const vx = speed * Math.cos(angle)
  const vy = speed * Math.sin(angle)
  arrow.x += vx
  arrow.y += vy
  arrow.rotate = angle
  arrow.render(ctx)
  requestAnimationFrame(move)
})()
