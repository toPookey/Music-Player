import {getMenuCategory, getMenu } from "../../services/music"

Page({


  data: {
   allMenu:[]
   
  },

  
  onLoad(options) {
   
    this.fetchAllMenu()
  },

async fetchAllMenu() {
  const finalArry = []
    const  tagsRef = await getMenuCategory()  
    const tags = tagsRef.tags
    const allPromise = []
  for(let tag of tags) {
     
    const promise  =  getMenu(tag.name)
    allPromise.push(promise)

  }

Promise.all(allPromise).then(res => {

this.setData({allMenu: res})
})

}

})