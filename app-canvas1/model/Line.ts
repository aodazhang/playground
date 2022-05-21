export class Line {
  public x = 0
  public y = 0
  public x1 = 0
  public y1 = 0
  public x2 = 0
  public y2 = 0
  public rotate = 0
  public storkeStyle = '#000'
  public lineWidth = 1
  public isMove = false

  constructor(props?: unknown) {
    Object.assign(this, props || {})
    return this
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.strokeStyle = this.storkeStyle
    ctx.lineWidth = this.lineWidth
    ctx.lineCap = 'butt'
    ctx.translate(this.x, this.y)
    ctx.rotate(this.rotate)
    ctx.beginPath()
    ctx.moveTo(this.x1, this.y1)
    ctx.lineTo(this.x2, this.y2)
    ctx.stroke()
    ctx.restore()
    return this
  }
}
