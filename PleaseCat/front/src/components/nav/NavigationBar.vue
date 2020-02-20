<template>
  <div id="navBar">
    <div id="line1st"><br></div>
    <div id="line2nd">
      <span id="greeting" v-if="getIsLogin">{{ this.$store.getters.getLoginInfo.user_id }} 님 환영합니다.</span>
      <span>
            <button v-if="!getIsLogin" v-on:click="refresh"><router-link to="/login">로그인</router-link></button>
            <button v-if="getIsLogin" v-on:click="logout">로그아웃</button>
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
    name: "NavigationBar",
    data: () => {
      return {
      }
    },
    
    computed: {
      ...mapGetters([
        'getIsLogin', 'getUserLoc'
      ]),
    },
    methods: {
      logout() {
        // console.log('로그아웃');
        this.$store.dispatch('logout');
      },
      refresh() {
        // console.log('로그아웃');
      location.reload(true);
      location.href = location.href;
      history.go(0);
      },
    }
}
</script>

<style lang="scss" scoped>
#navBar{
  position:fixed;
  top: 0;
  left:0;
  width: 100%;
  height: 60px;
  // background: linear-gradient(to bottom,#736776,#7E7182);
  background: #ffd923;
  z-index:100;
  #line1st{
    text-align: center;
  }
  #line2nd{
    text-align: right;
  }
  #greeting {
    margin-right: 20px;
  }
}
</style>