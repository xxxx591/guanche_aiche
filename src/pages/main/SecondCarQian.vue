<template>
  <div
    class="SecondCarQian"
    v-bind:style="{height: mobileHeight + 'px'}"
    :class="{'over-hide': isShowSelectedBrandBox || isShowSelectedPriceBox}"
  >
    <div class="top-fixeed">
      <div class="top">
        <img src="../../assets/images/back-arrow.png" @click.stop="topBack" class="top-back">
        <div class="top-txt">二手牵引车</div>
        <img
          src="../../assets/images/publish.png"
          class="publish"
          @click.stop="$router.push({name: 'PublishCar2', query: {type: 2}})"
        >
      </div>
      <div class="select flex-h">
        <div class="s-box" @click.stop="isShowSelectedBrandBox = !isShowSelectedBrandBox">
          <div class="s-box2 flex-h flex-cc">
            <div class="s-txt">{{selectedBrand ? selectedBrand : '品牌'}}</div>
            <img src="../../assets/images/arrow-bottom.png" class="s-icon">
          </div>
        </div>
        <div class="s-box" @click.stop="isShowSelectedPriceBox = !isShowSelectedPriceBox">
          <div class="s-box2 flex-h flex-cc">
            <div class="s-txt">{{selectedPrice ? selectedPrice + '万' : '价格'}}</div>
            <img src="../../assets/images/arrow-bottom.png" class="s-icon">
          </div>
        </div>
      </div>
    </div>
    <div class="product-box">
      <div
        class="product flex-h"
        @click.stop="gotoPage({name: 'SecondCarDetail', query: { productid: item.id }, params: { product: item }, pageUrl: '/index/SecondCarDetail'})"
        v-for="(item, index) in list"
        :key="index"
      >
        <div class="p-left">
          <img :src="item.get_pic && item.get_pic[0].pic" class="p-left-img">
          <div class="p-time">{{item.created_at}}</div>
        </div>
        <div class="p-right flex-v">
          <div class="p-top">
            <div class="p-title">{{item.name}}</div>
            <div class="p-des">{{item.desc}}</div>
          </div>
          <div class="p-bottom flex-h">
            <div class="p-mark flex-h">{{item.colour}}</div>
            <div class="p-mark flex-h">{{item.price}}万</div>
            <div class="p-mark flex-h">{{item.years}}年</div>
            <div class="p-mark flex-h">{{item.load}}吨</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 选择价格弹框 -->
    <!-- @click.stop="isShowSelectedPriceBox = !isShowSelectedPriceBox" -->
    <div
      class="select-box1"
      @mousemove.stop.prevent="tempMove"
      v-show="isShowSelectedPriceBox"
      @click.stop="isShowSelectedPriceBox = !isShowSelectedPriceBox"
    >
      <div class="select-box s-year">
        <div class="select-box-txt">
          <div class="seb-box flex-h flex-cc">
            <div
              class="seb-box-cancel flex-h flex-cc"
              @click.stop="isShowSelectedPriceBox = !isShowSelectedPriceBox"
            >取消</div>
            <div class="seb-box-certain flex-h flex-cc" @click.stop="certainSelectPrice">确定</div>
          </div>
        </div>
        <mt-picker :slots="priceSlots" @change="selectPrice"></mt-picker>
      </div>
    </div>

    <!-- 选择品牌弹框 -->
    <!-- @click.stop="isShowSelectedBrandBox = !isShowSelectedBrandBox" -->
    <div
      class="select-box1"
      @mousemove.stop.prevent="tempMove"
      v-show="isShowSelectedBrandBox"
      @click.stop="isShowSelectedBrandBox = !isShowSelectedBrandBox"
    >
      <div class="select-box s-year">
        <div class="select-box-txt">
          <div class="seb-box flex-h flex-cc">
            <div
              class="seb-box-cancel flex-h flex-cc"
              @click.stop="isShowSelectedBrandBox = !isShowSelectedBrandBox"
            >取消</div>
            <div class="seb-box-certain flex-h flex-cc" @click.stop="certainSelectBrand">确定</div>
          </div>
        </div>
        <mt-picker :slots="yearSlots" @change="SelectBrand"></mt-picker>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  name: 'SecondCarQian',
  data() {
    return {
      list: [],
      brands: [],
      priceSlots: [
        {
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center'
        }
      ],
      yearSlots: [
        {
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center'
        }
      ],
      isShowSelectedPriceBox: false,
      selectedTempPrice: '',
      selectedPrice: 0,
      isShowSelectedBrandBox: false,
      selectedBrand: '',
      selectedTempBrand: '',
    }
  },
  computed: {
    ...mapState({
      token: state => state.datas.token,
      mobileHeight: state => state.datas.mobileHeight,

    })
  },
  created() {
    this.getQianCarList()
    this.getBrands()
    this.createPrice()
  },
  methods: {
    tempMove() { },
    // ...mapActions(["saveToken"]),
    inputBlur() {
      window.scrollTo(0, 0)
    },
    topBack() {
      this.native.back_btn({})
      // this.$router.back(-1)
    },
    gotoPage(obj) {
      if (obj === '') return
      this.$router.push({ name: obj.name, query: obj.query || {}, params: obj.params || {} })
      // 此页面所有路由跳转都要调用此原生通知
      // this.native.routerGoTo({ url: 'http://gczj.sinmore.vip/html/#' + obj.pageUrl })
    },
    async getQianCarList() {
      let token = await this.native.getToken({})
      let list = await this.api.secondHandCarList({ token: token.token, page: 1, pagesize: 10000, type: 2 })
      list.data.data.forEach((item, index) => {
        item.created_at = item.created_at.substr(0, 10)
      })
      this.list = list.data.data
    },
    async getBrands() {
      let list = await this.api.carCategory({ pid: 0 })
      this.brands = list.data

      this.yearSlots[0].values.push('无')
      this.yearSlots[0].values.push()
      for (let i = 0; i < this.brands.length; i++) {
        this.yearSlots[0].values.push(this.brands[i].title)
      }
    },
    certainSelectPrice() {
      if (this.selectedTempPrice === '无') {
        this.selectedTempPrice = ''
      }
      this.selectedPrice = this.selectedTempPrice
      this.isShowSelectedPriceBox = !this.isShowSelectedPriceBox
      this.doSearch()
    },
    async filterSecondCar() {
      //
      let brandId = ''
      this.brands.forEach((item, index) => {
        if (item.title === this.selectedBrand) {
          brandId = item.id
        }
      })
      let list = await this.api.filterSecondCar({ page: 1, pagesize: 1000, price: this.selectedPrice, vehicle_id: brandId, type: 2 })
      list.data.data.forEach((item, index) => {
        item.created_at = item.created_at.substr(0, 10)
      })
      if (list.data.data.length === 0) this.$toast('没有数据!')
      this.list = list.data.data
    },
    selectPrice(e, price) {
      this.selectedTempPrice = price[0]
    },
    certainSelectBrand() {
      if (this.selectedTempBrand === '无') {
        this.selectedTempBrand = ''
      }
      this.selectedBrand = this.selectedTempBrand
      this.isShowSelectedBrandBox = !this.isShowSelectedBrandBox
      this.doSearch()
    },
    SelectBrand(e, year) {
      this.selectedTempBrand = year[0]
    },
    createPrice() {
      let nowPrice = 1
      this.priceSlots[0].values.push('无')
      this.priceSlots[0].values.push(nowPrice)
      for (let i = 0; i < 49; i++) {
        this.priceSlots[0].values.push(++nowPrice)
      }
    },
    doSearch() {
      console.log('搜索--selectedPrice---', this.selectedPrice)
      let tempArr = []
      if (!this.selectedPrice && !this.selectedBrand) {
        this.getQianCarList()
      } else {
        this.filterSecondCar()
      }
    },
  }
}
</script>

