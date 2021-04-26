// pages/pay/pay.js
var app = getApp()
let API = require("../../api/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId: null,
    goodsImg: null,
    goodsTitle: null,
    goodsPrice: null,
    address: '',
  },


  onClose() {
    this.setData({ show: false });
  },
  submitOrder: function (e) {
    

    var that = this
    wx.request({
      url: `${API.main}/order/createOrder`,
      method: 'post',
      data: {
        userId:app.globalData.userId,
        goodsId:that.data.goodsId,
        userAddress:that.data.address,
      },
      success(res) {
        that.setData({ orderId: res.data });
        console.log(res.data)

        wx.navigateTo({
          url: `/pages/password/pay?orderId=${res.data }`,
        })
      },
    })
  },
  cancelOrde() {
    wx.request({
      url: `${API.main}/goods/createOrder/${app.globalData.userId}/${that.data.goodsId}`,
    })
    wx.navigateTo({
      url: '/pages/pay-result/pay-result',
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      goodsImg: options.goodsImg,
      goodsTitle: options.goodsTitle,
      goodsPrice: options.goodsPrice,
      goodsId: options.goodsId
    })
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