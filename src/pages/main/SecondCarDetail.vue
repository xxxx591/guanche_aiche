<template>
  <div class="SecondCarDetail">
    <div class="top">
      <img src="../../assets/images/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">车辆详情</div>
    </div>
    <div class="banner">
      <swiper
        v-if="carInfo.get_pic && carInfo.get_pic.length"
        :options="swiperOption1"
        bindchange="swiperChange"
        class="banner-swiper"
      >
        <template v-for="(item, index) in carInfo.get_pic">
          <swiper-slide class="banner-swiper-item" :key="index">
            <img :src="item.pic" alt class="banner-swiper-img">
          </swiper-slide>
        </template>
      </swiper>
      <div class="swiper-pagination"></div>
      <!-- <div class="swiper-pagination" slot="pagination"></div> -->
    </div>
    <div class="p-right flex-v">
      <div class="p-top">
        <div class="p-title">{{carInfo.name}}</div>
        <div class="p-des">{{carInfo.desc}}</div>
      </div>
      <div class="p-bottom flex-h">
        <div class="p-mark flex-h">{{carInfo.get_colour && carInfo.get_colour.name}}</div>
        <div class="p-mark flex-h">{{carInfo.price}}万</div>
        <div class="p-mark flex-h">{{carInfo.years}}年</div>
        <div class="p-mark flex-h">{{carInfo.load}}吨</div>
      </div>
      <div class="p-line"></div>
    </div>
    <div class="info">
      <div class="info-box flex-h">
        <div class="info-1 flex-h">
          <div class="info-1-1">车辆里程：</div>
          <div class="info-1-2">{{carInfo.course}}万公里</div>
        </div>
        <div class="info-2 flex-h">
          <div class="info-2-1">车辆年限：</div>
          <div class="info-2-2">{{carInfo.plate_time}}年上牌</div>
        </div>
      </div>
      <div class="info-box flex-h">
        <div class="info-1 flex-h">
          <div class="info-1-1">车辆所在地：</div>
          <div class="info-1-2">{{carInfo.province}} {{carInfo.city}}</div>
        </div>
        <div class="info-2 flex-h">
          <div class="info-2-1">过户次数：</div>
          <div class="info-2-2">{{carInfo.count}}</div>
        </div>
      </div>
      <div class="info-box flex-h">
        <div class="info-1 flex-h">
          <div class="info-1-1">发动机参数：</div>
          <div class="info-1-2">{{carInfo.motor}}</div>
        </div>
      </div>
    </div>
    <div class="detail" v-html="carInfo.content">
      <!-- <img src="../../assets/images/temp-car.png" alt class="detail-img"> -->
    </div>
    <div class="buy">
      <div class="buy-box flex-h">
        <div class="contact flex-h" @click.stop="waiter">
          <img src="../../assets/images/kefu.png" alt class="contact-img">
          <div class="contact-txt">客服</div>
        </div>
        <div class="exchange flex-h flex-cc" @click.stop="makeCall">立即联系</div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  name: 'SecondCarDetail',
  data() {
    return {
      swiperOption1: {
        direction: 'horizontal',
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        autoplay: {
          disableOnInteraction: false,
          delay: 2500
        },
        preventLinksPropagation: false,
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction'
        }
      },
      carInfo: {}
    }
  },
  computed: {
    ...mapState({
      token: state => state.datas.token,
    })
  },
  created() {
    this.getCarDetail()
  },
  methods: {
    // ...mapActions(["saveToken"]),
    inputBlur() {
      window.scrollTo(0, 0)
    },
    swiperChange(e) {
      console.log('swiperChange--', e)
    },
    async getCarDetail() {
      console.log('this.$router.query----', this.$route.query)
      let token = await this.native.getToken({})
      let detail = await this.api.secondCarDetail({ token: token.token, used_car_id: this.$route.query.productid })
      detail.data.content = decodeURIComponent(detail.data.content)
      this.carInfo = detail.data
    },
    topBack() {
      // this.native.back_btn({})
      this.$router.back(-1)
    },
    async makeCall() {
      this.native.makeCall({ mobile: this.carInfo.mobile })
    },
    waiter() {
      (function (m, ei, q, i, a, j, s) {
        m[i] = m[i] || function () {
          (m[i].a = m[i].a || []).push(arguments)
        };
        j = ei.createElement(q),
          s = ei.getElementsByTagName(q)[0];
        j.async = true;
        j.charset = 'UTF-8';
        j.src = 'https://static.meiqia.com/dist/meiqia.js?_=t';
        s.parentNode.insertBefore(j, s);
      })(window, document, 'script', '_MEIQIA');
      window._MEIQIA('entId', 147235);
    }
  }
}
</script>

