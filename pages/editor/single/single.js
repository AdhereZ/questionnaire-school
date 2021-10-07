import regeneratorRuntime from '../../../lib/runtime/runtime';
import { chooseImage, cloudUploadFile,cloudDeleteFile,showToast } from "../../../utils/asyncWx.js";
import getID from '../../../utils/getID'

// const db = wx.cloud.database();
// const questionnaire = db.collection('questionnaire');
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
        imageID: ''
      }
    ],
    question: {
      questionTitle: '',
      question_id: null,
      typecode: 1,
      required: false,
      img: [],
      hasImg: false,
      option: [
        {
          type_id: 1,
          option_id: null,
          isAnswer: false,
          optionContent: null,
          imageID: ''
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
          let { switchData } = this.data
          switchData.isOn = question.required
          this.setData({
            question,
            option,
            switchData,
          })
    }
    else {
      let question_id = getID(5)
      let { question } = this.data
      question.question_id = question_id
      this.setData({
        question
      })
    }
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
  addOption(e) {
    let { option } = this.data
    let newOption = {
      option_id: getID(7),
      type_id: 1,
      isAnswer: false,
      optionContent: null
    }
    option.push(newOption)
    this.setData({
      option
    })
  },
  titleInput(e) {
    let {value} = e.detail
    let {question} = this.data
    question.questionTitle=value
    this.setData({
      question  
    })
},
  async chooseImg(e) {
    let { option, question } = this.data
    let { img, hasImg } = question
    let { index } = e.currentTarget.dataset
    if (option[index].type_id === 2) {
      let idx = img.findIndex(v => v.fileID === option[index].imageID)
      img.splice(idx, 1)
      const res2 = await cloudDeleteFile(option[index].imageID)
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
    this.setData({
      option,
      question
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
  //检测选项是否有重复
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
    let { question, option, switchData,  } = this.data
    let { checkbox } = e.detail.value
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
      if(params[i + 1].optionContent === '') {
        await showToast({title: '选项不能为空'})
        return
      }
      option[i].optionContent = params[i + 1].optionContent
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
    for (let i = 0; i < checkbox.length; i++) {
      let index = parseInt(checkbox[i])
      option[index].type_id = 3
    }
    // var params = []
    // for (var key in e.detail.value) {
    //   var param = {};
    //   param.option = key;
    //   param.optionContent = e.detail.value[key];
    //   params.push(param);
    // }
    // console.log(params);
    // for (let i = 0; i < option.length; i++) {
    //     option[i].optionContent = params[i + 1].optionContent
    // }
    question.option = option
    question.required = switchData.isOn
    question.questionTitle = params[params.length - 1].optionContent
    // console.log(question);
    // console.log(option);
    let questions = []
    let questionnaire = wx.getStorageSync('questionnaire')
    if(questionnaire.questions)
    questions = questionnaire.questions
    // console.log(questions);
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
  handleBlank(e) {
    let { idx } = e.target.dataset
    let { option } = this.data
    if (option[idx].type_id === 1)
      option[idx].type_id = 3
    else if (option[idx].type_id === 3)
      option[idx].type_id = 1
    this.setData({
      option
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },


})