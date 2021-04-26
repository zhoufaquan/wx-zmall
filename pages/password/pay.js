
let API = require("../../api/request")
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    Length:6,        //输入框个数
    isFocus:true,    //聚焦
    Value:"",        //输入的内容
    ispassword:true, //是否密文显示 true为密文， false为明文。
    orderId:null,
  },
  Focus(e){
    var that = this;
    console.log(e.detail.value);
    var inputValue = e.detail.value;
    that.setData({
      Value:inputValue,
    })
  },
  Tap(){
    var that = this;
    that.setData({
      isFocus:true,
    })
  },
  formSubmit(e){
    console.log(e.detail.value.password);
    var that = this
    wx.showModal({
      title: '提示',
      content: '此处需调用微信支付接口',
      showCancel: false,
      confirmColor: '#b4282d',
      success: function (res) {
        wx.request({
          url: `${API.main}/order/updateOrder/${that.data.orderId}`,
        })
        if (res.confirm) {
          wx.redirectTo({
            url: '/pages/pay-result/pay-result'
          })
        }
      }
    })
  },
  onLoad(options){
    console.log(options.orderId)
    this.setData({
      orderId:options.orderId
    })
  }
})
