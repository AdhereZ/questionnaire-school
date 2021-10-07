// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    return await cloud.database().collection('questionnaire')
        .doc(event.id)
        .update({
            data: {
               answer: event.answer,
               finishPerson: event.finishPerson
            }
        })
}

