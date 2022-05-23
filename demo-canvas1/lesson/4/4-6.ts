import { Ball } from '@demo-canvas1/model'
import { createCanvas } from '@demo-canvas1/utils'
import { randomBetweenNumber, randomRgbColor } from '@tool/random'

const { canvas, ctx, point } = createCanvas('4-6.[案例]多物体弹动')

const balls: Ball[] = [] // 小球数组
let dragged: Ball = null // 当前移动小球
const offset = 175 // 球之间偏移量
const spring = 0.03 // 弹动系数
const friction = 0.95 // 摩擦力系数
const bounce = -0.7 // 反弹系数

for (let i = 0; i < 8; i++) {
  balls.push(
    new Ball({
      x: randomBetweenNumber(50, canvas.width - 50),
      y: randomBetweenNumber(50, canvas.height - 50),
      radius: 30,
      fillStyle: randomRgbColor()
    })
  )
}

canvas.addEventListener('mousedown', e => {
  e.preventDefault()
  balls.forEach(i => {
    if (!i.isPoint(point)) {
      return
    }
    i.isMove = true
    dragged = i
  })
})
canvas.addEventListener('mouseup', () => {
  if (!dragged) {
    return
  }
  dragged.isMove = false
  dragged = null
})
canvas.addEventListener('mouseout', () => {
  if (!dragged) {
    return
  }
  dragged.isMove = false
  dragged = null
})

/**
 * b1向b2弹动
 * @param b1 小球1
 * @param b2 小球2
 */
function springTo(b1: Ball, b2: Ball) {
  // 1.计算b1到b2之间的距离及角度
  const dx = b2.x - b1.x
  const dy = b2.y - b1.y
  const angle = Math.atan2(dy, dx)
  // 2.计算b1位移目标值
  const targetX = b2.x - offset * Math.cos(angle)
  const targetY = b2.y - offset * Math.sin(angle)
  // 3.加入弹动系数
  b1.vx += (targetX - b1.x) * spring
  b1.vy += (targetY - b1.y) * spring
  // 4.加入摩擦力
  b1.vx *= friction
  b1.vy *= friction

  b1.x += b1.vx
  b1.y += b1.vy

  // 5.碰撞检测
  if (b1.x + b1.radius >= canvas.width) {
    b1.x = canvas.width - b1.radius
    b1.vx *= bounce
  } else if (b1.x - b1.radius <= 0) {
    b1.x = b1.radius
    b1.vx *= bounce
  } else if (b1.y + b1.radius >= canvas.height) {
    b1.y = canvas.height - b1.radius
    b1.vy *= bounce
  } else if (b1.y - b1.radius <= 0) {
    b1.y = b1.radius
    b1.vy *= bounce
  }
}

;(function move() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (dragged) {
    dragged.x = point.x
    dragged.y = point.y
  }

  balls.forEach(i => {
    if (!i.isMove) {
      // 未拖拽小球向所有其他小球弹动
      balls.forEach(si => {
        if (i === si) {
          return
        }
        springTo(i, si)
      })
    }
    i.render(ctx)
  })

  ctx.save()
  ctx.beginPath()
  ctx.lineWidth = 2
  ctx.strokeStyle = 'red'
  balls.forEach(i => ctx.lineTo(i.x, i.y))
  ctx.closePath()
  ctx.stroke()
  ctx.restore()

  requestAnimationFrame(move)
})()
