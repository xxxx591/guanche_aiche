<template>
  <div class="LoveCar">
    <div class="top">
      <!-- <img src="../../assets/images/back-arrow.png" @click.stop="$router.back(-1)" class="top-back"> -->
      <div class="top-txt">爱车</div>
      <img
        src="../../assets/images/plus.png"
        class="top-add"
        @click.stop="buyCarflag = !buyCarflag"
      >
      <transition name="van-slide-right">
        <div v-show="buyCarflag" class="ul-list">
          <ul>
            <li
              @click.stop="gotoPage2({name: 'ChooseCar',type:'1', pageUrl: '/Car/ChooseCar?type=1'})"
            >添加车辆</li>
            <li
              @click.stop="gotoPage2({name: 'ChooseCar',type:'2', pageUrl: '/Car/ChooseCar?type=2'})"
            >购买车辆</li>
          </ul>
        </div>
      </transition>
    </div>
    <div class="banner" v-if="showCarFlag">
      <van-swipe class="banner-swiper" v-if="showCar" @change="onChange">
        <van-swipe-item v-for="(item, index) in carList" :key="index" class="car-tab">
          <div
            class="banner-swiper-item"
            @touchstart="gotouchstart(item)"
            @touchmove="gotouchmove"
            @touchend="gotouchend"
          >
            <div class="banner-box">
              <div class="banner-top flex-h">
                <div class="banner-left flex-h">我的爱车</div>
                <div class="banner-right flex-v">
                  <div class="banner-title">{{item.brand}}</div>
                  <div class="banner-des">{{item.name}}</div>
                </div>
              </div>
              <div class="banner-bottom flex-h" @click="callTell()">
                <!-- <img :src="userInfo.avatar" class="banner-img"> -->
                <img src="../../assets/images/logo_aiche.png" class="banner-img">
                <!-- {{userInfo.nickname}}  用户名 -->
                <div class="banner-gw">您的专属顾问</div>
                <img src="../../assets/images/arrow-right-white.png" class="banner-arrow">
              </div>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
      <van-swipe class="banner-swiper" v-else>
        <van-swipe-item class="car-tab" @click.stop="buyCarflag = !buyCarflag">
          <div class="banner-swiper-item">
            <div class="banner-box">
              <div class="banner-top flex-h">
                <div class="banner-left flex-h">我的爱车</div>
                <div class="banner-right flex-v">
                  <div class="banner-title">你还没有添加车辆</div>
                  <div class="banner-des">马上去添加>></div>
                </div>
              </div>
              <div class="banner-bottom flex-h" @click="callTell()">
                <img src="../../assets/images/logo_aiche.png" class="banner-img">
                <div class="banner-gw">您的专属顾问</div>
                <img src="../../assets/images/arrow-right-white.png" class="banner-arrow">
              </div>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="service">
      <div class="s-title">安心服务</div>
      <div class="s-box flex-h">
        <div
          class="s-item flex-v flex-cc"
          @click.stop="gotoPage2({name: 'CarConfig', pageUrl: '/Car/CarConfig?id=1'})  ; "
        >
          <img src="../../assets/images/setting.png" class="s-img">
          <div class="s-txt">车辆订单</div>
        </div>
        <div
          class="s-item s-item-gap flex-v flex-cc"
          @click.stop="gotoPage2({name: 'MaintainCalcu', pageUrl: '/Car/MaintainCalcu?id=1'})"
        >
          <img src="../../assets/images/calculate.png" class="s-img">
          <div class="s-txt">保养计算</div>
        </div>
        <div
          class="s-item flex-v flex-cc"
          @click.stop="gotoPage2({name: 'MaintainAdvice', pageUrl: '/Car/MaintainAdvice?id=1'})"
        >
          <img src="../../assets/images/advice.png" class="s-img">
          <div class="s-txt">保养建议</div>
        </div>
        <!-- TODOS -->
        <div class="s-item flex-v flex-cc" @click="gopage3()">
          <img src="../../assets/images/fujian.png" class="s-img">
          <div class="s-txt">周边附件</div>
        </div>
        <div
          class="s-item s-item-gap flex-v flex-cc"
          @click.stop="gotoPage2({name: 'InvitedGift', pageUrl: '/Car/InvitedGift?id=1'})"
        >
          <img src="../../assets/images/invite.png" class="s-img">
          <div class="s-txt">邀请有礼</div>
        </div>
        <div
          class="s-item flex-v flex-cc"
          @click.stop="gotoPage2({name: 'ServiceAddr', pageUrl: '/Car/ServiceAddr?id=1'})"
        >
          <img src="../../assets/images/netpoint.png" class="s-img">
          <div class="s-txt">服务网点</div>
        </div>
      </div>
    </div>
    <div class="car">
      <img :src="item.cover" class="car-img" v-for="(item,index) in banner" :key="index">
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  name: "LoveCar",
  data() {
    return {
      swiperOption1: {
        direction: "horizontal",
        slidesPerView: 1,
        spaceBetween: 0,
        // autoplay: {
        //   disableOnInteraction: false,
        //   delay: 2500
        // },
        preventLinksPropagation: false,
        pagination: {
          // el: '.swiper-pagination',
        }
      },
      carList: [
        {
          index: 0,
          val: "第一台车"
        },
        {
          index: 2,
          val: "第二台车"
        },
        {
          index: 3,
          val: "第三台车"
        }
      ],
      userInfo: {},
      buyCarflag: false,
      timeOutEvent: 0,
      showCar: false,
      showCarFlag: true,
      banner: [],
      nowCar: {}
    };
  },
  async created() {
    // this.setTab(2);
    var u = navigator.userAgent;
    var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
    if (isAndroid) {
      console.log("this", window.location.href);

      this.$store.state.token = this.$route.query.token;
      this.getMyCars();
    } else {
      let token = await this.native.getToken({});
      this.$store.state.token = token.token;
      console.log("this", window.location.href);
      console.log("token", this.$store.state.token);
      this.getMyCars();
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
      window.scrollTo(0, 0);
    },
    gotoPage(obj) {
      // if (obj === "") return;
      // this.$router.push({
      //   name: obj.name,
      //   query: {
      //     carId: this.$store.state.nowCar.id,
      //     token: this.$store.state.token
      //   }
      // });
      // 此页面所有路由跳转都要调用此原生通知
      console.log(obj);
      this.native.routerGoTo({
        url:
          "http://h5.gc-app.com/#" +
          obj.pageUrl +
          "?carId=" +
          this.$store.state.nowCar.id +
          "&token=" +
          this.$store.state.token
      });
    },
    gopage3() {
      this.native.goZhiZhao();
    },
    callTell() {
      this.native.makeCall({
        mobile: "4000135880"
      });
    },
    gotoPage2(obj) {
      if (obj === "") return;
      this.$router.push({
        name: obj.name,
        query: { type: obj.type,
        token:this.$store.state.token }
      });
      // 此页面所有路由跳转都要调用此原生通知
      console.log(obj);
      this.native.routerGoTo({
        url:
          "http://h5.gc-app.com/#" +
          obj.pageUrl +
          "&token=" +
          this.$store.state.token +
          "&carId=" +
          this.$store.state.nowCar.id
      });
    },
    userCar(obj) {
      this.$router.push({
        name: obj.name,
        query: { userId: this.userInfo.usable_integral }
      });
    },
    async getMyCars() {
      let list = await this.api.myCars({
        token: this.$store.state.token
      });
      let userInfo = await this.api.userDetail({token:this.$store.state.token});
      this.userInfo = userInfo;
      if (list.error_code == 1005) {
        let newToken = await this.native.saveToken({token:this.$store.state.token});
        console.log(newToken);
        list = await this.api.myCars({
          token: newToken
        });
      }
      this.carList = list;
      this.$store.state.nowCar =
        this.carList[0] == undefined ? { id: "suibian" } : this.carList[0];

      if (list.length > 0) {
        this.showCar = true;
      }
      this.getStickCar();
      console.log(list.length);
    },
    async getStickCar() {
      let data = await this.api.getStickCar({
        token: this.$store.state.token,
        page: 1,
        pagesize: 1
      });
      this.banner = data.data;
      console.log("getStickCar-------", data);
    },
    gotouchstart(item) {
      let that = this;
      clearTimeout(this.timeOutEvent); //清除定时器
      this.timeOutEvent = 0;
      this.timeOutEvent = setTimeout(_ => {
        //执行长按要执行的内容，
        this.$dialog
          .confirm({
            title: "提示",
            message: "您确定要删除该车辆信息吗？"
          })
          .then(async () => {
            console.log(item);
            let parms = {
              token: this.$store.state.token,
              user_car_id: item.id
            };
            let data = await this.api.delCar(parms);
            this.carList = await this.api.myCars({
              token: this.$store.state.token
            });
            console.log(this.list);
            this.showCarFlag = false;
            this.$nextTick(_ => {
              if (this.carList.length > 0) {
                this.showCarFlag = true;
              } else {
                this.showCarFlag = true;
                this.showCar = false;
              }
            });
            // on confirm
          })
          .catch(() => {
            // on cancel
          });
      }, 600); //这里设置定时
    },
    //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
    gotouchend() {
      clearTimeout(this.timeOutEvent);
      if (this.timeOutEvent != 0) {
        //这里写要执行的内容（尤如onclick事件）
      }
    },
    //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
    gotouchmove() {
      clearTimeout(this.timeOutEvent); //清除定时器
      this.timeOutEvent = 0;
    },
    onChange(index) {
      console.log(this.carList[index]);
      this.$store.state.nowCar = this.carList[index];
      console.log(this.nowCar);
    }
  }
};
</script>

