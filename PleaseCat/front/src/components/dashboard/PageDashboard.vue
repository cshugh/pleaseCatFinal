
<template>
  <!-- 대쉬보드 페이지 - 전체 part - 유저 데이터 : 관리자용 계획 -->

  <!-- (1) 고양이 현황 페이지 월별 고양이 등록자 현황 : line-chart -->
  <!-- (2) 월별 사용자 현황 : line-chart
  : 성별 / 나이 / (접속[주 활동] 시간**)-->

  <!-- 기타 내용 -->
      <!-- selectOption 만들기**  v-if="selectOption === 0" -->

<!-- 1) 현재 유저 아이디를 가져온다. -->
<!-- 2) -->
<div id='page-alignment'>
  <div id='dashboard' class="page">
    <div class="emptySpace">-Navigation Bar-</div>


      <div class="dashboardView" >

        <div>
          <h1>고양이를 부탁캣 대쉬보드</h1>
        </div>
     </div>
    </div>
  
  <!-- 고양이를 선택하는 모달 부분 가져오기 #$#1 -->
    <div class="btn-wrap">
      <div class="modal selectCat">

        <!-- id="btn-show-modal-cat" -->
        <!-- class="btn-convert-dashboard" -->
        <button
          class="btn-convert-dashboard"
          @click=" showModalSelectCat = true"
        >
          <div id="lb-tagCat">내 팔로우 고양이 선택</div>
          <!-- selectedCat 을 selected_cat_no 로 변경! #$#2 -->
          <div id="lb-selectedCat">{{selectedCat.cat_name}}고양이 번호:{{ selected_cat_no }}</div>
          <div style="clear:both:"></div>
        </button>

        <modal
          v-if="showModalSelectCat"
          @close="showModalSelectCat = false"
        >
          <h3
            slot="header"
            style="margin-top:6px; color: #1d2f3a; font-weight: 550;"
          >찾는 고양이가 있나요?</h3>

          <div slot="footer">

            <button
              class="btn-selectCat"
              v-for="nc in myFollowingCatList"
              @click="tagCat(`${nc.cat_no}`), showModalSelectCat = false"
              :key=nc.cat_no
              
            >
              <div class="btn-circle-border">
                <img
                  class="btn-circle"
                  :src='require(`@/assets/images/cats/_profile/${ nc.cat_no }.jpg`)'
                />
                <!-- <img
                  class="btn-circle"
                  :src='`/static/images/cat/${ nc.no }.jpg`'
                /> -->
              </div>
              <p style="margin-top:4px">{{ nc.cat_name }}</p>
            </button>
          </div>

          <div
            slot="footer"
            class="modal-footer-addCat"
          >
            <!-- <button @click="showModalSelectCat = false"> 확인</button> -->
            이 중에 고양이가 없나요?
            <router-link :to="'/addcat'">
              <button
                class="btn-addNewCat"
                @click="showModalSelectCat = false"
              > 고양이 추가</button>
              <p></p>
            </router-link>
          </div>

        </modal>
      </div>
    

    <!-- 1. 버튼 클릭 UI -->
    <!-- 구별 데이터 구분을 위해 입력하는 곳 -->

      <!-- <v-row>
        <v-col cols="12">
          <p>myFollowingCatList</p>
          {{myFollowingCatList}}
        </v-col>
      </v-row>       
      <button class="btn-convert-dashboard">관심 고양이 보드</button>
      -->
  </div>
  
    <v-container fluid>
      <h1>관심 고양이 데이터</h1>
      <input style="{'background-color' : 'white'}" type="text" v-model.number="selected_cat_no"/>
      <v-row>
        <v-col cols="12">
          <p>내 팔로우 고양이 관리 랭킹 데이터</p>
          <div class="small">
            <bar-chart v-if="selectedCat != null" :chart-data="catRankChartData"></bar-chart>
          </div>
          
          <!-- <div v-if="rankList">
            <h3>{{ rankList }}</h3>
            <h3>{{ rankList.length }}</h3>
            <h3>두번째 랭킹 포인트: {{ rankList[1] }}</h3>
            <h3>세번째 랭킹 포인트: {{ rankList[2] }}</h3>
            <h3>내 랭킹 포인트: ??? </h3>
          </div> -->

        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          
                <p>내 팔로우 고양이 건강 데이터</p>
            <div class="small">
              <!-- && (rankList != null) -->
                <bar-chart v-if="selectedCat!=null" :chart-data="followCatHealthChartData"></bar-chart>
            </div>
        </v-col>
      </v-row>



      <h1>전체 고양이 데이터</h1>

      <v-row>
        <p>전체 고양이 수 : {{ totalCatNum }}명 ||</p>
        <p>전체 유저 수 : {{ totalUserNum }}명</p>
      </v-row>

      <v-row>
        <v-col cols="12">
          <!-- <p>전체 고양이 성별</p> -->
          <!-- <pie-chart :data="{'xBlueberry': 44, 'Strawberry': 23}"></pie-chart> -->
          <div v-if="catSexArray.length > 0">
            <div class="small">
              <p>전체 고양이 성별</p>
              <div id="pie">
                <pie-chart :data="catSexChartData" :options="chartOptions"></pie-chart>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <!-- <p>전체 고양이 성별</p> -->
          <!-- <pie-chart :data="{'xBlueberry': 44, 'Strawberry': 23}"></pie-chart> -->
          <div v-if="catSexArray.length > 0">
            <div class="small">
              <p>전체 고양이 중성화 비율</p>
              <div id="pie">
                <pie-chart :data="catNeuterChartData" :options="chartOptions"></pie-chart>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      
      <v-row>
        <!-- <p>전체 고양이 나이</p> -->
        <!-- 목적: 주요 고양이 통계, 관리용 -->
        <v-col cols="12">
          <div class="small">
            <p>전체 고양이 나이</p>
            <div id="pie">
              <pie-chart :data="catAgeChartData" :options="chartOptions"></pie-chart>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <!-- <p>전체 고양이 건강</p> -->
        <!-- 목적: 주요 고양이 통계, 관리용 -->
        <v-col cols="12">
          <div class="small">
            <p>전체 고양이 건강</p>
            <div id="pie">
              <pie-chart :data="catHealthChartData" :options="chartOptions"></pie-chart>
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- 시간별 등록 고양이 수 -->
      <!-- 목적 : 사업 관리용 -->
      <!-- v-if="selected_cat_no==1" -->
      <v-row >
        <h1>전체 사용자 데이터</h1>
        <v-col cols="12">
          <p>전체 사용자 성별</p>
          <div class="small">
            <div id="pie">
              <pie-chart :data="userSexChartData" :options="chartOptions"></pie-chart>
            </div>
          </div>
        </v-col>

        <v-col cols="12">
          <p>전체 사용자 나이</p>
          <div class="small">
            <div id="pie">
              <pie-chart :data="userAgeChartData" :options="chartOptions"></pie-chart>
            </div>
          </div>
        </v-col>
      </v-row>

      <!--                     width="800px"
                    height="300px"
      -->

      <!-- <h1> 전체(25개구 : 중성화 여부, 상처여부)/구별 데이터 </h1> -->
      <!-- datacollection_neut -->
      <!-- <h1> 전체(25개구 : 중성화 여부)/구별 데이터 </h1>

    <v-row>
        <v-col cols="12">
            <div class="big">
                <bar-chart
                    width="800px"
                    height="300px"
                    v-if="selectOption === 0"
                    :chart-data="datacollection"></bar-chart>
                <button @click="fillData()">Randomize</button>
            </div>   
        </v-col>
    </v-row>

    <h1> 전체(25개구 : 상처여부)/구별 데이터 </h1>
    <v-row>
        <v-col cols="12">
            <div class="big">
                <bar-chart
                    width="800px"
                    height="300px"
                    v-if="selectOption === 0"
                    :chart-data="datacollection"></bar-chart>
                <button @click="fillData()">Randomize</button>
            </div>   
        </v-col>
      </v-row>-->

      <!-- <pie-chart :data="{'Blueberry': 44, 'Strawberry': 23}"></pie-chart> -->
      <!-- 
   <h1> 전체 날짜별 성별 & 중성화 현황/구별 데이터  ||  전체 나이 현황/구별 데이터 </h1>
    <v-row>
        <v-col cols="4">
            <div class="small">
                <line-chart :chart-data="datacollection2"></line-chart>
                <button @click="fillData()">Randomize</button>
            </div>
        </v-col>    

        <v-col cols="4">
                
            <div class="small">
                <div id="pie">
                    <pie-chart :data="chartData" :options="chartOptions"></pie-chart>
                </div>
            </div>
      </v-col>-->

      <!-- <v-col cols="4">
            <div class="small">
                <line-chart :chart-data="datacollection3"></line-chart>
                <button @click="fillData()">Randomize</button>
            </div>
      </v-col>-->
      <!-- <v-col cols="4">
            <div class="small">
                <line-chart :chart-data="datacollection2"></line-chart>
                <button @click="fillData()">Randomize</button>
            </div>
      </v-col>-->
      <!-- </v-row> -->

      <!-- 고양이 한마리의 데이터! -->
      <!-- 서울 전체의 성별 / 내 지역 고양이의 성별 -->
      <!-- <h1>고양이 한마리의 데이터!</h1>
    <h1> 서울 전체의 성별 / 내 지역 고양이의 성별                    ||                       서울 전체 고양이 건강 상태 / 내 지역 고양이 건강 상태 </h1>

    <v-row>
        <v-col cols="6">
            <div class="small">
                <div id="pie">
                    <pie-chart :data="chartData" :options="chartOptions"></pie-chart>
                </div>
            </div>
      </v-col>-->

      <!-- 서울 전체 고양이 건강 상태 / 내 지역 고양이 건강 상태 -->
      <!-- <v-col cols="6">
            <div class="small">
                <div id="pie">
                    <pie-chart :data="chartData2" :options="chartOptions"></pie-chart>
                </div>
            </div>
        </v-col>
      </v-row>-->

      <!-- <v-row>
        <v-col cols="6">
            <div class="small">
                <div id="pie">
                    <pie-chart :data="chartData" :options="chartOptions"></pie-chart>
                </div>
            </div>
        </v-col>

        <v-col cols="6">
            <div class="small">
                <div id="pie">
                    <pie-chart :data="chartData2" :options="chartOptions"></pie-chart>
                </div>
            </div>
        </v-col>
      </v-row>-->

    </v-container>

  </div>
