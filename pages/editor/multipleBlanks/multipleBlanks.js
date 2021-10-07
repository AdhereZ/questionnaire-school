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
        selectText: '字符',
        id: '',
        option: [
            {
                option_id: getID(7),
                isAnswer: false,
                answer: '',
                optionContent: '',
            }
        ],
        question: {
            questionTitle: '',
            question_id: null,
            typecode: 7,
            required: false,
            word_num: null,
            type: "字符",
            option: [
                {
                    option_id: null,
                    isAnswer: false,
                    answer: '',
                    optionContent: '',
                }
            ]
        },
    },
    onLoad: function (options) {
        if (options.question_id) {
            let questionnaire = wx.getStorageSync('questionnaire')
            let question = questionnaire.questions.find(v => v.question_id === options.question_id
            )
            let option = question.option
            let { switchData, leastSubFlag, leastAddFlag } = this.data
            switchData.isOn = question.required
            leastSubFlag = true
            leastAddFlag = true
            if (option.length === 1)
                leastSubFlag = false

            this.setData({
                question,
                option,
                switchData,
                leastSubFlag,
                leastAddFlag
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
    leastSub() {
        let { leastNum, leastSubFlag, leastAddFlag, option } = this.data
        leastAddFlag = true
        if (leastNum === 1) {
            return
        }

        else {
            leastNum--
            if (leastNum === 1)
                leastSubFlag = false
            option.splice(option.length - 1, 1)
        }
        this.setData({
            leastNum,
            leastSubFlag,
            leastAddFlag,
            option
        })

    },
    leastAdd() {
        let { leastNum, leastSubFlag, option } = this.data
        let newfb = {
            option_id: getID(7),
            isAnswer: false,
            answer: '',
            optionContent: '',
        }
        option.push(newfb)
        leastSubFlag = true
        leastNum++
        this.setData({
            leastNum,
            leastSubFlag,
            option
        })
    },
    changeLeastNum(e) {
        let { value } = e.detail
        let { leastSubFlag, option } = this.data

        if (value === '')
            value = 1
        value = parseInt(value)
        if (value <= 1) {
            value = 1
            leastSubFlag = false
        }
        if (value < option.length) {
            option.splice(value, option.length - value)
        }
        else {
            let x = option.length
            for (let i = x; i < value; i++) {
                let newfb = {
                    option_id: getID(7),
                    isAnswer: false,
                    answer: '',
                    optionContent: '',
                }
                option.push(newfb)
            }
        }
        this.setData({
            leastNum: value,
            leastSubFlag,
            option
        })
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
    checkUnique(arr) {
        var narr = arr.sort();
        for (var i = 0; i < arr.length; i++) {
            if (narr[i] == narr[i + 1]) {
                return true;
            }
        }
        return false
    },
    async handleSubmit(e) {
        let { question, option, switchData, selectText } = this.data
        let { questionTitle } = e.detail.value
        question.questionTitle = questionTitle
        //检测标题是否为空
        if (e.detail.value.questionTitle === '') {
            await showToast({ title: '标题不能为空' })
            return
        }
        //检查选项是否为空
        var params = []
        for (var key in e.detail.value) {
            var param = {};
            param.option = key;
            param.optionContent = e.detail.value[key];
            params.push(param);
        }
        console.log(params);
        for (let i = 0; i < option.length; i++) {
            if (params[i].optionContent === '') {
                await showToast({ title: '选项不能为空' })
                return
            }
            option[i].optionContent = params[i].optionContent
        }
        //检测是否有重复选项
        let opc = []
        for (let i = 0; i < option.length; i++) {
            opc[i] = option[i].optionContent
        }
        let flag = this.checkUnique(opc)
        if (flag) {
            await showToast({ title: '选项内容不能重复' })
            return
        }
        question.required = switchData.isOn
        question.type = selectText
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
            question,
            option,
        })
        wx.navigateBack({
            delta: 1
            // url: `/pages/createQuestionnaire/createQuestionnaire?openid=${openid}`,
        })
    },
    handleInput(e) {
        let { index } = e.currentTarget.dataset
        let { value } = e.detail
        let { option } = this.data
        option[index].optionContent = value
        this.setData({
            option
        })
    },
})