<style lang='less' scoped>
.LoveCar {
  // padding-bottom: 1.333333333rem;
  position: absolute;
  top: 1.13333333rem;

  .top {
    width: 100%;
    height: 1.13333333rem;
    position: fixed;
    border-bottom: 1px /* 1/75 */ solid #e6e6e6;
    background: #ffffff;
    top: 0;
    z-index: 10;
    .top-txt {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 0.48rem /* 36/75 */;
      color: #000000;
    }

    .ul-list {
      position: absolute;
      border: 1px /* 1/75 */ solid #f6f6f6;
      background: #fff;
      z-index: 999;
      right: 0;
      top: 1.13333333rem;
      font-size: 0.373333rem /* 28/75 */;
      color: #333;

      ul {
        li {
          line-height: 1.5;
          padding: 0.266667rem /* 20/75 */ 0.533333rem /* 40/75 */;

          &:first-of-type {
            border-bottom: 1px /* 1/75 */ solid #f6f6f6;
          }
        }
      }
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
      font-size: 0.186667rem /* 14/75 */;
    }
  }

  .banner {
    width: 100%;
    height: 4.826666667rem;
    position: relative;
    box-sizing: border-box;
    width: 9.2rem;
    height: 3.6rem;
    overflow: hidden;
    border-radius: 0.1333333333rem;
    margin: 0 auto;
    margin-top: 0.4rem;
    margin-bottom: 0.8rem;

    .banner-swiper {
      width: 100%;
      height: 100%;

      .car-tab {
        width: 4.6rem;
      }

      .banner-swiper-item {
        width: 100%;
        height: 100%;

        .banner-box {
          width: 100%;
          height: 100%;
          background: #4ccffa;

          .banner-top {
            height: 2.4rem;
            width: 100%;
            box-sizing: border-box;
            align-items: center;

            .banner-left {
              min-width: 2.133333333rem;
              max-width: 2.133333333rem;
              height: 1.333333333rem;
              border-right: 1px /* 1/75 */ solid #ffffff;
              /*no*/
              font-size: 0.5233rem;
              color: #ffffff;
              font-weight: bold;
              padding: 0 0.4rem;
              box-sizing: border-box;
              align-items: center;
              justify-content: center;
              margin-left: 0.2666666667rem;
            }

            .banner-right {
              margin-left: 0.4rem;
              justify-content: space-between;

              .banner-title {
                width: 5.6rem;
                height: 0.7133333333rem;
                font-size: 0.533333rem /* 40/75 */;
                color: #ffffff;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                text-overflow: ellipsis;
                // overflow: hidden;
                font-weight: 600;
                margin-bottom: 0.3rem /* 30/75 */;
                overflow: hidden;
              }

              .banner-des {
                width: 5.6rem;
                font-size: 0.373333rem /* 28/75 */;
                height: 0.5066666667rem;
                color: #ffffff;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                text-overflow: ellipsis;
                overflow: hidden;
              }
            }
          }

          .banner-bottom {
            width: 8.4rem;
            height: 1.2rem;
            box-sizing: border-box;
            padding: 0.4rem 0;
            border-top: 1px /* 1/75 */ solid #ffffff;
            /*no*/
            align-items: center;
            margin: 0 auto;

            .banner-img {
              width: 0.6666666667rem;
              height: 0.6666666667rem;
              border-radius: 0.3333333333rem;
            }

            .banner-gw {
              font-size: 0.32rem /* 24/75 */;
              color: #ffffff;
              margin-left: 0.2666666667rem;
            }

            .banner-arrow {
              width: 0.1466666667rem;
              height: 0.2666666667rem;
              margin-left: 0.2666666667rem;
            }
          }
        }
      }
    }

    .swiper-pagination {
      position: absolute;
      bottom: 0.2666666667rem;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .service {
    width: 100%;
    box-sizing: border-box;
    padding: 0 0.4rem;

    .s-title {
      font-size: 0.533333rem /* 40/75 */;
      color: #333333;
      font-weight: bold;
      margin-bottom: 0.4rem;
    }

    .s-box {
      width: 100%;
      box-sizing: border-box;
      flex-wrap: wrap;

      .s-item {
        width: 2.88rem;
        height: 2.88rem;
        border-radius: 0.266667rem /* 20/75 */;
        background: #f5f8fa;
        margin-bottom: 0.2666666667rem;

        .s-img {
          width: 0.8266666667rem;
          height: 0.8266666667rem;
          margin-bottom: 0.4rem;
        }

        .s-txt {
          font-size: 0.4rem /* 30/75 */;
          color: #333333;
        }
      }

      .s-item-gap {
        margin: 0 0.2666666667rem;
      }
    }
  }

  .car {
    height: 3.466666667rem;
    box-sizing: initial;
    padding: 0.4rem;

    .car-img {
      border-radius: 0.266667rem /* 20/75 */;
      width: 100%;
      // height: 100%;
    }
  }
}
</style>
