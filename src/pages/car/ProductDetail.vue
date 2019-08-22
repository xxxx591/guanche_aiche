<template>
  <div class="ProductDetail">
    <div class="top">
      <img src="../../assets/images/back-arrow.png" @click.stop="topBack" class="top-back" />
      <div class="top-txt">商品详情</div>
    </div>
    <div class="banner">
      <van-swipe indicator-color="white">
        <van-swipe-item>
          <img :src="carInfo.cover" alt srcset />
        </van-swipe-item>
      </van-swipe>
      <!-- <div class="swiper-pagination"></div> -->
    </div>
    <div class="info">
      <div class="title">{{carInfo.name}}</div>
      <div class="des">{{carInfo.desc}}</div>
      <div class="price-box flex-h">
        <div class="price">预计费用：{{carInfo.price_range}}</div>
        <!-- <div class="price-txt">万</div> -->
      </div>
    </div>

    <div class="detail">
      <van-tabs v-model="active">
        <van-tab title="车辆概述">
          <div class="hot">
            <p class="msg">保养要求</p>
            <ul>
              <li v-for="(item,index) in carInfo.aegis_claim" :key="index">
                <div>
                  <i class="suggest-left"></i>
                  <div class="suggest-right">
                    <p class="suggest-title">{{item.name}}</p>
                    <p class="suggest-message">{{item.content}}</p>
                    <p class="suggest-message">预计费用：￥{{item.price}}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </van-tab>
        <van-tab title="车辆图组">
          <div class="hot pic-view" v-for="(picObj,index) in carInfo.pic_name" :key="index">
            <p class="msg">{{picObj.title}}</p>
            <ul class="pic-list">
              <li v-for="(picItem,index) in picObj.pic" :key="index">
                <img :src="picItem.pic" alt srcset @click="showImg(picObj.pic,index)" />
              </li>
            </ul>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="buy">
      <div class="buy-box flex-h">
        <!-- @click.stop="waiter"   加在下面-->
        <div class="contact flex-h" @click.stop="waiter">
          <img src="../../assets/images/kefu.png" alt class="contact-img" />
          <div class="contact-txt">客服</div>
        </div>
        <div class="contact flex-h" @click.stop="shoucang">
          <img
            src="../../assets/images/shoucang.png"
            alt
            class="contact-img-1"
            v-if="productInfo.is_collect==0"
          />
          <img
            src="../../assets/images/shoucang-on.png"
            alt
            class="contact-img-1"
            v-if="productInfo.is_collect==1"
          />
          <div class="contact-txt">{{shoucangtitle}}</div>
        </div>
        <div class="exchange flex-h flex-cc" @click.stop="nowExchange">立即订购</div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";
import { ImagePreview } from "vant";

