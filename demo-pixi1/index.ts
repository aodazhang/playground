import 'aoda.css'
import '@tool/help'
import '@tool/registerServiceWorker'
import * as PIXI from 'pixi.js'
// @ts-ignore
import PhyTouch from 'phy-touch'
import gsap from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'
import { getStageAdapterSize } from '@tool/pixi'
import { soundMuteAll, soundPlay, soundVolumeAll } from '@tool/sound'
import { assets } from './resource'
import sprite from './sprite'

/**************************** 插件配置 ****************************/

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

const timeLine = gsap.timeline({ paused: true })

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
  backgroundColor: 0x000
})
document.querySelector('#app').appendChild(app.view)

/**************************** 2.资源加载 ****************************/

// 1.建立加载loader
const loader = app.loader.add(assets, {
  crossOrigin: true // 允许加载跨域资源
})

// 2.监控加载百分比
const progress = new PIXI.Text(
  '0%',
  new PIXI.TextStyle({ fontSize: 16, fill: 0xffffff })
)
progress.anchor.set(0.5)
progress.position.set(app.screen.width / 2, app.screen.height / 2)
app.stage.addChild(progress)
loader.onProgress.add((loader: PIXI.Loader) => {
  const percentage = loader.progress.toFixed(2)
  if (percentage === '100.00') {
    app.stage.removeChild(progress)
  } else {
    progress.text = `${percentage}%`
  }
})

/**************************** 3.场景启动 ****************************/

loader.load(() => {
  // 背景
  const backgroundContainer = new PIXI.Container()
  backgroundContainer.name = 'background'
  backgroundContainer.position.set(0, 0)
  app.stage.addChild(backgroundContainer)

  // 主场景
  const sceneContainer = new PIXI.Container()
  sceneContainer.name = 'scene'
  sceneContainer.position.set(0, 0)
  app.stage.addChild(sceneContainer)

  // 场景1
  const scene1 = new PIXI.Container()
  scene1.name = 'scene1'
  scene1.position.set(1784, 621)
  scene1.pivot.set(1784, 621)
  sceneContainer.addChild(scene1)

  // 场景2
  const scene2 = new PIXI.Container()
  scene2.name = 'scene2'
  scene2.position.set(1773, 0)
  scene2.alpha = 0
  sceneContainer.addChild(scene2)

  // 场景3
  const scene3 = new PIXI.Container()
  scene3.name = 'scene3'
  scene3.position.set(4960, 0)
  sceneContainer.addChild(scene3)

  // 场景4
  const scene4 = new PIXI.Container()
  scene4.name = 'scene4'
  scene4.position.set(7902, 0)
  sceneContainer.addChild(scene4)

  // 结束页
  const endContainer = new PIXI.Container()
  endContainer.name = 'end'
  endContainer.position.set(-203, 0)
  app.stage.addChild(endContainer)

  // 加载精灵
  sprite.forEach(item => addSpriteToContainer(item))
  // 创建滑动
  createTouch()
  // 创建动画
  createTimeLineAnimate()
  // 创建声音
  createPixiSound()
})

/** 添加精灵到指定容器 */
function addSpriteToContainer(obj: {
  name: string
  targetContainer: string
  x: number
  y: number
  alpha?: number
}): void {
  const { name, targetContainer, x = 0, y = 0, alpha = 1 } = obj
  if (!name || !targetContainer) {
    return
  }
  const sprite = new PIXI.Sprite(PIXI.utils.TextureCache[name])
  sprite.name = name
  sprite.position.set(x, y)
  sprite.alpha = alpha
  getChild(targetContainer).addChild(sprite)
}

// 获取指定子容器
function getChild(containerNames: string): PIXI.Container | PIXI.Sprite {
  let container = app.stage
  containerNames.split('/').forEach(containerName => {
    container = container.getChildByName(containerName) as
      | PIXI.Container
      | PIXI.Sprite
  })
  return container
}

/**************************** 2.识别用户滑动 ****************************/

const min = -(10800 - 750) // 场景滚动距离
function createTouch() {
  new PhyTouch({
    vertical: true, // 监听竖向滚动
    touch: 'body', // 反馈触摸的dom
    min, // 运动属性的最小值
    max: 0, // 滚动属性的最大值
    maxSpeed: 0.8, // 最大滚动速度
    value: 0, // 初始值0
    change: (value: number) => {
      if (value < min || value > 0) {
        return
      }
      const process = value / min
      timeLine.seek(process)
      createFrameAnimate(process)
      createSound(process)
    }
  })
}

/**************************** 3.时间轴动画 ****************************/

