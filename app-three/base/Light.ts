import { AmbientLight, DirectionalLight } from 'three'
import config from '@app-three/config'

export default class Light {
  private instance: AmbientLight | DirectionalLight = null

  constructor(type: 'AmbientLight' | 'DirectionalLight') {
    switch (type) {
      // 环境光
      case 'AmbientLight':
        this.instance = new AmbientLight(
          config.ambientColor,
          config.ambientIntensity
        )
        break

      // 方向光
      case 'DirectionalLight':
        this.instance = new DirectionalLight(
          config.directionalColor,
          config.directionalIntensity
        )
        this.instance.position.set(350, 500, 0)
        break
    }
  }

  get currentInstance() {
    return this.instance
  }
}
