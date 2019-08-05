<template>
  <div class="Share">
    <div class="pic">
      <img src="../../assets/images/share-bg.png" class="pic-img">
      <div class="pic-box">
        <div class="pic-box2 flex-v flex-cc">
          <div class="pic-top flex-h">
            <img :src="userInfo.avatar" class="pic-top-img">
            <div class="pic-top-txt">{{userInfo.nickname}} 送给你</div>
          </div>
          <div class="pic-ji flex-h">
            <div class="pic-ji-num">100</div>
            <div class="pic-ji-txt">积分</div>
          </div>
          <div class="pic-in">邀请你加入 挂车之家</div>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="input-box flex-h">
        <input type="text" placeholder="请输入手机号" v-model="phoneNum" @blur="inputBlur" class="value">
      </div>
      <div class="input-box flex-h">
        <input type="text" placeholder="请输入验证码" v-model="authCode" @blur="inputBlur" class="value">
        <div class="code" @click.stop="getAuthCode">{{countNum2 ? countNum2 : '获取验证码'}}</div>
      </div>
      <div class="input-box flex-h">
        <input
          type="password"
          placeholder="请设置密码"
          v-model="password"
          @blur="inputBlur"
          class="value"
        >
      </div>
      <div class="box-btn flex-h flex-cc" @click="gopage">立即领取</div>
      <div class="info">
        活动规则：
        <br>1、100积分仅限新用户领取，有效期为7天，领取后注册方可使用；
        <br>2、使用积分的手机号需为领取时所使用的手机号；
        <br>3、积分不找零；
        <br>4、同一手机号、支付宝、帐号、设备号、订单收件人均视为同一用户；
        <br>5、平台保留法律范围内的最终解释权，如有其它疑问请咨询官方客服。

      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex"; 

export default {
  name: "Share",
  data() {
    return {
      phoneNum: "",
      authCode: "",
      password: "",
      codeFlag: false,
      countNum2: 0,
      userInfo: {},
      countdown:null,
      code:""
    };
  },
  computed: {
    ...mapState({
      // token: state => state.datas.token,
    })
  },
  mounted() {
    this.init();
  },
  watch: { 
  },
  methods: {
    // ...mapActions(["setTab"]),
    inputBlur() {
      window.scrollTo(0, 0);
    },
   async getAuthCode() { 
      let self = this
      let phoneReg = /^1[345678]\d{9}$/;
      if (this.codeFlag === true) {
        return;
      }
      if (!phoneReg.test(this.phoneNum)) {
        this.$toast("请输入正确手机号码");
        return;
      }
      // 检查手机号
      this.codeFlag = true; // 防止多次点击
      this.countNum2 = 60; // 获取倒计时的时间 

     let data = await this.api.authCode({ mobile: this.phoneNum, type: 1 });
     this.code = data.code
       this.countdown = setInterval(function() {
        self.countNum2--; 
        if (self.countNum2 <= 0) {
          console.log(self.countdown);
          self.codeFlag = false;
          clearInterval(self.countdown)
          self.countdown = null 
        }
      }, 1000);
    },
    topBack() {
      this.native.back_btn({});
      this.$router.back(-1);
    },
    async init() {
      // let token = await this.native.getToken({});
      let userInfo = await this.api.userDetail({
        token: this.$route.query.token
      });
      this.userInfo = userInfo;
    },
   async gopage(){ 
     
      if (this.code == this.authCode && this.password.length>=6) {
        let data =await this.api.registerByPhone({
          mobile:this.phoneNum,
          code:this.code,
          password:this.password,
          inviter_id:this.$route.query.userId,
          jpush_id:this.$route.query.pushId
        })

        console.log('data-------邀请注册',data);
        if (data.erro_code != 0 ) {
          this.$toast('您已注册，请直接下载APP')
        this.$router.push({path:'DownLoad'})
        }else{
          this.$toast('注册成功')
        this.$router.push({path:'DownLoad'})
        }
      }else if(this.code != this.authCode){
        this.$toast('验证码错误')  
      }else if(this.password.length<6){
        this.$toast('密码长度不能低于6位数')
      }
    }
  }
};
</script>

