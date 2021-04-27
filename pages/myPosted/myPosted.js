// pages/myPosted/myPosted.js
const app = getApp();
let API = require("../../api/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList:[]
  },
 searchGoods(){
  let that = this
  wx.request({
    url: `${API.main}/goods/searchPublishGoods/${app.globalData.userId}`,
    method:"GET",
    success(res){
      console.log(res.data)
      that.setData({
        goodsList:res.data.data
      })
    }
  })
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.searchGoods()
  },

  toOrderDetail(e){

    console.log(e)
    console.log(e.currentTarget.dataset.value.goodsId)

    wx.navigateTo({
      url: '../goods/goods?goodsId='+e.currentTarget.dataset.value.goodsId
    })
    
  },
  OffShelf(e){
    console.log(e)
    let that = this
    wx.request({
      url: `${API.main}/goods/whetherToRemove/${e.currentTarget.dataset.value.goodsId}/${e.currentTarget.dataset.value.isShow}`,
      method:"GET",
      success(res){
        console.log(res.data)
        that.searchGoods()
      }
    })
  },
  editGoods(e){
    console.log(e.currentTarget.dataset.value.goodsId)
    wx.navigateTo({
      url:  '../goodsEdit/goodsEdit?goodsId='+e.currentTarget.dataset.value.goodsId,
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