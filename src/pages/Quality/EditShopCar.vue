<template>
  <div class="EditShopCar">
    <div class="top">
      <img src="../../assets/images/back-arrow.png" @click.stop="topBack" class="top-back">
      <!-- <div class="top-collect">保存</div> -->
      <div class="top-txt">购物车</div>
    </div>
    <div class="box flex-h" v-for="(item, index) in shopCarList">
      <div class="b-select">
        <img
          src="../../assets/images/shop-selected2.png"
          v-show="item.goods.editModelSelected"
          @click.stop="editModelSelectedShopCar({product: item, isSelected: false})"
          class="b-selected2"
        >
        <img
          src="../../assets/images/shop-selected.png"
          v-show="item.goods.editModelSelected"
          @click.stop="editModelSelectedShopCar({product: item, isSelected: false})"
          class="b-selected"
        >
        <img
          src="../../assets/images/shop-unselected.png"
          v-show="item.goods.editModelSelected === false"
          @click.stop="editModelSelectedShopCar({product: item, isSelected: true})"
          class="b-unselected"
        >
      </div>
      <div class="b-product flex-h">
        <div class="b-left">
          <img :src="item.goods.cover" class="b-left-img">
        </div>
        <div class="b-right flex-v">
          <div class="b-title">{{item.goods.title}}</div>
          <div class="b-bottom flex-h">
            <div class="b-price">￥{{item.goods.price}}</div>
            <div class="b-btns">
              <!-- <div class="car flex-h">
                <div class="car-box flex-h">
                  <div class="car-sub flex-h flex-cc" @click.stop="subNum">-</div>
                  <div class="car-num flex-h flex-cc">2</div>
                  <div class="car-add flex-h flex-cc" @click.stop="addNum">+</div>
                </div>
              </div>-->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="foot flex-h">
      <div class="f-left flex-h" @click.stop="toggleEditModelIsSelectedAll">
        <div class="f-left-select">
          <img
            src="../../assets/images/shop-selected2.png"
            v-show="editModel_isSelectedAll"
            class="b-selected2"
          >
          <img
            src="../../assets/images/shop-selected.png"
            v-show="editModel_isSelectedAll"
            class="b-selected"
          >
          <img
            src="../../assets/images/shop-unselected.png"
            v-show="editModel_isSelectedAll === false"
            class="b-unselected"
          >
        </div>
        <div class="f-left-txt">全选</div>
      </div>
      <div class="f-right flex-h">
        <!-- <div class="f-price">
          <div class="b-left flex-h">
            <div class="b-txt flex-h">合计:</div>
            <div class="b-txt-price flex-h">¥389</div>
          </div>
        </div>-->
        <!-- <div class="f-btn2 flex-h flex-cc">移入收藏</div> -->
        <div class="f-btn flex-h flex-cc" @click.stop="doDelete">删除</div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: 'EditShopCar',
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      // token: state => state.datas.token,
      shopCarList: state => state.shopCar.shopCarList,
    }),
    ...mapGetters(['editModel_isSelectedAll'])
  },
  methods: {
    ...mapActions(['editModelSelectedShopCar', 'toggleEditModelIsSelectedAll', ]),
    inputBlur() {
      window.scrollTo(0, 0)
    },
    topBack() {
      // this.native.back_btn({})
      this.$router.back(-1)
    },
    async doDelete() {
      let token = await this.native
      this.deleteShopCarProduct({
        token:token,
      })
      
    }
  }
}
</script>

