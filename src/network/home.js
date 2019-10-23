//这里没有使用export default导出，才使用的{}的方式导入的
import {request} from "./request"
export function getMultidata() {
  return request ({
    url:'/home/multidata'
  })
}
export function getHomeGoods(type,page) {
  return request ({
    url:'/home/data',
    params:{ //这个是在后面增加信息的
      type,
      page
    }
  })

}

