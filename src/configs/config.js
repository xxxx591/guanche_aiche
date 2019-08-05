/**
 * @description:前端开发配置文件 可配置化项目*
 * @author：xingwu.chen@partner.midea.com
 * @update:2017-08-16
 * @version
 */
const CONFIG = {
    serviceType: "serviceTest", //"deBug"：本地开发，"service"：在线服务，"serviceTest"：测试服务
    // 支持的所有多语言, 用逗号分隔, 如zh,en
    LANGUAGES: 'zh-CN,en-US,ja-JP',
    // 默认使用的语言
    DEFAULT_LANGUAGE: 'zh-CN',
    TOKEN: 'f905c9d34bbb7d47b459fe420a70d042', //美信toekn
    UID: 'wangwq6', //MIP账号
    CN: 'xxx', // 姓名
    EMPLOYEECODE: '11267213', // 工号
    PROJECT_NAME: 'com.midea.msd.facePay' // 应用模块标识
}
export default CONFIG