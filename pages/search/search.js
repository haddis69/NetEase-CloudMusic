import request from '../../utils/request'
// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeHolderContent:'',
    hotList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getPlaceHolder();
    this.getHotData();
  },
  async getPlaceHolder(){
    let placeHolderData=await request('/search/default');
    this.setData({
      placeHolderContent:placeHolderData.data.showKeyword
    })
  },
  async getHotData(){
    let hotListData=await request('/search/hot/detail');
    this.setData({
      hotList:hotListData.data
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