export default {
  name: "ProductDetail",
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name === "PointsMall") {
        let product = vm.$route.params.product;
        vm.getProductDetail(product.id);
        vm.getUserInfo();
      }
    });
  },
  data() {
    return {
      swiperOption1: {
        loop: true,
        direction: "horizontal",
        slidesPerView: 1,
        spaceBetween: 0,
        autoplay: {
          disableOnInteraction: false,
          delay: 2500
        },
        preventLinksPropagation: false,
        pagination: {
          // el: '.swiper-pagination',
        }
      },
      buyNum: 1,
      productInfo: {},
      carInfo: {},
      userInfo: {},
      active: 0,
      showImgFlag: false,
      shoucangtitle:'收藏'
    };
  },
  components: {
    ImagePreview
  },
  computed: {},
  mounted() {
    console.log(this.$route.query)
    let product = this.$route.params.product;
    let productid = this.$route.query.id;
    this.$store.state.token = this.$route.query.token
    console.log("this.$store.state.token", this.$store.state.token);
    this.getProductDetail(productid);
    this.getUserInfo();
  },
  methods: {
    // ...mapActions(["saveToken"]),
    inputBlur() {
      window.scrollTo(0, 0);
    },
    subNum() {
      if (this.buyNum === 1) return;
      this.buyNum--;
    },
    addNum() {
      if (this.buyNum === 99) return;
      this.buyNum++;
    },
    async getProductDetail(id) {
      this.buyNum = 1;

      let data = await this.api.getCarDetail({
        trailer_id: id,
        token: this.$store.state.token
      });
      this.productInfo = data;
      this.productInfo.is_collect ==0 ? this.shoucangtitle='收藏':this.shoucangtitle='已收藏'
      this.init(data);
      this.getCarInfo(id);
    },
    init(obj) {
      this.$store.state.priceObj = obj;
      console.log(this.$store.state.priceObj);
    },
    async getCarInfo(id) {
      this.buyNum = 1;

      let data = await this.api.getCarInfo({
        trailer_id: id,
        token: this.$store.state.token
      });
      console.log("carinfo----", data);
      this.carInfo = data;
      this.$store.state.carInfo = data;
    },
    topBack() {
      if (this.showImgFlag) {
        // this.showImgFlag = false;
        // this.instance.close();
        return;
      } else if(this.$route.query.type==1){
        this.native.back_btn({});
      }else {
        this.$router.back(-1);
      }
    },
    nowExchange() {
      this.$router.push({
        name: "SetCar"
      });
      // buyNum: 1,
      // productInfo: {}
    },
    async getUserInfo() {
      let info = await this.api.userDetail({ token: this.$store.state.token });
      this.userInfo = info.data;
      console.log("this.userInfo--", this.userInfo);
    },
    waiter() {
      (function(m, ei, q, i, a, j, s) {
        m[i] =
          m[i] ||
          function() {
            (m[i].a = m[i].a || []).push(arguments);
          };
        (j = ei.createElement(q)), (s = ei.getElementsByTagName(q)[0]);
        j.async = true;
        j.charset = "UTF-8";
        j.src = "https://static.meiqia.com/dist/meiqia.js?_=t";
        s.parentNode.insertBefore(j, s);
      })(window, document, "script", "_MEIQIA");
      window._MEIQIA("entId", 147235);
      // let btn = document.getElementById('MEIQIA-BTN-HOLDER')
      // btn.click()
      // _MEIQIA('manualInit');
    },
    async shoucang() {
      console.log("收藏");
      let params = {
        token: this.$store.state.token,
        trailer_id: this.productInfo.id
      };
      let data = await this.api.carCollect(params);
      console.log("data,", data);
      data.is_collect ==0 ? this.shoucangtitle='收藏':this.shoucangtitle='已收藏'
      this.productInfo.is_collect = data.is_collect
    },
    showImg(arr, id) {
      let self = this;
      this.showImgFlag = true;
      console.log(arr);
      let picarr = [];
      arr.forEach(item => {
        picarr.push(item.pic);
      });
      ImagePreview({
        images: picarr,
        startPosition: id,
        onClose() {
          self.showImgFlag = false;
        }
      });
    }
  }
};
</script>

