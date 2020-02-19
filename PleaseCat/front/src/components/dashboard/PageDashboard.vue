
<template>
  <!-- 대쉬보드 페이지 - 전체 part : 관리자용 계획 -->

  <!-- (1) 고양이 현황 페이지 월별 고양이 등록자 현황 : line-chart -->

  <!-- (2) 월별 사용자 현황 : line-chart
  : 성별 / 나이 / (접속[주 활동] 시간**)-->


  <!-- 기타 내용 -->
      <!-- selectOption 만들기**  v-if="selectOption === 0" -->


<!-- 1) 현재 유저 아이디를 가져온다. -->
<!-- 2) -->

  <div>
    <div id="emptySpace"></div>

    <h1>여백</h1>
    <div>
      <!-- {{this.catList}} -->
      <!-- 전체 등록된 고양이 수 -->
      <!-- 전체(25개구 : 중성화 여부, 상처여부)/구별 데이터를 불러오는 코드이다. -->
    </div>

    <!-- 1. 버튼 클릭 UI -->
    <!-- 구별 데이터 구분을 위해 입력하는 곳 -->
    <v-container fluid>
      <button class="btn-convert-dashboard">관심 고양이 보드</button>

      <h1>전체 고양이 데이터</h1>


      <v-row>
        <p>전체 고양이 수 : {{ totalCatNum }}명 ||</p>
        <p>전체 유저 수 : {{ totalUserNum }}명</p>
      </v-row>

      <v-row>
        <v-col cols="3">
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

        <!-- <p>전체 고양이 나이</p> -->
        <!-- 목적: 주요 고양이 통계, 관리용 -->
        <v-col cols="3">
          <div class="small">
            <p>전체 고양이 나이</p>
            <div id="pie">
              <pie-chart :data="catAgeChartData" :options="chartOptions"></pie-chart>
            </div>
          </div>
        </v-col>

        <!-- <p>전체 고양이 건강</p> -->
        <!-- 목적: 주요 고양이 통계, 관리용 -->
        <v-col cols="3">
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
      <!--  -->

      <h1>전체 사용자 데이터</h1>
      <v-row>
        <v-col cols="3">
          <p>전체 사용자 성별</p>
          <div class="small">
            <div id="pie">
              <pie-chart :data="userSexChartData" :options="chartOptions"></pie-chart>
            </div>
          </div>
        </v-col>

        <v-col cols="3">
          <p>전체 사용자 나이</p>
          <div class="small">
            <div id="pie">
              <pie-chart :data="userAgeChartData" :options="chartOptions"></pie-chart>
            </div>
          </div>
        </v-col>
      </v-row>

      <h1>관심 고양이 데이터</h1>
      <input style="{'background-color' : 'white'}" type="text" v-model.number="selected_cat_no"/>
    
      <v-row>
        <v-col cols="12">

          <div class="small">
            <bar-chart :chart-data="catRankChartData"></bar-chart>
            <!-- <button @click="fillData()">Randomize</button> -->

          </div>
            <!-- <h3>{{ rankList }}</h3> -->
            <!-- <h3>첫번째 랭킹 포인트: {{ rankList[0]['rankPoint'] }}</h3> -->
            <!-- <h3>두번째 랭킹 포인트: {{ rankList[1] }}</h3>
            <h3>세번째 랭킹 포인트: {{ rankList[2] }}</h3> -->
            <h3>내 랭킹 포인트: ??? </h3>

          <h1>여백</h1>
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

      <!-- 서울 전체 고양이 건강 상태 / 내 지역 고양이 건강 상태 -->
    </v-container>
  </div>
</template>

<script>
import LineChart from "./js/LineChart.js";
import BarChart from "./js/BarChart.js";
import DoughnutChart from "./js/DoughnutChart";
import HorizontalBarChart from "./js/HorizontalBarChart";
import { mapActions, mapMutations, mapGetters, mapState } from "vuex";
import PieChart from "./js/PieChart.js";
// import PieChart from "./PieChart.js";

