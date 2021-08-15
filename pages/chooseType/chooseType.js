Page({
  data: {
    msg:"单选题 多选题 填空题 打分题 排序题",
    msg2:"矩阵单选 多项填空 比重 下拉 量表",
    id:'',
  },
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
  }
});
