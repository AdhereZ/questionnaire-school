import regeneratorRuntime from '../../../lib/runtime/runtime';
import { chooseImage,cloudUploadFile } from "../../../utils/asyncWx.js";
import getID from '../../../utils/getID'

const db = wx.cloud.database();
const questionnaire = db.collection('questionnaire');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: '',
        option: [
            {
                option_id: getID(7),
                type_id:1,
                isAnswer:false,
                optionContent: null,
            }
        ],
        question:{
            questionTitle: '',
            question_id:null,
            typecode: 2,
            required: false,
            max: 1,
            min: 1,
            option:[
                {
                    type_id:1,
                    option_id:null,
                    isAnswer:false,
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
       // 如果是编辑的题目就用原来的question_id
       let question_id=options.question_id? options.question_id: getID(5)
       let {question}=this.data
       question.question_id=question_id
       this.setData({
         id:options.id,
         question
       })
    },

    
    onReady: function () {
        let { mostNum, option } = this.data
        mostNum = option.length
        this.setData({
            mostNum
        })
    },

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
            type_id:1,
            isAnswer:false,
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
        let { option, leastNum, leastAddFlag, mostAddFlag,mostSubFlag } = this.data
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
            mostSubFlag =true
        this.setData({
            mostNum: value,
            leastAddFlag,
            mostAddFlag,
            mostSubFlag 
        })

       
    },
    async handleSubmit(e) {
        console.log(e);
        let {question,option,switchData}=this.data
        let {checkbox,min,max}=e.detail.value
        for(let i=0;i<checkbox.length;i++) {
            let index=parseInt(checkbox[i])
            option[index].type_id=3
        }
        question.max=parseInt(max)
        question.min=parseInt(min)

        var params=[]
        for ( var key in e.detail.value) {
            var param = {};
            param.option= key;
            param.optionContent= e.detail.value[key];
            params.push(param);
        }        
         for(let i=0;i<option.length;i++) {
             if(option[i].type_id!==2)
             option[i].optionContent=params[i+1].optionContent
         }
         question.option=option
         question.required=switchData.isOn
         question.questionTitle=params[params.length-1].optionContent
        console.log(question);
         console.log(option);
         let questions=[]
         const res=await questionnaire.doc(this.data.id).get()
         questions=res.data.questions
         console.log(questions);
         questions=[...questions,question]
         console.log(questions);
         questionnaire.doc(this.data.id)
         .update({
             data:{
                questions
             }
         })
         .then(res=> {
            console.log(res);
         })
         .catch(err=> {
            console.log(err);
         }
         )
         this.setData({
           question,
           option, 
         })  
         wx.navigateTo({
           url: `/pages/createQuestionnaire/createQuestionnaire?id=${this.data.id}`,
         })
    },
    async chooseImg(e) {
        let {index} = e.currentTarget.dataset
       const res=await chooseImage()
       const res1 = await cloudUploadFile(res.tempFilePaths[0])
       let {option}=this.data 
       option[index].type_id=2
       option[index].optionContent=res1.fileID
       this.setData({
          option
       })
    },
    handleBlank(e) {
        console.log(e);
        let {idx} = e.target.dataset
        let {option}=this.data 
        if(option[idx].type_id === 1)
        option[idx].type_id=3
        else if(option[idx].type_id === 3)
        option[idx].type_id=1
   
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