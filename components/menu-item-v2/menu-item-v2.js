
import {menuCol} from "../../database/index"

Component({
  /**
   * 组件的属性列表
   */
  properties: {
     itemData: {
       type: Object,
       value: {}
     }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
   async onDeleteTap() {
     const _id = this.properties.itemData._id
   const result= await menuCol.remove(_id)
   if(result) {
    wx.showToast({
      title: '删除歌单成功！',
    })

    this.triggerEvent("onDeleteTap")

   }
 
    }
  }
})
