// components/menu-area/menu-area.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: "默认标题"
    },
    hotMenu: {
      type: Array,
      value: []
    },
    screenWidth: {
      type: Number,
      value: 375
    }
  },

 
  methods: {
    onMenu() {
    wx.navigateTo({
      url: '/pages/detail-menu/detail-menu',
    })

    }
  }
})
