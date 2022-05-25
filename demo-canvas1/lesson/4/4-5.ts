import { randomBetweenNumber, randomRgbColor } from '@tool/random'
import { Ball } from '../../model'
import { createCanvas } from '../../utils'

const { canvas, ctx, point } = createCanvas('4-5.[案例]双物体弹动')

const lineColor = randomRgbColor()
let isMove1 = false
let isMove2 = false
const offset = 100 // 物体之间偏移量
const spring = 0.03 // 弹动系数
const friction = 0.95 // 摩擦力系数
const bounce = -0.7 // 反弹系数

const ball1 = new Ball({
  x: randomBetweenNumber(50, canvas.width - 50),
  y: randomBetweenNumber(50, canvas.height - 50),
  radius: 30
})

const ball2 = new Ball({
  x: randomBetweenNumber(50, canvas.width - 50),
  y: randomBetweenNumber(50, canvas.height - 50),
  radius: 30,
  fillStyle: randomRgbColor()
})

canvas.addEventListener('mousedown', e => {
  e.preventDefault()
  if (ball1.isPoint(point)) {
    isMove1 = true
  }
  if (ball2.isPoint(point)) {
    isMove2 = true
  }
})
canvas.addEventListener('mouseup', () => {
  isMove1 = false
  isMove2 = false
})
canvas.addEventListener('mouseout', () => {
  isMove1 = false
  isMove2 = false
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

  if (isMove1) {
    // 拖拽小球1
    ball1.x = point.x
    ball1.y = point.y
  } else {
    // 弹动小球1
    springTo(ball1, ball2)
  }

  if (isMove2) {
    // 拖拽小球2
    ball2.x = point.x
    ball2.y = point.y
  } else {
    // 弹动小球2
    springTo(ball2, ball1)
  }

  ball1.render(ctx)
  ball2.render(ctx)

  // 绘制连线
  ctx.save()
  ctx.beginPath()
  ctx.strokeStyle = lineColor
  ctx.lineWidth = 3
  ctx.moveTo(ball1.x, ball1.y)
  ctx.lineTo(ball2.x, ball2.y)
  ctx.stroke()
  ctx.restore()
  requestAnimationFrame(move)
})()
