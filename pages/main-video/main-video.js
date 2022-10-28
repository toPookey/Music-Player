import {getTopMv} from "../../services/video"

Page({
data: {
  videoList: [],
  offset: 0,
  hasMore: true
},

//页面初始化
onLoad() {
  
  this.fetchTopMv()
},
//发送网络请求
async fetchTopMv() {
   
  const res = await getTopMv(this.data.offset)
  const finalArr = [...this.data.videoList, ...res.data]
  this.setData({videoList: finalArr})
  
  this.data.offset = this.data.videoList.length
  this.data.hasMore = res.hasMore


},

//监听下拉刷新和上拉加载
onReachBottom() {
  if(!this.data.hasMore) return
  this.fetchTopMv()
  
},
async onPullDownRefresh() {
  this.data.videoList = []
  this.data.offset = 0
  this.hasMore = true
  //重新请求数据
 await this.fetchTopMv()
      //停止下拉刷新,等数据更新后才停止
  wx.stopPullDownRefresh()
  
},

//界面的监听的方法


  
})