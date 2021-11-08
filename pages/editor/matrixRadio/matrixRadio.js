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
    id: '',
    switchData: {
      id: 1,
      color: '#aabbfd',
      isOn: false
    },
    lineOption: [
      {
        line_id: getID(7),
        lineContent: '',
        columnOption: []

      }
    ],
    columnOption: [
      {
        column_id: getID(7),
        columnContent: '',
        isAnswer: false

      }
    ],
    question: {
      questionTitle: '',
      question_id: null,
      typecode: 6,
      required: false,
      lineOption: [
        {
          line_id: null,
          lineContent: '',
          columnOption: []
        }
      ]
    },

  },
  onLoad: function (options) {
    if (options.question_id) {
      let questionnaire = wx.getStorageSync('questionnaire')
      let question = questionnaire.questions.find(v => v.question_id === options.question_id
      )
      let lineOption = question.lineOption
      let columnOption = lineOption[0].columnOption
      let { switchData } = this.data
      switchData.isOn = question.required
      this.setData({
        question,
        lineOption,
        columnOption,
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
  addOption() {
    let { lineOption } = this.data
    let newOption = {
      line_id: getID(7),
      lineContent: '',
      columnOption: []
    }
    lineOption.push(newOption)
    this.setData({
      lineOption
    })
  },
  deleteoption(e) {
    let { lineOption } = this.data
    let index = e.currentTarget.dataset.index
    lineOption.splice(index, 1)
    this.setData({
      lineOption
    })
  },
  addCOption() {
    let { columnOption } = this.data
    let newOption = {
      column_id: getID(7),
      columnContent: '',
      isAnswer: false
    }
    columnOption.push(newOption)
    this.setData({
      columnOption
    })
  },
  deleteCoption(e) {
    let { columnOption } = this.data
    let index = e.currentTarget.dataset.index
    columnOption.splice(index, 1)
    this.setData({
      columnOption
    })
  },
  tagSwitch(event) {

    this.data.switchData.isOn = !this.data.switchData.isOn
    this.setData({
      switchData: this.data.switchData
    });
  },
  checkUnique(arr) {
    var narr=arr.sort();
    for(var i=0;i<arr.length;i++){
       if (narr[i]==narr[i+1]){
          return true;
       }
    }
    return false
  },
  async handleSubmit(e) {
    console.log(e);
    let { lineOption, columnOption, question, switchData } = this.data
    //检测标题是否为空
    if(e.detail.value.questionTitle === '') {
      await showToast({title: '标题不能为空'})
      return
    }
    var params = []
    for (var key in e.detail.value) {
      var param = {};
      param.option = key;
      param.optionContent = e.detail.value[key];
      params.push(param);
    }
    console.log(params);
    let i
    for (i = 0; i < lineOption.length; i++) {
      if(params[i].optionContent === '') {
        await showToast({title: '行标题不能为空'})
        return
      }
      lineOption[i].lineContent = params[i].optionContent
    }
    for (let j = 0; j < columnOption.length; j++) {
      if(params[i].optionContent === '') {
        await showToast({title: '列选项不能为空'})
        return
      }
      columnOption[j].columnContent = params[i].optionContent
      i++
    }
    console.log(lineOption);
    console.log(columnOption);
    //检测是否有重复选项
    let lpc=[]
    for (let i = 0; i < lineOption.length; i++) {
      lpc[i] = lineOption[i].lineContent
    }
    console.log(lpc);
    let flag = this.checkUnique(lpc)
    if(flag) {
      await showToast({title: '行标题内容不能重复'})
      return
    }
    let cpc=[]
    for (let i = 0; i < columnOption.length; i++) {
      cpc[i] = columnOption[i].columnContent
    }
     flag = this.checkUnique(cpc)
    if(flag) {
      await showToast({title: '列选项内容不能重复'})
      return
    }
    
    question.required = switchData.isOn
    question.questionTitle = params[params.length - 1].optionContent
    lineOption.forEach(v => {
      v.columnOption = columnOption
    })
    question.lineOption = lineOption
    let questions = []
    let questionnaire = wx.getStorageSync('questionnaire')
    if(questionnaire.questions)
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
      columnOption,
      lineOption
    })
    wx.navigateBack({
      delta: 1
      // url: `/pages/createQuestionnaire/createQuestionnaire?openid=${openid}`,
    })
  },
  handleLineInput(e) {
    let { index } = e.currentTarget.dataset
    let { value } = e.detail
    let { lineOption } = this.data
    lineOption[index].lineContent = value
    this.setData({
      lineOption
    })
  },
  handleColumnInput(e) {
    let { index } = e.currentTarget.dataset
    let { value } = e.detail
    let { columnOption } = this.data
    columnOption[index].columnContent = value
    this.setData({
      columnOption
    })
  }

})