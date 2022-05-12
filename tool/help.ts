/**
 * @description 辅助工具
 * @author aodazhang 2022.05.12
 */
import * as Stats from 'stats.js'
import VConsole from 'vconsole'

let statsInstance: Stats = null

function help(cb?: (...rest: unknown[]) => unknown) {
  if (!statsInstance) {
    return
  }
  statsInstance.begin()
  typeof cb === 'function' && cb()
  statsInstance.end()
  requestAnimationFrame(() => help(cb))
}

if (window.location.href.indexOf('debug=true') > -1) {
  // 2.stats.js
  // @ts-ignore
  statsInstance = new Stats()
  statsInstance.showPanel(0)
  statsInstance.dom.style.top = '10px'
  statsInstance.dom.style.left = '10px'
  document.body.appendChild(statsInstance.dom)
  help()

  // 3.vconsole
  new VConsole()

  // 4.构建信息
  /* eslint-disable */
  console.log(`[构建信息] 环境:${PROJECT_ENV} 版本:${PROJECT_VERSION}`)
  /* eslint-enable */
}
