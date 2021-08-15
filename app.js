// app.js
App({
  //小程序一启动就会执行
  onLaunch() {
    
    const userInfo = wx.getStorageSync('userInfo')
    if(userInfo){
      this.globalData.userInfo = userInfo
    }else{
      console.log('no userInfo')
    }
    wx.cloud.init({
      env: 'questionnaire-school-7bza9c3ed76',
      traceUser: true,
    })

  },
  globalData: {
    userInfo:'',
    openId:''
  }
})
