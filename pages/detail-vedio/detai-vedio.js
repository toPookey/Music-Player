// pages/detail-vedio/detai-vedio.js
import {getMvUrl,getMvInfo, getRelate} from "../../services/video"

Page({

  data: {
    id: 0,
    mvUrl: '',
    mvInfo: {},
    mvRelate: []


  },

  //获取id
  onLoad(options) {
    
    this.setData({id: options.id})

    //获取mv的地址
    this.fetchMvUrl()
    //获取mv的详细信息
    this.fetchMvInfo()
    //获取相关的视频
   this.fetchRelate()

  },

async fetchMvUrl() {

  const res = await getMvUrl(this.data.id) 
  this.setData({mvUrl: res.data.url})

},

async fetchMvInfo() {

  const res = await getMvInfo(this.data.id) 
  this.setData({mvInfo: res.data})
  
},
  
async fetchRelate() {
 
  const res = await getRelate(this.data.id)
   this.setData({mvRelate: res.data})

}


 
})