</template>

<script>
//**** import ****/
  // 모달 부분
import Modal from "@/components/post/modal/ModalAddPost.vue";
  // 차트 부분
import LineChart from "./js/LineChart.js";
import BarChart from "./js/BarChart.js";
import DoughnutChart from "./js/DoughnutChart";
import HorizontalBarChart from "./js/HorizontalBarChart";
import { mapActions, mapMutations, mapGetters, mapState } from "vuex";
import PieChart from "./js/PieChart.js";

export default {
  components: {
    Modal: Modal,

    LineChart,
    BarChart,
    DoughnutChart,
    HorizontalBarChart,
    PieChart
  },
  computed: {
    ...mapState("storeCat", ["test"]),
    ...mapGetters('storeUser/storeRank',['rankList',]),
    ...mapGetters(["getUserLoc"]),
    ...mapGetters("storeCat", [
      "catList",
      "selectedCat",
      "catSexArray",
      "catAgeArray",
      "catHealthArray",
      'myFollowingCatList'
    ]),
    ...mapGetters("storeUser", ["userList", "userSexArray", "userAgeArray"]),
    totalCatNum: function() {
      return this.catList.length; // {{ catList.length }} 로 바로 쓸 수도 있다.
    },
    totalUserNum: function() {
      return this.userList.length; // {{ userList.length }} 로 바로 쓸 수도 있다.
    },
    catSexChartData: function() {
      return {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 20,
        labels: ["수컷", "암컷", "중성화 수컷", "중성화 암컷", "일반", "중성화"],
        datasets: [
          {
            label: "전체 수컷/암컷/중성화 컷/중성화 암컷",
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#028833","#FF6651","#0C88E8",],
            data: [
              this.catSexArray[0],
              this.catSexArray[1],
              this.catSexArray[2],
              this.catSexArray[3],
              0,    
              0
            ] //1,2,3,4] //
          },
          {
            label: "일반/중성화 비율",
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#028833","#FF6651","#0C88E8",],
            data: [
              0,
              0,
              0,
              0,
              this.catSexArray[0] + this.catSexArray[1],
              this.catSexArray[2] + this.catSexArray[3]
            ] // 2,3] //
          }
        ]
      };
    },
    catNeuterChartData: function() {
      return {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 20,
        labels: ["일반", "중성화"],
        datasets: [
          {
            label: "일반/중성화 비율",
            backgroundColor: ["#FF6651","#0C88E8"],
            data: [
              this.catSexArray[0] + this.catSexArray[1],
              this.catSexArray[2] + this.catSexArray[3]
            ] // 2,3] //
          }
        ]
      };
    },
    catAgeChartData: function() {
      return {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 20,
        labels: ["1살", "2살", "3살", "4살", "5살", "6살+"],
        datasets: [
          {
            label: "전체 고양이 나이",
            backgroundColor: [
              "#41B883",
              "#E46651",
              "#00D8FF",
              "#00FFDA",
              "#00D9FF",
              "#0C88E8"
            ],
            data: [
              this.catAgeArray[0],
              this.catAgeArray[1],
              this.catAgeArray[2],
              this.catAgeArray[3],
              this.catAgeArray[4],
              this.catAgeArray[5]
            ]
          }
          // {
          //     label: "내 지역 고양이 나이",
          //     backgroundColor: ["#41B883", "#E46651", ],
          //     data: [8, 4]
          // },
        ]
      };
    },
    catHealthChartData: function() {
      return {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 20,
        labels: ["건강 양호", "외상 및 상처", "피부병"], //,"설사병","감염증","기타"
        datasets: [
          {
            label: "전체 고양이 건강지표 비율",
            backgroundColor: ["#41B883", "#E46651", "#00D8FF"], //"#00FFDA", "#00D9FF", "#0C88E8"],
            data: [
              this.catHealthArray[0],
              this.catHealthArray[1],
              this.catHealthArray[2]
            ] //this.catAgeArray[3], this.catAgeArray[4], this.catAgeArray[5]]
          }
          // {
          //     label: "내 지역 고양이 나이",
          //     backgroundColor: ["#41B883", "#E46651", ],
          //     data: [8, 4]
          // },
        ]
      };
    },
    // 전체 사용자 페이지
    // 전체 유저 수
    // totalUserNum: 10,
    userSexChartData: function() {
      return {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 20,
        labels: ["남성", "여성"],
        datasets: [
          {
            label: "전체 사용자 성별",
            backgroundColor: ["#41B883", "#E46651"],
            data: [4, 6]
            // data: [this.userSexArray[0], this.userSexArray[1]]
          }
          // {
          //     label: "우리 지역 사용자 성별",
          //     backgroundColor: ["#41B883", "#E46651", ],
          //     data: [8, 4]
          // },
        ]
      };
    },
    userAgeChartData: function() {
      return {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 20,
        labels: ["0~9세", "10대", "20대", "30대", "40대", "50대+"],
        datasets: [
          {
            label: "전체 사용자 나이",
            backgroundColor: [
              "#41B883",
              "#E46651",
              "#00D8FF",
              "#00FFDA",
              "#00D9FF",
              "#0C88E8"
            ],
            data: [
              1,
              2,
              4,
              1,
              1,
              1
            ]
            // data: [
            //   this.userAgeArray[0],
            //   this.userAgeArray[1],
            //   this.userAgeArray[2],
            //   this.userAgeArray[3],
            //   this.userAgeArray[4],
            //   this.userAgeArray[5]
            // ]
          }
          // {
          //     label: "내 지역 고양이 나이",
          //     backgroundColor: ["#41B883", "#E46651", ],
          //     data: [8, 4]
          // },
        ]
      };
    },
    catRankChartData: function(rankList) {
        let rankChartData = [0,0,0,0],
            cnt = 0;
        let rankLen = 3;
        if (this.rankList != null){
            rankChartData = [];
            this.rankList.forEach(rank => {
                cnt += 1;
                if (cnt > rankLen) { // +1 -> 시행 , +2 -> 시행 , +3 -> 시행, +4 -> 시행, +5 -> for문 탈출.. 이되면
                    ;
                }else{
                    rankChartData.push(rank.rank_point)
                }
            });
        }
        while (cnt < rankLen) { // 남아있는 것들은 0으로 채우기! 내용 정리 
            cnt += 1;
            rankChartData.push(0)
        }

        if (true){ // 내 데이터가 있으면 넣고 아니면 0 #$##$
            rankChartData.push(0)
        }else{
            rankChartData.push(0)
        }

        return {
            labels: ["관리자 랭킹", "2위 랭킹", "3위 랭킹", "내 랭킹"], // 3위 랭킹까지 표시 가능
            datasets: [
            {
                label: "Total 랭킹 포인트",
                backgroundColor: "#f87979",
                // data: rankChartData //형식
                data: [rankChartData[0], rankChartData[1], rankChartData[2], rankChartData[3]]
                // data: [1,2,3,4]
            },
            // {
            //     label: "# of (좋아요 - 싫어요)",
            //     backgroundColor: "#00D8FF",
            //     data: [30, 17, 14,0]
            // },
            // {
            //     label: "포스트 쓴 날짜 수",
            //     backgroundColor: "#41B883",
            //     data: [20, 10, 8, 0]
            // }
            ]
        };
      },
    followCatHealthChartData: function() {
      let 
          totalHealthScore=0,
          checkNeuter=0,
          unhealthScore_hurt=0,
          unhealthScore_skin_disease=0;
      
      if (this.selectedCat.neuter === 1){
        checkNeuter = 1
      }else{
        checkNeuter = 0; 
      } 
      if (this.selectedCat.hurt === 1){
        unhealthScore_hurt = 1
      }else{
        unhealthScore_hurt = 0; 
      }
      if (this.selectedCat.skin_disease === 1){
        unhealthScore_skin_disease = 1
      }else{
        unhealthScore_skin_disease = 0; 
      }
      totalHealthScore=2-unhealthScore_hurt-unhealthScore_skin_disease + checkNeuter

      return {
        labels: ["건강 점수", "외상 및 상처", "피부병", '중성화여부'], //,"설사병","감염증","기타"
        datasets: [
          {
            label: "전체 고양이 건강",
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", '#00FFDA'], //"#00FFDA", "#00D9FF", "#0C88E8"],
            data: [
                    totalHealthScore,
                    -unhealthScore_hurt,
                    -unhealthScore_skin_disease,
                    checkNeuter 
                  ]
          }
        ]
      };
    },
  },
  data() {
    return {
      // Test!
      // 버튼 바인딩
      selected_cat_no: '', // 기본 값은 1로 두고 -> 기본값은 내 follow 고양이 1번으로 두고, 밑에서 바꿔준다.


  // 고양이 선택 버튼&모달 부분 변수
      showModalSelectCat: false,

      // 처음 부분 :
      // 전체 고양이 페이지
      // 전체 고양이 수
      //"차트의 종류를 결정해주는 데이터 요소"
      datacollection: null,
      datacollection2: null,
      chartTitle: null, // 차트의 종류 제목
      selectOption: 0, // locationKey: 0, 1, 2, ... 24 // 전체: 0 , 강남구 : 1 // 가나다 순으로 정렬!
      selectedKey: "",

      chartOptions: {
        hoverBorderWidth: 20
      },
      //지역별로 검색한다! ( 선택지에 따라 변경됨! )
      chartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        //"지역별 전체 고양이 수(비율)", "성별(수컷/암컷/중성화고양이 수(중성화수컷/중성화암컷))", "일반/중성화 수(비율)",
        labels: ["수컷", "암컷", "중성화 수컷", "중성화 암컷"],
        datasets: [
          {
            label: "전체 수컷/암컷/중성화",
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#028833"],
            data: [1, 10, 5, 30]
          },
          {
            label: "일반/중성화 차이",
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#028833"],
            data: [1, 10, 5, 15]
          }
          // {
          //     label: "전체성별",
          //     backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#028833"],
          //     data: [100, 10, 5,35]
          // }
        ]
      },

      // Vuetify 부분
      alignmentsAvailable: ["start", "center", "end", "baseline", "stretch"],
      alignment: "center",
      dense: false,
      justifyAvailable: [
        "start",
        "center",
        "end",
        "space-around",
        "space-between"
      ],
      justify: "center"
    };
  },
  created() {
    this.getCatList();
    this.getUserList();
    // this.getPostList();
    this.getMyFollowingCatList();

  },
  mounted() {
    this.getSelectedCat(this.selected_cat_no);
    // var location = "서울특별시 강남구",
    //   substring = "강남구";
    // if (location.indexOf(substring) !== -1) {
    //   // 만약 문자가 문자열에 포함되어 있지 않으면..
    //   this.test_ = "성공!";
    // } else {
    //   this.test_ = "실패!";
    // }
  },
  watch: {
      selected_cat_no: function(){
        this.getRankList({cat_no: this.selected_cat_no});
        // this.getPostList({cat_no: this.selected_cat_no});
        this.getSelectedCat( this.selected_cat_no); // no 가 다르게 입력 될 때마다 vuex에 접근해서 바꿔주고 바뀐 값을 가져온다.
//#$#
      }
  },
  methods: {
    ...mapActions("storeCat", ["getCatList", "getSelectedCat",'getMyFollowingCatList']),
    ...mapActions("storeUser", ["getUserList"]),
    ...mapActions("storePost", ["getPostList"]),
    ...mapActions('storeUser/storeRank',['getRankList',]),
    tagCat(no) {
      // 선택한 고양이 값 받아오기
      this.selected_cat_no = no;
      // console.log("cat_no: " + no + ", cat_name: " + name + "  선택!!")
    },
  }
};
</script>

