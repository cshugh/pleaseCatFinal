<template>
  <div id="catProfile" class="page" v-if="catDetail">
    <div id="photoView">
        <div id="cat" >
            고양이
            <router-link :to="`/catProfile/${catDetail.cat_no}`">
            <!-- <div id="catPhoto" :style="{'background-image' : 'url('+require('../../assets/images/cat/1.jpg')+')'}"></div> -->
            <!-- <div id="catPhoto" :style="{'background-image': 'url('+require('../../assets/images/cat/1.jpg')+')'}">asdasdasdasdasd</div> -->
            <!-- <img id="catPhoto" src="../../assets/images/cat/0.jpg" alt="" > -->
            <!-- <img id="catPhoto" :src='require(`../../assets/images/cats/_profile/${selectedCat.cat_no}.jpg`)' alt=""> -->
            <img id="catPhoto" :src='`/static/images/cat/${catDetail.cat_no}.jpg`' alt="사진">
            <h1 id="catName" class="text">{{catDetail.cat_name}}</h1>
            </router-link>
        </div>
        <div id="man" v-if="catManager != null">
            매니저
            <router-link :to="`/userProfile/${this.rankList[0].user_no}`">
            <!-- <img id="manPhoto" :src='require(`../../assets/images/man/${catManager.user_no}.jpg`)' alt=""> -->
                <img id="manPhoto" :src='`/static/images/user/${this.rankList[0].user_no}.jpg`' alt="사진">
                <h1 id="manName" class="text">{{catManager.user_id}}</h1>
            </router-link>
        </div>
    </div>
    <div id="descView" class="text">
      나이: {{catDetail.age}}
      <br />
      털색: {{catDetail.hair_color}}
      <br />
      눈색: {{catDetail.eye_color}}
      <br />
      중성화: {{catDetail.neuter}}
      <br />
      피부병: {{catDetail.skin_disease}}
      <br />
      다친곳: {{catDetail.hurt}}
      <br />
      마지막 밥 먹은 시간: {{catDetail.meal_time}}
      <span id="updateTime">
        <button v-on:click="catBob()">
          <img id="catBobImg" :src="require(`../../assets/images/icons/catBob.png`)" />
        </button>
      </span>
    </div>
    <div id="mapView">
      <mapComponent v-if="postList" :pos="positions" />
    </div>
    <div id="rankView" v-if="rankList">
        <!-- <div id="rankIcon" class="circle" :style="{'background-image' : `url(${require('@/assets/images/icons/rankIcon.jpg')})`}" alt="rank"></div> -->
        <!-- <div id="rankIcon" class="circle" :style="{'background-image' : `url('@/assets/images/icons/rankIcon.jpg')`}" alt="rank"></div> -->
        <div id="rankIcon" class="circle" :style="{'background-image' : `url('/static/images/icon/rankIcon.jpg')`}" alt="rank"></div>
        <RankComponent v-for="(rank, idx) in rankList" :key="idx" :ranking="idx+1" :user_no="rank.user_no" :score='rank.rank_point' :name="rank.user_id"/>
        <!-- <RankComponent :ranking='1' :name="'채집사'" :user_no='1' :score='100'/>
        <RankComponent :ranking='2' :name="'김집사'" :user_no='3' :score='97'/>
      <RankComponent :ranking='3' :name="'박집사'" :user_no='2' :score='89'/>-->
    </div>
  </div>
</template>

<script>
import mapComponent from "@/components/map/map_detail";
import RankComponent from "./view/Rank";
import axios from "axios";
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
    name: 'catDetail',
    created() {
        this.no = this.$route.params.cat_no;
        this.getSelectedCat(this.no);
        this.getRankList({cat_no: this.no});
        this.getCatList();
        this.getCatDetail(this.no);
    },
    data(){
        return{
            no: '',
        }
    },
    computed:{
        ...mapGetters('storeCat',[
          "selectedCat",
          "selectedCatFollowerList",
          "catList",
          "catDetail"
        ]),
        ...mapGetters('storeUser',[
            'userList',
        ]),
        ...mapGetters('storePost',[
            'postList', 'catPosts',
        ]),
        ...mapGetters('storeUser/storeRank',[
            'rankList',
        ]),
        catManager: function() {
            var tmp = '';
            this.userList.forEach(el => {
              console.log(el.user_no);
              if(el.user_no === this.catDetail.cat_manager){
                console.log("찾음")
                console.log(el);
                tmp = el;
              }
            });
            return tmp;
        },
        positions: function() {
            let array = [];
            if(this.postList != null){
                this.postList.forEach(post => {
                    if(post.cat_no == this.no){
                        array.push({
                            no: post.post_no,
                            image: post.post_image,
                            pos_x: post.post_x,
                            pos_y: post.post_y,
                        })
                    }
                });
            }
            return array;
        }
    },
    components: {
      RankComponent,
      mapComponent
    },
    methods: {
      catBob() {
        if (confirm("밥 시간을 업데이트 하시겠습니까?😽")) {
          this.getSetMealTime(this.catDetail.cat_no);
        }
      },
      ...mapActions("storeUser/storeRank", ["getRankList"]),
      ...mapActions("storeCat", [
        "getSetMealTime",
        "getCatList",
        "getSelectedCat",
        "clearSelectedCat",
        "getCatDetail",
      ])
    },
};
</script>

<style lang="scss" scoped>
#catBobImg {
  margin-top: -8px;
  width: 42px;
}
#catProfile {
  text-align: center;
  margin-top: 60px;
  margin-bottom: 60px;
}
#updateTime {
  float: right;
  width: 42px;
}
#catProfile {
  text-align: center;
  .emptySpace {
    font-size: 50px;
    height: 60px;
    // margin: 5px;
  }
}
#photoView {
  padding: 10px;
  display: inline-block;
  width: 90%;
  text-align: center;
  // background-color: grey;
  * {
    vertical-align: middle;
  }
  img {
    width: 100%;
    border-radius: 100%;
  }
  img::after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
  h1 {
    font-size: 7vw;
  }
  #cat {
    width: 30%;
    position: absolute;
    left: 30px;
    // box-sizing: border-box;
    // border: 1px solid red;
  }
  #man {
    width: 30%;
    position: absolute;
    right: 30px;
    // box-sizing: border-box;
    // border: 1px solid blue;
  }
}
#photoView::after {
  content: "";
  display: block;
  padding-bottom: 50%;
}
.text {
  // transition:all 0.4s ease-out;
  // text-shadow: 4px 2px 2px black;
  font-weight: bold;
  // color: #fff;
}
#descView {
  display: inline-block;
  width: 90%;
  text-align: left;
  // background-color: grey;
  padding: 10px;
  font-size: 4vw;
  margin-bottom: 1vw;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}
#rankView {
  // border: 1px solid black;
  #rankIcon {
    display: inline-block;
    width: 30vw;
    height: 30vw;
    background-size: 100%;
    // border: 1px solid black;
    // padding: 0px;
  }
  .circle {
    border-radius: 100%;
  }
}
#mapView {
  margin-left: 10vw;
  margin-right: 10vw;

  width: 80vw;
  height: 80vw;
}
</style>