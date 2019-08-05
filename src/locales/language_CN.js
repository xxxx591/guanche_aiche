const _language = {
  tabBar: {
    home: '人脸授权',
    facePay: '人脸支付授权',
    faceRegistered: '人脸区域授权',
  },
  // 首页
  home: {
    faceAddress: '人脸区域授权',
    facePay: '人脸支付授权', 
  },
  // 人脸支付授权   
  facePay:{
    title:"是否开启人脸支付",
    message:"说明：人脸支付暂时仅用于总部半坡咖啡，后续将陆续开放。",
    message03:"提示：不选择支付手势将无法开通人脸支付。",
    message02:'请选择支付手势：',
    rock:'石头',
    paper:'剪刀',
    scissors:'布',
    successFace:'识别成功，请选择支付手势',
    updateFace:'开通成功',
    closeFace:'关闭成功',
    confirm:'确定',
    cancel:'取消',
    confirmText:'是否取消人脸支付？',
    // outText:'是否离开当前页面？',
    outText:'未选择手势，无法开通人脸支付',
    outTitle:'是否离开当前页面？',
  },
  // 人脸区域授权   
  faceReg:{
    title:"是否开启人脸支付",
    message:"请选择您要授权使用的人脸区域：",
    message02:'请选择支付手势：',
    registered01:'美的总部',
    registered02:'美创中心',
    successFace:'人脸识别成功',
    updateFace:'保存人脸区域成功',
    closeFace:'关闭人脸区域成功'
  },
  //  拍照页面提示
  cemera:{
    title:'照片识别失败',
    message:'请重新拍摄',
    message02:"正对屏幕，进行人脸校验..."
  },
  markArr: {
    msg3001: '没有检测到您的人脸信息，请重新拍摄',
    msg3002: '没有检测到您的人脸信息，请重新拍摄',
    msg3003: '没有检测到您的人脸信息，请重新拍摄',
    msg3004: '没有检测到您的人脸信息，请重新拍摄',
    msg3005: '未授权访问',
    msg3007: '用户上传图片超过6张',
    msg3008: '场景不存在',
    msg3009: '拍摄照片时请不要倾斜您的头部',
    msg3011: '授权时间还未到,未生效',
    msg3012: '授权时间过期,已失效',
    msg3013: '请拍摄本人的正脸照片',
    msg3014: '没有检测到您的人脸信息，请重新拍摄',
    msg3016: '请拍摄本人的正脸照片',
    msg200: '请拍摄本人的正脸照片',
    msg5001: '文件格式错误'
  },
  // 提示语言
  popUpPrompt: {
    exit: '退出',
    faceRegistered: '前往注册',
    again: '重拍',
    delete: '删除',
    abandon:'放弃开启',
    deleteSuccess: '删除成功',
    cancel: '取消',
    tryAgain: '请求超时，请重试',
    deletePicture: '确认删除图片？',
    userFaild: '获取用户信息失败',
    photoFaild: '识别失败',
    photoFaildMessage:'您尚未进行人脸注册'
  },
  qiandao:{
    message01:'不在可签到时间范围内',
    message02:'不是与会人员',
    message03:'确定',
    success:'签到成功'
  },
    // 授权完成页
    photoComplete: {
      success: '您已完成人脸授权',
      opening: '已为您开通以下区域人脸授权',
      facePay: '开启人脸支付',
      Midea: '美的总部',
      MideaGlobal: '美的全球创新中心',
      backOut: '返回工作台',
      checkInfo: '查看人脸信息'
    },
}
export default _language
