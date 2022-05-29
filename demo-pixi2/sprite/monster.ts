import * as PIXI from 'pixi.js'

const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight

export class Monster extends PIXI.Graphics {
  options: {
    x: number
    y: number
    scale: number
    width: number
    height: number
    speed: number
  }
  radian: number
  targetX: number
  targetY: number
  animationSpeed: number

  constructor(options: { size: number; x: number; y: number }) {
    super()
    this.beginFill(0x9966ff)
    this.drawCircle(0, 0, options.size || 32)
    this.endFill()
    this.x = options.x
    this.y = options.y
  }

  goto(x: number, y: number) {
    this.targetX = x
    this.targetY = y
    this.radian = Math.atan2(y - this.y, x - this.x)
    this.rotation = this.radian
  }

  walk() {
    this.x = this.x + 3 * Math.cos(this.radian)
    this.y = this.y + 3 * Math.sin(this.radian)
  }
}

export function getRadom(max = 255, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function monsterFactory(
  scene: PIXI.Container,
  target: PIXI.Container,
  num: number,
  time: number
) {
  const boundary = [
    [0, WIDTH, 0, 0],
    [0, 0, 0, HEIGHT],
    [WIDTH, WIDTH, 0, HEIGHT],
    [0, WIDTH, HEIGHT, HEIGHT]
  ]
  const timer = setInterval(() => {
    for (let i = 0; i < num; i++) {
      const random = boundary[getRadom(num, 0)]
      const x = getRadom(random[1], random[0])
      const y = getRadom(random[4], random[3])
      const monster = new Monster({ size: 16, x, y })
      monster.goto(target.x, target.y)
      scene.addChild(monster)
    }
  }, time || 300)
  return timer
}
