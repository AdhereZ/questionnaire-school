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
            let {typecode,answerOption,answerPersonNum} = this.data
            let xdata = []
            let ydata = []
            answerOption.forEach((v, i) => {
                xdata[i] = '选项'+ (i+1)
                if(typecode === 10)
                ydata[i] = (v.proportion / answerPersonNum ).toFixed(0)
                else
                ydata[i] = (v.chooseNum / answerPersonNum).toFixed(0)
            })
            return {
                yAxis: {
                    type: 'category',
                    data: xdata
                },
                xAxis: {
                    axisLine: {
                        show: true
                    },
                    type: 'value',
                    splitLine: { show: false },
                },
                series: {
                    data: ydata,
                    type: 'bar'
                },
                grid: {
                    left: '20%',
                    bottom: '20%',
                    top: '20%'
                },
                tooltip: {
                    show: true,
                    trigger: 'item',
                    formatter: function (param) {
                        return param.marker + " " + param.name + "：" + param.value + "%";
                    },
                    position: 'top'
                }
            }
        },
    }
})
