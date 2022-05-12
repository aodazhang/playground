/**
 * 仿射变换（位移、旋转、缩放）
 * 概念：仿射变换简单来说就是“线性变换 + 平移”，改变几何图形的位置、形状、大小和角度。
 * 性质：
 * 1.仿射变换前是直线段的，仿射变换后依然是直线段
 * 2.对两条直线段 a 和 b 应用同样的仿射变换，变换前后线段长度比例保持不变
 */

import { getWebglCtx } from '../utils/context'
import { multiply } from '../utils/mat3Func'

/**
 * 线性变换（旋转、缩放）
 * 概念：旋转和缩放都可以写成矩阵与向量相乘的形式，这种形式就叫做线性变换。
 * 性质：除了包含仿射变换的2个性质之外，还有2个额外的性质
 * 1.线性变换不改变坐标原点（因为如果 x0、y0等于零，那么 x、y 肯定等于 0）
 * 2.线性变换可以叠加，多个线性变换的叠加结果就是将线性变换的矩阵依次相乘，再与原始向量相乘
 */

/**
 * 齐次矩阵
 * 概念：将n维的仿射变换转换为n+1维的齐次矩阵，它能让我们用线性变换来表示仿射变换。这样一来，我们就能利用线性变换的叠加性质，来非常方便地进行各种复杂的仿射变换了。落实到共识上，就是把这些变换的矩阵相乘得到一个新的矩阵，再把它乘以原向量。我们在绘制几何图形的时候会经常用到它
 */

{
  /**
   * 向量平移：让向量 P(x0, y0) 沿着向量 Q(x1, y1) 平移，只要将 P 和 Q 相加就可以.
   */
  const point1 = [1, 1]
  const point2 = [2, 3]
  const x = point1[0] + point2[0]
  const y = point1[1] + point2[1]

  console.log('向量平移', [x, y])
}

{
  /**
   * 向量旋转：可通过三角函数简易推导，详见 1~2
   */
  const point = [1, 1]
  const ang = Math.PI * 0.5
  const x = point[0] * Math.cos(ang) - point[1] * Math.sin(ang)
  const y = point[0] * Math.sin(ang) + point[1] * Math.cos(ang)

  console.log('向量旋转', [x, y])
}

{
  /**
   * 向量缩放：可通过向量与标量（标量只有大小、没有方向）相乘
   */
  const point = [1, 1]
  const x = point[0] * 10
  const y = point[1] * 10

  console.log('向量缩放', [x, y])
}

