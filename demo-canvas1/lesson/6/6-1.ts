import { Ball } from '@demo-canvas1/model'
import { createCanvas } from '@demo-canvas1/utils'
import { randomBetweenNumber } from '@tool/random'

const { canvas, ctx, center } = createCanvas('6-1.高级坐标旋转')

const ball = new Ball({
  x: randomBetweenNumber(200, 400),
  y: randomBetweenNumber(200, 400),
  radius: 25
})

const vr = 0.05 // 每帧要旋转的角速度

;(function move() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 物体相对于中心点坐标
  const rx = ball.x - center.x
  const ry = ball.y - center.y

  // 参数方程计算相对坐标
  const x = rx * Math.cos(vr) - ry * Math.sin(vr)
  const y = ry * Math.cos(vr) + rx * Math.sin(vr)

  // 中心点坐标 + 相对坐标 = 最终坐标
  ball.x = center.x + x
  ball.y = center.y + y

  ball.render(ctx)
  requestAnimationFrame(move)
})()
