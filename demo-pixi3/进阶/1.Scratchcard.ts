import * as PIXI from 'pixi.js'
import { createPixi } from '../utils'

createPixi('进阶-刮刮卡Scratchcard', app => {
  // 遮盖精灵
  const bgSprite = new PIXI.Sprite(PIXI.utils.TextureCache['bg_grass'])
  bgSprite.width = app.screen.width
  bgSprite.height = app.screen.height
  app.stage.addChild(bgSprite)

  // 真实精灵
  const realSprite = new PIXI.Sprite(PIXI.utils.TextureCache['bg_rotate'])
  realSprite.width = app.screen.width
  realSprite.height = app.screen.height
  app.stage.addChild(realSprite)

  // 1.创建渲染材质
  const renderTexture = PIXI.RenderTexture.create({
    width: app.screen.width,
    height: app.screen.height
  })
  // 2.通过渲染材质创建渲染材质精灵
  const renderTextureSprite = new PIXI.Sprite(renderTexture)
  app.stage.addChild(renderTextureSprite)
  // 3.设置真实背景遮罩未渲染材质精灵
  realSprite.mask = renderTextureSprite

  // 笔刷
  const brush = new PIXI.Graphics()
  brush.beginFill(0xffffff)
  brush.drawCircle(0, 0, 50)
  brush.endFill()

  app.stage.interactive = true
  let dragging = false
  app.stage
    .on('pointerdown', (event: PIXI.InteractionEvent) => {
      dragging = true
      // 复制当前鼠标位移坐标
      brush.position.copyFrom(event.data.global)
      // 渲染当前笔刷材质
      app.renderer.render(brush, renderTexture, false, null, false)
    })
    .on('pointerup', () => {
      dragging = false
    })
    .on('pointermove', (event: PIXI.InteractionEvent) => {
      if (!dragging) {
        return
      }
      brush.position.copyFrom(event.data.global)
      app.renderer.render(brush, renderTexture, false, null, false)
    })
})
