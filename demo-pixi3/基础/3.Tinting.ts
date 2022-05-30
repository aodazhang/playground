import * as PIXI from 'pixi.js'
import { createPixi } from '../utils'

createPixi('基础-着色tint', app => {
  const container = new PIXI.Container()
  app.stage.addChild(container)

  for (let i = 0; i < 3; i++) {
    const eggSprite = new PIXI.Sprite(PIXI.utils.TextureCache['eggHead'])
    eggSprite.position.set((i % 5) * 100, Math.floor(i / 5) * 100)
    eggSprite.scale.set(0.5 + Math.random() * 0.5)
    // 精灵随机颜色进行着色
    eggSprite.tint = Math.random() * 0xffffff
    container.addChild(eggSprite)
  }

  container.position.set(app.screen.width / 2, app.screen.height / 2)
  container.pivot.set(container.width / 2, container.height / 2)

  app.ticker.add((delta: number) => {
    container.rotation -= 0.01 * delta
  })
})
