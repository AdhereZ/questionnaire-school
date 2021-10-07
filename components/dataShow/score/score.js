// components/dataShow/score/score.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        answerOption: Number,
        answerPersonNum: Number
    },

    attached() {
      let {answerOption, answerPersonNum} = this.data
      let average = (answerOption/answerPersonNum).toFixed(1)
      this.setData({
          average
      })
    },
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
