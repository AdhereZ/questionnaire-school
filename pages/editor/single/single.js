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
        switchData: {
            id: 1,
            color: '#aabbfd',
            isOn: false
          },
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
            typecode: 1,
            required: false,
            option:[
                {
                    type_id:1,
                    option_id:null,
                    isAnswer:false,
                    optionContent: null,
                }

            ]
        },
          Img: ''

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
    addOption(e) {
      console.log(e);
      let { option } = this.data
      let newOption = { 
          option_id: getID(7),
          type_id:1,
          isAnswer:false,
          optionContent: null
     }
      option.push(newOption)
      this.setData({
          option
      })
  },
   async chooseImg(e) {
      let {index} = e.currentTarget.dataset
     const res=await chooseImage()
    //  console.log(res.tempFilePaths[0]);
    //  this.setData({
    //    Img: res.tempFilePaths[0]
    //  })
     const res1 = await cloudUploadFile(res.tempFilePaths[0])
     let {option}=this.data 
     option[index].type_id=2
     option[index].optionContent=res1.fileID
     this.setData({
        option
     })
  },
 
  deleteoption(e) {
      let { option} = this.data
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
    async handleSubmit(e) {
      console.log(e);
        let {question,option,switchData}=this.data
        let {checkbox}=e.detail.value
        for(let i=0;i<checkbox.length;i++) {
            let index=parseInt(checkbox[i])
            option[index].type_id=3
        }
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
         console.log(res);
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