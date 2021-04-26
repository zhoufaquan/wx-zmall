// pages/ucenter/order/order.js
let API = require("../../api/request")
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: null,
    active: 0,
    loading: false,
    orderList: [],
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '订单中心',
    })
    // 获取参数
    let type = options.type;
    if (type) {
      this.setData({
        active: type
      })
    }
    wx.request({
      url: `${API.main}/order/search/${app.globalData.userId}`,
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
      }
    })
    // 模拟加载数据
    this.loadData(type)
  },

 
  loadData: function (type) {
    this.setData({
      loading: true
    })
    if (type && type != '00') {
      //过滤器 type = name 10 待付款 20 待发货 21 待收货 31 (确认收货)待评价
      // CANCELED(50,"已取消",0),//取消订单，状态值
      // TO_BE_PAID(10,"待付款",0),//显示取消图标
      // TO_BE_DELIVERED (20, "已付款(待发货)",0),
      // DELIVERED(21, "待收货(已发货)",1),
      // TO_BE_EVALUATED(31, "待评价(交易成功)",1),//显示删除图标
      // DELETED(41, "删除成功",1);//删除图标，状态值
      let data = this.data.order.filter(item => item.orderStatus == type);
      this.setData({
        orderList: data,
        loading: false
      })
    } else {
      let that = this;
      setTimeout(function () {
        that.setData({
          loading: false,
          orderList: that.data.order
        })
      }, 500)
    }
  },
  changeTab: function (e) {
    let type = e.detail.name;
    // 模拟加载数据
    this.loadData(type)
   
  },
  scrollListen: function (e) {
    console.log("滑到底部啦 该加载下一页数据啦")
  },
  cancelOrder: function (e) {
    Dialog.confirm({
      message: '要取消此订单？'
    }).then(() => {
      // on confirm
      let index = e.currentTarget.dataset.index;
      this.setData({
        [`orderList[${index}].orderStatus`]: -1
      })
      for (let i = 0; i < this.data.orderList[index].productList.length; i++) {
        this.setData({
          [`orderList[${index}].productList[${i}].status`]: -1
        })
      }
    }).catch(() => {
      // on cancel
    });
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
  confirmReceive: function (e) {
    console.log(e)
    var that = this
    Dialog.confirm({
      message: '确收到货物？'
    }).then(() => {
      // on confirm
      wx.request({
         url: `${API.main}/order/pendingStatus/${e.currentTarget.dataset.orderid}`,
         success(res){
           console.log(res)
         }
      })
      // let index = e.currentTarget.dataset.index;
      // this.setData({
      //   [`orderList[${index}].orderStatus`]: 3
      // })
      // for (let i = 0; i < this.data.orderList[index].productList.length; i++) {
      //   this.setData({
      //     [`orderList[${index}].productList[${i}].status`]: 3
      //   })
      // }
    }).catch(() => {
      // on cancel
    });
  },
  toPay: function (e) {
    console.log(e)
    let actualPrice = e.currentTarget.dataset.value.actualPrice;
    wx.showModal({
      title: '提示',
      content: '此处需调用微信支付接口',
      showCancel: false,
      confirmColor: '#b4282d',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: `${API.main}/order/updateOrder/${e.currentTarget.dataset.value.id}`,
          })
          wx.redirectTo({
            url: '/pages/pay-result/pay-result?status=1&actualPrice=' + actualPrice,
          })
        }
      }
    })
  },
  toOrderDetail: function (v) {
    let data = v.currentTarget.dataset.value;
    wx.setStorageSync("currOrder", data);
    wx.navigateTo({
      url: '/pages/ucenter/order-detail/order-detail'
    })
  },
  toComment: function (v) {
    let data = v.currentTarget.dataset.value;
    wx.setStorageSync("currOrder", data);
    wx.navigateTo({
      url: '/pages/to-comment/to-comment'
    })
  },
  toExpress: function (v) {
    wx.navigateTo({
      url: '/pages/express/express'
    })
  },
  buyAgain: function (e) {
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/product/product?id=' + this.data.order[index].productList[0].id
    })
  }
})