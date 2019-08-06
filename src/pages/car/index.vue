<template>
  <div class="about-us">
    <div class="top">
      <img src="../../assets/images/back-arrow.png" @click.stop="topBack" class="top-back" />
      <div class="top-txt">{{title}}</div>
    </div>
    <div class="content-box">
      <div>
        <img src="../../assets/images/invite2.png" alt srcset />
      </div>
      <p class="black">挂车之家v4.0.0</p>
      <p class="gray">客服热线：400-0000-000</p>
      <p class="gray">客服邮箱：SERVICE@SITE.COM</p>
    </div>
    <div class="bottom">
      <p class="blue">《挂车之家用户协议》</p>
      <p class="gray-2">COPYRIGHT @挂车之家2015-2017</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "demo",
  data() {
    return {
      title: "关于我们"
    };
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.about-us {
  position: absolute;
  top: 1.13333333rem;
  width: 100%;
  text-align: center;

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
  .content-box {
    padding-top: 2rem;
    img {
      width: 110px;
      margin-bottom: 30px;
    }
  }
  .bottom {
    position: fixed;
    width: 100%;
    bottom: 0;
    margin-bottom: 30px;
  }
  .black {
    color: rgba(51, 51, 51, 1);
    font-size: 20px;
    line-height: 2;
  }
  .gray {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 2;
  }
  .blue {
    color: #4ccdfa;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    line-height: 2;
  }
  .gray-2 {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    line-height: 2;
    color: #aeaeae;
  }
}
</style>

