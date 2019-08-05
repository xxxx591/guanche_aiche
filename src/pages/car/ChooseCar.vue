<template>
  <div class="ChooseCar">
    <div class="top">
      <img src="../../assets/images/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">选择车型</div>
    </div>
    <div class="box" v-for="(item, index) in list" @click.stop="selectBrand(item)" :key="index">
      <img :src="item.cover" alt class="box-car">
      <div class="box-txt">{{item.title}}</div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";
 
export default {
  // 选配车辆
  name: "ChooseCar",
  data() {
    return {
      list: []
    };
  },
  computed: {
    ...mapState({
      // token: state => state.datas.token,
    })
  },
  async created() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
    if (isAndroid) {
      this.$store.state.token = this.$route.query.token;
      this.getSecondHandCarList();
      this.$store.state.buyCarType = this.$route.query.type;
    } else {
      this.$store.state.token = await this.native.getToken({});
      this.getSecondHandCarList();
      this.$store.state.buyCarType = this.$route.query.type;
    }
  },
  methods: {
    topBack() {
      this.native.back_btn({});
      this.$router.back(-1);
    },
    // ...mapActions(["setTab"]),
    inputBlur() {
      window.scrollTo(0, 0);
    },
    async getSecondHandCarList() {
      let list = await this.api.carCategory({ pid: 0 });
      this.list = list;
      console.log("list---", list);
    },
    selectBrand(car) {
      this.$router.push({ name: "ChooseBrand", query: { id: car.id ,token:this.$route.query.token} });
    }
  }
};
</script>

<style lang='less' scoped>
.ChooseCar {
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
    width: 9.2rem;
    height: 3.6rem;
    box-sizing: border-box;
    margin: 0 auto;
    position: relative;
    border-radius: 0.1333333333rem;
    overflow: hidden;
    margin-top: 0.4rem;
    margin-bottom: 0.4rem;
    .box-car {
      width: 100%;
      height: 100%;
    }
    .box-txt {
      width: 100%;
      height: 100%;
      line-height: 3.466666667rem;
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 20px;
      color: white;
      font-weight: bold;
      background: rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
