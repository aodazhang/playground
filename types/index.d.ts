/**
 * @description 全局定义
 * @author aodazhang 2022.05.12
 */

/** 应用环境 */
declare const PROJECT_ENV: string
/** 应用版本 */
declare const PROJECT_VERSION: string
/** 应用构建时间 */
declare const PROJECT_BUILDTIME: string

/** pixi loader加载资源 */
declare interface IPixiLoaderResource {
  /** 资源key */
  name: string
  /** 资源url */
  url: string
}
/** pixi查询对象 */
declare type IPixiContainerChild =
  | PIXI.Container
  | PIXI.Sprite
  | PIXI.Text
  | null
/** pixi ticker函数 */
declare type IPixiTickerFunction = (...params: unknown[]) => void

/** window事件函数 */
declare type IWindowEventFunction = {
  type: keyof WindowEventMap
  /* eslint-disable */
  fn: (event: any) => void
  /* eslint-enable */
}
