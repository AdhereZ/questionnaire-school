const db = wx.cloud.database();
const questionnaire = db.collection('questionnaire');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: null,
        title: '',
        describe: '',
        questions: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
          
          questionnaire.where({
              _id:options.id
          })
          .get()
          .then(res=> {
            //   console.log(res);
              this.setData({
                  title: res.data[0].title,
                  describe: res.data[0].describe,
                  id: res.data[0]._id,
                  questions:res.data[0].questions
              })
          })
          .catch(err=> {
              console.log('错误',err);
          })
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