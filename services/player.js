import {pRequest} from "../services/request"


export function getSongdetail(ids) {

 return pRequest.get({
  url: "/song/detail",
  data: {
    ids
  }


 })


}

export function getLyric(id) {

  return pRequest.get({
    url: "/lyric",
    data: {
      id
    }
  
  
   })
}

