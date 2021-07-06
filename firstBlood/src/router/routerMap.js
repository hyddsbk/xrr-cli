import {asyncRouterMap} from './asyncRouterMap'

let routerMap = {}

asyncRouterMap.forEach(item => {
  let children = item.children
  if(!children || children.length < 1) return
  children.forEach(v => {
    routerMap[`${item.path}/${v.path}`] = v.meta.role
  })
})

export default  routerMap
