let markArr = [{
    code: 3001,
    msg: '没有检测到您的人脸信息，请重新拍摄'
  },
  {
    code: 3002,
    msg: '没有检测到您的人脸信息，请重新拍摄'
  },
  {
    code: 3003,
    msg: '没有检测到您的人脸信息，请重新拍摄'
  },
  {
    code: 3004,
    msg: '没有检测到您的人脸信息，请重新拍摄'
  },
  {
    code: 3005,
    msg: '未授权访问'
  },
  {
    code: 3007,
    msg: '用户上传图片超过6张'
  },
  {
    code: 3008,
    msg: '场景不存在'
  },
  {
    code: 3009,
    msg: '拍摄照片时请不要倾斜您的头部'
  },
  {
    code: 3011,
    msg: '授权时间还未到,未生效'
  },
  {
    code: 3012,
    msg: '授权时间过期,已失效'
  },
  {
    code: 3013,
    msg: '请拍摄本人的正脸照片'
  },
  {
    code: 3014,
    msg: '没有检测到您的人脸信息，请重新拍摄'
  },
  {
    code: 5001,
    msg: '文件格式错误'
  },

]

let markedWord = function () {};

markedWord.showWords = function (code) {
  let str;
  markArr.forEach(item => {
    if (item.code == code) {
      str = item.msg
    }
  });
  return str
}

export default markedWord;
