import { Ball } from '@app-canvas1/model'
import { createCanvas } from '@app-canvas1/utils'
import { randomBetweenNumber, randomRgbColor } from '@tool/random'

const { canvas, ctx, center } = createCanvas('2-4.环境边界（反弹）')

const balls: Ball[] = []
for (let i = 0; i < 10; i++) {
  balls.push(
    new Ball({
      id: `ball_${i}`,
      x: center.x,
      y: center.y,
      radius: randomBetweenNumber(20, 50),
      fillStyle: randomRgbColor(),
      vx: randomBetweenNumber(-5, 5),
      vy: randomBetweenNumber(-6, 7)
    })
  )
}

function ballMove(ball: Ball) {
  // 越界处理的几种方式
  // 4.边界反弹
  if (ball.x - ball.radius <= 0 || ball.x + ball.radius >= canvas.width) {
    ball.vx *= -1
  }
  if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= canvas.height) {
    ball.vy *= -1
  }
  ball.x += ball.vx
  ball.y += ball.vy
  ball.render(ctx)
}

;(function move() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  balls.forEach(i => ballMove(i))
  requestAnimationFrame(move)
})()
