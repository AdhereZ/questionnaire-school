import regeneratorRuntime from '../../lib/runtime/runtime';
import { showModal } from "../../utils/asyncWx.js";

const db = wx.cloud.database();
const user = db.collection('user');
Page({

    /**
     * 页面的初始数据
     */
    data: {
      checked:false,
      userInfo: {},

    },
    onLoad: function (options) {

      // const userInfo = app.globalData.userInfo
      // this.setData({
      //     userInfo:userInfo
      // })
  },

    checkChange(e) {
      let {checked}=this.data
      checked= !checked
      this.setData({
          checked
      })
    },
    
    async Login() {
      if(!this.data.checked) {
        await showModal({ content: '请勾选已阅读《用户协议》和《隐私政策》', })
        return
      }
      //获取用户信息
      wx.getUserProfile({
        desc: '用于授权登录', 
        success: (res) => {
          wx.showLoading({
            title: '加载中',
          })
          
          this.setData({
            userInfo:res.userInfo
          })
          let userInfo=res.userInfo
          wx.cloud.callFunction(
            {
              name: 'getOpenid'
            }
          )
          .then(res=> {
            let openid = res.result.openid
            user.where(
              {
                _openid:res.result.openid
              }
            )
            .get()
            .then(res=> { 
              console.log(res);
              console.log(userInfo);
              if(res.data.length === 0) {
                user.add( {
                  data: {
                   ...userInfo
                  }
                })
              }      
              userInfo.openid = openid
              wx.setStorageSync('userInfo', userInfo)
              wx.hideLoading()
                wx.navigateTo({
                  url: '/pages/index/index'
                })
            
            })
            .catch(err=> {
              console.log('失败',err);
            })
            
          })
          .catch(err=> {
            console.log('失败',err);
          })
        },
        fail: err => {
          console.log(err);
        }
      })
      
     
     
    }
})