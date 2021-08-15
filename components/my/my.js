// components/my/my.js
Component({
    ready() {
       const userInfo=wx.getStorageSync('userInfo')
       this.setData({
           userInfo
       })
    },
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
     userInfo: {},

    },
    /**
     * 组件的方法列表
     */
    methods: {
        IOtap(e) {
            console.log(e);
           const {condition} = e.target.dataset
           if(condition === 'out') {
            wx.removeStorageSync('userInfo')
            this.setData({
                userInfo:{}
            })
            return
           }
            wx.navigateTo({
              url: '/pages/login/login',
            })
        }
        }
})
