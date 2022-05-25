import { randomBetweenNumber, randomRgbColor } from '@tool/random'
import { Ball } from '../../model'
import { createCanvas } from '../../utils'

const { canvas, ctx } = createCanvas('2-1.环境边界（移除）')

const balls: Ball[] = []
for (let i = 0; i < 10; i++) {
  balls.push(
    new Ball({
      id: `ball_${i}`,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: randomBetweenNumber(-3, 3),
      vy: randomBetweenNumber(-3, 3),
      radius: randomBetweenNumber(20, 50),
      fillStyle: randomRgbColor()
    })
  )
}

function ballMove(ball: Ball) {
  ball.x += ball.vx
  ball.y += ball.vy

  // 越界处理的几种方式
  if (
    ball.x - ball.radius >= canvas.width ||
    ball.x + ball.radius <= 0 ||
    ball.y - ball.radius >= canvas.height ||
    ball.y + ball.radius <= 0
  ) {
    const findIndex = balls.findIndex(i => i.id === ball.id)
    if (findIndex > -1) {
      // 1.将物体移除
      balls.splice(findIndex, 1)
    }
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
