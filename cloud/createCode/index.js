// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    try {

        // 生成小程序码
        const wxacodeResult = await cloud.openapi.wxacode.get({
            path: event.page,
            width: 480
        })
        // return wxacodeResult;
        if (wxacodeResult.errCode != 0) {
            // 生成二维码失败，返回错误信息
            return wxacodeResult;
        }

        // 上传到云存储
        const uploadResult = await cloud.uploadFile({
            cloudPath: 'qr/' + new Date().getTime() + '.jpg',
            fileContent: wxacodeResult.buffer,
        });
        // return uploadResult;
        if (!uploadResult.fileID) {
            //上传失败，返回错误信息
            return uploadResult;
        }
        return uploadResult.fileID;

    } catch (err) {
        return err
    }

}