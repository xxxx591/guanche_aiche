<template>
  <div id="app">
    <router-view v-if="isReload"/>
  </div>
</template>

<script>
import platform from "@/platform/index.js";
import { mapState, mapMutations } from "vuex";
export default {
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
  
}

</style>
