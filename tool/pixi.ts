/**
 * @description pixi辅助函数
 * @author aodazhang 2022.05.12
 * @extends https://github.com/pixijs/pixijs
 */
import * as PIXI from 'pixi.js'

/**
 * 获取舞台适配对象
 * @param maxWidth 舞台最大宽度
 * @param maxHeight 舞台最大高度
 * @returns 舞台适配对象
 */
export function getStageAdapterSize(maxWidth?: number, maxHeight?: number) {
  maxWidth = maxWidth || 375
  maxHeight = maxHeight || 812
  const width = document.documentElement.clientWidth || window.innerWidth || 0
  const height =
    document.documentElement.clientHeight || window.innerHeight || 0
  const resolution = window.devicePixelRatio || 1
  return {
    width: width > maxWidth ? maxWidth : width,
    height: height > maxHeight ? maxHeight : height,
    resolution
  }
}

/**
 * 获取pixi指定子对象
 * @param names 指定名称：'祖name / 父name / 子name'
 * @param container 搜索顶层容器
 * @returns 子对象
 */
export function getChild(names: string, container: IPixiContainerChild) {
  if (typeof names !== 'string' || !names || !container) {
    return null
  }
  let target = container
  names.split('/').forEach(name => {
    if (!target) {
      return
    }
    target = target.getChildByName(name) as IPixiContainerChild
  })
  return target
}

/**
 * 获取PIXI.Loader加载完成后信息
 * @param loader PIXI.Loader实例
 * @param resources 加载资源映射
 * @returns 无
 */
export function loadedLog(
  loader: PIXI.Loader,
  resources: Partial<Record<string, PIXI.LoaderResource>>
) {
  /* eslint-disable */
  console.log('[加载完成]loader', loader)
  console.log('[加载完成]resources', resources)
  console.log('[加载完成]TextureCache', PIXI.utils.TextureCache)
  /* eslint-enable */
}
