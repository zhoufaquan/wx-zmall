// pages/goodsHelp/helpList/helpList.js
var app = getApp()
let API = require("../../../api/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    goodsHelpList:null
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
    this.setData({
      userInfo: app.globalData.userInfo
    });
    var that = this
    wx.request({
      url: `${API.main}/helpGoods/search/${app.globalData.userId}`,
      success(res){
        console.log(res.data)
        // if( res.data.data!=null){
        //   res.data.data.map(item => {
        //     let date = new Date(item.createTime)
        //     item.yearTime = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2,'0')}/${date.getDate().toString().padStart(2,'0')}`
        //     item.dayTime = `${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}:${date.getSeconds().toString().padStart(2,'0')}`
        //   })
        // }
        that.setData({
          goodsHelpList:res.data.data
        })
        
      }
    })
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