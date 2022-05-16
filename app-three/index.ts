import 'aoda.css'
import '@tool/help'
import '@tool/registerServiceWorker'
import { Mesh, Vector3 } from 'three'
import Camera from './base/Camera'
import Renderer from './base/Renderer'
import BaseScene from './base/Scene'
import config from './config'
import MeshBox from './mesh/MeshBox'
import { animation } from './amimation'

function createMeshBoxs(count: number) {
  // 矩阵宽度
  const length = config.boxSize * count + config.boxInsert * (count - 1)
  const firstVec3 = new Vector3(
    -length / 2 + config.boxSize / 2,
    0,
    -length / 2 + config.boxSize / 2
  )
  const meshBoxs: Mesh[] = []
  for (let i = 0; i < count; i++) {
    // z轴参数
    const x = firstVec3.x
    const y = firstVec3.y
    const z = firstVec3.z + (config.boxSize + config.boxInsert) * i
    for (let j = 0; j < count; j++) {
      // x轴参数
      const vec3 = new Vector3(
        x + (config.boxSize + config.boxInsert) * j,
        y,
        z
      )
      const color = config.materialColors[i * count + j] || 0xffffff
      meshBoxs.push(new MeshBox(vec3, color).currentInstance)
    }
  }
  return meshBoxs
}

window.onload = () => {
  const canvas = document.createElement('canvas')
  canvas.width = config.canvasWidth
  canvas.height = config.canvasHeight
  document.querySelector('#app').appendChild(canvas)

  const meshBoxs = createMeshBoxs(4)
  const scene = new BaseScene(meshBoxs).currentInstance
  const renderer = new Renderer(canvas).currentInstance
  const camera = new Camera('OrthographicCamera').currentInstance

  animation(meshBoxs, () => renderer.render(scene, camera))
}
