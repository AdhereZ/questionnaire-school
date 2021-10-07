import regeneratorRuntime from '../../lib/runtime/runtime';
import { chooseImage, cloudUploadFile, cloudDeleteFile, cloudIdGet, showToast } from "../../utils/asyncWx.js";
import getID from '../../utils/getID'

const db = wx.cloud.database();
const questionnaires = db.collection('questionnaire');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: '',
        title: '',
        describe: '',
        questions: [],
        questionnaire: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    // onLoad: function (options) {
    //     console.log(options.openid);
    //     let questionnaire
    //     if (wx.getStorageSync('questionnaire'))
    //         questionnaire = wx.getStorageSync('questionnaire')
    //     else {
    //         questionnaire = {

    //         }
    //         this.setData({
    //             openid: options.openid
    //         })
    //         wx.setStorageSync('questionnaire', questionnaire)
    //         return
    //     }
    //     let { questions, describe, title, openid } = this.data
    //     if (questionnaire.questions)
    //         questions = questionnaire.questions
    //     describe = questionnaire.describe
    //     title = questionnaire.title
    //     this.setData({
    //         openid: options.openid,
    //         title,
    //         describe,
    //         questions,
    //         questionnaire
    //     })
    // },
    onShow: function () {
        // 页面初始化 options为页面跳转所带来的参数
        let pages = getCurrentPages(); //页面栈
        let currPage = pages[pages.length - 1]; //当前页面
        let questionnaire
        if (wx.getStorageSync('questionnaire'))
            questionnaire = wx.getStorageSync('questionnaire')
        else {
            questionnaire = {

            }
            wx.setStorageSync('questionnaire', questionnaire)
            return
        }
        let { questions, describe, title, } = this.data
        if (questionnaire.questions)
            questions = questionnaire.questions
        describe = questionnaire.describe
        title = questionnaire.title
        this.setData({
            title,
            describe,
            questions,
            questionnaire
        })

    },
    chooseChange(e) {
        let { questions } = this.data
        let index = e.detail
        questions.forEach(v => {
            v.choose = false
        })
        if (!questions[index])
            return
        questions[index].choose = true
        this.setData({
            questions
        })
    },
    async remove(e) {
        let { questions } = this.data
        let index = e.detail
        if (questions[index].hasImg) {
            for (let i = 0; i < questions[index].img.length; i++) {
                await cloudDeleteFile(questions[index].img[i].fileID)
            }
            // questions[index].img.forEach(v => {
            //   await cloudDeleteFile(v.fileID)
            // })
        }
        questions.splice(index, 1)
        let questionnaire = wx.getStorageSync('questionnaire')
        questionnaire.questions = questions
        wx.setStorageSync('questionnaire', questionnaire)
        this.setData({
            questions,
        })
    },
    textInput(e) {
        let { value } = e.detail
        let { describe } = this.data
        describe = value
        let questionnaire
        if (!wx.getStorageSync('questionnaire')) {
            questionnaire = {
                describe
            }
        }
        else {
            questionnaire = wx.getStorageSync('questionnaire')
            questionnaire.describe = describe
        }
        wx.setStorageSync('questionnaire', questionnaire)
        this.setData({
            describe
        })
    },
    titleInput(e) {
        let { value } = e.detail
        let { title } = this.data
        title = value
        let questionnaire
        if (!wx.getStorageSync('questionnaire')) {
            questionnaire = {
                title
            }
        }
        else {
            questionnaire = wx.getStorageSync('questionnaire')
            questionnaire.title = title
        }
        console.log(questionnaire);
        wx.setStorageSync('questionnaire', questionnaire)
        this.setData({
            title
        })
    },
    async handleDraft() {
        let questionnaire = wx.getStorageSync('questionnaire')
        if (!questionnaire.title) {
            await showToast({ title: '问卷标题不能为空' })
            return
        }
        wx.showLoading({
            title: '加载中',
        })
        let now = new Date();
        console.log(questionnaire);
        let time = {
            year: now.getFullYear().toString(),
            month: (now.getMonth() + 1).toString(),
            date: now.getDate().toString(),
            hour: now.getHours() < 10 ? '0' + now.getHours().toString() : now.getHours().toString(),
            minute: now.getMinutes() < 10 ? '0' + now.getMinutes().toString() : now.getMinutes().toString(),
            second: now.getSeconds() < 10 ? '0' + now.getSeconds().toString() : now.getSeconds().toString(),
            currentTime: now.getTime()
        }
        let { questions } = questionnaire
        let answer = []
        let j
        for (let i = 0; i < questions.length; i++) {
            let { questionTitle, typecode, option, question_id } = questions[i]
            let answerOption = []
            switch (typecode) {
                case 1: //单选
                    j = 0
                    option.forEach(v => {
                        let { optionContent, type_id, option_id } = v
                        if (type_id !== 3)
                            answerOption[j++] = {
                                optionContent,
                                type_id,
                                chooseNum: 0,
                                option_id
                            }
                        else
                            answerOption[j++] = {
                                optionContent,
                                type_id,
                                answerText: [],
                                chooseNum: 0,
                                option_id
                            }
                    })
                    break;

                case 2: //多选
                    j = 0
                    option.forEach(v => {
                        let { optionContent, type_id, option_id } = v
                        if (type_id !== 3)
                            answerOption[j++] = {
                                optionContent,
                                type_id,
                                chooseNum: 0,
                                option_id
                            }
                        else
                            answerOption[j++] = {
                                optionContent,
                                type_id,
                                answerText: [],
                                chooseNum: 0,
                                option_id
                            }
                    })
                    break;

                case 3: //填空
                    answerOption = []
                    break;

                case 4: //打分
                    answerOption = 0
                    break;

                case 5: //排序
                    j = 0
                    option.forEach(v => {
                        let { optionContent,option_id } = v
                        answerOption[j++] = {
                            optionContent,
                            sortNum: 0,
                            option_id
                        }

                    })
                    break;

                case 6: //矩阵单选
                    let { lineOption } = questions[i]
                    j=0
                    lineOption.forEach(v => {
                        let { lineContent,line_id, columnOption } = v
                        let optionContent = lineContent
                        let newArr = []
                        columnOption.forEach(v => {
                            let newObj = {
                                chooseNum: 0
                            }
                            for (var key in v) {
                                if (key === "columnContent")
                                    newObj[key] = v[key]
                            }
                            newArr.push(newObj)
                        })
                        columnOption = newArr
                        answerOption[j++] = {
                            optionContent,
                            columnOption,
                            option_id: line_id
                        }
                    })
                    break;

                case 7: //多项填空
                    j = 0
                    option.forEach(v => {
                        let { optionContent,option_id } = v
                        answerOption[j++] = {
                            optionContent,
                            answerText: [],
                            option_id
                        }

                    })
                    break;

                case 8: //下拉
                    j = 0
                    option.forEach(v => {
                        let { optionContent, dropOption, option_id } = v
                        let newObj, newArr = []
                        for (let m = 0; m < dropOption.length; m++) {
                            newObj = {
                                text: dropOption[m].text,
                                chooseNum: 0
                            }
                            newArr.push(newObj)
                        }
                        dropOption = newArr
                        answerOption[j++] = {
                            optionContent,
                            dropOption,
                            option_id
                        }

                    })
                    break;

                case 9: //量表
                    let { leftTab, rightTab } = questions[i]
                    j = 0
                    option.forEach(v => {
                        let { optionContent, option_id } = v
                        if (j === 0)
                            answerOption[j++] = {
                                optionContent,
                                chooseNum: 0,
                                option_id,
                                leftTab
                            }
                        else if (j === option.length - 1)
                            answerOption[j++] = {
                                optionContent,
                                rightTab,
                                chooseNum: 0,
                                option_id
                            }
                        else
                            answerOption[j++] = {
                                optionContent,
                                chooseNum: 0,
                                option_id
                            }
                    })
                    break;

                case 10: //比重
                    j = 0
                    option.forEach(v => {
                        let { optionContent, option_id} = v
                            answerOption[j++] = {
                                optionContent,
                                proportion: 0,
                                option_id
                            }
                    })
                    break;

                default:
                    break;
            }
            answer[i] = {
                questionTitle,
                typecode,
                answerPersonNum: 0,
                answerOption,
                question_id
            }
        }
        if (!questionnaire._id) {
            console.log(1);
            questionnaires.add({
                data: {
                    questions: questionnaire.questions,
                    title: questionnaire.title,
                    describe: questionnaire.describe,
                    time,
                    condition: 1,
                    answer
                }
            })
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        else {
            console.log(2);
            questionnaires.doc(questionnaire._id)
                .update({
                    data: {
                        questions: questionnaire.questions,
                        title: questionnaire.title,
                        describe: questionnaire.describe,
                        time,
                        answer
                    }
                })
        }
        wx.hideLoading()
        wx.redirectTo({
            url: '/pages/draft/draft',
        })
    },
    async preview() {
        let questionnaire = wx.getStorageSync('questionnaire')
        if (!questionnaire.title) {
            await showToast({ title: '问卷标题不能为空' })
            return
        }
        wx.navigateTo({
            url: '/pages/preview/preview',
        })
    }
})