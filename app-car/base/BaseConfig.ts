/**
 * @description 基类-配置
 * @author aodazhang 2022.05.12
 */

export class BaseConfig {
  /** pixi应用实例 */
  public app: PIXI.Application = null
  /** pixi应用舞台 */
  public stage: PIXI.Container = null
  /** pixi舞台宽度 */
  public screenWidth = 0
  /** pixi舞台高度 */
  public screenHeight = 0
  /** pixi舞台中心x坐标 */
  public screenCenterX = 0
  /** pixi舞台中心y坐标 */
  public screenCenterY = 0
  /** pixi加载资源 */
  public resources: Partial<Record<string, PIXI.LoaderResource>> = {}

  /**
   * 更新pixi应用实例相关数据
   * @param app Pixi应用实例
   * @returns 无
   */
  public setApp(app: PIXI.Application) {
    this.app = app
    this.stage = app.stage
    this.screenWidth = app.screen.width
    this.screenHeight = app.screen.height
    this.screenCenterX = app.screen.width / 2
    this.screenCenterY = app.screen.height / 2
  }

  /**
   * 更新pixi应用loader加载数据
   * @param resources pixi加载资源
   */
  public setResources(resources: Partial<Record<string, PIXI.LoaderResource>>) {
    this.resources = resources
  }
}

const config = new BaseConfig()

export default config
