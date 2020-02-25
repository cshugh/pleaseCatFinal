import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import moduleCat from './modules/moduleCat'
import moduleUser from './modules/moduleUser'
import modulePost from './modules/modulePost'
import moduleNewsFeed from './modules/moduleNewsFeed'
// import moduleDashboard from '.modules/modulDashboard'
import router from '@/router/index'
import moduleDetailPost from './modules/moduleDetailPost'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        storeNewsFeed: moduleNewsFeed,
        storeCat: moduleCat,
        storeUser: moduleUser,
        storePost: modulePost,
        storeDetailPost: moduleDetailPost,
    },
    state: {
        server: 'http://localhost:8080',
        // server: 'http://70.12.246.120:8080/',
        // server: 'http://13.124.251.3:8080',
        token: '',
        loginInfo: null, // 로그인 회원 정보
        isLogin: false, // 로그인 여부
        userLoc: { lat: 1, lng: 1 }, // 유저 현재 위치
        dist: 1000, // '근처' 의 기준이 될 meter 단위 반경
        newAlarm: [],
    },
    getters: {
        getServer: state => { return state.server },
        getToken: state => { return state.token },
        getLoginInfo: state => { return state.loginInfo },
        getIsLogin: state => { return state.isLogin },
        getUserLoc: state => { return state.userLoc },
        getDist: state => { return state.dist },
        newAlarm: state => { return state.newAlarm },
    },
    mutations: {
        changeToken(state, payload) {
            state.token = payload.data;
        },
        changeLoginId(state, payload, rootState) {
            state.loginInfo = payload;
            state.isLogin = true;
        },
        changeLogout(state) {
            state.isLogin = false;
            state.loginInfo = '';
            state.token = '';
            localStorage.removeItem('savedToken');
        },
        changeUserLoc(state, payload) {
            state.userLoc = payload;
        },
        changeDist(state, payload) {
            state.dist = payload;
        },
        changeNewAlarm(state, payload) {
            state.newAlarm = payload;
        },
        deleteAlarm(state, payload) {
            var k = payload;
            var tmp1 = state.newAlarm.slice(0, k);
            var tmp2 = state.newAlarm.slice(k + 1, state.newAlarm.length);
            state.newAlarm = tmp1.concat(tmp2);
        }
    },
    actions: {
        logout({ state, dispatch, commit, getters, rootGetters }) {
            commit('changeLogout');
        },
        postLogin({ state, dispatch, commit, getters, rootGetters }, data) {
            axios
                .post(`${getters.getServer}/api/user/login`, data)
                .then(res => {
                    // handle success
                    // console.log(res.data);
                    let token = res.data.data;
                    localStorage.setItem('savedToken', token);
                    dispatch('checkToken');
                    router.push("/newsfeed");
                })
                .catch(err => {
                    // handle error
                    console.error(err);
                })
                .then(() => {
                    // always executed
                });
        },
        postSignUp({ state, dispatch, commit, getters, rootGetters }, fd) {
            axios
                .post(`${getters.getServer}/api/user/insert`, fd, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                .then((res) => {
                    console.log(res);
                    if (res.data.state === 'ok') {
                        router.push('/');
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        checkToken({ state, dispatch, commit, getters, rootGetters }, callBack) {
            // 토큰을 헤더에 포함시켜서 유저 정보를 요청
            let token = localStorage.getItem('savedToken');

            let config = {
                headers: {
                    "token": token,
                }
            }
            axios
                .get(`${getters.getServer}/api/user/checkToken`, config)
                .then(response => {
                    var obj = eval("(" + response.data.data + ")");
                    if (response.data.state === 'ok') {
                        commit('changeLoginId', obj);
                        dispatch('storePost/getMyPosts', state.loginInfo.user_no)
                        dispatch('storeUser/getMyFollowingUserList', state.loginInfo.user_no)
                        dispatch('storeUser/getMyFollowedList', state.loginInfo.user_no)
                        dispatch('storeCat/getMyFollowingCatList', state.loginInfo.user_no)
                        dispatch('storeNewsFeed/getIsLike')
                        dispatch('getNewAlarm')
                    } else {
                        dispatch('logout');
                    }
                    // console.log(obj);
                })
                .catch(error => {
                    console.error(error);
                })
        },
        findUserLoc({ state, dispatch, commit, getters, rootGetters }) {
            // console.log('위치찾기');
            commit('changeUserLoc', { lat: 37.507072, lng: 127.0366208 });
            if (navigator) {
                // GeoLocation을 이용해서 접속 위치를 얻어옵니다
                navigator.geolocation.getCurrentPosition(function(position) {
                    var lat = position.coords.latitude, // 위도
                        lon = position.coords.longitude; // 경도
                    commit('changeUserLoc', { lat: lat, lng: lon });
                });
            }
        },
        getNewAlarm({ state, dispatch, commit, getters, rootGetters }) {
            axios
                .get(`${getters.getServer}/api/user/searchAlarm?user_no=${getters.getLoginInfo.user_no}`)
                .then(res => {
                    if (res.data.state === 'ok') {
                        const list = res.data.data;
                        commit('changeNewAlarm', list);
                    } else {
                        commit('changeNewAlarm', []);
                    }
                    // console.log(obj);
                })
                .catch(error => {
                    console.error(error);
                })
        },
        readAlarm({ state, dispatch, commit, getters, rootGetters }, data) {
            axios
                .get(`${getters.getServer}/api/user/readAlarm?post_no=${data}`)
                .then(res => {

                })
                .catch(error => {
                    console.error(error);
                })
        },
    },
})


/*
  Vue 에서 Module store 접근 시
  import { createNamespacedHelpers } from 'vuex'

  const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')

  export default {
    computed: {
      // `some/nested/module`에서 찾음
      ...mapState({
        a: state => state.a,
        b: state => state.b
      })
    },
    methods: {
      // `some/nested/module`에서 찾음
      ...mapActions([
        'foo',
        'bar'
      ])
    }
  }
*/