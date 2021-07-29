// pages/editor/single/single.js
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
          option: [
            {
                id: 0
            }
        ],

    },
    addOption(e) {
      console.log(e);
      let { option } = this.data
      let newOption = { id: option.length }
      option.push(newOption)
      this.setData({
          option
      })
  },
  deleteoption(e) {
     console.log(e);
      let { option} = this.data
      let index = e.currentTarget.dataset.index
      option.splice(index, 1)     
      this.setData({
          option
      })
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