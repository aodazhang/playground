import { BoxGeometry, Mesh, Vector3 } from 'three'
import config from '@demo-three1/config'
import Material from '@demo-three1/base/Material'

export default class MeshBox {
  private instance: Mesh = null

  constructor(vec3: Vector3, color: number) {
    const material = new Material(color).currentInstance // 实例化材质
    const geometry = new BoxGeometry(
      config.boxSize,
      config.boxSize,
      config.boxSize
    ) // 实例化几何体
    this.instance = new Mesh(geometry, material) // 实例化网格
    this.instance.position.set(vec3.x, vec3.y, vec3.z) // 设置网格位置
  }

  get currentInstance() {
    return this.instance
  }
}
