<template>
  <v-app>
    <v-content id="content">
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
      transitionName: 'slide-left',
      title: '뉴스피드'
  }),
  watch: {
    '$route' (to, from) {
      this.title = to.matched[0].name;
      console.log(to.matched[0])
      console.log(from.matched[0].props.default)
      const toDepth = to.matched[0].props.default
      const fromDepth = from.matched[0].props.default
      // this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left''
      if(toDepth === 101 || toDepth === 100){
          this.transitionName = 'slide-up';
      } else if(fromDepth === 101 || fromDepth === 100){
        this.transitionName = 'slide-down';
      } else {
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
};
#content{
  background: snow;
}
.page {
  background: snow;
  // background: linear-gradient(to bottom,rgb(238, 255, 252),rgb(147, 205, 213), #61B1AE);
  // background-image: url('https://www.10wallpaper.com/wallpaper/1366x768/1701/Sky_space_milky_stars-Space_High_Quality_Wallpaper_1366x768.jpg');
  // min-height: 100vh;
  background-clip: border-box;
}
.child-view {
  position: absolute;
  transition: all .5s cubic-bezier(.3,0,.3,1);
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(100vw, 0);
  transform: translate(100vw, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-100vw, 0);
  transform: translate(-100vw, 0);
}
.slide-down-leave-active, .slide-up-enter {
  opacity: 0;
  -webkit-transform: translate(0, -100vh);
  transform: translate(0, -100vh);
}
.slide-up-leave-active, .slide-down-enter {
  opacity: 0;
  -webkit-transform: translate(0, 100vh);
  transform: translate(0, 100vh);
}
</style>