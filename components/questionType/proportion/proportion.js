// components/proportion/proportion.js
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
      max: 100
    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleChange(e) {
            console.log(e.detail);
        }
    }
})
