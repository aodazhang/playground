/**
 * @description 场景-游戏
 * @author aodazhang 2022.05.12
 */
import * as PIXI from 'pixi.js'
import BaseScene from '../base/BaseScene'
import { isAABBRectHit } from '@tool/aabb'
import { randomArrayNumber, randomBetweenNumber } from '@tool/random'
import { soundPlay } from '@tool/sound'
import { Z_INDEX } from '../utils'
import EndScene from './endScene'
import store from '../store'

export default class GameScene extends BaseScene {
  /** 游戏数据 */
  private store = store
  /** 计分板标题 */
  private scoreTitle: PIXI.Sprite = null
  /** 计分板分数 */
  private scoreContent: PIXI.Text = null
  /** 计分板容器 */
  private scoreContainer: PIXI.Container = null
  /** 赛道 */
  private lane: PIXI.TilingSprite = null
  /** 障碍物容器 */
  private barrierContainer: PIXI.Container = null
  /** 汽车 */
  private car: PIXI.Sprite = null
  /** 操作区容器 */
  private controlContainer: PIXI.Container = null

  /** 是否位移应急车道 */
  private isEmergencyLane = false
  /** 是否加速 */
  private isMax = false
  /** 赛道12等分宽度 */
  private lanePartWidth = 0

  constructor() {
    super('game', true)
    this.initScene()
    this.initParam()
    this.initEvent()
    this.initTicker()
  }

  override initScene(): void {
    this.scoreTitle = new PIXI.Text(
      '总得分:',
      new PIXI.TextStyle({
        fontFamily: 'zkkl',
        fontSize: 16
      })
    )
    this.scoreTitle.position.set(0, 0)

    this.scoreContent = new PIXI.Text(
      '0',
      new PIXI.TextStyle({
        fontFamily: 'zkkl',
        fontSize: 16
      })
    )
    this.scoreContent.position.set(this.scoreTitle.width + 10, 0)

    this.scoreContainer = new PIXI.Container()
    this.scoreContainer.position.set(
      this.config.screenCenterX - this.scoreTitle.width,
      20
    )
    this.scoreContainer.addChild(this.scoreTitle, this.scoreContent)

    this.lane = new PIXI.TilingSprite(
      PIXI.utils.TextureCache['p4_lane'],
      this.config.screenWidth,
      this.config.screenHeight
    )
    this.lane.tileScale.set(0.5)

    this.barrierContainer = new PIXI.Container()
    this.barrierContainer.position.set(0, 0)

    // 障碍物、金币
    for (let i = 1; i < 5; i++) {
      const barrier = new PIXI.Sprite(
        PIXI.utils.TextureCache[`p4_barrier_${i}`]
      )
      barrier.name = i === 4 ? 'gold' : 'barrier'
      barrier.anchor.set(0.5)
      barrier.scale.set(0.5)
      barrier.position.set(
        (this.lane.width / 12) * (1 + 2 * i),
        randomBetweenNumber(-this.config.screenHeight, 0)
      )
      this.barrierContainer.addChild(barrier)
    }

    this.car = new PIXI.Sprite(
      PIXI.utils.TextureCache[`p4_${this.store.selectCar}_car`]
    )
    this.car.anchor.set(0.5)
    this.car.scale.set(0.5)
    this.car.position.set(
      (this.lane.width / 12) * this.store.track,
      this.config.screenHeight - 180
    )

    this.controlContainer = new PIXI.Container()
    this.controlContainer.position.set(0, this.config.screenHeight - 100)

    // 控制器
    ;['left', 'right'].forEach((item, index) => {
      const button = new PIXI.Graphics()
      button.name = item
      button.pivot.set(40, 30)
      button.position.set(
        this.config.screenWidth / 4 + (this.config.screenWidth / 2) * index,
        40
      )
      button.rotation = index * Math.PI
      button.lineStyle(1, 0x0, 0.5)
      button.beginFill(0x0, 0.35)
      button.drawRoundedRect(0, 0, 80, 60, 5)
      button.endFill()
      button.lineStyle(1, 0xffffff, 0.5)
      button.beginFill(0xffffff, 0.35)
      button.moveTo(15, 30)
      button.lineTo(55, 10)
      button.lineTo(55, 50)
      button.closePath()
      button.endFill()
      this.controlContainer.addChild(button)
    })

    this.addChild(
      this.scoreContainer,
      this.lane,
      this.barrierContainer,
      this.car,
      this.controlContainer
    )
  }