export default {
  components: {
    LineChart,
    BarChart,
    DoughnutChart,
    HorizontalBarChart,
    PieChart
  },
  computed: {
    //지워도 되는 테스트 코드
    ...mapState("storeCat", ["test"]),
    ...mapGetters('storeUser/storeRank',['rankList',]),
    ...mapGetters(["getUserLoc"]),
    ...mapGetters("storeCat", [
      "catList",
      "catSexArray",
      "catAgeArray",
      "catHealthArray"
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
        labels: ["수컷", "암컷", "중성화 수컷", "중성화 암컷"],
        datasets: [
          {
            label: "전체 수컷/암컷/중성화 컷/중성화 암컷",
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#028833"],
            data: [
              this.catSexArray[0],
              this.catSexArray[1],
              this.catSexArray[2],
              this.catSexArray[3]
            ] //1,2,3,4] //
          },
          {
            label: "일반/중성화 차이",
            backgroundColor: ["#41B883", "#E46651"],
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
        labels: ["건강 양호", "피부병", "감염증"], //,"설사병","외상 및 상처","기타"
        datasets: [
          {
            label: "전체 고양이 건강",
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
            data: [this.userSexArray[0], this.userSexArray[1]]
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
              this.userAgeArray[0],
              this.userAgeArray[1],
              this.userAgeArray[2],
              this.userAgeArray[3],
              this.userAgeArray[4],
              this.userAgeArray[5]
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
    catRankChartData: function() {
      let rankChartData = [],
          cnt = 0
          rankLen = 3;

      for (rank in this.rankList.length){
          cnt += 1;
          if (cnt > rankLen) { // +1 -> 시행 , +2 -> 시행 , +3 -> 시행, +4 -> 시행, +5 -> for문 탈출.. 이되면
              ;
          }else{
              rankChartData.push(rank.rank_point)
          }
      }
      while (cnt <= rankLen) { // 남아있는 것들은 0으로 채우기! 내용 정리 
          rankChartData.push(0)
      }
      rankChartData[rankLen] = 20

      return {
        labels: ["관리자 랭킹", "2위 랭킹", "3위 랭킹", "내 랭킹"], // 3위 랭킹까지 표시 가능
        datasets: [
          {
            label: "Total 랭킹 포인트",
            backgroundColor: "#f87979",
            // data: [ 20, 30, 15, 40 ] //형식
            data: [rankChartData[0], rankChartData[1], rankChartData[2], rankChartData[3]]
          },
          {
            label: "# of (좋아요 - 싫어요)",
            backgroundColor: "#00D8FF",
            data: [30, 17, 14,0]
          },
          {
            label: "포스트 쓴 날짜 수",
            backgroundColor: "#41B883",
            data: [20, 10, 8,0]
          }
        ]
      };
    }
    // testValue: function(){

    // this.catList.forEach(cat => {
    //     if(distance(this.getUserLoc.lat, this.getUserLoc.lng, cat.cat_x, cat.cat_y) < this.distance){
    //         console.log('고양이 추가')
    //         array.push({
    //             age: cat.age,
    //             cat_desc: cat.cat_desc,
    //             cat_image: cat.cat_image,
    //             cat_location: cat.cat_location,
    //             cat_manager: cat.cat_manager,
    //             cat_name: cat.cat_name,
    //             no: cat.cat_no,
    //             pos_x: cat.cat_x,
    //             pos_y: cat.cat_y,
    //             count_followers: cat.count_followers,
    //             count_likes: cat.count_likes,
    //             count_posts: cat.count_posts,
    //             eye_color: cat.eye_color,
    //             hair_color: cat.hair_color,
    //             hurt: cat.hurt,
    //             meal_time: cat.meal_time,
    //             neuter: cat.neuter,
    //             reg_date: cat.reg_date,
    //             sex: cat.sex,
    //             skin_disease: cat.skin_disease,
    //         })
    //     }
    // });

    //     return catList;
    // },

    // maleCnt: function(){
    //     let cnt;
    //     iff( catData.sex ==="남") {
    //         if ( catData.neuter ){
    //             spayedMaleCnt += 1;
    //     },
    // femaleCnt: function(){
    // },
    // spayedMaleCnt: function(){

    // },
    // spayedFemaleCnt: function(){

    // },
  },
  data() {
    return {
      // Test!
      // 버튼 바인딩
      selected_cat_no: '',

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
      chartData2: {
        hoverBackgroundColor: "blue",
        hoverBorderWidth: 10,
        //"지역별 전체 고양이 수(비율)", "성별(수컷/암컷/중성화고양이 수(중성화수컷/중성화암컷))", "일반/중성화 수(비율)",
        labels: ["건강양호", "피부병", "절단상"],
        datasets: [
          {
            label: "시/도별",
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#028833"],
            data: [1, 10, 5, 30]
          },
          {
            label: "동별",
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#028833"],
            data: [1, 10, 5, 15]
          },
          {
            label: "읍별",
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#028833"],
            data: [100, 10, 5, 35]
          }
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
    this.getPostList();
  },
  mounted() {
    this.fillData();

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
      }
  },
  methods: {
    ...mapActions("storeCat", ["getCatList"]),
    ...mapActions("storeUser", ["getUserList"]),
    ...mapActions("storePost", ["getPostList"]),
    ...mapActions('storeUser/storeRank',['getRankList',]),

    setOption() {
      this.chartTitle; //
      this.selectOption = 0; // : 전체
      // this.selectOption = 1 // 강남구~

      this.chartData = null;
      this.chartOptions = null;
      this.selectedKey = "";
      // if()
    },

    // Bar chart - 지역구별 수/암/중수/중암컷 통계 데이터 (for 중성화 현황 파악을 위한)
    fillData() {
      // 월별 고양이 등록 수 통계
      (this.datacollection = {
        labels: [
          "강남구",
          "강동구",
          "강북구",
          "강서구",
          "관악구",
          "광진구",
          "구로구",
          "금천구",
          "노원구",
          "도봉구",
          "동대문구",
          "동작구",
          "마포구",
          "서대문구",
          "서초구",
          "성동구",
          "성북구",
          "송파구",
          "양천구",
          "영등포구",
          "용산구",
          "은평구",
          "종로구",
          "중구",
          "중랑구"
        ],
        datasets: [
          {
            label: "수컷",
            backgroundColor: "#f87979",
            // data: [ 20, 30, 15, 40 ] 형식
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt()
            ]
          },
          {
            label: "암컷",
            backgroundColor: "#00D8FF",
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt()
            ]
          },
          {
            label: "중성화 수컷",
            backgroundColor: "#41B883",
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt()
            ]
          },
          {
            label: "중성화 암컷",
            backgroundColor: "#11111",
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt()
            ]
          }
        ]
      }),
        (this.datacollection2 = {
          labels: [
            "3월",
            "4월",
            "5월",
            "6월",
            "7월",
            "8월",
            "9월",
            "10월",
            "11월",
            "12월",
            "1월",
            "2월"
          ],
          datasets: [
            {
              label: "수컷",
              backgroundColor: "#f87979",
              // data: [ 20, 30, 15, 40 ] 형식
              data: [
                this.getRandomInt(),
                this.getRandomInt(),
                this.getRandomInt(),
                this.getRandomInt(),
                this.getRandomInt(),
                this.getRandomInt(),
                this.getRandomInt(),
                this.getRandomInt(),
                this.getRandomInt(),
                this.getRandomInt(),
                this.getRandomInt(),
                this.getRandomInt()
              ]
            },
            {
              label: "암컷",
              backgroundColor: "#00D8FF",
              data: [
                this.getRandomInt(),
                this.getRandomInt(),
                this.getRandomInt(),
                this.getRandomInt(),
                this.getRandomInt(),
                this.getRandomInt(),
                this.getRandomInt(),
                this.getRandomInt(),
                this.getRandomInt(),
                this.getRandomInt(),
                this.getRandomInt(),
                this.getRandomInt()
              ]
            },
            {
              label: "중성화 수컷",
              backgroundColor: "#41B883",
              data: [
                this.getRandomInt(),
                this.getRandomInt(),
                this.getRandomInt(),
                this.getRandomInt(),
                this.getRandomInt(),
                this.getRandomInt(),
                this.getRandomInt(),
                this.getRandomInt(),
                this.getRandomInt(),
                this.getRandomInt(),
                this.getRandomInt(),
                this.getRandomInt()
              ]
            },
            {
              label: "중성화 암컷",
              backgroundColor: "#11111",
              data: [
                this.getRandomInt(),
                this.getRandomInt(),
                this.getRandomInt(),
                this.getRandomInt(),
                this.getRandomInt(),
                this.getRandomInt(),
                this.getRandomInt(),
                this.getRandomInt(),
                this.getRandomInt(),
                this.getRandomInt(),
                this.getRandomInt(),
                this.getRandomInt()
              ]
            }
          ]
        });
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    }
  }
};
</script>

<style>
.btn-convert-dashboard {
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
}

.btn-convert-dashboard:hover {
                color: #fff;
                box-shadow: 148px 0 0 0 rgba(243, 245, 216, 0.1) inset;
                color: #1D2F3A;
                font-weight: 550;
            }

.emptySpace {
  height: 70px;
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


