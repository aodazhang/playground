import * as PIXI from 'pixi.js'
import { createPixi } from '../utils'

createPixi('基础-混合模式', app => {
  const container = new PIXI.Container()
  app.stage.addChild(container)

  const bgSprite = new PIXI.Sprite(PIXI.utils.TextureCache['bg_rotate'])
  bgSprite.name = 'bg'
  bgSprite.width = app.screen.width
  bgSprite.height = app.screen.height
  container.addChild(bgSprite)

  for (let i = 0; i < 30; i++) {
    const bunnySprite = new PIXI.Sprite(PIXI.utils.TextureCache['bunny'])
    bunnySprite.anchor.set(0.5)
    bunnySprite.position.set(
      Math.random() * app.screen.width,
      Math.random() * app.screen.height
    )
    bunnySprite.scale.set(1 + Math.random() * 1)
    bunnySprite.tint = Math.random() * 0xffffff
    // 设置精灵和背景图混合模式：叠加
    bunnySprite.blendMode = PIXI.BLEND_MODES.ADD
    container.addChild(bunnySprite)
  }

  app.ticker.add((delta: number) => {
    container.children.forEach(item => {
      if (item.name === 'bg') {
        return
      }
      item.rotation += Math.random() * 0.1 * delta
    })
  })
})
