// pages/detail-song/detail-song.js
import recommendStore from "../../stores/rankingStore"
import upStore from "../../stores/upStore"
import {getPalyList} from "../../services/music"
import palyerStore from "../../stores/palyerStore"
import menuStore from "../../stores/menuStore"

const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: "ranking",
    key: "newRanking",
    id:-1,
    songInfos: {},
    palyerSong:[],

    tabsName: '',
    title: '',

    menuList:[]
   
  },

  onLoad(options) { 
    
    const type = options.type
    this.setData({type})
    
    if (type === "ranking" ) {
      const key = options.key
      this.data.key = key
      upStore.onState(key, this.handerRanking)

    }else if (type === "recommend") {
     recommendStore.onState("recommendSongs",this.handerRanking)

    }else if (type === "menu") {
      const id = options.id
     this.data.id = id
     this.fetchgetMenuInfos()
    }else if(type === "profile") {
     const tabsName = options.tabsName
     const title = options.title
    this.setData({tabsName,title})
    this.handelProfileInfo(tabsName,title)
    
    }else if(type === "myMenu") {
     
      const _id = options._id
      this.handelMyMenuList(_id)
    }


    menuStore.onState("menuList",this.handleMenuList)

  },

   async fetchgetMenuInfos() {
       const  res = await getPalyList(this.data.id)
       this.setData({songInfos: res.playlist})
   },

   async handelProfileInfo(tabsName,title) {
     const collection = db.collection(`c_${tabsName}`)

      const res = await collection.get()
      
      this.setData({songInfos: {
        name: title,
        tracks: res.data
      }})

   },

   async handelMyMenuList(_id) {
     const menuCol = db.collection("c_menu")

     const res = await menuCol.doc(_id).get()

      
     this.setData({songInfos: {
       name: res.data.name,
       tracks: res.data.songList
     }})

   },


handerRanking(value) {
   this.setData({songInfos: value})
   wx.setNavigationBarTitle({
     title: value.name,
   })
},

cancelFavorTap() {
this.handelProfileInfo(this.data.tabsName,this.data.title)
},
cancelLikeTap() {
  this.handelProfileInfo(this.data.tabsName,this.data.title)
},
onClearTap() {
   const historyCol = db.collection("c_history")
    //  historyCol.remove().then(() => {
    //   this.handelProfileInfo(this.data.tabsName,this.data.title)
    //  })
    const _cmd = db.command
    wx.showModal({
      title: '确定清空全部？',
      content: '请选择您的操作',
      success: (res) => {
        if (res.confirm) {
            historyCol.where({
         id: _cmd.gt(0)
         }).remove().then(res => {
            this.handelProfileInfo(this.data.tabsName,this.data.title)
        })
        } 
      }
    })
    

 
},
handleMenuList(value) {

this.setData({menuList: value})

},

//获取播放歌曲的共享数据

onSongItemTap(e) {
   const index = e.currentTarget.dataset.index
   palyerStore.setState("palyerIndex", index)
   palyerStore.setState("palyerSong", this.data.songInfos.tracks) 
  
},

  onUnload() {
    if(this.data.type === "ranking") {
      upStore.offState(this.data.key, this.handerRanking)
    }else if (this.data.type === "recommend") {
      recommendStore.offState("recommendSongs",this.handerRanking)
    }
    menuStore.offState("menuList",this.handleMenuList)
  },


 
})