<template>
  <div class="MaintainAdvice">
    <div class="top">
      <img src="../../assets/images/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">保养建议</div>
    </div>
    <div class="box-pro flex-v">
      <img :src="carObj.user_car.cover" class="b-img">
      <div class="b-title">{{carObj.user_car.name}}</div>
      <div class="b-des">
        <ul>
          <li v-for="(item,index) in carObj.user_car.setting" :key="index">
            <p>
              <i>{{item.type_name}}</i>
              <i class="tab" v-if=" (index+1)%3 != 0 ">｜</i>
            </p>
          </li>
        </ul>
      </div>
      <div class="b-price">¥{{carObj.user_car.price}}</div>
    </div>
    <div class="conf">
      <div class="conf-title">保养建议</div>
      <div class="c-box flex-h" v-for="(item, index) in carObj.aegis_offer" :key="index">
        <div class="c-img">
          <img src="../../assets/images/lin.png" alt class="c-img2">
        </div>
        <div class="c-right">
          <div class="c-kilo">{{item.title}}</div>
          <div class="c-des">{{item.content}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  // 意向书
  name: "MaintainAdvice",
  data() {
    return {
      carObj: {}
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
  methods: {
    // ...mapActions(["setTab"]),
    inputBlur() {
      window.scrollTo(0, 0);
    },
    topBack() {
      this.native.back_btn({});
      this.$router.back(-1);
    },
    async init() {
       
      let data = await this.api.aegisOffer({
        token: this.$route.query.token,
        user_car_id: this.$route.query.carId
      });
      this.carObj = data;
      console.log("E60 单独保养建议------", data);
    }
  }
};
</script>

<style lang='less' scoped>
.MaintainAdvice {
  min-width: 100vw;
  min-height: calc(100vh - 3.133333rem);
  background: #f7f8fa;
   position: absolute;
    top: 1.13333333rem;
    width: 100%;
  padding-bottom: 1.666667rem /* 200/75 */;

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
  .conf {
    width: 100%;
    padding: 0.4rem /* 30/75 */;
    box-sizing: border-box;
    background: #ffffff;
    margin-top: 0.266667rem /* 20/75 */;
    .conf-title {
      font-size: 0.426667rem /* 32/75 */;
      color: #333333;
      margin-bottom: 0.533333rem /* 40/75 */;
    }
    .c-box {
      margin-bottom: 0.533333rem /* 40/75 */;
      .c-img {
        min-width: 0.4rem /* 30/75 */;
        max-width: 0.4rem /* 30/75 */;
        height: 0.4rem /* 30/75 */;
        .c-img2 {
          width: 100%;
          height: 100%;
        }
      }
      .c-right {
        margin-left: 0.4rem /* 30/75 */;
        .c-kilo {
          font-size: 0.373333rem /* 28/75 */;
          color: #333333;
        }
        .c-des {
          font-size: 0.32rem /* 24/75 */;
          color: #999999;
        }
      }
    }
  }
}
</style>
