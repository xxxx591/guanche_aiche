<template>
  <div class="InvitedGift">
    <div class="top">
      <img src="../../assets/images/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">邀请有礼</div>
    </div>
    <div class="invite flex-v">
      <img src="../../assets/images/invite2.png" class="i-img">
      <div class="i-earn">邀请既得</div>
      <div class="i-ji">800积分</div>
      <div class="i-btn flex-h flex-cc" @click="yaoqing">立即邀请</div>
    </div>
    <div class="info">
      邀请说明：
      <br>注册用户可以邀请好友注册购车，成功邀请好友注册最高可获得100积分红包。
    </div>
    <div class="mid flex-h">
      <div class="m-left flex-h">
        <div class="m-icon">
          <img src="../../assets/images/person2.png" alt class="m-icon-img">
        </div>
        <div class="m-l-right">
          <div class="ml-title">成功邀请(人)</div>
          <div class="ml-num">{{inviteData.number}}</div>
        </div>
      </div>
      <div class="m-right flex-h">
        <div class="m-icon">
          <img src="../../assets/images/money.png" alt class="m-icon-img">
        </div>
        <div class="m-l-right">
          <div class="ml-title">累计奖励(积分)</div>
          <div class="ml-num">{{inviteData.invite_sum}}</div>
        </div>
      </div>
    </div>
    <div class="invite-record flex-h">邀请记录</div>
    <div class="record">
      <div class="r-box flex-h" v-for="(item, index) in inviteList" :key="index">
        <div class="r-left flex-h">
          <img :src="item.avatar" class="r-img">
          <div class="r-left2 flex-v">
            <div class="r-name">{{item.nickname}}</div>
            <div class="r-phone">{{item.mobile}}</div>
          </div>
        </div>
        <div class="r-right">{{item.created_at}}</div>
      </div>
    </div>
    <van-popup v-model="show" position="bottom" :overlay="true">
      <div class="yaoqing-box">
        <p class="title">立即邀请</p>
        <div class="img-box">
          <p @click="fenxiang('1')">
            <img src="../../assets/images/yaoqing_qq.png" alt srcset>
            <span>微信好友</span>
          </p>
          <p @click="fenxiang('2')">
            <img src="../../assets/images/yaoqing_wx.png" alt srcset>
            <span>QQ好友</span>
          </p>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";
import { log } from "util";

export default {
  name: "InvitedGift",
  data() {
    return {
      inviteList: [],
      inviteData: {},
      show: false,
      token: "",
      userId: ""
    };
  },
  computed: {
    
  },
  created() {
    this.getInviteData();
    this.getShareData();
  },
  methods: {
    // ...mapActions(["setTab"]),
    inputBlur() {
      window.scrollTo(0, 0);
    },
    async getShareData() {
      let data = await this.api.invitePageData({
        token: this.$route.query.token
      });
      this.inviteData = data;
      console.log("data--", data);
      this.userId = data.id;
    },
    async getInviteData() {
      // console.log('token-------',token.token);
      let list = await this.api.inviteList({
        token: this.$route.query.token,
        page: 1,
        pagesize: 10000
      });
      console.log("邀请人列表----", list);
      if (list.data.length == 0) {
        console.log("没有邀请人咯");
      } else {
        // list.data.forEach((item, index) => {
        //   item.created_at = item.created_at.substr(0, 10);
        // });
        this.inviteList = list.data;
      }
    },
    topBack() {
      this.native.back_btn({});
      // this.$router.back(-1);
    },
    yaoqing() {
      // this.$router.push({
      //   path:"CarShare",
      //   query:{type:1}
      // })
      this.show = true;
    },
    async fenxiang(type) {
      this.show = !this.show;
      let pushId = await this.native.getJPushId({});
      this.native.share({
        url:
          "http://h5.gc-app.com/#/Car/CarShare?token=" +
          this.$route.query.token +
          "&userId=" +
          this.userId +
          "&pushId=" +
          pushId.jpush_id,
        title: "邀请您加入挂车之家",
        desc: "注册挂车之家获取海量积分，还能兑换实物哦！",
        thumb: "xxxxx",
        type: type
      });
    }
  }
};
</script>

