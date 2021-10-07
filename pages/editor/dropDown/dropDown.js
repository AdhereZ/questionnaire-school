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
        dropOption: [
            {
                id: getID(7),
                text: '',
            }
        ],
        option: [
            {
                option_id: getID(7),
                isAnswer: false,
                optionContent: null,
                select: '',
                dropOption: [
                    {
                        id: null,
                        text: '',
                    }
                ],
            }
        ],
        question: {
            questionTitle: '',
            question_id: null,
            typecode: 8,
            required: false,
            option: [
                {
                    option_id: null,
                    isAnswer: false,
                    optionContent: null,
                    select: '',
                    dropOption: [
                        {
                            id: null,
                            text: '',
                        }
                    ],
                }

            ]
        },


        switchData: {
            id: 1,
            color: '#aabbfd',
            isOn: false
        },

    },
    onLoad: function (options) {
        if (options.question_id) {
            let questionnaire = wx.getStorageSync('questionnaire')
            let question = questionnaire.questions.find(v => v.question_id === options.question_id
            )
            let option = question.option
            let dropOption = option[0].dropOption
            let { switchData } = this.data
            switchData.isOn = question.required
            this.setData({
                question,
                option,
                switchData,
                dropOption
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
    tagSwitch(event) {
        this.data.switchData.isOn = !this.data.switchData.isOn
        this.setData({
            switchData: this.data.switchData
        });
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
    handleDropInput(e) {
        let { index } = e.currentTarget.dataset
        let value = e.detail.value
        let { dropOption } = this.data
        dropOption[index].text = value
        this.setData({
            dropOption
        })
    },
    addOption() {
        let { option } = this.data
        let newOption = {
            option_id: getID(7),
            isAnswer: false,
            optionContent: null,
            select: '',
            dropOption: [
                {
                    id: null,
                    text: '',
                }
            ],
        }
        option.push(newOption)
        this.setData({
            option
        })
    },
    deleteoption(e) {
        let { option } = this.data
        console.log(option);
        let index = e.currentTarget.dataset.index
        option.splice(index, 1)
        console.log(option);
        this.setData({
            option
        })
    },
    addDropOption(e) {
        let { dropOption } = this.data
        let newOption = {
            id: getID(7),
            text: '',
        }
        dropOption.push(newOption)
        console.log(dropOption);
        this.setData({
            dropOption
        })
    },
    deleteDropOption(e) {
        let { dropOption } = this.data
        let { id2 } = e.currentTarget.dataset
        dropOption.splice(id2, 1)
        this.setData({
            dropOption
        })
    },
    //检测选项是否有重复
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
        let { question, option, dropOption, switchData } = this.data
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
        let i
        for (i = 0; i < option.length; i++) {
            if (params[i].optionContent === '') {
                await showToast({ title: '选项标题不能为空' })
                return
            }
            option[i].optionContent = params[i].optionContent
        }
        for (let j = 0; j < dropOption.length; j++) {
            if (params[i].optionContent === '') {
                await showToast({ title: '下拉选项不能为空' })
                return
            }
            dropOption[j].text = params[i++].optionContent
        }
        //检测是否有重复选项
        let opc = []
        for (let i = 0; i < option.length; i++) {
            opc[i] = option[i].optionContent
        }
        let flag = this.checkUnique(opc)
        if (flag) {
            await showToast({ title: '选项标题内容不能重复' })
            return
        }
        let dpc = []
        for (let i = 0; i < dropOption.length; i++) {
            dpc[i] = dropOption[i].text
        }
        flag = this.checkUnique(dpc)
        if (flag) {
            await showToast({ title: '下拉选项内容不能重复' })
            return
        }
        for (let j = 0; j < option.length; j++) {
            option[j].dropOption = dropOption
        }
        console.log(option);
        question.option = option
        question.required = switchData.isOn
        question.questionTitle = e.detail.value.questionTitle
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
            dropOption
        })
        wx.navigateBack({
            // url: `/pages/createQuestionnaire/createQuestionnaire?openid=${openid}`,
            delta: 1
        })
    }


})