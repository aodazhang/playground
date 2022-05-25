import './index.scss'
import '@tool/help'
import '@tool/registerServiceWorker'
import {
  AxesHelper,
  EquirectangularReflectionMapping,
  MeshToonMaterial,
  PerspectiveCamera,
  Scene,
  TextureLoader,
  WebGLRenderer
} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { createWebgl } from '@tool/create'
import envImg from './assets/env.jpg'
import bddGltf from './assets/bdd.gltf'

window.onload = () => {
  const { canvas } = createWebgl()

  // 1.创建场景
  const scene = new Scene()
  scene.add(new AxesHelper(100))

  new TextureLoader().load(envImg, texture => {
    new GLTFLoader().load(bddGltf, gltf => {
      gltf.scene.traverse(object => {
        if (['outer', 'mask'].includes(object.name)) {
          ;(object as any).material.envMap = texture
          ;(object as any).material.envMap.mapping =
            EquirectangularReflectionMapping
          ;(object as any).material.envMapIntensity = 2
        } else if (object.name === 'body') {
          const map = (object as any).material.map
          ;(object as any).material = new MeshToonMaterial({ map })
        }
      })

      scene.add(gltf.scene)
      renderer.render(scene, camera)
    })
  })

  // 2.创建相机
  const camera = new PerspectiveCamera(
    45,
    canvas.width / canvas.height,
    0.25,
    100
  )
  camera.position.set(2, 2, 2) // 设置相机位置

  // 3.创建渲染器
  const renderer = new WebGLRenderer({
    canvas, // 挂载canvas
    antialias: true, // 设置抗锯齿：一般通过硬件能力操作
    preserveDrawingBuffer: true // 开启绘制缓冲区
  })
  renderer.setPixelRatio(window.devicePixelRatio) // 设置dpr
  renderer.setSize(canvas.width, canvas.height) // 设置渲染器尺寸

  // 4.创建控制器
  const controls = new OrbitControls(camera, canvas)
  controls.addEventListener('change', () => renderer.render(scene, camera))
  controls.update()

  renderer.render(scene, camera) // 执行渲染
}
