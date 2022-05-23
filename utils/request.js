import config from './config'
export default (url,data={},method='GET')=>{
  return new Promise((resovle,reject)=>{
    wx.request({
      url:config.host+url,
      data,
      method,
      header:{
        //cookie是一个数组，每次返回的数据都是乱的，所以不能用下标
        cookie:wx.getStorageSync('cookies')?wx.getStorageSync('cookies').find(item=>item.indexOf('MUSIC_U')!==-1):''
      },
      success:(res)=>{
        // console.log('请求成功',res);
        if(data.isLogin){
          //保存cookies
          // console.log(res.cookies);
          wx.setStorageSync('cookies', res.cookies);
        }
        resovle(res.data);
      },
      fail:(err)=>{
        // console.log('请求失败',err);
        reject(err);
      }
    })
  })
}