import { Ball } from '@demo-canvas1/model'
import { createCanvas } from '@demo-canvas1/utils'
import { randomBetweenNumber } from '@tool/random'

const { canvas, ctx } = createCanvas('8-3.[案例]粒子花园')

const particles: Ball[] = []
const spring = 0.0001 // 弹动系数

for (let i = 0; i < 100; i++) {
  const rm = randomBetweenNumber(5, 8)
  particles.push(
    new Ball({
      x: randomBetweenNumber(50, canvas.width - 50),
      y: randomBetweenNumber(50, canvas.height - 50),
      radius: rm,
      m: rm,
      fillStyle: '#666',
      vx: randomBetweenNumber(-2, 2),
      vy: randomBetweenNumber(-2, 2)
    })
  )
}

;(function move() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  particles.forEach((p1, i) => {
    p1.x += p1.vx
    p1.y += p1.vy

    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j]
      // 1.弹动处理
      const dx = p2.x - p1.x
      const dy = p2.y - p1.y
      const dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
      const minDist = canvas.width / 8 // 最小距离
      // 粒子之间距离小于最小距离，产生弹动 + 连线
      if (dist < minDist) {
        const ax = dx * spring
        const ay = dy * spring
        p1.vx -= ax / p1.m
        p1.vy -= ay / p1.m
        p2.vx += ax / p2.m
        p2.vy += ay / p2.m
        // 绘制连线
        ctx.save()
        ctx.lineWidth = 2 * Math.max(0, 1 - dist / minDist)
        ctx.globalAlpha = Math.max(0, 1 - dist / minDist)
        ctx.strokeStyle = '#666'
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()
        ctx.restore()
      }
    }

    // 2.边界检测
    if (p1.x - p1.radius >= canvas.width) {
      p1.x = -p1.radius
    } else if (p1.x + p1.radius <= 0) {
      p1.x = canvas.width + p1.radius
    } else if (p1.y - p1.radius >= canvas.height) {
      p1.y = -p1.radius
    } else if (p1.y + p1.radius <= 0) {
      p1.y = canvas.height + p1.radius
    }
  })

  particles.forEach(i => i.render(ctx))

  requestAnimationFrame(move)
})()
