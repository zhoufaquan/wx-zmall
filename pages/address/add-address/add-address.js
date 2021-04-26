// pages/me/address/add-address/add-address.js
const tools = require('../../../utils/tools');
let API = require("../../../api/request")
var app = getApp();
Page({
  data: {
    tag: true, 
  },
  onLoad: function (e) {
    console.log(e)
    if (e.address != undefined) {
      console.log("onload")
      var list = JSON.parse(e.address);
      this.setData({
        list: list,
        address: list.address,
        address_id: list.addressId
      })
    } else {
      console.log("不存在传入值")
    }
  },
  onShow: function (e) {
    console.log("onShow")
    if (this.data.list != undefined) {
      console.log("存在传入值")
      this.setData({
        tag: false,
      })
    }
  },
  //点击地址信息，定位
  cilickaddress: function (e) {
    wx.navigateTo({
      url: '/pages/home/address/address',
    })
  },
  //保存修改地址
  saveAddr: function (e) {
    if (e.detail.value.name == "") {
      wx.showModal({
        title: '提示',
        content: "请填写您的姓名！"
      })
    } else if (e.detail.value.phone == "") {
      wx.showModal({
        title: '提示',
        content: "请填写您的手机号！"
      })
    } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value.phone))) {
      wx.showModal({
        title: '提示',
        content: "手机号格式不正确"
      })
    } else if (e.detail.value.address === undefined) {
      wx.showModal({
        title: '提示',
        content: "请选择您的所在区域"
      })
    } else if (e.detail.value.door_card == "") {
      wx.showModal({
        title: '提示',
        content: "请输入您的详细地址"
      })
    } else {

      console.log(e.detail.value);
      if (this.data.tag === true) {
        var address = e.detail.value
        // address = JSON.stringify(address);

        //保存新地址
        wx.request({
          url: `${API.main}/info/insertAddress`,
          method: 'POST',
          data: {
            userAddress: address,
            userId: app.globalData.userId
          },
          success(res) {
            console.log("新增地址成功", res)
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 1000);
          }
        })
        
      } else {
        
        var address = e.detail.value
        address.address_id = this.data.address_id;
        console.log(address)

        wx.request({
          url: `${API.main}/info/AlterAddress`,
          method: 'POST',
          data: {
            userAddress: address
          },
          success(res) {
            console.log("修改地址成功", res)
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 1000);

            
          }
        })
      }
    }
  },
  //删除该地址
  delete: function (e) {
    var vm = this;
    console.log(vm.data.address_id)
    wx.request({
      url:`${API.main}/info/DeleteAddress/${vm.data.address_id}`,
      method:'GET',
      success(res){
        console.log("删除地址成功", res)
        console.log(res.data)
        setTimeout(function () {
                    wx.navigateBack({
                      delta: 1
                    })
                  }, 1000);
      }
    })
    // tools.request(app.globalData.url + "/info/DeleteAddress", 'post', {
    //     'address_id': vm.data.address_id
    //   })
    //   .then(resp => {
    //     console.log("删除地址成功", resp)
    //     wx.showToast({
    //       title: resp.data.msg,
    //       icon: 'success',
    //       duration: 1500,
    //       success: function () {
    //         setTimeout(function () {
    //           wx.navigateBack({
    //             delta: 1
    //           })
    //         }, 1500);
    //       }
    //     })
    //   })
  }
})