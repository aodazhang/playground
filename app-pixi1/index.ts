import './index.scss'
import * as PIXI from 'pixi.js'
import gsap from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'
import config from './base/BaseConfig'
import '@tool/help'
import '@tool/registerServiceWorker'
import { getChild, getStageAdapterSize, loadedLog } from '@tool/pixi'
import { RESOURCE } from './utils'
import StartScene from './scene/startScene'
import MusicScene from './scene/musicScene'
import RuleScene from './scene/ruleScene'
import SelectScene from './scene/selectScene'

/**************************** 插件配置 ****************************/

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

/**************************** 1.应用初始 ****************************/

const { width, height, resolution } = getStageAdapterSize()
const app = new PIXI.Application({
  width, // 舞台宽度
  height, // 舞台长度
  resolution, // dpr适配
  antialias: true, // 是否开启抗锯齿
  forceCanvas: false, // 是否强制canvas渲染
  autoDensity: true, // 是否css尺寸自动调整为舞台尺寸
  transparent: false, // 是否背景透明
  backgroundColor: 0xffbd3e
})
app.stage.sortableChildren = true // 允许子元素进行层级排序
document.querySelector('#app').appendChild(app.view)
config.setApp(app)

/**************************** 2.资源加载 ****************************/

const loader = app.loader.add(RESOURCE, {
  crossOrigin: true // 允许加载跨域资源
})

loader.onProgress.add((loader: PIXI.Loader) => {
  const progressInt = parseInt(`${loader.progress}`)
  const progress = getChild('start/progress', app.stage)
  progress instanceof PIXI.Text && (progress.text = `${progressInt}%`)
  if (progressInt === 100) {
    const button = getChild('start/button', app.stage)
    button instanceof PIXI.Sprite && (button.visible = true)
  }
})

new StartScene()

/**************************** 3.场景启动 ****************************/

loader.load((loader, resources) => {
  loadedLog(loader, resources)
  config.setResources(resources)
  new MusicScene()
  new RuleScene()
  new SelectScene()
})
