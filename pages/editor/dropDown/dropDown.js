
Page({

    /**
     * 页面的初始数据
     */
    data: {
        option: [
            {
                option_id: 0,
                dropOption:  [{
                    do_id: 0
                },
                {
                    do_id: 1
                }]
            }
        ],

        
        switchData: {
            id: 1,
            color: '#aabbfd',
            isOn: false
        },

    },

    tagSwitch(event) {
        this.data.switchData.isOn = !this.data.switchData.isOn
        this.setData({
            switchData: this.data.switchData
        });
    },
    addOption() {
        let { option } = this.data
        let newOption = { 
            option_id: option.length,
            dropOption:  [{
                do_id: 0
            },
            {
                do_id: 1
            }]}
        option.push(newOption)
        this.setData({
            option
        })
    },
    deleteoption(e) {
        let { option} = this.data
        console.log(option);
       let index = e.currentTarget.dataset.index
        option.splice(index, 1)
        console.log(option);
        this.setData({
            option
        })
    },
    addDropOption(e) {
        let { option} = this.data
        let id1=e.currentTarget.dataset.id1
        let {dropOption}=option[id1]
        let newOption = { do_id: option[id1].dropOption.length}
        dropOption.push(newOption)
        this.setData({
            option
        })
    },
    deleteDropOption(e) {
        let { option} = this.data
        let {id1,id2}=e.currentTarget.dataset
        let {dropOption}=option[id1]
        dropOption.splice(id2, 1)
        this.setData({
            option
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