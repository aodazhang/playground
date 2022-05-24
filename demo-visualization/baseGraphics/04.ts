import { createWebgl } from '@tool/create'

{
  /********************* 一.创建webgl上下文 *********************/

  const { gl } = createWebgl('04.webgl绘制流程')

  /********************* 二.创建webgl程序 *********************/

  // 顶点着色器
  /**
   * glsl语言中
   * attribute：声明顶点变量
   * varying：声明可传入片元变量
   * vec2、vec3：变量是二维、三维向量类型
   * position、color：变量名
   */
  const vertex = `
  attribute vec2 position;
  varying vec3 color;

  void main() {
    gl_PointSize = 1.0;
    color = vec3(0.5 + position, 0.0);
    gl_Position = vec4(position * 0.5, 1.0, 1.0);
  }
`

  // 片元着色器
  /**
   * gl_FragColor：webgl片元着色器内置变量，表示当前像素点颜色
   * varying：接受顶点着色器传递变量
   */
  const fragment = `
  precision mediump float;
  varying vec3 color;

  void main() {
    // gl_FragColor = vec4(1.0, 0.5, 0.5, 1.0);
    gl_FragColor = vec4(color, 1.0);
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

  // 创建三角形类型化数组
  const points = new Float32Array([-1, -1, 0, 1, 1, -1])

  // 数据写入缓冲区
  const bufferId = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId)
  gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW)

  /********************* 四.缓冲区数据读入GPU *********************/

  // 从顶点着色器中读取数据
  const vPosition = gl.getAttribLocation(program, 'position') // 获取顶点着色器中position变量地址
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0) // 给变量设置长度和类型
  gl.enableVertexAttribArray(vPosition) // 激活position变量

  /********************* 五.执行着色器完成绘制 *********************/

  // 清除当前画布内容
  gl.clear(gl.COLOR_BUFFER_BIT)
  // 执行绘制：绘制模式三角形 + 顶点偏移量 + 定点数量
  gl.drawArrays(gl.TRIANGLES, 0, points.length / 2)
}
