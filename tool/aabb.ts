/**
 * @description AABB碰撞检测函数
 * @author aodazhang 2022.05.12
 */
import * as PIXI from 'pixi.js'

/**
 * 矩形边界AABB碰撞检测（精灵）
 * @param sprite1 精灵1
 * @param sprite2 精灵2
 * @returns 是否碰撞
 */
export function isAABBRectHit(sprite1: unknown, sprite2: unknown): boolean {
  if (!(sprite1 instanceof PIXI.Sprite) || !(sprite2 instanceof PIXI.Sprite)) {
    return false
  }
  const { x: x1, y: y1, width: w1, height: h1 } = sprite1.getBounds()
  const { x: x2, y: y2, width: w2, height: h2 } = sprite2.getBounds()
  const range1 = {
    x: { min: x1, max: x1 + w1 },
    y: { min: y1, max: y1 + h1 }
  }
  const range2 = {
    x: { min: x2, max: x2 + w2 },
    y: { min: y2, max: y2 + h2 }
  }
  let isOverlapX = false
  let isOverlapY = false
  // x轴重合判断
  if (range1.x.max >= range2.x.min && range1.x.min <= range2.x.max) {
    isOverlapX = true
  }
  // y轴重合判断
  if (range1.y.max >= range2.y.min && range1.y.min <= range2.y.max) {
    isOverlapY = true
  }
  return isOverlapX && isOverlapY
}
