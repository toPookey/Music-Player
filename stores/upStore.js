 import {HYEventStore} from "hy-event-store"
 import {getPalyList} from "../services/music"


 const rank = {newRanking:3779629  , originRanking:2884035 , upRanking:19723756 }
 const upStore = new HYEventStore({
  
   state: {
      newRanking: {},
      originRanking: {},
      upRanking: {}

   },

   actions: {
     
    fetchRankData(ctx) {
     
      for (let key in rank) {
          
           const id = rank[key]

           getPalyList(id).then(res => {
             
            ctx[key] = res.playlist
          
           })
  
      }
      

    }

   }


 })

 export default upStore