import * as PIXI from 'pixi.js'
import { createPixi } from '../utils'

createPixi('基础-粒子容器ParticleContainer', app => {
  // 设置粒子容器
  const container = new PIXI.ParticleContainer(
    10000, // 最大精灵容量
    {
      position: true, // 是否位移
      rotation: true, // 是否旋转
      uvs: true
    }
  )
  app.stage.addChild(container)

  for (let i = 0; i < 30; i++) {
    const bunnySprite = new PIXI.Sprite(PIXI.utils.TextureCache['bunny'])
    bunnySprite.anchor.set(0.5)
    bunnySprite.position.set(
      Math.random() * app.screen.width,
      Math.random() * app.screen.height
    )
    bunnySprite.scale.set(0.5 + Math.random() * 0.5)
    bunnySprite.tint = Math.random() * 0xffffff
    container.addChild(bunnySprite)
  }

  app.ticker.add((delta: number) => {
    container.children.forEach(item => {
      item.position.set(
        (item.x += Math.random() * 0.3),
        (item.y += Math.random() * 0.3)
      )
      item.rotation += Math.random() * 0.3 * delta
    })
  })
})
