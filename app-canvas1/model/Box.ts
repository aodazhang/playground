export class Box {
  public x = 0
  public y = 0
  public width = 80
  public height = 80
  public vx = 0
  public vy = 0
  public rotate = 0
  public lineWidth = 0
  public fillStyle = 'rgb(57, 119, 224)'
  public storkeStyle = 'rgba(0, 0, 0, 0)'

  constructor(props?: unknown) {
    Object.assign(this, props || {})
    return this
  }

  /** 判断鼠标坐标是否在盒子内 */
  isPoint(point: { x: number; y: number }) {
    return (
      point.x >= this.x &&
      point.x <= this.x + this.width &&
      point.y >= this.y &&
      point.y <= this.y + this.height
    )
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.rotate)
    ctx.lineWidth = this.lineWidth
    ctx.fillStyle = this.fillStyle
    ctx.strokeStyle = this.storkeStyle
    ctx.beginPath()
    ctx.rect(0, 0, this.width, this.height)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    ctx.restore()
  }
}
