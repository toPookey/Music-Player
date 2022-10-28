import {pRequest} from"./request"

export function getTopMv(offset = 0, limit = 20) {

  return pRequest.get({
    url: "/top/mv",
    data: {
      limit,
      offset
    }
  })


}

export function getMvUrl(id) {

  return pRequest.get({
    url: "/mv/url",
    data: {
      id
    }
  })

}

export function getMvInfo(mvid) {

  return pRequest.get({
    url: "/mv/detail",
    data: {
      mvid
    }
  })

}

export function getRelate(id) {
  return pRequest.get({
    url: "/related/allvideo",
    data: {
      id
    }
  })

}