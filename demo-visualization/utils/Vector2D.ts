/** 二维向量 */
export default class Vector2D {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  /** 向量长度 */
  get length(): number {
    return Math.hypot(this.x, this.y)
  }

  /** 向量方向 */
  get dir(): number {
    return Math.atan2(this.y, this.x)
  }

  /**
   * 向量复制
   * @returns 新向量
   */
  copy() {
    return new Vector2D(this.x, this.y)
  }

  /**
   * 向量加法
   * @param val 向量2
   * @returns this
   */
  add(val: Vector2D) {
    this.x += val.x
    this.y += val.y
    return this
  }

  /**
   * 向量减法
   * @param val 向量2
   * @returns this
   */
  sub(val: Vector2D) {
    this.x -= val.x
    this.y -= val.y
    return this
  }

  /**
   * 向量缩放
   * @param val 缩放参数
   * @returns this
   */
  scale(val: number) {
    this.x *= val
    this.y *= val
    return this
  }

  /**
   * 向量旋转
   * @param val 弧度
   * @returns this
   */
  rotate(val: number) {
    const cos = Math.cos(val)
    const sin = Math.sin(val)
    const { x, y } = this
    this.x = x * cos - y * sin
    this.y = x * sin + y * cos
    return this
  }

  /**
   * 二维向量点乘
   * @param val 向量2
   * @returns 点乘结果
   */
  dot(val: Vector2D) {
    return this.x * val.x + this.y * val.y
  }

  /**
   * 二维向量叉乘
   * @param val 向量2
   * @returns 叉乘结果
   */
  cross(val: Vector2D) {
    return this.x * val.y - this.y * val.x
  }

  /**
   * 归一化
   * @returns 归一化向量
   */
  normalize() {
    return this.scale(1 / this.length)
  }
}
