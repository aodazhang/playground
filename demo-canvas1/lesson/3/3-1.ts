import { randomRgbColor } from '@tool/random'
import { Ball } from '../../model'
import { createCanvas } from '../../utils'

const { canvas, ctx, center, point } = createCanvas('3-1.与鼠标交互')

const ball = new Ball({ x: center.x, y: center.y, radius: 100 })
const fillStyle = randomRgbColor()

;(function move() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 判断鼠标是否在小球内
  ball.fillStyle = ball.isPoint(point) ? fillStyle : `rgb(57, 119, 224)`

  ball.render(ctx)
  requestAnimationFrame(move)
})()
