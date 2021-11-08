// components/index/List/List.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    publishQ: {
      type: Object
    },
     idx: Number
  },
   ready() {
     console.log(this.data.idx);
   },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
