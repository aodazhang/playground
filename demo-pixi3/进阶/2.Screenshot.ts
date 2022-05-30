import * as PIXI from 'pixi.js'
import { createPixi } from '../utils'

createPixi('进阶-截图Screenshot', app => {
  // 创建容器存放精灵
  const container = new PIXI.Container()
  app.stage.addChild(container)

  for (let i = 0; i < 25; i++) {
    const bunnySprite = new PIXI.Sprite(PIXI.utils.TextureCache['bunny'])
    bunnySprite.position.set((i % 5) * 40, Math.floor(i / 5) * 40)
    container.addChild(bunnySprite)
  }

  container.position.set(app.screen.width / 2, app.screen.height / 2)
  container.pivot.set(container.width / 2, container.height / 2)

  app.ticker.add((delta: number) => {
    container.rotation -= 0.01 * delta
  })

  app.stage.interactive = true
  app.stage.on('click', () => {
    app.renderer.extract.canvas(app.stage).toBlob(b => {
      const a = document.createElement('a')
      document.body.append(a)
      a.download = 'screenshot'
      a.href = URL.createObjectURL(b)
      a.click()
      a.remove()
    }, 'image/png')
  })
})
