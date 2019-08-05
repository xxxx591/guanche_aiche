<template>
  <div class="agreement">
    <div class="top">
      <img src="../../assets/images/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">{{msg}}</div>
    </div>
    <div v-html="showContent" class="content"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "协议页面",
      showContent: ""
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      let data = await this.api.pageInfo({
        content_id: 2
      });
      console.log(data);
      this.showContent = data.content;
      this.msg = data.name
    },
    topBack() { 
      this.$router.back(-1);
    },
  }
};
</script>
<style lang="less" scoped>
.agreement {
  width: 100vw;
  min-height: calc(100vh - 3.133333rem);
  background: #f7f8fa;
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
  .content {
    margin-top: 0.4rem;
    margin-bottom: 0.4rem;
    width: 9.2rem;
    margin: 0 auto;
    p {
        text-align: center;
      &:first-of-type {
        text-align: center;
      }
    }
  }
}
</style>
