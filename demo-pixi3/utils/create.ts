import * as PIXI from 'pixi.js'
import { assets } from '../resource'

export function createPixi(title: string, cb: (app: PIXI.Application) => void) {
  const h2 = document.createElement('h2')
  h2.innerText = title.trim()
  document.querySelector('#app').appendChild(h2)

  /**************************** 1.应用初始 ****************************/

  const app = new PIXI.Application({
    width: 500, // 舞台宽度
    height: 500, // 舞台长度
    resolution: 1, // dpr适配
    antialias: true, // 是否开启抗锯齿
    forceCanvas: false, // 是否强制canvas渲染
    autoDensity: true, // 是否css尺寸自动调整为舞台尺寸
    transparent: false, // 是否背景透明
    backgroundColor: 0x000
  })
  document.querySelector('#app').appendChild(app.view)

  /**************************** 2.资源加载 ****************************/

  // 1.建立加载loader
  const loader = app.loader.add(assets, {
    crossOrigin: true // 允许加载跨域资源
  })

  // 2.监控加载百分比
  const progress = new PIXI.Text(
    '0%',
    new PIXI.TextStyle({ fontSize: 16, fill: 0xffffff })
  )
  progress.anchor.set(0.5)
  progress.position.set(app.screen.width / 2, app.screen.height / 2)
  app.stage.addChild(progress)
  loader.onProgress.add((loader: PIXI.Loader) => {
    const percentage = loader.progress.toFixed(2)
    if (percentage === '100.00') {
      app.stage.removeChild(progress)
    } else {
      progress.text = `${percentage}%`
    }
  })

  /**************************** 3.场景启动 ****************************/

  loader.load(() => cb(app))
}
