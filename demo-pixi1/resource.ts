/**
 * @description 资源加载
 * @author aodazhang 2022.05.27
 */

const assets: IPixiLoaderResource[] = []

const modules = require.context(
  './assets',
  true,
  /[a-zA-Z0-9_-]+.(jpg|jpeg|png|gif|bmp|svg|mp3|mp4|wav|json|xml|gltf)/
)

modules.keys().forEach(path => {
  const names = path.match(
    /(?!=\/)[a-zA-Z0-9_-]+(?=.(jpg|jpeg|png|gif|bmp|svg|mp3|mp4|wav|json|xml|gltf))/g
  )
  if (!Array.isArray(names) || !names[0]) {
    return
  }
  const name = names[0]
  const url = modules(path)

  assets.push({ name, url })
})

export { assets }
