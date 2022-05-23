import { AxesHelper, Mesh, Scene } from 'three'
import Light from './Light'

export default class BaseScene {
  private instance: Scene = null

  constructor(meshs: Mesh[]) {
    const ambientLight = new Light('AmbientLight') // 实例化环境光
    const directionalLight = new Light('DirectionalLight') // 实例化平行光

    this.instance = new Scene() // 实例化场景
    this.instance.add(ambientLight.currentInstance) // 添加环境光到场景中
    this.instance.add(directionalLight.currentInstance) // 添加平行光到场景中
    Array.isArray(meshs) &&
      meshs.forEach(mesh => {
        this.instance.add(mesh) // 添加网格到场景中
      })
    this.instance.add(new AxesHelper(200)) // 添加辅助轴线到场景中
  }

  get currentInstance() {
    return this.instance
  }
}
