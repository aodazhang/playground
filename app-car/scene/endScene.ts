/**
 * @description 场景-结束
 * @author aodazhang 2022.05.12
 */
import * as PIXI from 'pixi.js'
import BaseScene from '../base/BaseScene'
import GameScene from './gameScene'
import store from '../store'

export default class EndScene extends BaseScene {
  /** 游戏数据 */
  private store = store
  /** 结束标题 */
  private title: PIXI.Sprite = null
  /** 汽车类型 */
  private text1: PIXI.Text = null
  /** 得分 */
  private text2: PIXI.Text = null
  /** 分 */
  private text3: PIXI.Text = null
  /** 光辉 */
  private light: PIXI.Sprite = null
  /** 汽车 */
  private car: PIXI.Sprite = null
  /** 再来一局 */
  private button: PIXI.Sprite = null

  constructor() {
    super('end')
    this.initScene()
    this.initEvent()
    this.initTicker()
  }

  override initScene(): void {
    this.title = new PIXI.Sprite(PIXI.utils.TextureCache['p5_01'])
    this.title.anchor.set(0.5)
    this.title.scale.set(0.5)
    this.title.position.set(this.config.screenCenterX, 100)

    this.text1 = new PIXI.Text(
      `本局游戏中，您用${
        (this.store.carMap as { [key: string]: string })[this.store.selectCar]
      }汽车获得`,
      new PIXI.TextStyle({
        fontFamily: 'zkkl',
        fontSize: 20,
        fill: 0x000000
      })
    )
    this.text1.anchor.set(0.5)
    this.text1.position.set(this.config.screenCenterX, this.title.y + 50)

    this.text2 = new PIXI.Text(
      `${this.store.score}`,
      new PIXI.TextStyle({
        fontFamily: 'zkkl',
        fontSize: 35,
        fill: 0xff1a1a,
        fontWeight: 'bold',
        dropShadow: true, // 是否投影
        dropShadowColor: '#cc9732', // 投影色
        dropShadowBlur: 0, // 投影模糊
        dropShadowAngle: Math.PI / 6, // 投影角度
        dropShadowDistance: 6 // 投影偏移
      })
    )
    this.text2.anchor.set(0.5)
    this.text2.position.set(this.config.screenCenterX, this.text1.y + 50)

    this.text3 = new PIXI.Text(
      '分',
      new PIXI.TextStyle({
        fill: 0x000000,
        fontFamily: 'zkkl',
        fontSize: 35,
        fontWeight: 'bold',
        dropShadow: true,
        dropShadowColor: '#cc9732',
        dropShadowBlur: 0,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6
      })
    )
    this.text3.anchor.set(0.5)
    this.text3.position.set(
      this.text2.x + this.text2.width / 2 + 30,
      this.text2.y
    )

    this.light = new PIXI.Sprite(PIXI.utils.TextureCache['p5_03'])
    this.light.anchor.set(0.5)
    this.light.scale.set(0.5)
    this.light.position.set(
      this.config.screenCenterX,
      this.config.screenCenterY + 40
    )
    this.light.rotation = 0

    this.car = new PIXI.Sprite(
      PIXI.utils.TextureCache[`p5_${this.store.selectCar}_car`]
    )
    this.car.anchor.set(0.5)
    this.car.position.set(this.light.x, this.light.y)
    this.car.scale.set(0.5)

    this.button = new PIXI.Sprite(PIXI.utils.TextureCache['p5_02'])
    this.button.anchor.set(0.5)
    this.button.scale.set(0.5)
    this.button.position.set(
      this.config.screenCenterX,
      this.config.screenHeight - 100
    )

    this.addChild(
      this.title,
      this.text1,
      this.text2,
      this.text3,
      this.light,
      this.car,
      this.button
    )
  }

  override initEvent(): void {
    // 1.点击再来一局
    this.button.interactive = true
    this.button.buttonMode = true
    this.button.on('pointertap', () => {
      this.destroy()
      new GameScene()
    })
  }

  override initTicker(): void {
    this.bindingTicker(() => {
      this.light.rotation += 0.05 // 光辉旋转
    })
  }
}
