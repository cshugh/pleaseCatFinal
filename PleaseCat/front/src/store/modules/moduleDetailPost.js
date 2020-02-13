// 고양이 정보와 관련된 Vuex Store Module
import axios from 'axios'
import CatApi from "@/apis/CatApi"

export default {
    namespaced: true,
    state: {
        detailPostList: [],
        busy: false,
        limit: 2,
        page: 0,
        post_image: "",
        post_content: "",
    },
    getters: { // (state, getters, rootState, rootGetters)
        detailPostList: state => {
            return state.detailPostList
        },
        lengthOfdetailPostList: state => {
            return state.detailPostList.length;
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
        post_image: state => {
            return state.post_image;
        },
        post_content: state => {
            return state.post_content;
        }
    },
    // mutations : 동기 처리 logic
    mutations: { // (state, rootState?)
        /*
            state.catList을 업데이트
            호출 위치 : storeCat/getCatList
        */
        changeDetailPostTime(state, payload, rootState) {
            if (state.detailPostList[payload.page].comment_time < 1) {
                state.detailPostList[payload.page].comment_time = "방금 전";
            } else if (state.detailPostList[payload.page].comment_time < 60) {
                state.detailPostList[payload.page].comment_time =
                    state.detailPostList[payload.page].comment_time + "분 전";
            } else if (state.detailPostList[payload.page].comment_time < 1440) {
                state.detailPostList[payload.page].comment_time =
                    Math.floor(state.detailPostList[payload.page].comment_time / 60) + "시간 전";
            } else if (state.detailPostList[payload.page].comment_time < 44640) {
                state.detailPostList[payload.page].comment_time =
                    Math.floor(state.detailPostList[payload.page].comment_time / 1440) + "일 전";
            } else if (state.detailPostList[payload.page].comment_time < 525600) {
                state.detailPostList[payload.page].comment_time =
                    Math.floor(state.detailPostList[payload.page].comment_time / 44640) +
                    "개월 전";
            } else {
                state.detailPostList[payload.page].comment_time =
                    Math.floor(state.detailPostList[payload.page].comment_time / 525600) +
                    "년 전";
            }
        },
        pagePlus(state, payload, rootState) {
            state.page++;
        },
        detailPostListSet(state, payload, rootState) {
            state.detailPostList = [];
            state.page=0;
        },
        setDetailPostInfo(state, payload, rootState) {
            state.post_image = payload.data.data.post_image;
            state.post_content = payload.data.data.post_content;
        },
        changeDetailPostList(state, payload, rootState) {
            state.detailPostList = state.detailPostList.concat(payload.append);
        },
    },
    // actions : 비동기 처리 logic
    actions: { // ({ dispatch, commit, getters, rootGetters }, data) : context. 생략
        /*
            DB에서 모든 고양이 정보를 읽어옴 -> storeCat/changeCatList 호출
            호출 위치 : App.vue
        */
        getSetDetailPost({ state, dispatch, commit, getters, rootGetters }){
            commit('detailPostListSet');
        },
        getDetailPostList({ state, dispatch, commit, getters, rootGetters }, post_no) {
            console.log(post_no);
            state.busy = true;
            axios
                .get(`${rootGetters.getServer}/api/commentPage/searchCommentPagePost/{Post_no}?Post_no=` + post_no)
                .then(res => {
                    // handle success
                    let all = res.data.data;
                    const append = all.slice(getters.lengthOfdetailPostList, getters.lengthOfdetailPostList + getters.limit)
                    state.busy = false;
                    if (append.length === 0) {
                        state.busy = true;
                    } else {
                        commit('changeDetailPostList', { append: append });
                        for (var i = 0; i < getters.limit; i++) {
                            commit('changeDetailPostTime', { page: getters.page });
                            commit('pagePlus');
                        }
                    }
                    console.log(state.busy);
                })
                .catch(err => {
                    // handle error
                    console.error(err);
                    state.busy = false;
                });
        },
        getDetailPostInfo({ state, dispatch, commit, getters, rootGetters }, post_no) {
            axios
                .get(`${rootGetters.getServer}/api/post/searchPost/{Post_no}?Post_no=` + post_no)
                .then(({ data }) => {
                    commit('setDetailPostInfo', { data: data });
                })
        },
    },
};