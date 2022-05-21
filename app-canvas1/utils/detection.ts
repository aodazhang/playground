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
export function detectionShadow1() {
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
