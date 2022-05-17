import request from '../../utils/request'
// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
   bannerList:[],
   recommendList:[]
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
  }
})
