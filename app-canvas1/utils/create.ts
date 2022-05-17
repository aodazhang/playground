/**
 * 创建canvas
 * @returns canvas元素和上下文
 */
export function createCanvas(title?: string) {
  const app = document.querySelector('#app')

  if (typeof title === 'string' && title.trim()) {
    const h2 = document.createElement('h2')
    h2.innerText = title.trim()
    app.appendChild(h2)
  }

  const canvas = document.createElement('canvas')
  canvas.width = 500
  canvas.height = 500
  canvas.innerText = '您的浏览器不支持canvas！'
  app.appendChild(canvas)

  const ctx = canvas.getContext('2d')
  ctx.lineCap = 'round'

  // canvas中心点
  const center = { x: canvas.width / 2, y: canvas.width / 2 }

  // html坐标系转换canvas坐标系
  const point = { x: 0, y: 0 }
  canvas.addEventListener('mousemove', e => {
    point.x = e.offsetX
    point.y = e.offsetY
  })

  return { canvas, ctx, center, point }
}
