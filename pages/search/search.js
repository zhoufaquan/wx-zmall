// pages/search/search.js
let API = require("../../api/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
     goods:[],
     value:null
  },
  onSearch(e) {
    // debugger
    this.setData({
      value: e.detail,
    });
    var that = this
    console.log(that.data.value)
    if(that.data.value!=''){
      wx.request({
        url:`${API.main}/goods/goodsSearch/`,
        method:'post',
        data:{
          value:that.data.value
        },
        success(res) {
          console.log(res.data)
          that.setData({
            goods: res.data
          })
          }
      })
    }
    
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