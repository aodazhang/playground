import { Mesh } from 'three'
import config from './config'

export function animation(meshBoxs: Mesh[], render: () => void) {
  const ys = Array(meshBoxs.length).fill(0) // 起始位移值数组
  let yIsUps = Array(meshBoxs.length).fill(config.isUp) // 起始位移方向数组
  let yIndex = 0 // 起始位移指针
  let startTime = Date.now() // 动画开始时间

  const changeMeshBoxs = () => {
    // 1.如果位移数组不包含运动方向，则重置动画
    if (yIsUps.findIndex(i => i !== 0) === -1) {
      // 只有超过指定间隔才会再次执行动画
      const endTime = Date.now()
      if (endTime - startTime > config.stopTime) {
        yIsUps = Array(meshBoxs.length).fill(config.isUp)
        yIndex = 0
        startTime = endTime
      }
    }

    // 2.循环meshBoxs数组，计算位移
    for (let i = 0; i < yIndex; i++) {
      // 若当前meshBox不存在位移方向，直接跳过
      if (yIsUps[i] === 0) {
        continue
      }
      const meshBox = meshBoxs[i]
      // 设置位移方向
      if (ys[i] > config.maxY) {
        yIsUps[i] = -1
      } else if (ys[i] < config.minY) {
        yIsUps[i] = 1
      }
      // 设置位移值
      ys[i] += config.increase * yIsUps[i]
      meshBox.position.y = ys[i]
      // 如果当前位移值为0，且位移方向为正，代表是该meshbox本轮动画的最后位移，置控位移方向，并刷新动画开始时间
      if (ys[i] === 0 && yIsUps[i] === config.isUp) {
        yIsUps[i] = 0
        startTime = Date.now()
      }
    }

    // 3.只有位移index小于meshBoxList长度，且当前meshBox动画时长大于指定时长，才开始执行下一个meshBox动画，并刷新动画开始时间
    const now = Date.now()
    if (yIndex < meshBoxs.length && now - startTime > config.insertTime) {
      yIndex++
      startTime = now
    }

    // 4.执行渲染并刷新动画
    render()
    requestAnimationFrame(changeMeshBoxs)
  }

  changeMeshBoxs()
}
