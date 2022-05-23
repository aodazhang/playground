import { Ball } from '@demo-canvas1/model'
import {
  createCanvas,
  detectionCircle,
  detectionEdge
} from '@demo-canvas1/utils'
import { randomRgbColor } from '@tool/random'

const { canvas, ctx, center } = createCanvas('7-2.一维碰撞')

const b1 = new Ball({
  x: 100,
  y: center.y,
  radius: 50,
  m: 2,
  vx: 3
})
const b2 = new Ball({
  x: canvas.width - 100,
  y: center.y,
  radius: 30,
  fillStyle: randomRgbColor(),
  m: 1,
  vx: -4
})

;(function move() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.save()
  ctx.strokeStyle = 'red'
  ctx.beginPath()
  ctx.moveTo(0, center.y)
  ctx.lineTo(canvas.width, center.y)
  ctx.stroke()
  ctx.restore()

  // 1.边界检测
  detectionEdge(canvas, b1, -1)
  detectionEdge(canvas, b2, -1)

  // 2.碰撞检测
  if (detectionCircle(b1, b2)) {
    // 3.动能动量公式计算碰撞后速度
    const v1Final = ((b1.m - b2.m) * b1.vx + 2 * b2.m * b2.vx) / (b1.m + b2.m)
    const v2Final = ((b2.m - b1.m) * b2.vx + 2 * b1.m * b1.vx) / (b1.m + b2.m)
    b1.vx = v1Final
    b2.vx = v2Final
  }

  b1.x += b1.vx
  b2.x += b2.vx

  b1.render(ctx)
  b2.render(ctx)
  requestAnimationFrame(move)
})()
