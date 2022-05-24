/**
 * @description 数据转换
 * @author aodazhang 2022.05.24
 * @see 1弧度=57.29°,2*Math.PI弧度=360°
 */

/**
 * 角度转弧度（1° = 2 * Math.PI / 360 = (Math.PI / 180)弧度）
 * @param angle 角度
 * @returns 弧度
 */
export function toRad(angle: number) {
  return angle * (Math.PI / 180)
}

/**
 * 弧度转换角度（1弧度 = 360 / 2 * Math.PI = (180 / Math.PI)°）
 * @param rad 弧度
 * @returns 角度
 */
export function toAngle(rad: number) {
  return rad * (180 / Math.PI)
}