<style lang='less' scoped>
.Share {
   position: absolute;
    top: 1.13333333rem;
    width: 100%;
  .top {
    height: 1.133333rem /* 85/75 */;
    position: relative;
    border-bottom: 0.013333rem /* 1/75 */ solid #e6e6e6; /*no*/
    background: #ffffff;
    .top-back {
      width: 0.333333rem /* 25/75 */;
      height: 0.6rem /* 45/75 */;
      position: absolute;
      top: 50%;
      left: 0.4rem /* 30/75 */;
      transform: translateY(-50%);
    }
    .top-txt {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 0.48rem /* 36/75 */;
      color: #000000;
    }
  }
  .pic {
    width: 100%;
    box-sizing: border-box;
    padding: 0.4rem /* 30/75 */;
    position: relative;
    .pic-img {
      width: 9.2rem /* 690/75 */;
      height: 3.6rem /* 270/75 */;
    }
    .pic-box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      .pic-box2 {
        width: 100%;
        height: 100%;
        .pic-top {
          align-items: center;
          .pic-top-img {
            width: 0.8rem /* 60/75 */;
            height: 0.8rem /* 60/75 */;
            border-radius: 0.4rem /* 30/75 */;
          }
          .pic-top-txt {
            margin-left: 0.266667rem /* 20/75 */;
            font-size: 0.373333rem /* 28/75 */;
            color: #ffffff;
          }
        }
        .pic-ji {
          align-items: flex-end;
          margin-top: 0.266667rem /* 20/75 */;
          margin-bottom: 0.2rem /* 15/75 */;
          .pic-ji-num {
            height: 0.733333rem /* 55/75 */;
            line-height: 0.733333rem /* 55/75 */;
            font-size: 0.733333rem /* 55/75 */;
            color: #fff000;
            font-weight: bold;
          }
          .pic-ji-txt {
            height: 0.4rem /* 30/75 */;
            line-height: 0.4rem /* 30/75 */;
            font-size: 0.4rem /* 30/75 */;
            color: #fff000;
            padding-bottom: 0.066667rem /* 5/75 */;
            font-weight: bold;
          }
        }
        .pic-in {
          font-size: 0.32rem /* 24/75 */;
          color: #ffffff;
        }
      }
    }
  }
  .box {
    width: 100%;
    padding: 0.4rem /* 30/75 */;
    box-sizing: border-box;
    .input-box {
      width: 100%;
      height: 1.466667rem /* 110/75 */;
      // border-top: .026667rem /* 2/75 */ solid #e6e6e6;
      // border-bottom: .026667rem /* 2/75 */ solid #e6e6e6;
      align-items: center;
      background: #f7f8fa;
      margin-bottom: 0.266667rem /* 20/75 */;
      .txt {
        font-size: 0.426667rem /* 32/75 */;
        color: #333333;
        min-width: 1.533333rem /* 115/75 */;
      }
      .value {
        font-size: 0.426667rem /* 32/75 */;
        color: #333333;
        padding-left: 0.533333rem /* 40/75 */;
        flex-grow: 1;
        outline: none;
        border: none;
        background: #f7f8fa;
      }
      .code {
        min-width: 2.6rem /* 195/75 */;
        text-align: center;
        font-size: 0.426667rem /* 32/75 */;
        color: #4ccdfa;
        border-left: 0.026667rem /* 2/75 */ solid #e5e5e5;
      }
      .see {
        width: 0.84rem /* 63/75 */;
        height: 0.533333rem /* 40/75 */;
        .see-img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .box-btn {
      width: 100% /* 640/75 */;
      height: 0.933333rem /* 70/75 */;
      background: #4ccdfa;
      border-radius: 0.466667rem /* 35/75 */;
      color: #ffffff;
      font-size: 0.4rem /* 30/75 */;
    }
  }
  .info {
    background: #ffffff;
    width: 100%;
    box-sizing: border-box;
    color: #999999;
    font-size: 0.32rem /* 24/75 */;
    margin-top: 1.066667rem /* 80/75 */;
  }
}
</style>
