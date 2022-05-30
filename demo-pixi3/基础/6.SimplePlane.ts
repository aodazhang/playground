import * as PIXI from 'pixi.js'
import { createPixi } from '../utils'

createPixi('基础-基础平面', app => {
  // 1.构建简单平面
  const plane = new PIXI.SimplePlane(
    PIXI.utils.TextureCache['bg_grass'],
    20, // x轴顶点数
    10 // y轴顶点数
  )
  plane.width = 400
  plane.height = 400
  app.stage.addChild(plane)
  // 2.读取简单平面的顶点位移数据
  const buffer = plane.geometry.getBuffer('aVertexPosition')

  app.ticker.add(() => {
    // 3.动态更改顶点位移数据
    for (let i = 0; i < buffer.data.length; i++) {
      buffer.data[i] += Math.random() - 0.5
    }
    buffer.update()
  })
})
