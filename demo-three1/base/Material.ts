import { MeshPhongMaterial } from 'three'
import config from '@demo-three1/config'

export default class Material {
  private instance: MeshPhongMaterial = null

  constructor(color = 0xffffff) {
    this.instance = new MeshPhongMaterial({
      color, // 材质颜色
      specular: config.materialSpecularColor,
      shininess: config.materialShininess
    })
  }

  get currentInstance() {
    return this.instance
  }
}
