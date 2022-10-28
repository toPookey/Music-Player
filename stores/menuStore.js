
import {HYEventStore} from "hy-event-store"
import {menuCol} from "../database/index"
const menuStore = new HYEventStore({

  state: {
    menuList: []
  },

  actions: {
  async  fetchMenuListAction(ctx) {
// 获取歌单的数据
 const res = await  menuCol.query()
   
    ctx.menuList = res.data

   }

  }
})

menuStore.dispatch("fetchMenuListAction")
export default menuStore