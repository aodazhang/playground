import Vector2D from './Vector2D'

/**
 * 根据二维向量绘制线条
 * @param ctx canvas上下文
 * @param points vec2数组
 * @param strokeStyle 边色
 */
export function drawPointToLine(
  ctx: CanvasRenderingContext2D,
  points: Vector2D[],
  strokeStyle?: 'black' | 'blue' | 'red',
  isClose?: boolean
): void {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.save()
  ctx.strokeStyle = strokeStyle || 'black'
  ctx.beginPath()
  ctx.moveTo(points[0].x, points[0].y)
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y)
  }
  isClose && ctx.closePath()
  ctx.stroke()
  ctx.restore()
}
