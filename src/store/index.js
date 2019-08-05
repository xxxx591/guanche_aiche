import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

//引入模块
Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    lang: '',
    uid: '', //用户账号
    token: '',
    cn: '',
    employeeCode: '',
    isIOS: false,
    isFirst: true,
    certificateId: '', //用户证件号
    idCardNoType: '', // 用户证件号类型 
    extra: '',  
    priceObj:{},   //产品参数数组
    setArray:[],  //配置参数数组
    orderId:'',   //订单号
    carInfo:{},   // 车辆详情
    buyCarType:'',   // 购买车辆：2，添加车辆：1
    nowCar:{},  //首页轮播图单台车辆详情
  },
  actions,
  mutations,
  getters

})
