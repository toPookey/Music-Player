import {HYEventStore} from "hy-event-store"
import {parseLyric} from "../utils/parse-lyric"
import {getLyric, getSongdetail} from "../services/player"
import {historyCol} from "../database/index"
 export const audioContext = wx.createInnerAudioContext()
 const palyerStore = new HYEventStore({
   state: {
     id:0,
     songInfo: {},
     lyricInfos: [],
     currentLyricText:'',
     currentTime: 0,
     currentIndex: -1,
     duration: 0,
     isPalying: false,
   
     palyerSong:[],
     palyerIndex: -2,
    isFirstPaly: true,
    modePalyIndex: 0,

   },
   actions: {
   palyMusicWithSongIdAction(ctx, id) {
    //初始化歌曲
    ctx.songInfo = {}, 
    ctx.currentTime = 0, 
    ctx.duration = 0,
    ctx.currentLyricText = '',
    ctx.currentIndex = -1

    ctx.id  = id 
   ctx.isPalying = true
    //获取歌曲的网络数据
 getSongdetail(id).then(res=> {
  
   ctx.songInfo = res.songs[0]
   ctx.duration = res.songs[0].dt
  

   historyCol.query({id:  ctx.songInfo.id}).then(res => {
     if(res.data.length === 0) {
      historyCol.add(ctx.songInfo)
     }
  

   })

 

 })
  
 getLyric(id).then(res => {
 const lyricString = res.lrc.lyric
 const lyricInfos = parseLyric(lyricString)
 ctx.lyricInfos = lyricInfos 
 
   
 })
   //播放歌曲
  //播放下一曲时停止上一曲

  audioContext.stop()
  audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
  audioContext.autoplay = true
  
  if(ctx.isFirstPaly) {

   ctx .isFirstPaly = false
 //监听播放的时间

 audioContext.onTimeUpdate(() => {
   //获取当前播放的时间
   ctx.currentTime = audioContext.currentTime * 1000
 

 
  //匹配当前的歌词
  if(!ctx.lyricInfos.length) return
  const lyricInfos = ctx.lyricInfos
  let currentTime = audioContext.currentTime * 1000
  let index = lyricInfos.length - 1
   for (let i = 0 ; i < lyricInfos.length ; i++) {
     const currentLyric = lyricInfos[i]
     if(currentLyric.time > currentTime) {
       index = i - 1
       break
     }

   }

    //匹配出对应的歌词
   if(index === ctx.currentIndex || index === -1) return
   const currentLyricText = ctx.lyricInfos[index].text
   ctx.currentLyricText = currentLyricText
   ctx.currentIndex = index
  
 
 })
//监听暂停
audioContext.onWaiting(() => {
 audioContext.pause()
})

//暂停后继续
audioContext.onCanplay(() => {
 audioContext.play()
})
//歌曲结束后再播放
audioContext.onEnded(() => {
  
  if(ctx.modePalyIndex === 2) return
  
  this.dispatch("palyNewMusicAction")
})

  }

   },

   palyMusicWithStateAction(ctx) {

    if(!audioContext.paused) {
      audioContext.pause()
      ctx.isPalying = false
    }else {
  
      audioContext.play()
      ctx.isPalying = true
    }
   },
   
   changePalyModeAction(ctx) {
     audioContext.loop = false
    let index = ctx.modePalyIndex
    index = index + 1
    if(index === 3) index = 0

    if(index === 2 ) {
      audioContext.loop = true
    }
    
    ctx.modePalyIndex = index
  
   
   },


   palyNewMusicAction(ctx, isNext = true) {

    const length = ctx.palyerSong.length
    let index = ctx.palyerIndex
   switch(ctx.modePalyIndex) {

    case 2 : //重复播放
    case 0 : //顺序播放
    index = isNext ? index + 1 :index - 1
    if(index === length) index = 0
    if(index === -1) index = length -1
    break
    case 1 : //随机播放
    index = Math.floor(Math.random() * length)
    break
   

   }
   
    let newSong = ctx.palyerSong[index]
    
 
    //开始播放歌曲
   this.dispatch("palyMusicWithSongIdAction", newSong.id)
     
      //刷新共享数据里的索引
      ctx.palyerIndex = index
 
    // this.setData({isPalying:true})

   }


   }

 })

 export default palyerStore