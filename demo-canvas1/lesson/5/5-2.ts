import { Box } from '@demo-canvas1/model'
import { createCanvas, detectionRect } from '@demo-canvas1/utils'
import { randomBetweenNumber, randomRgbColor } from '@tool/random'

const { canvas, ctx } = createCanvas('5-2.[案例]简易俄罗斯方块')

const boxes: Box[] = []
let activeBox: Box = null
let g = 0.02 // 重力加速度

function createBox() {
  const box = new Box({
    x: randomBetweenNumber(50, canvas.width - 50),
    y: 0,
    width: randomBetweenNumber(20, 40),
    height: randomBetweenNumber(20, 45),
    fillStyle: randomRgbColor()
  })
  boxes.length < 20 && boxes.push(box)
  activeBox = box
}
createBox()

// 键盘控制方块左右加速
window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'a':
      activeBox.x -= 5
      break
    case 'd':
      activeBox.x += 5
      break
    case 's':
      g = 0.2
      break
  }
})
window.addEventListener('keyup', () => (g = 0.02))
;(function move() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  activeBox.vy += g
  activeBox.y += activeBox.vy

  // 1.当前活动box是否碰撞canvas底部
  if (activeBox.y + activeBox.height >= canvas.height) {
    activeBox.y = canvas.height - activeBox.height
    createBox()
  }

  boxes.forEach(i => {
    // 2.当前活动box是否碰撞其他box
    if (i !== activeBox && detectionRect(i, activeBox)) {
      activeBox.y = i.y - activeBox.height
      createBox()
    }
    i.render(ctx)
  })
  requestAnimationFrame(move)
})()
