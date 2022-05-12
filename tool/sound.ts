/**
 * @description @pixi/sound声音处理
 * @author aodazhang 2022.05.12
 * @extends https://github.com/pixijs/sound
 */
import { sound } from '@pixi/sound'

/**
 * 播放音乐
 * @param key pixi加载资源key
 * @param isLoop 是否循环播放
 * @returns 无
 */
export function soundPlay(key: string, isLoop?: boolean): void {
  if (typeof key !== 'string' || !key) {
    return
  }
  sound.play(key, {
    loop: typeof isLoop === 'boolean' ? isLoop : false // 循环播放
  })
}

/**
 * [全局]音量调整
 * @param volume 音量 0 ~ 1（默认 0.2）
 * @returns 无
 */
export function soundVolumeAll(volume?: number): void {
  sound.volumeAll = typeof volume === 'number' && !isNaN(volume) ? volume : 0.2
}

/**
 * [全局]有声/静音
 * @returns 无
 */
export function soundMuteAll(): void {
  sound.toggleMuteAll()
}

/**
 * [全局]播放/暂停
 * @returns 无
 */
export function soundPauseAll(): void {
  sound.togglePauseAll()
}
