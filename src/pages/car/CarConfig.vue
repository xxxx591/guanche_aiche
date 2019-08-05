<template>
  <div class="CarConfig">
    <div class="top">
      <img src="../../assets/images/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">车辆订单</div>
    </div>
    <div class="box-pro flex-v">
      <img :src="carObj.cover" class="b-img">
      <div class="b-title">{{carObj.name}}</div>
      <div class="b-des">
        <ul>
          <li v-for="(item,index) in carObj.setting" :key="index">
            <p>
              <i>{{item.type_name}}</i>
              <i class="tab" v-if=" (index+1)%3 != 0 ">｜</i>
            </p>
          </li>
        </ul>
      </div>
      <div class="b-price">¥{{carObj.price}}</div>
    </div>
    <div class="conf">
      <div class="conf-title">车辆配置</div>
      <div class="conf-box" v-for="(item,index) in carObj.setting" :key="index">
        <span class="conf-attr">{{item.format_name}}：</span>
        <span class="conf-data">{{item.type_name}}</span>
        <span class="conf-price">￥{{item.price}}</span>
      </div>
      
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";


export default {
  // 意向书
  name: 'CarConfig',
  data() {
    return {
      carObj:{}
    }
  },
  computed: {
    ...mapState({
      // token: state => state.datas.token,
    })
  },
  mounted(){

    console.log(this.$route.query);
    this.init()
  },
  methods: {
    // ...mapActions(["setTab"]),
    inputBlur() {
      window.scrollTo(0, 0)
    },
    topBack() {
      this.native.back_btn({})
      this.$router.back(-1)
    },
    async init(){
       
      let data = await this.api.carSetting({
        token: this.$route.query.token,
        user_car_id:this.$route.query.carId
      })
      this.carObj = data
      console.log('E40车辆配置的接口------',data);
      
    }
  }
}
</script>

<style lang='less' scoped>
.CarConfig {
  min-width: 100vw;
  min-height: calc(100vh - 3.133333rem);
  background: #f7f8fa;
   position: absolute;
    top: 1.13333333rem;
    width: 100%;
  // padding-bottom: 2.666667rem /* 200/75 */;
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
  .box-pro {
    justify-content: center;
    align-items: center;
    background: #ffffff;
    padding: .133333rem /* 10/75 */;
    box-sizing: border-box;
    .b-img {
      width: 2.133333rem /* 160/75 */;
      height: 2.133333rem /* 160/75 */;
      border-radius: .133333rem /* 10/75 */;
      margin-top: .533333rem /* 40/75 */;
    }
    .b-title {
      color: #333333;
      font-size: .426667rem /* 32/75 */;
      font-weight: bold;
      text-align: center;
      margin-top: .4rem /* 30/75 */;
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
      margin-top: .4rem /* 30/75 */;
      margin-bottom: .533333rem /* 40/75 */;
      font-size: .533333rem /* 40/75 */;
      color: #ff5d25;
      font-weight: bold;
    }
  }
  .conf {
    width: 100%;
    padding: .4rem /* 30/75 */;
    box-sizing: border-box;
    .conf-title {
      font-size: .426667rem /* 32/75 */;
      color: #333333;
      margin-bottom: .533333rem /* 40/75 */;
    }
    .conf-box {
      margin-bottom: .4rem /* 30/75 */;
      .conf-attr {
        color: #484848;
        font-size: .373333rem /* 28/75 */;
      }
      .conf-data {
        color: #484848;
        font-size: .373333rem /* 28/75 */;
      }
      .conf-price {
        color: #ff5d25;
        font-size: .373333rem /* 28/75 */;
      }
    }
  }
}
</style>
