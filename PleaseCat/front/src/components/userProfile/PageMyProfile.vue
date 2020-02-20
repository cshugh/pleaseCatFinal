<template>
<div id="myProfile" class="page">
    <div id="profileView" v-if="(getLoginInfo != null)">
        <div id="leftPart">
            <img id="userPhoto" :src='require(`@/assets/images/man/${ getLoginInfo.user_no }.jpg`)' alt="catProfile">
            <!-- <img id="userPhoto" :src='`/static/images/user/${ getLoginInfo.user_no }.jpg`' alt="my Profile"> -->
        </div>
        <section id="rightPart">
            <div id="name"><h1 id="catName" class="text">{{ getLoginInfo.user_id }}</h1></div>
            <div id="buttons">
                <span id="modifyButton" class="btn text">
                    <router-link :to="`/`"><button>내 정보 수정</button></router-link>
                </span>
            </div>
        </section>
    </div>
    <div id="summaryView" class="text" v-if="(getLoginInfo != null)">
        <span class="summary">게시물<br>{{ getLoginInfo.count_posts }}</span>
        <span class="summary" @click="showModalFollower = true">팔로워<br>{{ myFollowerList.length }}</span>
            <modal v-if="showModalFollower" @close="showModalFollower = false">
                <div slot="header">
                    <h3>Follower List</h3>
                </div>
                <div slot="body">
                    <div class="followerList" v-for="(f, idx) in myFollowerList" :key="idx">
                        <span @click="showModalFollower = false; no = f.user_no">
                        <router-link :to="`/userProfile/${ f.user_no }`">
                            <img id="followerPhoto" :src='require(`@/assets/images/user/${ f.user_no }.jpg`)' alt="followerPhoto">
                            <span id="followerName">{{ f.user_id }}</span>
                        </router-link>
                        </span>
                    </div>
                </div>
                <div slot="footer" >
                    <button @click="showModalFollower = false"> 확인</button>
                </div>
            </modal>
        <span class="summary" @click="showModalFollowingUser = true">유저 팔로잉<br>{{ myFollowingUserList.length }}</span>
            <modal v-if="showModalFollowingUser" @close="showModalFollowingUser = false">
                <div slot="header">
                    <h3>User Following List</h3>
                </div>
                <div slot="body">
                    <div class="followerList" v-for="(f, idx) in myFollowingUserList" :key="idx">
                        <span @click="showModalFollowingUser = false; no = f.user_no">
                        <router-link :to="`/userProfile/${ f.user_no }`">
                            <img id="followerPhoto" :src='require(`@/assets/images/user/${ f.user_no }.jpg`)' alt="followerPhoto">
                            <span id="followerName">{{ f.user_id }}</span>
                        </router-link>
                        </span>
                    </div>
                </div>
                <div slot="footer" >
                    <button @click="showModalFollowingUser = false"> 확인</button>
                </div>
            </modal>
        <span class="summary" @click="showModalFollowingCat = true">캣 팔로잉<br>{{ myFollowingCatList.length }}</span>
            <modal v-if="showModalFollowingCat" @close="showModalFollowingCat = false">
                <div slot="header">
                    <h3>Cat Following List</h3>
                </div>
                <div slot="body">
                    <div class="followerList" v-for="(f, idx) in myFollowingCatList" :key="idx">
                        <span @click="showModalFollowingCat = false; no = f.cat_no">
                            <router-link :to="`/catProfile/${ f.cat_no }`">
                                <img id="followerPhoto" :src='require(`@/assets/images/cat/${ f.cat_no }.jpg`)' alt="followerPhoto">
                                <span id="followerName">{{ f.cat_name }}</span>
                            </router-link>
                        </span>
                    </div>
                </div>
                <div slot="footer" >
                    <button @click="showModalFollowingCat = false"> 확인</button>
                </div>
            </modal>
    </div>
    <div id="photoView" v-if="(myPosts != null)">
        <div id="photoList">
            <span v-for="(post, idx) in myPosts" :key="idx">
                <router-link :to="`/detailPost/${post.post_no}`">
                    <span class="photo" :style="{'background-image' : `url(${require(`@/assets/images/posts/${ post.post_image }`)})`}"  :alt='`${ post.post_image }`'>
                    <!-- <span class="photo" :style="{'background-image' : `/static/images/post/${ post.post_image }`}"  :alt='`${ post.post_image }`'> -->
                    </span>
                </router-link>
            </span>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapMutations, mapGetters } from "vuex";
import Modal from "@/components/post/modal/Modal.vue";

export default {
    name: 'myProfile',
    components:{
        modal: Modal,
    },
    data(){
        return{
            no: '',
            showModalFollower: false,
            showModalFollowingUser: false,
            showModalFollowingCat: false,
        }
    },
    computed:{
        ...mapGetters([
            'getLoginInfo',
        ]),
        ...mapGetters('storeUser',[
            'myFollowerList', 'myFollowingUserList',
        ]),
        ...mapGetters('storeCat',[
            'myFollowingCatList'
        ]),
        ...mapGetters('storePost',[
            'myPosts',
        ]),
    },
}
</script>

<style lang="scss" scoped>
#myProfile{
    position: absolute;
    width: 100vw;
    text-align: center;
    margin-top: 65px;
    margin-bottom: 65px;
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
        box-shadow: 0px 0px 4px 0px black;
    }
    h1{
        font-size: 7vw;
    }
    .emptySpace {
        height: 70px;
    }
    .text {
        // transition:all 0.4s ease-out;
        // text-shadow: 4px 2px 2px black;
        font-weight: bold;
        color: black;
    }
}
#profileView{
    padding: 2% 2% 0 2%;
    position: relative;
    display: inline-block;
    width: 90%;
    vertical-align: middle;
    text-align: left;
    background-color: #C1C6CC;
    border-radius: 10px;
    box-shadow: 0px 5px 15px 0px rgba(48, 54, 62, 0.7);
    
    img {
        width: 100%;
        border-radius: 100%;
    }
    img::after{
        content: "";
        display: block;
        padding-bottom: 100%;
    }
    #leftPart{
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
#profileView::after{
    content: "";
    display: block;
    padding-bottom: 40%;
}
#summaryView{
    display: inline-block;
    font-size: 3vw;
    width: 90%;
    text-align: center;
    padding: 5px 0 5px 0;
    
    border-radius: 10px;
    // box-sizing: border-box;
    // border: 1px solid blue;
    // border-top: 1px solid black;
    // border-bottom: 1px solid black;
    .summary{
        display: inline-block;
        width: 25%;
        text-align: center;

        // box-sizing: border-box;
        // border: 1px solid red;
    }
    .followerList{
        text-align: left;
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