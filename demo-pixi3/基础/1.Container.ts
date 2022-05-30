import * as PIXI from 'pixi.js'
import { createPixi } from '../utils'

createPixi('基础-容器Container', app => {
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
})
