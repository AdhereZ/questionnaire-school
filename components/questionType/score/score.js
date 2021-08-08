// components/score/score.js
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
      stars: [
          {
              isBright: false,
              id: '1'
          },
          {
            isBright: false,
            id: '2'
        },
        {
            isBright: false,
            id: '3'
        },
        {
            isBright: false,
            id: '4'
        },
        {
            isBright: false,
            id: '5'
        }
      ]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // handleTouchMove(e) {
        //     console.log(e);
        //     const {pageX} = e.changedTouches[0]
        //     let distance = pageX-15
        //     let index= Math.ceil( distance/60)-1
        //     console.log(index);
        //     if(index<0)
        //     index=0
        //     if(index>5)
        //     index=5
        //     let {stars}=this.data
        //      for(let i=0;i<index;i++) {
        //          stars[i].isBright=true
        //      }
        //      for(let i=index;i<5;i++) {
        //         stars[i].isBright=false
        //      }
        //      this.setData({
        //          stars
        //      })
        // },
        handleClick(e) {
            const index = e.currentTarget.dataset.index;
            let {stars}=this.data
            for(let i=0;i<=index;i++) {
                stars[i].isBright=true
            }
            for(let i=index+1;i<5;i++) {
               stars[i].isBright=false
            }
            this.setData({
                stars
            })
        }
    }
})
