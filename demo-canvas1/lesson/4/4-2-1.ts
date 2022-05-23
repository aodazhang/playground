import { Arrow } from '@demo-canvas1/model'
import { createCanvas } from '@demo-canvas1/utils'

const { canvas, ctx, center, point } = createCanvas('4-2.[案例]跟随目标点')

const easing = 0.05

const arrow = new Arrow({ x: center.x, y: center.y, width: 80, height: 30 })

;(function move() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const dx = point.x - arrow.x
  const dy = point.y - arrow.y
  const angle = Math.atan2(dy, dx)

  arrow.x += dx * easing
  arrow.y += dy * easing
  arrow.rotate = angle

  arrow.render(ctx)
  requestAnimationFrame(move)
})()
