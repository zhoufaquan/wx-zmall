// pages/goodsHelp/goodsHelp.js
let API = require("../../api/request")
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  formSubmit(e){
    console.log(e)
    wx.request({
      url:`${API.main}/helpGoods/publish`,
      method:'POST',
      data:{
        telephone:e.detail.value.telephone,
        goodsTitle:e.detail.value.goodsTitle,
        goodsDescription:e.detail.value.goodsDescription,
        userId:app.globalData.userId
      },
      success(res){
        console.log(res)
        wx.navigateTo({
          url: '/pages/goodsHelp/helpList/helpList',
        })
      }
      
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})