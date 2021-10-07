import regeneratorRuntime from '../../../lib/runtime/runtime';
import { chooseImage, cloudUploadFile, showToast } from "../../../utils/asyncWx.js";
import getID from '../../../utils/getID'

const db = wx.cloud.database();
const questionnaire = db.collection('questionnaire');
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
        selectArray: [
            {
                "id": "12",
                "text": "字符"
            }, {
                "id": "10",
                "text": "字母"
            }, {
                "id": "21",
                "text": "汉字"
            },
            {
                "id": "11",
                "text": "数字"
            }],
        selectText: '字符',
        id: '',
        option: {
            option_id: getID(7),
            type: "字符",
            isAnswer: false,
            optionContent: null,
        },
        question: {
            questionTitle: '',
            question_id: null,
            typecode: 3,
            required: false,
            word_num: 100,
            option:
            {
                type: "字符",
                option_id: null,
                isAnswer: false,
                answer: '',
            }
        },

    },

    onLoad: function (options) {
        if (options.question_id) {
            let questionnaire = wx.getStorageSync('questionnaire')
            let question = questionnaire.questions.find(v => v.question_id === options.question_id
            )
            let option = question.option
            let { switchData } = this.data
            switchData.isOn = question.required
            this.setData({
                question,
                option,
                switchData,
            })
        }
        else {
            // 如果是编辑的题目就用原来的question_id
            let question_id = getID(5)
            let { question } = this.data
            question.question_id = question_id
            this.setData({
                question
            })
        }
    },


    getSelect(e) {
        console.log(e.detail.value);
        this.setData({
            selectText: e.detail.value
        })
    },
    async handleSubmit(e) {
        let { question, option, switchData, selectText } = this.data
        // console.log(e);
        let { word_num, questionTitle } = e.detail.value
        //检测标题是否为空
        if (e.detail.value.questionTitle === '') {
            await showToast({ title: '标题不能为空' })
            return
        }
        question.questionTitle = questionTitle
        question.word_num = word_num
        question.required = switchData.isOn
        // console.log(selectText);
        option.type = selectText
        // console.log(option);
        question.option = option
        // console.log(question);
        let questions = []
        let questionnaire = wx.getStorageSync('questionnaire')
        if (questionnaire.questions)
            questions = questionnaire.questions
        let index = questions.findIndex(v => v.question_id === question.question_id)
        if (index === -1)
            questions = [...questions, question]
        else
            questions[index] = question
        questionnaire.questions = questions
        wx.setStorageSync('questionnaire', questionnaire)
        this.setData({
            question,
            option,
        })
        wx.navigateBack({
            // url: `/pages/createQuestionnaire/createQuestionnaire?openid=${openid}`,
            delta: 1
        })
    },
    tagSwitch(event) {
        this.data.switchData.isOn = !this.data.switchData.isOn
        this.setData({
            switchData: this.data.switchData
        });
    },
})