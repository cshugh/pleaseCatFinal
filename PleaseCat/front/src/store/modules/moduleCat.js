// 고양이 정보와 관련된 Vuex Store Module
import axios from 'axios'
import CatApi from "@/apis/CatApi"

export default {
    namespaced: true,
    state: {
        catList: [],
        selectedCat: null,
        nearCatList: [],
        selectedCatFollowerList: [],
        userFollowingCatList: [],
        myFollowingCatList: [],
    },
    // mutations : 동기 처리 logic
    mutations: { // (state, rootState?)
        /*
            state.catList을 업데이트
            호출 위치 : storeCat/getCatList
        */
        changeCatList(state, payload, rootState) {
            state.catList = payload;
            // console.log('Finally End getCatList')
        },
        changeSelectedCat(state, payload, rootState) {
            state.selectedCat = payload;
        },
        changeNearCatList(state, payload, rootState) {
            state.nearCatList = payload;
        },
        changeCatFollowerList(state, payload, rootState){
            state.selectedCatFollowerList = payload;
        },
        changeUserFollowingCatList(state, payload, rootState){
            state.userFollowingCatList = payload;
        },
        changeMyFollowingCatList(state, payload, rootState){
            state.myFollowingCatList = payload;
        },
        clearSelectedCat(state, payload) {
            state.selectedCat = null;
            state.selectedCatFollowerList = [];
        },
    },
    // actions : 비동기 처리 logic
    actions: { // ({ dispatch, commit, getters, rootGetters }, data) : context. 생략
        /*
            DB에서 모든 고양이 정보를 읽어옴 -> storeCat/changeCatList 호출
            호출 위치 : App.vue
        */
        getCatList({ state, dispatch, commit, getters, rootGetters }) {
            axios
                .get(`${rootGetters.getServer}/api/cat/searchAll`)
                .then(res => {
                    // handle success
                    commit('changeCatList', res.data.data);
                })
                .catch(err => {
                    // handle error
                })
                .then(() => {
                    // always executed
                });
        },
        getSelectedCat({ dispatch, commit, getters, rootGetters },data){
            axios
                .get(`${rootGetters.getServer}/api/cat/searchCat?Cat_no=${data}`)
                .then(res => {
                    // handle success
                    var catInfo = res.data.data;
                    commit('changeSelectedCat', catInfo);
                })
                .catch(err => {
                    // handle error
                })
                .then(() => {
                    // always executed
                    // console.log(vm.man);
                });
        },
        getNearCatList({ dispatch, commit, getters, rootGetters },data){
            axios
                .get(`${rootGetters.getServer}/api/cat/searchCat?Cat_no=${data}`)
                .then(res => {
                    // handle success
                    var catInfo = res.data.data;
                    commit('changeSelectedCat', catInfo);
                })
                .catch(err => {
                    // handle error
                })
                .then(() => {
                    // always executed
                    // console.log(vm.man);
                });
        },
        getCatFollowerList({ dispatch, commit, getters, rootGetters },data){
            axios
                .get(`${rootGetters.getServer}/api/FollwoingCat/searchFollwerCat?cat_no=${data}`)
                .then(res => {
                    // handle success
                    var followerArray = res.data.data;
                    commit('changeCatFollowerList', followerArray);
                })
                .catch(err => {
                    // handle error
                })
                .then(() => {
                    // always executed
                    // console.log(vm.man);
                });
        },
        getUserFollowingCatList({ dispatch, commit, getters, rootGetters },data){
            axios
                .get(`${rootGetters.getServer}/api/FollwoingCat/searchFollowedCat?follower_no=${data}`)
                .then(res => {
                    // handle success
                    var followerArray = res.data.data;
                    commit('changeUserFollowingCatList', followerArray);
                })
                .catch(err => {
                    // handle error
                })
                .then(() => {
                    // always executed
                    // console.log(vm.man);
                });
        },
        getMyFollowingCatList({ dispatch, commit, getters, rootGetters },data){
            axios
                .get(`${rootGetters.getServer}/api/FollwoingCat/searchFollowedCat?follower_no=${data}`)
                .then(res => {
                    // handle success
                    var followerArray = res.data.data;
                    commit('changeMyFollowingCatList', followerArray);
                })
                .catch(err => {
                    // handle error
                })
                .then(() => {
                    // always executed
                    // console.log(vm.man);
                });
        },
    },
    getters: { // (state, getters, rootState, rootGetters)
        catList: state => {
            return state.catList
        },
        selectedCat: state => {
            return state.selectedCat;
        },
        selectedCatFollowerList: state => {
            return state.selectedCatFollowerList;
        },
        userFollowingCatList: state => {
            return state.userFollowingCatList;
        },
        myFollowingCatList: state => {
            return state.myFollowingCatList;
        }
    }
};