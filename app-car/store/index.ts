/**
 * @description 全局变量
 * @author aodazhang 2022.05.12
 */

const store = {
  /** 汽车类型名称映射 */
  carMap: { yellow: '黄色', white: '白色', red: '红色', black: '黑色' },
  /** 汽车类型 */
  selectCar: 'yellow',
  /** 汽车位于第几赛道 */
  track: 5,
  /** 汽车速度 */
  speed: 6.5,
  /** 汽车加速度 */
  acceleration: 0.01,
  /** 汽车最大速度 */
  maxSpeed: 15,
  /** 游戏得分 */
  score: 0,
  /** 奖励得分 */
  goldScore: 100
}

export default store
