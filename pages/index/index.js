var app = getApp()
let API = require("../../api/request")
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    wxOpenId: null,
    userId:null
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          }),
          app.globalData.userInfo = res.userInfo,
          console.log(app.globalData.userInfo)
        var that = this
        console.log(that.data)
        wx.login({
          success(res) {
            console.log(res.code)
            console.log(app.globalData.userInfo)
            if (res.code) {
              //发起网络请求
              wx.request({
                url: `${API.main}/login`,
                method: 'POST',
                data: {
                  code: res.code,
                },
                success(res) {
                  console.log(res.data)
                  app.globalData.userId = res.data.data.userId,
                  that.setData({
                    wxOpenId: res.data.data.wxOpenid,
                  })
                  //注意大小写
                  app.globalData.wxOpenId = res.data.data.wxOpenid;
          
                  wx.request({
                    url: `${API.main}/userInfo/GetUserInfo`,
                    method: 'POST',
                    data: {
                      userInfo: that.data.userInfo,
                      wxOpenId: that.data.wxOpenId,
                    },
                    dataType:'application/json',
                    success(res){
                      console.log(res.data)
                    }
                  })
                }
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
        wx.navigateTo({
          url: '../home/home',
        })
      }
    })
  },

})