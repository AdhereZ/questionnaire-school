// components/index/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        allPublishQ: []
    },
    attached() {
        wx.showLoading({
          title: '问卷加载中',
        })
        wx.cloud.callFunction({
            name: 'getQuestionnaire',
            data: {
                condition: 2
            }
        })
            .then(res => {
                console.log(res);
                wx.hideLoading()
                this.setData({
                    allPublishQ: res.result.data,
                })
            })
            .catch(err => {
                wx.hideLoading()
                console.log('错误', err);
            })
    },
    /**
     * 组件的方法列表
     */
    methods: {

    }
})
