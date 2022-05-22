interface Rect {
  x: number
  y: number
  width: number
  height: number
}

interface Circle {
  x: number
  y: number
  radius: number
  vx: number
  vy: number
  m: number
}

/**
 * canvas边界检测
 * @param canvas 绘图元素
 * @param ball 检测目标
 * @param bounce 反弹系数
 */
export function detectionEdge(
  canvas: HTMLCanvasElement,
  ball: Circle,
  bounce: number
) {
  if (ball.x - ball.radius <= 0) {
    ball.vx *= bounce
    ball.x = ball.radius
  } else if (ball.x + ball.radius >= canvas.width) {
    ball.vx *= bounce
    ball.x = canvas.width - ball.radius
  } else if (ball.y - ball.radius <= 0) {
    ball.vy *= bounce
    ball.y = ball.radius
  } else if (ball.y + ball.radius >= canvas.height) {
    ball.vy *= bounce
    ball.y = canvas.height - ball.radius
  }
}

/**
 * 矩形的碰撞检测
 * @param rect1 矩形1
 * @param rect2 矩形2
 * @returns 检测结果
 */
export function detectionRect(rect1: Rect, rect2: Rect) {
  return (
    rect1.x + rect1.width >= rect2.x &&
    rect1.x <= rect2.x + rect2.width &&
    rect1.y + rect1.height >= rect2.y &&
    rect1.y <= rect2.y + rect2.height
  )
}

/**
 * 圆的碰撞检测
 * @param circle1 圆1
 * @param circle2 圆2
 * @returns 检测结果
 */
export function detectionCircle(circle1: Circle, circle2: Circle) {
  return (
    Math.sqrt(
      Math.pow(circle2.x - circle1.x, 2) + Math.pow(circle2.y - circle1.y, 2)
    ) <=
    circle1.radius + circle2.radius
  )
}

/**
 * 光线投影法：求 运动物体的一元一次方程 和 碰撞平面的一元一次方程 交点
 * @returns 柯里化
 */
export function detectionShadow() {
  let lastX = 0
  let lastY = 0
  return function (circle: Circle, rect: Rect) {
    // 1.运动物体 y = k1 * x + b1
    const k1 = (circle.y - lastY) / (circle.x - lastX)
    const b1 = circle.y - k1 * circle.x

    // 2.碰撞平面 y = k2 * x + b2
    const k2 = 0
    const b2 = circle.y

    // 3.交点坐标
    const cx = (b2 - b1) / (k1 - k2)
    // const cy = k2 * cx + b2

    // 4.更新运动物体上一次运动位置
    lastX = circle.x
    lastY = circle.y

    // 5.碰撞检测
    const result =
      cx - circle.radius / 2 > rect.x &&
      cx - circle.radius < rect.x + rect.width &&
      circle.y + circle.radius > rect.y
    result && console.log('小球碰撞了')
    return result
  }
}

/**
 * 动量动能联立公式二维碰撞检测
 * @param b1 圆1
 * @param b2 圆1
 */
export function detectionMomentum(b1: Circle, b2: Circle) {
  if (!detectionCircle(b1, b2)) {
    return
  }
  // 初始化旋转角度及三角函数
  const dx = b2.x - b1.x
  const dy = b2.y - b1.y
  const angle = Math.atan2(dy, dx)
  const sin = Math.sin(angle)
  const cos = Math.cos(angle)

  // 以b1作为参照物，设定b1中心点为旋转基点
  let x1 = 0
  const y1 = 0
  // 旋转b2坐标点
  let x2 = dx * cos + dy * sin
  const y2 = dy * cos - dx * sin

  // 旋转b1速度
  const vx1 = b1.vx * cos + b1.vy * sin
  const vy1 = b1.vy * cos - b1.vx * sin
  // 旋转b2速度
  const vx2 = b2.vx * cos + b2.vy * sin
  const vy2 = b2.vy * cos - b2.vx * sin

  // 求b1和b2碰撞后速度
  const vx1Final = ((b1.m - b2.m) * vx1 + 2 * b2.m * vx2) / (b1.m + b2.m)
  const vx2Final = ((b2.m - b1.m) * vx2 + 2 * b1.m * vx1) / (b1.m + b2.m)

  const lep = b1.radius + b2.radius - Math.abs(x2 - x1)
  x1 = x1 + (vx1Final < 0 ? -lep / 2 : lep / 2)
  x2 = x2 + (vx2Final < 0 ? -lep / 2 : lep / 2)

  // 恢复b1、b2坐标点旋转
  b2.x = b1.x + x2 * cos - y2 * sin
  b2.y = b1.y + y2 * cos + x2 * sin
  b1.x = b1.x + x1 * cos - y1 * sin
  b1.y = b1.y + y1 * cos + x1 * sin

  // 恢复b1、b2速度旋转
  b1.vx = vx1Final * cos - vy1 * sin
  b1.vy = vy1 * cos + vx1Final * sin
  b2.vx = vx2Final * cos - vy2 * sin
  b2.vy = vy2 * cos + vx2Final * sin
}
