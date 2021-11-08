// components/multipleChoice/multipleChoice.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    option: {
      type: Array,
      value: [
        {
          id: '001',
          value: '选项1',
          isAnswer: false
        },
        {
          id: '002',
          value: '选项1',
          isAnswer: false
        },
        {
          id: '003',
          value: '选项1',
          isAnswer: false
        }
      ]
    },
    typecode: Number

  },

  data: {
    isFlex: false,

  },

  ready() {
    if (this.data.option[0].type_id === 2) {
      this.setData({
        isFlex: true
      })
    }
  },
  methods: {
    mradioChange(e) {

      let { idx } = e.currentTarget.dataset
      let { option } = this.data
      option[idx].isAnswer = !option[idx].isAnswer
      console.log();
      this.setData({
        option
      })
    },
    previewImage(e) {
      var current = e.target.dataset.src;
      wx.previewImage({
        current: current, // 当前显示图片的http链接
        urls: [current] // 需要预览的图片http链接列表
      })
    },
    inputBlur(e) {
      console.log(e);
      let { option } = this.data
      let { idx } = e.currentTarget.dataset
      let { value } = e.detail
      option[idx].answer = value
      this.setData({
        option
      })
    }
  }
})
