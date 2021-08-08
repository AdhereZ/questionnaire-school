// components/multipleChoice/multipleChoice.js
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
      title: [
          {
              id:1,
              value:'标题1',
              isChecked:false
          },
          {
            id:2,
            value:'标题2',
            isChecked:false
        },
        {
            id:3,
            value:'标题3',
            isChecked:false
        }
      ]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleClick(e) {
        
          let {index} = e.currentTarget.dataset
          let {title} = this.data
          title[index].isChecked = !title[index].isChecked
          this.setData({
              title
          })
        }
    }
})
