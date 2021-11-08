import regeneratorRuntime from '../../lib/runtime/runtime';
import { chooseImage, cloudUploadFile, cloudDeleteFile, cloudIdGet, showToast } from "../../utils/asyncWx.js";
import getID from '../../utils/getID'

const db = wx.cloud.database();
const finishQuestionnaires = db.collection('finishQuestionnaire');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        questionnaire: {},
        questions: [],
        startTime: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let now = new Date()
        let startTime = now.getTime()
        wx.showLoading({
            title: '问卷加载中',
        })
        wx.cloud.callFunction({
            name: 'getPublishQ',
            data: {
                id: options.id
            }
        })
            .then(res => {
                console.log(res);
                wx.hideLoading()
                this.setData({
                    questionnaire: res.result.data,
                    questions: res.result.data.questions,
                    startTime
                })
            })
            .catch(err => {
                wx.hideLoading()
                console.log(err);
            })
    },
    formatNumber(n) {
        n = n.toString();
        return n[1] ? n : '0' + n;
    },
    onTap() {
        wx.showLoading({
            title: '提交中',
        })
        // 获取答问卷时间，以及交卷时间
        let now = new Date()
        let finishTime = now.getTime()
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let day = now.getDate();
        let hour = now.getHours();
        let minute = now.getMinutes();
        let second = now.getSeconds();
        let finishDate = [year, month, day].map(this.formatNumber).join('.') + '/' + [hour, minute, second].map(this.formatNumber).join(':');
        console.log(finishDate);
        let { startTime, questions, questionnaire } = this.data
        questionnaire.finishPerson+=1
        console.log(questionnaire.finishPerson);
        let totalTime = finishTime - startTime
        const children = this.selectAllComponents('.the-id')
        console.log(children);
        // 获取完成的问卷
        for (let i = 0; i < children.length; i++) {
            if (questions[i].typecode === 4) {
                questions[i].option.score = children[i].data.score
            }
            else if (questions[i].typecode === 6) {
                questions[i].lineOption = children[i].data.lineOption
            }
            else {
                questions[i].option = children[i].data.option
            }
        }
        console.log(questions);
        console.log(questionnaire);
        let { answer } = questionnaire
        questions.forEach((v, i) => {
            let { typecode, option, lineOption } = v
            let f, index
            switch (typecode) {
                case 1: //单选
                    index = option.findIndex(v => v.isAnswer === true)
                    if (index === -1)
                        break;
                    else {
                        answer[i].answerPersonNum++
                        answer[i].answerOption[index].chooseNum++
                        if (answer[i].answerOption[index].type_id === 3)
                            answer[i].answerOption[index].answerText.push(option[index].answer)

                    }
                    break;

                case 2: //多选
                    f = false
                    option.forEach((m, j) => {
                        if (m.isAnswer) {
                            f = true
                            answer[i].answerOption[j].chooseNum++
                            if (answer[i].answerOption[j].type_id === 3)
                            answer[i].answerOption[j].answerText.push(option[j].answer)
                        }
                    })
                    if (f)
                        answer[i].answerPersonNum++
                    break;

                case 3: //填空
                    if (option.answer) {
                        answer[i].answerOption.push(option.answer)
                        answer[i].answerPersonNum++
                    }
                    break;

                case 4: //打分
                    answer[i].answerOption += option.score
                    answer[i].answerPersonNum++
                    break;

                case 5: //排序
                    option.forEach((m, j) => {
                        answer[i].answerOption[j].sortNum += m.sortNum
                    })
                    answer[i].answerPersonNum++
                    break;

                case 6: //矩阵单选
                    f = false
                    lineOption.forEach((m, j) => {
                        let index = m.columnOption.findIndex(c => c.isAnswer === true)
                        if (index !== -1) {
                            f = true
                            answer[i].answerOption[j].columnOption[index].chooseNum++
                        }
                    })
                    if (f)
                        answer[i].answerPersonNum++
                    break;

                case 7: //多项填空
                    option.forEach((m, j) => {
                        answer[i].answerOption[j].answerText.push(m.answer)
                    })
                    answer[i].answerPersonNum++
                    break;

                case 8: //下拉
                    option.forEach((m, j) => {
                        index = answer[i].answerOption[j].dropOption.findIndex(c => c.text === m.answer)
                        answer[i].answerOption[j].dropOption[index].chooseNum++
                    })
                    answer[i].answerPersonNum++
                    break;

                case 9: //量表
                    f = false
                    index = option.findIndex(c => c.isAnswer === true)
                    if (index !== -1) {
                        answer[i].answerOption[index].chooseNum++
                        f = true
                    }
                    if (f)
                        answer[i].answerPersonNum++
                    break;

                case 10: //比重
                    option.forEach((m, j) => {
                        answer[i].answerOption[j].proportion += m.proportion
                    })
                    answer[i].answerPersonNum++
                    break;

                default:
                    break;
            }
        })
        let finishQuestionnaire = {
            relyid: questionnaire._id,
            describe: questionnaire.describe,
            title: questionnaire.title,
            finishDate,
            totalTime,
            finishTime,
            questions
        }
        // 将回答问卷得数据上传到发布者
        wx.cloud.callFunction({
            name: 'answerSubmit',
            data: {
                id: questionnaire._id,
                answer: answer,
                finishPerson:questionnaire.finishPerson
            }
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
        // 将自己完成的问卷同步到数据库
        finishQuestionnaires.add({
            data: {
                ...finishQuestionnaire
            }
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
        wx.hideLoading()

    }

})