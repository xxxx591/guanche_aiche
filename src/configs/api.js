/**
 * @description:接口地址配置
 * @author：xingwu.chen@partner.midea.com
 * @update:2017-08-16
 * @version
 */
const URL = {
  //本地开发的路径配置
  deBug: {
    tokenName: "meixin_token",
    baseUrl: '',
  },
  //测试服务器环境的路径配置
  serviceTest: {
    tokenName: "meixin_token",
    baseUrl: 'http://10.16.9.162:8088', 
    testUrl: 'http://gczj.sinmore.vip',
 
  },
  //服务器环境的路径配置
  service: {
    tokenName: "meixin_token",
    baseUrl: '',
    // cemeraUrl: 'https://mapnew.midea.com/mas-api/restful/faceDetect', //美信4.0
    // visitorTestUrl: 'https://mapnew.midea.com/mas-api/restful/visitorTest', //美信4.0访客接口
    // signInUrl: 'https://newimtest.midea.com/mas-api/restful/meeting', //4.0美信签到
    // checkFacePay: 'https://mapnew.midea.com/mas-api/restful/checkFacePay', //美信4.0签到
    cemeraUrl: 'https://mapnew5.midea.com/mas/v5/app/restful/faceDetect', //   美信5.0
    visitorTestUrl: 'https://mapnew5.midea.com/mas/v5/app/restful/visitorTest', //美信5.0访客接口
    signInUrl: 'https://mapnew5.midea.com/mas/v5/app/restful/meeting', //5.0美信签到
    checkFacePay: 'https://mapnew5.midea.com/mas/v5/app/restful/checkFacePay', //美信5.0签到
  }
}

export default URL
