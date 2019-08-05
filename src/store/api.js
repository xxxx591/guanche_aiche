const api = {
  topLineDetail: '/egs/guest/meixin.out', //正式配置
  // topLineDetail: '/egis/guest/meixin.out', //测试配置
  getImgByUserId: '/faceapp/v1/face/getImgByUserId', //post 根据userId,appId获得对应的图片信息
  faceDetect: '/faceapp/v1/face/detect', //post 传入图片进行人脸检测和人脸分析,可以检测图片内的所有人脸
  faceDelete: '/faceapp/v1/face/delImg', //post 删除人脸库及库中所有图片
  faceUp: '/faceapp/v1/face/batchCollection', //post 上传多张人脸照片到人脸库
  facePayment: '/mobile/payment/fac/emp', //post 是否开启人脸识别
  signInUrl: '/meetingMainSignIn/signInForOtherSystem', //post 是否开启人脸识别
  getFunId: '/faceapp/v1/base/queryFunction', //post 获取用户的相片使用场景

}
module.exports = {
  api
};