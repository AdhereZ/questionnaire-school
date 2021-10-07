Component({
    /**
     * 组件的属性列表
     */
    properties: {
      option: {
       type: Array
      },
      leftTab: {
         type: String
      },
      rightTab: {
         type: String
      },
      typecode: Number
    },

    /**
     * 组件的初始数据
     */
    data: {
    },

    /**
     * 组件的方法列表
     */
    methods: {
        bgChange(e) {
            let {option} = this.data
            option.forEach(v => v.isAnswer=false)
          const {index}=e.currentTarget.dataset
          option[index].isAnswer=true
          this.setData({
            option
          })
        }
    }
})
