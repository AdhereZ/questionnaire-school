// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const _ = cloud.database().command
    return await cloud.database().collection('questionnaire')
        .where(
            _.and([{
                _openid: event.openid 
            }, {
                condition: event.condition
            }
            ])
        )
        .orderBy('time.currentTime', 'desc')
        .get()

}