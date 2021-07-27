// pages/editor/fillBlanks/fillBlanks.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        switchData: {
            id: 1,
            color: '#aabbfd',
            isOn: false
          },
          selectArray: [{
            "id": "10",
            "text": "数字"
        }, {
            "id": "21",
            "text": "汉字"
        },
        {
            "id": "10",
            "text": "字母"
        }]

    },

    tagSwitch(event) {
       
        this.data.switchData.isOn = !this.data.switchData.isOn
        this.setData({
          switchData: this.data.switchData
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})