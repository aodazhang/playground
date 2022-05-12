/**
 * @description 场景-规则
 * @author aodazhang 2022.05.12
 */
import * as PIXI from 'pixi.js'
import BaseScene from '../base/BaseScene'

export default class RuleScene extends BaseScene {
  /** 规则标题 */
  private title: PIXI.Sprite = null
  /** 规则内容 */
  private rule: PIXI.Sprite = null
  /** 确认按钮 */
  private button: PIXI.Sprite = null

  constructor() {
    super('rule')
    this.initScene()
    this.initParam()
    this.initEvent()
  }

  override initScene(): void {
    this.title = new PIXI.Sprite(PIXI.utils.TextureCache['p2_01'])
    this.title.anchor.set(0.5)
    this.title.scale.set(0.5)
    this.title.position.set(this.config.screenCenterX, 100)

    this.rule = new PIXI.Sprite(PIXI.utils.TextureCache['p2_02'])
    this.rule.anchor.set(0.5)
    this.rule.scale.set(0.5)
    this.rule.position.set(
      this.config.screenCenterX,
      this.title.y + this.rule.height / 2
    )

    this.button = new PIXI.Sprite(PIXI.utils.TextureCache['p2_03'])
    this.button.anchor.set(0.5)
    this.button.scale.set(0.5)
    this.button.position.set(
      this.config.screenCenterX,
      this.config.screenHeight - 100
    )

    this.addChild(this.title, this.rule, this.button)
  }

  override initParam(): void {
    this.visible = false // 场景默认隐藏
  }

  override initEvent(): void {
    // 1.点击进入选车页
    this.button.interactive = true
    this.button.buttonMode = true
    this.button.on('pointertap', () => {
      this.destroy()
      this.getChild('select').visible = true
    })
  }
}
