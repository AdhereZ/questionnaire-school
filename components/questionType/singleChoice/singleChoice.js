// components/singleChoice/singleChoice.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
      option: {
          type: Object,
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
      }
    },
    data: {
        isFlex:false
    },
    ready() {
        console.log(this.data.option);
        if(this.data.option[0].type_id===2) {
            this.setData({
                isFlex:true
            })
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        mradioChange(e) {
           const {idx} = e.currentTarget.dataset
           let {option} = this.data
           option.forEach(v=> {
               v.isAnswer=false
           })
           option[idx].isAnswer=true
        this.setData({
            option
        })
        }
    }
})
