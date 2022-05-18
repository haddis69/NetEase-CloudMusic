import request from '../../utils/request'

let startY=0;
let moveY=0;
let distance=0;
// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransform:'translateY(0)',
    coverTransition:'',
    userInfo:{},
    recentPlayList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let userInfo=wx.getStorageSync('userInfo');
    if(userInfo){
      this.setData({
        userInfo:JSON.parse(userInfo)
      })
      //获取最近播放
      this.getRecentPlayList(this.data.userInfo.userId)
    }
  },
  async getRecentPlayList(userId){
    let result=await request('/user/record',{uid:userId,type:0});
    if(result.code===200){
      this.setData({
        recentPlayList:result.allData.slice(0,10)
      })
    }
  },
  handleTouchStart(event){
    this.setData({
      coverTransition:''
    })
    startY=event.touches[0].clientY;
  },
  handleTouchMove(event){
    //可能有多个手指，但我们要的是第一个手指的事件
    moveY=event.touches[0].clientY;
    distance=moveY-startY;
    if(distance<=0){
      return;
    }
    if(distance>=80){
      distance=80;
    }
    this.setData({
      coverTransform:`translateY(${distance}rpx)`,
    })
  },
  handleTouchEnd(){
    this.setData({
      coverTransform:'translateY(0rpx)',
      coverTransition:'transform linear 1s'
    })
  },
  toLogin(){
   wx.reLaunch({
     url: '/pages/login/login',
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