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
          option: {
                option_id: getID(7),
                isAnswer:false,
                score: null
            },
            question:{
              questionTitle: '',
              question_id:null,
              typecode: 4,
              required: false,
              option:
                  {
                      option_id:null,
                      isAnswer:false,
                      score: null
                  }
  
              
          },
      
    },

    onLoad: function (options) {
      let question_id=options.question_id? options.question_id: getID(5)
      let {question}=this.data
      question.question_id=question_id
      this.setData({
        id:options.id,
        question
      })
    },
    tagSwitch(event) {
       
        this.data.switchData.isOn = !this.data.switchData.isOn
        this.setData({
          switchData: this.data.switchData
        });
    },
    async handleSubmit(e) {
      let {question,option,switchData}=this.data
      // console.log(e);
      let {questionTitle} = e.detail.value
      question.questionTitle=questionTitle
      question.required=switchData.isOn
      question.option=option
      let questions=[]
        const res=await questionnaire.doc(this.data.id).get()
         questions=res.data.questions
        //  console.log(questions);
         questions=[...questions,question]
        //  console.log(questions);
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
    }

  
})