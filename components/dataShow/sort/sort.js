// components/dataShow/sort/sort.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        answerOption: Array,
        answerPersonNum: Number
    },
    data: {
        animationData: {},
        createdFlag: true,
        choose: true,
        height1: null,
        height2: ''
    },

    attached() {
        let {height1} = this.data
        let query = this.createSelectorQuery();
        query.select('.table').boundingClientRect(rect => {
            height1 = rect.height;
            let height2 = height1*2 + 'rpx'
            this.setData({
                height1,
                height2,
                choose:false
            })
            console.log(height1);
        }).exec();
        

    },
    ready() {
        let { answerOption } = this.data
        let newArr = [...answerOption]
        newArr.forEach((v, i) => {
            v.idx = i
        })
        newArr = this.insertSort(newArr)
        console.log(newArr);
        newArr.forEach((v, i) => {
            answerOption[v.idx].rank = i + 1
        })
        this.setData({
            answerOption,
        })
    },
    methods: {
        switch() {
            let { graph } = this.data
            if (graph === 3)
                graph = 1
            else
                graph++
            this.setData({
                graph
            })
        },
        show() {
            let { height1 } = this.data
            this.setData({
                createdFlag: false
            })
            var animation = wx.createAnimation({
                // 动画持续时间
                duration: 500,
                // 定义动画效果，当前是匀速
                timingFunction: 'linear'
            })
            this.animation = animation
            //用step()完成一个动画， 高度为0，透明度为不可见
            animation.height("0").opacity(0).step()
            // 用setData改变当前动画
            this.setData({
                // 通过export()方法导出数据
                animationData: animation.export(),
                // 改变显示条件
                choose: true
            })
            // 设置setTimeout来改变高度以及透明度，实现有感觉的展开
            setTimeout(() => {
                animation.height(height1 * 2 - 0.1 * height1 + "rpx").opacity(1).step({ duration: 500 })
                this.setData({
                    animationData: animation.export(),

                })
            }, 50)
        },
        hide() {
            let { height1 } = this.data
            this.setData({
                createdFlag: true
            })
            var animation = wx.createAnimation({
                duration: 500,
                timingFunction: 'linear'
            })
            this.animation = animation
            animation.height(0).opacity(0).step({ duration: 500 })
            this.setData({
                animationData: animation.export()
            })
            setTimeout(() => {
                animation.height(height1 * 2 - 0.1 * height1 + "rpx").step();
                this.setData({
                    animationData: animation.export(),
                    choose: false,
                })
            }, 500)
        },
        // 获得每一个选项的综合排名
        insertSort(arr) {
            var len = arr.length;
            var preIndex, current;
            for (var i = 1; i < len; i++) {
                preIndex = i - 1;
                current = arr[i];
                while (preIndex >= 0 && arr[preIndex].sortNum > current.sortNum) {
                    arr[preIndex + 1] = arr[preIndex];
                    preIndex--;
                }
                arr[preIndex + 1] = current;
            }
            return arr;
        }
    }
})
