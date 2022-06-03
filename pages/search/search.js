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
    searchList:[],
    historyList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getPlaceHolder();
    this.getHotData();
    this.getHisrotyList();
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
    let {searchContent,historyList}=this.data;
    if(historyList.indexOf(searchContent)===-1){
      historyList.unshift(searchContent)
    }else{
      historyList.splice(historyList.indexOf(searchContent),1);
      historyList.unshift(searchContent);
    }
    let searchListData=await request('/search',{keywords:searchContent,limit:10});
    this.setData({
      searchList:searchListData.result.songs,
      historyList
    })
    wx.setStorageSync('searchHistory', historyList)
  },
  getHisrotyList(){
    let historyList = wx.getStorageSync('searchHistory');
    this.setData({
      historyList
    })
  },
  clearSearchContent(){
    this.setData({
      searchContent:''
    })
  },
  clearSearchHistory(){
    wx.showModal({
      title: '确认删除吗',
      success:(res)=>{
        if(res.confirm===true){
          this.setData({
            historyList:[]
          })
          wx.removeStorageSync('searchHistory');
        }
      }
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