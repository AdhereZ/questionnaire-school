// pages/draft/draft.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    showModal(e) {
        this.setData({
          modalName: e.currentTarget.dataset.target
        })
      },
      hideModal(e) {
        this.setData({
          modalName: null
        })
      },
})