function createTimeLineAnimate() {
  // 1.场景滑动
  const scence = getChild('scene')
  const scenceTween = gsap.to(scence, {
    duration: 1,
    pixi: { positionX: min }
  })
  timeLine.add(scenceTween, 0)

  // 2.星星显现
  const p1Star = getChild('scene/scene1/p1-star')
  const p1StarDelay = -15 / min
  const p1StarDuration = -50 / min
  const p1StarTween = gsap.to(p1Star, {
    duration: p1StarDuration,
    pixi: { alpha: 1 }
  })
  timeLine.add(p1StarTween, p1StarDelay)

  // 3.房子放大
  const scene1 = getChild('scene/scene1')
  const scene1Delay = -600 / min
  const scene1Duration = -200 / min
  const scene1Tween = gsap.to(scene1, {
    duration: scene1Duration,
    pixi: {
      scaleX: 3,
      scaleY: 3,
      alpha: 0
    }
  })
  timeLine.add(scene1Tween, scene1Delay)

  // 4.场景2渐入
  const scene2 = getChild('scene/scene2')
  const scene2Delay = -680 / min
  const scene2Duration = -100 / min
  const scene2Tween = gsap.to(scene2, {
    duration: scene2Duration,
    pixi: { alpha: 1 }
  })
  timeLine.add(scene2Tween, scene2Delay)

  // 5.音符飘动
  const p2Yinfu = getChild('scene/scene2/p2-yinfu')
  const p2YinfuDelay = -2450 / min
  const p2YinfuDuration = -200 / min
  const p2YinfuTween = gsap.to(p2Yinfu, {
    duration: p2YinfuDuration,
    pixi: {
      positionX: 3400,
      positionY: 300,
      alpha: 0
    }
  })
  timeLine.add(p2YinfuTween, p2YinfuDelay)

  // // 6.黑夜缩小为窗户
  const p32 = getChild('scene/scene3/p3-2')
  const p32Delay = -2580 / min
  const p32Duration = -800 / min
  const p32Tween = gsap.from(p32, {
    duration: p32Duration,
    pixi: {
      positionX: 0,
      positionY: -20,
      scaleX: 5,
      scaleY: 5
    }
  })
  timeLine.add(p32Tween, p32Delay)

  // 7.工作中男孩出现
  const p31 = getChild('scene/scene3/p3-1')
  const p31Delay = -2780 / min
  const p31Duration = -400 / min
  const p31Tween1 = gsap.to(p31, {
    duration: p31Duration,
    pixi: { alpha: 1 }
  })
  timeLine.add(p31Tween1, p31Delay)

  // 8.漩涡动画出现
  const x1 = getChild('end/x1')
  const x1Delay = -6613 / min
  const x1Duration = -50 / min
  const x1Tween1 = gsap.to(x1, {
    duration: x1Duration,
    pixi: { alpha: 1 }
  })
  timeLine.add(x1Tween1, x1Delay)
}

/**************************** 4.序列帧动画 ****************************/

// 序列帧的本质就是更换对应精灵的材质
function createFrameAnimate(process: number) {
  // 1.孩子蹒跚学步
  const w1Delay = -900 / min
  const w1Duration = -1300 / min
  if (process >= w1Delay) {
    const images = ['w1', 'w5', 'w10', 'w20', 'w25', 'w30', 'w34']
    // 计算当前图片index
    const index = Math.floor(((process - w1Delay) / w1Duration) * images.length)
    if (index < images.length && index > -1) {
      const scene2W1 = getChild('scene/scene2/w1') as PIXI.Sprite
      scene2W1.texture = PIXI.utils.TextureCache[images[index]]
    }
  }

  // 2.漩涡出现文字
  const x1Delay = -6613 / min
  const x1Duration = -1000 / min
  if (process >= x1Delay) {
    const images = [
      'x1',
      'x5',
      'x10',
      'x20',
      'x25',
      'x30',
      'x35',
      'x40',
      'x45',
      'x50',
      'x52'
    ]
    // 计算当前图片index
    const index = Math.floor(((process - x1Delay) / x1Duration) * images.length)
    if (index < images.length && index > -1) {
      const endX1 = getChild('end/x1') as PIXI.Sprite
      endX1.texture = PIXI.utils.TextureCache[images[index]]
    }
  }
}

/**************************** 5.音频处理 ****************************/

let isPlay = true
function createPixiSound() {
  // 1.背景音乐
  soundPlay('music', true)
  soundVolumeAll(0.1)
  // 2.音乐按钮
  const music = new PIXI.Sprite(PIXI.utils.TextureCache['musicon'])
  music.position.set(app.screen.width - 25, 25)
  music.anchor.set(0.5)
  music.scale.set(0.25)
  app.stage.addChild(music)
  // 3.音乐按钮交互
  music.interactive = true
  music.buttonMode = true
  music.on('pointertap', () => {
    isPlay = !isPlay
    music.texture = PIXI.utils.TextureCache[isPlay ? 'musicon' : 'musicoff']
    soundMuteAll()
  })
}

// 根据进度播放声音
function createSound(process: number) {
  if (process.toFixed(2) === (-40 / min).toFixed(2)) {
    // 出生时叮
    soundPlay('ding')
  }
  if (process.toFixed(2) === (-2000 / min).toFixed(2)) {
    // 乐队欢呼
    soundPlay('huanhu')
  }
}
