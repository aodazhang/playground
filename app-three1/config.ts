const animation = {
  /** 动画波动系数 */
  insertTime: 50,
  /** 动画停止系数 */
  stopTime: 1000,
  /** 动画y轴位移递增系数 */
  increase: 1.5,
  /** 动画y轴位移初始方向 */
  isUp: 1,
  /** 动画y轴位移最大值 */
  maxY: 30,
  /** 动画y轴位移最小值 */
  minY: -30
}

const color = {
  /** 渲染器背景色 */
  backgroundColor: 0x364046,
  /** 环境光色 */
  ambientColor: 0x4169e1,
  /** 环境光强度 */
  ambientIntensity: 1,
  /** 平行光色 */
  directionalColor: 0xf0e68c,
  /** 平行光强度 */
  directionalIntensity: 0.9,
  /** 材质高光色 */
  materialSpecularColor: 0xffffff,
  /** 材质高光系数 */
  materialShininess: 6.125,
  /** 材质颜色数组 */
  materialColors: [
    0xf44336, 0xe91e63, 0x9c27b0, 0x673ab7, 0x3f51b5, 0x2196f3, 0x03a9f4,
    0x00bcd4, 0x009688, 0x4caf50, 0x8bc34a, 0xcddc39, 0xffeb3b, 0xffc107,
    0xff9800, 0xff5722, 0x795548, 0xffc107, 0xffc107
  ]
}

const size = {
  /** canvas容器宽度 */
  canvasWidth: window.innerWidth,
  /** canvas容器高度 */
  canvasHeight: window.innerHeight,
  /** canvas宽高比 */
  canvasAspect: window.innerWidth / window.innerHeight,
  /** 正方体尺寸 */
  boxSize: 50,
  /** 正方体间隔 */
  boxInsert: 5
}

export default { ...animation, ...color, ...size }
