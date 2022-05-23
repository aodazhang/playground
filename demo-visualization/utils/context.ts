export function getCanvasCtx() {
  const canvas = document.createElement('canvas')
  canvas.className = 'test-canvas'
  canvas.width = 512
  canvas.height = 512
  canvas.style.border = '1px solid #ccc'
  canvas.innerText = '您的浏览器不支持canvas'
  document.body.appendChild(canvas)

  const ctx = canvas.getContext('2d')
  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.scale(1, -1)
  ctx.lineCap = 'round'

  return { ctx, canvas }
}

export function getWebglCtx() {
  const webgl = document.createElement('canvas')
  webgl.className = 'test-webgl'
  webgl.width = 512
  webgl.height = 512
  webgl.style.border = '1px solid #ccc'
  webgl.innerText = '您的浏览器不支持canvas'
  document.body.appendChild(webgl)

  const ctx = webgl.getContext('webgl')

  return { ctx, webgl }
}
