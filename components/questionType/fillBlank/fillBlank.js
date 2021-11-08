// components/fillBlank/fillBlank.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    option: {
      type: Object
    },
    typecode: Number
  },
  data: {

  },
  methods: {
    inputBlur(e) {
      console.log(e);
      let { option } = this.data
      let { value } = e.detail
      option.answer = value
      this.setData({
        option
      })
    }
  }
})
