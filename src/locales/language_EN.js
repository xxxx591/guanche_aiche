const _language = {
  tabBar: {
    home: 'Face ID Authorization',
    facePay: 'Face Payment Authorization',
    faceRegistered: 'Face Zone Authorization',
  },
  // 首页
  home: {
    faceAddress: 'Face Zone Authorization',
    facePay: 'Face Payment Authorization', 
  },
  // 人脸支付授权   
  facePay:{
    title:"Enable Face Payment",
    message:"Tip: Face payment is only available in Midea Headquarters Bupcoo Coffee for now, and will be expanded to other areas afterwards.",
    message03:"Tip: Cannot authorize face payment without selecting payment gesture.",
    message02:'Please select payment gestures：',
    rock:'Stone',
    paper:'Scissors',
    scissors:'Cloth',
    successFace:'Identify face succeeded',
    updateFace:'succeeded',
    closeFace:'disable',
    confirm:'determine',
    cancel:'cancel',
    confirmText:'Cancel face payment?',
    // outText:'是否离开当前页面？',
    outText:'Face payment cannot be authorized without choosing gesture',
    outTitle:'Leave current page?',
  },
  // 人脸区域授权   
  faceReg:{
    title:"Enable Face Payment",
    message:"Please select the face zone you're authorizing：",
    message02:'Please select payment gestures：',
    registered01:'Midea Headquarters',
    registered02:'Midea Global Innovation Center',
    successFace:'Identify face succeeded',
    updateFace:'Save payment zone succeeded',
    closeFace:'Close payment zone succeeded'
  },
  //  拍照页面提示
  cemera:{
    title:'Identify photo failed',
    message:'Please retake',
    message02:'Face Check on Screen'
  },
  markArr: {
    msg3001: 'Cannot detect your face, please take photos again.',
    msg3002: 'Cannot detect your face, please take photos again.',
    msg3003: 'Cannot detect your face, please take photos again.',
    msg3004: 'Cannot detect your face, please take photos again.',
    msg3005: 'Unauthorized Visit',
    msg3007: 'User uploaded more than 6 pic',
    msg3008: '场景不存在',
    msg3009: "Please don't tilt your head while taking photos.",
    msg3011: '授权时间还未到,未生效',
    msg3012: '授权时间过期,已失效',
    msg3013: 'Please take photo of your own from the front.',
    msg3014: 'Cannot detect your face, please take photos again.',
    msg3016: 'Please take photo of your own from the front.',
    msg200: 'Please take photo of your own from the front.',
    msg5001: '文件格式错误'
  },
  // 提示语言
  popUpPrompt: {
    exit: 'Exit',
    faceRegistered: 'Register',
    again: 'Retake',
    delete: 'Delete',
    abandon:'Quit to enable',
    deleteSuccess: 'Deleted',
    cancel: 'Cancel',
    tryAgain: 'Request overtime, please try again',
    deletePicture: 'Confirm to delete picture?',
    userFaild: 'Obtain user info. Failed',
    photoFaild: 'Identify Failed',
    photoFaildMessage:"Your face ID isn't registered"
  },
  qiandao:{
    message01:'Not in the time range to sign up',
    message02:'Not Attendants',
    message03:'confirm',
    success:'Sign-up Succeeded'
  },
    // 授权完成页
    photoComplete: {
      success: 'You have completed Face ID Authorization',
      opening: 'Face authorization of the following zones permitted for you',
      facePay: 'Enable Face ID Payment ',
      Midea: 'Midea Headquarters',
      MideaGlobal: 'Midea innovation center',
      backOut: 'Return to Workbench',
      checkInfo: 'Check Face Info'
    },
}
export default _language
