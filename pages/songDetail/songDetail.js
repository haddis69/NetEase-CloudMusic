import request from '../../utils/request'
import PubSub from 'pubsub-js'
//获取app实例，可以看到app.js里的全局数据
const appInstance=getApp();
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
    //如果退出之后点进来的还是这首歌，就自动播放
    if(appInstance.globalData.isMusicPlay===true&&appInstance.globalData.musicId===musicId){
      this.setData({
        isPlay:true
      })
    }
    this.backgroundManager.onPlay(()=>{
      this.setData({
        isPlay:true
      })
      appInstance.globalData.isMusicPlay=true;
      appInstance.globalData.musicId=musicId;
    })
    this.backgroundManager.onPause(()=>{
      this.setData({
        isPlay:false
      })
      appInstance.globalData.isMusicPlay=false;
    })
    this.backgroundManager.onStop(()=>{
      this.setData({
        isPlay:false
      })
    })
    appInstance.globalData.isMusicPlay=false;
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
  handleSwitch(event){
    let type=event.currentTarget.id;
    //切换歌曲的时候当前停掉
    this.backgroundManager.stop();
    PubSub.subscribe('musicId',(_,id)=>{
      this.getMusicInfo(id);
      this.musicControl(true);
      PubSub.unsubscribe('musicId');
    })
    PubSub.publish('switchTab',type)
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