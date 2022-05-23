/**
 * 箭头类
 */
export class Arrow {
  public x = 0
  public y = 0
  public width = 60
  public height = 30
  public rotate = 0
  public fillStyle = 'rgb(57, 119, 224)'
  public storkeStyle = 'rgba(0, 0, 0, 0)'

  constructor(props?: unknown) {
    Object.assign(this, props || {})
    return this
  }

  createPath(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.moveTo(-this.width / 2, -this.height / 2)
    ctx.lineTo(this.width / 10, -this.height / 2)
    ctx.lineTo(this.width / 10, -this.height)
    ctx.lineTo(this.width / 2, 0)
    ctx.lineTo(this.width / 10, this.height)
    ctx.lineTo(this.width / 10, this.height / 2)
    ctx.lineTo(-this.width / 2, this.height / 2)
    ctx.closePath()
    return this
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.fillStyle = this.fillStyle
    ctx.strokeStyle = this.storkeStyle
    ctx.translate(this.x, this.y)
    ctx.rotate(this.rotate)
    this.createPath(ctx)
    ctx.fill()
    ctx.stroke()
    ctx.restore()
    return this
  }
}
