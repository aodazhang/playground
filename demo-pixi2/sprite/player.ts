import * as PIXI from 'pixi.js'

export class Player extends PIXI.AnimatedSprite {
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

  constructor(frames: PIXI.Texture[]) {
    super(frames, true)
    this.options = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      scale: 0.3,
      width: 356,
      height: 220,
      speed: 3
    }
    this.radian = 0
    this.targetX = this.options.x
    this.targetY = this.options.y
    this.animationSpeed = this.options.speed
    this.anchor.set(0.5, 0.5)
    this.position.set(this.options.x, this.options.y)
    this.scale.set(this.options.scale, this.options.scale)
  }

  goto(x: number, y: number) {
    this.targetX = x
    this.targetY = y
    this.radian = Math.atan2(y - this.y, x - this.x)
    this.rotation = this.radian
  }

  walk() {
    if (this.targetX === this.x && this.targetY === this.y) {
      return
    }
    const dx = this.x - this.targetX
    const dy = this.y - this.targetY
    const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
    if (distance < this.options.speed) {
      // 距离小于一帧速度直接赋值
      this.x = this.targetX
      this.y = this.targetY
    } else {
      this.x = this.x + this.options.speed * Math.cos(this.radian)
      this.y = this.y + this.options.speed * Math.sin(this.radian)
    }
  }

  reset() {
    this.radian = 0
    this.x = this.options.x
    this.y = this.options.y
    this.targetX = this.options.x
    this.targetY = this.options.y
  }
}

export function playerFactory(texture: PIXI.Texture) {
  const frames = []
  for (let i = 0; i < 4; i++) {
    const sprite = texture.clone()
    sprite.frame = new PIXI.Rectangle(592 + 356 * i, 152, 356, 220)
    frames.push(sprite)
  }
  const player = new Player(frames)
  player.loop = true
  player.animationSpeed = 0.08
  player.play()
  return player
}
