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
        catDetail: null,
    },
    // mutations : 동기 처리 logic
    mutations: { // (state, rootState?)
        /*
            state.catList을 업데이트
            호출 위치 : storeCat/getCatList
        */
        changeCatDetail(state, payload, rootState) {
            console.log("change들어옴", payload.info.meal_time)
            if (payload.info.skin_disease == 1) {
                payload.info.skin_disease = "O";
            } else if (payload.info.skin_disease == 2) {
                payload.info.skin_disease = "X";
            } else {
                payload.info.skin_disease = "모름";
            }
            if (payload.info.neuter == 1) {
                payload.info.neuter = "O";
            } else if (payload.info.neuter == 2) {
                payload.info.neuter = "X";
            } else {
                payload.info.neuter = "모름";
            }
            if (payload.info.hurt == 1) {
                payload.info.hurt = "O";
            } else if (payload.info.hurt == 2) {
                payload.info.hurt = "X";
            } else {
                payload.info.hurt = "모름";
            }
            //밥 주는 시간
            console.log("시간바꾸러옴")
            if (payload.meal_time != null) {
                if (payload.meal_time < 1) {
                    payload.info.meal_time = "방금 전";
                } else if (payload.meal_time < 60) {
                    payload.info.meal_time =
                        payload.info.meal_time + "분 전";
                } else if (payload.meal_time < 1440) {
                    payload.info.meal_time =
                        Math.floor(payload.meal_time / 60) + "시간 전";
                } else if (payload.meal_time < 10080) {
                    payload.info.meal_time =
                        Math.floor(payload.meal_time / 1440) + "일 전";
                } else if (payload.meal_time < 44640) {
                    payload.info.meal_time =
                        Math.floor(payload.meal_time / 10080) + "주 전";
                } else if (payload.meal_time < 525600) {
                    payload.info.meal_time =
                        Math.floor(payload.meal_time / 44640) +
                        "개월 전";
                } else {
                    payload.info.meal_time =
                        Math.floor(payload.meal_time / 525600) +
                        "년 전";
                }
            } else {
                payload.info.meal_time = "모름";
            }
            state.catList = payload;
            // console.log('Finally End getCatList')
            console.log("작동함", state.catDetail.meal_time);
        },
        changeSelectedCat(state, payload, rootState) {
            state.selectedCat = payload;
        },
        setCatList(state, payload, rootState) {
            state.catList = payload.res;
        },
        setCatDetail(state, payload, rootState) {
            state.catDetail = payload.res;
        },
        changeNearCatList(state, payload, rootState) {
            state.nearCatList = payload;
        },
        changeCatFollowerList(state, payload, rootState) {
            state.selectedCatFollowerList = payload;
        },
        changeUserFollowingCatList(state, payload, rootState) {
            state.userFollowingCatList = payload;
        },
        changeMyFollowingCatList(state, payload, rootState) {
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
        getSetMealTime({ state, dispatch, commit, getters, rootGetters }, catNo) {
            axios.put(`${rootGetters.getServer}/api/cat/updateMealTime`, {
                cat_no: catNo
            }).then(() => {
                dispatch('getCatDetail', catNo)
            });
        },
        getCatList({ state, dispatch, commit, getters, rootGetters }) {
            axios
                .get(`${rootGetters.getServer}/api/cat/searchAll`)
                .then(res => {
                    // handle success
                    commit('setCatList', { res: res.data.data });
                })
                .catch(err => {
                    // handle error
                })
                .then(() => {
                    // always executed
                });
        },
        getSelectedCat({ dispatch, commit, getters, rootGetters }, data) {
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
        getCatDetail({ dispatch, commit, getters, rootGetters }, data) {
            axios
                .get(`${rootGetters.getServer}/api/cat/searchCat?Cat_no=${data}`)
                .then(res => {
                    // handle success
                    console.log("db정보", res.data.data);
                    console.log("db정보", res.data.data.meal_time);
                    commit('setCatDetail', { res: res.data.data });
                    commit('changeCatDetail', { info: getters.catDetail, meal_time: res.data.data.meal_time});
                })
                .catch(err => {
                    // handle error
                })
                .then(() => {
                    // always executed
                    // console.log(vm.man);
                });
        },
        getNearCatList({ dispatch, commit, getters, rootGetters }, data) {
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
        getCatFollowerList({ dispatch, commit, getters, rootGetters }, data) {
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
        getUserFollowingCatList({ dispatch, commit, getters, rootGetters }, data) {
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
        getMyFollowingCatList({ dispatch, commit, getters, rootGetters }, data) {
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
        postAddFollow({ dispatch, commit, getters, rootGetters }, data) {
            axios
                .post(`${rootGetters.getServer}/api/FollwoingCat/insert?cat_no=${data}&follower_no=${rootGetters.getLoginInfo.user_no}`)
                .then(res => {
                    // handle success
                    dispatch('getCatFollowerList', data);
                    dispatch('getMyFollowingCatList', rootGetters.getLoginInfo.user_no);
                })
                .catch(err => {
                    // handle error
                })
                .then(() => {
                    // always executed
                    // console.log(vm.man);
                });
        },
        deleteFollow({ dispatch, commit, getters, rootGetters }, data) {
            axios
                .delete(`${rootGetters.getServer}/api/FollwoingCat/delete?cat_no=${data}&follower_no=${rootGetters.getLoginInfo.user_no}`)
                .then(res => {
                    // handle success
                    dispatch('getCatFollowerList', data);
                    dispatch('getMyFollowingCatList', rootGetters.getLoginInfo.user_no);
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
        catDetail: state => {
            return state.catDetail;
        },
        catList: state => {
            return state.catList;
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
        },
        catSexArray: state => {
            // console.log("making array...")
            let maleCnt = 0,
                femaleCnt = 0,
                spayedMaleCnt = 0,
                spayedFemaleCnt = 0;

            state.catList.forEach(catData => {
                if (catData.sex === "남") {
                    if (catData.neuter) {
                        spayedMaleCnt += 1;
                    } else {
                        maleCnt += 1;
                    }
                } else if (catData.sex === "여") {
                    if (catData.neuter) {
                        spayedFemaleCnt += 1;
                    } else {
                        femaleCnt += 1;
                    }
                }
            });
            // console.log(maleCnt, femaleCnt, spayedMaleCnt, spayedFemaleCnt)
            return [maleCnt, femaleCnt, spayedMaleCnt, spayedFemaleCnt]
        },
        catAgeArray: state => {
            let age1 = 0,
                age2 = 0,
                age3 = 0,
                age4 = 0,
                age5 = 0,
                age6up = 0;

            state.catList.forEach(catData => {
                if (catData.age <= 1) {
                    age1 += 1;
                } else if (catData.age <= 2) {
                    age2 += 1;
                } else if (catData.age <= 3) {
                    age3 += 1;
                } else if (catData.age <= 4) {
                    age4 += 1;
                } else if (catData.age <= 5) {
                    age5 += 1;
                } else {
                    age6up += 1;
                }
            })
            return [age1, age2, age3, age4, age5, age6up]
        },
        catHealthArray: state => {
            //"건강 양호","외상 및 상처","피부병",  // 추가사항: "설사병","감염증","기타" 
            let health1Cnt_normal = 0,
                health2Cnt_hurt = 0,
                health3Cnt_skin_disease = 0;
            // health4Cnt_diarrhea = 0,
            // health5Cnt_infectious_diseases = 0,
            // health6Cnt_etc = 0;

            state.catList.forEach(catData => {
                if (catData.hurt === 1) {
                    health2cnt_hurt += 1;
                    if (catData.skin_disease === 1) {
                        health3Cnt_skin_disease += 1;
                    } else {
                        ;
                    }
                } else {
                    if (catData.skin_disease === 1) {
                        health3Cnt_skin_disease += 1;
                    } else {
                        health1Cnt_normal += 1;
                    }
                }
                // if( catData.hurt === 0 & catData.skin_disease === 0){
                //     health1Cnt_normal+=1;
                // }
                // if (catData.hurt === 1){
                //     health2cnt_hurt += 1;
                // }
                // if (catData.skin_disease === 1){
                //     health3Cnt_skin_disease +=1 ;
                // }
                // if (catData.skin_disease === 1){
                //     health4Cnt_diarrhea +=1;
                // }
                // if (catData.skin_disease === 1){
                //     health5Cnt_infectious_diseases +=1;
                // }
                // if (catData.skin_disease === 1){
                //     health6Cnt_etc +=1;
                // }                
            })
            return [health1Cnt_normal, health2Cnt_hurt, health3Cnt_skin_disease,]
        }

    }
};