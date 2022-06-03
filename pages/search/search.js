import request from '../../utils/request'
let isSend=false;
// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeHolderContent:'',
    hotList:[],
    searchContent:'',
    searchList:[]
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
  handleInputChange(event){
    this.setData({
      searchContent:event.detail.value
    })
    if(isSend){
      return;
    }
    isSend=true;
    this.getSearchList();
    setTimeout(()=>{
      isSend=false
    },3000)
  },
  async getSearchList(){
    if(!this.data.searchContent){
      this.setData({
        searchList:[]
      })
      return
    }
    let searchListData=await request('/search',{keywords:this.data.searchContent,limit:10});
    this.setData({
      searchList:searchListData.result.songs
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