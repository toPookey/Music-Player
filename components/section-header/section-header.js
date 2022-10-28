// components/section-header/section-header.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
     title: {
       type: String,
       value: "默认标题"
     },
     hasMore: {
       type: Boolean,
       value: true
     },
     isHistory: {
       type: Boolean,
       value: false
     }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  
  methods: {
    onMore() {
     this.triggerEvent("onMoreClick")

    },
    onClearTap() {
      this.triggerEvent("onClearTap")
    }
  }
})
