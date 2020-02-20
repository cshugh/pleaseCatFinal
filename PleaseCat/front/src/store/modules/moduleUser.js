// 유저 정보와 관련된 Vuex Store Module
import axios from 'axios'

export default {
    namespaced: true,
    modules:{
        storeRank: {
            namespaced: true,
            state: {
                rankList: null,
                myRank: null,
            },
            getters: {
                rankList: (state) => {
                    return state.rankList;
                },
                myRank: (state) => {
                    return state.myRank;
                },
            },
            mutations: {
                changeRankList: (state, payload) => {
                    state.rankList = payload.data;
                },
                changeMyRank: (state, payload) => {
                    state.myRank = payload.data;
                },
            },
            actions: {
                getRankList({ dispatch, commit, getters, rootGetters }, data){
                    axios
                    .get(`${rootGetters.getServer}/api/Ranking/searchRankingCat?cat_no=${data.cat_no}`)
                    // .get(`${rootGetters.getServer}/api/cat/searchCat?Cat_no=${data.cat_no}`)
                    .then(res => {
                        // handle success
                        commit('changeRankList', res.data);
                    })
                    .catch(err => {
                        // handle error
                    })
                    .then(() => {
                        // always executed
                    });
                },
                getMyRank({ dispatch, commit, getters, rootGetters }, data){
                    axios
                    .get(`${rootGetters.getServer}/api/Ranking/searchMyRank?cat_no=${data.cat_no}&user_no=${rootGetters.getLoginInfo.user_no}`)
                    // .get(`${rootGetters.getServer}/api/cat/searchCat?Cat_no=${data.cat_no}`)
                    .then(res => {
                        // handle success
                        commit('changeMyRank', res.data);
                    })
                    .catch(err => {
                        // handle error
                    })
                    .then(() => {
                        // always executed
                    });
                }
            },
        },
    },
    state: {
        userList: '',
        myFollowerList: [],
        myFollowingUserList: [],
        selectedUser: null,
        selectedUserFollowerList: [],   // 팔로잉 하는 목록
        selectedUserFollowedList: [],   // 팔로우 당하는 목록
    },
    mutations: { // (state, payload, rootState?)
        changeUserList(state, payload, rootState) {
            state.userList = payload;
        },
        changeSelectedUser(state, payload, rootState) {
            state.selectedUser = payload;
        },
        changeUserFollowerList(state, payload, rootState){
            state.selectedUserFollowerList = payload;
        },
        changeUserFollowedList(state, payload, rootState){
            state.selectedUserFollowedList = payload;
        },
        changeMyFollowingUserList(state, payload, rootState){
            state.myFollowingUserList = payload;
        },
        changeMyFollowingCatList(state, payload, rootState){
            state.myFollowingCatList = payload;
        },
        changeMyFollowedList(state, payload, rootState){
            state.myFollowerList = payload;
        },
        clearSelectedUser(state, payload) {
            state.selectedUser = null;
        }
    },
    actions: { // ({ dispatch, commit, getters, rootGetters }, data, ...) 'context.'는 생략
        getUserList({ dispatch, commit, getters, rootGetters }) {
            axios
                .get(`${rootGetters.getServer}/api/user/searchAll`)
                .then(res => {
                    // handle success
                    commit('changeUserList', res.data.data);
                })
                .catch(err => {
                    // handle error
                })
                .then(() => {
                    // always executed
                    // console.log(vm.man);
                });
        },
        getSelectedUser({ dispatch, commit, getters, rootGetters },data){
            axios
                .get(`${rootGetters.getServer}/api/user/searchUserNo?user_no=${data}`)
                .then(res => {
                    // handle success
                    var userInfo = res.data.data;
                    commit('changeSelectedUser', userInfo);
                })
                .catch(err => {
                    // handle error
                })
                .then(() => {
                    // always executed
                    // console.log(vm.man);
                });
        },
        getUserFollowerList({ dispatch, commit, getters, rootGetters },data){
            axios
                .get(`${rootGetters.getServer}/api/FollwoingUser/searchFollwerUser?follower_no=${data}`)
                .then(res => {
                    // handle success
                    var followerArray = res.data.data;
                    commit('changeUserFollowerList', followerArray);
                })
                .catch(err => {
                    // handle error
                })
                .then(() => {
                    // always executed
                    // console.log(vm.man);
                });
        },
        getUserFollowedList({ dispatch, commit, getters, rootGetters },data){
            axios
                .get(`${rootGetters.getServer}/api/FollwoingUser/searchFollowedUser?followed_no=${data}`)
                .then(res => {
                    // handle success
                    var followerArray = res.data.data;
                    commit('changeUserFollowedList', followerArray);
                })
                .catch(err => {
                    // handle error
                })
                .then(() => {
                    // always executed
                    // console.log(vm.man);
                });
        },        
        getMyFollowingUserList({ dispatch, commit, getters, rootGetters }){
            axios
                .get(`${rootGetters.getServer}/api/FollwoingUser/searchFollwerUser?follower_no=${rootGetters.getLoginInfo.user_no}`)
                .then(res => {
                    // handle success
                    var followerArray = res.data.data;
                    commit('changeMyFollowingUserList', followerArray);
                })
                .catch(err => {
                    // handle error
                })
                .then(() => {
                    // always executed
                    // console.log(vm.man);
                });
        },
        getMyFollowedList({ dispatch, commit, getters, rootGetters }){
            axios
                .get(`${rootGetters.getServer}/api/FollwoingUser/searchFollowedUser?followed_no=${rootGetters.getLoginInfo.user_no}`)
                .then(res => {
                    // handle success
                    var followerArray = res.data.data;
                    commit('changeMyFollowedList', followerArray);
                })
                .catch(err => {
                    // handle error
                })
                .then(() => {
                    // always executed
                    // console.log(vm.man);
                });
        },        
        postAddFollow({ dispatch, commit, getters, rootGetters },data){
            axios
                .post(`${rootGetters.getServer}/api/FollwoingUser/insert?followed_no=${data}&follower_no=${rootGetters.getLoginInfo.user_no}`)
                .then(res => {
                    // handle success
                    dispatch('getMyFollowingUserList');
                    dispatch('getUserFollowedList', data);
                })
                .catch(err => {
                    // handle error
                })
                .then(() => {
                    // always executed
                    // console.log(vm.man);
                });
        },        
        deleteFollow({ dispatch, commit, getters, rootGetters },data){
            axios
                .delete(`${rootGetters.getServer}/api/FollwoingUser/delete?followed_no=${data}&follower_no=${rootGetters.getLoginInfo.user_no}`)
                .then(res => {
                    // handle success
                    dispatch('getMyFollowingUserList');
                    dispatch('getUserFollowedList', data);
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
        userList: state => {
            return state.userList;
        },
        selectedUser: state => {
            return state.selectedUser;
        },
        selectedUserFollowerList: state => {
            return state.selectedUserFollowerList;
        },
        selectedUserFollowedList: state => {
            return state.selectedUserFollowedList;
        },
        myFollowerList: state => {
            return state.myFollowerList;
        },
        myFollowingUserList: state => {
            return state.myFollowingUserList;
        },
        myFollowingCatList: state => {
            return state.myFollowingCatList;
        },

        userSexArray:state => {
            let maleCnt = 0,
                femaleCnt = 0;

            state.userList.forEach(userData => {
                if( userData.sex ==="남") {
                    maleCnt += 1;
                } else if (userData.sex ==="여") {
                    femaleCnt += 1;
                }
            });
            return [maleCnt,femaleCnt]
        },
        userAgeArray:state => {
            let age0 = 0,
                age10 = 0,
                age20 = 0,
                age30 = 0,
                age40 = 0,
                age50up = 0;

            state.userList.forEach(userData => {
                if( userData.age < 10 ){
                    age0 += 1;
                }else if ( userData.age < 20 ){
                    age10 += 1;
                }else if ( userData.age < 30 ){
                    age20 += 1;
                }else if ( userData.age < 40 ){
                    age30 += 1;
                }else if ( userData.age < 50 ){
                    age40 += 1;
                }else {
                    age50up += 1;
                }
            })
            return [age0, age10, age20, age30, age40, age50up]
        },
    }
};