import { Arrow } from '../../model'
import { createCanvas } from '../../utils'

const { canvas, ctx, center, point } =
  createCanvas('1-4.[案例]箭头跟随鼠标转动')

const arrow = new Arrow({ x: center.x, y: center.y, width: 180, height: 60 })
arrow.render(ctx)

canvas.addEventListener('mousemove', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  const dx = point.x - arrow.x
  const dy = point.y - arrow.y
  arrow.rotate = Math.atan2(dy, dx)
  arrow.render(ctx)
})
