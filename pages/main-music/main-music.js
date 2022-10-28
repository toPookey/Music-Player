// pages/main-music/main-music.js
import {getMusicBanner,  getMenu} from "../../services/music"
import recommendStore from "../../stores/rankingStore"
import upStore from "../../stores/upStore"
import  palyerStore from "../../stores/palyerStore"
import {querySelect} from "../../utils/query-select"
import {throttle} from "underscore"

//使用节流函数
const querySelectThrottle = throttle(querySelect, 100)
const app = getApp()
Page({

  data: {
  searchValue: '',
  bannerUrl: '',
  bannerHeight: 150,
  recomSongs : [],
  hotMenu: [],
  recommendMenu: [],
  screenWidth: 375,
  rankingInfos: {},

  songInfo: {},
  isPalying: true,
  palyerSong: [],
  palyerIndex: -2
   


  },
onLoad() {

this.handelNewPageData()

},


 handelNewPageData() {
//获取轮播图数据
this.fetchBanner()
//获取推荐歌曲
// this.fetchPlayList()
recommendStore.onState("recommendSongs", this.handlerecommendSongs)
recommendStore.dispatch("fetchPlayList")

upStore.onState("newRanking",this.handleNewRanking)
upStore.onState("originRanking",this.handleOriginRanking)
upStore.onState("upRanking",this.handleUpRanking)
upStore.dispatch("fetchRankData")
//获取热门、推荐歌单
this.fetchgetMenu()

//获取屏幕的宽度
this.setData({screenWidth: app.globalData.screenWidth})


     
 palyerStore.onStates(["songInfo","isPalying","palyerSong","palyerIndex"], this.HandlePalyBarMusic)
 },

 async fetchBanner() {

    const res = await getMusicBanner()
     this.setData({bannerUrl: res.banners})
   
 },

 async fetchgetMenu() {
   
   getMenu().then(res => {
    this.setData({hotMenu:res.playlists})
  })
 
   getMenu("华语").then(res => {
    this.setData({recommendMenu: res.playlists})
   })
 


 },

//跳转到搜索页
  onSearchClick() {
    wx.navigateTo({
      url: '/pages/detail-search/detail-search',
    })
  },


  onImgLoad(e) {

//获取image组件的高度
this.fetchQuerySelect()

  },

 async fetchQuerySelect() {
    const res =  await querySelectThrottle(".banner-image")
     this.setData({bannerHeight: res[0].height})
  },



  //跳转到推荐歌曲
  onRecommond() {
    wx.navigateTo({
      url: '/pages/detail-song/detail-song?type=recommend',
    })
  },

  //收集播放列表
  onSongItemTap(e) {
      const index = e.currentTarget.dataset.index
      palyerStore.setState("palyerIndex", index)
      palyerStore.setState("palyerSong", this.data.recomSongs)
      
  },
  onPlayOrPauseTap() {
    palyerStore.dispatch("palyMusicWithStateAction")

  },
  onAlbumTap() {
   wx.navigateTo({
     url: '/pages/music-player/music-player',
   })
  },

  //控制列表弹窗
  ListTap() {
 
  const menuControl = this.selectComponent(".menu-cell")
  menuControl.showPopup()

  },

  //从store中获取数据

  handlerecommendSongs(value) {
       
    if(!value.tracks) return

     this.setData({recomSongs: value.tracks.slice(0,6)})
     
  },

  handleNewRanking(value) {
   const newRankingInfos = {...this.data.rankingInfos, newRanking: value}
     this.setData({rankingInfos: newRankingInfos})
  },
  handleOriginRanking(value) {
    const newRankingInfos = {...this.data.rankingInfos, originRanking: value}
      this.setData({rankingInfos: newRankingInfos})
   },
   handleUpRanking(value) {
    const newRankingInfos = {...this.data.rankingInfos, upRanking: value}
      this.setData({rankingInfos: newRankingInfos})
   },

   HandlePalyBarMusic({songInfo,isPalying,palyerSong,palyerIndex}) {
   
     if(songInfo) {
       this.setData({songInfo})
     }
     if(isPalying !== undefined) {
       this.setData({isPalying})
     }
     if(palyerSong) {
       this.setData({palyerSong})
     }
     if(palyerIndex !== undefined) {
       this.setData({palyerIndex})
     }

   },

   async onPullDownRefresh() {
  this.data.searchValue ='',
  this.data.bannerUrl = '',
  this.data.recomSongs = [],
  this.data.hotMenu = [],
  this.data.recommendMenu = [],
  this.data.rankingInfos = {},
  this.data.songInfo = {},
  this.data.isPalying = true,
  this.data.palyerSong = [],

   await this.handelNewPageData()
        //停止下拉刷新,等数据更新后才停止
    wx.stopPullDownRefresh()


    
  },




  onUnload() {
    recommendStore.offState("recommendSongs", this.handlerecommendSongs)
    upStore.offState("newRanking",this.handleNewRanking)
    upStore.offState("originRanking",this.handleOriginRanking)
    upStore.offState("upRanking",this.handleUpRanking)  
  },

  
})