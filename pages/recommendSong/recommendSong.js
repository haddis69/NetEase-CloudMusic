import request from '../../utils/request'
import PubSub from 'pubsub-js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day:0,
    month:0,
    recommendList:[],
    index:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let userInfo=wx.getStorageSync('userInfo');
    if(!userInfo){
      wx.showToast({
        title: '请先登录',
        icon:'none',
        success:()=>{
          wx.reLaunch({
            url: '/pages/login/login',
          })
        }
      })
    }
    this.setData({
      day:new Date().getDate(),
      month:new Date().getMonth()+1
    })
    this.getRecommendList();
    PubSub.subscribe('switchTab',(_,type)=>{
     let {recommendList,index}=this.data;
     if(type==='pre'){
      if(index===0){
        index=recommendList.length
      }
      index-=1;
     }else{
       if(index===recommendList.length-1){
         index=-1;
       }
      index+=1;
     }
     this.setData({
       index
     })
     let musicId=recommendList[index].id;
     PubSub.publish('musicId',musicId);
    })
  },
  async getRecommendList(){
    let result=await request('/recommend/songs');
    this.setData({
      recommendList:result.recommend
    })
  },
  toSongDetail(event){
    const {song,index}=event.currentTarget.dataset;
    this.setData({
      index
    })
    wx.navigateTo({
      url: `/pages/songDetail/songDetail?musicId=${song.id}`
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})