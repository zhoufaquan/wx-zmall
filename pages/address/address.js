// pages/me/address/address.js
const tools = require('../../utils/tools.js');
let API = require("../../api/request")
var app = getApp();
Page({
  data: {
    list: []
  },
  onLoad: function (options) {
    
  },
  edit: function (e) {
    console.log(this.data.list[e.currentTarget.dataset.index])
    var address = this.data.list[e.currentTarget.dataset.index]
    console.log(address)
    wx.navigateTo({
      url: '/pages/address/add-address/add-address?address=' + JSON.stringify(address)
    })
  },
  onShow: function (options) {
    var vm = this;
    // tools.request(app.globalData.url + "/info/Address", 'post', {})
    //   .then(resp => {
    //     console.log("收到服务器回复地址信息", resp.data.data)
    //     vm.setData({
    //       list: resp.data.data
    //     })
    //   })
    wx.request({
      url: `${API.main}/info/selectAddress/${app.globalData.userId}`,
      method: 'POST',
      success(res) {
        console.log("收到服务器回复地址信息", res.data)
        vm.setData({
          list: res.data.data
        })
      }
    })
  },
  //增加地址
  addAddre: function () {
    wx.navigateTo({
      url: '/pages/address/add-address/add-address'
    })
  },
  //选择地址
  select: function (e) {
    //为上一个页面的data赋值
    var pages = getCurrentPages(); // 获取页面栈
    var currPage = pages[pages.length - 1]; // 当前页面
    var prevPage = pages[pages.length - 2]; // 上一个页面
    if (prevPage.__route__ == 'pages/pay/pay') {
      var address = {
        name: e.currentTarget.dataset.name,
        address: e.currentTarget.dataset.address,
        phone: e.currentTarget.dataset.phone,
        id: e.currentTarget.dataset.id
      }
      console.log("为上一个页面的address赋值", address)
      prevPage.setData({
        address: address
      })
      wx.navigateBack({
        delta: 1
      })
    }
  }
})