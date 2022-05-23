import { WebGLRenderer } from 'three'
import config from '@demo-three1/config'

export default class Renderer {
  private instance: WebGLRenderer = null

  constructor(canvas: HTMLCanvasElement) {
    this.instance = new WebGLRenderer({
      canvas, // 挂载canvas
      antialias: true, // 设置抗锯齿：一般通过硬件能力操作
      preserveDrawingBuffer: true // 开启绘制缓冲区
    })
    this.instance.setClearColor(config.backgroundColor, 1.0) // 渲染器背景色
    this.instance.setSize(config.canvasWidth, config.canvasHeight) // 指定渲染器尺寸
  }

  get currentInstance() {
    return this.instance
  }
}
