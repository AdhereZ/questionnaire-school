Page({

    /**
     * 页面的初始数据
     */
    data: {
        switchData: {
            id: 1,
            color: '#aabbfd',
            isOn: false
          },
          selectArray: [{
            "id": "10",
            "text": "字符"
        }, {
            "id": "21",
            "text": "汉字"
        },
        {
            "id": "12",
            "text": "字母"
        },
        {
            "id": "77",
            "text": "数字"
        }],
        leastNum: 1,
        leastSubFlag: false,
        leastAddFlag: true,
        fillBlanks:[
            {
                id:0
            }
        ]

    },
    leastSub() {
        let { leastNum, leastSubFlag,leastAddFlag,fillBlanks } = this.data
        leastAddFlag = true
        if (leastNum === 1) {
            return
        }

        else {
            leastNum--
            if (leastNum === 1)
                leastSubFlag = false
             fillBlanks.splice(fillBlanks.length-1,1)
        }
        this.setData({
            leastNum,
            leastSubFlag,
            leastAddFlag,
            fillBlanks
        })

    },
    leastAdd() {
        let { leastNum, leastSubFlag,fillBlanks} = this.data
        let newfb= {
            id:fillBlanks.length
        }
        fillBlanks.push(newfb)
        leastSubFlag = true
            leastNum++
        this.setData({
            leastNum,
            leastSubFlag,
            fillBlanks
        })
    },
    changeLeastNum(e) {
        let { value } = e.detail
        let {leastSubFlag,fillBlanks } = this.data

        if (value === '')
            value = 1
        value = parseInt(value)
        if (value <= 1) {
            value = 1
            leastSubFlag = false
        }
        if(value<fillBlanks.length) {
            fillBlanks.splice(value,fillBlanks.length-value)
        }
        else {
            let x=fillBlanks.length
             for(let i=x;i<value;i++) {
                let newfb= {
                    id:fillBlanks.length
                }
                fillBlanks.push(newfb)
             }
        }
        this.setData({
            leastNum: value,
            leastSubFlag,
            fillBlanks
        })
    },
    tagSwitch(event) {
       
        this.data.switchData.isOn = !this.data.switchData.isOn
        this.setData({
          switchData: this.data.switchData
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})