// app.js
App({
  //小程序一启动就会执行
  onLaunch() {
    wx.cloud.init({
      env: 'questionnaire-school-7bza9c3ed76'
    })
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
