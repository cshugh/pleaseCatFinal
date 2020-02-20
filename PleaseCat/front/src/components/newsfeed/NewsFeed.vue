<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script src="https://unpkg.com/vue"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.18/vue.min.js"></script>
<script src="https://unpkg.com/vue@2.4.2"></script>
<template>
  <div id="out" class="page">
    <div id="in">
      <div class="emptySpace"></div>
      <div
        v-infinite-scroll="getNewsFeedList"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="limit"
      >
        <div id="repeat" class="text" v-for="post in newsFeedList" :key="post.post_no">
          <div id="top" class="opacityDiv">
            <div class="top" id="profileDiv">
              <router-link :to="`/catProfile/${post.cat_no}`">
                <button id="profileButton">
                  <!-- <img :src="require(`../../assets/images/cat/${post.cat_image}`)" id="profile" /> -->
                  <img :src="`/static/images/cat/${post.cat_image}`" id="profile" />
                </button>
              </router-link>
            </div>
            <div class="top" id="cat_name">{{post.cat_name}}</div>
            <div id="time">{{post.post_time}}</div>
          </div>
          <div id="content">
            <!-- <img :src="require(`../../assets/images/post/${post.post_image}`)" id="img" /> -->
            <img :src="`/static/images/post/${post.post_image}`" id="img" />
          </div>
          <div id="likeWrapper" class="opacityDiv">
            <div v-if="post.like === true" class="HR" id="likeDisabled">
              <button
                v-on:click="likeDisabled(`${post.post_no}`,`${post.newsFeedIndex}`)"
                class="btnSize2"
              >
                <!-- <img :src="require('../../assets/images/icons/868700.png')" class="HRSize" /> -->
                <img :src="'/static/images/icon/868700.png'" class="HRSize" />
              </button>
            </div>
            <div v-if="post.like === false" class="HR" id="likeActivation">
              <button
                v-on:click="likeActivation(`${post.post_no}`,`${post.newsFeedIndex}`)"
                class="btnSize2"
              >
                <!-- <img :src="require('../../assets/images/icons/868598.png')" class="HRSize" /> -->
                <img :src="'/static/images/icon/868598.png'" class="HRSize" />
              </button>
            </div>
            <div class="likeClass">{{post.post_like}}개</div>
            <div v-if="post.unlike === true" class="HR">
              <button
                v-on:click="unLikeDisabled(`${post.post_no}`,`${post.newsFeedIndex}`)"
                class="btnSize"
              >
                <!-- <img :src="require('../../assets/images/icons/broken-heart_1.png')" class="HRSize" /> -->
                <img :src="'/static/images/icon/broken-heart_1.png'" class="HRSize" />
              </button>
            </div>
            <div v-if="post.unlike === false" class="HR">
              <button
                v-on:click="unLikeActivation(`${post.post_no}`,`${post.newsFeedIndex}`)"
                class="btnSize"
              >
                <!-- <img :src="require('../../assets/images/icons/broken-heart_2.png')" class="HRSize" /> -->
                <img :src="'/static/images/icon/broken-heart_2.png'" class="HRSize" />
              </button>
            </div>
            <div id="unlike">{{post.post_unlike}}개</div>
            <div class="HR" id="commentDiv">
              <router-link :to="`/detailPost/${post.post_no}`" >
                <button class="btnSize3">
                  <!-- <img :src="require('../../assets/images/icons/png.png')" class="HRSize" /> -->
                  <img :src="'/static/images/icon/png.png'" class="HRSize" />
                </button>
              </router-link>
            </div>
          </div>
          <br />
          <br />
          <br />
          <div id="contentDiv" class="opacityDiv">
            <router-link :to="`/userProfile/${post.user_no}`">
              <button id="userButton">
                <!-- <img :src="require(`../../assets/images/user/${post.user_image}`)" id="user_image" /> -->
                <img :src="`/static/images/user/${post.user_image}`" id="user_image" />
              </button>
            </router-link>
            <div id="userId">{{post.user_id}} </div>
            <div v-if="post.detail === 'Init'">
              <div class="content">{{post.post_content}}</div>
            </div>
            <div v-if="post.detail === 'true'">
              <div id="detailTrue">{{post.post_content}}</div>
              <button class="buttons" v-on:click="detailTrue(`${post.newsFeedIndex}`)">자세히보기</button>
            </div>
            <div v-if="post.detail === 'false'">
              <div id="detailFalse">{{post.post_content}}</div>
              <button class="buttons" v-on:click="detailFalse(`${post.newsFeedIndex}`)">간략히</button>
            </div>
          </div>
        </div>
      </div>
      <div id="bottomDiv"></div>
    </div>
  </div>
