import { randomBetweenNumber, randomRgbColor } from '@tool/random'
import { Ball } from '../../model'
import { createCanvas, detectionEdge, detectionMomentum } from '../../utils'

const { canvas, ctx } = createCanvas('7-5.[案例]多物体碰撞')

const balls: Ball[] = []
const bounce = -1
const length = 50

for (let i = 0; i < length; i++) {
  balls.push(
    new Ball({
      x: randomBetweenNumber(50, canvas.width - 50),
      y: randomBetweenNumber(50, canvas.height - 50),
      radius:
        Math.random() > 0.9
          ? randomBetweenNumber(10, 20)
          : randomBetweenNumber(8, 12),
      fillStyle: randomRgbColor(),
      m: randomBetweenNumber(1, 5),
      vx: randomBetweenNumber(-2, 2),
      vy: randomBetweenNumber(-2, 2)
    })
  )
}

;(function move() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  balls.forEach((i, index) => {
    i.x += i.vx
    i.y += i.vy

    // 1.二维碰撞检测
    for (let j = index + 1; j < length; j++) {
      detectionMomentum(i, balls[j])
    }

    // 2.边界检测
    detectionEdge(canvas, i, bounce)
    i.render(ctx)
  })

  requestAnimationFrame(move)
})()
