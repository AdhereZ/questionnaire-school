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
        leastAddFlag: true,

        mostNum: 3,
        mostSubFlag: true,
        mostAddFlag: false,


    },

    tagSwitch(event) {
        this.data.switchData.isOn = !this.data.switchData.isOn
        this.setData({
            switchData: this.data.switchData
        });
    },
    addOption() {
        let { option } = this.data
        let newOption = { id: Math.random() }
        option.push(newOption)
        this.setData({
            option
        })
    },
    deleteoption(e) {
        let { option } = this.data
        let index=e.currentTarget.dataset.index
        option.splice(index,1)
        this.setData({
            option
        })
    },
    leastSub() {
        let { leastNum, leastSubFlag, leastAddFlag } = this.data
        if (leastNum === 1) {
            return
        }

        else {
            leastNum--
            if (leastNum === 1)
                leastSubFlag = false
        }
        this.setData({
            leastNum,
            leastSubFlag,
            leastAddFlag
        })

    },
    leastAdd() {
        let { leastNum, leastAddFlag, mostNum } = this.data
        if (leastNum >= mostNum)
            return
        else {
            leastNum++
            if (leastNum >= mostNum)
                leastAddFlag = false

        }
        this.setData({
            leastNum,
            leastAddFlag
        })
    },
    mostAdd() {
        let { mostAddFlag, mostNum,option } = this.data
        const optionNum=option.length
        if (mostNum === optionNum) {
            return
        }

        else {
            mostNum++
            if (mostNum === optionNum)
                mostAddFlag = false
        }
        this.setData({
            mostNum,
            mostAddFlag
        })

    },
    mostSub() {
        let { leastNum, mostSubFlag, mostNum } = this.data
        if (mostNum <= leastNum)
            return
        else {
            mostNum--
            if (mostNum <= leastNum)
                mostSubFlag = false

        }
        this.setData({
            mostNum,
            mostSubFlag
        })
    },
    changeLeastNum(e) {
        let { value } = e.detail

        if (value === '')
            value = 1
        value = parseInt(value)
        if (value <= 1)
            value = 1
        this.setData({
            leastNum: value
        })
    },
    changeMostNum(e) {
        let { value } = e.detail
        if (value === '')
            value = 1
        value = parseInt(value)
        if (value >= 3)
            value = 3
        this.setData({
            mostNum: value
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