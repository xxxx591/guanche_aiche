<template>
  <div class="MindLatter">
    <div class="top">
      <img src="../../assets/images/back-arrow.png" @click.stop="topBack" class="top-back" />
      <div class="top-txt">意向书</div>
    </div>
    <div class="box-pro flex-v">
      <img :src="carInfo.cover" class="b-img" />
      <div class="b-title">{{areaList.name}}</div>
      <div class="b-des">
        <ul>
          <li v-for="(item,index) in pickList" :key="index">
            <p>
              <i>{{item.name}}</i>
              <i class="tab" v-if=" (index+1)%3 != 0 ">｜</i>
            </p>
          </li>
        </ul>
      </div>
      <div class="b-price">¥{{carInfo.price_range}}</div>
    </div>
    <div class="type">
      <div class="type-title">购买类型</div>
      <div class="type-box flex-h">
        <div
          class="type-btn flex-h flex-cc"
          @click="activeIndex = 2;userInfo.type=2"
          :class="activeIndex ==2?'type-active':''"
        >企业</div>
        <div
          class="type-btn flex-h flex-cc"
          @click="activeIndex = 1;userInfo.type=1"
          :class="activeIndex ==1?'type-active':''"
        >个人</div>
      </div>
    </div>
    <div class="info">
      <div class="info-title">基本资料</div>
      <div class="box flex-h" v-show="activeIndex==2">
        <div class="left flex-h">
          <div class="txt">企业名称：</div>
          <input type="text" placeholder="请输入" class="value" v-model="userInfo.firm_name" />
        </div>
      </div>
      <div class="box flex-h" v-show="activeIndex==2">
        <div class="left flex-h">
          <div class="txt">企业信用代码：</div>
          <input type="text" placeholder="请输入" class="value" v-model="userInfo.firm_credit_code" />
        </div>
      </div>
      <div class="box flex-h">
        <div class="left flex-h">
          <div class="txt">真实姓名：</div>
          <input type="text" placeholder="请输入" class="value" v-model="userInfo.cnee" />
        </div>
      </div>
      <div class="box flex-h">
        <div class="left flex-h">
          <div class="txt">身份证号：</div>
          <input type="text" placeholder="请输入" class="value" v-model="userInfo.id_number" />
        </div>
      </div>
      <div class="box flex-h">
        <div class="left flex-h">
          <div class="txt">手机号码：</div>
          <input type="text" placeholder="请输入" class="value" v-model="userInfo.mobile" />
        </div>
      </div>

      <div class="box box-last flex-h" @click="areaFlag = true">
        <div class="left flex-h">
          <div class="txt">上牌城市：</div>
          <input type="text" placeholder="请输入" readonly class="value" v-model="userInfo.plate_city" />
        </div>
        <div class="arrow">
          <img src="../../assets/images/right-arrow.png" class="arrow-img" />
        </div>
      </div>
      <div class="box flex-h">
        <div class="left flex-h">
          <div class="txt">取车地点：</div>
          <input type="text" placeholder="请输入" class="value" v-model="userInfo.address" />
        </div>
      </div>
      <van-popup v-model="areaFlag">
        <van-area
          :area-list="arrayList"
          @confirm="getCity"
          @cancel="areaFlag = false"
          :columns-num="2"
        />
      </van-popup>
    </div>
    <div class="read-box flex-h">
      <div class="read-gou">
        <div class="read-img-box">
          <img src="../../assets/images/login-read.png" alt class="read-img" />
        </div>
      </div>
      <div class="read-text">提交订单即视为同意</div>
      <div class="read-link" @click="$router.push('UserAgreement')">《意向通用条款与条件》</div>
    </div>
    <div class="bottom flex-h">
      <div class="b-left flex-h">
        <div class="left-txt">预定金:</div>
        <div class="left-price">¥{{total}}</div>
      </div>
      <div class="btn flex-h flex-cc" @click="buy()">确认预订</div>
    </div>
    <van-dialog v-model="payFlag" show-cancel-button class="pay-box">
      <div class="img-box">
        <p>
          <img src="@/assets/images/zfb.png" alt srcset @click="payWay(2)" />
        </p>
        <p class="line"></p>
        <p>
          <img src="@/assets/images/wx.png" alt srcset @click="payWay(1)" />
        </p>
      </div>
    </van-dialog>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";
import { ImagePreview } from "vant";
import areaListArr from "../../js/area.js";
import { close } from "fs";
var wx = require("weixin-js-sdk");

