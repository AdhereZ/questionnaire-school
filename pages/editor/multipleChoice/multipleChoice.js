// pages/editor/single/single.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        option: [
            {
                id: Math.random()
            }
        ],
        switchData: {
            id: 1,
            color: '#aabbfd',
            isOn: false
        },
        leastNum: 1,
        leastSubFlag: false,
        leastAddFlag: false,

        mostNum: 1,
        mostSubFlag: false,
        mostAddFlag: false,


    },

    tagSwitch(event) {
        this.data.switchData.isOn = !this.data.switchData.isOn
        this.setData({
            switchData: this.data.switchData
        });
    },
    addOption() {
        let { option, mostAddFlag } = this.data
        let newOption = { id: Math.random() }
        option.push(newOption)
        this.setData({
            option,
            mostAddFlag: true
        })
    },
    deleteoption(e) {
        let { option, mostAddFlag, mostNum, leastNum, leastAddFlag } = this.data


        let index = e.currentTarget.dataset.index
        option.splice(index, 1)
        if (option.length <= mostNum) {
            mostNum = option.length
            if (mostNum <= leastNum) {
                leastNum = mostNum
                leastAddFlag = false
            }
            mostAddFlag = false
        }
        this.setData({
            option,
            leastNum,
            mostNum,
            leastAddFlag,
            mostAddFlag
        })
    },
    leastSub() {
        let { leastNum, leastSubFlag, mostSubFlag, mostNum, leastAddFlag } = this.data
        leastAddFlag = true
        if (leastNum === 1) {
            return
        }

        else {
            leastNum--
            if (mostNum > leastNum)
                mostSubFlag = true
            if (leastNum === 1)
                leastSubFlag = false
        }
        this.setData({
            leastNum,
            leastSubFlag,
            leastAddFlag,
            mostSubFlag
        })

    },
    leastAdd() {
        let { leastNum, leastAddFlag, leastSubFlag, mostSubFlag, mostNum } = this.data
        leastSubFlag = true
        if (leastNum >= mostNum) {
            leastAddFlag = false
            return
        }

        else {
            leastNum++
            if (leastNum >= mostNum) {
                leastAddFlag = false,
                    mostSubFlag = false
            }

        }
        this.setData({
            leastNum,
            leastAddFlag,
            leastSubFlag,
            mostSubFlag
        })
    },
    mostAdd() {
        let { mostAddFlag, mostSubFlag, mostNum, leastAddFlag, leastNum, option } = this.data
        const optionNum = option.length
        if (mostNum === optionNum) {
            mostAddFlag = false
            return
        }

        else {
            mostAddFlag = true
            mostNum++
            mostSubFlag = true
            if (mostNum > leastNum)
                leastAddFlag = true
            if (mostNum === optionNum)
                mostAddFlag = false
        }
        this.setData({
            mostNum,
            mostAddFlag,
            leastAddFlag,
            mostSubFlag

        })

    },
    mostSub() {
        let { leastNum, mostSubFlag, mostAddFlag, leastAddFlag, mostNum } = this.data
        if (mostNum <= leastNum) {
            mostSubFlag = false,
                leastAddFlag = false
            return
        }
        else {
            mostNum--
            mostAddFlag = true
            if (mostNum <= leastNum) {
                mostSubFlag = false
                leastAddFlag = false
            }


        }
        this.setData({
            mostNum,
            mostSubFlag,
            mostAddFlag,
            leastAddFlag
        })
    },
    changeLeastNum(e) {
        let { value } = e.detail
        let { mostNum, leastSubFlag } = this.data

        if (value === '')
            value = 1
        value = parseInt(value)
        if (value <= 1 || value > mostNum) {
            value = 1
            leastSubFlag = false
        }
        this.setData({
            leastNum: value,
            leastSubFlag
        })
    },
    changeMostNum(e) {
        let { option, leastNum, leastAddFlag, mostAddFlag,mostSubFlag } = this.data
        let { value } = e.detail
        if (value === '')
            value = 1
        value = parseInt(value)
        if (value >= option.length) {
            value = option.length
            mostAddFlag = false
        }
        if (leastNum < value)
            leastAddFlag = true
            mostSubFlag =true
        this.setData({
            mostNum: value,
            leastAddFlag,
            mostAddFlag,
            mostSubFlag 
        })
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
        let { mostNum, option } = this.data
        mostNum = option.length
        this.setData({
            mostNum
        })
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