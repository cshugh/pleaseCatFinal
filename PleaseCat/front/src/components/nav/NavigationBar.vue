<template>
  <div id="navBar">
    <div id="line1st" v-if="(getIsLogin)"><v-icon>notifications_none</v-icon></div>
    <div id="line1st" v-if="(getIsLogin && newAlarm.length > 0)"><v-icon @click="alarmView = !alarmView">notifications_active</v-icon> <span id="alarmNum">{{ newAlarm.length }}</span></div>
    <div id="line2nd">
      <span id="greeting" v-if="getIsLogin">{{ this.$store.getters.getLoginInfo.user_id }} 님 환영합니다.</span>
      <span>
            <button v-if="!getIsLogin" v-on:click="refresh"><router-link to="/">로그인</router-link></button>
            <button v-if="getIsLogin" v-on:click="logout">로그아웃</button>
      </span>
    </div>
    <div id="alarmList" v-if="alarmView">
      <div class="msg" v-for="(a, idx) in newAlarm" :key=idx @click="clickAlarm(a.no, idx)">
        {{a.msg}}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
    name: "NavigationBar",
    data: () => {
      return {
        alarmView: false,
      }
    },
    
    computed: {
      ...mapGetters([
        'getIsLogin', 'getUserLoc', 'newAlarm',
      ]),
    },
    methods: {
      ...mapActions([
        'readAlarm'
      ]),
      ...mapMutations([
        'deleteAlarm'
      ]),
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
      clickAlarm(post_no, idx){
        this.alarmView = false;
        this.readAlarm(post_no);
        this.deleteAlarm(idx);
        this.$router.push(`/detailPost/${post_no}`);
      }
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
    position: absolute;
    left: 5vw;
    #alarmNum{
      color: red;
      font-weight: bold;
    }
  }
  #line2nd{
    position: absolute;
    right: 5vw;
  }
  #greeting {
    margin-right: 20px;
  }
  #alarmList{
    position: absolute;
    background-color: rgb(189, 188, 188);
    top: 60px;
    .msg{
      width: 70vw;
      padding: 1vw;
      box-sizing: border-box;
      border: 1px solid black;
    }
  }
}
</style>