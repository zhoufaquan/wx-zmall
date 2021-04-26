// logs.js
const util = require('../../utils/util.js')
const app = getApp();
let API = require("../../api/request")
Page({
  data: {
    speedValue:20,
    classId:1,
    value:null,
    scrollTop: 0,
    currentNavBarName: 'home',
    customBarHeight: app.globalData.CustomBar,
    show: false,
    active:0,
    text: '',
    newsList:[],
    cardCur:0,
    tabSelectedName: '1',
    swiperList:[]
  },
  
  onSearch(e) {
    this.setData({
      value: e.detail,
    });
    console.log(this.data.value)
    if(this.data.value!=''){
      wx.navigateTo({
        url: '../search/search',
      })
    }
    
  },
  onChangeTabar(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({ [key]: event.detail });
  },
  onClickTab(event) {
    this.setData({
      tabSelectedName: event.detail.name,
      classId:event.detail.name
    })
    var that = this
    wx.showToast({
      title: '加载中',
      icon:'loading',
      duration:1000
    })
    
    wx.request({
      url: `${API.main}/goods/getClassId`,
      method:'POST',
      data:{
        classId:that.data.classId,
      },
      success(res){
        console.log(res.data)
        that.setData({
          goods:res.data
        })

      },
    })
  },

  
//监听屏幕滚动 判断上下滚动
onPageScroll: function (event) {
  this.setData({
    scrollTop: event.scrollTop
  })
},
 loadGoodsInfo(){
  var that = this
  wx.request({
    url:`${API.main}/goods/getClassId`,
    method:'POST',
    data:{
      classId:that.data.classId,
    },
    success(res){
      console.log(res.data)
      that.setData({
        goods:res.data
      })
    }
  })
 },

  onLoad: function(e) {
    this.loadGoodsInfo()
    var that = this
    wx.request({
      url:`${API.main}/goods/goodsPush`,
      method:'GET',
      success(res){
        
        that.setData({
          swiperList:res.data.data
        })
        wx.request({
          url:`${API.main}/news/getTopNews`,
          method:'GET',
          success(res){
            console.log(res.data)
            for (var index in res.data.data) {
              if (res.data.data[index].isShow == 0){
                console.log(res.data.data[index].newsConten)
                that.setData({
                  text:res.data.data[index].newsContent
                  })
              }
             }
            
            // that.newsList.forEach(function(element) {
            //   if(element.isShow == 0){
            //     that.setData({
            //       text:element
            //     })
            //   }
            // })
          }
          
        })
      }
    })
  },
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  goodsShow(e){
    console.log(e)
    wx.navigateTo({
      url: `/pages/goods/goods?goodsId=${e.currentTarget.dataset.name}`,
    })
  },
  changeNavBar(event) {
    let currentNavBarName = event.currentTarget.dataset.name;
  
    if(currentNavBarName == this.data.currentNavBarName) {
     
      return;
    }
    this.setData({
      currentNavBarName: event.currentTarget.dataset.name
    })
    
    wx.navigateTo({
      url: `/pages/${currentNavBarName}/${currentNavBarName}`,
    })
  },
  // 加载模态框
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  onShow:function(e){
    console.log("lk;fghbbbbblb;gdfjblg;fkb")
    
  },
  
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
   onSelectPublish(e) {
      console.log(e.currentTarget.dataset.name)
      if( e.currentTarget.dataset.name == 'buying-info'){
        wx.navigateTo({
          url: '/pages/goodsHelp/goodsHelp',
        })
      }else{
        wx.navigateTo({
          url: '/pages/publish/publish',
        })
      }
      this.setData({
        modalName: null
      })
   }
})

