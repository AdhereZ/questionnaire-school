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
          lineOption: [
            {
                id: Math.random()
            }
        ],
        columnOption: [
          {
            id: Math.random()
          }
      ],

    },
    addOption() {
      let { lineOption } = this.data
      let newOption = { id: Math.random() }
      lineOption.push(newOption)
      this.setData({
        lineOption
      })
  },
  deleteoption(e) {
      let { lineOption} = this.data
      let index = e.currentTarget.dataset.index
      lineOption.splice(index, 1)     
      this.setData({
        lineOption
      })
  },
  addCOption() {
    let { columnOption } = this.data
    let newOption = { id: Math.random() }
    columnOption.push(newOption)
    this.setData({
      columnOption
    })
},
deleteCoption(e) {
    let { columnOption} = this.data
    let index = e.currentTarget.dataset.index
    columnOption.splice(index, 1)     
    this.setData({
      columnOption
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