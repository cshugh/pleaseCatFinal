<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script src="https://unpkg.com/vue"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.18/vue.min.js"></script>
<script src="https://unpkg.com/vue@2.4.2"></script>
<template>
  <div> 
    <div class="emptySpace"></div>
    <div
      v-infinite-scroll="getNewsFeedList"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="limit"
    >
      <div id="repeat" class="text" v-for="post in newsFeedList" :key="post.post_no">
        <div id="top">
          <div class="top">
            <!-- <router-link v-bind:to="{name:'Home'}"> -->
              <button id="profileButton">
                <img :src="require(`../../assets/images/cat/${post.cat_image}`)" id="profile" />
              </button>
            <!-- </router-link> -->
          </div>
          <div class="top">{{post.cat_name}}</div>
          <div class="top" id="time">{{post.post_time}}</div>
        </div>
        <div id="content">
          <img :src="require(`../../assets/images/cat/${post.post_image}`)" id="img" />
        </div>
        <div v-if="post.like === true" class="HR" id="likeDisabled">
          <button
            v-on:click="likeDisabled(`${post.post_no}`,`${post.newsFeedIndex}`)"
            class="btnSize"
          >
            <img :src="require('../../assets/images/icons/2019090300416_0.png')" class="HRSize" />
          </button>
        </div>
        <div v-if="post.like === false" class="HR" id="likeActivation">
          <button
            v-on:click="likeActivation(`${post.post_no}`,`${post.newsFeedIndex}`)"
            class="btnSize"
          >
            <img :src="require('../../assets/images/icons/untitled.png')" class="HRSize" />
          </button>
        </div>
        <div v-if="post.unlike === true" class="HR">
          <button
            v-on:click="unLikeDisabled(`${post.post_no}`,`${post.newsFeedIndex}`)"
            class="btnSize"
          >
            <img :src="require('../../assets/images/icons/125082_154162_3227.jpg')" class="HRSize" />
          </button>
        </div>
        <div v-if="post.unlike === false" class="HR">
          <button
            v-on:click="unLikeActivation(`${post.post_no}`,`${post.newsFeedIndex}`)"
            class="btnSize"
          >
            <img :src="require('../../assets/images/icons/unnamed.png')" class="HRSize" />
          </button>
        </div>
        <div class="HR">
          <router-link :to="`/detailPost/${post.post_no}`">
          <button class="btnSize">
            <img :src="require('../../assets/images/icons/depositphotos_68123991-stock-illustration-comments-icon.jpg')" class="HRSize" />
          </button>
          </router-link>
        </div>
        <div id="app"></div>
        <br />
        <div class="like">좋아요</div>
        <div class="like">{{post.post_like}}개,</div>
        <div class="like">싫어요</div>
        <div class="like">{{post.post_unlike}}개</div>
        <div class="content">{{post.user_id}}</div>
        <div v-if="post.detail === 'Init'">
          <div class="content">{{post.post_content}}</div>
        </div>
        <div v-if="post.detail === 'true'">
          <div id="detailTrue">{{post.post_content}}</div>
          <button v-on:click="detailTrue(`${post.newsFeedIndex}`)">자세히보기</button>
        </div>
        <div v-if="post.detail === 'false'">
          <div id="detailFalse">{{post.post_content}}</div>
          <button v-on:click="detailFalse(`${post.newsFeedIndex}`)">간략히</button>
        </div>
      </div>
      <hr />
      <br />
    </div>
    <!-- <infinite-loading @infinite="infiniteHandler" spinner="waveDots"></infinite-loading> -->
  </div>
</template>
<script>
import "../../assets/css/style.css";
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  created() {
    // this.getIsLike();
    // this.getNewsFeedList();
  },
  computed: {
    ...mapGetters("storeNewsFeed", ["newsFeedList", "busy"]),
    ...mapGetters(["getLoginInfo"]),
  },
  methods: {
    ...mapActions("storeNewsFeed", [
      "getIsLike",
      "getNewsFeedList",
      "getLikeActivation",
      "getUnLikeActivation",
      "getLikeDisabled",
      "getUnLikeDisabled",
      "getUpdateLikes",
      "getUpdateUnLikes",
    ]),
    detailTrue(newsFeedIndex) {
      this.newsFeedList[newsFeedIndex].detail = "false";
    },
    detailFalse(newsFeedIndex) {
      this.newsFeedList[newsFeedIndex].detail = "true";
    },
    likeActivation(post_no, newsFeedIndex) {
      this.getLikeActivation(post_no);
      this.newsFeedList[newsFeedIndex].like = true;
      if (this.newsFeedList[newsFeedIndex].unlike) {
        this.unLikeDisabled(post_no, newsFeedIndex);
      }
      this.newsFeedList[newsFeedIndex].post_like++;
      this.getUpdateLikes({postLike: this.newsFeedList[newsFeedIndex].post_like, postNo: post_no});
    },
    likeDisabled(post_no, newsFeedIndex) {
      this.getLikeDisabled(post_no);
      this.newsFeedList[newsFeedIndex].like = false;
      this.newsFeedList[newsFeedIndex].post_like--;
      this.getUpdateLikes({postLike:this.newsFeedList[newsFeedIndex].post_like, postNo: post_no});
    },
    unLikeActivation(post_no, newsFeedIndex) {
      this.getUnLikeActivation(post_no);
      this.newsFeedList[newsFeedIndex].unlike = true;
      if (this.newsFeedList[newsFeedIndex].like) {
        this.likeDisabled(post_no, newsFeedIndex);
      }
      this.newsFeedList[newsFeedIndex].post_unlike++;
      console.log(this.newsFeedList[newsFeedIndex].post_unlike);
      this.getUpdateUnLikes({postLike:this.newsFeedList[newsFeedIndex].post_unlike, postNo: post_no});
    },
    unLikeDisabled(post_no, newsFeedIndex) {
      this.getUnLikeDisabled(post_no);
      this.newsFeedList[newsFeedIndex].unlike = false;
      this.newsFeedList[newsFeedIndex].post_unlike--;
      console.log(this.newsFeedList[newsFeedIndex].post_unlike);
      this.getUpdateUnLikes({postLike:this.newsFeedList[newsFeedIndex].post_unlike, postNo: post_no});
    },
  }
};
</script>
<style lang="scss" scoped>
.emptySpace{
  height: 70px;
}
#detailTrue {
  font-size: 18px;
  display: inline-block;
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* 여러 줄 자르기 추가 스타일 */
  white-space: normal;
  line-height: 1.2;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
#detailFalse {
  font-size: 18px;
  display: inline-block;
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* 여러 줄 자르기 추가 스타일 */
  white-space: normal;
  line-height: 1.2;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.content {
  font-size: 18px;
  display: inline-block;
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* 여러 줄 자르기 추가 스타일 */
  white-space: normal;
  line-height: 1.2;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
#HR {
  display: inline;
}
.HR {
  display: inline;
}
.HRSize {
  width: 100%;
}
.btnSize {
  width: 9%;
}
.like {
  font-size: 3vw;
  display: inline;
}
#content {
  height: 100%;
  font-size: 0;
  line-height: 0;
}
#img {
  width: 100%;
}
.top {
  font-size: 3vw;
  display: inline;
}
#time {
  height: 100%;
  float: bottom;
  float: right;
}
#repeat {
  background-color: white;
  color: black;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10%;
}
#profile {
  width: 100%;

  border-radius: 100%;
}
#profileButton {
  width: 10%;
}
</style>