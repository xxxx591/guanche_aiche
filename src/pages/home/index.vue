<template>
  <div class="main">
    <div class="header">
      <van-swipe class="swiper">
        <van-swipe-item>1</van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
      </van-swipe>
    </div>
    <div class="car-list">
      <ul>
        <li v-for="(item,index) in carList" :key="index">
          <p>
            <img :src="item.url" alt>
          </p>
          <p>{{item.title}}</p>
        </li>
      </ul>
    </div>
    <div class="mall-entrance">
      <img src="@/assets/images/mall-entrance.png" alt>
    </div>
    <div class="user-center">
      <ul>
        <li v-for="(item,index) in carList" :key="index">
          <p>啊啊啊啊</p>
        </li>
      </ul>
    </div>
    <div class="hot">
      <p class="msg">圈子热点</p>
      <van-swipe class="swiper">
        <van-swipe-item class="pic">
          <p>测试文字</p>
        </van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <div class="custom-indicator" slot="indicator">
          <i>
            <img src="../../assets/images/check.png" alt srcset>
          </i>
          <i>
            <img src="../../assets/images/check-on.png" alt srcset>
          </i>
          <i>
            <img src="../../assets/images/check.png" alt srcset>
          </i>
        </div>
      </van-swipe>
    </div>
    <div class="hot tuijian">
      <p class="msg">推荐商品</p>
      <ul class="list">
        <li>
          <div>
            <img src alt>
            <p class="title"></p>
            <p class="pic"></p>
          </div>
        </li>
        <li>
          <div>
            <img src alt>
            <p class="title"></p>
            <p class="pic"></p>
          </div>
        </li>
        <li>
          <div>
            <img src alt>
            <p class="title"></p>
            <p class="pic"></p>
          </div>
        </li>
        <li>
          <div>
            <img src alt>
            <p class="title"></p>
            <p class="pic"></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "msg",
      carList: [
        {
          index: "1",
          url: require("../../assets/images/index-icon1.png"),
          title: "定制挂车"
        },
        {
          index: "2",
          url: require("../../assets/images/index-icon2.png"),
          title: "牵引车"
        },
        {
          index: "3",
          url: require("../../assets/images/index-icon3.png"),
          title: "挂车配件"
        },
        {
          index: "4",
          url: require("../../assets/images/index-icon4.png"),
          title: "二手牵引车"
        },
        {
          index: "5",
          url: require("../../assets/images/index-icon5.png"),
          title: "二手挂车"
        },
        {
          index: "6",
          url: require("../../assets/images/index-icon6.png"),
          title: "司机招聘"
        }
      ]
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.main {
  .header {
    .swiper {
      height: 5rem;
      background: #666;
    }
    .custom-indicator {
    }
  }
  .car-list {
    width: 100%;
    padding: 0.5rem 1rem;
    text-align: center;
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        &:nth-child(2) {
          padding: 0 1rem;
        }
        &:nth-child(5) {
          padding: 0 1rem;
        }
        p {
          font-size: 14px;
          color: rgba(51, 51, 51, 1);
          img {
            width: 2rem;
            height: 2rem;
            display: inline-block;
          }
        }
      }
    }
  }
  .mall-entrance {
    padding: 0 0.5rem;
    img {
      width: 100%;
    }
  }
  .user-center {
    padding: 1rem 0.5rem;
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        position: relative;
        width: 4.375rem;
        height: 2rem;
        background: #666;
        &:nth-child(even) {
          margin-left: 0.25rem;
        }
        margin-bottom: 0.25rem;
        p {
          position: absolute;
          word-wrap: break-word;
          color: #4f5557;
          width: 1rem;
          font-size: 0.4rem;
          font-family: PingFangSC-Medium;
          top: 0.5rem;
          left: 0.5rem;
        }
      }
    }
  }
  .hot {
    padding: 0 0.5rem;
    .msg {
      padding: 0.5rem 0;
      height: 1.01rem;
      font-size: 20px;
      font-family: PingFangSC-Medium;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 1.17rem;
    }
    .swiper {
      height: 6rem;
      position: relative;
      background: #666;
      padding-bottom: 0.5rem;
      .pic {
        p {
          position: absolute;
          bottom: 0.5rem;
          left: 0.5rem;
          height: 1rem;
          font-size: 0.426rem;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 0.586rem;
          padding: 0 0.5rem;
        }
        img {
          border-radius: 10px;
        }
      }
      .custom-indicator {
        position: absolute;
        width: 2.133333333rem;
        left: 50%;
        margin-left: -1.06rem;
        bottom: 0.5rem;
        i {
          float: left;
          width: 0.5333333333rem;
          height: 0.1333333333rem;
          &:nth-child(2) {
            margin: 0 0.25rem;
          }
          img {
            width: 100%;
          }
        }
      }
    }
  }
  .tuijian {
    .list {
      display: flex;
      flex-wrap: wrap;
      li{
        width: 4.18rem;
          height: 4.48rem;
        margin-bottom: 0.4rem;
        &:nth-of-type(odd){
          margin-right: 0.2666666667rem;
        }
        img {
          width: 100%;
        }
        .title {
          font-size: 14px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
        }
        .pic {
          font-size: 16px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(255, 93, 37, 1);
        }
      }
    }
  }
}
</style>
