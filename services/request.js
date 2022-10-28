import {BASE_URL, TIMEOUT} from "./config"

class PRequest {

  constructor(BASE_URL, TIMEOUT) {
this.BASE_URL = BASE_URL,
this.TIMEOUT = TIMEOUT

  }
  request(options) {
  return new Promise((resolve, reject) => {
    const {url} = options
    wx.request({
      ...options,
      url: this.BASE_URL + url,
      timeout: this.TIMEOUT,
      success: (res) => {
        resolve(res.data)
      },
      fail: reject

   })
  }) 
  }

  get(options) {
    return this.request({...options,method:'get'})
  }
  post(options) {
    return this.request({...options,method: 'post'})
  }


}

export const pRequest = new PRequest(BASE_URL, TIMEOUT)