<template>
  <div class="ServiceAddr">
    <div class="top">
      <img src="../../assets/images/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">服务网点</div>
    </div>
    <div class="box" v-for="(item, index) in list" :key="index">
      <div class="box-top flex-h">
        <div class="b-left">
          <div class="b-title">{{item.val1}}</div>
          <div class="b-title">{{item.val2}}</div>
          <div class="b-des">{{item.val3}}</div>
        </div>
        <div class="b-right" @click="callphone()">
          <img src="../../assets/images/phone.png" class="b-right-img">
          <img src="../../assets/images/phone2.png" class="b-right-img2">
        </div>
      </div>
      <div class="box-imgs flex-h">
        <img src="../../assets/images/wang1.png" class="box-img" v-if="index == 0"> 
        <img src="../../assets/images/wang2-1.png" class="box-img" v-if="index == 1"> 
        <img src="../../assets/images/wang2-2.png" class="box-img" v-if="index == 1"> 
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  name: "ServiceAddr",
  data() {
    return {
      list: [
        {
          val1: "网点一：",
          val2: "服务网点",
          val3: "山东省济宁市 | 五星网点 | 1236次服务"
        },
        {
          val1: "网点二：",
          val2: "维修中心",
          val3: "山东省济宁市 | 五星网点 | 899次服务"
        },

      ]
    };
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
    },
    callphone(){
      this.native.makeCall({
        mobile:'4000135880'
      }) 
    }
  }
};
</script>

<style lang='less' scoped>
.ServiceAddr {
  min-width: 100vw;
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
  .box {
    width: 100%;
    box-sizing: border-box;
    padding: 0.4rem /* 30/75 */;
    background: #ffffff;
    margin-bottom: 0.266667rem /* 20/75 */;
    .box-top {
      justify-content: space-between;
      .b-left {
        .b-title {
          font-size: 0.426667rem /* 32/75 */;
          color: #333333;
        }
        .b-des {
          font-size: 0.373333rem /* 28/75 */;
          color: #999999;
        }
      }
      .b-right {
        width: 1.066667rem /* 80/75 */;
        height: 1.066667rem /* 80/75 */;
        position: relative;
        .b-right-img {
          width: 100%;
          height: 100%;
        }
        .b-right-img2 {
          width: 0.453333rem /* 34/75 */;
          height: 0.493333rem /* 37/75 */;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
    .box-imgs {
      width: 100%;
      // justify-content: space-between;
      margin-top: 0.373333rem /* 28/75 */;
      .box-img {
        width: 2.2rem /* 165/75 */;
        height: 2.2rem /* 165/75 */;
        margin-right: .2rem;
      }
    }
  }
}
</style>
