import { Ball } from '@demo-canvas1/model'
import { createCanvas } from '@demo-canvas1/utils'
import { randomBetweenNumber } from '@tool/random'

const { canvas, ctx, center, point } = createCanvas('3-3.[案例]拖拽动画')

const ball = new Ball({
  x: center.x,
  y: center.y,
  radius: 40,
  vx: randomBetweenNumber(-10, 10),
  vy: -10
})
let isMove = false
let dx = 0
let dy = 0
const g = 0.2 // 重力加速度
const bounce = -0.7 // 反弹系数

canvas.addEventListener('mousedown', e => {
  e.preventDefault()
  if (ball.isPoint(point)) {
    isMove = true
    dx = point.x - ball.x
    dy = point.y - ball.y
  }
})
canvas.addEventListener('mouseup', () => {
  isMove = false
})
canvas.addEventListener('mouseout', () => {
  isMove = false
})
;(function move() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (isMove) {
    // 1.拖拽：用户控制
    ball.x = point.x - dx
    ball.y = point.y - dy
  } else {
    // 2.未拖拽：下落动画
    ball.vy += g // 加速度的计算要放在位移之前，否则当y轴反弹时ball.y会先+负数导致一直小于canvas高度
    ball.x += ball.vx
    ball.y += ball.vy

    // 碰撞检测
    if (ball.x + ball.radius >= canvas.width) {
      ball.x = canvas.width - ball.radius
      ball.vx *= bounce
    } else if (ball.x - ball.radius <= 0) {
      ball.x = ball.radius
      ball.vx *= bounce
    } else if (ball.y + ball.radius >= canvas.height) {
      ball.y = canvas.height - ball.radius
      ball.vy *= bounce
    } else if (ball.y - ball.radius <= 0) {
      ball.y = ball.radius
      ball.vy *= bounce
    }
  }

  ball.render(ctx)
  requestAnimationFrame(move)
})()
