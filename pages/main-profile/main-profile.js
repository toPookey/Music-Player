// pages/main-profile/main-profile.js
import {menuCol} from "../../database/index"
import menuStore from "../../stores/menuStore"
Page({
    data : {
       userInfo: {},
       isLogin: false,

       isShowDialog: false,
        
       menuList: [],

      menuSongName: " ",

       tabs: [
         {name: "我的收藏", type: "favor"},
         {name: "我的喜欢", type: "like"},
         {name: "历史记录", type: "history"}
       ]

    },

     onLoad() {

       //判断用户是否登录

       const openid = wx.getStorageSync('openid')
       const userInfo = wx.getStorageSync('userInfo')

       this.setData({isLogin: !!openid})

       if(this.data.isLogin) {
         this.setData({userInfo})
       }
       
       menuStore.onState("menuList", this.handelMenuList)

     },
  
  //事件监听

   async onUserInfoTap() {

   //1.获取用户的头像和昵称 

   const profile = await  wx.getUserProfile({
       desc: '获取用户的头像和昵称',
     })


   //2.获取openid

   const loginRes = await wx.cloud.callFunction({
     name: "music-login"
   })
    const openid = loginRes.result.openid


  wx.setStorageSync('openid', openid)
  wx.setStorageSync('userInfo', profile.userInfo)

  this.setData({userInfo: profile.userInfo, isLogin: true})

  },

  onProfileTap(e) {
   
    const item = e.currentTarget.dataset.item
    
    wx.navigateTo({
      url: `/pages/detail-song/detail-song?type=profile&tabsName=${item.type}&title=${item.name}`,
    })


  },
  onAddTap() {
     

    this.setData({isShowDialog: true})

  },

 async onConfirmTap() {
   let menuName = this.data.menuSongName
  let result = null
   //模拟数据
    const menuRecord = {
      name: menuName,
      songList: []
    }

   result = await menuCol.add(menuRecord)
   
   if(result) {
     wx.showToast({
       title: '添加歌单成功！',
     })
   }

   menuStore.dispatch("fetchMenuListAction")

  },
  onInput() {},



  //获取歌单数据
  handelMenuList(value) {
  this.setData({menuList: value})
  },

  onDeleteTap() {
    menuStore.dispatch("fetchMenuListAction")
  },

  onMenuListTap(e) {
    let menuName = this.data.menuSongName
    const index = e.currentTarget.dataset.index
    const _id = this.data.menuList[index]._id
    wx.navigateTo({
      url: `/pages/detail-song/detail-song?type=myMenu&_id=${_id}`,
    })

  },

  onunload() {
    menuStore.offstate("menuList", this.handelMenuList)
  }

})