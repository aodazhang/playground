import { getCanvasCtx } from '../utils/context'
import { drawPointToLine } from '../utils/draw'
import Vector2D from '../utils/Vector2D'

{
  /**
   * 实例1：用向量描述曲线
   */

  /**
   * 生成多边形数据
   * @param edges 边数
   * @param x 起点x
   * @param y 起点y
   * @param step 边长
   * @returns vec数组
   */
  const regularShape = (edges: number, x: number, y: number, step: number) => {
    const ret: Vector2D[] = []
    // 根据边数计算向量转向
    const delta = Math.PI * (1 - (edges - 2) / edges)
    // 生成起点vec变量
    let v = new Vector2D(x, y)
    // 生成边长vec变量
    const dir = new Vector2D(step, 0)
    for (let i = 0; i < edges; i++) {
      // 复制上一个向量 + 转向后的边长向量
      v = v.copy().add(dir.rotate(delta))
      ret.push(v)
    }
    return ret
  }

  drawPointToLine(getCanvasCtx().ctx, regularShape(5, 0, 0, 100))
}

{
  /**
   * 实例2：用参数方程描述圆
   */

  const TAU_SEGMENTS = 60
  const TAU = Math.PI * 2

  /**
   * 参数方程生成圆坐标
   * @param x0 圆心x坐标
   * @param y0 圆心y坐标
   * @param radius 圆半径
   * @param startAng 圆起始角度
   * @param endAng 圆结束角度
   * @returns 向量数组
   */
  const arc = (
    x0: number,
    y0: number,
    radius: number,
    startAng?: number,
    endAng?: number
  ) => {
    !startAng && (startAng = 0)
    !endAng && (endAng = Math.PI * 2)
    // 获取指定角度
    const ang = Math.min(TAU, Math.abs(endAng - startAng))
    // 初始化二维向量数组
    const ret = ang === TAU ? [] : [new Vector2D(x0, y0)]
    // 根据指定角度计算分段数 = 最大分段数 * 指定角度所占百分比
    const segments = Math.round(TAU_SEGMENTS * (ang / TAU))
    // 根据圆的参数方程计算二维向量
    for (let i = 0; i <= segments; i++) {
      // 计算当前向量对应角度 = 起始角度 + 指定角度 * 所占百分比
      const angel = startAng + ang * (i / segments)
      const x = x0 + radius * Math.cos(angel)
      const y = y0 + radius * Math.sin(angel)
      ret.push(new Vector2D(x, y))
    }
    return ret
  }

  drawPointToLine(getCanvasCtx().ctx, arc(0, 0, 100, Math.PI * 1))
}

{
  /**
   * 实例3：用参数方程描述椭圆
   */

  const TAU_SEGMENTS = 60
  const TAU = Math.PI * 2

  /**
   * 参数方程生成椭圆坐标
   * @param x0 圆心x坐标
   * @param y0 圆心y坐标
   * @param radiusX 长轴半径
   * @param radiusY 短轴半径
   * @param startAng 圆起始角度
   * @param endAng 圆结束角度
   * @returns 向量数组
   */
  const ellipse = (
    x0: number,
    y0: number,
    radiusX: number,
    radiusY: number,
    startAng?: number,
    endAng?: number
  ) => {
    !startAng && (startAng = 0)
    !endAng && (endAng = Math.PI * 2)
    // 获取指定角度
    const ang = Math.min(TAU, Math.abs(endAng - startAng))
    // 初始化二维向量数组
    const ret = ang === TAU ? [] : [new Vector2D(x0, y0)]
    // 根据指定角度计算分段数 = 最大分段数 * 指定角度所占百分比
    const segments = Math.round(TAU_SEGMENTS * (ang / TAU))
    // 根据圆的参数方程计算二维向量
    for (let i = 0; i <= segments; i++) {
      // 计算当前向量对应角度 = 起始角度 + 指定角度 * 所占百分比
      const angel = startAng + ang * (i / segments)
      const x = x0 + radiusX * Math.cos(angel)
      const y = y0 + radiusY * Math.sin(angel)
      ret.push(new Vector2D(x, y))
    }
    return ret
  }

  drawPointToLine(getCanvasCtx().ctx, ellipse(0, 0, 100, 50))
}

