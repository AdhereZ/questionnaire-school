import * as echarts from '../../../ec-canvas/echarts'; //引入echarts.js


Component({
    /**
     * 组件的属性列表
     */
    properties: {
        answerOption: Array,
        answerPersonNum: Number,
        question_id: String
    },

    /**
     * 组件的初始数据
     */
    data: {
        graph: 3,
    },

   
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
        }
    }
})
