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
        option: [
            {
                option_id: null,
                isAnswer: false,
                optionContent: null,
            }
        ],
        switchData: {
            id: 1,
            color: '#aabbfd',
            isOn: false
        },
        proportionNum: 10,
        subFlag: false,
        addFlag: true,
        option: [
            {
                option_id: getID(7),
                isAnswer: false,
                optionContent: null,
                lastproportion: 0,
                proportion: 0
            }
        ],
        question: {
            questionTitle: '',
            question_id: null,
            typecode: 10,
            required: false,
            totalProportion: 10,
            option: [
                {
                    option_id: null,
                    isAnswer: false,
                    optionContent: null,
                    lastproportion: 0,
                    proportion: 0
                }
            ]
        }

    },
    onLoad: function (options) {
        if (options.question_id) {
            let questionnaire = wx.getStorageSync('questionnaire')
            let question = questionnaire.questions.find(v => v.question_id === options.question_id
            )
            let option = question.option
            let { switchData, proportionNum, subFlag, addFlag } = this.data
            let { totalProportion } = question
            proportionNum = totalProportion
            if (proportionNum > 10 && proportionNum < 100) {
                subFlag = true
                addFlag = true
            }
            else if (proportionNum === 10) {
                subFlag = false
                addFlag = true
            }
            else if (proportionNum === 100) {
                subFlag = true
                addFlag = false
            }
            switchData.isOn = question.required
            this.setData({
                question,
                option,
                switchData,
                proportionNum,
                subFlag,
                addFlag
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
    addOption() {
        let { option } = this.data
        let newOption = {
            option_id: null,
            isAnswer: false,
            optionContent: null,
            lastproportion: 0,
            proportion: 0
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
    Sub() {
        let { proportionNum, subFlag, addFlag } = this.data
        addFlag = true
        if (proportionNum === 10) {
            return
        }

        else {
            proportionNum--
            if (proportionNum === 10)
                subFlag = false
        }
        this.setData({
            proportionNum,
            subFlag,
            addFlag
        })

    },
    Add() {
        let { proportionNum, subFlag, addFlag } = this.data
        subFlag = true
        if (proportionNum >= 100) {
            addFlag = false
            return
        }

        else {
            proportionNum++
            if (proportionNum >= 100) {
                addFlag = false
            }

        }
        this.setData({
            proportionNum,
            subFlag,
            addFlag
        })
    },
    changeProportion(e) {
        let { value } = e.detail
        let { proportionNum, subFlag, addFlag } = this.data

        if (value === '')
            value = 10
        value = parseInt(value)
        if (value > 10 && value < 100) {
            subFlag = true
            addFlag = true

        }
        if (value <= 10) {
            value = 10
            subFlag = false
            addFlag = true
        }
        if (value >= 100) {
            value = 100
            subFlag = true
            addFlag = false
        }
        this.setData({
            proportionNum: value,
            subFlag,
            addFlag
        })
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
        let { totalProportion, questionTitle } = e.detail.value
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
          await showToast({title: '类别选项不能为空'})
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
        question.required = switchData.isOn
        question.questionTitle = questionTitle
        question.totalProportion = totalProportion
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
    },
    titleInput(e) {
        let { value } = e.detail
        let { question } = this.data
        question.questionTitle = value
        this.setData({
            question
        })
    },
    handleInput(e) {
        let { index } = e.currentTarget.dataset
        console.log(index);
        let { value } = e.detail
        let { option } = this.data
        option[index].optionContent = value
        this.setData({
            option
        })
    },
})