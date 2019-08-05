// import api from './api'
import Http from '@/libs/http'
import store from './index'
//Action 通常是异步的
const api = {
  myCars: '/api/car/myCar', //post 根据userId,appId获得对应的图片信息
  getOrderId: '/api/car/affirm', //2.2.5.	人脸比对
  getCarPay: '/api/pay/carPay',  // 查询用户是否开启支付授权 
  getFunId: '/faceapp/v1/base/queryFunction', //post 获取用户的人脸使用场景
  changeFunId: '/faceapp/v1/base/addUserFunction', //post 更改用户人脸使用场景
  closeFunId: '/faceapp/v1/base/functionDelUser', //post 删除用户人脸使用场景
}
const actions = {
  //  方法名
  // 查看用户是否注册人脸信息
  myCars(store, params) {
    let url = Http.getRequestUrl({
      urlName: 'testUrl',
      url: api.myCars
    });
    let promise = new Promise((resolve, reject) => {
      Http.request(url, params, {
        method: 'POST'
      }).then(rep => {

        resolve(rep)
      }).catch(reject => {
        reject(reject)
      })
    })
    console.log(promise);
    return promise;
  },
  // 获取订单号
  getOrderId(store, params) {
    let url = Http.getRequestUrl({
      urlName: 'testUrl',
      url: api.getOrderId
    });
    let promise = new Promise((resolve, reject) => {
      Http.request(url, params, {
        method: 'POST'
      }).then(rep => {

        resolve(rep)
      }).catch(reject => {
        reject(reject)
      })
    })
    console.log(promise);
    return promise;
  },
  // 获取支付信息
  getCarPay(store, params) {
    debugger
    let url = Http.getRequestUrl({
      urlName: 'testUrl',
      url: api.getCarPay
    });
    let promise = new Promise((resolve, reject) => {
      Http.request(url, params, {
        method: 'POST'
      }).then(rep => {

        resolve(rep)
      }).catch(reject => {
        reject(reject)
      })
    })
    console.log(promise);
    return promise;
  },
}
export default actions
