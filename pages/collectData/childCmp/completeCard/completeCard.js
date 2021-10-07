// pages/preview/childCmp/completeCard/completeCard.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        index: {
            type: Number,
            value: 1,
        },
        answer: {
            type: Object,
        },

    },

    /**
     * 组件的初始数据
     */
    data: {
      type: ["单选题","多选题","填空题","打分题","排序题","矩阵单选","多项填空","下拉题","量表题","比重题"]
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