<style lang='less' scoped>
.EditShopCar {
  min-width: 100vw;
  min-height: calc(100vh - 3.133333rem);
  background: #f7f8fa;
  padding-bottom: 200px;
  padding-top: 85px;
  .top {
    height: 85px;
    position: fixed;
    top: 0;
    width: 100%;
    background: #ffffff;
    border-bottom: 2px solid #e6e6e6;
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
    .top-collect {
      // width: 44px;
      // height: 44px;
      position: absolute;
      top: 50%;
      right: 30px;
      transform: translateY(-50%);
      font-size: 28px;
      color: #4ccdfa;
    }
  }
  .box {
    width: 100%;
    box-sizing: border-box;
    padding: 30px 0;
    padding-left: 30px;
    align-items: center;
    background: #ffffff;
    .b-select {
      min-width: 40px;
      max-width: 40px;
      height: 40px;
      position: relative;
      top: -15px;
      .b-selected {
        width: 40px;
        height: 40px;
        position: absolute;
        top: 0;
        left: 0;
      }
      .b-selected2 {
        width: 25px;
        height: 20px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
      }
      .b-unselected {
        width: 40px;
        height: 40px;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    .b-product {
      margin-left: 30px;
      border-bottom: 1px solid #e6e6e6; /*no*/
      padding-bottom: 30px;
      .b-left {
        min-width: 200px;
        max-width: 200px;
        height: 200px;
        border-radius: 10px;
        overflow: hidden;
        .b-left-img {
          width: 100%;
          height: 100%;
        }
      }
      .b-right {
        margin-left: 30px;
        justify-content: space-between;
        width: 100%;
        padding-right: 30px;
        padding-top: 10px;
        .b-title {
          font-size: 28px;
          color: #333333;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          text-overflow: ellipsis;
          overflow: hidden;
          min-width: 380px;
        }
        .b-bottom {
          justify-content: space-between;
          align-items: center;
          .b-price {
            font-size: 32px;
            color: #ff5d25;
            font-weight: bold;
          }
          .b-btns {
            height: 60px;
            .car {
              width: 100%;
              height: 60px;
              background: #ffffff;
              align-items: center;
              justify-content: space-between;
              box-sizing: border-box;
              padding: 0 30px;
              margin-bottom: 20px;
              .car-txt {
                font-size: 32px;
                color: #333333;
              }
              .car-box {
                .car-sub {
                  width: 70px;
                  height: 60px;
                  border-top-left-radius: 30px;
                  border-bottom-left-radius: 30px;
                  border: 1px solid #e5e5e5; /*no*/
                  font-size: 40px;
                  font-weight: bold;
                }
                .car-num {
                  width: 70px;
                  height: 60px;
                  border-top: 1px solid #e5e5e5; /*no*/
                  border-bottom: 1px solid #e5e5e5; /*no*/
                  font-size: 36px;
                  font-weight: bold;
                }
                .car-add {
                  width: 70px;
                  height: 60px;
                  border-top-right-radius: 30px;
                  border-bottom-right-radius: 30px;
                  border: 1px solid #e5e5e5; /*no*/
                  font-size: 40px;
                  font-weight: bold;
                }
              }
            }
          }
        }
      }
    }
  }
  .foot {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 110px;
    background: #ffffff;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 30px;
    z-index: 9;
    .f-left {
      align-items: center;
      .f-left-select {
        min-width: 40px;
        max-width: 40px;
        height: 40px;
        position: relative;
        .b-selected {
          width: 40px;
          height: 40px;
          position: absolute;
          top: 0;
          left: 0;
        }
        .b-selected2 {
          width: 25px;
          height: 20px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
        }
        .b-unselected {
          width: 40px;
          height: 40px;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
      .f-left-txt {
        font-size: 28px;
        color: #999999;
        margin-left: 20px;
      }
    }
    .f-right {
      align-items: center;
      .f-price {
        .b-left {
          .b-txt {
            height: 30px;
            font-size: 20px;
            line-height: 20px;
            align-items: flex-end;
          }
          .b-txt-price {
            font-size: 30px;
            height: 30px;
            line-height: 25px;
            align-items: flex-end;
            color: #ff5d25;
            font-weight: bold;
          }
          .b-txt-txt {
            height: 30px;
            font-size: 15px;
            line-height: 15px;
            align-items: flex-end;
            color: #ff5d25;
          }
        }
      }
      .f-btn {
        margin-left: 30px;
        width: 190px;
        height: 70px;
        background: #4ccdfa;
        color: #ffffff;
        border-radius: 35px;
        font-size: 35px;
      }
      .f-btn2 {
        margin-left: 30px;
        width: 190px;
        height: 70px;
        background: #ffffff;
        color: #4ccdfa;
        border-radius: 35px;
        font-size: 35px;
        border: 1px solid #4ccdfa; /*no*/
        box-sizing: border-box;
      }
    }
  }
}
</style>
