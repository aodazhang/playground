import { createCanvas, toAngle } from '../../utils'

const { canvas, ctx, point, center } = createCanvas('1-2.三角函数')

drawSystem()

function drawSystem() {
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(0, center.y)
  ctx.lineTo(canvas.width, center.y)
  ctx.moveTo(center.x, 0)
  ctx.lineTo(center.x, canvas.height)
  ctx.stroke()
  ctx.restore()
}

function drawLine() {
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(center.x, center.y)
  ctx.lineTo(point.x, point.y)
  ctx.stroke()
  ctx.restore()
}

function drawAngle(dx: number, dy: number) {
  ctx.save()
  ctx.fillText(`atan计算角度：${toAngle(Math.atan(dy / dx))}`, point.x, point.y)
  ctx.fillText(
    `atan2计算角度：${toAngle(Math.atan2(dy, dx))}`,
    point.x,
    point.y + 20
  )
  ctx.restore()
}

canvas.addEventListener('mousemove', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  const dx = point.x - center.x
  const dy = point.y - center.y
  drawSystem()
  drawLine()
  drawAngle(dx, dy)
})
