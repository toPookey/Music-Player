

import {likeCol,favorCol,menuCol,db} from "../../database/index"

Component({
  /**
   * 组件的属性列表
   */
  properties: {
   itemData: {
     type: Object,
     value: {}
   },
   index: {
     type: Number,
     value: -1
   },
   menuList: {
     type: Array,
     value: []
   }
  },

  /**
   * 组件的初始数据
   */
  data: {
    result1: false,
    result2: false

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSongTap() {
      const id = this.properties.itemData.id
      wx.navigateTo({
        url: `/pages/music-player/music-player?id=${id}`,
      })
  
      },

     async onMoreTap() {
         const id = this.properties.itemData.id
         let result1 = null
         let result2 = null
 
        result1 = await favorCol.query({id})
      
        result2 = await likeCol.query({id})
       
            this.data.result1 =  result1.data.length  ? true : false
            this.data.result2 =  result2.data.length ? true : false
           
          let item1 = this.data.result1 ? '取消收藏': '收藏'
          let item2 = this.data.result2 ? '取消喜欢': '喜欢'
          
          let titleList = [item1,item2,"添加到歌单"]
           wx.showActionSheet({
          itemList: titleList,
          success: res => {
            let index = res.tapIndex
           if (index === 0) {
            this.data.result1 ? this.handelMore(true,false,false,true,id) : this.handelMore(true,false,true,false)
           } else if(index === 1) {
            this.data.result2 ? this.handelMore(false,true,false,true,id) : this.handelMore(false,true,true,false)
           } else if(index === 2) {
             const menuNames = this.properties.menuList.map(item => item.name)
             wx.showActionSheet({
               itemList: menuNames,
               success: res => {
                 
                let index = res.tapIndex
                this.handelMenuIndex(index)
 
               }
               
             })
           }
          }
        })

      },

   async handelMore(isFavor,isLike,isAdd,isRemove,id) {
      let result = null
      let text = ''
      let isFlag1 = false
      let isFlag2 = false
      if(isFavor && isAdd) {
        result = await favorCol.add(this.properties.itemData )
        text = '添加收藏'
        isFlag1 = true
      }
      if(isFavor && isRemove) {
        result = await favorCol.remove({id},false)
        text = '取消收藏'
        isFlag1 = false
        this.triggerEvent("cancelFavorTap")
      }
      if(isLike && isAdd) {
        result = await likeCol.add(this.properties.itemData)
        text = '添加喜欢'
        isFlag2 = true
      }
      if(isLike && isRemove) {
        result = await likeCol.remove({id},false)
        text = '取消喜欢'
        isFlag2 = false
        this.triggerEvent("cancelLikeTap")
      }
      if(result) {
        wx.showToast({
          title: `${text}成功~`,
        })
        this.data.result1 = isFlag1
        this.data.result2 = isFlag2
      }
     },


     async handelMenuIndex(index) {
     const menuItem = this.properties.menuList[index]

     const _cmd = db.command

      const res = await menuCol.update(menuItem._id,{
        songList: _cmd.push(this.properties.itemData)
      })

       if(res) {
         wx.showToast({
           title: '添加成功！',
         })
       }
      

     }
     
        


  }
})
