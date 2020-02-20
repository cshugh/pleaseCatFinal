<template>
<div id="catProfile" class="page">
    <div class="emptySpace">-Navigation Bar-</div>
    <div class="profileView">
        <div class="leftPart" v-if="(selectedCat != null)">
            <!-- <img id="catPhoto" :src='require(`@/assets/images/cats/_profile/${ selectedCat.cat_no }.jpg`)' alt="catProfile"> -->
            <img id="catPhoto" :src='`/static/images/cat/${ selectedCat.cat_no }.jpg`' alt="catProfile">
        </div>
        <div id="fakeleftPart" class="leftPart" v-if="(selectedCat === null)">
            <!-- <img id="catPhoto" :src='require(`@/assets/images/icons/user.png`)' alt="catProfile"> -->
            <img id="catPhoto" src='/static/images/icon/user.png' alt="catProfile">
        </div>
        <section id="rightPart">
            <div id="name" v-if="(selectedCat != null)"><h1 id="catName" class="text">{{ selectedCat.cat_name }}</h1></div>
            <div id="name" v-if="(selectedCat == null)"><h1 id="catName" class="text"> 고양이 </h1></div>
            <div id="buttons">
                <span id="followButton" class="btn text">
                    <button v-if="!followed" @click="postAddFollow(selectedCat.cat_no)">팔로우</button>
                    <button v-if="followed" @click="deleteFollow(selectedCat.cat_no)">언팔로우</button>
                </span>
                <span id="detailButton" class="btn text">
                    <router-link :to="`/catDetail/${no}`"><button>상세 정보</button></router-link>
                </span>
            </div>
        </section>
    </div>
    <div id="summaryView" v-if="(selectedCat != null)">
        <span class="summary">게시물<br>{{ selectedCat.count_posts }}</span>
        <span class="summary" @click="showModalFollower = true">팔로우<br>{{ selectedCatFollowerList.length }}</span>
            <modal v-if="showModalFollower" @close="showModalFollower = false">
                <div slot="header">
                    <h5>Follower List</h5>
                </div>
                <div slot="body">
                    <div class="followerList" v-for="(f, idx) in selectedCatFollowerList" :key="idx">
                        <router-link :to="`/userProfile/${ f.user_no }`">
                            <!-- <img id="followerPhoto" :src='require(`@/assets/images/user/${ f.user_no }.jpg`)' alt="followerPhoto"> -->
                            <img id="followerPhoto" :src='`/static/images/user/${ f.user_image }`' alt="followerPhoto">
                            <span id="followerName">{{ f.user_id }}</span>
                        </router-link>
                    </div>
                </div>
                <div slot="footer" >
                    <button @click="showModalFollower = false"> 확인</button>
                </div>
            </modal>
        <span class="summary">좋아요<br>{{ selectedCat.count_likes }}</span>
    </div>
    <div id="photoView">
        <div id="photoList">
            <span v-for="(post, idx) in catPosts" :key="idx">
                <router-link :to="`/detailPost/${post.post_no}`">
                    <!-- <span class="photo" :style="{'background-image' : `url(${require(`@/assets/images/posts/${ post.post_image }`)})`}"  :alt='`${ post.post_image }`'> -->
                    <span class="photo" :style="{'background-image' : url(`/static/images/post/${ post.post_image }`)}"  :alt='`${ post.post_image }`'>
                    </span>
                </router-link>
            </span>
        </div>
    </div>
    <div class="emptySpace"></div>
</div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapMutations, mapGetters } from "vuex";
import Modal from "@/components/post/modal/Modal.vue";

export default {
    name: 'catProfile',
    components:{
        modal: Modal,
    },
    created() {
        this.no = this.$route.params.cat_no;
        this.getSelectedCat(this.no);
        this.getCatFollowerList(this.no);
        this.getCatPosts(this.no);
    },
    destroyed() {
        this.clearSelectedCat();
        this.clearCatPosts();
    },
    data(){
        return{
            no: '',
            showModalFollower: false,
        }
    },
    computed:{
        ...mapGetters('storeCat',[
            'selectedCat', 'selectedCatFollowerList', 'myFollowingCatList', 'catList',
        ]),
        ...mapGetters('storePost',[
            'catPosts',
        ]),
        followed: function(myFollowingCatList){
            const cno = this.$route.params.cat_no;
            var result = false;
            this.myFollowingCatList.forEach(el => {
                if(el.cat_no == cno){
                    return result = true;
                }
            });
            return result;
        },
    },
    methods: {
        ...mapMutations('storeCat',[
            'clearSelectedCat',
        ]),
        ...mapMutations('storePost',[
            'clearCatPosts',
        ]),
        ...mapActions('storeCat',[
            'getSelectedCat',  'getCatFollowerList', 'postAddFollow', 'deleteFollow',
        ]),
        ...mapActions('storePost',[
            'getCatPosts',
        ])
    },
}
</script>

