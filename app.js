// app.js
App({
globalData: {
screenWidth : 375,
screenHeight: 667,
statusBarHeight: 20,
currentHeight: 500

},

onLaunch() {
  wx.getSystemInfo({
    success: (res) => {
     this.globalData.screenWidth = res.screenWidth
     this.globalData.screenHeight = res.screenHeight
     this.globalData.statusBarHeight = res.statusBarHeight
     this.globalData.currentHeight = res.screenHeight - res.statusBarHeight - 44
      
    },
  }),
  
  //对云开发进行初始化
  wx.cloud.init({
    env: "cloud1-2gy93hsd43f8f2f5"
  })


},




})
