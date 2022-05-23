import { Ball } from '@demo-canvas1/model'
import { createCanvas, detectionCircle } from '@demo-canvas1/utils'
import { randomBetweenNumber, randomRgbColor } from '@tool/random'

const { canvas, ctx, point } = createCanvas('5-4.[案例]气泡效果')

const balls: Ball[] = []
const bounce = -0.5
const spring = 0.02

for (let i = 0; i < 300; i++) {
  balls.push(
    new Ball({
      x: randomBetweenNumber(50, canvas.width - 50),
      y: randomBetweenNumber(50, canvas.height - 50),
      radius: i ? 10 : 100, // [隐形球]第1个球作为隐形球
      vx: randomBetweenNumber(-3, 3),
      vy: randomBetweenNumber(-3, 3),
      fillStyle: randomRgbColor()
    })
  )
}

// [隐形球]点击时扩大范围
canvas.addEventListener('mousedown', e => {
  e.preventDefault()
  balls[0].radius = 200
})
canvas.addEventListener('mouseup', () => {
  balls[0].radius = 100
})
canvas.addEventListener('mouseout', () => {
  balls[0].radius = 100
})
;(function move() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // [隐形球]处理位置
  balls[0].x = point.x
  balls[0].y = point.y

  // 1.多物体碰撞检测
  balls.forEach((i, index) => {
    for (let j = index + 1; j < balls.length; j++) {
      const si = balls[j]
      // 球之间相撞：计算当前si要重置的位置
      if (detectionCircle(i, si)) {
        // i与si之间最小距离
        const distance = i.radius + si.radius
        // i与si的夹角弧度
        const rad = Math.atan2(si.y - i.y, si.x - i.x)
        // 参数方程计算si目标坐标点
        const tx = i.x + distance * Math.cos(rad)
        const ty = i.y + distance * Math.sin(rad)
        // 根据si目标坐标点和si当前坐标点计算加速度
        const ax = (tx - si.x) * spring
        const ay = (ty - si.y) * spring
        // i反向加速
        i.vx -= ax
        i.vy -= ay
        // si正向加速
        si.vx += ax
        si.vy += ay
      }
    }
  })

  // 2.处理运动
  balls.forEach((i, index) => {
    if (!index) {
      return
    }
    // 2-1.边界处理
    if (i.x - i.radius <= 0) {
      // 小球左边界反弹
      i.x = i.radius
      i.vx *= bounce
    } else if (i.x + i.radius >= canvas.width) {
      // 小球右边界反弹
      i.x = canvas.width - i.radius
      i.vx *= bounce
    } else if (i.y - i.radius <= 0) {
      // 小球上边界反弹
      i.y = i.radius
      i.vy *= bounce
    } else if (i.y + i.radius >= canvas.height) {
      // 小球下边界反弹
      i.y = canvas.height - i.radius
      i.vy *= bounce
    }
    // 2-2.设置小球坐标
    i.x += i.vx
    i.y += i.vy
  })

  // 3.处理绘制
  balls.forEach((i, index) => index && i.render(ctx))

  requestAnimationFrame(move)
})()
