/**
 * common Function
 * author: jiajun.he@partner.midea.com
 * createTime: 2017.02.13
 */
/**
 * 常用工具类
 * @export
 * @class
 */
var Rxports = {
    methods: {
        /**
         * @description:全局返回
         * @param
         * @returns {*}
         */
        goBack: function() {
            window.history.back();
        },
        /**
         * 存储localStorage
         */
        setStore(name, content) {
            if (!name) {
                return;
            }
            if (typeof content !== 'string') {
                content = JSON.stringify(content);
            }
            window.localStorage.setItem(name, content);
        },
        /**
         * 获取localStorage
         */
        getStore(name) {
            if (!name) {
                return;
            }
            return window.localStorage.getItem(name);
        },
        /**
         * 删除localStorage
         */
        removeStore(name) {
            if (!name) {
                return;
            }
            window.localStorage.removeItem(name);
        },
        /**
         * 是否对象
         * @static
         * @param {*} value 值
         * @returns {boolean}
         * @memberof UtilService
         */
        isObject(value) {
            return value !== null && typeof value === 'object';
        },

        /**
         * 是否数组
         * @static
         * @param {*} value 值
         * @returns {boolean}
         *
         * @memberof UtilService
         */
        isArray(value) {
            return Array.isArray(value);
            // return Object.prototype.toString.call(obj) === '[object Array]'
        },
        /**
         * 是否未定义
         * @static
         * @param {*} value 值
         * @returns {boolean}
         *
         * @memberof UtilService
         */
        isUndefined(value) {
            return typeof value === 'undefined';
        },

        /**
         * 是否字符串
         * @static
         * @param {*} value
         * @returns {boolean}
         *
         * @memberof UtilService
         */
        isString(value) {
            return typeof value === 'string';
        },

        /**
         * 是否数字
         * @static
         * @param {*} value
         * @returns {boolean}
         *
         * @memberof UtilService
         */
        isNumber(value) {
            return typeof value === 'number';
        },

        /**
         * 是否布尔类型
         * @static
         * @param {*} value 值
         * @returns {boolean}
         *
         * @memberof UtilService
         */
        isBoolean(value) {
            return typeof value === 'boolean';
        },

        /**
         * 去除字符串两端的空白字符
         *  @static
         *  @returns {str}
         *
         * @memberof UtilService
         */
        trim(str) {
            return str == null ?
                '' :
                (String(str)).replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        },
        /**
         * 判断变量是否声明,是否有数据
         * int 0 也会判断为有数据true
         * object是否有数据应通过isNotData判断
         * 空返回true
         * @static
         * @author ex_chenxw
         * @param val 不接受obj对象
         * @returns {Boolean}
         *
         * @memberof UtilService
         */
        isEmpty(val) {
            val = this.trim(val);
            if (val == null) {
                return !0;
            }
            if (val == undefined || val == 'undefined') {
                return !0;
            }
            if (val == '') {
                return !0;
            }
            if (val.length == 0) {
                return !0;
            }
            if (!(/[^(^\s*)|(\s*$)]/).test(val)) {
                return true;
            }
            return !1;
        },
        /**
         * 判断obj对象是否没有属性
         * 空返回true
         * @static
         * @param obj 只接收obj
         * @returns {boolean}
         *
         * @memberof UtilService
         */
        isNotProperty(obj) {
            var p;

            for (p in obj) {
                return !1;
            } // false
            return !0; // true
        },
        add_zero(temp) { // 数位控制
            if (temp < 10) {
                return '0' + temp;
            }
            return temp;
        },
        /**
         * 调用方式:
         * uppercase(str)  //小写转大写
         * lowercase(str)  //大写转小写
         *  @static
         *  @returns {str}
         * @memberof UtilService
         */
        // 转换大写
        uppercase(string) {
            return this.isString(string) ? string.toUpperCase() : string;
        },
        // 转换小写
        lowercase(string) {
            return this.isString(string) ? string.toLowerCase() : string;
        },
        is_array(value) {
            return value &&
                typeof value === 'object' &&
                typeof value.length === 'number' &&
                typeof value.splice === 'function' &&
                !value.propertyIsEnumerable('length');
        },
        /**
         * @description:url拼接参数
         * @param
         * @returns {*}
         */
        formatUrl(url, params) {
            var str = url;

            if (params) {
                for (var key in params) {
                    str.indexOf('?') > -1 ? str += '&' : str += '?';
                    str += key + '=' + params[key];
                }
            }
            return str;
        },
        /**
         * @description:jsonp url拼接参数
         * @param
         * @returns {*}
         */
        paramJsonp(data) {
            let url = '';

            for (var k in data) {
                let value = data[k] !== undefined ? data[k] : '';

                url += '&' + k + '=' + encodeURIComponent(value);
            }
            return url ? url.substring(1) : '';
        },
        /**
         * @description:json数据转formData
         * @param params
         * @returns {*}
         */
        transformData: function(params) {
            if (!params) {
                return;
            }
            var fd = new FormData();

            for (var i in params) {
                fd.append(i, params[i]);
            }
            return fd;
        },
        // var str = []
        // for(var p in obj){
        //     str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]))
        // }
        // return str.join("&")
        /**
         * @description:json数据拼接
         * @param
         * @returns {*}
         */
        extend(arr) {
            var des = {};

            if (!arr instanceof Array) {
                return;
            }
            for (var i = 0, len = arr.length; i < len; i++) {
                for (var key in arr[i]) {
                    des[key] = arr[i][key];
                }
            }
            return des;
        },
        /**
         * @description:是否是空对象
         * @param
         * @returns {*}
         */
        isEmptyObject(obj) {
            for (var name in obj) {
                return false;
            }
            return true;
        },
        /**
         * @description:
         * @param
         * @returns {*}
         */
        // isArray: Array.isArray || ((obj) => { return toString.call(obj) === '[object Array]' }),
        /**
         * @description:
         * @param
         * @returns {*}
         */
        isIOSEnviron() {
            var u = window.navigator.userAgent;

            if (u.indexOf('iPhone') > -1) {
                return true;
            }
            return false;
        },
        /**
         * @description:
         * @param
         * @returns {*}
         */
        isObjectValueEqual(a, b) {
            var aProps = Object.getOwnPropertyNames(a);
            var bProps = Object.getOwnPropertyNames(b);

            if (aProps.length != bProps.length) {
                return false;
            }
            for (var i = 0; i < aProps.length; i++) {
                var propName = aProps[i];

                if (a[propName] !== b[propName]) {
                    return false;
                }
            }
            return true;
        },
        /**
         * by chenxingwu
         * @description:转换日期格式 ios时间处理，格式 "2008-08-08"ios,safari不支持"需要格式是："2008/08/08"
         * @param date, format
         */
        formatDate(date, format) {
            if (!date) {
                return;
            }
            if (!format) {
                format = 'yyyy-MM-dd HH:mm';
            }
            switch (typeof date) {
                case 'string':
                    date = new Date(date.replace(/-/g, '/'));
                    break;
                case 'number': // 考虑了纯秒数传入情况
                    date = new Date(date);
                    break;
            }
            if (!(date instanceof Date)) {
                return;
            }
            let dict = {
                'yyyy': date.getFullYear(),
                'M': date.getMonth() + 1,
                'd': date.getDate(),
                'H': date.getHours(),
                'm': date.getMinutes(),
                's': date.getSeconds(),
                'MM': (String(date.getMonth() + 101)).substr(1),
                'dd': (String(date.getDate() + 100)).substr(1),
                'HH': (String(date.getHours() + 100)).substr(1),
                'mm': (String(date.getMinutes() + 100)).substr(1),
                'ss': (String(date.getSeconds() + 100)).substr(1)
            };

            return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function() {
                return dict[arguments[0]];
            });
        },
        /**
         * @description:全局退出应用
         * @param
         * @returns {*}
         */
        exit() {
            // platform.exit()
        },
        /**
         * @description:对象深拷贝
         * @param
         * @returns {*}
         */
        deepCopy(obj) {
            var str, newobj = obj.constructor === Array ? [] : {};
            if (typeof obj !== 'object') {
                return;
            } else if (window.JSON) {
                str = JSON.stringify(obj), // 系列化对象
                    newobj = JSON.parse(str); // 还原
            } else {
                for (var i in obj) {
                    newobj[i] = typeof obj[i] === 'object' ?
                        this.deepCopy(obj[i]) : obj[i];
                }
            }
            return newobj;
        },
        /**
         * @description:Cookie
         * @param
         * @returns {*}
         */
        Cookie: {
            set(name, value) {
                let date = new Date();
                let isTrue = true;
                let defaultObj = {
                    value: '',
                    path: '',
                    expires: ''
                }

                if (Object.prototype.toString.call(value) === '[object Object]') {
                    defaultObj = Object.assign(defaultObj, value);
                } else if (Object.prototype.toString.call(value) === '[object String]') {
                    defaultObj.value = value;
                } else {
                    isTrue = false;
                }
                let str;
                if (isTrue) {
                    str = name + "=" + defaultObj.value;
                    delete defaultObj.value; //删除value
                    for (let item in defaultObj) {
                        if (defaultObj[item]) {
                            str += ";" + item + "=" + defaultObj[item];
                        }
                    }
                    console.log('str', str)

                    document.cookie = str;
                    console.log(document)
                }
            },
            get(name) {
                let strList = document.cookie.split('; ');
                let result = null;
                strList.forEach(item => {
                    let arr = item.split('=');
                    if (arr[0] == name) {
                        result = arr[1];
                    }
                })
                return result;
            },
            remove(name) {
                let date = new Date();
                date.setDate(date.getDate() - 7);
                this.set(name, {
                    value: '',
                    expires: date
                });

            }
        }
    }
};
// module.exports = Rxports.methods

export default Rxports.methods;
// export {Rxports.methods}