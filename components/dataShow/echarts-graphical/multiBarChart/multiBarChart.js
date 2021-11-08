import * as echarts from '../../../../ec-canvas/echarts'; //引入echarts.js
var Chart = null

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        answerOption: Array,
        answerPersonNum: Number,
        typecode: Number
    },

    /**
     * 组件的初始数据
     */
    data: {
        ec: {
            lazyLoad: true
        }
    },
    attached() {
        Chart = [];
        this.echartsComponnet1 = this.selectComponent('#mychart-dom-graph');
        this.initEcharts()
    },
    methods: {
        initEcharts() {
            //解决真机预览模糊
            const getPixelRatio = () => {
                let pixelRatio = 0
                wx.getSystemInfo({
                    success: function (res) {
                        pixelRatio = res.pixelRatio
                    },
                    fail: function () {
                        pixelRatio = 0
                    }
                })
                return pixelRatio
            }
            var dpr = getPixelRatio()
            this.echartsComponnet1.init((canvas, width, height) => {
                // 初始化图表
                Chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr
                });
                this.setOption();
                return Chart;
            });
        },
        setOption() {
            Chart.clear(); // 清除
            Chart.setOption(this.getOption1()); //获取新数据
        },
        getOption1() {
            let {typecode} = this.data
            if(typecode === 6) {
                let cdata=['column']
                this.data.answerOption[0].columnOption.forEach(v => {
                    cdata.push(v.columnContent)
                })
            }
            if(typecode === 8) {
                let cdata=['dropDown']
                this.data.answerOption[0].dropOption.forEach(v => {
                    cdata.push(v.text)
                })
            }
            let source = [cdata]
            this.data.answerOption.forEach((v, i) => {
               let arr=[v.optionContent]
               if(typecode === 6)
               v.columnOption.forEach(m => {
                arr.push((m.chooseNum/this.data.answerPersonNum*100).toFixed(0))
               })
               if(typecode === 8)
               v.dropOption.forEach(m => {
                arr.push((m.chooseNum/this.data.answerPersonNum*100).toFixed(0))
               })
               source.push(arr)
            })
            console.log(source);
            return {
                dataset: {
                    source
                },
                xAxis: {
                    axisLine: {
                        show: true
                    },
                    splitLine: { show: false },
                },
                yAxis: {
                    type: 'category',
                    
                },
                // Declare several bar series, each will be mapped
                // to a column of dataset.source by default.
                series: [
                    { type: 'bar' },
                    { type: 'bar' },
                    { type: 'bar' },
                    { type: 'bar' },
                    { type: 'bar' }
                ],
                tooltip: {
                    show: true,
                    trigger: 'item',
                    formatter:  function (param) {
                        console.log(param);
                        return param.seriesName+': '+param.value[param.encode.y[0]] + '%'
                        // return [
                        //     param.seriesName,
                        //     param.marker+param.name,
                        //     param.value[param.encode.y[0]] + '%'
                        // ].join('<br/>')
                    },
                    extraCssText: 'width:160rpx;height:50rpx;',
                    textStyle: {
                        fontSize: 12
                    },
                    position: 'top'
                }
            }
        },
    }
})
