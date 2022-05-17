import request from '../../utils/request'
// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    password:''
  },
  async login(){
    let {phone,password}=this.data;
    if(!phone){
      wx.showToast({
        title: '手机号不能为空',
        icon:'none'
      })
      return;
    }
    let phoneReg=/^1(3|4|5|6|7|8|9)\d{9}$/
    if(!phoneReg.test(phone)){
      wx.showToast({
        title: '手机号格式不正确',
        icon:'none'
      })
      return;
    }
    if(!password){
      wx.showToast({
        title: '密码不能为空',
        icon:'none'
      })
      return;
    }
    let result = await request('/login/cellphone',{phone,password})
    if(result.code===200){
      wx.showToast({
        title: '登录成功',
        icon:'success'
      })
    }else if(result.code===400){
      wx.showToast({
        title: '手机号错误',
        icon:'error'
      })
    }else if(result.code===502){
      wx.showToast({
        title: '密码错误',
        icon:'error'
      })
    }else{
      wx.showToast({
        title: '登录失败请重新尝试',
        icon:'error'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  handleInput(event){
    let type=event.currentTarget.id;//phone || password
    this.setData({
      [type]:event.detail.value
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