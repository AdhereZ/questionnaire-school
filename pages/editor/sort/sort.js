import regeneratorRuntime from '../../../lib/runtime/runtime';
import { chooseImage, cloudUploadFile, cloudDeleteFile,showToast } from "../../../utils/asyncWx.js";
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
    option: [
      {
        option_id: getID(7),
        type_id: 1,
        isAnswer: false,
        optionContent: null,
        sortNum: null
      }
    ],
    question: {
      questionTitle: '',
      question_id: null,
      typecode: 5,
      required: false,
      img: [],
      hasImg: false,
      option: [
        {
          type_id: 1,
          option_id: null,
          isAnswer: false,
          optionContent: null,
          sortNum: null
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
      let { switchData, leastNum, mostNum, mostAddFlag } = this.data
      switchData.isOn = question.required
      if (mostNum === 1 && option.length > 1)
        mostAddFlag = true
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
  addOption() {
    let { option } = this.data
    let newOption = {
      option_id: getID(7),
      type_id: 1,
      isAnswer: false,
      optionContent: null,
      sortNum: null
    }
    option.push(newOption)
    this.setData({
      option
    })
  },
  deleteoption(e) {
    let { option } = this.data
    let index = e.currentTarget.dataset.index
    option.splice(index, 1)
    this.setData({
      option
    })
  },
  tagSwitch(event) {
    this.data.switchData.isOn = !this.data.switchData.isOn
    this.setData({
      switchData: this.data.switchData
    });
  },
  async chooseImg(e) {
    let { option, question } = this.data
    let { img, hasImg } = question
    let { index } = e.currentTarget.dataset
    if (option[index].type_id === 2) {
      let idx = img.findIndex(v => v.fileID === option[index].imageID)
      img.splice(idx, 1)
      const res2 = await cloudDeleteFile(option[index].imageID)
      console.log(res2);
    }
    const res = await chooseImage()
    const res1 = await cloudUploadFile(res.tempFilePaths[0])
    option[index].type_id = 2
    let newImg = {
      imgID: getID(8),
      fileID: res1.fileID
    }
    img.push(newImg)
    hasImg = true
    question.img = img
    question.hasImg = hasImg
    option[index].imageID = res1.fileID
    console.log(option);
    this.setData({
      option,
      question
    })
  },
  titleInput(e) {
    let { value } = e.detail
    let { question } = this.data
    question.questionTitle = value
    this.setData({
      question
    })
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
    let { question, option, switchData,  } = this.data
     //检测标题是否为空
     if(e.detail.value.questionTitle === '') {
      await showToast({title: '标题不能为空'})
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
      if(params[i].optionContent === '') {
        await showToast({title: '选项不能为空'})
        return
      }
      option[i].optionContent = params[i].optionContent
    }
    
    //检测是否有重复选项
    let opc=[]
    for (let i = 0; i < option.length; i++) {
      opc[i] = option[i].optionContent
    }
    let flag = this.checkUnique(opc)
    if(flag) {
      await showToast({title: '选项内容不能重复'})
      return
    }
    question.option = option
    question.required = switchData.isOn
    question.questionTitle = params[params.length - 1].optionContent
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