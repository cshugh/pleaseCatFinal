<template>
  <v-app>
    <v-content>
      <!-- <HelloWorld/> -->
      <NavigationBar/>
      <transition :name="transitionName">
      <router-view class="child-view"></router-view>
      </transition>
      <TabBar/>
    </v-content>
  </v-app>
</template>
<script>
// import HelloWorld from './components/HelloWorld'
import NavigationBar from '@/components/nav/NavigationBar'
import TabBar from '@/components/tabbar/TabBar'
import { mapActions, mapMutations, mapGetters } from "vuex";


export default {
  name: 'App',
  data: () => ({
      transitionName: 'slide-left'
  }),
  watch: {
    '$route' (to, from) {
      console.log(to.matched[0].props.default)
      console.log(from.matched[0].props.default)
      const toDepth = to.matched[0].props.default
      const fromDepth = from.matched[0].props.default
      // this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left''
      if(toDepth === undefined){
        if(fromDepth === undefined){
          this.transitionName = 'slide-left';
        } else {
          this.transitionName = 'slide-left';
        }
      } else {
          if(fromDepth === undefined){
            this.transitionName = 'slide-right';            
          } else {
            this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';            
          }
      }
    }
  },
  created() {
    this.findUserLoc();
    this.getCatList();
    this.getUserList();
    this.getPostList();
  },
  components: {
    // HelloWorld
    NavigationBar,
    TabBar
  },
  methods: {
      ...mapActions([
          'findUserLoc',
      ]),
      ...mapActions('storeCat',[
          'getCatList',
      ]),
      ...mapActions('storeUser',[
          'getUserList',
      ]),
      ...mapActions('storePost',[
          'getPostList',
      ]),
  },
}
</script>
<style lang="scss" scoped>
@import url(//fonts.googleapis.com/earlyaccess/notosanskr.css);

* {
    font-family: "Noto Sans KR", sans-serif;
    background: linear-gradient(to bottom,rgb(238, 255, 252),rgb(147, 205, 213), #61B1AE);
    // background: #DCE3E7;
    // background: #A2B0B2;
};
.child-view {
  position: absolute;
  transition: all .5s cubic-bezier(.3,0,.3,1);
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(120vw, 0);
  transform: translate(120vw, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-120vw, 0);
  transform: translate(-120vw, 0);
}
</style>