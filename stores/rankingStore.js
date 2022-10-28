import {HYEventStore} from "hy-event-store"
import {getPalyList} from "../services/music"
const recommendStore = new HYEventStore({

 state: {

  recommendSongs:[]
 },
 actions: {
     async fetchPlayList(ctx) {
      
  const res = await getPalyList(3778678)
  const palyList = res.playlist
  // const recomSongs = palyList.tracks
   ctx.recommendSongs = palyList
 
 
},
 }

})
export default recommendStore