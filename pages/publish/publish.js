
var app = getApp()
let API = require("../../api/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picker1: ['全新', '9成新', '8成新','7成新','6成新','5成新','其他'],
    qulity:null,
    picker2: ['手机','耳机','平板','电脑','其他'],
    className:null,
    picker3: ['华为','小米','苹果','联想','其他'],
    brandName:null,
    textareaAValue:'',
    imgList: [],
    index: null,
    index1: null,
    index2: null,
    modalName: null,
    wxOpenId: null,
    goodsId:null
    
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },
  // PickerChange(e) {
  //   console.log(e);
  //   this.setData({
  //     index: e.detail.value,
  //     qulity:picker1[index]
  //   })
  //   console.log(this.data.qulity)
  // },
  // PickerChange1(e) {
  //   console.log(e);
  //   this.setData({
  //     index1: e.detail.value,
  //     className:picker1[index1]
  //   })
  //   console.log(this.data.className)
  // },
  // PickerChange2(e) {
  //   console.log(e);
  //   this.setData({
  //     index2: e.detail.value,
  //     brandName:picker2[index2]
  //   })
  //   console.log(this.data.brandName)
  // },
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  formSubmit(e){
    console.log(e)
       var that = this
       var value = e.detail.value
       console.log(that.data.imgList)
    console.log("wxOpenId="+ that.data.wxOpenId+
        " description="+value.description+
        "brandName="+value.brandName+
        " GoodsTitle="+value.goodsTitle+
        "className="+value.className+
        "quality="+value.quality+
        "price="+value.price+
        "telephone="+value.telephone)
    // wx.showLoading({
    //   title:'发布中ing...',
    //   mask:true
    // });
    wx.request({
      url: `${API.main}/goods/publish`,
      method:'POST',
      data:{
       wxOpenId:that.data.wxOpenId,
       goodsTitle:value.goodsTitle,
       description:value.description,
       quality:value.quality,
       brandName:value.brandName,
       className:value.className,
       price:value.price,
       telephone:value.telephone,
       imgUrl:that.data.imgList,
      },
      success(res){
       console.log(res.data)
       that.setData({
        goodsId: res.data
      })
      console.log("goodsId="+that.data.goodsId)
      //  wx.request({
      //   url: '${API.main}/uploadImg',
      //   method:'POST',
      //   data:{
      //    goodsId:res.data,
      //    imgUrl:that.data.imgList,
      //   },
      //  })
       wx.navigateTo({
         url: '../home/home',
       })
      }
    })
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
      wxOpenId: app.globalData.wxOpenId
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


