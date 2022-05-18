import { Arrow } from '@app-canvas1/model'
import { createCanvas, toRad } from '@app-canvas1/utils'

const { canvas, ctx, center } = createCanvas('2-3.环境边界（环绕）')

let vx = 0
let vy = 0
let vr = 0 // 角速度
let a = 0 // 加速度

const arrow = new Arrow({
  x: center.x,
  y: center.y,
  width: 46,
  height: 15
})

window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'w':
      a = 0.1
      break

    case 's':
      a = 0
      break

    case 'a':
      vr = -5
      break

    case 'd':
      vr = 5
      break
  }
})

window.addEventListener('keyup', () => {
  vr = 0
  a = 0
})

arrow.render(ctx)
;(function move() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 角速度
  arrow.rotate += toRad(vr)

  // 加速度
  const ax = Math.cos(arrow.rotate) * a
  const ay = Math.sin(arrow.rotate) * a

  // 速度
  vx += ax
  vy += ay

  arrow.x += vx
  arrow.y += vy

  // 越界处理的几种方式
  // 3.重置其他位置
  if (arrow.x - arrow.width / 2 >= canvas.width) {
    arrow.x = 0 - arrow.width / 2
  } else if (arrow.x + arrow.width / 2 <= 0) {
    arrow.x = canvas.width + arrow.width / 2
  } else if (arrow.y - arrow.height / 2 >= canvas.height) {
    arrow.y = 0 - arrow.height / 2
  } else if (arrow.y + arrow.height / 2 <= 0) {
    arrow.y = canvas.height + arrow.height / 2
  }

  arrow.render(ctx)

  requestAnimationFrame(move)
})()
