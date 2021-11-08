import regeneratorRuntime from '../../lib/runtime/runtime';
import { chooseImage, cloudUploadFile, cloudDeleteFile, cloudIdGet } from "../../utils/asyncWx.js";

const db = wx.cloud.database();
const dbQuestionnaire = db.collection('questionnaire');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionnaires: [],
    chooseID: '',
    openid: ''
  },
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo')
    let openid = userInfo.openid
    wx.cloud.callFunction({
      name: 'getQuestionnaire',
      data: {
        openid,
        condition: 1
      }
    })
      .then(res => {
        console.log(res);
        this.setData({
          questionnaires: res.result.data,
          openid
        })
      })
      .catch(err => {
        console.log('错误', err);
      })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target,
      chooseID: e.currentTarget.dataset.chooseid
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  async publish(e) {
    let { chooseid } = e.currentTarget.dataset
    let now = new Date();
    let publishTime = {
      year: now.getFullYear().toString(),
      month: (now.getMonth()+1).toString(),
      date: now.getDate().toString(),
      hour: now.getHours() < 10 ? '0' + now.getHours().toString(): now.getHours().toString(),
      minute: now.getMinutes() < 10 ? '0' + now.getMinutes().toString(): now.getMinutes().toString(),
      second: now.getSeconds() < 10 ? '0' + now.getSeconds().toString(): now.getSeconds().toString(),
      currentTime: now.getTime()
  }
  let qrCode
   await new Promise((resolve,reject) => {
    wx.cloud.callFunction({
      name: 'createCode',
      data: {
        page: `pages/questionnaire/questionnaire?id=${chooseid}`,
      }
    })
    .then(res => {
       qrCode = res.result
       resolve(res)
    })
    .catch(err => {
      console.log(err);
      reject(err)
    })
   })
    const res = await new Promise((resolve, reject) => {
      dbQuestionnaire.doc(chooseid)
        .update({
          data: {
            condition: 2,
            publishTime,
            finishPerson: 0,
            qrCode
          }
        })
        .then(res => {
          resolve(res)

        })
        .catch(err => {
          reject(err)
        })
    })
    console.log(res);
    wx.reLaunch({
      url: '/pages/index/index?flag=1',
    })
  },
  async editor() {
    let { chooseID } = this.data
    console.log(chooseID);
    wx.showLoading({
      title: '加载中',
    })
    wx.removeStorageSync('questionnaire')

    const res = await cloudIdGet(chooseID)
    console.log(res);
    let questionnaire = res.data
    wx.setStorageSync('questionnaire', questionnaire)
    wx.hideLoading()
    wx.redirectTo({
      url: `/pages/createQuestionnaire/createQuestionnaire`,
    })
  },
  async remove() {
    this.hideModal()
    let { chooseID, questionnaires, openid } = this.data
    wx.showLoading({
      title: '加载中',
    })
    const res = await cloudIdGet(chooseID)
    console.log(res);
    let questionnaire = res.data
    let { questions } = questionnaire
    questions.forEach(v => {
      if (v.hasImg) {
        v.img.forEach(async (m) => {
          const res = await cloudDeleteFile(m.fileID)
        })
      }
    })
    const res1 = await new Promise((resolve, reject) => {
      dbQuestionnaire.doc(chooseID)
        .remove()
        .then(res => {
          resolve(res)

        })
        .catch(err => {
          reject(err)
        })
    })
    console.log(res1);
    wx.cloud.callFunction({
      name: 'getQuestionnaire',
      data: {
        openid
      }
    })
      .then(res => {
        console.log(res);
        this.setData({
          questionnaires: res.result.data,
        })
      })
      .catch(err => {
        console.log('错误', err);
      })
    wx.hideLoading()
  }
})