import { randomBetweenNumber } from '@tool/random'
import { Ball } from '../../model'
import { createCanvas } from '../../utils'

const { canvas, ctx } = createCanvas('8-2.万有引力的基本应用')

const particles: Ball[] = []
const length = 100

for (let i = 0; i < length; i++) {
  const rm = randomBetweenNumber(3, 10)
  particles.push(
    new Ball({
      x: randomBetweenNumber(50, canvas.width - 50),
      y: randomBetweenNumber(50, canvas.height - 50),
      radius: rm,
      m: rm,
      fillStyle: '#666'
    })
  )
}

;(function move() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 1.处理万有引力
  particles.forEach((i, index) => {
    for (let j = index + 1; j < length; j++) {
      const p2 = particles[j]
      // 2.计算两个粒子之间距离
      const dx = p2.x - i.x
      const dy = p2.y - i.y
      const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
      // 3.计算万有引力（两者加速度之和）
      const force = (i.m * p2.m) / distance ** 2
      // 4.分别求出x、y方向上的加速度（两者加速度之和）
      const ax = (force * dx) / distance
      const ay = (force * dy) / distance
      // 5.分别计算两者在x、y方向上的加速度
      i.vx += ax / i.m
      i.vy += ay / i.m
      p2.vx -= ax / p2.m
      p2.vy -= ay / p2.m
    }
  })

  particles.forEach(i => {
    i.x += i.vx
    i.y += i.vy
    i.render(ctx)
  })

  requestAnimationFrame(move)
})()