{
  /**
   * 实例1：webgl粒子发射动画
   */

  /********************* 一.创建webgl程序 *********************/

  const gl = getWebglCtx().ctx

  // 顶点着色器
  const vertex = `
   // 一.声明顶点变量
   attribute vec2 position;

   // 二.声明常量
   uniform float u_rotation;
   uniform float u_time;
   uniform float u_duration;
   uniform float u_scale;
   uniform vec2 u_dir;

   // 三.声明可传入片元着色器变量
   varying float vP;

   void main() {
     // 1.计算动画进度，范围 0 ~ 1
     float p = min(1.0, u_time / u_duration);
     // 2.旋转角度 = 初始角度 u_rotation + 10派，动画过程中会绕自身旋转5周
     float rad = u_rotation + 3.14 * 10.0 * p;
     // 3.缩放比例 = 初始缩放比例 u_scale * 缓动系数
     float scale = u_scale * p * (2.0 - p);
     // 4.二维向量 = 单位向量 u_dir * 最大移动距离2.0 * 缓动系数
     vec2 offset = u_dir * 2.0 * p * p;

     // 位移齐次矩阵
     mat3 translateMatrix = mat3(
       1.0, 0.0, 0.0,
       0.0, 1.0, 0.0,
       offset.x, offset.y, 1.0
     );
     // 旋转齐次矩阵
     mat3 rotateMatrix = mat3(
       cos(rad), sin(rad), 0.0,
       -sin(rad), cos(rad), 0.0,
       0.0, 0.0, 1.0
     );
     // 缩放齐次矩阵
     mat3 scaleMatrix = mat3(
       scale, 0.0, 0.0,
       0.0, scale, 0.0,
       0.0, 0.0, 1.0
     );

     gl_PointSize = 1.0;

     // 5.pos的值为三个矩阵与顶点变量position的乘积，完成对顶点的线性变换，三角形会向着特定的方向位移、旋转、缩放
     vec3 pos = translateMatrix * rotateMatrix * scaleMatrix * vec3(position, 1.0);
     gl_Position = vec4(pos, 1.0);

     vP = p;
   }
 `

  const fragment = `
   precision mediump float;

   uniform vec4 u_color;

   // 顶点着色器传递变量
   varying float vP;

   void main() {
     gl_FragColor.xyz = u_color.xyz;
     gl_FragColor.a = (1.0 - vP) * u_color.a;
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

  /********************* 二.数据存入缓冲区 *********************/
  const position = new Float32Array([-1, -1, 0, 1, 1, -1])

  const bufferId = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId)
  gl.bufferData(gl.ARRAY_BUFFER, position, gl.STATIC_DRAW)

  /********************* 三.缓冲区数据读入GPU *********************/
  const vPosition = gl.getAttribLocation(program, 'position') // 获取顶点着色器中position变量地址
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0) // 给变量设置长度和类型
  gl.enableVertexAttribArray(vPosition) // 激活position变量

  /********************* 四.处理参数 *********************/

  /**
   * uniform：在glsl中，uniform声明的变量等同于常量，在shader执行过程中不可变，且可同时在顶点、片元着色器中使用
   * gl.uniform1f：传入一个浮点数，对应的 uniform 变量的类型为 float
   * gl.uniform4f：传入四个浮点数，对应的 uniform 变量类型为 float[4]
   * gl.uniform3fv：传入一个三维向量，对应的 uniform 变量类型为 vec3
   * gl.uniformMatrix4fv：传入一个 4x4 的矩阵，对应的 uniform 变量类型为 mat4
   */

  /**
   * 随机生成三角形数据
   */
  type TParams = {
    u_color: number[]
    u_rotation: number
    u_scale: number
    u_time: number
    u_duration: number
    rad: number
    u_dir: number[]
    startTime: number
  }
  const randomTriangles = (): TParams => {
    const u_color = [Math.random(), Math.random(), Math.random(), 1.0] // 随机颜色
    const u_rotation = Math.random() * Math.PI // 随机旋转角度
    const u_scale = Math.random() * 0.05 + 0.03 // 随机缩放
    const u_time = 0
    const u_duration = 3.0 // 持续3秒

    const rad = Math.random() * Math.PI * 2
    const u_dir = [Math.cos(rad), Math.sin(rad)] // 运动方向
    const startTime = performance.now()

    return {
      u_color,
      u_rotation,
      u_scale,
      u_time,
      u_duration,
      rad,
      u_dir,
      startTime
    }
  }

  /** 设置矩阵变换 */
  const setUniforms = (gl: WebGLRenderingContext, params: TParams) => {
    // gl.getUniformLocation 拿到 uniform 变量的指针
    // gl.uniform4fv 将数据传递给 uniform 变量
    gl.uniform4fv(gl.getUniformLocation(program, 'u_color'), params.u_color)
    gl.uniform1f(
      gl.getUniformLocation(program, 'u_rotation'),
      params.u_rotation
    )
    gl.uniform1f(gl.getUniformLocation(program, 'u_scale'), params.u_scale)
    gl.uniform1f(gl.getUniformLocation(program, 'u_time'), params.u_time)
    gl.uniform1f(
      gl.getUniformLocation(program, 'u_duration'),
      params.u_duration
    )
    gl.uniform2fv(gl.getUniformLocation(program, 'u_dir'), params.u_dir)
  }

  let triangles: TParams[] = []
  const update = () => {
    // 清除当前画布内容
    gl.clear(gl.COLOR_BUFFER_BIT)
    // 生成随即三角形
    for (let i = 0; i < 5 * Math.random(); i++) {
      triangles.push(randomTriangles())
    }
    triangles.forEach(i => {
      // 计算当前三角形生存时间：超过3秒移除
      i.u_time = (performance.now() - i.startTime) / 1000
      setUniforms(gl, i)
      // 绘制当前三角形
      gl.drawArrays(gl.TRIANGLES, 0, position.length / 2)
    })
    // 移除已经结束动画的三角形
    triangles = triangles.filter(i => i.u_time <= i.u_duration)
    requestAnimationFrame(update)
  }
  requestAnimationFrame(update)
}

{
  /**
   * 实例2：css的仿射变换
   */
  const div = document.createElement('div')
  div.style.width = '100px'
  div.style.height = '100px'
  div.style.backgroundColor = 'red'
  document.body.appendChild(div)

  // css的仿射变换：旋转30° + 平移100px、50px + 放大1.5倍

  // 1.api方式
  // div.style.transform = 'rotate(30deg) translate(100px,50px) scale(1.5)'

  // 2.齐次矩阵方式
  const rad = Math.PI / 6
  const a = [
    Math.cos(rad),
    -Math.sin(rad),
    0,
    Math.sin(rad),
    Math.cos(rad),
    0,
    0,
    0,
    1
  ]
  const b = [1, 0, 100, 0, 1, 50, 0, 0, 1]
  const c = [1.5, 0, 0, 0, 1.5, 0, 0, 0, 1]
  const res = [a, b, c].reduce((prev, current) => {
    return multiply([], current, prev)
  })

  div.style.transform = `matrix(
    ${res[0]}, ${res[3]},
    ${res[1]}, ${res[4]},
    ${res[2]}, ${res[5]}
  )`
}
