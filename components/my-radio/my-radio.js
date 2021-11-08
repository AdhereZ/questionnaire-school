Component({
    /**
     * 组件的属性列表
     */
    properties: {
       problem: {
          type: String,
       },
       isChecked: {
           type: Boolean,
           value: false
       }
    },

    /**
     * 组件的初始数据
     */
    data: {
        isChecked:false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        changeCheck() {
            let {isChecked}=this.data
            isChecked=!isChecked
            this.setData({
                isChecked
            })
        }
    }
})
