<template>
  <div class="SetCar">
    <div class="top">
      <img src="../../assets/images/back-arrow.png" @click.stop="topBack" class="top-back" />
      <div class="top-txt">配置车辆</div>
    </div>
    <div class="box flex-h">
      <van-tabs type="card" :active="actionIndex">
        <van-tab class="box-btn" v-for="(item, index) in rules" :key="index">
          <div class="tab-title" slot="title" @click.stop="chooseRule(item,index)">{{ item.name }}</div>
          <div class="select">
            <div class="s-txt">选择配置项</div>
            <div class="s-item flex-h">
              <div
                class="s-ele flex-h flex-cc"
                :class="classIndex ===  checkIndex?'check-active':''"
                v-for="(item, checkIndex) in rulesList"
                :key="checkIndex"
              >
                <span @click="check(item,checkIndex)">{{item.name}}</span>
              </div>
              <p class="pic-cover">
                <img :src="rulesList[checkIndex].cover" alt srcset />
              </p>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="bbt">
      <div class="bbt-box flex-h">
        <!-- <div class="bbbt-left">预计费用：{{price}}¥</div> -->
        <div class="b-left flex-h">
          <div class="left-txt">预计费用:</div>
          <div class="left-price">¥{{price}}</div>
        </div>
        <div
          class="bbbt-right flex-h flex-cc"
          @click="gotoPage('ConfirmConfig',priceObj)"
          :class="hideFlag?'':'hide'"
        >确认订单</div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";
import { close } from "fs";
import { debug } from "util";
import { setTimeout } from "timers";

export default {
  name: "SetCar",
  data() {
    return {
      rules: ["颜色", "后盖", "车顶", "底盘", "底盘", "底盘"],
      rulesList: [],
      selectedRule: "",
      actionIndex: 0, //tab顶部index
      priceObj: [],
      checkIndex: "0", // 生成的区域的index
      price: 0,
      classIndex: "",
      throttling: true,
      hideFlag: false
    };
  },
  watch: {
    priceObj(val) {
      console.log("val", val);
      val.length !== this.rules.length
        ? (this.hideFlag = false)
        : (this.hideFlag = true);
    }
  },
  computed: {
    ...mapState({
      // token: state => state.datas.token,
    }),
    total(obj) {
      return function() {
        let num = "";
      };
    }
  },
  created() {
    // this.getCarRules();
    console.log(this.$refs);
    this.rules = JSON.parse(
      JSON.stringify(this.$store.state.priceObj.trailer_format)
    );
    console.log(this.$store.state.priceObj);
    this.chooseRule(this.rules[0], 0);
  },
  methods: {
    // ...mapActions(["setTab"]),
    inputBlur() {
      window.scrollTo(0, 0);
    },
    topBack() {
      // this.native.back_btn({})
      this.$router.back(-1);
    },
    async chooseRule(item, index) {
      console.log(index);
      this.actionIndex = index;
      this.classIndex = "";
      let list = await this.api.formatType({
        format_id: item.id
      });
      this.rulesList = list;
      this.priceObj.forEach(i => {
        if (i.actionIndex === index) {
          this.classIndex = i.classIndex;
        }
      });
      console.log("formatType-----", list);
    },
    async getCarRules() {
      let list = await this.api.format({
        trailer_id: this.$route.query.id
      });
      console.log("format-----", list[0].id);
      this.rules = list;
      this.chooseRule(list[0], 0);
    },
    check(item, index) {
      if (this.throttling) {
        this.throttling = false;
        let price = 0;
        if (this.classIndex === index) {
          item.actionIndex = this.actionIndex;
          this.priceObj.forEach((i, val) => {
            if (i.actionIndex === item.actionIndex) {
              this.priceObj.splice(val, 1);
              this.classIndex = "";
            }
          });
        } else {
          this.classIndex = index;
          item.actionIndex = this.actionIndex;
          item.classIndex = index;
          item.type = this.rules[this.actionIndex].name;
          let flag = true;
          let obj = {};

          for (let i = 0; i < this.priceObj.length; i++) {
            let obj1 = this.priceObj[i];
            if (obj1.actionIndex === item.actionIndex) {
              // obj1 = JSON.parse(JSON.stringify(item));
              obj1.actionIndex = item.actionIndex;
              obj1.classIndex = item.classIndex;
              obj1.type = this.rules[this.actionIndex].name;
              obj1.id = item.id;
              obj1.name1 = item.name;
              obj1.price = item.price;
              flag = false;
            }
          }
          console.log(this.priceObj);
          this.$store.state.setArray = this.priceObj;
          console.log(this.$store.state.priceObj);
          console.log(this.$store.state.setArray);
          if (flag) {
            this.priceObj.push(item);
          }
        }
        this.priceObj.forEach(key => {
          price += parseFloat(key.price);
        });
        this.price = price;
        console.log(this.priceObj);
        setTimeout(_ => {
          this.throttling = true;
        }, 200);
      } else {
        return;
      }
    },
    gotoPage(path, obj) {
      if (obj.length != this.rules.length) {
        this.$toast("请选择每一个配置项");
        return;
      }
      this.$router.push({
        path: path,
        query: { id: this.$route.query.id }
      });
    }
  }
};
</script>

