// components/multipleChoice/multipleChoice.js
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
    methods: {
      mradioChange(e) {
        
          let {idx} = e.currentTarget.dataset
          let {option} = this.data
          option[idx].isAnswer = ! option[idx].isAnswer
          console.log();
          this.setData({
            option
          })
        }
    }
})
