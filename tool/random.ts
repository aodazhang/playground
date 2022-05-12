/**
 * @description 随机函数
 * @author aodazhang 2022.05.12
 * @see Math.random()的取值范围为[0,1)
 */

/**
 * 求两数之间的一个随机整数
 * @param min 最小值
 * @param max 最大值
 * @returns [最小值, 最大值] 随机整数
 */
export function randomBetweenNumber(min: number, max: number): number {
  if (
    typeof min !== 'number' ||
    isNaN(min) ||
    typeof max !== 'number' ||
    isNaN(max)
  ) {
    return null
  }
  if (min > max) {
    return Math.round(max + Math.random() * (min - max))
  }
  return Math.round(min + Math.random() * (max - min))
}

/**
 * 求数组中的一个随机下标对应的值
 * @param array 数组
 * @returns 随机下标对应的值
 */
export function randomArrayNumber(array: number[]): number {
  if (!Array.isArray(array) || !array.length) {
    return null
  }
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}
