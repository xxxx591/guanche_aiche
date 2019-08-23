<template>
  <div class="ChooseBrand">
    <div class="top">
      <img src="../../assets/images/back-arrow.png" @click.stop="topBack" class="top-back" />
      <div class="top-txt">{{msg}}</div>
    </div>
    <div class="box flex-h">
      <div class="box-category" ref="category">
        <div class="content-box">
          <div
            class="box-item flex-h flex-cc"
            :class="{'box-item-active': currentBrand2.id == item.id}"
            v-for="(item, index) in brand2List"
            @touchstart="selectBrand2(item)"
            :key="index"
          >{{item.title}}</div>
        </div>
      </div>
      <div class="box-product flex-h">
        <div
          class="box-pro"
          v-for="(item,index) in productList"
          @click.stop="$router.push({name: 'ProductDetail', query: {id: item.id,token:$store.state.token}})"
          :key="index"
        >
          <div class="b-top">
            <img :src="item.cover" class="b-top-img" />
          </div>
          <div class="b-title">{{item.name}}</div>
          <div class="b-price">{{item.price_range}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";
// import common from "../../service/commin";
// common.connectWebViewJavascriptBridge(function(bridge) {
//   bridge.registerHandler("afterPlayVideo", function(data, responseCallback) {
//     window.afterPlayVideo(data, responseCallback);
//   });
// });
let BScroll = require("../../js/bscroll/bscroll.js");
export default {
  // 选择品牌
  name: "ChooseBrand",
  data() {
    return {
      msg: "选择品牌",
      brand2List: [],
      currentBrand2: {},
      productList: [],
      scroll: ""
    };
  },
  computed: {},
  async created() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
    if (isAndroid) {
      console.log("this", window.location.href);
      this.$store.state.token = await this.$route.query.token;
      this.getBrand2(this.$route.query.id);
      console.log("query---", this.$route.query.token);
    } else {
      this.$store.state.token = await this.native.getToken({});
      this.$store.state.token = this.$store.state.token.token;
      this.getBrand2(this.$route.query.id);
      console.log("query---", this.$store.state.token);
    }
  },
  methods: {
    // ...mapActions(["setTab"]),
    inputBlur() {
      window.scrollTo(0, 0);
    },
    topBack() {
      if (this.$route.query.type == 1) {
        this.native.back_btn({});
        this.$router.back(-1);
      } else {
        this.$router.back(-1);
      }
    },
    async getBrand2(id) {
      this.javascriptBridge(bridge => {
        bridge.callHandler("getToken", "{}", function(res) {
          console.log("res,123123123", res);
        });
      });
      let list = await this.api.carCategory({ pid: id });
      console.log("carCategory---", list);
      this.brand2List = list;
      this.brand2List.push({
        title:'  ',
        id:'123',
        pid:'123456'
      })
      this.currentBrand2 = list[0];
      this.getBrandProduct(list[0].id);
    },
    async getBrandProduct(id) {
      console.log(this.$store.state);

      let list = await this.api.getBrandProducts({
        token: this.$store.state.token,
        page: 1,
        pagesize: 10000,
        vehicle_id: id
      });
      this.productList = list.data;
      console.log("getBrandProduct---", list.data);
    },
    selectBrand2(item) {
      console.log('123');
      this.currentBrand2 = item;
      this.getBrandProduct(item.id);
    },

  },
  mounted() {
    console.log("BScroll", BScroll.BScroll);
    this.$nextTick(_ => {
      let wrapper = this.$refs.category;
      console.log('wrapper',wrapper);
      this.scroll = new BScroll.BScroll(wrapper);
    });
  }
};
</script>

<style lang='less' scoped>
.ChooseBrand {
  position: absolute;
  top: 1.13333333rem;
  width: 100%;
  .top {
    padding: 0 0.4rem;
    height: 1.133333333rem;
    position: relative;
    border-bottom: 1px solid #e6e6e6; /*no*/
    background: #ffffff;
    .top-txt {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 18px;
      color: #000000;
    }
    .top-back {
      width: 0.32rem;
      position: absolute;
      top: 50%;
      margin-top: -0.3rem;
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
      font-size: 14px;
    }
  }
  .box {
    width: 100%;
    // height: calc(100vh - 42px);
    box-sizing: border-box;
    .box-category {
      min-width: 3.2rem;
      max-width: 3.2rem;
      height: 100%;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      background: #f7f8fa;
      position: fixed;
      z-index: 999;
      top: 1.3rem;
      padding-bottom: 4rem;
      .box-item {
        width: 100%;
        height: 1.466666667rem;
        background: #f7f8fa;
        font-size: 14px;
        color: #666666;
      }
      .box-item-active {
        background: #ffffff;
        color: #4ccdfa;
      }
    }
    .box-product {
      flex-grow: 1;
      box-sizing: border-box;
      height: 100%;
      padding: 0.4rem;
      flex-wrap: wrap;
      padding-left: 3.5rem;
      .box-pro {
        width: 2.8rem;
        margin-bottom: 0.4rem;
        .b-top {
          width: 2.8rem;
          height: 2.8rem;
          border: 1px solid #e6e6e6; /*no*/
          border-radius: 0.1333333333rem;
          .b-top-img {
            width: 100%;
            height: 100%;
          }
        }
        .b-title {
          font-size: 12px;
          color: #333333;
          margin-top: 0.2666666667rem;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .b-price {
          font-size: 12px;
          color: #ff5d25;
          font-weight: bold;
          margin-top: 0.1333333333rem;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
      .box-pro:nth-child(2n) {
        margin-left: 0.2666666667rem;
      }
    }
  }
}
</style>
