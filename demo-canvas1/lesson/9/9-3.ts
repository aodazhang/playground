import { randomBetweenNumber } from '@tool/random'
import { Ball } from '../../model'
import { createCanvas } from '../../utils'

const { canvas, ctx, center } = createCanvas('9-3.[案例]简单3D动画')

const balls: Ball[] = []
const g = 0.2 // 重力加速度
const bounce = -0.8 // 反弹系数
const floor = 300 // 地板高度
const f1 = 250 // 景深
const hx = center.x
const hy = center.y
const ballColor = ctx.createRadialGradient(0, 0, 0, 0, 0, 10)
ballColor.addColorStop(0, '#fff')
ballColor.addColorStop(0.3, 'rgba(0, 255, 240, 1)')
ballColor.addColorStop(0.5, 'rgba(0, 240, 255, 1)')
ballColor.addColorStop(1, 'rgba(0, 110, 255, 0.5)')

for (let i = 0; i < 100; i++) {
  balls.push(
    new Ball({
      y3d: -200,
      radius: 10,
      fillStyle: ballColor,
      vx: randomBetweenNumber(-6, 6),
      vy: randomBetweenNumber(-6, -3),
      vz: randomBetweenNumber(-5, 5)
    })
  )
}

;(function move() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 1.调整位置
  balls.forEach(i => {
    i.vy += g
    i.x3d += i.vx
    i.y3d += i.vy
    i.z3d += i.vz

    // 地板碰撞检测
    if (i.y3d > floor) {
      i.vy *= bounce
      i.y3d = floor
    }

    // 小球z坐标小于景深，则不渲染
    if (i.z3d <= -f1) {
      i.isRender = false
      return
    }
    // 二维坐标转换三维坐标
    // a.缩放比
    const scale = f1 / (f1 + i.z3d)
    i.scaleX = scale
    i.scaleY = scale
    // b.消失点坐标处理
    i.x = hx + i.x3d * scale
    i.y = hy + i.y3d * scale
    i.isRender = true
  })

  // 2.排序
  balls.sort((a, b) => b.z3d - a.z3d)

  // 3.渲染
  balls.forEach(i => i.isRender && i.render(ctx))
  requestAnimationFrame(move)
})()
