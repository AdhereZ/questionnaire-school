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
        proportionNum: 10,
        subFlag: false,
        addFlag: true,

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
        let { option} = this.data
        let index = e.currentTarget.dataset.index
        option.splice(index, 1)       
        this.setData({
            option
        })
    },
    Sub() {
        let { proportionNum, subFlag, addFlag } = this.data
        addFlag = true
        if (proportionNum === 10) {
            return
        }

        else {
            proportionNum--
            if (proportionNum === 10)
                subFlag = false
        }
        this.setData({
            proportionNum,
            subFlag,
            addFlag
        })

    },
    Add() {
        let {proportionNum, subFlag, addFlag } = this.data
        subFlag = true
        if (proportionNum>=100) {
            addFlag = false
            return
        }

        else {
            proportionNum++
            if (proportionNum >= 100) {
                addFlag = false
            }

        }
        this.setData({
            proportionNum,
            subFlag,
            addFlag
        })
    },
    changeProportion(e) {
        let { value } = e.detail
        let { proportionNum,subFlag,addFlag } = this.data

        if (value === '')
            value = 10
        value = parseInt(value)
        if(value>10&&value<100) 
        {
            subFlag = true
            addFlag = true

        }
        if (value <= 10) {
            value = 10
            subFlag = false
            addFlag = true
        }
        if (value >= 100) {
            value = 100
            subFlag = true
            addFlag = false
        }
        this.setData({
            proportionNum: value,
            subFlag,
            addFlag
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