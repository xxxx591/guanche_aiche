/**
 * @description:http响应拦截器 全局处理loading加载效果
 * @author：xingwu.chen@partner.midea.com
 * @update:2017-08-16
 * @version
 */
import axios from 'axios'
import Vue from 'vue'
import Promise from 'promise';
import store from '@/store/index';
import API from '@/configs/api'
import CONFIG from '@/configs/config';
// 超时时间
// axios.defaults.timeout = 5000;
// http请求拦截器
var loadinginstace
axios.interceptors.request.use(config => { //请求前的处理
        //  Loading方法
        console.log('请求前...', config);
        // console.log(store.state.token)
        
        console.log(config)
        return config;
    }, error => {
        return Promise.reject(error)
    })
    // http响应拦截器
axios.interceptors.response.use(data => { //请求后的处理
    /**
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    if (data.data.code === 40002) {
        Vue.toast(data.data.msg ? data.data.msg : '身份验证过期，请重新登录')
    }
    
    console.log("请求成功后...", data.data);
    return data.data
}, error => {
    return Promise.reject(error.response.data)
})

export default axios