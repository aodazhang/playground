/**
 * @description 随机函数
 * @author aodazhang 2022.05.18
 * @see Math.random()的取值范围为[0,1)
 */

/**
 * 求两数之间的一个随机数
 * @param min 最小值
 * @param max 最大值
 * @param float 是否小数
 * @returns [最小值, 最大值] 随机数
 */
export function randomBetweenNumber(
  min: number,
  max: number,
  float?: boolean
): number {
  let num: number = null
  if (
    typeof min !== 'number' ||
    isNaN(min) ||
    typeof max !== 'number' ||
    isNaN(max)
  ) {
    return num
  }
  typeof float !== 'boolean' && (float = false)
  min > max
    ? (num = max + Math.random() * (min - max))
    : (num = min + Math.random() * (max - min))
  return float ? num : Math.round(num)
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

/**
 * 生成随机rgb颜色
 * @returns rgb颜色
 */
export function randomRgbColor() {
  const red = randomBetweenNumber(100, 255)
  const green = randomBetweenNumber(100, 255)
  const blue = randomBetweenNumber(100, 255)
  return `rgb(${red}, ${green}, ${blue})`
}