export default {
  // 意向书
  name: "MindLatter",
  data() {
    return {
      areaList: [], //参数数组
      total: 0, //金额
      pickList: [], // 配置数组
      activeIndex: 2,
      areaFlag: false,
      arrayList: areaListArr, //地址列表
      userInfo: {
        // 用户信息收集
        firm_name: "",
        firm_credit_code: "",
        type: 2,
        cnee: "",
        id_number: "",
        mobile: "",
        plate_city: ""
      },
      payFlag: false,
      carInfo: {}
    };
  },
  components: {
    ImagePreview
  },
  computed: {
    ...mapState({
      // carInfo: state => state.carInfo,
    })
  },
  mounted() {
    console.log(this.$store.state.priceObj);
    console.log(this.$store.state.token);

    this.areaList = this.$store.state.priceObj;
    this.pickList = this.$store.state.setArray;
    this.carInfo = this.$store.state.carInfo;
    let num = 0;
    this.pickList.forEach(item => {
      num += parseFloat(item.price);
    });
    this.total = num;
  },
  methods: {
    // ...mapActions(["setTab"]),
    inputBlur() {
      window.scrollTo(0, 0);
    },
    topBack() {
      // this.native.back_btn({});
      this.$router.back(-1);
    },
    getCity(arr) {
      console.log(arr);
      this.areaFlag = false;
      let str = "";
      arr.forEach(item => {
        str = str + item.name + " ";
      });
      this.userInfo.plate_city = str;
    },
    buy() {
      let phoneReg = /^1[345678]\d{9}$/;
      let identityCardReg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;

      if (this.userInfo.type == 2) {
        // 企业用户
        if (this.userInfo.firm_name == "") {
          this.$toast("请输入企业名称");
          return;
        }
        if (this.userInfo.firm_credit_code == "") {
          this.$toast("请输入企业信用代码");
          return;
        }
      }
      if (this.userInfo.cnee == "") {
        this.$toast("请输入姓名");
        return;
      }
      if (!identityCardReg.test(this.userInfo.id_number)) {
        this.$toast("请输入证件号");
        return;
      }
      if (!phoneReg.test(this.userInfo.mobile)) {
        this.$toast("请输入正确的手机号");
        return;
      }
      if (this.userInfo.plate_city == "") {
        this.$toast("请选择上牌城市");
        return;
      }if(this.userInfo.address .lenth>=30){
        this.$toast('取车地点不能超过30字')
        return
      }
      this.payFlag = true;
    },
    async payWay(id) {
      let params = {
        token: this.$store.state.token,
        pay_type: id,
        trailer_order_id: this.$route.query.orderid //订单号
      };
      this.userInfo.token = this.$store.state.token;
      this.userInfo.trailer_order_id = this.$route.query.orderid;
      let data = await this.api.getBuyType(this.userInfo);
      console.log("getBuyType------------", data);
      let list = await this.api.getCarPay(params);
      console.log("list------", list);
      let payid = "";
      if (id == 2) {
        payid = 0;
      } else {
        payid = 1;
      }
      let payObj = {
        type: payid,
        data: list
      };
      let payResolve = await this.native.gotoPay(payObj);
      console.log(payResolve);

      this.$router.push({
        path: "ConfirmBack",
        query: { orderid: this.$route.query.orderid, type: "1" }
      });
    }
  }
};
</script>

