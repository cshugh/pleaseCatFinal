<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script src="https://unpkg.com/vue"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.18/vue.min.js"></script>
<script src="https://unpkg.com/vue@2.4.2"></script>
<template>
  <div id="out">
    <div id="paddingTop"></div>
    <div id="wrapper" class="in">
      <div v-if="this.post_image" id="content">
        <img :src="require(`../../../assets/images/posts/${this.post_image}`)" id="img" />
      </div>
      <div>
        <div class="content" id="post_content">{{post_content}}</div>
      </div>
      <div
        v-infinite-scroll="getDetailPostList2"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="limit"
      >
        <div id="repeat" class="text" v-for="list in detailPostList" :key="list.comment_no">
          <div id="commentWrapper">
          <div class="comment left" id="profileDiv">
            <!-- <router-link v-bind:to="{name:'Home'}"> -->
            <button id="profileButton" class="left">
              <img :src="require(`../../../assets/images/cat/${list.user_image}`)" id="profile" />
            </button>
            <!-- </router-link> -->
          </div>
          <div class="comment left" id="comment2">
            <div><span id="userIdSpan">{{list.user_id}}</span> {{list.comment_content}}</div>
            <div id="comment_time">{{list.comment_time}} 신고</div>
          </div>
        </div>
        <br>
        <br>
        <br>
        </div>
        <br />
      </div>
      <!-- <infinite-loading @infinite="infiniteHandler" spinner="waveDots"></infinite-loading> -->
    </div>
    <div class="in" id="inputComment">댓글 <input v-on:keyup.enter="inputComment()" v-model="comment" placeholder="댓글을 입력해주세요"><button v-on:click="inputComment()">버튼</button></div>
  </div>
</template>
<script>
import "../../../assets/css/style.css";
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  created() {
    this.getSetDetailPost();
    this.post_no = this.$route.params.post_no;
    this.getDetailPostList({ post_no: this.post_no });
    this.getDetailPostInfo(this.post_no);
  },
  data() {
    return {
      post_no: 0,
      comment: "",
    };
  },
  computed: {
    ...mapGetters("storeDetailPost", [
      "detailPostList",
      "busy",
      "limit",
      "post_image",
      "post_content"
    ]),
    ...mapGetters(["getLoginInfo"]),
  },
  methods: {
    ...mapActions("storeDetailPost", [
      "getDetailPostList",
      "getDetailPostList2",
      "getDetailPostInfo",
      "getAddComment",
      "getSetDetailPost"
    ]),
    inputComment(){
      this.getAddComment({ comment_content: this.comment, post_no: this.post_no, user_no: this.getLoginInfo.user_no});
    }
  }
};
</script>
<style lang="scss" scoped>
#paddingTop{
  padding-top: 50px;
}
#userIdSpan{
  font-weight: 700;
}
#comment_time{
  float: left;
}
#comment2{
  float: left;
  padding-top: 50px;
  padding-left: 7px;
}

.left{
  float: left;
}
#commentWrapper{
  float: left;
}
@media (min-width: 600px) {
  #out {
 width: 100%;
 text-align: center;
 }
  .in {
    display: inline-block;
    width: 600px;
  }
}
#wrapper {
  padding-bottom: 150px;
}
#inputComment {
  background-color: white;
  // width: 100%;
  margin: 0 auto;
  position: fixed;
  bottom: 20px;
  left: 0;
  right: 0;
  z-index: 100;
  padding-bottom: 82px;
}
button {
  padding-top: 50px;
}
#profileDiv {
  width: 50px;
  float: left;
  padding-left: 10px;
}
// .comment {
//   display: inline-block;
// }
.content {
  font-size: 18px;
  padding-left: 6.3px;
  display: inline-block;
  width: 470px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* 여러 줄 자르기 추가 스타일 */
  white-space: normal;
  line-height: 1.2;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  // -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
#content {
  height: 100%;
  font-size: 0;
  line-height: 0;
}
#img {
  width: 100%;
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
</style>