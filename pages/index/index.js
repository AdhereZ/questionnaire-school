

Page({
 data: {
  //  tabbar按键
  flag: 0,
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
createquestionTap() {
  this.setData({
    flag:4,
  })
}

 
})
