import earcut from 'earcut'
import { getCanvasCtx, getWebglCtx } from '../utils/context'
import { drawPointToLine } from '../utils/draw'
import Vector2D from '../utils/Vector2D'

/**
 * 多边形
 * 定义：由三条或三条以上的线段首尾连接构成的平面图形
 * 简单多边形：每条边不与相邻以外的边相交
 * - 凸多边形：每个内角不超过180°
 * - 凹多边行：存在超过180°的内角
 * 复杂多变性：存在与相邻边以外的边相交
 */

{
  /**
   * 实例1：canvas填充多边形
   * 填充模式 nonzero（默认）：只要由边围起来一律填充
   * 填充模式 evenodd：根据重叠区域奇偶性判断是否填充
   */

  const points = [new Vector2D(0, 100)]
  for (let i = 1; i <= 4; i++) {
    points.push(points[0].copy().rotate(i * Math.PI * 0.4))
  }

  // 绘制五边形并填充 nonzero
  const polygon = [...points]
  const ctx1 = getCanvasCtx().ctx
  drawPointToLine(ctx1, polygon, 'blue', true)
  ctx1.fillStyle = '#ccc'
  ctx1.fill('nonzero')

  // 绘制五角星并填充 evenodd
  const star = [points[0], points[2], points[4], points[1], points[3]]
  const ctx2 = getCanvasCtx().ctx
  drawPointToLine(ctx2, star, 'blue', true)
  ctx2.fillStyle = '#ccc'
  ctx2.fill('evenodd')
}

{
  /**
   * 实例2：webgl填充多边形
   * WebGL没有提供自动填充多边形的方法，但是我们可以用三角形这种基本图元来快速地填充多边形
   */
  // 1.三角剖分：借助earcut将多边形分割成多个三角形
  // earcut：https://github.com/mapbox/earcut
  const vertices = [
    [-0.7, 0.5],
    [-0.4, 0.3],
    [-0.25, 0.71],
    [-0.1, 0.56],
    [-0.1, 0.13],
    [0.4, 0.21],
    [0, -0.6],
    [-0.3, -0.3],
    [-0.6, -0.3],
    [-0.45, 0.0]
  ]
  const points = vertices.flat() // earcut只接受扁平化数组
  const triangles = earcut(points) // 三角剖分后的坐标点

  // 2.绘制

  /********************* 一.创建webgl上下文 *********************/

  const gl = getWebglCtx().ctx

  /********************* 二.创建webgl程序 *********************/

  // 顶点着色器
  /**
   * glsl语言中
   * attribute：声明顶点变量
   * vec2、vec4：变量是二维、四维向量类型
   * position：变量名
   */
  const vertex = `
  attribute vec2 position;

  void main() {
    gl_PointSize = 1.0;
    gl_Position = vec4(position * 0.5, 1.0, 1.0);
  }
`

  // 片元着色器
  /**
   * gl_FragColor：webgl片元着色器内置变量，表示当前像素点颜色
   */
  const fragment = `
  precision mediump float;

  void main() {
    gl_FragColor = vec4(1.0, 0.5, 0.5, 1.0);
  }
`

  // 创建顶点着色器
  const vertexShader = gl.createShader(gl.VERTEX_SHADER)
  gl.shaderSource(vertexShader, vertex)
  gl.compileShader(vertexShader)

  // 创建片元着色器
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
  gl.shaderSource(fragmentShader, fragment)
  gl.compileShader(fragmentShader)

  // 创建webgl程序对象
  const program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  // 启用webgl程序对象
  gl.useProgram(program)

  /********************* 三.数据存入缓冲区 *********************/

  const position = new Float32Array(points)
  const pointBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, pointBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, position, gl.STATIC_DRAW)

  const cells = new Uint16Array(triangles)
  const cellsBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cellsBuffer)
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, cells, gl.STATIC_DRAW)

  /********************* 四.缓冲区数据读入GPU *********************/

  // 从顶点着色器中读取数据
  const vPosition = gl.getAttribLocation(program, 'position') // 获取顶点着色器中position变量地址
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0) // 给变量设置长度和类型
  gl.enableVertexAttribArray(vPosition) // 激活position变量

  /********************* 五.执行着色器完成绘制 *********************/

  // 清除当前画布内容
  gl.clear(gl.COLOR_BUFFER_BIT)
  // 执行绘制：绘制模式线段
  gl.drawElements(gl.LINE_STRIP, cells.length, gl.UNSIGNED_SHORT, 0)
}

{
  /**
   * 实例3：canvas api判断点在多边形内部
   * 缺点：同一canvas绘制多个图形，只有最后一个生效
   */

  const points = [new Vector2D(0, 100)]
  for (let i = 1; i <= 4; i++) {
    points.push(points[0].copy().rotate(i * Math.PI * 0.4))
  }

  const { ctx, canvas } = getCanvasCtx()
  const { left, top } = canvas.getBoundingClientRect()
  drawPointToLine(ctx, points, 'blue', true)

  canvas.addEventListener('mousemove', e => {
    const { x, y } = e

    if (ctx.isPointInPath(x - left, y - top)) {
      drawPointToLine(ctx, points, 'red', true)
    } else {
      drawPointToLine(ctx, points, 'blue', true)
    }
  })
}

{
  /**
   * 实例4：canvas 自定义判断点在多边形内部
   * 原理：
   * 1.已知一个三角形的三条边分别是向量 a、b、c，平面上一点 u 连接三角形三个顶点的向量分别为 u1、u2、u3，那么 u 点在三角形内部的充分必要条件是：u1 X a、u2 X b、u3 X c 的符号相同。
   * 2.当点 u 在三角形 a、b、c 内时，因为 u1到 a、u2到 b、u3到 c 的小角旋转方向是相同的（这里都为顺时针），所以 u1 X a、u2 X b、u3 X c 要么同正，要么同负。当点 v 在三角形外时，v1到 a 方向是顺时针，v2到 b 方向是逆时针，v3到 c 方向又是顺时针，所以它们叉乘的结果符号并不相同。
   */

  const points = [new Vector2D(0, 100)]
  for (let i = 1; i <= 4; i++) {
    points.push(points[0].copy().rotate(i * Math.PI * 0.4))
  }

  const { ctx, canvas } = getCanvasCtx()
  drawPointToLine(ctx, points, 'blue', true)

  const isTriangle = (
    p1: Vector2D,
    p2: Vector2D,
    p3: Vector2D,
    point: Vector2D
  ) => {
    const a = p2.copy().sub(p1)
    const b = p3.copy().sub(p2)
    const c = p1.copy().sub(p3)

    const u1 = point.copy().sub(p1)
    const u2 = point.copy().sub(p2)
    const u3 = point.copy().sub(p3)

    const s1 = Math.sign(a.cross(u1))
    let p = a.dot(u1) / a.length ** 2
    if (s1 === 0 && p >= 0 && p <= 1) return true
    const s2 = Math.sign(b.cross(u2))
    p = b.dot(u2) / b.length ** 2
    if (s2 === 0 && p >= 0 && p <= 1) return true
    const s3 = Math.sign(c.cross(u3))
    p = c.dot(u3) / c.length ** 2
    if (s3 === 0 && p >= 0 && p <= 1) return true

    return s1 === s2 && s2 === s3
  }

  canvas.addEventListener('mousemove', e => {
    console.log(e, isTriangle)
  })
}
