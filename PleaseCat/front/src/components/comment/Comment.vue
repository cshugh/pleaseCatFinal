<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script src="https://unpkg.com/vue"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.18/vue.min.js"></script>
<script src="https://unpkg.com/vue@2.4.2"></script>
<template>
  <div>
    <div id="content">
      <img :src="require(`../../assets/images/cat/${post_image}`)" id="img" />
    </div>
    <div>
      <div class="content" id="post_content">{{post_content}}</div>
    </div>
    <div
      v-infinite-scroll="getCommentList(this.post_no)"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="limit"
    >
      <div id="repeat" class="text" v-for="post in commentList" :key="post.comment_no">
          <div class="comment" id="profileDiv">
            <!-- <router-link v-bind:to="{name:'Home'}"> -->
            <button id="profileButton">
              <img :src="require(`../../assets/images/cat/1.jpg`)" id="profile" />
            </button>
            <!-- </router-link> -->
          </div>
          <div class="comment">
            <div>{{post.user_id}} {{post.comment_content}}</div>
            <div>{{post.comment_time}} 신고</div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import "../../assets/css/style.css";
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  created() {
    this.getSet();
    this.post_no = this.$route.params.post_no;
    this.getCommentList(this.post_no);
    this.getPostInfo(this.post_no);
  },
  data() {
    return {
      post_no: 0
    };
  },
  computed: {
    ...mapGetters("storeComment", [
      "commentList",
      "busy",
      "limit",
      "post_image",
      "post_content"
    ])
  },
  methods: {
    ...mapActions("storeComment", ["getCommentList", "getPostInfo", "getSet"]),
  }
};
</script>
<style lang="scss" scoped>
button {
  padding-top: 50px;
}
#profileDiv {
  width: 40px;
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
.comment {
  display: inline-block;
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
  // -webkit-line-clamp: 3;
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
  height: 100%;
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