import regeneratorRuntime from '../../../lib/runtime/runtime';
import { chooseImage, cloudUploadFile, cloudDeleteFile,showToast } from "../../../utils/asyncWx.js";
import getID from '../../../utils/getID'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: '',
        option: [
            {
                option_id: getID(7),
                type_id: 1,
                isAnswer: false,
                optionContent: null,
            }
        ],
        question: {
            questionTitle: '',
            question_id: null,
            typecode: 2,
            required: false,
            max: 1,
            min: 1,
            img: [],
            hasImg: false,
            option: [
                {
                    type_id: 1,
                    option_id: null,
                    isAnswer: false,
                    optionContent: null,
                }

            ]
        },
        switchData: {
            id: 1,
            color: '#aabbfd',
            isOn: false
        },
        leastNum: 1,
        leastSubFlag: false,
        leastAddFlag: false,

        mostNum: 1,
        mostSubFlag: false,
        mostAddFlag: false,


    },
    onLoad: function (options) {
        console.log(options);
        if (options.question_id) {
            let questionnaire = wx.getStorageSync('questionnaire')
            let question = questionnaire.questions.find(v => v.question_id === options.question_id
            )
            console.log(question);
            let option = question.option
            let { switchData, leastNum, mostNum, mostAddFlag, mostSubFlag, leastSubFlag, leastAddFlag } = this.data
            switchData.isOn = question.required
            leastNum = question.min
            mostNum = question.max
            console.log(mostNum);
            if (mostNum === 1 && option.length > 1)
                mostAddFlag = true
            if (mostNum < option.length)
                mostAddFlag = true
            if (mostNum > leastNum) {
                mostSubFlag = true
                leastAddFlag = true
            }
            if (leastNum > 1) {
                leastSubFlag = true
            }
            this.setData({
                question,
                option,
                switchData,
                leastNum,
                mostNum,
                mostAddFlag,
                mostSubFlag,
                leastAddFlag,
                leastSubFlag
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

    handleInput(e) {
        let { index } = e.currentTarget.dataset
        let { value } = e.detail
        let { option } = this.data
        option[index].optionContent = value
        this.setData({
            option
        })
    },
    // onReady: function () {
    //     let { mostNum, option } = this.data
    //     mostNum = option.length
    //     this.setData({
    //         mostNum
    //     })
    // },

    tagSwitch(event) {
        this.data.switchData.isOn = !this.data.switchData.isOn
        this.setData({
            switchData: this.data.switchData
        });
    },
    addOption() {
        let { option, mostAddFlag } = this.data
        let newOption = {
            option_id: getID(7),
            type_id: 1,
            isAnswer: false,
            optionContent: null
        }
        option.push(newOption)
        this.setData({
            option,
            mostAddFlag: true
        })
    },
    deleteoption(e) {
        let { option, mostAddFlag, mostNum, leastNum, leastAddFlag } = this.data


        let index = e.currentTarget.dataset.index
        option.splice(index, 1)
        if (option.length <= mostNum) {
            mostNum = option.length
            if (mostNum <= leastNum) {
                leastNum = mostNum
                leastAddFlag = false
            }
            mostAddFlag = false
        }
        this.setData({
            option,
            leastNum,
            mostNum,
            leastAddFlag,
            mostAddFlag
        })
    },
    leastSub() {
        let { leastNum, leastSubFlag, mostSubFlag, mostNum, leastAddFlag } = this.data
        leastAddFlag = true
        if (leastNum === 1) {
            return
        }

        else {
            leastNum--
            if (mostNum > leastNum)
                mostSubFlag = true
            if (leastNum === 1)
                leastSubFlag = false
        }
        this.setData({
            leastNum,
            leastSubFlag,
            leastAddFlag,
            mostSubFlag
        })

    },
    leastAdd() {
        let { leastNum, leastAddFlag, leastSubFlag, mostSubFlag, mostNum } = this.data
        leastSubFlag = true
        if (leastNum >= mostNum) {
            leastAddFlag = false
            return
        }

        else {
            leastNum++
            if (leastNum >= mostNum) {
                leastAddFlag = false,
                    mostSubFlag = false
            }

        }
        this.setData({
            leastNum,
            leastAddFlag,
            leastSubFlag,
            mostSubFlag
        })
    },
    mostAdd() {
        let { mostAddFlag, mostSubFlag, mostNum, leastAddFlag, leastNum, option } = this.data
        const optionNum = option.length
        if (mostNum === optionNum) {
            mostAddFlag = false
            return
        }

        else {
            mostAddFlag = true
            mostNum++
            mostSubFlag = true
            if (mostNum > leastNum)
                leastAddFlag = true
            if (mostNum === optionNum)
                mostAddFlag = false
        }
        this.setData({
            mostNum,
            mostAddFlag,
            leastAddFlag,
            mostSubFlag

        })

    },
    mostSub() {
        let { leastNum, mostSubFlag, mostAddFlag, leastAddFlag, mostNum } = this.data
        if (mostNum <= leastNum) {
            mostSubFlag = false,
                leastAddFlag = false
            return
        }
        else {
            mostNum--
            mostAddFlag = true
            if (mostNum <= leastNum) {
                mostSubFlag = false
                leastAddFlag = false
            }


        }
        this.setData({
            mostNum,
            mostSubFlag,
            mostAddFlag,
            leastAddFlag
        })
    },
    changeLeastNum(e) {
        let { value } = e.detail
        let { mostNum, leastSubFlag } = this.data

        if (value === '')
            value = 1
        value = parseInt(value)
        if (value <= 1 || value > mostNum) {
            value = 1
            leastSubFlag = false
        }
        this.setData({
            leastNum: value,
            leastSubFlag
        })
    },
    changeMostNum(e) {
        let { option, leastNum, leastAddFlag, mostAddFlag, mostSubFlag } = this.data
        let { value } = e.detail
        if (value === '')
            value = 1
        value = parseInt(value)
        if (value >= option.length) {
            value = option.length
            mostAddFlag = false
        }
        if (leastNum < value)
            leastAddFlag = true
        mostSubFlag = true
        this.setData({
            mostNum: value,
            leastAddFlag,
            mostAddFlag,
            mostSubFlag
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
        console.log(e);
        let { question, option, switchData, } = this.data
        let { checkbox, min, max } = e.detail.value
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
        question.max = parseInt(max)
        question.min = parseInt(min)

        // var params = []
        // for (var key in e.detail.value) {
        //     var param = {};
        //     param.option = key;
        //     param.optionContent = e.detail.value[key];
        //     params.push(param);
        // }
        // for (let i = 0; i < option.length; i++) {
        //         option[i].optionContent = params[i + 1].optionContent
        // }
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
        console.log(res);
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
    handleBlank(e) {
        console.log(e);
        let { idx } = e.target.dataset
        let { option } = this.data
        if (option[idx].type_id === 1)
            option[idx].type_id = 3
        else if (option[idx].type_id === 3)
            option[idx].type_id = 1

        console.log(option[idx].type_id);
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