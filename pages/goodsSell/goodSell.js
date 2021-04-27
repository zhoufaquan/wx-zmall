// pages/goodsSell/goodSell.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'
const app = getApp();
let API = require("../../api/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    order: [{
      id: '1',
      orderSn: '20180320',
      createTime: '2019-08-18 18:35',
      payType: '微信',
      productList: [{
        id: '1',
        picUrl: 'https://yanxuan.nosdn.127.net/1979054e3a1c8409f10191242165e674.png',
        title: '常温纯牛奶 250毫升*12盒*2提',
        specDesc: '纯牛奶 12盒*2提',
        status: 1,
        count: 1,
        price: 88.00
      }],
      totalPrice: 88.00,
      expressPrice: 0.00,
      actualPrice: 88.00,
      orderStatus: 1
    }
  ]
  },
  searchOrder(){
    wx.request({
      url: `${API.main}/order/searchOrderSeller/${app.globalData.userId}`,
      method: 'GET',
      success: res => {
        console.log(res.data.data)
        let order = new Array();
        res.data.data.forEach(item => {
          let goodsList = [{
            id:item.goodsId,
            picUrl: item.imgUrl,
            title: item.goodsTitle,
            specDesc: item.description
          }]
          let orderItem = {
            id: item.orderId,
            orderSn: item.orderNum,
            orderStatus: item.orderStatus,
            payStatus:item.payStatus,
            actualPrice:item.goodsPrice,
            productList:goodsList
          }
          order.push(orderItem)
        })
        this.setData({
          order: order
        })
        console.log
      }
    })
  },
  deleteOrder: function (e) {
    Dialog.confirm({
      message: '要删除此订单？'
    }).then(() => {
      // on confirm
      let id = e.currentTarget.dataset.value.id;
      let data = [];
      this.data.orderList.forEach(function (v) {
        if (id != v.id) {
          data.push(v);
        }
      })
      this.setData({
        orderList: data
      })
    }).catch(() => {
      // on cancel
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.searchOrder()
  },
  confirmDelivery(e){
    console.log(e.target.dataset.value)
    let that = this
    wx.request({
      url: `${API.main}/order/orderSendStatus/${e.target.dataset.value.id}`,
      method:'GET',
      success(res){
        console.log(res.data)
        that.searchOrder()
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