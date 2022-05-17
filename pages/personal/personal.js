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
    coverTransition:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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