
var app = getApp()
let API = require("../../api/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId:null,
    goodsTitle:null,
    descrption:null,
    goodsQuality:null,
    className:null,
    brandName:null,
    goodsPrice:null,
    userTelephone:null,
    textareaAValue:'',
    imgList: [],
    modalName: null,
    wxOpenId: null,
    goodsId:null,
    goods:[],
    goodsId:null
    
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },
  
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
    console.log("wxOpenId="+ that.data.wxOpenId+
        " description="+value.description+
        "brandName="+value.brandName+
        " GoodsTitle="+value.goodsTitle+
        "className="+value.className+
        "quality="+value.quality+
        "price="+value.price+
        "telephone="+value.telephone)
      console.log(that.data.imgList)
    wx.request({
      url:`${API.main}/goods/goodsEdit`,
      method:'POST',
      data:{
       goodsId:that.data.goodsId,
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
        console.log(res)
       wx.navigateTo({
         url: '../home/home',
       })
      }
    })
  },
  cancleButn(){
    wx.redirectTo({
      url: '../myPosted/myPosted',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      goodsId: options.goodsId
    });
    let that = this
    //将url存入数组
    wx.request({
      url: `${API.main}/goods/get/${options.goodsId}`,
      success(res) {
        console.log(res.data)
        that.setData({
          goods: res.data,
          goodsId: res.data.goodsId,
          imgList: that.data.imgList.concat(res.data.goodsImg)
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


