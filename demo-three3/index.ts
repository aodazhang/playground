import './index.scss'
import '@tool/help'
import '@tool/registerServiceWorker'
import {
  AmbientLight,
  AxesHelper,
  Color,
  DirectionalLight,
  EquirectangularReflectionMapping,
  Group,
  MeshPhongMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  Raycaster,
  Scene,
  Sprite,
  SpriteMaterial,
  Texture,
  TextureLoader,
  Vector2,
  WebGLRenderer
} from 'three'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { image, model, textures } from './resource'

/**
 * 创建灯光
 * @returns 灯光实例
 */
function createLight() {
  const ambientLight = new AmbientLight(0x76abe9, 1.2)

  const frontDirLight = new DirectionalLight(0xfce28f, 1)
  frontDirLight.position.set(-5, 3, 5)

  const rightDirLight = new DirectionalLight(0xffffff, 0.8)
  rightDirLight.position.set(5, 3, -5)

  return [ambientLight, frontDirLight, rightDirLight]
}

/**
 * 加载材质贴图
 * _col：普通贴图，用于material.map，替代模型颜色
 * _nor：法线贴图，用于material.normalMap，让模型表面生成高细节，例如凹凸感
 * _occ：环境光遮蔽贴图，用于material.aoMap，用来描述物体之间靠近时的漫反射光纤效果
 * _env：环境反射贴图，用于material.envMap，用于模拟材质反射效果
 * @returns 材质集合
 */
async function loadTexture() {
  const loader = new TextureLoader()
  loader.crossOrigin = 'anonymous'
  const allTexture = { ...image, ...textures }
  const keys = Object.keys(allTexture)
  const tex = await Promise.all(
    keys.map(key => loader.loadAsync(allTexture[key]))
  )
  const ret: { [key: string]: Texture } = {}
  keys.forEach((item, index) => {
    ret[item] = tex[index]
    if (item === 'skymap2') {
      ret[item].mapping = EquirectangularReflectionMapping
    }
  })
  return ret
}

/**
 * 创建模型材质
 * @param gltf 模型对象
 * @param textures 材质对象
 */
function createMaterial(gltf: GLTF, textures: { [key: string]: Texture }) {
  gltf.scene.traverse(child => {
    if (
      ['smart_lungu0', 'smart_lungu1', 'smart_lungu2', 'smart_lungu3'].includes(
        child.name
      )
    ) {
      ;(child as any).material = new MeshStandardMaterial({
        map: textures['lungu_col'],
        normalMap: textures['lungu_nor'],
        aoMap: textures['lungu_occ']
      })
    } else if (
      [
        'smart_chelun0',
        'smart_chelun1',
        'smart_chelun2',
        'smart_chelun3'
      ].includes(child.name)
    ) {
      ;(child as any).material = new MeshStandardMaterial({
        map: textures['luntai_col'],
        normalMap: textures['luntai_nor']
      })
    } else if (child.name === 'smart_boli') {
      ;(child as any).material = new MeshPhongMaterial({
        color: 0x333333,
        transparent: true,
        opacity: 0.2
      })
      // 环境反射贴图
      ;(child as any).material.envMap = textures['skymap2']
      // 环境反射贴图envMap的映射方式：等量矩形投影
      ;(child as any).material.envMap.mapping = EquirectangularReflectionMapping
      // 环境反射贴图强度
      ;(child as any).material.envMapIntensity = 1
    } else if (child.name === 'smart_tianchuang') {
      ;(child as any).material = new MeshPhongMaterial({
        color: 0x000,
        transparent: true,
        opacity: 0.5,
        envMap: textures['skymap2'],
        emissiveIntensity: 1
      })
    } else if (child.name === 'smart_cheshen') {
      ;(child as any).material = new MeshStandardMaterial({
        color: 0xa7802c,
        metalness: 0.4,
        roughness: 0,
        normalMap: textures['cheshen_nor'],
        aoMap: textures['cheshen_occ'],
        envMap: textures['skymap2'],
        envMapIntensity: 1
      })
    } else if (child.name === 'smart_chejia') {
      ;(child as any).material = new MeshStandardMaterial({
        color: 0x252929,
        metalness: 0.44,
        roughness: 0.4,
        normalMap: textures['chejia_nor'],
        aoMap: textures['chejia_occ']
      })
    } else if (child.name === 'smart_shachepan') {
      ;(child as any).material = new MeshStandardMaterial({
        color: 0xf2f2f2,
        emissive: 0x000,
        metalness: 0.5,
        roughness: 0.62,
        map: textures['shache_col'],
        normalMap: textures['shache_nor'],
        aoMap: textures['shache_occ']
      })
    } else if (['smart_neishi', 'smart_neishi2'].includes(child.name)) {
      ;(child as any).material = new MeshPhongMaterial({
        color: 0x333333,
        emissive: 0x000000,
        map: textures['neishi_nor'],
        normalMap: textures['neishi_occ']
      })
    } else if (child.name == 'smart_neibao') {
      ;(child as any).material = new MeshPhongMaterial({
        color: 0x2e2e2e,
        map: textures['mennei_col']
      })
    } else if (child.name == 'smart_linjian') {
      ;(child as any).material = new MeshStandardMaterial({
        color: 0x2e2e2e,
        metalness: 0.5,
        roughness: 0.62,
        map: textures['linjian_col'],
        normalMap: textures['linjian_nor'],
        aoMap: textures['linjian_occ']
      })
    } else if (child.name == 'smart_daochejing') {
      ;(child as any).material = new MeshPhongMaterial({
        color: 0xffffff
      })
    } else if (child.name == 'smart_bolinei') {
      ;(child as any).material = new MeshPhongMaterial({
        color: 0x333333
      })
    } else if (child.name === 'smart_chedengzhao') {
      ;(child as any).material = new MeshPhongMaterial({
        color: 0xffffff,
        emissive: 0x000000,
        transparent: true,
        opacity: 0.3,
        normalMap: textures['chedengzhao_nor'],
        envMap: textures['skymap2'],
        emissiveIntensity: 1
      })
    } else if (child.name === 'smart_shachedengzhao') {
      ;(child as any).material = new MeshPhongMaterial({
        color: 0xca0816,
        transparent: true,
        opacity: 0.8,
        normalMap: textures['chedengzhao_nor']
      })
    } else if (child.name === 'smart_shangeshang') {
      ;(child as any).material = new MeshStandardMaterial({
        color: 0x333333,
        emissive: 0x000000,
        metalness: 1,
        roughness: 0
      })
    } else if (child.name === 'smart_shangexia') {
      ;(child as any).material = new MeshStandardMaterial({
        color: 0x333333,
        metalness: 1,
        roughness: 0
      })
    } else if (['smart_LOGO', 'smart_paiqiguan'].includes(child.name)) {
      ;(child as any).material = new MeshStandardMaterial({
        color: 0x6c6c6c,
        emissive: 0x444444,
        metalness: 1,
        roughness: 0.32
      })
    }
  })
}

