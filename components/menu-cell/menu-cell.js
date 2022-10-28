import palyerStore from "../../stores/palyerStore"
import menuStore  from "../../stores/menuStore"
Component({
  properties: {
    songList: {
      type: Array,
      value: []
    },
    songIndex: {
      type: Number,
      value: -2
    }
   
  },

  data: {
    onShowPop: false,
    menuList: []
  
   
  },

  methods: {
    showPopup() {
      this.setData({ onShowPop: true });
    },
  
    onClose() {
         
      this.setData({onShowPop: false})
    },
    onIndexTap(e) {
        const index = e.currentTarget.dataset.index
        palyerStore.setState('palyerIndex',index)

    }
  
  },

lifetimes: {

  attached() {

    menuStore.onState("menuList",value => {
      this.setData({menuList:value})
    })
  },

  detached() {
    menuStore.offState("menuList",value => {
      this.setData({menuList:value})
    })

  }

}

})
