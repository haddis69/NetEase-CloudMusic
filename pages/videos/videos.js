import request from '../../utils/request'
// pages/videos/videos.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList:[],
    navId:'',
    videoList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getVideoGroupListData();
  },
  //获取顶部视频分类列表
  async getVideoGroupListData(){
    let result=await request('/video/group/list');
    this.setData({
      videoGroupList:result.data.slice(0,14),
      navId:result.data[0].id
    })
    this.getVideoList(this.data.navId);
  },
  //获取视频列表数据
  async getVideoList(navId){
    let result= await request('/video/group',{id:navId});
    wx.hideLoading();
    this.setData({
      videoList:result.datas
    })
  },
  changeNav(event){
    this.setData({
      navId:event.currentTarget.id,
      videoList:[]
    })
    wx.showLoading({
      title: '视频加载中',
    })
    //切换Nav的时候也要重新加载分类视频
    this.getVideoList(this.data.navId);
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