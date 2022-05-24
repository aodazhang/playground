/**
 * @description 碰撞检测
 * @author aodazhang 2022.05.24
 */
import * as PIXI from 'pixi.js'

type Rect = { x: number; y: number; width: number; height: number }
type Circle = { x: number; y: number; radius: number }

/**
 * pixi精灵的矩形碰撞检测（AABB）
 * @param g1 图形1
 * @param g2 图形2
 * @returns 是否碰撞
 */
export function detectionPixiRect(g1: PIXI.Sprite, g2: PIXI.Sprite): boolean {
  const b1 = g1.getBounds()
  const b2 = g2.getBounds()
  return (
    b1.x + b1.width >= b2.x &&
    b1.x <= b2.x + b2.width &&
    b1.y + b1.height >= b2.y &&
    b1.y <= b2.y + b2.height
  )
}

/**
 * 矩形的碰撞检测
 * @param g1 图形1
 * @param g2 图形2
 * @returns 是否碰撞
 */
export function detectionRect(g1: Rect, g2: Rect) {
  return (
    g1.x + g1.width >= g2.x &&
    g1.x <= g2.x + g2.width &&
    g1.y + g1.height >= g2.y &&
    g1.y <= g2.y + g2.height
  )
}

/**
 * 圆的碰撞检测
 * @param g1 图形1
 * @param g2 图形2
 * @returns 是否碰撞
 */
export function detectionCircle(g1: Circle, g2: Circle) {
  return (
    Math.sqrt(Math.pow(g2.x - g1.x, 2) + Math.pow(g2.y - g1.y, 2)) <=
    g1.radius + g2.radius
  )
}

/**
 * 光线投影法：求 运动物体的一元一次方程 和 碰撞平面的一元一次方程 交点
 * @returns 柯里化检测函数
 */
export function detectionShadow() {
  let lastX = 0
  let lastY = 0
  return function (g1: Circle, g2: Rect) {
    // 1.运动物体 y = k1 * x + b1
    const k1 = (g1.y - lastY) / (g1.x - lastX)
    const b1 = g1.y - k1 * g1.x

    // 2.碰撞平面 y = k2 * x + b2
    const k2 = 0
    const b2 = g1.y

    // 3.交点坐标
    const cx = (b2 - b1) / (k1 - k2)
    // const cy = k2 * cx + b2

    // 4.更新运动物体上一次运动位置
    lastX = g1.x
    lastY = g1.y

    // 5.碰撞检测
    return (
      cx - g1.radius / 2 > g2.x &&
      cx - g1.radius < g2.x + g2.width &&
      g1.y + g1.radius > g2.y
    )
  }
}
