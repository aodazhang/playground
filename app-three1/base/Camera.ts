import { OrthographicCamera, PerspectiveCamera } from 'three'
import config from '@app-three1/config'

export default class Camera {
  private instance: OrthographicCamera | PerspectiveCamera = null

  constructor(type: 'OrthographicCamera' | 'PerspectiveCamera') {
    switch (type) {
      // 正交相机
      case 'OrthographicCamera':
        this.instance = new OrthographicCamera(
          -config.canvasWidth / 2,
          config.canvasWidth / 2,
          config.canvasHeight / 2,
          -config.canvasHeight / 2,
          0,
          2000
        )
        break

      // 透视相机
      case 'PerspectiveCamera':
        this.instance = new PerspectiveCamera(45, config.canvasAspect, 0, 2000)
        break
    }
    this.instance.position.set(200, 175, 200) // 相机位置
    this.instance.lookAt(0, 0, 0) // 相机焦点
  }

  get currentInstance() {
    return this.instance
  }
}
