/**
 * 小球类
 */
export class Ball {
  public x = 0
  public y = 0
  public radius = 20
  public scaleX = 1
  public scaleY = 1
  public fillStyle = 'rgb(57, 119, 224)'
  public storkeStyle = 'rgba(0, 0, 0, 0)'
  public alpha = 1

  constructor(props?: unknown) {
    Object.assign(this, props || {})
    return this
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.fillStyle = this.fillStyle
    ctx.strokeStyle = this.storkeStyle
    ctx.globalAlpha = this.alpha
    ctx.translate(this.x, this.y)
    ctx.scale(this.scaleX, this.scaleY)
    ctx.beginPath()
    ctx.arc(0, 0, this.radius, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()
    ctx.restore()
    return this
  }
}
