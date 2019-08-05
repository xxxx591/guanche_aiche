<template>
  <div class="Rules">
    <div class="top">
      <img src="../../assets/images/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">规则说明</div>
    </div>
    <ul class="box">
      <div class="item">• 参与者资格：所有平台注册用户均可参与。活动期间每位用户分享邀请码均可获得总值100元的积分(有效期7天)，每日分享次数不设</div>
      <div class="item">• 参与者资格：所有平台注册用户均可参与。活动期间每位用户分享邀请码均可获得总值100元的积分(有效期7天)，每日分享次数不设</div>
      <div class="item">• 参与者资格：所有平台注册用户均可参与。活动期间每位用户分享邀请码均可获得总值100元的积分(有效期7天)，每日分享次数不设</div>
      <div class="item">• 参与者资格：所有平台注册用户均可参与。活动期间每位用户分享邀请码均可获得总值100元的积分(有效期7天)，每日分享次数不设</div>
    </ul>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  name: 'Rules',
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      // token: state => state.datas.token,
    })
  },
  methods: {
    // ...mapActions(["setTab"]),
    inputBlur() {
      window.scrollTo(0, 0)
    },
    topBack() {
      this.native.back_btn({})
      this.$router.back(-1)
    }
  }
}
</script>

<style lang='less' scoped>
.Rules {
   position: absolute;
    top: 1.13333333rem;
    width: 100%;
  .top {
    height: 1.133333rem /* 85/75 */;
    position: relative;
    border-bottom: .013333rem /* 1/75 */ solid #e6e6e6; /*no*/
    background: #ffffff;
    .top-back {
      width: .333333rem /* 25/75 */;
      height: .6rem /* 45/75 */;
      position: absolute;
      top: 50%;
      left: .4rem /* 30/75 */;
      transform: translateY(-50%);
    }
    .top-txt {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: .48rem /* 36/75 */;
      color: #000000;
    }
  }
  .box {
    width: 100%;
    box-sizing: border-box;
    padding: .4rem /* 30/75 */;
    .item {
      font-size: .426667rem /* 32/75 */;
      color: #666666;
      margin-bottom: .933333rem /* 70/75 */;
    }
  }
}
</style>