<style lang="scss" scoped>
#catProfile{
    text-align: center;
    .btn{
        margin: 8px;
    }
    button {
        border: 1px solid #dbdbdb;
        border-radius: 3px;
        color: #262626;
        background-color: white;
        font-size: 2.7vw;
        padding: 3px 12px 3px 12px;
        font-size: 2.7vw;
        padding: 3px 12px 3px 12px;
        box-shadow: 0px 0px 4px 0px black;
    }
    h1{
        font-size: 7vw;
    }
    .emptySpace {
        height: 70px;
    }
}
.profileView{
    padding: 2% 2% 0 2%;
    position: relative;
    display: inline-block;
    width: 90vw;
    height: 36vw;
    vertical-align: middle;
    text-align: left;
    background-color: #ffe923;
    border-radius: 10px;
    box-shadow: 0px 5px 15px 0px rgba(48, 54, 62, 0.7);
    .text {
        transition:all 0.4s ease-out;
        font-weight: bold;
        color: #000000;
        h3 {
            font-size: 7vw;
        }
        h4 {
            font-size: 6vw;
        }
        h5 {
            font-size: 4vw;
        }
    }
    img {
        width: 100%;
        border-radius: 100%;
    }
    img::after{
        content: "";
        display: block;
        padding-bottom: 100%;
    }
    .leftPart{
        width: 30%;
        position: absolute;
        left: 5%;
        
        // box-sizing: border-box;
        // border: 1px solid red;
    }
    #rightPart{
        position: absolute;
        left: 40%;
        
        // box-sizing: border-box;
        // border: 1px solid red;
    }
}
#summaryView{
    display: inline-block;
    font-size: 3vw;
    width: 90%;
    text-align: center;
    padding: 5px 0 5px 0;
    // box-sizing: border-box;
    // border: 1px solid blue;
    // border-top: 1px solid black;
    // border-bottom: 1px solid black;
    .summary{
        display: inline-block;
        font-weight: bold;
        width: 33.3%;
        text-align: center;
        
        // box-sizing: border-box;
        // border: 1px solid red;
    }
    .followerList{
        vertical-align: center;
        img {
            width: 10vw;
            border-radius: 100%;
        }
        img::after{
            content: "";
            display: block;
            padding-bottom: 100%;
        }
    }
}
#photoView {
    display: inline-block;
    width: 90%;
    padding: 0, 1%, 0, 1%;
    #photoList {
        text-align: left;
        .photo{
            background-color: black;
            display: inline-block;
            overflow: hidden;
            width: calc((100% - 3vw) / 3);
            text-align: center;
            vertical-align: middle;
            box-sizing: border-box;
            margin: 0.5vw;
            border-radius: 1vw;
            box-shadow: 0px 5px 15px 0px rgba(48, 54, 62, 0.7);
            // border: 1px solid red;
            background-position-x: 50%;
            background-position-y: 50%;
            background-size: cover;
            // max-width: 100%; /* Scale up to fill container width */
            // max-height: 100%; /* Scale up to fill container height */
            // min-width: 100%; /* Scale up to fill container width */
            // min-height: 100%; /* Scale up to fill container height */
            div {
                overflow: hidden;
                display: inline-block; /* Otherwise it keeps some space around baseline */
                // max-width: 100%; /* Scale up to fill container width */
                // max-height: 100%; /* Scale up to fill container height */
                -ms-interpolation-mode: bicubic; /* Scaled images look a bit better in IE now */
            }
        }
        .photo::after{
            content: '';
            display: block;
            padding-bottom: 100%;
        }
    }
}
</style>