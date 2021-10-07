

Page({
 data: {
  //  tabbar按键
  flag: 3,
 },
 onLoad: function (options) {
  this.setData({
    flag: options.flag
  })
},
 indexTap() {
   this.setData({
     flag:0,
   })
 },
 questionTap() {
  this.setData({
    flag:1,
  })
},
informationTap() {
  this.setData({
    flag:2,
  })
},
myTap() {
  this.setData({
    flag:3,
  })
},
createquestionTap(e) {
  let userInfo = wx.getStorageSync('userInfo')
  wx.removeStorageSync('questionnaire')
  wx.navigateTo({
    url: `../createQuestionnaire/createQuestionnaire`,
  })
  this.setData({
    modalName: e.currentTarget.dataset.target
  })
},
hideModal(e) {
  this.setData({
    modalName: null
  })
},
dialog(e) {
  e.stopPropagation()
}

 
})
