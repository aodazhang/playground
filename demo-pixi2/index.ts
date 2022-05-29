import 'aoda.css'
import '@tool/help'
import '@tool/registerServiceWorker'
import * as PIXI from 'pixi.js'
import gsap from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'
import { getStageAdapterSize } from '@tool/pixi'
import { assets } from './resource'
import { Monster, monsterFactory, Player, playerFactory } from './sprite'
import { detectionPixiRect } from '@tool/detection'

/**************************** 插件配置 ****************************/

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

/**************************** 1.应用初始 ****************************/

const { width, height, resolution } = getStageAdapterSize(
  window.innerWidth,
  window.innerHeight
)
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

let startScene: PIXI.Container = null
let playScene: PIXI.Container = null
let overScene: PIXI.Container = null
let player: Player = null
let score = 0
let scoreText: PIXI.Text = null
let current: string = null
let timer: NodeJS.Timer = null

loader.load(() => {
  init()
  app.ticker.add(() => {
    if (current !== 'play') {
      return
    }
    playScene.children.forEach(i => {
      if (!['playBg', 'yaoji', 'score'].includes(i.name)) {
        // 碰撞检测
        if (detectionPixiRect(player, i)) {
          changeScene('over')
          return
        }
        ;(i as Monster).walk() // 怪物移动
      }
    })
    player.walk() // 玩家移动
    scoreText.text = `${++score}` // 更新得分
  })
})

window.onbeforeunload = () => {
  clearInterval(timer)
  timer = null
}

function init() {
  /******************** 开始场景 ********************/
  startScene = new PIXI.Container()
  startScene.name = 'start'
  app.stage.addChild(startScene)

  const startBg = new PIXI.Sprite(PIXI.utils.TextureCache['lol-bg'])
  startBg.name = 'startBg'
  startBg.scale.set(width / startBg.width, height / startBg.height)
  startScene.addChild(startBg)

  const startButton = createButton('开始游戏')
  startButton.position.set(24, height / 2)
  startScene.addChild(startButton)
  startButton.on('click', () => {
    changeScene('play')
  })

  animationStart()

  /******************** 游戏场景 ********************/
  playScene = new PIXI.Container()
  playScene.name = 'play'
  app.stage.addChild(playScene)
  playScene.visible = false

  const playBg = new PIXI.Sprite(
    new PIXI.Texture(
      PIXI.utils.TextureCache['2'],
      new PIXI.Rectangle(0, 1080, 1550, 900)
    )
  )
  playBg.name = 'playBg'
  playBg.scale.set(width / playBg.width, height / playBg.height)
  playScene.addChild(playBg)

  score = 0
  scoreText = new PIXI.Text(
    `${score}`,
    new PIXI.TextStyle({
      fill: 'red',
      fontSize: 32
    })
  )
  scoreText.name = 'score'
  scoreText.position.set(width / 2, height / 4)
  playScene.addChild(scoreText)

  player = playerFactory(PIXI.utils.TextureCache['1'])
  player.name = 'yaoji'
  playScene.addChild(player)

  playScene.interactive = true
  playScene.on('click', (e: PIXI.InteractionEvent) => {
    player.goto(e.data.global.x, e.data.global.y)
  })

  /******************** 结束场景 ********************/
  overScene = new PIXI.Container()
  overScene.name = 'over'
  app.stage.addChild(overScene)
  overScene.visible = false

  const playButton = createButton('重新开始')
  playButton.position.set(24, height / 2)
  playButton.on('click', () => {
    changeScene('play')
  })
  overScene.addChild(playButton)

  const overText = new PIXI.Text(
    '加油，再来一次，你是下一个Faker',
    new PIXI.TextStyle({
      fill: 'white',
      fontSize: 32,
      align: 'center'
    })
  )
  overText.position.set(300, height / 2)
  overScene.addChild(overText)
}

/**
 * 场景切换
 * @param sceneName 场景名称
 */
function changeScene(sceneName: string) {
  current = sceneName
  ;[startScene, playScene, overScene].forEach(scene => {
    if (current !== scene.name) {
      scene.visible = false
      return
    }
    scene.visible = true
    if (timer) {
      clearInterval(timer)
      timer = null
    }
    // 游戏场景重置
    playScene.children.forEach(i => {
      if (!['playBg', 'yaoji', 'score'].includes(i.name)) {
        playScene.removeChild(i)
      }
    })
    if (current === 'play') {
      score = 0
      player.reset()
      timer = monsterFactory(
        playScene,
        player,
        1, // 每次生产数量
        800 // 每次生产时间
      )
    }
  })
}

/**************************** 4.工具函数 ****************************/

/**
 * 创建按钮
 * @param text 文本
 * @returns 按钮
 */
function createButton(text: string) {
  const button = new PIXI.Graphics()
  button.lineStyle(2, 0x00, 0.3)
  button.beginFill(0xf5e817)
  button.drawPolygon([0, 0, 180, 0, 150, 48, 0, 48])
  button.endFill()
  button.interactive = true
  button.buttonMode = true

  if (text) {
    const message = new PIXI.Text(
      text,
      new PIXI.TextStyle({ fill: 'black', fontSize: 24 })
    )
    message.position.set(28, 12)
    button.addChild(message)
    button.on('mouseover', () => {
      message.style.fill = 'white'
    })
    button.on('mouseout', () => {
      message.style.fill = 'black'
    })
  }
  return button
}

/**************************** 5.动画函数 ****************************/

/**
 * 开场动画
 */
function animationStart() {
  const radius = 100
  const blurSize = 32
  const circle = new PIXI.Graphics()
  circle.beginFill(0xff0000)
  circle.drawCircle(radius + blurSize, radius + blurSize, radius)
  circle.endFill()
  circle.filters = [new PIXI.filters.BlurFilter(blurSize)]
  const rect = new PIXI.Rectangle(0, 0, width, height)
  const texture = app.renderer.generateTexture(
    circle,
    PIXI.SCALE_MODES.NEAREST,
    1,
    rect
  )
  const focus = new PIXI.Sprite(texture)
  app.stage.addChild(focus)
  const startBg = startScene.getChildByName('startBg')
  startBg.mask = focus
  gsap.to(focus, {
    ease: 'bounce.out',
    duration: 2,
    yoyo: true,
    repeat: -1,
    pixi: { scale: 5 }
  })
}
