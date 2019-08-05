<template>
  <div class="DownLoad">
    
    <div class="box flex-v">
      <img src="../../assets/images/logo.png" alt class="box-img">
      <div class="box-title">挂车之家</div>
      <div class="box-des">挂车司机之家</div>
      <!-- <div class="box-btn flex-h flex-cc">Android版下载</div> -->
      <div class="box-btn flex-h flex-cc" @click="ios">APP下载</div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  name: "DownLoad",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      // token: state => state.datas.token,
    })
  },
  methods: {
    // ...mapActions(["setTab"]),
    inputBlur() {
      window.scrollTo(0, 0);
    },
    topBack() {
      this.native.back_btn({});
      this.$router.back(-1);
    },
    ios() {
      window.location.href = "https://yuntai.sinmore.vip/server/app.html?id=5";
    }
  }
};
</script>

<style lang='less' scoped>
.DownLoad {
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
  .box {
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    .box-img {
      width: 2.733333rem /* 205/75 */;
      height: 2.733333rem /* 205/75 */;
      margin-top: 1.866667rem /* 140/75 */;
    }
    .box-title {
      font-size: 0.533333rem /* 40/75 */;
      color: #333333;
      margin-top: 0.266667rem /* 20/75 */;
    }
    .box-des {
      font-size: 0.373333rem /* 28/75 */;
      color: #999999;
      margin-top: 0.266667rem /* 20/75 */;
      margin-bottom: .6rem /* 315/75 */;
    }
    .box-btn {
      background: #4ccdfa;
      width: 6.4rem /* 480/75 */;
      height: 1.173333rem /* 88/75 */;
      border-radius: 0.586667rem /* 44/75 */;
      color: #ffffff;
      font-size: 0.48rem /* 36/75 */;
      margin-top: 0.533333rem /* 40/75 */;
    }
  }
}
</style>
