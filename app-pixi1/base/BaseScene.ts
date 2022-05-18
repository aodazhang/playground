/**
 * @description 基类-场景
 * @author aodazhang 2022.05.12
 */
import * as PIXI from 'pixi.js'
import { getChild } from '@tool/pixi'
import config, { BaseConfig } from './BaseConfig'

export default class BaseScene extends PIXI.Container {
  /** 基础配置 */
  protected config: BaseConfig = config
  /** 事件函数 */
  private events: IWindowEventFunction[] = []
  /** ticker函数 */
  private tickers: IPixiTickerFunction[] = []

  /**
   * 场景实例构造函数
   * @param name 场景 Container name
   * @param sort 内部子对象是否支持排序
   */
  constructor(name?: string, sort?: boolean) {
    super()
    typeof name === 'string' && name && (this.name = name)
    typeof sort === 'boolean' && (this.sortableChildren = sort)
    this.config.stage.addChild(this)
  }

  /**
   * 场景实例销毁
   * @param options 销毁配置项
   * @returns 无
   */
  public destroy(options?: {
    children?: boolean
    texture?: boolean
    baseTexture?: boolean
  }): void {
    // 1.事件函数解绑
    this.events.forEach(({ type, fn }) => window.removeEventListener(type, fn))
    // 2.ticker函数移除
    this.tickers.forEach(fn => this.config.app.ticker.remove(fn))
    // 3.container实例清理
    super.destroy(options)
  }

  /**
   * 事件函数绑定
   * @param obj window事件对象
   * @returns 无
   */
  protected bindingEvent(obj?: IWindowEventFunction): void {
    if (!obj || typeof obj !== 'object') {
      return
    }
    // 事件函数添加 + 绑定
    this.events.push(obj)
    window.addEventListener(obj.type, obj.fn)
  }

  /**
   * ticker函数绑定
   * @param fn ticker函数
   * @returns 无
   */
  protected bindingTicker(fn?: (...rest: unknown[]) => unknown): void {
    if (typeof fn !== 'function') {
      return
    }
    // ticker函数添加 + 绑定
    this.tickers.push(fn)
    this.config.app.ticker.add(fn)
  }

  /**
   * 获取舞台内部指定子对象
   * @param names 指定名称：'祖name / 父name / 子name'
   * @returns 子对象
   */
  protected getChild(names: string): IPixiContainerChild {
    return getChild(names, this.config.stage)
  }

  /**
   * 1.场景构建
   */
  protected initScene(): void {
    // TODO
  }

  /**
   * 2.参数初始化
   */
  protected initParam(): void {
    // TODO
  }

  /**
   * 3.事件监听
   */
  protected initEvent(): void {
    // TODO
  }

  /**
   * 4.ticker函数
   */
  protected initTicker(): void {
    // TODO
  }

  /**
   * 5.gsap动画
   */
  protected initAnimation(): void {
    // TODO
  }
}