<style lang='less' scoped>
.SetCar {
  position: absolute;
  top: 1.13333333rem;
  width: 100%;

  .top {
    padding: 0 0.4rem;
    height: 1.133333333rem;
    position: relative;
    border-bottom: 0.013333rem /* 1/75 */ solid #e6e6e6; /*no*/
    background: #ffffff;
    .top-txt {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 0.48rem /* 18/75 */;
      color: #000000;
    }
    .top-back {
      width: 0.32rem;
      position: absolute;
      top: 50%;
      margin-top: -0.3rem;
    }
    .top-add {
      width: 0.5866666667rem;
      height: 0.5866666667rem;
      position: absolute;
      top: 50%;
      right: 0.4rem;
      transform: translateY(-50%);
      color: #4ccdfa;
      white-space: nowrap;
      font-size: 0.373333rem /* 28/75 */ /* 14/75 */;
    }
  }
  .box {
    width: 100%;
    box-sizing: border-box;
    // height: 1.2rem /* 90/75 */;
    padding: 0.4rem;
    padding-bottom: 0;
    background: #ffffff;
    .box-left {
      background: #ffffff;
      .box-btn {
        width: 2.4rem;
        height: 0.9333333333rem;
        position: relative;
        margin-bottom: 0.4rem;
        margin-bottom: 0.4rem;
        border: 0.013333rem /* 1/75 */ solid #f6f6f6;
        border-radius: 0.053333rem /* 4/75 */;

        .box-btn-img {
          width: 100%;
          height: 100%;
        }
        .box-btn-txt {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          font-size: 0.4rem;
          color: #4ccdfa;
          text-align: center;
          line-height: 0.9333333333rem;
          padding-right: 0.2666666667rem;
          box-sizing: border-box;
        }
        .selectBtn {
          color: #ffffff;
        }
      }
    }
    .box-right-img {
      width: 6.48rem;
      height: 6.48rem;
      margin-left: 0.2666666667rem;
    }
    .flex-h {
      .check-active {
        color: #fff;
        background: #4ccdfa;
      }
    }
  }
  .line {
    width: 9.2rem;
    margin: 0 auto;
    border-top: 0.013333rem /* 1/75 */ solid #e5e5e5; /*no*/
  }
  .select {
    background: #ffffff;
    width: 100%;
    box-sizing: border-box;
    padding: 0.4rem;
    .s-txt {
      font-size: 0.426667rem /* 32/75 */;
      color: #333333;
    }
    .s-item {
      margin-top: 0.4rem;
      position: relative;
      flex-wrap: wrap;
      .pic-cover {
        width: 6.266667rem /* 470/75 */;
        height: 6.266667rem /* 470/75 */;
        // position: absolute;
        // top: 0;
        // left: 0;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .s-ele {
        height: 0.9333333333rem;
        // box-sizing: border-box;
        padding: 0 0.4rem;
        border: 1px solid rgba(230, 230, 230, 1);
        border-radius: 0.4666666667rem;
        margin-right: 0.4rem;
        font-size: 0.373333rem /* 28/75 */ /* 14/75 */;
        min-width: 45%;
        margin-bottom: 0.4rem;
        display: flex;
        span {
          flex: 1;
          text-align: center;
        }
      }
      .s-ele2 {
        background: #4ccdfa;
        color: #ffffff;
      }
    }
  }
  .bbt {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 1.466666667rem;
    background: #ffffff;
    .bbt-box {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 0 0.4rem;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #f6f6f6;
      .b-left {
        // height: 0.4rem /* 30/75 */;
        .left-txt {
          font-size: 0.426667rem /* 32/75 */;
          // height: 0.266667rem /* 20/75 */;
          // line-height: 0.266667rem /* 20/75 */;
          color: #333333;
          align-self: flex-end;
        }
        .left-price {
          font-size: 0.426667rem /* 32/75 */;
          // height: 0.4rem /* 30/75 */;
          // line-height: 0.4rem /* 30/75 */;
          color: #ff5d25;
          padding-top: 0.026667rem /* 2/75 */;
          margin-left: 0.133333rem /* 10/75 */;
          font-weight: bold;
        }
      }
      .bbbt-left {
        font-size: 0.533333rem /* 40/75 */;
        color: #ff5d25;
        font-weight: bold;
      }
      .bbbt-right {
        width: 3.733333333rem;
        height: 0.9333333333rem;
        background: #4ccdfa;
        border-radius: 0.4666666667rem;
        font-size: 0.4rem;
        color: #ffffff;
      }
    }
    .hide {
      background: #bbb !important;
    }
  }
  .tab-title {
    &::after {
      width: 0;
      height: 0;
      border-width: 0.4rem /* 30/75 */ 0.4rem /* 30/75 */ 0.4rem /* 30/75 */ 0;
      border-style: solid;
      border-color: transparent #4ccdfa transparent transparent;
      /*透明 灰 透明 透明 */
      margin: 0.533333rem /* 40/75 */ auto;
      position: relative;
    }
  }
}
</style>
