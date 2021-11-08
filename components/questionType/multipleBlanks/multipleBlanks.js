// components/questionType/multipleBlanks/multipleBlanks.js
Component({
    properties: {
        option: {
            type: Array
        },
        typecode: Number
    },
    data: {
    },

    methods: {
        inputBlur(e) {
            console.log(e);
            let { option } = this.data
            let { idx } = e.currentTarget.dataset
            let { value } = e.detail
            option[idx].answer = value
            this.setData({
                option
            })
        }
    }
})
