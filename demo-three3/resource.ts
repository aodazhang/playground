/**
 * @description 资源加载
 * @author aodazhang 2022.05.26
 */

const model: { [key: string]: string } = {}
const image: { [key: string]: string } = {}
const textures: { [key: string]: string } = {}

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
  if (/\/3d\//g.test(path)) {
    model[names[0]] = modules(path)
  } else if (/\/image\//g.test(path)) {
    image[names[0]] = modules(path)
  } else if (/\/textures\//g.test(path)) {
    textures[names[0]] = modules(path)
  }
})

export { model, image, textures }
