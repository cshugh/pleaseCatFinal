<template>
    <div id="catList">
        <div class="emptySpace">-Navigation Bar-</div>
        <div><span>주변 반경</span></div>
        <div>
            <input type="radio" id="d300" value="300" v-model="distance">
            <label for="d300">300m</label>
            <input type="radio" id="d500" value="500" v-model="distance">
            <label for="d500">500m</label>
            <input type="radio" id="d1000" value="1000" v-model="distance">
            <label for="d1000">1000m</label>
        </div>
        <h1><button v-if="isList" @click="isList = false">지도보기</button></h1> 
        <h1><button v-if="!isList" @click="isList = true">목록보기</button></h1> 
        <div id="mapView" v-if="!isList">
            <mapComponent v-if="catList" txt="catProfile" :pos="nearCatList" :curLoca="getUserLoc" :range="distance"/>
        </div>
        <!-- <CatCardComponent key="1" name="name" desc1="♀" desc2="loca" src="1" /> -->
        <div id="listView" v-if="isList">
        <CatCardComponent v-for="cat in nearCatList" :key=cat.no :name=cat.cat_name :desc1="cat.sex==='남'?'♂':'♀'" :desc2=cat.cat_location :src=cat.no  />
        </div>
        <div class="emptySpace">-Tab Bar-</div>
    </div>
</template>
<script>
import mapComponent from '@/components/map/map';
import CatCardComponent from './catCard/CatCard'
import axios from 'axios'
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
    created() {
    },
    data() {
        return {
            isList: true,
            distance: 1000,
      }
    },
    components: {
        CatCardComponent,
        mapComponent,
    },
    computed: {
        ...mapGetters([
            'getUserLoc',
        ]),
        ...mapGetters('storeCat',[
            'catList',
        ]),
        nearCatList: function(catList, distance) {
            let array = [];

            function deg2rad(deg) {
                return deg * Math.PI / 180.0;
            }
            function rad2deg(rad) {
                return (rad * 180 / Math.PI);
            }
            function distance(lat1, lon1, lat2, lon2) {
                let theta = lon1 - lon2;
                let dist
                dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));
                
                dist = Math.acos(dist);
                dist = rad2deg(dist);
                dist = dist * 60 * 1.1515;
                
                dist = dist * 1609.344;
                return (dist);
            };
            if(this.catList != null){
                this.catList.forEach(cat => {
                    if(distance(this.getUserLoc.lat, this.getUserLoc.lng, cat.cat_x, cat.cat_y) < this.distance){
                        console.log('고양이 추가')
                        array.push({
                            age: cat.age,
                            cat_desc: cat.cat_desc,
                            cat_image: cat.cat_image,
                            cat_location: cat.cat_location,
                            cat_manager: cat.cat_manager,
                            cat_name: cat.cat_name,
                            no: cat.cat_no,
                            pos_x: cat.cat_x,
                            pos_y: cat.cat_y,
                            count_followers: cat.count_followers,
                            count_likes: cat.count_likes,
                            count_posts: cat.count_posts,
                            eye_color: cat.eye_color,
                            hair_color: cat.hair_color,
                            hurt: cat.hurt,
                            meal_time: cat.meal_time,
                            neuter: cat.neuter,
                            reg_date: cat.reg_date,
                            sex: cat.sex,
                            skin_disease: cat.skin_disease,
                        })
                    }
                });
            }
            return array;
        },
    },
    methods: {
        ...mapActions('storeCat',[
            'getCatList',
        ]),
    }
}
</script>

<style lang="scss" scoped>
#catList {
    text-align: center;
    .emptySpace {
        // display: block;
        height: 100px;
        text-align: center;
    }
}
#mapView {
    display: inline-block;
    width: 90vw;
    height: 50vw; 
}
</style>