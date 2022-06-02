import request from '../../utils/request'
// pages/songDetail/songDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay:false,
    song:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //options默认是一个空对象，如果有 query参数就是一个有值的对象
    //options的长度不能太长
    let {musicId}=options;
    //创建音乐播放的实例
    this.backgroundManager=wx.getBackgroundAudioManager();
    this.backgroundManager.onPlay(()=>{
      this.setData({
        isPlay:true
      })
    })
    this.backgroundManager.onPause(()=>{
      this.setData({
        isPlay:false
      })
    })
    this.backgroundManager.onStop(()=>{
      this.setData({
        isPlay:false
      })
    })
    this.getMusicInfo(musicId);
  },
  async getMusicInfo(musicId){
    let songData = await request('/song/detail',{ids:musicId});
    this.setData({
      song:songData.songs[0]
    })
    wx.setNavigationBarTitle({
      title: this.data.song.name,
    })
  },
  handleMusicPlay(){
    let isPlay=!this.data.isPlay;
    // this.setData({
    //   isPlay
    // })
    this.musicControl(isPlay);
  },
  //控制音乐播放的功能函数
  async musicControl(isPlay){
    if(isPlay){
      let musicLinkData=await request('/song/url',{id:this.data.song.id});
      let musicLink=musicLinkData.data[0].url;
      this.backgroundManager.src=musicLink;
      this.backgroundManager.title=this.data.song.name;
    }else{
      this.backgroundManager.pause();
    }
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