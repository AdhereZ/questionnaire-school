// pages/preview/childCmp/completeCard/completeCard.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        index: {
            type: Number,
            value: 1,
        },
        question: {
            type: Object,
        },
        choose: {
            type: Boolean
        }



    },

    ready() {
    },
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        questionEditor(e) {
            console.log(e);
            let { question} = this.data
            let { typecode } = question
            let editorPage = ''
            switch (typecode) {
                case 1:
                    editorPage = 'single'
                    break;
                case 2:
                    editorPage = 'multipleChoice'
                    break;
                case 3:
                    editorPage = 'fillBlanks'
                    break;
                case 4:
                    editorPage = 'score'
                    break;
                case 5:
                    editorPage = 'sort'
                    break;
                case 6:
                    editorPage = 'matrixRadio'
                    break;
                case 7:
                    editorPage = 'multipleBlanks'
                    break;
                case 8:
                    editorPage = 'dropDown'
                    break;
                case 9:
                    editorPage = 'scale'
                    break;
                case 10:
                    editorPage = 'proportion'
                    break;
                default:
                    break;
            }
            this.editorNavigate(editorPage,question.question_id)

        },
        editorNavigate(editorPage,questionId) {
            console.log(questionId);
            wx.navigateTo({
                url: `/pages/editor/${editorPage}/${editorPage}?question_id=${questionId}`,
            })
        },
        handleChoose() {
            let {index} = this.data
            this.triggerEvent('tapTrigger',index)
            
        },
        questionRemove(e) {
            let {index} = this.data
            this.triggerEvent('remove',index)
        }
    }
})