function createPoint(
  camera: PerspectiveCamera,
  textures: { [key: string]: Texture }
) {
  const group = new Group()
  const material = new SpriteMaterial({
    map: textures['point'],
    color: 0xffffff,
    fog: false
  })
  ;[
    { x: -1.47, y: 0.87, z: -0.36, frame: 1 },
    { x: -1.46, y: 0.49, z: -0.69, frame: 2 },
    { x: 1.5, y: 0.7, z: 0, frame: 8 },
    { x: 0.33, y: 1.79, z: 0, frame: 3 },
    { x: 0.73, y: 1.38, z: -0.8, frame: 5 },
    { x: -0.1, y: 1.17, z: 0.88, frame: 6 },
    { x: -1.16, y: 0.16, z: 0.89, frame: 7 }
  ].forEach(item => {
    const sprite = new Sprite(material)
    sprite.position.set(item.x, item.y, item.z)
    sprite.scale.set(0.15, 0.15, 1)
    ;(sprite as any).ui_id = item.frame
    group.add(sprite)
  })

  document.body.addEventListener('click', e => {
    e.preventDefault()
    const raycaster = new Raycaster()
    const mouse = new Vector2(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1
    )

    raycaster.setFromCamera(mouse, camera)

    const intersects = raycaster.intersectObjects(group.children)
    if (intersects[0]) {
      console.log('点击了', (intersects[0].object as any).ui_id)
    }
  })

  return group
}

window.onload = async () => {
  const canvas = document.createElement('canvas')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  canvas.innerText = '您的浏览器不支持canvas！'
  document.querySelector('#app').appendChild(canvas)

  // 1.创建场景
  const scene = new Scene()
  const textures = await loadTexture()
  const smart = await new GLTFLoader().loadAsync(model['smart'])
  createMaterial(smart, textures)
  scene.add(smart.scene)
  scene.add(new AxesHelper(3))
  createLight().forEach(i => scene.add(i))

  // 2.创建相机
  const camera = new PerspectiveCamera(
    90,
    canvas.width / canvas.height,
    0.1,
    100
  )
  camera.position.set(1.5, 1, 3) // 设置相机位置

  scene.add(createPoint(camera, textures))

  // 3.创建渲染器
  const renderer = new WebGLRenderer({
    canvas, // 挂载canvas
    antialias: true, // 设置抗锯齿：一般通过硬件能力操作
    preserveDrawingBuffer: true // 开启绘制缓冲区
  })
  renderer.setPixelRatio(window.devicePixelRatio) // 设置dpr
  renderer.setSize(window.innerWidth, window.innerHeight) // 设置渲染器尺寸

  // 4.创建控制器
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.update()

  const section = document.createElement('section')
  ;[
    { title: '原色', color: 0xa7802c },
    { title: '红色', color: 0xc22929 }
  ].forEach(item => {
    const button = document.createElement('button')
    button.innerText = item.title
    button.addEventListener('click', () => {
      ;(scene.getObjectByName('smart_cheshen') as any).material.color =
        new Color(item.color)
    })
    section.appendChild(button)
  })
  document.body.appendChild(section)

  function render() {
    smart.scene.rotation.y += 0.005
    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }
  render()
}