<style lang='less' scoped>
.MindLatter {
  min-width: 100vw;
  min-height: calc(100vh - 3.133333rem);
  background: #f7f8fa;
  padding-bottom: 1.766667rem /* 200/75 */;
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
  .box-pro {
    justify-content: center;
    align-items: center;
    background: #ffffff;
    padding: 0.133333rem /* 10/75 */;
    box-sizing: border-box;
    .b-img {
      width: 2.133333rem /* 160/75 */;
      height: 2.133333rem /* 160/75 */;
      border-radius: 0.133333rem /* 10/75 */;
      margin-top: 0.533333rem /* 40/75 */;
    }
    .b-title {
      color: #333333;
      font-size: 0.426667rem /* 32/75 */;
      font-weight: bold;
      text-align: center;
      margin-top: 0.4rem /* 30/75 */;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .b-des {
      width: 100%;
      color: #999999;
      font-size: 0.32rem /* 24/75 */;
      font-weight: bold;
      text-align: center;
      margin-top: 0.4rem /* 30/75 */;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      text-overflow: ellipsis;
      overflow: hidden;
      ul {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        li {
          width: 33%;
          p {
            i {
              font-style: normal;
            }
            .tab {
              float: right;
            }
          }
        }
      }
    }
    .b-price {
      margin-top: 0.4rem /* 30/75 */;
      margin-bottom: 0.533333rem /* 40/75 */;
      font-size: 0.533333rem /* 40/75 */;
      color: #ff5d25;
      font-weight: bold;
    }
  }
  .type {
    width: 100%;
    box-sizing: border-box;
    padding: 0.4rem /* 30/75 */;
    background: #ffffff;
    margin: 0.266667rem /* 20/75 */ 0;
    .type-title {
      font-size: 0.426667rem /* 32/75 */;
      color: #333333;
      margin-bottom: 0.4rem /* 30/75 */;
    }
    .type-box {
      .type-btn {
        font-size: 0.426667rem /* 32/75 */;
        color: #666666;
        border: 0.013333rem /* 1/75 */ solid #e6e6e6; /*no*/
        margin-right: 0.533333rem /* 40/75 */;
        width: 2.4rem /* 180/75 */;
        height: 0.933333rem /* 70/75 */;
        border-radius: 0.466667rem /* 35/75 */;
      }
      .type-active {
        font-size: 0.426667rem /* 32/75 */;
        color: #ffffff;
        background: #4ccdfa;
      }
    }
  }
  .info {
    width: 100%;
    box-sizing: border-box;
    padding: 0.4rem /* 30/75 */;
    background: #ffffff;
    margin-bottom: 0.533333rem /* 40/75 */;
    .info-title {
      font-size: 0.426667rem /* 32/75 */;
      color: #333333;
    }
    .box {
      justify-content: space-between;
      width: 9.2rem /* 690/75 */;
      box-sizing: border-box;
      // padding: 0 .4rem /* 30/75 */;
      align-items: center;
      height: 1.466667rem /* 110/75 */;
      margin: 0 auto;
      border-bottom: 0.013333rem /* 1/75 */ solid #e6e6e6; /*no*/
      background: #ffffff;
      .left {
        flex-grow: 1;
        align-items: center;
        .txt {
          font-size: 0.426667rem /* 32/75 */;
          color: #333333;
        }
        .value {
          font-size: 0.426667rem /* 32/75 */;
          outline: none;
          border: none;
          padding-left: 0.266667rem /* 20/75 */;
          flex-grow: 1;
        }
      }
      .arrow {
        padding: 0 0.133333rem /* 10/75 */;
        .arrow-img {
          min-width: 0.213333rem /* 16/75 */;
          height: 0.386667rem /* 29/75 */;
        }
      }
    }
    .box-last {
      border: none;
    }
  }
  .read-box {
    font-size: 0.32rem /* 24/75 */;
    align-items: center;
    margin-top: 0.4rem /* 30/75 */;
    margin-left: 0.4rem /* 30/75 */;
    .read-gou {
      width: 0.32rem /* 24/75 */;
      height: 0.32rem /* 24/75 */;
      border: 0.026667rem /* 2/75 */ solid black;
      box-sizing: border-box;
      margin-right: 0.12rem /* 9/75 */;
      .read-img-box {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        .read-img {
          width: 0.253333rem /* 19/75 */;
          height: 0.226667rem /* 17/75 */;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
    .read-text {
      color: #999999;
    }
    .read-link {
      color: #86dafb;
    }
  }
  .bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1.466667rem /* 110/75 */;
    padding: 0 0.4rem /* 30/75 */;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    .b-left {
      height: 0.4rem /* 30/75 */;
      .left-txt {
        font-size: 0.266667rem /* 20/75 */;
        height: 0.266667rem /* 20/75 */;
        line-height: 0.266667rem /* 20/75 */;
        color: #333333;
        align-self: flex-end;
      }
      .left-price {
        font-size: 0.4rem /* 30/75 */;
        height: 0.4rem /* 30/75 */;
        line-height: 0.4rem /* 30/75 */;
        color: #ff5d25;
        padding-top: 0.026667rem /* 2/75 */;
        margin-left: 0.133333rem /* 10/75 */;
        font-weight: bold;
      }
    }
    .btn {
      width: 3.733333rem /* 280/75 */;
      height: 0.933333rem /* 70/75 */;
      background: #4ccdfa;
      border-radius: 0.466667rem /* 35/75 */;
      color: #ffffff;
      font-size: 0.4rem /* 30/75 */;
    }
  }
  .van-popup {
    position: fixed;
    bottom: 0;
    left: 0;
    top: auto;
    max-height: 100%;
    overflow-y: auto;
    background-color: #fff;
    -webkit-transition: 0.3s ease-out;
    transition: 0.3s ease-out;
    -webkit-overflow-scrolling: touch;
    transform: none;
    width: 100%;
  }
  .pay-box {
    .img-box {
      display: flex;
      padding: 1.066667rem /* 80/75 */ 1.266667rem /* 95/75 */;
      img {
        width: 2.16rem /* 162/75 */;
        height: 0.746667rem /* 56/75 */;
      }
    }
    .line {
      position: relative;
      padding: 0 0.773333rem /* 58/75 */;
      &::after {
        content: "";
        position: absolute;
        left: 50%;
        border-right: 0.026667rem /* 2/75 */ solid #e6e6e6;
        height: 100%;
      }
    }
  }
}
</style>
