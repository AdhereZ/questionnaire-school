// components/singleChoice/singleChoice.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        problem: [
            {   
                id: '001',
                value: '选项1',
                isChecked: false
            },
            {
                id: '002',
                value: '选项1',
                isChecked: false
            },
            {
                id: '003',
                value: '选项1',
                isChecked: false
            }
        ]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        mradioChange(e) {
           const {idx} = e.currentTarget.dataset
           let {problem} = this.data
           problem.forEach(v=> {
               v.isChecked=false
           })
           problem[idx].isChecked=true
        this.setData({
            problem
        })
        }
    }
})