<style lang="scss" scoped>
/* 전체 정렬 부분 */ 
.page-alignment {

}


/* 모달 부분 */
#btn-show-modal-cat {
  border-top: solid 1px #3da0a9;
}
#btn-show-modal-cat,
#btn-show-modal-loc {
  width: 100%;
  height: 52px;
  border-bottom: solid 1px #3da0a9;
  &:hover {
    color: #1d2f3a;
    font-weight: 550;
  }
  #lb-tagCat{
    float: left;
    text-align: left;
    width: 30%;
  }
  #lb-addLoc {
    float: left;
    text-align: left;
    width: 30%;
  }
  #lb-selectedCat,
  #lb-selectedLoc {
    float: right;
    text-align: right;
    width: 70%;
    padding-right: 5%;
  }
}
.btn-selectCat {
  font-size: 12px;
  text-align: center;
  margin: 10px 6px 0 6px;

  transition-duration: 0.3s;
  transition-property: transform;
  &:hover {
    color: #1d2f3a;
    font-weight: 550;
  }
}
.btn-circle-border {
  width: 64px;
  height: 64px;
  overflow: hidden;
  border-radius: 50%;
  border: 1.5px solid rgb(255, 182, 48);
  // box-shadow: 5px 5px 20px rgb(211, 211, 211);
  -webkit-box-shadow: 11px 10px 22px 0px rgba(92, 88, 78, 0.48);
  -moz-box-shadow: 11px 10px 22px 0px rgba(148, 141, 118, 0.48);
  box-shadow: 5px 5px 12px 0px rgba(148, 141, 118, 0.48);

  transition-duration: 0.3s;
  transition-property: transform;
  &:hover {
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
    -ms-transform: scale(1.1);
    -o-transform: scale(1.1);
    transform: scale(1.1);
    font-size: 10.9px;
  }
}
.btn-circle {
  text-align: center;
  margin-top: 2.5px;
  // margin-top: 4px;
  width: 56px;
  height: 56px;
  line-height: 28px;
  overflow: hidden;
  border-radius: 50%;
  background: #f2709c center 100% no-repeat; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to top,
    #ff9472,
    #f2709c
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to top,
    #ff9472,
    #f2709c
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.modal-footer-addCat {
  font-size: 13px;
  margin: 14px 6px 0 4.5px;
  padding-bottom: 6px;
}
.btn-addNewCat {
  float: right;
  color: #1d2f3a;
  font-weight: 550;
}
.modal-footer-regLoc {
  margin: 14px 6px 0 0px;
}
.btn-regLoc {
  color: #1d2f3a;
  font-weight: 550;
}

.submit-wrap {
  width: 100%;
  height: 42px;
  padding-right: 5%;
}
.writingText {
  border: 1px solid #3396F4;
}
.btn-upload {
  float: right;
  width: 142px;
  height: 42px;
  border-radius: 8px;
  background: #3da0a9;
  color: #113538;
  text-align: center;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
  transition: all 0.3s;

  &:hover {
    color: #fff;
    box-shadow: 148px 0 0 0 rgba(243, 245, 216, 0.1) inset;
    // color: #1d2f3a;
    // font-weight: 550;
  }
}

// 대쉬보드 페이지 기본 SCSS
#dashboard{
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

    // 모달 이외의 버튼 부분
.btn-convert-dashboard {
  float: center;
  width: 242px;
  height: 42px;
  border-radius: 8px;
  background: #3da0a9;
  color: #113538;
  text-align: center;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
  transition: all 0.3s;
  &:hover {
            color: #fff;
            box-shadow: 148px 0 0 0 rgba(243, 245, 216, 0.1) inset;
            color: #1D2F3A;
            font-weight: 550;
          }
}

// dashboard 전체 View 부분
.dashboardView{
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
}


.big {
  max-width: 85%;
  margin: 20px auto;
}
.small {
  max-width: 600px;
  margin: 20px auto;
}
#boardView {
  display: inline-block;
  width: 90%;
  text-align: center;
}
#pie {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>


