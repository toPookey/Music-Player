
import {pRequest} from "./request"


export function getMusicBanner(type = 0) {

 return pRequest.get({

    url: "/banner",
    data: {
      type
    }

 })

}

export function getPalyList(id) {

  return pRequest.get({

    url: "/playlist/detail",
    data: {
      id
    }

 })


}

export function getMenu(cat = "全部", limit = 6, offset = 0) {
  return pRequest.get({

    url: "/top/playlist",
    data: {
      cat,
      limit,
      offset
    }

 })

}

export function getMenuCategory() {
  return pRequest.get({
    url: "/playlist/hot",
    
  })


}