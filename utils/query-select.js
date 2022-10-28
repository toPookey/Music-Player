
export function querySelect(select) {
 
  return new Promise((resolve,reject) => {
    const query = wx.createSelectorQuery()
    query.select(select).boundingClientRect()
    query.exec(res => {
     resolve(res)
   
    })

  })


  // return result 这里不能直接return 出去，因为获取到的结果是异步的，只能用promise
}