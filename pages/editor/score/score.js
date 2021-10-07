import regeneratorRuntime from '../../../lib/runtime/runtime';
import { chooseImage, cloudUploadFile,showToast } from "../../../utils/asyncWx.js";
import getID from '../../../utils/getID'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    switchData: {
      id: 1,
      color: '#aabbfd',
      isOn: false
    },
    option: {
      option_id: getID(7),
      isAnswer: false,
      score: null
    },
    question: {
      questionTitle: '',
      question_id: null,
      typecode: 4,
      required: false,
      option:
      {
        option_id: null,
        isAnswer: false,
        score: null
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
  tagSwitch(event) {

    this.data.switchData.isOn = !this.data.switchData.isOn
    this.setData({
      switchData: this.data.switchData
    });
  },
  async handleSubmit(e) {
    let { question, option, switchData, } = this.data
    // console.log(e);
    let { questionTitle } = e.detail.value
    //检测标题是否为空
    if(e.detail.value.questionTitle === '') {
      await showToast({title: '标题不能为空'})
      return
    }
    question.questionTitle = questionTitle
    question.required = switchData.isOn
    question.option = option
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
  }


})