<style lang='less' scoped>
.SecondCarDetail {
  padding-bottom: 200px;
  padding-top: 85px;
  .top {
    height: 85px;
    border-bottom: 1px solid #e6e6e6; /*no*/
    background: #ffffff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    width: 100%;
    .top-back {
      width: 25px;
      height: 45px;
      position: absolute;
      top: 50%;
      left: 30px;
      transform: translateY(-50%);
    }
    .top-txt {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 36px;
      color: #000000;
    }
  }
  .banner {
    width: 100%;
    height: 750px;
    position: relative;
    .banner-swiper {
      width: 100%;
      height: 100%;
      .banner-swiper-item {
        width: 100%;
        height: 100%;
        .banner-swiper-img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .swiper-pagination {
      width: 60px;
      height: 32px;
      line-height: 32px;
      position: absolute;
      bottom: 30px;
      right: 30px;
      left: auto;
      background: rgba(0, 0, 0, 0.7);
      color: #ffffff;
      border-radius: 16px;
      padding: 0 10px;
      font-size: 15px;
      // transform: translateX(-50%);
    }
  }
  .p-right {
    width: 100%;
    box-sizing: border-box;
    padding: 0 30px;
    justify-content: space-between;
    margin-top: 30px;
    .p-top {
      .p-title {
        font-size: 32px;
        font-weight: bold;
        color: #333333;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .p-des {
        font-size: 24px;
        color: #999999;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        overflow: hidden;
        margin-top: 10px;
      }
    }
    .p-bottom {
      .p-mark {
        border: 1px solid #4ccdfa; /*no*/
        margin-right: 10px;
        font-size: 20px;
        color: #4ccdfa;
        align-items: center;
        padding: 0 10px;
        border-radius: 16px;
        margin-top: 30px;
        margin-bottom: 30px;
      }
    }
    .p-line {
      border: 1px solid #e5e5e5; /*no*/
    }
  }
  .info {
    width: 100%;
    box-sizing: border-box;
    padding: 30px;
    .info-box {
      .info-1 {
        min-width: 370px;
        // height: 55px;
        // line-height: 55px;
        font-size: 28px;

        .info-1-1 {
          // min-width: 90px;
          color: #b6b6b6;
        }
        .info-1-2 {
          max-width: 180px;
          color: black;
        }
      }
      .info-2 {
        flex-grow: 1;
        height: 55px;
        line-height: 55px;
        font-size: 28px;
        .info-2-1 {
          color: #b6b6b6;
        }
        .info-2-2 {
          color: black;
        }
      }
    }
  }
  .buy {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 110px;
    border-top: 1px solid #e5e5e5; /*no*/
    background: #ffffff;
    .buy-box {
      width: 100%;
      height: 100%;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0 30px;
      align-items: center;
      .contact {
        .contact-img {
          width: 48px;
          height: 38px;
          margin-right: 15px;
        }
        .contact-txt {
          font-size: 22px;
          color: #999999;
        }
      }
      .exchange {
        width: 380px;
        height: 70px;
        background: #4ccdfa;
        font-size: 28px;
        color: white;
        border-radius: 35px;
      }
    }
  }
  .detail {
    width: 100%;
    box-sizing: border-box;
    padding: 30px;
    background: #ffffff;
    .detail-img {
      width: 100%;
    }
  }
}
</style>
