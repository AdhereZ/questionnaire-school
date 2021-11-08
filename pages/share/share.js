// pages/share/share.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        this.setData({
            id: options.id,
            qrCode: options.qrCode,
            title: options.title
        })
    },
    preview(e) {
        var current = e.target.dataset.src;
        wx.previewImage({
            current: current, // 当前显示图片的http链接
            urls: [current] // 需要预览的图片http链接列表
        })
    },


    onShareAppMessage: function (options) {
        let {id,title} = this.data
        var shareObj = {
            title, // 默认是小程序的名称(可以写slogan等)
            path: `/pages/questionnaire/questionnaire?id=${id}`, // 默认是当前页面，必须是以‘/'开头的完整路径
            // imageUrl: 'http://static.e-mallchina.com/pic/product/brand/detail/hgds.jpg',
             //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。
             //支持PNG及JPG。显示图片长宽比是 5:4。
        }
        if (options.from == 'button') {
            console.log(options);   // shareBtn
        }
        return shareObj;
    }


})