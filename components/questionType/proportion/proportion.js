
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        option: {
            type: Array
        },
        totalProportion: {
            type: Number
        },
        typecode: Number
    },

    /**
     * 组件的初始数据
     */
    data: {
        total: 0,
        most: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleChange(e) {
            console.log(e);
            let { index } = e.currentTarget.dataset
            let proportion = parseInt(e.detail.value)
            let { option, totalProportion, most} = this.data
            let total = 0
            if (index !== option.length - 1) {
                option[index].lastproportion = option[index].proportion
                option[index].proportion = proportion
                option.forEach(v => {
                    total += v.proportion
                })
                if (total < totalProportion) {
                    option[option.length - 1].lastproportion = option[option.length - 1].proportion
                    option[option.length - 1].proportion += totalProportion - total
                }
                else {
                    if (option[option.length - 1].proportion - (option[index].proportion - option[index].lastproportion) >= 0) {
                    let now= option[option.length - 1].proportion 
                    let last =  option[option.length - 1].lastproportion
                    option[option.length - 1].lastproportion = option[option.length - 1].proportion
                    option[option.length - 1].proportion -= option[index].proportion - option[index].lastproportion
                    total = 0
                    option.forEach(v => {
                        total += v.proportion
                    })
                    if(total > totalProportion) {
                        option[option.length - 1].lastproportion = last
                        option[option.length - 1].proportion = now
                    }
                }
                }
                total=0
                option.forEach(v => {
                    total += v.proportion
                })
                if (total > totalProportion)
                    most = true
                else
                    most = false
            }
            else {
                option[index].lastproportion = option[index].proportion
                option[index].proportion = proportion
                if (option.length === 2) {
                    option[index - 1].lastproportion = option[index - 1].proportion
                    option[index - 1].proportion -= option[index].proportion - option[index].lastproportion
                }
                option.forEach(v => {
                    total += v.proportion
                })
                if (total > totalProportion)
                    most = true
                else
                    most = false
            }
            this.setData({
                option,
                most,
                total
            })
        }
    }
})
