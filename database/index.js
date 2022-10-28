

  
 export const db = wx.cloud.database()


  class PCollection {
 
    constructor(colName) {
      this.collection = db.collection(colName)
    }
   
    add(data) {
     return this.collection.add({data})
    }

    remove(condition,isDoc = true) {
       if(isDoc) {
        
        return this.collection.doc(condition).remove()

       }else {
         return this.collection.where(condition).remove()
       }
    }

    update(condition,data,isDoc = true) {
      if(isDoc) {
       return this.collection.doc(condition).update({data})

      }else {
        return this.collection.where(condition).update({data})
      }
   }
    query( condition = {}, isDoc = false,offset=0,size = 20,) {
     
    if(isDoc) {
      return this.collection.doc(condition).get()
    }else {
      return this.collection.where(condition).skip(offset).limit(size).get()
    }

    }
    

  }

  export const likeCol = new PCollection('c_like')
  export const favorCol = new PCollection('c_favor')
  export const historyCol = new PCollection('c_history')
  export const menuCol = new PCollection("c_menu")