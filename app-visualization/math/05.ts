import { getCanvasCtx } from '../utils/context'
import Vector2D from '../utils/Vector2D'

const { ctx } = getCanvasCtx()

/**
 * 坐标系
 * html：右手坐标系（x向右 + y向下）
 * svg：右手坐标系（x向右 + y向下）
 * canvas：右手坐标系（x向右 + y向下）
 * webgl：左手/笛卡尔坐标系（x向右 + y向上 + z向外）
 */

{
  /**
   * 向量、向量相加、向量长度、向量方向
   */
  // 1.向量 p = (x, y)
  const p1 = { x: 10, y: 20 }
  const p2 = { x: 5, y: 15 }

  // 2.向量相加（结果为向量） p1 + p2 = (x1 + x2, y1 + y2）
  const add = { x: p1.x + p2.x, y: p1.y + p2.y }

  // 3.向量长度 length = (x^2 + y^2)开平方根
  const length = Math.hypot(p1.x, p1.y)

  // 4.向量方向 向量与x轴夹角弧度   1弧度 = 57.29578度
  const dir = Math.atan2(p1.y, p1.x)

  // 5.通过向量 长度 + 方向 反推 坐标
  const x = length * Math.cos(dir)
  const y = length * Math.sin(dir)

  console.log('向量长度', add)
  console.log('向量方向', dir)
  console.log('向量坐标', x, y)
}

{
  /**
   * 实例1：用向量绘制一棵树
   * 本质上是通过向量的相加来确定线段的绘制，不断递归此逻辑，直到树枝直径低于临界值
   */

  const v0 = new Vector2D(0, -200)
  draw(v0, 50, 15, 1.5, 3)
}

/**
 * 树枝绘制函数
 * @param v0 起始向量
 * @param length 树枝长度
 * @param thickness 树枝粗细
 * @param dir 树枝角度
 * @param bias 随机方向因子，控制树枝朝向随机性
 */
function draw(
  v0: Vector2D,
  length: number,
  thickness: number,
  dir: number,
  bias: number
) {
  // 创建指定长度和方向的向量
  const v = new Vector2D(1, 0).rotate(dir).scale(length)
  // 上一次向量与此向量相加
  const v1 = v0.copy().add(v)
  // 绘制线段
  ctx.lineWidth = thickness
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(v0.x, v0.y)
  ctx.lineTo(v1.x, v1.y)
  ctx.stroke()
  ctx.restore()

  if (thickness > 2) {
    const left = Math.PI / 4 + 0.5 * (dir + 0.2) + bias * (Math.random() - 0.5)
    draw(v1, length * 0.9, thickness * 0.8, left, bias * 0.9)
    const right = Math.PI / 4 + 0.5 * (dir - 0.2) + bias * (Math.random() - 0.5)
    draw(v1, length * 0.9, thickness * 0.8, right, bias * 0.9)
  }

  if (thickness < 4) {
    ctx.save()
    ctx.strokeStyle = '#c72c35'
    const thickness = Math.random() * 6 + 3
    ctx.lineWidth = thickness
    ctx.beginPath()
    ctx.moveTo(v1.x, v1.y)
    ctx.lineTo(v1.x, v1.y - 2)
    ctx.stroke()
    ctx.restore()
  }
}
