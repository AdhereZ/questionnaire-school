import { showToast } from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

const db = wx.cloud.database();
const questionnaire = db.collection('questionnaire');
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    async handleSubmit(e) {
        let {title} =e.detail.value
        console.log(e.detail.value);
        if(!title) {
            await showToast({ title: "您还没有输入标题" })
            return
        }
        questionnaire.add({
            data: {
                title
            }
        })
        .then(res=> {
            wx.navigateTo({
              url: `/pages/createQuestionnaire/createQuestionnaire?id=${res._id}`,
            })
        })
        .catch(err=> {
            console.log('错误',err);
        })
    }
})