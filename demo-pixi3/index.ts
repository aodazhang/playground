import './index.scss'
import '@tool/help'
import '@tool/registerServiceWorker'
import * as PIXI from 'pixi.js'
import gsap from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'

/**************************** 插件配置 ****************************/

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

/**************************** 具体项目 ****************************/

import './基础/1.Container'
import './基础/2.ParticleContainer'
import './基础/3.Tinting'
import './基础/4.CacheAsBitmap'
import './基础/5.BlendModes'
import './基础/6.SimplePlane'

import './进阶/1.Scratchcard'
import './进阶/2.Screenshot'
