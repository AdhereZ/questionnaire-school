// components/questionType/sort/sort.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
      option: {
          type: Object
      }
    },

    /**
     * 组件的初始数据
     */
    data: {
      count: [

      ]
    },
    
    ready() {
        console.log(this.data.option);
    },

    methods: {
        handleSort(e) {
            let {idx} = e.currentTarget.dataset
            let {count,option} = this.data
            if(option[idx].sortNum === null) {
                let count_son= {index: idx}
                count=[...count,count_son]
                option[idx].sortNum=count.length  
            }
            else {
              for(let i=option[idx].sortNum-1; i<count.length-1; i++) {
                  option[count[i+1].index].sortNum--
                  count[i].index=count[i+1].index
              }
              option[idx].sortNum=null
              count.splice(count.length-1,1)
            }
           
            this.setData({
                option,
                count 
            })
        }
    }
})
