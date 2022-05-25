import { randomBetweenNumber } from '@tool/random'
import { Ball } from '../../model'
import { createCanvas } from '../../utils'

const { canvas, ctx, center } = createCanvas('9-5.[案例]星空背景')

const particles: Ball[] = []
const f = 0.8 // 摩擦系数
const f1 = 250 // 景深
const hx = center.x
const hy = center.y
const fillStyle = ctx.createRadialGradient(0, 0, 0, 0, 0, 10)
fillStyle.addColorStop(0, '#fff')
fillStyle.addColorStop(0.3, 'rgba(0, 255, 240, 1)')
fillStyle.addColorStop(0.5, 'rgba(0, 240, 255, 1)')
fillStyle.addColorStop(1, 'rgba(0, 110, 255, 0.5)')

for (let i = 0; i < 300; i++) {
  particles.push(
    new Ball({
      x3d: randomBetweenNumber(-1.5 * canvas.width, 2 * canvas.width),
      y3d: randomBetweenNumber(-1.5 * canvas.height, 2 * canvas.height),
      z3d: randomBetweenNumber(0, 1200),
      radius: 10,
      fillStyle,
      vz: randomBetweenNumber(-2, 2),
      // az: randomBetweenNumber(-2, -1)
      az: randomBetweenNumber(1, 2)
    })
  )
}

;(function move() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 1.运动
  particles.forEach(i => {
    i.vz += i.az
    i.vz *= f
    i.z3d += i.vz

    // 可见范围判断
    if (i.z3d < -f1) {
      i.z3d += 1200
    }
    if (i.z3d > 1200 - f1) {
      i.z3d -= 1200
    }

    // 二维坐标转换三维坐标
    const scale = f1 / (f1 + i.z3d)
    i.scaleX = scale
    i.scaleY = scale
    i.x = hx + i.x3d * scale
    i.y = hy + i.y3d * scale
    i.alpha = Math.min(Math.abs(scale) * 1.5, 1)
  })

  // 2.排序
  particles.sort((a, b) => b.z3d - a.z3d)

  // 3.渲染
  particles.forEach(i => i.isRender && i.render(ctx))
  requestAnimationFrame(move)
})()
