import { randomBetweenNumber, randomRgbColor } from '@tool/random'
import { Ball } from '../../model'
import { createCanvas } from '../../utils'

const { canvas, ctx, center } = createCanvas('2-2.环境边界（重置）')

const balls: Ball[] = []
const g = 0.05
for (let i = 0; i < 100; i++) {
  balls.push(
    new Ball({
      id: `ball_${i}`,
      x: center.x,
      y: canvas.height,
      radius:
        Math.random() > 0.9
          ? randomBetweenNumber(20, 30)
          : randomBetweenNumber(10, 20),
      fillStyle: randomRgbColor(),
      vx: randomBetweenNumber(-3, 3),
      vy: randomBetweenNumber(-10, 0)
    })
  )
}

function ballMove(ball: Ball) {
  ball.x += ball.vx
  ball.y += ball.vy
  ball.vy += g

  // 越界处理的几种方式
  if (
    ball.x - ball.radius >= canvas.width ||
    ball.x + ball.radius <= 0 ||
    ball.y - ball.radius >= canvas.height ||
    ball.y + ball.radius <= 0
  ) {
    // 2.重置起始位置
    ball.x = center.x
    ball.y = canvas.height
    ball.vx = randomBetweenNumber(-3, 3)
    ball.vy = randomBetweenNumber(-10, 0)
  }

  ball.render(ctx)
}

;(function move() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (let i = balls.length - 1; i >= 0; i--) {
    ballMove(balls[i])
  }
  requestAnimationFrame(move)
})()
