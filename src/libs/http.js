/**
 * @description:统一请求方法 post get jsonp post_formData
 * @author：xingwu.chen@partner.midea.com  jiajun.he@partner.midea.com
 * @update:2017-08-16
 * @version
 */

import axios from 'axios';
import CONFIG from '../configs/config.js'
import URL from '../configs/api.js'
import Promise from 'promise';
import common from './common.js';


axios.defaults.withCredentials = false; //让ajax携带cookie

console.warn("应用在" + CONFIG.serviceType + "模式下开发");
console.info("应用在" + CONFIG.serviceType + "模式下开发");
console.profile("应用在" + CONFIG.serviceType + "模式下开发");
console.error("应用在" + CONFIG.serviceType + "模式下开发");
console.dir("应用在" + CONFIG.serviceType + "模式下开发");
/**
 * 返回请求路径
 * @author ex_chennxw
 * @param urlTailStr
 */
/******************************* TODO 根据自己项目需求拼接url参数 ********************************************* */
function getRequestUrl(params) {
  let urlStr = ''; // String
  let serviceType = URL[CONFIG.serviceType];
  let urlData = params || {};
  let name = 'baseUrl';
  if (urlData.hasOwnProperty('urlName')) {
    name = urlData.urlName;
  }
  urlStr = serviceType[name] + urlData.url;
  return urlStr;
}
/******************************* TODO 根据自己项目需求拼接url参数 ********************************************* */
//'https://newimtest.midea.com/mas-api/restful/acWorkingHoursFill/pjts/searchByUser?token=T2344189819503616'

function request(url, params, option) {
  params = params || {};
  option = option || {};
  let config = {};
  option.method = common.uppercase(option.method); // 请求方式全部转换为大写 "POST" "GET" "JSONP"
  let logError = function (msg, status, headers, config_) {
    try {
      var err = {};
      err.key = key;
      err.params = params;
      err.msg = msg;
      err.status = status;
      err.headers = headers;
      err.config = config_;
      // console.log('_error', err);
      return err;
    } catch (e) {
      // console.log('_error', e);
      return e;
    }
  };
  let extend = function (dst) {
    for (let i = 1, ii = arguments.length; i < ii; i++) {
      let obj = arguments[i];
      if (obj) {
        let keys = Object.keys(obj);
        for (let j = 0, jj = keys.length; j < jj; j++) {
          let key = keys[j];
          dst[key] = obj[key];
        }
      }
    }
    return dst;
  };
  /**
   * @description:post
   * @param {*} params
   * @param {*}
   */
  let post = function (config) {
    return new Promise(function (resolve, reject) {
      extend(config, {
        method: 'post'
      });
      axios(config).then(rep => {
          resolve(rep);
        })
        .catch(error => {
          reject(error);
        })
    });
  };
  /**
   * @description:PUT
   * @param {*} params
   * @param {*}
   */
  let put = function (config) {
    return new Promise(function (resolve, reject) {
      extend(config, {
        method: 'PUT'
      });
      axios(config).then(rep => {
          resolve(rep);
        })
        .catch(error => {
          reject(error);
        })
    });
  };
  /**
   * @description:get
   * @param {*} params
   * @param {*}
   */
  let get = function (config) {
    return new Promise(function (resolve, reject) {
      extend(config, {
        method: 'GET'
      });
      axios(config).then(rep => {
          resolve(rep);
        })
        .catch(error => {
          reject(error);
        })
    });
  };
  /**
   * @description:jsonp
   * @param {*} params
   * @param {*}
   */
  let getJsonpData = function (url, data, option) {
    url += (url.indexOf('?') < 0 ? '?' : '&') + common.paramJsonp(data);
    return new Promise((resolve, reject) => {
      jsonp(url, option, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  };
  // let jsonp= function (url, data, callback) {
  //   if (typeof data == 'string') {
  //     callback = data
  //     data = {}
  //   }
  //   var hasParams = url.indexOf('?')
  //   url += hasParams ? '&' : '?' + 'callback=' + callback
  //   var params
  //   for (var i in data) {
  //     params += '&' + i + '=' + data[i]
  //   }
  //   url += params
  //   var script = document.createElement('script')
  //   script.setAttribute('src', url)
  //   document.querySelector('head').appendChild(script)
  // };
  config = extend({
    method: 'JSONP'
  }, option);
  let reqData = {}
  // console.log('option.method', option.method);
  switch (option.method) {

    case 'POST_FORMDATA':
      let fd = new FormData();
      for (let i in params) {
        if (params[i] instanceof Array) {
          for (let j = 0; j < params[i].length; j++) {
            for (let k in params[i][j]) {
              let key = ''
              let val = ''
              key = i + '[' + j + ']' + '.' + k;
              val = params[i][j][k];
              fd.append(key, val);
            }
          }
        } else {
          fd.append(i, params[i]);
        }

      }
      reqData = {
        url: url,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: fd
      };
      config = extend(config, reqData);
      return post(config);
      break;
    case 'POST_FORM_URLENCODED':
      let str = ''
      for (let i in params) {
        str = str + i + '=' + params[i];
        str += '&';
      }
      str = str.slice(0, str.length - 1)
      reqData = {
        url: url,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        data: str
      };
      config = extend(config, reqData);
      return post(config);
      break;
    case 'POST_JSON':
    case 'POST':
      if (option.method === 'POST_JSON') {
        params = JSON.stringify(params);
      }
      reqData = {
        url: url,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data: params
      };
      config = extend(config, reqData);
      return post(config);
      break;
    case 'PUT':
      reqData = {
        url: url,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data: params
      };
      config = extend(config, reqData);
      return put(config);
      break;
    case 'GET':
      document.cookie = "timeZone='8';path=/"
      reqData = {
        url: url,
        headers: {
          'Content-Type': 'application/json'
        },
        params: params
      };
      config = extend(config, reqData);
      return get(config);
      break;
    case 'JSONP':
      return getJsonpData(url, params, null);
    default:
      console.error('请求方式有误，请检查您的请求方式');
      break;
  }
}

export default {
  getRequestUrl, //拼接url
  request, //请求
};
