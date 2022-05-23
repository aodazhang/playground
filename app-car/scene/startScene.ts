/**
 * @description 场景-启动
 * @author aodazhang 2022.05.12
 * @see 启动场景加载早于app.loader.load回调函数，因此无法读取PIXI.utils.TextureCache中的缓存材质，所以这里使用的资源应该放在public目录下并采用PIXI.Sprite.from直接加载材质
 */
import * as PIXI from 'pixi.js'
import BaseScene from '../base/BaseScene'

export default class StartScene extends BaseScene {
  /** 游戏标题 */
  private title: PIXI.Sprite = null
  /** 加载文字 */
  private progress: PIXI.Text = null
  /** 开始游戏 */
  private button: PIXI.Sprite = null
  /** 赛道背景 */
  private road: PIXI.Sprite = null
  /** 汽车背景 */
  private car: PIXI.Sprite = null

  constructor() {
    super('start')
    this.initScene()
    this.initParam()
    this.initEvent()
  }

  override initScene(): void {
    this.title = PIXI.Sprite.from('./image/p1_01.png')
    this.title.anchor.set(0.5)
    this.title.scale.set(0.5)
    this.title.position.set(this.config.screenCenterX, 100)

    this.progress = new PIXI.Text(
      '0%',
      new PIXI.TextStyle({
        fontFamily: 'zkkl',
        fontSize: 18,
        fill: 0xffffff
      })
    )
    this.progress.name = 'progress'
    this.progress.anchor.set(0.5)
    this.progress.position.set(this.config.screenCenterX, this.title.y + 50)

    this.button = PIXI.Sprite.from('./image/p1_02.png')
    this.button.name = 'button'
    this.button.anchor.set(0.5)
    this.button.scale.set(0.5)
    this.button.position.set(
      this.config.screenCenterX,
      this.config.screenHeight - 100
    )

    this.road = PIXI.Sprite.from('./image/p1_03.png')
    this.road.anchor.set(0.5)
    this.road.scale.set(0.5)
    this.road.position.set(
      this.config.screenCenterX,
      this.config.screenHeight / 2
    )

    this.car = PIXI.Sprite.from('./image/p1_04.png')
    this.car.anchor.set(0.5)
    this.car.position.set(this.config.screenCenterX, this.config.screenCenterY)
    this.car.scale.set(0.5)

    this.addChild(this.title, this.progress, this.button, this.road, this.car)
  }

  override initParam(): void {
    this.button.visible = false // 开始游戏按钮默认隐藏
  }

  override initEvent(): void {
    // 1.点击进入规则页
    this.button.interactive = true
    this.button.buttonMode = true
    this.button.on('pointertap', () => {
      this.destroy()
      this.getChild('rule').visible = true
    })
  }
}
