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
        switchData: {
            id: 1,
            color: '#aabbfd',
            isOn: false
          },
          selectArray: [
            {
                "id": "12",
                "text": "字符"
            },{
            "id": "10",
            "text": "字母"
        }, {
            "id": "21",
            "text": "汉字"
        },
        {
            "id": "11",
            "text": "数字"
        }],
        selectText: '数字',
        id: '',
        option: {
                option_id: getID(7),
                type: "字符",
                isAnswer:false,
                optionContent: null,
            } ,
        question:{
            questionTitle: '',
            question_id:null,
            typecode: 3,
            required: false,
            word_num: null,
            option:
                {
                    type: "字符",
                    option_id:null,
                    isAnswer:false,
                    answer: '',
                    optionContent: null,
                }

            
        },

    },

    onLoad: function (options) {   
        // console.log(options);
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


    getSelect(e) {
        console.log(e.detail.value);
        this.setData({
            selectText: e.detail.value
        })
    },
   async handleSubmit(e) {
        let {question,option,switchData,selectText}=this.data
        // console.log(e);
        let {word_num,questionTitle} = e.detail.value
        question.questionTitle=questionTitle
        question.word_num=word_num
        question.required=switchData.isOn
        // console.log(selectText);
        option.type=selectText
        // console.log(option);
        question.option=option
        // console.log(question);
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
    }
})