<template>
  <div id="app">
    <top-home></top-home>
  </div>
</template>

<script>
import topHome from "./home"; 
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    topHome
  },
  name: "App",
  data() {
    return {
      isReload: true
    };
  },
  computed: mapState({
    // 箭头函数可使代码更简练
  }),
  methods: {
    
  },
  mounted() {
    
  }
};
</script>

<style lang="less" >
@import "./assets/css/common.less";
* { 
  -webkit-tap-highlight-color: transparent;
  outline: none;
}

*:not(input, textarea) {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
}
#app {
  height: 100%;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  -webkit-overflow-scrolling: touch;
  .weui-cell__ft {
    .weui-switch {
      position: relative;
      width: 42px;
      height: 22px;
      border: 1px solid #dfdfdf;
      outline: 0;
      border-radius: 16px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      background-color: #5680f9;
      -webkit-transition: background-color 0.1s, border 0.1s;
      transition: background-color 0.1s, border 0.1s;
      &::before {
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        width: 40px;
        height: 20px;
        border-radius: 15px;
        background-color: #fdfdfd;
        -webkit-transition: -webkit-transform 0.35s
          cubic-bezier(0.45, 1, 0.4, 1);
        transition: -webkit-transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
        transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
        transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1),
          -webkit-transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
      }
      &::after {
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        width: 20px;
        height: 20px;
        border-radius: 15px;
        background-color: #ffffff;
        -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
        -webkit-transition: -webkit-transform 0.35s
          cubic-bezier(0.4, 0.4, 0.25, 1.35);
        transition: -webkit-transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
        transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
        transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35),
          -webkit-transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
      }
    }
  }
}
.weui-toast {
  top: 50% !important;
  margin-top: -50px !important;
}
.weui-icon_toast.weui-icon-success-no-circle:before{
  font-size: 40px!important;
}
.weui-toast__content{
  width: auto!important;
}
</style>
