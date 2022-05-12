/**
 * @description 资源加载
 * @author aodazhang 2022.05.12
 */

/**************************** 公共资源 ****************************/

/**
 * 1.public目录下所有资源会直接拷贝到dist文件夹中并和同名文件夹合并，不经webpack处理
 * 2.以下类型资源必须要放到public目录，否则影响项目体验或无法被pixi正确加载使用
 * a.启动页资源
 * b.Spritesheet（json + png）
 * c.Bitmap（xml + png）
 * d.视频（mp4）
 */
const publicResource: IPixiLoaderResource[] = [
  { name: 'desyrel', url: './bitmap/desyrel.xml' },
  { name: 'fighter', url: './spritesheet/fighter.json' }
]

/**************************** 私有资源 ****************************/

/**
 * 1.assets目录下所有资源会通过webpack处理后分发到dist各个指定文件夹中
 */
const assetsResource: IPixiLoaderResource[] = []
const modules = require.context(
  '../assets',
  true,
  /[a-zA-Z0-9_-]+.(jpg|jpeg|png|gif|bmp|svg|mp3|mp4|wav|json|xml)/
)
modules.keys().forEach(path => {
  const names = path.match(
    /(?!=\/)[a-zA-Z0-9_-]+(?=.(jpg|jpeg|png|gif|bmp|svg|mp3|mp4|wav|json|xml))/g
  )
  if (!Array.isArray(names) || !names[0]) {
    return
  }
  assetsResource.push({ name: names[0], url: modules(path) })
})

export const RESOURCE = [...publicResource, ...assetsResource]