{
  /**
   * 实例4：用参数方程描述抛物线
   */

  const LINE_SEGMENTS = 60

  /**
   * 参数方程生成抛物线坐标
   * @param x0 起点x坐标
   * @param y0 起点y坐标
   * @param p 焦点到准线的距离
   * @param min
   * @param max
   * @returns
   */
  const parabola = (
    x0: number,
    y0: number,
    p: number,
    min: number,
    max: number
  ) => {
    const ret: Vector2D[] = []
    for (let i = 0; i <= LINE_SEGMENTS; i++) {
      // 计算分段百分比
      const s = i / LINE_SEGMENTS
      const t = min * (1 - s) + max * s
      const x = x0 + 2 * p * Math.pow(t, 2)
      const y = y0 + 2 * p * t
      ret.push(new Vector2D(x, y))
    }
    return ret
  }

  drawPointToLine(getCanvasCtx().ctx, parabola(0, 0, 3, -6, 6))
}

{
  /**
   * 实例5：用高阶函数代替参数方程
   */

  // 抛物线
  const para = parametric(
    t => 25 * t,
    t => 25 * Math.pow(t, 2)
  )

  // 阿基米德螺旋线
  const helical = parametric(
    (t, l) => t * l * Math.cos(t),
    (t, l) => t * l * Math.sin(t)
  )

  // 星形线
  const star = parametric(
    (t, l) => l * Math.pow(Math.cos(t), 3),
    (t, l) => l * Math.pow(Math.sin(t), 3)
  )

  para(-3, 3).draw()
  helical(0, 50, 500, 5).draw('blue')
  star(0, Math.PI * 2, 50, 150).draw('red')
}

{
  /**
   * 实例6：二阶贝塞尔曲线
   */

  const bezier2 = parametric(
    (t, [{ x: x0 }, { x: x1 }, { x: x2 }]) =>
      (1 - t) ** 2 * x0 + 2 * (1 - t) * t * x1 + t ** 2 * x2,
    (t, [{ y: y0 }, { y: y1 }, { y: y2 }]) =>
      (1 - t) ** 2 * y0 + 2 * (1 - t) * t * y1 + t ** 2 * y2
  )
  const p0 = new Vector2D(0, 0)
  const p1 = new Vector2D(150, 0)
  p1.rotate(1)
  const p2 = new Vector2D(200, 0)
  for (let i = 0; i < 30; i++) {
    p1.rotate((2 / 30) * Math.PI)
    p2.rotate((2 / 30) * Math.PI)
    bezier2(0, 1, 100, [p0, p1, p2]).draw()
  }
}

{
  /**
   * 实例7：三阶贝塞尔曲线
   */

  const bezier3 = parametric(
    (t, [{ x: x0 }, { x: x1 }, { x: x2 }, { x: x3 }]) =>
      (1 - t) ** 3 * x0 +
      3 * t * (1 - t) ** 2 * x1 +
      3 * (1 - t) * t ** 2 * x2 +
      t ** 3 * x3,
    (t, [{ y: y0 }, { y: y1 }, { y: y2 }, { y: y3 }]) =>
      (1 - t) ** 3 * y0 +
      3 * t * (1 - t) ** 2 * y1 +
      3 * (1 - t) * t ** 2 * y2 +
      t ** 3 * y3
  )
  const p0 = new Vector2D(0, 0)
  const p1 = new Vector2D(100, 0)
  p1.rotate(1)
  const p2 = new Vector2D(150, 0)
  p2.rotate(-1)
  const p3 = new Vector2D(200, 0)
  for (let i = 0; i < 30; i++) {
    p1.rotate((2 / 30) * Math.PI)
    p2.rotate((2 / 30) * Math.PI)
    p3.rotate((2 / 30) * Math.PI)
    bezier3(0, 1, 100, [p0, p1, p2, p3]).draw()
  }
}

/**
 * 参数方程高阶函数
 * @param xFunc x坐标参数方程
 * @param yFunc y坐标参数方程
 * @returns 绘制函数
 */
function parametric(
  xFunc: (...args: any[]) => number,
  yFunc: (...args: any[]) => number
) {
  const { ctx } = getCanvasCtx()
  return function (
    start: number,
    end: number,
    segment?: number,
    ...args: any[]
  ) {
    !segment && (segment = 100)
    const rets: Vector2D[] = []
    for (let i = 0; i <= segment; i++) {
      // 计算分段百分比
      const p = i / segment
      const t = start * (1 - p) + end * p
      const x = xFunc(t, ...args)
      const y = yFunc(t, ...args)
      rets.push(new Vector2D(x, y))
    }
    return { draw: drawPointToLine.bind(null, ctx, rets), rets }
  }
}
