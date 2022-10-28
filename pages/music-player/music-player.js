

import { throttle} from "underscore"
import  palyerStore,{audioContext} from "../../stores/palyerStore"

const app = getApp()

Page({

  
  data: {
    id:0,

  stateKeys:["id","songInfo","lyricInfos","currentLyricText","currentTime","currentIndex","duration", "isPalying","modePalyIndex"],
   
     songInfo: {},
     lyricInfos: [],
     currentLyricText:'',
     currentTime: 0,
     currentIndex: -1,
     duration: 0,
     isPalying: true,
     lyricScrollTop: 0,
     palyerSong:[],
     palyerIndex: -2,
     isFirstPaly: true,

     pageTitles: ["歌曲","歌词"],
     currentPage: 0,
     currentHeight: 0,
     sliderValue:0,
     isSlader: false,
     modePalyIndex: 0,

     
     
  },

  onLoad(options) {
    const currentHeight = app.globalData.currentHeight
     this.setData({ currentHeight})
     const id = options.id
    // this.setupPalySong(id)

  if(id) {
    palyerStore.dispatch("palyMusicWithSongIdAction",id)
  }

   

   //获取共享的歌曲列表
   palyerStore.onStates(["palyerSong","palyerIndex"],this.getPalyListHandle)
     
   palyerStore.onStates(this.data.stateKeys,this.getPalyerInfosHandler)
  

  },
  upstateProgress: throttle(function(currentTime) {
    if(this.data.isSlader) return  //如果正在滑动，那么就不要改变进度
    //设置滑块的进度
    const sliderValue = currentTime / this.data.duration * 100
    this.setData({sliderValue,currentTime})
  },800, {leading:false, trailing: true}),

  //设置切换歌曲/歌词的页面
  changePage(e) {

    this.setData({currentPage: e.detail.current})

  },
  //点击切换页面
  onNavTabTap(e) {
 
    const index = e.currentTarget.dataset.index
    this.setData({currentPage: index})
  },

  //监听滑块进度的点击
  onSlidertap(e) {
    const value = e.detail.value
   const currentTime = value /100  * this.data.duration
   //设置音频从哪播放的时间
   audioContext.seek(currentTime / 1000)
   //改变开始当前时间
   this.setData({currentTime , isSlader: false ,  sliderValue: value})
  
   this.setData({isPalying: true})
  },

   
  //监听滑块的滑动
  
  onSliderChanging: throttle(function(e) {
    const currentTime = e.detail.value /100  * this.data.duration
    this.setData({currentTime})
    this.data.isSlader = true
    this.setData({isPalying: true})},100),
 

//播放或暂停
  onPasueOrPaly() {

    palyerStore.dispatch("palyMusicWithStateAction")
   

  },

  //监听上一曲和下一曲的操作
  onPreSongTab() {
   palyerStore.dispatch("palyNewMusicAction",false)
  },
  onNextSongTab() {
   
 palyerStore.dispatch("palyNewMusicAction")
 
    
  },
  //模式选择
  onModeTap() {

    palyerStore.dispatch("changePalyModeAction")

  },
  //控制列表弹窗
  ListTap() {
    const menuControl = this.selectComponent(".menu-cell")
     menuControl.showPopup()

  },

 //返回上一级
 onBackClick() {
  wx.navigateBack()
},


  //获取共享的的数据
  getPalyListHandle({palyerIndex,palyerSong}) {

      if(palyerSong) {
        this.setData({palyerSong})
      }
      if(palyerIndex !== undefined) {
        this.setData({palyerIndex})
      }

  },
  getPalyerInfosHandler({
    id,songInfo,lyricInfos,currentLyricText,currentTime,currentIndex,duration,isPalying,modePalyIndex
  }) {
   if(id !== undefined) {
     this.setData({id})
   }
   if(songInfo) {
     this.setData({songInfo})
   }
   if(lyricInfos) {
     this.setData({lyricInfos})
   }
   if(currentLyricText) {
     this.setData({currentLyricText})
   }
   if(currentTime !== undefined){
     //根据当前时间改变进度条
     this.upstateProgress(currentTime)
   }
   if(currentIndex != undefined){
     this.setData({currentIndex,lyricScrollTop: currentIndex * 35})
   }
   if(duration !== undefined){
     this.setData({duration})
   }
   if(isPalying !== undefined) {
    this.setData({isPalying})
   }
   if(modePalyIndex !== undefined) {
     this.setData({modePalyIndex})
   }
   

  },

  onUnload() {
    palyerStore.offStates(["palyerIndex","palyerSong"],this.getPalyListHandle)
    palyerStore.offStates(this.data.stateKeys,this.getPalyerInfosHandler)

  },

 
})