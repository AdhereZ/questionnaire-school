// components/questionType/dropDown/dropDown.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        option: {
            type: Array
        },
        typecode: Number
    },

    /**
     * 组件的初始数据
     */
    data: {
    },
    methods: {
        getSelect(e) {
            console.log(e);
            let {option} = this.data
            option[e.currentTarget.dataset.idx].answer = e.detail.value
            this.setData({
                option
            })
        },
    }
})
