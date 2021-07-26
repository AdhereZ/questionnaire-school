Page({
    data: {
        choose: false,
        createdFlag:true,
        animationData: {},
        stopBtn: true,//动画未执行完之前禁用按钮

        //已完成的
        finishedFlag: true,
        finishedChoose: false,
        finishedAnimationData: {}

    },
  
    onLoad: function () {
  
    },
      showContent: function (e) {
          // 用that取代this，防止setTimeout内使用this出错
          var that = this;
          that.setData({
            createdFlag:false
          })
          // 创建一个动画实例
          var animation = wx.createAnimation({
              // 动画持续时间
              duration: 500,
              // 定义动画效果，当前是匀速
              timingFunction: 'linear'
          })
          // 将该变量赋值给当前动画
          that.animation = animation
          //用step()完成一个动画， 高度为0，透明度为不可见
          animation.height("0").opacity(0).step()
          // 用setData改变当前动画
          that.setData({
              // 通过export()方法导出数据
              animationData: animation.export(),
              // 改变显示条件
              choose: true
          })
          // 设置setTimeout来改变高度以及透明度，实现有感觉的展开
          setTimeout(function () {
              animation.height("266rpx").opacity(1).step({ duration: 500 })
              that.setData({
                  animationData: animation.export(),
                
              })
          }, 50)
          //在动画时间禁用按钮
          setTimeout(function () {
              that.setData({
                  stopBtn: false
              })
          }, 500)
      },
  
      // 隐藏
      hideContent: function (e) {
          var that = this;
          that.setData({
            createdFlag: true
          })
          var animation = wx.createAnimation({
              duration: 500,
              timingFunction: 'linear'
          })
          that.animation = animation
          animation.height(0).opacity(0).step({ duration: 500 })
          that.setData({
              animationData: animation.export()
          })
          setTimeout(function () {
              animation.height("266rpx").step();
              that.setData({
                  animationData: animation.export(),
                  choose: false,
              })
          }, 500)
          //收回动画开始禁用按钮
          that.setData({
              stopBtn: true,
          })
      },

      
    //   已完成的
      finishedShowContent: function (e) {
          // 用that取代this，防止setTimeout内使用this出错
          var that = this;
          that.setData({
            finishedFlag:false
          })
          // 创建一个动画实例
          var animation = wx.createAnimation({
              // 动画持续时间
              duration: 500,
              // 定义动画效果，当前是匀速
              timingFunction: 'linear'
          })
          // 将该变量赋值给当前动画
          that.animation = animation
          //用step()完成一个动画， 高度为0，透明度为不可见
          animation.height("0").opacity(0).step()
          // 用setData改变当前动画
          that.setData({
              // 通过export()方法导出数据
              finishedAnimationData: animation.export(),
              // 改变显示条件
              finishedChoose: true
          })
          // 设置setTimeout来改变高度以及透明度，实现有感觉的展开
          setTimeout(function () {
              animation.height("266rpx").opacity(1).step({ duration: 500 })
              that.setData({
                finishedAnimationData: animation.export(),
                
              })
          }, 50)
          //在动画时间禁用按钮
          setTimeout(function () {
              that.setData({
                  stopBtn: false
              })
          }, 500)
      },
  
      // 隐藏
      finishedHideContent: function (e) {
          var that = this;
          that.setData({
            finishedFlag: true
          })
          var animation = wx.createAnimation({
              duration: 500,
              timingFunction: 'linear'
          })
          that.animation = animation
          animation.height(0).opacity(0).step({ duration: 500 })
          that.setData({
            finishedAnimationData: animation.export()
          })
          setTimeout(function () {
              animation.height("266rpx").step();
              that.setData({
                finishedAnimationData: animation.export(),
                  finishedChoose: false
              })
          }, 500)
          //收回动画开始禁用按钮
          that.setData({
              stopBtn: true,
          })
      },
  })
