import { Ball } from '@demo-canvas1/model'
import {
  createCanvas,
  detectionCircle,
  detectionEdge
} from '@demo-canvas1/utils'
import { randomBetweenNumber, randomRgbColor } from '@tool/random'

const { canvas, ctx } = createCanvas('7-3.二维碰撞')

const b1 = new Ball({
  x: randomBetweenNumber(100, canvas.width - 100),
  y: randomBetweenNumber(100, canvas.height - 100),
  radius: 50,
  m: 2,
  vx: randomBetweenNumber(-5, 5),
  vy: randomBetweenNumber(-5, 5)
})
const b2 = new Ball({
  x: randomBetweenNumber(100, canvas.width - 100),
  y: randomBetweenNumber(100, canvas.height - 100),
  radius: 30,
  fillStyle: randomRgbColor(),
  m: 1,
  vx: randomBetweenNumber(-5, 5),
  vy: randomBetweenNumber(-5, 5)
})

;(function move() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  b1.x += b1.vx
  b1.y += b1.vy
  b2.x += b2.vx
  b2.y += b2.vy

  // 1.边界检测
  detectionEdge(canvas, b1, -1)
  detectionEdge(canvas, b2, -1)

  // 2.二维碰撞检测

  if (detectionCircle(b1, b2)) {
    // 初始化旋转角度及三角函数
    const dx = b2.x - b1.x
    const dy = b2.y - b1.y
    const angle = Math.atan2(dy, dx)
    const sin = Math.sin(angle)
    const cos = Math.cos(angle)

    // 以b1作为参照物，设定b1中心点为旋转基点
    let x1 = 0
    const y1 = 0
    // 旋转b2坐标点
    let x2 = dx * cos + dy * sin
    const y2 = dy * cos - dx * sin

    // 旋转b1速度
    const vx1 = b1.vx * cos + b1.vy * sin
    const vy1 = b1.vy * cos - b1.vx * sin
    // 旋转b2速度
    const vx2 = b2.vx * cos + b2.vy * sin
    const vy2 = b2.vy * cos - b2.vx * sin

    // 求b1和b2碰撞后速度
    const vx1Final = ((b1.m - b2.m) * vx1 + 2 * b2.m * vx2) / (b1.m + b2.m)
    const vx2Final = ((b2.m - b1.m) * vx2 + 2 * b1.m * vx1) / (b1.m + b2.m)

    const lep = b1.radius + b2.radius - Math.abs(x2 - x1)
    x1 = x1 + (vx1Final < 0 ? -lep / 2 : lep / 2)
    x2 = x2 + (vx2Final < 0 ? -lep / 2 : lep / 2)

    // 恢复b1、b2坐标点旋转
    b2.x = b1.x + x2 * cos - y2 * sin
    b2.y = b1.y + y2 * cos + x2 * sin
    b1.x = b1.x + x1 * cos - y1 * sin
    b1.y = b1.y + y1 * cos + x1 * sin

    // 恢复b1、b2速度旋转
    b1.vx = vx1Final * cos - vy1 * sin
    b1.vy = vy1 * cos + vx1Final * sin
    b2.vx = vx2Final * cos - vy2 * sin
    b2.vy = vy2 * cos + vx2Final * sin
  }

  b1.render(ctx)
  b2.render(ctx)
  requestAnimationFrame(move)
})()