<style lang='less' scoped>
.InvitedGift {
  width: 100vw;
  min-height: calc(100vh - 3.133333rem);
  background: #f7f8fa;
  position: absolute;
  top: 1.13333333rem;
  width: 100%;
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
  .invite {
    background: #ffffff;
    align-items: center;
    .i-img {
      width: 2.933333rem /* 220/75 */;
      height: 3rem /* 225/75 */;
      margin-top: 0.666667rem /* 50/75 */;
    }
    .i-earn {
      font-size: 0.373333rem /* 28/75 */;
      color: #999999;
      margin-top: 0.4rem /* 30/75 */;
    }
    .i-ji {
      font-size: 0.533333rem /* 40/75 */;
      color: #ff5d25;
      margin-top: 0.133333rem /* 10/75 */;
      font-weight: bold;
    }
    .i-btn {
      width: 8.533333rem /* 640/75 */;
      height: 0.933333rem /* 70/75 */;
      background: #4ccdfa;
      font-size: 0.4rem /* 30/75 */;
      color: #ffffff;
      border-radius: 0.466667rem /* 35/75 */;
      margin-top: 0.533333rem /* 40/75 */;
    }
  }
  .info {
    background: #ffffff;
    width: 100%;
    box-sizing: border-box;
    padding: 0.4rem /* 30/75 */;
    color: #999999;
    font-size: 0.32rem /* 24/75 */;
  }
  .mid {
    width: 100%;
    height: 2rem /* 150/75 */;
    box-sizing: border-box;
    background: #ffffff;
    margin: 0.266667rem /* 20/75 */ 0;
    .m-left {
      min-width: 4.986667rem /* 374/75 */;
      max-width: 4.986667rem /* 374/75 */;
      height: 100%;
      align-items: center;
      .m-icon {
        min-width: 0.8rem /* 60/75 */;
        max-width: 0.8rem /* 60/75 */;
        margin-left: 0.4rem /* 30/75 */;
        height: 0.666667rem /* 50/75 */;
        .m-icon-img {
          width: 100%;
          height: 100%;
        }
      }
      .m-l-right {
        margin-left: 0.4rem /* 30/75 */;
        .ml-title {
          font-size: 0.373333rem /* 28/75 */;
          color: #999999;
        }
        .ml-num {
          font-size: 0.426667rem /* 32/75 */;
          color: #ff5d25;
          font-weight: bold;
        }
      }
    }
    .m-right {
      width: 4.986667rem /* 374/75 */;
      height: 1.066667rem /* 80/75 */;
      border-left: 0.013333rem /* 1/75 */ solid #e5e5e5; /*no*/
      align-self: center;
      align-items: center;
      .m-icon {
        min-width: 0.8rem /* 60/75 */;
        max-width: 0.8rem /* 60/75 */;
        margin-left: 0.4rem /* 30/75 */;
        height: 0.666667rem /* 50/75 */;
        .m-icon-img {
          width: 100%;
          height: 100%;
        }
      }
      .m-l-right {
        margin-left: 0.4rem /* 30/75 */;
        .ml-title {
          font-size: 0.373333rem /* 28/75 */;
          color: #999999;
        }
        .ml-num {
          font-size: 0.426667rem /* 32/75 */;
          color: #ff5d25;
          font-weight: bold;
        }
      }
    }
  }
  .invite-record {
    width: 100%;
    height: 1.066667rem /* 80/75 */;
    box-sizing: border-box;
    padding: 0.4rem /* 30/75 */;
    font-size: 0.373333rem /* 28/75 */;
    color: #999999;
    align-items: center;
  }
  .record {
    width: 100%;
    box-sizing: border-box;
    padding: 0.4rem /* 30/75 */;
    background: #ffffff;
    .r-box {
      justify-content: space-between;
      border-bottom: 0.013333rem /* 1/75 */ solid #e6e6e6; /*no*/
      // padding-bottom: .4rem /* 30/75 */;
      height: 1.866667rem /* 140/75 */;
      .r-left {
        align-items: center;
        .r-img {
          width: 1.066667rem /* 80/75 */;
          height: 1.066667rem /* 80/75 */;
          border-radius: 0.533333rem /* 40/75 */;
        }
        .r-left2 {
          justify-content: center;
          margin-left: 0.266667rem /* 20/75 */;
          .r-name {
            font-size: 0.386667rem /* 29/75 */;
            color: #333333;
          }
          .r-phone {
            font-size: 0.32rem /* 24/75 */;
            color: #999999;
          }
        }
      }
      .r-right {
        height: 1.066667rem /* 80/75 */;
        font-size: 0.32rem /* 24/75 */;
        color: #999999;
        align-self: center;
      }
    }
  }
  .yaoqing-box {
    height: 4.266667rem /* 320/75 */;
    .title {
      font-size: 0.426667rem /* 32/75 */;
      font-family: serif;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 0.64rem /* 48/75 */;
      text-align: center;
      padding: 0.533333rem /* 40/75 */ 0 0.6rem /* 45/75 */ 0;
    }
    .img-box {
      display: flex;
      justify-content: space-around;
      p {
        width: 2rem /* 120/75 */;
        text-align: center;
        font-size: 0.373333rem /* 28/75 */;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      img {
        width: 1.6rem /* 120/75 */;
        height: 1.6rem /* 120/75 */;
      }
    }
  }
}
</style>
