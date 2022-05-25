import { Ball, Line } from '../../model'
import { createCanvas, detectionEdge, toRad } from '../../utils'

const { canvas, ctx } = createCanvas('6-2.斜面反弹')

const line = new Line({
  x: 100,
  y: 300,
  x1: 0,
  y1: 0,
  x2: 300,
  y2: 0,
  rotate: toRad(10),
  lineWidth: 6
})
const ball = new Ball({ x: 120, y: 100, radius: 30 })

const g = 0.2
const bounce = -0.7

;(function move() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ball.vy += g
  ball.x += ball.vx
  ball.y += ball.vy

  // 1.处理斜面反弹
  // 获取小球与直线的相对坐标
  let rx = ball.x - line.x
  let ry = ball.y - line.y
  // 计算旋转角度
  const sin = Math.sin(line.rotate)
  const cos = Math.cos(line.rotate)
  // 旋转后小球的相对坐标（逆时针）
  const x1 = rx * cos + ry * sin
  let y1 = ry * cos - rx * sin
  // 旋转后小球的速度（逆时针）
  let vx1 = ball.vx * cos + ball.vy * sin
  let vy1 = ball.vy * cos - ball.vx * sin
  // a.检测小球是否在直线范围内
  if (x1 + ball.radius > line.x1 && x1 - ball.radius < line.x2) {
    // b.检测小球和水平直线上部碰撞
    if (y1 + ball.radius >= 0 && vy1 > y1) {
      y1 = -ball.radius
      vy1 *= bounce
    }
    // b.检测小球和水平直线下部碰撞
    if (y1 - ball.radius < 0 && vy1 < y1) {
      y1 = ball.radius
      vy1 *= bounce
    }
  }
  // 小球转回原始的相对坐标（顺时针）
  rx = x1 * cos - y1 * sin
  ry = x1 * sin + y1 * cos
  // 小球转回原始速度（顺时针）
  vx1 = vx1 * cos - vy1 * sin
  vy1 = vx1 * sin + vy1 * cos

  ball.vx = vx1
  ball.vy = vy1
  // 还原小球的真实位置：rx = ball.x - line.x
  ball.x = line.x + rx
  ball.y = line.y + ry

  // 2.处理边界反弹
  detectionEdge(canvas, ball, bounce)

  line.render(ctx)
  ball.render(ctx)
  requestAnimationFrame(move)
})()
