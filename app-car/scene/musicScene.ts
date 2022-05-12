/**
 * @description 场景-声音
 * @author aodazhang 2022.05.12
 */
import * as PIXI from 'pixi.js'
import BaseScene from '../base/BaseScene'
import { soundMuteAll, soundPlay, soundVolumeAll } from '@tool/sound'
import { Z_INDEX } from '../utils'

export default class MusicScene extends BaseScene {
  /** 是否播放音乐 */
  private isPlay = true
  /** 音乐控制 */
  private music: PIXI.Sprite = null

  constructor() {
    super('music')
    this.initScene()
    this.initParam()
    this.initEvent()
    this.initTicker()
  }

  override initScene(): void {
    this.music = new PIXI.Sprite(PIXI.utils.TextureCache['music_on'])
    this.music.anchor.set(0.5)
    this.music.scale.set(0.25)
    this.music.position.set(this.config.screenWidth - 25, 25)

    this.addChild(this.music)
  }

  override initParam(): void {
    this.zIndex = Z_INDEX.TOP
    soundVolumeAll()
    soundPlay('background', true)
  }

  override initEvent(): void {
    // 1.点击开关音乐
    this.music.interactive = true
    this.music.buttonMode = true
    this.music.on('pointertap', () => {
      this.isPlay = !this.isPlay
      this.music.texture =
        PIXI.utils.TextureCache[this.isPlay ? 'music_on' : 'music_off']
      soundMuteAll()
    })
  }

  override initTicker(): void {
    this.bindingTicker(() => {
      this.isPlay && (this.music.rotation += 0.05)
    })
  }
}
