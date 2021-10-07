import regeneratorRuntime from '../../../lib/runtime/runtime';
import { chooseImage, cloudUploadFile,showToast } from "../../../utils/asyncWx.js";
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
        selectArray: [{
            "id": 1,
            "text": "1"
        }, {
            "id": 2,
            "text": "2"
        },
        {
            "id": 3,
            "text": "3"
        },
        {
            "id": 4,
            "text": "4"
        },
        {
            "id": 5,
            "text": "5"
        },],
        question: {
            questionTitle: '',
            question_id: null,
            typecode: 9,
            required: false,
            rightTab: '',
            leftTab: '',
            magnitude: 1,
            option: []
        },
        selectText: '1'

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
    tagSwitch(event) {

        this.data.switchData.isOn = !this.data.switchData.isOn
        this.setData({
            switchData: this.data.switchData
        });
    },
    async handleSubmit(e) {
        console.log(e);
        let { question, switchData, selectText, } = this.data
        let { option } = question
        let { questionTitle, leftTab, rightTab } = e.detail.value
        //检测标题是否为空
        if (questionTitle === '') {
            await showToast({ title: '标题不能为空' })
            return
        }
        if(leftTab === '') {
            await showToast({ title: '左标签不能为空' })
            return
        }
        if(rightTab === '') {
            await showToast({ title: '右标签不能为空' })
            return
        }
        if(leftTab === rightTab) {
            await showToast({ title: '左右标签内容不能重复' })
            return
        }
        question.questionTitle = questionTitle
        question.required = switchData.isOn
        question.leftTab = leftTab
        question.rightTab = rightTab
        question.magnitude = parseInt(selectText)
        option = []
        for (let i = 0; i < question.magnitude; i++) {
            let newOption = {
                option_id: getID(7),
                isAnswer: false,
                optionContent: i + 1,
            }
            option.push(newOption)
        }
        question.option = option
        console.log(question);
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
            question
        })
        wx.navigateBack({
            delta: 1
            // url: `/pages/createQuestionnaire/createQuestionnaire?openid=${openid}`,
        })
    }
})