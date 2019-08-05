<template>
  <div class="ConfirmBack">
    <div class="top">
      <img src="../../assets/images/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">{{title}}</div>
    </div>
    <div class="box flex-v">
      <img src="../../assets/images/cuowu.png" alt class="box-img" v-if="show">
      <img src="../../assets/images/back-ok.png" alt class="box-img" v-else>

      <div class="box-title">{{msg}}</div>
      <div class="box-des" v-show="!show">专属客服会尽快与您取得联系</div>
      <div class="box-btns flex-h">
        <!-- <div class="box-btn flex-h flex-cc" @click.stop="gotoHome">回首页</div> -->
        <div
          class="box-btn flex-h box-active flex-cc"
          v-show="show"
          @click.stop="gotoOrderList"
        >查看爱车</div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  name: 'ConfirmBack',
  data() {
    return {
      title:'预订回执',
      msg:'正在查询中，请等待...',
      show:true
    }
  },
  computed: {
    ...mapState({
      // token: state => state.datas.token,
    })
  },
  mounted(){
    this.init()
  },
  methods: {
    // ...mapActions(["setTab"]),
    inputBlur() {
      window.scrollTo(0, 0)
    },
    topBack() {
      // this.native.back_btn({})
      this.$router.back(-1)
    },
    gotoHome() {
      this.native.back_btn({});
    },
    gotoOrderList() {
      // TODOS
      console.log('查看订单')
      this.native.gotoHome()
    },
    async init(){
      let self =this;
      let orderId = this.$route.query.orderid
      let type = this.$route.query.type 
      let token = await this.native.getToken({});
      let a = async function(){
        let data = await self.api.queryPay({
          token:token.token,
          type:type,
          order_id:orderId
        })
        console.log(data);
        if (data.status == 1) {
          self.msg = "我们已收到您的预订";
          self.show = false;
        } else {
          setTimeout(_ => {
            a();
          }, 3000);
        }
      }
      a();
    }
  }
}
</script>

<style lang='less' scoped>
.ConfirmBack {
  position: absolute;
  top: 1.13333333rem;
  width: 100%;
  .top {
    height: 1.133333rem /* 85/75 */;
    position: relative;
    border-bottom: 1px /* 1/75 */ solid #e6e6e6; /*no*/
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
  .box {
    // justify-content: flex-end;
    align-items: center;
    .box-img {
      width: 1.6rem /* 120/75 */;
      height: 1.6rem /* 120/75 */;
      margin-top: 2.133333rem /* 160/75 */;
    }
    .box-title {
      font-size: 0.426667rem /* 32/75 */;
      color: #333333;
      margin-top: 0.4rem /* 30/75 */;
    }
    .box-des {
      font-size: 0.373333rem /* 28/75 */;
      color: #999999;
      margin-top: 0.4rem /* 30/75 */;
    }
    .box-btns {
      margin-top: 1.333333rem /* 100/75 */;
      .box-btn {
        font-size: 0.426667rem /* 32/75 */;
        color: #4ccdfa;
        border: 1px /* 1/75 */ solid #4ccdfa; /*no*/
        margin-right: 0.533333rem /* 40/75 */;
        width: 4rem /* 300/75 */;
        height: 0.933333rem /* 70/75 */;
        border-radius: 0.466667rem /* 35/75 */;
      }
      .box-active {
        font-size: 0.426667rem /* 32/75 */;
        color: #ffffff;
        background: #4ccdfa;
      }
    }
  }
}
</style>