<style lang='less' scoped>
.SecondCarQian {
  background: #ffffff;
  min-height: calc(100vh - 3.133333rem);
  // max-height: 100vh;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  padding-top: 200px;
  padding-bottom: 100px;
  box-sizing: border-box;
  .top-fixeed {
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 1;
    .top {
      height: 85px;
      position: relative;
      // border-bottom: 1px solid #e6e6e6; /*no*/
      background: #ffffff;
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
      .publish {
        width: 46px;
        height: 43px;
        position: absolute;
        top: 50%;
        right: 30px;
        transform: translateY(-50%);
      }
    }
    .select {
      width: 100%;
      height: 80px;
      box-sizing: border-box;
      border-bottom: 1px solid #e6e6e6; /*no*/
      justify-content: space-around;
      align-items: center;
      background: #ffffff;
      .s-box {
        .s-box2 {
          .s-txt {
            font-size: 28px;
            color: #333333;
            margin-right: 12px;
          }
          .s-icon {
            width: 18px;
            height: 10px;
          }
        }
      }
    }
  }
  .product-box {
    width: 100%;
    padding: 0 30px;
    box-sizing: border-box;
    .product {
      width: 100%;
      margin-top: 30px;
      .p-left {
        min-width: 200px;
        max-width: 200px;
        height: 200px;
        position: relative;
        overflow: hidden;
        border-radius: 15px;
        .p-left-img {
          width: 100%;
          height: 100%;
        }
        .p-time {
          // width: 120px;
          height: 30px;
          line-height: 30px;
          border-top-left-radius: 10px;
          border-bottom-right-radius: 10px;
          position: absolute;
          top: 0;
          left: 0;
          background: rgba(0, 0, 0, 0.5);
          white-space: nowrap;
          color: #ffffff;
          font-size: 18px;
          padding: 0 15px;
          text-align: center;
        }
      }
      .p-right {
        margin-left: 30px;
        flex-grow: 1;
        justify-content: space-between;
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
          }
        }
      }
    }
  }
  .select-box1 {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
    background: rgba(0, 0, 0, 0.7);
    .select-box {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 160px;
      background: #ffffff;
      box-sizing: border-box;
      padding: 30px;
      .select-box-txt {
        position: absolute;
        top: -70px;
        left: 0;
        width: 100%;
        height: 80px;
        background: #ffffff;
        .seb-box {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          .seb-box-cancel {
            flex-grow: 1;
            font-size: 30px;
          }
          .seb-box-certain {
            flex-grow: 1;
            font-size: 30px;
          }
        }
      }
    }
    .s-year {
      height: 400px;
    }
  }
}
</style>
