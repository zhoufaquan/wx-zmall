// pages/goods/goods.js
let API = require("../../api/request")
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCollect:0,
    isLike:0,
    message: null,
    InputBottom: 0,
    show: false,
    goodsId: null,
    goods: {},
    goodsImg: null,
    goodsTitle: null,
    goodsPrice: null,
    commentList: [],
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://img14.360buyimg.com/n0/jfs/t1/151951/29/12513/140307/5feacc4eEa1970db9/3f07fd70f49ca348.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://img14.360buyimg.com/n0/jfs/t1/164386/6/5906/172869/601d195aE604d11d7/29d7f55be915d633.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://img14.360buyimg.com/n0/jfs/t1/151951/29/12513/140307/5feacc4eEa1970db9/3f07fd70f49ca348.jpg',
    }, {
      id: 3,
      type: 'image',
      url: 'https://img14.360buyimg.com/n0/jfs/t1/152188/10/16509/97317/601d18dbEf4cdd422/f69a7fd045d5e5a1.jpg',
    }, {
      id: 4,
      type: 'image',
      url: 'https://img14.360buyimg.com/n0/jfs/t1/154936/14/17070/239146/601ceed6Ebe5b3778/24127e32ba60c0a3.jpg',
    }, {
      id: 5,
      type: 'image',
      url: 'https://img14.360buyimg.com/n0/jfs/t1/159456/11/6240/141580/601ceed6Ec8ea5d98/34fd890250ac5855.jpg',
    }, {
      id: 6,
      type: 'image',
      url: 'https://img14.360buyimg.com/n0/jfs/t1/164386/6/5906/172869/601d195aE604d11d7/29d7f55be915d633.jpg',
    }],
  },
  changeAppreciate(e){
   console.log("like")
   console.log(this.data.goodsId)
   this.setData({
     isLike:!this.data.isLike
   })
   var that = this
   wx.request({
     url: `${API.main}/goods/goodsLike/${this.data.goodsId}/${app.globalData.userId}`,
     method:'GET',
     success(res){
       console.log(res.data.data)
       
       that.setData({
        isCollect:res.data.data.likeCollect.guCollect,
        isLike:res.data.data.likeCollect.guLike,
        goods:res.data.data.goods,
        
      })
     }
   })
  },
  changeCollect(e){
    console.log("collect")
    console.log(this.data.goodsId)
    this.setData({
      isCollect:!this.data.isCollect
    })
    console.log(this.data.isCollect)
    var that = this
    wx.request({
      url: `${API.main}/goods/goodsCollect/${this.data.goodsId}/${app.globalData.userId}`,
      method:'GET',
      success(res){
        console.log(res.data.data)
        that.setData({
          isCollect:res.data.data.likeCollect.guCollect,
          isLike:res.data.data.likeCollect.guLike,
          goods:res.data.data.goods,
        })
      }
    })
  },
  buyHome(e) {
    console.log("buyHome")
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  CommodityMessage(e) {
    this.setData({
      show: true
    })
  },
  messageCancel(e) {
    this.setData({
      show: false
    })
  },
  messageSend(e) {
    console.log(e)
    console.log(this.data.message)
    console.log(app.globalData.userId)
    console.log(this.data.goodsId)

    wx.request({
      url: `${API.main}/goods/goodsMessage/${this.data.goodsId}/${app.globalData.userId}/${this.data.message}`,
      method: 'post',
      success: (res) => {
        console.log(res.data)
        this.setData({
          show: false
        })
        if (res.data.code == 1) {
          this.loadComment();
        }
      },

      fail: res => {

      }
    })

  },
  //复用函数
  loadComment() {
    wx.request({
      url: `${API.main}/goods/goodsMessage/${this.data.goodsId}`,
      success: (res) => {
        console.log(res.data)
        if( res.data.data!=null){
        res.data.data.map(item => {
          let date = new Date(item.createTime)
          item.yearTime = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2,'0')}/${date.getDate().toString().padStart(2,'0')}`
          item.dayTime = `${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}:${date.getSeconds().toString().padStart(2,'0')}`
        })
      }
        this.setData({
          commentList: res.data.data
        })
      }
    })
  },
  messageInput(e) {
    this.setData({
      message: e.detail.value
    })
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  buyGoods() {
    console.log('hhhhhhhhhhhhhhhhh')
    console.log(this.data.goods)
    wx.navigateTo({
      url: `/pages/pay/pay?goodsImg=${this.data.goodsImg}&goodsTitle=${this.data.goodsTitle}&goodsPrice=${this.data.goodsPrice}&goodsId=${this.data.goodsId}`,
    })
  },
  changeChat() {
    wx.navigateTo({
      url: '/pages/chat/chat',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options)
    let goodsId = options.goodsId
    var that = this
    wx.request({
      url: `${API.main}/goods/get/${goodsId}`,
      //  url:'${API.main}/goods/get'+options.goodsId,
      success(res) {
        console.log(res.data)
        console.log(res.data.goodsImg)
        that.setData({
          goods: res.data,
          goodsImg: res.data.goodsImg,
          goodsTitle: res.data.goodsTitle,
          goodsPrice: res.data.goodsPrice,
          goodsId: res.data.goodsId,
        })
        that.loadComment();
      }
    })

  },
  InputFocus(e) {
    this.setData({
      InputBottom: e.detail.height
    })
  },
  InputBlur(e) {
    this.setData({
      InputBottom: 0
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

  }
})