import request from '../../utils/request'
// pages/videos/videos.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList:[],
    navId:'',
    videoList:[],
    videoId:'',
    videoUpdateTime:[]
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
  handlePlay(event){
    let vid=event.currentTarget.id;
    //this.vid!==vid表示不是同一首歌继续播放或关闭
    //this.videoContext保证不是第一首歌，否则undefined下的stop()就会报错
    //赋给this，意思是不管点多少个视频，也只有这一个属性，后面的会覆盖前面的
    //video里加上了autoplay，一旦video标签显示就会自动播放
    this.vid!==vid&&this.videoContext&&this.videoContext.stop();
    this.vid=vid;
    this.setData({
      videoId:vid
    })
    this.videoContext=wx.createVideoContext(vid);
    //跟下面的视频播放的回调handleTimeUpdate同理
    //如果播放记录里有当前视频的vid，就直接调用wx.createVideoContext实例的seek方法
    //seek的参数是秒，直接定位到指定的视频位置
    let {videoUpdateTime}=this.data;
    let videoItem=videoUpdateTime.find(item=>item.vid===vid);
    if(videoItem){
      this.videoContext.seek(videoItem.currentTime);
    }
  },
  //视频播放的回调
  handleTimeUpdate(event){
    let videoTimeObj={vid:event.currentTarget.id,currentTime:event.detail.currentTime};
    let {videoUpdateTime}=this.data;
    let videoItem=videoUpdateTime.find(item=>item.vid===event.currentTarget.id);
    if(videoItem){
      videoItem.currentTime=event.detail.currentTime
    }else{
      videoUpdateTime.push(videoTimeObj);
    }
    this.setData({
      videoUpdateTime
    })
  },
  handleEnded(event){
    let vid=event.currentTarget.id;
    let {videoUpdateTime}=this.data;
    //findIndex方法可以找到数组中指定条件的元素的角标
    let index=videoUpdateTime.findIndex(item=>item.vid===vid);
    videoUpdateTime.splice(index,1);
    this.setData({
      videoUpdateTime
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