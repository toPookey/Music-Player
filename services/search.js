import {pRequest} from "./request"

export function getHotSearch() {
  return pRequest.get({
    url: "/search/hot"
  })
}

export function getSuggestSearch(value) {
  return pRequest.get({
    url: "/search/suggest",
    data: {
      keywords: value
    }
  
  })
}

export function getSearchResult(value) {
  return pRequest.get({
   url: "/search",
   data: {
    keywords: value
  }

  })
}