</template>
<script>
import "../../assets/css/style.css";
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      width: 0,
    };  
  },
  created() {
    this.getIsLike();
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed(){
    window.removeEventListener("resize", this.handleResize);
  },
  computed: {
    ...mapGetters("storeNewsFeed", ["newsFeedList", "busy"]),
    ...mapGetters(["getLoginInfo"])
  },
  methods: {
    handleResize() {
      this.width = window.innerWidth;
      this.setDetail();
    },
    setDetail() {
      for (var i = 0; i < this.newsFeedList.length; i++) {
        if (this.newsFeedList[i].detail==="false" && this.newsFeedList[i].post_content.length > this.width / 5.196) {
          this.newsFeedList[i].detail = "false";
        } else if(this.newsFeedList[i].post_content.length > this.width / 5.196){
          this.newsFeedList[i].detail = "true";
        }else{
          this.newsFeedList[i].detail = "Init";
        }
      }
    },
    ...mapActions("storeNewsFeed", [
      "getIsLike",
      "getNewsFeedList",
      "getLikeActivation",
      "getUnLikeActivation",
      "getLikeDisabled",
      "getUnLikeDisabled",
      "getUpdateLikes",
      "getUpdateUnLikes"
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
      this.getUpdateLikes({
        postLike: this.newsFeedList[newsFeedIndex].post_like,
        postNo: post_no
      });
    },
    likeDisabled(post_no, newsFeedIndex) {
      this.getLikeDisabled(post_no);
      this.newsFeedList[newsFeedIndex].like = false;
      this.newsFeedList[newsFeedIndex].post_like--;
      this.getUpdateLikes({
        postLike: this.newsFeedList[newsFeedIndex].post_like,
        postNo: post_no
      });
    },
    unLikeActivation(post_no, newsFeedIndex) {
      this.getUnLikeActivation(post_no);
      this.newsFeedList[newsFeedIndex].unlike = true;
      if (this.newsFeedList[newsFeedIndex].like) {
        this.likeDisabled(post_no, newsFeedIndex);
      }
      this.newsFeedList[newsFeedIndex].post_unlike++;
      this.getUpdateUnLikes({
        postLike: this.newsFeedList[newsFeedIndex].post_unlike,
        postNo: post_no
      });
    },
    unLikeDisabled(post_no, newsFeedIndex) {
      this.getUnLikeDisabled(post_no);
      this.newsFeedList[newsFeedIndex].unlike = false;
      this.newsFeedList[newsFeedIndex].post_unlike--;
      this.getUpdateUnLikes({
        postLike: this.newsFeedList[newsFeedIndex].post_unlike,
        postNo: post_no
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.buttons {
  float: left;
  padding-left: 3px;
}
@media (min-width: 600px) {
  #out {
    width: 100%;
    text-align: center;
  }
  #in {
    display: inline-block;
    width: 600px;
  }
}
#contentDiv {
  padding-left: 9px;
}
#bottomDiv {
  height: 50px;
}
#userId {
  font-weight: 700;
  padding-left: 3px;
  float: left;
  line-height: 2.6;
}
#userButton {
  width: 40px;
  float: left;
}
#user_image {
  width: 100%;
  border-radius: 100%;
}
#unlike {
  width: 50px;
  float: left;
  line-height: 3.9;
}
#commentDiv {
  height: 50px;
  line-height: 3.9;
  float: left;
  padding-left: 14px;
}
.likeClass {
  float: left;
  line-height: 3.9;
  width: 70px;
}
.HRSize {
  width: 90%;
}
#likeWrapper {
  padding-left: 10px;
  width: 400px;
}
.HR {
  width: 50px;
  float: left;
}
.btnSize {
  padding-top: 10px;
  width: 100%;
}
.btnSize2 {
  padding-top: 17px;
  width: 80%;
}
.btnSize3 {
  padding-top: 13px;
  width: 40px;
}
#profileDiv {
  padding-left: 10px;
  width: 60px;
}
#cat_name {
  padding-left: 10px;
  line-height: 2.6;
}
.emptySpace {
  height: 61px;
}
.txt_center {
  text-align: center;
}
.invest_plus {
  display: inline-block;
  width: 180px;
  height: 48px;
  line-height: 46px;
  background-color: #f2849e;
  color: #fff;
  border-radius: 5px;
}
.loading_img {
  display: none;
}
.loading_img.on {
  display: block;
}
#detailTrue {
  padding-left: 2px;
  width: 100%;
  font-size: 18px;
  display: inline-block;
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
  padding-left: 2px;
  width: 100%;
  font-size: 18px;
  display: inline-block;
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
  padding-left: 2px;
  width: 100%;
  font-size: 18px;
  display: inline-block;
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
  font-size: 18px;
  float: left;
}
#time {
  line-height: 2.6;
  padding-right: 10px;
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
  width: 100%;
}
</style>