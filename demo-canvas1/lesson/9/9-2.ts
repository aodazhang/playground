import { Ball } from '../../model'
import { createCanvas } from '../../utils'

const { canvas, ctx, center, point } = createCanvas('9-2.模拟3D环境')

let x = 0
let y = 0
let z = 0
const hx = canvas.width / 2 // 消失点x坐标
const hy = canvas.height / 2 // 消失点y坐标
const f1 = 200 // 景深

const ball = new Ball({ x: center.x, y: center.y, radius: 80 })

window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'w':
      z += 5
      break

    case 's':
      z -= 5
      break
  }
})
;(function move() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  x = point.x - hx
  y = point.y - hy

  // 透视图公式
  const scale = f1 / (f1 + z)

  ball.scaleX = scale
  ball.scaleY = scale

  ball.x = hx + x * scale
  ball.y = hy + y * scale

  // 只有f1 + z > 0 时才显示小球
  z > -f1 && ball.render(ctx)

  requestAnimationFrame(move)
})()
