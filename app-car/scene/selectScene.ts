/**
 * @description 场景-选车
 * @author aodazhang 2022.05.12
 */
import * as PIXI from 'pixi.js'
import BaseScene from '../base/BaseScene'
import GameScene from './gameScene'
import store from '../store'

export default class SelectScene extends BaseScene {
  /** 游戏数据 */
  private store = store
  /** 选择标题 */
  private title: PIXI.Sprite = null
  /** 汽车容器 */
  private carContainer: PIXI.Container = null
  /** 汽车箭头 */
  private arrow: PIXI.Sprite = null
  /** 确认按钮 */
  private button: PIXI.Sprite = null

  constructor() {
    super('select')
    this.initScene()
    this.initParam()
    this.initEvent()
  }

  override initScene(): void {
    this.title = new PIXI.Sprite(PIXI.utils.TextureCache['p3_01'])
    this.title.anchor.set(0.5)
    this.title.scale.set(0.5)
    this.title.position.set(this.config.screenCenterX, 100)

    this.carContainer = new PIXI.Container()
    this.carContainer.name = 'car'
    this.carContainer.position.set(0, this.title.y + 150)

    // 汽车选项
    ;['yellow', 'white', 'red', 'black'].forEach((item, index) => {
      const car = new PIXI.Sprite(PIXI.utils.TextureCache[`p3_${item}_car`])
      car.name = item
      car.anchor.set(0.5)
      car.scale.set(0.5)
      car.position.set(
        this.config.screenWidth / 3 +
          (index % 2) * (this.config.screenWidth / 3),
        Math.floor(index / 2) * (car.height + 50)
      )
      this.carContainer.addChild(car)
    })

    this.arrow = new PIXI.Sprite(PIXI.utils.TextureCache['p3_02'])
    this.arrow.anchor.set(0.5)
    this.arrow.scale.set(0.5)
    this.carContainer.addChild(this.arrow)

    this.button = new PIXI.Sprite(PIXI.utils.TextureCache['p3_04'])
    this.button.anchor.set(0.5)
    this.button.scale.set(0.5)
    this.button.position.set(
      this.config.screenWidth / 2,
      this.config.screenHeight - 100
    )

    this.addChild(this.title, this.carContainer, this.button)
  }

  override initParam(): void {
    this.visible = false // 场景默认隐藏
    this.onClickSelectCar(this.store.selectCar) // 默认选择汽车类型
  }

  override initEvent(): void {
    // 1.点击选择汽车类型
    this.carContainer.children.forEach(car => {
      car.interactive = true
      car.buttonMode = true
      car.on('pointertap', () => this.onClickSelectCar(car.name))
    })

    // 2.点击开始游戏
    this.button.interactive = true
    this.button.buttonMode = true
    this.button.on('pointertap', () => {
      this.visible = false
      new GameScene()
    })
  }

  /**
   * 选择汽车类型
   * @param name 汽车精灵名称
   * @returns 无
   */
  private onClickSelectCar(name: string): void {
    this.store.selectCar = name
    const selectCar = this.getChild(`select/car/${name}`)
    this.arrow.position.set(selectCar.x, selectCar.y - 90)
  }
}
