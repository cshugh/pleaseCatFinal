// 고양이 정보와 관련된 Vuex Store Module
import axios from 'axios'
import CatApi from "@/apis/CatApi"

export default {
    namespaced: true,
    state: {
        newsFeedList: [],
        busy: false,
        limit: 2,
        page: 0,
        likes: [],
        unlikes: [],
    },
    getters: { // (state, getters, rootState, rootGetters)
        newsFeedList: state => {
            return state.newsFeedList
        },
        lengthOfNewsFeedList: state => {
            return state.newsFeedList.length;
        },
        busy: state => {
            return state.busy;
        },
        limit: state => {
            return state.limit;
        },
        page: state => {
            return state.page;
        },
        likes: state => {
            return state.likes;
        },
        unlikes: state => {
            return state.unlikes;
        },
    },
    // mutations : 동기 처리 logic
    mutations: { // (state, rootState?)
        /*
            state.catList을 업데이트
            호출 위치 : storeCat/getCatList
        */
        pagePlus(state, payload, rootState) {
            state.page++;
        },
        setDetail(state, payload, rootState) {
            state.newsFeedList[payload.page].detail = "Init";
            if (state.newsFeedList[payload.page].post_content.length > 36)
                state.newsFeedList[payload.page].detail = "true";
        },
        setNewsFeedIndex(state, payload, rootState) {
            // state.postNo = state.newsFeedList[payload.page].post_no;
            state.newsFeedList[payload.page].newsFeedIndex = state.page;
        },
        setNewsFeedLike(state, payload, rootState) {
            // console.log(state.likes)
            for (var i = 0; i < state.likes.length; i++) {
                if (state.newsFeedList[payload.page].post_no == state.likes[i].post_no) {
                    state.newsFeedList[payload.page].like = true;
                }
            }
            for (var j = 0; j < state.unlikes.length; j++) {
                if (state.newsFeedList[payload.page].post_no == state.unlikes[j].post_no) {
                    state.newsFeedList[payload.page].unlike = true;
                }
            }
        },
        changeNewsFeedList(state, payload, rootState) {
            state.newsFeedList = state.newsFeedList.concat(payload.append);
        },
        changePostTime(state, payload, rootState) {
            if (state.newsFeedList[payload.page].post_time < 1) {
                state.newsFeedList[payload.page].post_time = "방금 전";
            } else if (state.newsFeedList[payload.page].post_time < 60) {
                state.newsFeedList[payload.page].post_time =
                    state.newsFeedList[payload.page].post_time + "분 전";
            } else if (state.newsFeedList[payload.page].post_time < 1440) {
                state.newsFeedList[payload.page].post_time =
                    Math.floor(state.newsFeedList[payload.page].post_time / 60) + "시간 전";
            } else if (state.newsFeedList[payload.page].post_time < 10080) {
                state.newsFeedList[payload.page].post_time =
                    Math.floor(state.newsFeedList[payload.page].post_time / 1440) + "일 전";
            } else if (state.newsFeedList[payload.page].post_time < 44640) {
                state.newsFeedList[payload.page].post_time =
                    Math.floor(state.newsFeedList[payload.page].post_time / 10080) + "주 전";
            } else if (state.newsFeedList[payload.page].post_time < 525600) {
                state.newsFeedList[payload.page].post_time =
                    Math.floor(state.newsFeedList[payload.page].post_time / 44640) +
                    "개월 전";
            } else {
                state.newsFeedList[payload.page].post_time =
                    Math.floor(state.newsFeedList[payload.page].post_time / 525600) +
                    "년 전";
            }
        },
    },
    // actions : 비동기 처리 logic
    actions: { // ({ dispatch, commit, getters, rootGetters }, data) : context. 생략
        /*
            DB에서 모든 고양이 정보를 읽어옴 -> storeCat/changeCatList 호출
            호출 위치 : App.vue
        */
        getUpdateLikes({ state, dispatch, commit, getters, rootGetters }, {postLike, postNo}) {
            axios.put(`${rootGetters.getServer}/api/post/updateLikes`, {
                post_like: postLike,
                post_no: postNo
            });
        }, getUpdateUnLikes({ state, dispatch, commit, getters, rootGetters }, {postLike, postNo}) {
            axios.put(`${rootGetters.getServer}/api/post/updateUnLikes`, {
                post_unlike: postLike,
                post_no: postNo
            });
        },
        getLikeActivation({ state, dispatch, commit, getters, rootGetters }, post_no) {
            axios.post(`${rootGetters.getServer}/api/Likes/insert?post_no=` + post_no + `&user_no=${rootGetters.getLoginInfo.user_no}`);
        },
        getLikeDisabled({ state, dispatch, commit, getters, rootGetters }, post_no) {
            axios.delete(`${rootGetters.getServer}/api/Likes/delete?post_no=` + post_no + `&user_no=${rootGetters.getLoginInfo.user_no}`);
        },
        getUnLikeActivation({ state, dispatch, commit, getters, rootGetters }, post_no) {
            axios.post(`${rootGetters.getServer}/api/Unlikes/insert?post_no=` + post_no + `&user_no=${rootGetters.getLoginInfo.user_no}`);
        },
        getUnLikeDisabled({ state, dispatch, commit, getters, rootGetters }, post_no) {
            axios.delete(`${rootGetters.getServer}/api/Unlikes/delete?post_no=` + post_no + `&user_no=${rootGetters.getLoginInfo.user_no}`);
        },
        getIsLike({ state, dispatch, commit, getters, rootGetters }) {
            axios.get(`${rootGetters.getServer}`+"/api/Likes/searchAllLikesOfUser?user_no="+`${rootGetters.getLoginInfo.user_no}`).then(({ data }) => {
                state.likes = data.data;
            }),
                axios.get(`${rootGetters.getServer}`+"/api/Unlikes/searchAllUnLikes?user_no="+`${rootGetters.getLoginInfo.user_no}`).then(({ data }) => {
                    state.unlikes = data.data;
                });
        },
        getNewsFeedList({ state, dispatch, commit, getters, rootGetters }) {
            state.busy = true;
            axios
                .get(`${rootGetters.getServer}/api/NewsFeed/searchAll/{follower_no}?follower_no=${rootGetters.getLoginInfo.user_no}`)
                .then(res => {
                    // handle success
                    let all = res.data.data;
                    console.log(all)
                    const append = all.slice(getters.lengthOfNewsFeedList, getters.lengthOfNewsFeedList + getters.limit)
                    state.busy = false;
                    if (append.length === 0) {
                        state.busy = true;
                    } else {
                        commit('changeNewsFeedList', { append: append });
                        for (var i = 0; i < getters.limit; i++) {
                            commit('changePostTime', { page: getters.page });
                            commit('setNewsFeedLike', { page: getters.page });
                            commit('setNewsFeedIndex', { page: getters.page });
                            commit('setDetail', { page: getters.page });
                            commit('pagePlus');
                        }
                    }
                })
                .catch(err => {
                    // handle error
                    console.error(err);
                    // commit('changeBusy', {value: false});
                    state.busy = false;
                });
        },
    },
};