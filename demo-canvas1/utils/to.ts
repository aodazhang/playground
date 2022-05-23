/**
 * 1弧度 = 57.29°
 * 2Π弧度 = 360°
 * 角度换算弧度：1° = 2Π / 360 = Π / 180
 * 弧度换算角度：1弧度 = 360° / 2Π = 180 / Π
 */

/**
 * 角度转弧度
 * @param angle 角度
 * @returns 弧度
 */
export function toRad(angle: number) {
  return angle * (Math.PI / 180)
}

/**
 * 护短转换角度
 * @param rad 弧度
 * @returns 角度
 */
export function toAngle(rad: number) {
  return rad * (180 / Math.PI)
}
