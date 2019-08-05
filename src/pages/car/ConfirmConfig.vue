<template>
  <div class="ConfirmConfig">
    <div class="top">
      <img src="../../assets/images/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">确认配置</div>
    </div>
    <div class="box flex-h" v-for="(item, index) in list" :key="index">
      <div class="txt">{{item.type+'：'+item.name}}</div>
      <div class="price">¥{{item.price}}</div>
    </div>

    <div class="info">
      欢迎使用挂车之家购车，我们为你准备了一份订购指南，请了解，很重要。
      <br>Q：订单提交后还能修改配置吗？
      <br>A：在订单锁定排产前，均可以联系在线客服协助修改，订单锁定后不能修改配置。
      <br>Q：车辆订购后详细参数在哪里可以看到？
      <br>A：在App『爱车』-『车辆配置』中了解详情。
      <br>如果你还有更多疑问，请致电热线400 0135 880。
    </div>

    <div class="bottom flex-h">
      <div class="b-left flex-h">
        <div class="left-txt">合计:</div>
        <div class="left-price">¥{{total}}</div>
      </div>
      <div class="btn flex-h flex-cc" @click="godetails()">{{msg}}</div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";
import { close, closeSync } from "fs";

export default {
  // 确认配置
  name: "ConfirmConfig",
  data() {
    return {
      msg: "确认预订",
      list: [],
      total: 0
    };
  },
  computed: {
    ...mapState({
      // token: state => state.datas.token,
    })
  },

  mounted() {
    console.log(this.$store.state.buyCarType);
    if (this.$store.state.buyCarType == 1) {
      this.msg = "添加车辆";
    }
    this.list = this.$store.state.setArray;
    let arr = this.$store.state.setArray;
    let num = 0;
    console.log(arr);
    arr.forEach(item => {
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
    init() {
      let num;
      this.list.forEach(item => {
        num += parseFloat(item.price);
      });
      this.total = num;
    },
    async godetails() {
      let arr = [];
      this.list.forEach(item => {
        arr.push(item.id);
      });
      if (this.$store.state.buyCarType == 1) {
        // 添加车辆走这里
        let data = await this.api.addCar({
          token: this.$store.state.token,
          trailer_id: this.$store.state.priceObj.id,
          type_id: arr
        });
        console.log(data);
        this.native.back_btn({});
      } else {
        // 购买车辆走这里
        let param = {
          token: this.$store.state.token,
          trailer_id: this.$store.state.priceObj.id,
          type_id: arr
        };
        let orderId = "";
        // this.$store.dispatch("getOrderId", param).then(data => {
        //   console.log(data);
        //   orderId = data.data.trailer_order_id;
        //   this.$router.push({
        //     path: "MindLatter",
        //     query: { obj: this.$store.state.setArray, orderid: orderId }
        //   });
        // });
        this.api.getOrderId(param).then(data => {
          console.log(data);

          orderId = data.trailer_order_id;
          this.$router.push({
            path: "MindLatter",
            query: { obj: this.$store.state.setArray, orderid: orderId }
          });
        });
      }
    }
  }
};
</script>

<style lang='less' scoped>
.ConfirmConfig {
  position: absolute;
    top: 1.13333333rem;
    width: 100%;
  .top {
    height: 1.133333rem /* 85/75 */;
    position: relative;
    border-bottom: 0.013333rem /* 1/75 */ solid #e6e6e6; /*no*/
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
  .box {
    width: 9.2rem /* 690/75 */;
    height: 1.466667rem /* 110/75 */;
    box-sizing: border-box;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0.013333rem /* 1/75 */ solid #e6e6e6; /*no*/

    .txt {
      font-size: 0.426667rem /* 32/75 */;
      color: #333333;
    }
    .price {
      font-size: 0.426667rem /* 32/75 */;
      color: #ff5d25;
      font-weight: bold;
    }
  }
  .info {
    width: 100%;
    box-sizing: border-box;
    padding: 0.4rem /* 30/75 */;
    color: #999999;
    font-size: 0.32rem /* 24/75 */;
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
    border-top: 1px solid #f6f6f6;
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
}
</style>