  override initParam(): void {
    this.scoreContainer.zIndex = Z_INDEX.TOP
    this.controlContainer.zIndex = Z_INDEX.TOP
    this.store.speed = 6.5 // 初始速度
    this.store.score = 0 // 初始分数
    this.isEmergencyLane = false
    this.isMax = false
    this.lanePartWidth = this.lane.width / 12
  }

  override initEvent(): void {
    // 1.点击操作区按钮
    this.controlContainer.children.forEach(button => {
      button.interactive = true
      button.buttonMode = true
      button.on('pointertap', () => {
        if (button.name === 'left') {
          this.onClickControlButton(true)
        } else if (button.name === 'right') {
          this.onClickControlButton(false)
        }
        this.car.x = this.lanePartWidth * this.store.track
      })
    })

    // 2.点击键盘 ←、→、↑
    this.bindingEvent({
      type: 'keydown',
      fn: (e: KeyboardEvent) => {
        if (e.keyCode === 37) {
          this.onClickControlButton(true)
        } else if (e.keyCode === 39) {
          this.onClickControlButton(false)
        } else if (e.keyCode === 38) {
          this.isMax = true
        }
        this.car.x = this.lanePartWidth * this.store.track
      }
    })

    // 3.松开键盘 ↑
    this.bindingEvent({
      type: 'keyup',
      fn: () => {
        this.isMax = false
      }
    })
  }

  override initTicker(): void {
    this.bindingTicker(() => {
      // 1.速度调整
      this.store.speed < this.store.maxSpeed &&
        (this.store.speed += this.store.acceleration)
      const speed = this.isMax ? this.store.speed * 2 : this.store.speed
      // 2.分数调整：正常车道+1、应急车道-2（最低为0）
      const scoreNormal = this.isMax ? 2 : 1
      const scoreEmergency = this.isMax ? -4 : -2
      // 3.赛道循环位移
      this.lane.tilePosition.y += speed
      // 4.障碍物循环位移 + 汽车与障碍物碰撞检测
      this.barrierContainer.children.forEach(item => {
        const x = randomArrayNumber([3, 5, 7, 9]) * this.lanePartWidth
        const y = randomBetweenNumber(-this.config.screenHeight, 0)
        // 障碍物循环位移
        if (item.y > this.config.screenHeight) {
          item.position.set(x, y)
        } else {
          item.y += speed
        }
        if (!isAABBRectHit(this.car, item)) {
          return
        }
        // 碰撞障碍物位置调整
        item.position.set(x, y)
        if (item.name === 'gold') {
          // 碰撞金币加分
          soundPlay('success')
          this.store.score += this.store.goldScore
        } else {
          // 碰撞其他结束游戏
          soundPlay('fail')
          this.destroy()
          new EndScene()
        }
      })
      // 5.分数计算
      this.isEmergencyLane == false
        ? (this.store.score += scoreNormal)
        : this.store.score > 0
        ? (this.store.score += scoreEmergency)
        : (this.store.score = 0)
      this.scoreContent.text = `${this.store.score}`
    })
  }

  /**
   * 点击控制器按钮
   * @param isLeft 是否向左移动
   * @returns 是否进入应急车道
   */
  private onClickControlButton(isLeft: boolean): void {
    isLeft ? (this.store.track -= 2) : (this.store.track += 2)
    this.store.track < 1 && (this.store.track = 1)
    this.store.track > 11 && (this.store.track = 11)
    this.isEmergencyLane = this.store.track === 1 || this.store.track === 11
  }
}
