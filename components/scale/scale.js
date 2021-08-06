// components/scale/scale.js
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
       scale: [
           {
              id: 0,
              beChoose: false
           },
           {
              id: 1, 
              beChoose: false
           }, 
           { 
              id: 2,
              beChoose: false
           }, 
           { 
              id: 3, 
              beChoose: false
           }, 
           { 
              id: 4,
              beChoose: false
           }    
       ]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        bgChange(e) {
            let {scale} = this.data
          scale.forEach(v => v.beChoose=false)
          const {index}=e.currentTarget.dataset
          scale[index].beChoose=true
          this.setData({
              scale
          })
        }
    }
})
