// components/dataShow/scale/scale.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        answerOption: Array,
        answerPersonNum: Number
    },

    /**
     * 组件的初始数据
     */
    data: {
        graph: 3,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        switch() {
            let { graph } = this.data
            if (graph === 3)
                graph = 1
            else
                graph++
            this.setData({
                graph
            })
        },
    }
})
