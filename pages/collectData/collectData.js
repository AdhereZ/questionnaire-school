const db = wx.cloud.database();
const questionnaires = db.collection('questionnaire');
Page({

    /**
     * 页面的初始数据
     */
    data: {
      questionnaire: {},
      questions: [],
      answer: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
       console.log(options);
       questionnaires.doc(options.id)
       .get()
       .then(res => {
           console.log(res);
           wx.setStorageSync('answer', res.data.answer)
          this.setData({
            questionnaire: res.data,  
            questions: res.data.questions,
            answer: res.data.answer
          })
       })
       .catch(err => {
           console.log(err);
       })
    },
    onShow: function () {
      
    },
    createExcel() {
      wx.cloud.callFunction({
        name: 'excel',
        success: res => {
          console.log(res);
        },
        fail: err => {
          console.log(err);
        }

      })
    }
})