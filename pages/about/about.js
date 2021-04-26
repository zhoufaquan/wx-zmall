// pages/about/about.js
var app=getApp()
let API = require("../../api/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentNavBarName: 'about',
    userInfo: {},
    countLike:0,
    countCollect:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that = this
  wx.request({
    url:`${API.main}/likeCollect/searchGoodsFans/${app.globalData.userId}`,
    method:'GET',
    success(res){
      console.log(res.data)
      that.setData({
        countLike:res.data.data.countLike,
        countCollect:res.data.data.countCollect
      })
    }
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
    this.setData({
      userInfo: app.globalData.userInfo
    });
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

  },
  changeNavBar(event) {
    let currentNavBarName = event.currentTarget.dataset.name;
    if(currentNavBarName == this.data.currentNavBarName) {
      return;
    }
    this.setData({
      currentNavBarName: event.currentTarget.dataset.name
    })
    if(currentNavBarName == 'home'){
      wx.navigateTo({
        url: '/pages/home/home',
      })
    }

  },
  // 加载模态框
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
   onSelectPublish(e) {
      console.log(e.currentTarget.dataset.name)
      if( e.currentTarget.dataset.name == 'buying-info'){
        wx.navigateTo({
          url: '/pages/goodsHelp/goodsHelp',
        })
      }else{
        wx.navigateTo({
          url: '/pages/publish/publish',
        })
      }
      this.setData({
        modalName: null
      })
   }
})