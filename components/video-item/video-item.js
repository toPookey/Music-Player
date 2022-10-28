// components/video-item/video-item.js
Component({
 properties: {
  itemData: {
    type: Object,
    value: {}
   }
 
 },
 methods: {
  onVedioItem() {

    const item = this.properties.itemData
    wx.navigateTo({
      url: `/pages/detail-vedio/detai-vedio?id=${item.id}`,
    })
     
   }
 }
})