<style lang='less' scoped>
.ProductDetail {
  background: #f6f7f9;
  // margin-bottom: 1.6rem /* 120/75 */;
  padding-top: 1.133333rem /* 85/75 */;
  padding-bottom: 1.433333rem;
  .top {
    height: 1.133333rem /* 85/75 */;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 2;
    background: #ffffff;
    border-bottom: 0.026667rem /* 2/75 */ solid #e6e6e6;
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
  .banner {
    width: 100%;
    height: 10rem /* 750/75 */;
    position: relative;
    .van-swipe {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
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
      position: absolute;
      bottom: 0.266667rem /* 20/75 */;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .info {
    background: #ffffff;
    margin-bottom: 0.466667rem /* 35/75 */;
    padding-bottom: 0.266667rem /* 20/75 */;
    .title {
      font-size: 0.533333rem /* 40/75 */;
      line-height: 0.8rem /* 60/75 */;
      color: #333333;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      text-overflow: ellipsis;
      overflow: hidden;
      font-weight: bold;
      padding: 0 0.4rem /* 30/75 */;
      padding-top: 0.4rem /* 30/75 */;
      padding-bottom: 0.133333rem /* 10/75 */;
      // box-sizing: border-box;
    }
    .des {
      font-size: 0.373333rem /* 28/75 */;
      color: #999999;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
      overflow: hidden;
      font-weight: bold;
      // margin-top: .4rem /* 30/75 */;
      margin-bottom: 0.266667rem /* 20/75 */;
      box-sizing: border-box;
      padding: 0 0.4rem /* 30/75 */;
    }
    .price-box {
      height: 0.4rem /* 30/75 */;
      box-sizing: border-box;
      padding: 0 0.4rem /* 30/75 */;
      align-items: flex-end;
      .price {
        font-size: 0.4rem /* 30/75 */;
        line-height: 0.4rem /* 30/75 */;
        color: #ff5d25;
        font-weight: bold;
      }
      .price-txt {
        font-size: 0.4rem /* 20/75 */;
        line-height: 0.4rem /* 20/75 */;
        color: #ff5d25;
        font-weight: bold;
      }
    }
  }
  .car {
    width: 100%;
    height: 1.333333rem /* 100/75 */;
    background: #ffffff;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 0.4rem /* 30/75 */;
    margin-bottom: 0.266667rem /* 20/75 */;
    .car-txt {
      font-size: 0.426667rem /* 32/75 */;
      color: #333333;
    }
    .car-box {
      .car-sub {
        width: 0.933333rem /* 70/75 */;
        height: 0.933333rem /* 70/75 */;
        border-top-left-radius: 0.466667rem /* 35/75 */;
        border-bottom-left-radius: 0.466667rem /* 35/75 */;
        border: 0.013333rem /* 1/75 */ solid #e5e5e5; /*no*/
        font-size: 0.533333rem /* 40/75 */;
        font-weight: bold;
      }
      .car-num {
        width: 0.933333rem /* 70/75 */;
        height: 0.933333rem /* 70/75 */;
        border-top: 0.013333rem /* 1/75 */ solid #e5e5e5; /*no*/
        border-bottom: 0.013333rem /* 1/75 */ solid #e5e5e5; /*no*/
        font-size: 0.48rem /* 36/75 */;
        font-weight: bold;
      }
      .car-add {
        width: 0.933333rem /* 70/75 */;
        height: 0.933333rem /* 70/75 */;
        border-top-right-radius: 0.466667rem /* 35/75 */;
        border-bottom-right-radius: 0.466667rem /* 35/75 */;
        border: 0.013333rem /* 1/75 */ solid #e5e5e5; /*no*/
        font-size: 0.533333rem /* 40/75 */;
        font-weight: bold;
      }
    }
  }
  .detail {
    box-sizing: border-box;
    padding: 0.4rem /* 30/75 */;
    background: #ffffff;
    overflow: hidden;
    .detail-img {
      width: 100%;
    }
    .hot {
      padding: 0 0.5rem;
      .msg {
        // width: 1.693333rem /* 127/75 */;
        // height: .4rem /* 30/75 */;
        font-size: 0.426667rem /* 32/75 */;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        padding: 0.533333rem /* 40/75 */ 0;
      }
      ul {
        li {
          position: relative;
          margin-bottom: 0.586667rem /* 44/75 */;
          .suggest-left {
            position: absolute;
            width: 0.282667rem /* 21.2/75 */;
            height: 0.282667rem /* 21.2/75 */;
            background: #4ccdfa;
            transform: rotate(45deg);
            top: 0.066667rem /* 5/75 */;
            left: 0;
            &::after {
              content: "";
              background: #fff000;
              position: absolute;
              width: 0.106667rem /* 14/75 */;
              height: 0.106667rem /* 14/75 */;
              border-radius: 50%;
              top: 50%;
              left: 50%;
              margin-top: -0.053rem;
              margin-left: -0.053rem;
            }
          }
          .suggest-right {
            padding-left: 0.826667rem; /* 62/75 */
            .suggest-title {
              font-size: 0.373333rem /* 28/75 */;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
            }
            .suggest-message {
              font-size: 0.32rem /* 24/75 */;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
              line-height: 0.48rem /* 36/75 */;
              padding-top: 0.24rem /* 18/75 */;
            }
          }
        }
      }
    }
    .pic-view {
      .pic-list {
        display: flex;
        flex-wrap: wrap;
        li {
          width: 48.2%;
          padding-right: 0.293333rem /* 22/75 */;
          margin-bottom: 0.266667rem /* 20/75 */;
          &:nth-of-type(even) {
            padding-right: 0;
          }
        }
      }
    }
  }
  .buy {
    position: fixed;
    bottom: 0rem /* 0/75 */;
    left: 0rem /* 0/75 */;
    width: 100%;
    height: 1.466667rem /* 110/75 */;
    border-top: 0.013333rem /* 1/75 */ solid #e5e5e5; /*no*/
    background: #ffffff;
    .buy-box {
      width: 100%;
      height: 100%;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0 0.4rem /* 30/75 */;
      align-items: center;
      .contact {
        .contact-img {
          width: 0.64rem /* 48/75 */;
          height: 0.506667rem /* 38/75 */;
          margin-right: 0.2rem /* 15/75 */;
        }
        .contact-img-1 {
          width: 0.64rem /* 48/75 */;
          height: 0.64rem /* 38/75 */;
          margin-right: 0.2rem /* 15/75 */;
        }
        .contact-txt {
          font-size: 0.293333rem /* 22/75 */;
          color: #999999;
        }
      }
      .exchange {
        width: 5.066667rem /* 380/75 */;
        height: 0.933333rem /* 70/75 */;
        background: #4ccdfa;
        font-size: 0.373333rem /* 28/75 */;
        color: white;
        border-radius: 0.466667rem /* 35/75 */;
      }
    }
  }
  .van-tabs__line {
    background-color: #4ccdfa !important;
  }
}
</style>
