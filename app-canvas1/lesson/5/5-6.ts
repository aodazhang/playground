import { Ball, Box } from '@app-canvas1/model'
import { createCanvas, detectionShadow1 } from '@app-canvas1/utils'
import { randomRgbColor } from '@tool/random'

const { canvas, ctx, point } = createCanvas('5-6.光线投影法碰撞检测')

const ball = new Ball({
  x: 50,
  y: 300,
  radius: 30,
  fillStyle: randomRgbColor()
})
const box = new Box({ x: 300, y: 300, width: 120, height: 70 })

const g = 0.3 // 重力加速度
const f = 0.98 // 摩擦力
const easing = 0.05 // 缓动系数
let isMove = false

const checkHit = detectionShadow1()

canvas.addEventListener('mousedown', e => {
  e.preventDefault()
  isMove = true
  ball.vx = (point.x - ball.x) * easing
  ball.vy = (point.y - ball.y) * easing
  checkHit(ball, box)
})
;(function move() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (isMove) {
    // 小球运动
    // 1.摩擦力
    ball.vx *= f
    ball.vy *= f
    // 2.重力
    ball.vy += g

    ball.x += ball.vx
    ball.y += ball.vy

    // 3.边界处理和碰撞检测
    if (
      ball.x - ball.radius >= canvas.width ||
      ball.x + ball.radius <= 0 ||
      ball.y - ball.radius >= canvas.height ||
      ball.y + ball.radius <= 0 ||
      checkHit(ball, box)
    ) {
      // 自动归位处理
      isMove = false
      ball.x = 50
      ball.y = 300
    }
  } else {
    // 绘制连接线
    ctx.save()
    ctx.lineWidth = 2
    ctx.strokeStyle = 'red'
    ctx.beginPath()
    ctx.moveTo(ball.x, ball.y)
    ctx.lineTo(point.x, point.y)
    ctx.stroke()
    ctx.restore()
  }

  ball.render(ctx)
  box.render(ctx)
  requestAnimationFrame(move)
})()
