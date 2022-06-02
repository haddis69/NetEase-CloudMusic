import request from '../../utils/request'
// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
   bannerList:[],
   recommendList:[],
   topList:[]
  },
  toRecommendSong(){
    wx.navigateTo({
      url: '/pages/recommendSong/recommendSong',
    })
  },
  onLoad:async function() {
    let bannerListData = await request('/banner',{type:2});
    this.setData({
      bannerList:bannerListData.banners
    })
    let recommendListData=await request('/personalized',{limit:10});
    this.setData({
      recommendList:recommendListData.result
    })
    let index=0;
    let resultArr=[];
    while(index<5){
      let topListData=await request('/top/list',{idx:index++});
      let topListItem={name:topListData.playlist.name,tracks:topListData.playlist.tracks.slice(0,3)};
      resultArr.push(topListItem);
      this.setData({
        topList:resultArr
      })
    }
  }
})
