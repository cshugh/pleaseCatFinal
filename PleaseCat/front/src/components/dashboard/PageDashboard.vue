
<template>

<!-- 대쉬보드 페이지 - 전체 part : 관리자용 계획 -->

<!-- (1) 고양이 현황 페이지 월별 고양이 등록자 현황 : line-chart -->

<!-- (2) 월별 사용자 현황 : line-chart
 : 성별 / 나이 / (접속[주 활동] 시간**) -->

  <div>
<!-- 1. 버튼 클릭 UI -->
<!-- 구별 데이터 구분을 위해 입력하는 곳 -->

  <div id='emptySpace'></div>

    <h1> 여백 </h1>
    <div>
        <!-- 전체 등록된 고양이 수 -->
        <!-- 전체(25개구 : 중성화 여부, 상처여부)/구별 데이터를 불러오는 코드이다. -->
        <!-- <button @click="setOption()" v-bind:style="buttonStyle"> 버튼 </button> -->
        <!-- <input > -->
            <!-- if (this.selectedKey !== '') {
                this.getData()
            } -->
    </div>

    <v-container fluid>        
    <h1> 전체 고양이 데이터 </h1>
    <v-row>
        <p>전체 고양이 수 : {{ totalCatNum }}명</p>
        <p>전체 유저 수 : {{ totalUserNum }}명</p>
    </v-row>

    <v-row>
        <v-col cols="4">
            <p>전체 고양이 성별</p>
                <!-- <pie-chart :data="{'Blueberry': 44, 'Strawberry': 23}"></pie-chart> -->
            <div class="small">
                <p>전체 고양이 성별</p>
                <div id="pie">
                    <pie-chart :data="catSexChartData" :options="chartOptions"></pie-chart>
                </div>
            </div>
        </v-col>
            
        <v-col cols="4">
            <p>전체 고양이 나이</p>
                <!-- <pie-chart :data="{'Blueberry': 44, 'Strawberry': 23}"></pie-chart> -->
            <div class="small">
                <p>전체 고양이 나이</p>
                <div id="pie">
                    <pie-chart :data="catAgeChartData" :options="chartOptions"></pie-chart>
                </div>
            </div>
        </v-col>
    </v-row>

    <v-row>
        <v-col cols="4">
                <p>전체 사용자 성별</p>
            <div class="small">
                <div id="pie">
                    <pie-chart :data="userSexChartData" :options="chartOptions"></pie-chart>
                </div>
            </div>
        </v-col>
        <v-col cols="4">
                <p>전체 사용자 나이</p>
            <div class="small">
                <div id="pie">
                    <pie-chart :data="userAgeChartData" :options="chartOptions"></pie-chart>
                </div>
            </div>
        </v-col>
   </v-row>

    <!-- <h1> 전체(25개구 : 중성화 여부, 상처여부)/구별 데이터 </h1> -->
    <h1> 전체(25개구 : 중성화 여부)/구별 데이터 </h1>
    <!-- datacollection_neut -->
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
    </v-row>

   <h1> 전체 날짜별 성별 & 중성화 현황/구별 데이터  ||  전체 나이 현황/구별 데이터 </h1>
    <v-row>
        <v-col cols="4">
            <div class="small">
                <line-chart :chart-data="datacollection2"></line-chart>
                <button @click="fillData()">Randomize</button>
            </div>
        </v-col>    

        <v-col cols="4">
                <!-- <pie-chart :data="{'Blueberry': 44, 'Strawberry': 23}"></pie-chart> -->
            <div class="small">
                <div id="pie">
                    <pie-chart :data="chartData" :options="chartOptions"></pie-chart>
                </div>
            </div>
        </v-col>


        <!-- <v-col cols="4">
            <div class="small">
                <line-chart :chart-data="datacollection3"></line-chart>
                <button @click="fillData()">Randomize</button>
            </div>
        </v-col>     -->
         <!-- <v-col cols="4">
            <div class="small">
                <line-chart :chart-data="datacollection2"></line-chart>
                <button @click="fillData()">Randomize</button>
            </div>
        </v-col>     -->
    </v-row>


    <!-- 고양이 한마리의 데이터! -->
    <h1>고양이 한마리의 데이터!</h1>
    <h1> 서울 전체의 성별 / 내 지역 고양이의 성별                    ||                       서울 전체 고양이 건강 상태 / 내 지역 고양이 건강 상태 </h1>
    <!-- 서울 전체의 성별 / 내 지역 고양이의 성별 -->
    <v-row>
        <v-col cols="6">
                <!-- <pie-chart :data="{'Blueberry': 44, 'Strawberry': 23}"></pie-chart> -->
            <div class="small">
                <div id="pie">
                    <pie-chart :data="chartData" :options="chartOptions"></pie-chart>
                </div>
            </div>
        </v-col>

    <!-- 서울 전체 고양이 건강 상태 / 내 지역 고양이 건강 상태 -->
        <v-col cols="6">
                <!-- <pie-chart :data="{'Blueberry': 44, 'Strawberry': 23}"></pie-chart> -->
            <div class="small">
                <div id="pie">
                    <pie-chart :data="chartData2" :options="chartOptions"></pie-chart>
                </div>
            </div>
        </v-col>
    </v-row>

    <!--  -->
    <v-row>
        <v-col cols="6">
                <!-- <pie-chart :data="{'Blueberry': 44, 'Strawberry': 23}"></pie-chart> -->
            <div class="small">
                <div id="pie">
                    <pie-chart :data="chartData" :options="chartOptions"></pie-chart>
                </div>
            </div>
        </v-col>

    <!-- 서울 전체 고양이 건강 상태 / 내 지역 고양이 건강 상태 -->
        <v-col cols="6">
                <!-- <pie-chart :data="{'Blueberry': 44, 'Strawberry': 23}"></pie-chart> -->
            <div class="small">
                <div id="pie">
                    <pie-chart :data="chartData2" :options="chartOptions"></pie-chart>
                </div>
            </div>
        </v-col>
    </v-row>

    </v-container>

  </div>
</template>

<script>
    import LineChart from './js/LineChart.js'
    import BarChart from './js/BarChart.js'
    import DoughnutChart from './js/DoughnutChart'
    import HorizontalBarChart from './js/HorizontalBarChart'
    import { mapActions, mapMutations, mapGetters } from "vuex";
    import PieChart from './js/PieChart.js'
    // import PieChart from "./PieChart.js";


    export default {
    components: {
        LineChart,
        BarChart,
        DoughnutChart,
        HorizontalBarChart,
        PieChart,
    },
    computed: {
        ...mapGetters([
            'getUserLoc',
        ]),
        ...mapGetters('storeCat',[
            'catList',
        ]),
        totalCatNum: function(){
            return this.catList.length;
        }
    },
    data () {
        return {
// 처음 부분 : 
            
// 전체 고양이 페이지
    // 전체 고양이 수

            catSexChartData: {
                hoverBackgroundColor: "red",
                hoverBorderWidth: 20,
                labels: ["수컷", "암컷", "중성화 수컷", "중성화 암컷" ],
                datasets: [{
                        label: "전체 수컷/암컷/중성화",
                        backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#028833"],
                        data: [4, 4, 3, 1]
                    },{
                        label: "일반/중성화 차이",
                        backgroundColor: ["#41B883", "#E46651", ],
                        data: [8, 4]
                    },
                    ]
            },
            catAgeChartData: {
                hoverBackgroundColor: "red",
                hoverBorderWidth: 20,
                labels: ["1살","2살","3살","4살","5살","6살+" ],
                datasets: [{
                        label: "전체 고양이 나이",
                        backgroundColor: ["#41B883", "#E46651", "#00D8FF","#00FFDA", "#00D9FF", "#0C88E8"],
                        data: [2, 2, 1, 1, 1, 1]
                    },
                    // {
                    //     label: "내 지역 고양이 나이",
                    //     backgroundColor: ["#41B883", "#E46651", ],
                    //     data: [8, 4]
                    // },
                    ]

            },
            
// 전체 사용자 페이지 
    // 전체 유저 수
            totalUserNum: 10,
            userSexChartData: {
                hoverBackgroundColor: "red",
                hoverBorderWidth: 20,
                labels: ["남성", "여성" ],
                datasets: [{
                        label: "전체 사용자 성별",
                        backgroundColor: ["#41B883", "#E46651",],
                        data: [4, 6]
                    },
                    // {
                    //     label: "우리 지역 사용자 성별",
                    //     backgroundColor: ["#41B883", "#E46651", ],
                    //     data: [8, 4]
                    // },
                    ]
            },
            userAgeChartData: {
                hoverBackgroundColor: "red",
                hoverBorderWidth: 20,
                labels: ["0~9세", "10대","20대","30대","40대","50대+"],
                datasets: [{
                        label: "전체 사용자 나이",
                        backgroundColor: ["#41B883", "#E46651", "#00D8FF","#00FFDA", "#00D9FF", "#0C88E8"],
                        data: [2, 2, 1, 1, 1, 1]
                    },
                    // {
                    //     label: "내 지역 고양이 나이",
                    //     backgroundColor: ["#41B883", "#E46651", ],
                    //     data: [8, 4]
                    // },
                    ]

            },



        //"차트의 종류를 결정해주는 데이터 요소"
            datacollection: null,
            datacollection2: null,
            chartTitle: null, // 차트의 종류 제목
            selectOption: 0, // locationKey: 0, 1, 2, ... 24 // 전체: 0 , 강남구 : 1 // 가나다 순으로 정렬!
            selectedKey: '',



            chartOptions: {
                    hoverBorderWidth: 20
            },
        //지역별로 검색한다! ( 선택지에 따라 변경됨! )

            chartData: {
                hoverBackgroundColor: "red",
                hoverBorderWidth: 10,
        //"지역별 전체 고양이 수(비율)", "성별(수컷/암컷/중성화고양이 수(중성화수컷/중성화암컷))", "일반/중성화 수(비율)",
                labels: ["수컷", "암컷", "중성화 수컷", "중성화 암컷" ],
                datasets: [{
                        label: "전체 수컷/암컷/중성화",
                        backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#028833"],
                        data: [1, 10, 5,30]
                    },{
                        label: "일반/중성화 차이",
                        backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#028833"],
                        data: [1, 10, 5,15]
                    },
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
                labels: ["건강양호", "피부병", "절단상" ],
                datasets: [{
                        label: "시/도별",
                        backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#028833"],
                        data: [1, 10, 5,30]
                    },{
                        label: "동별",
                        backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#028833"],
                        data: [1, 10, 5,15]
                    },
                    {
                        label: "읍별",
                        backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#028833"],
                        data: [100, 10, 5,35]
                    }]
            },

        // Vuetify 부분 
            alignmentsAvailable: [
                'start',
                'center',
                'end',
                'baseline',
                'stretch',
                ],
            alignment: 'center',
            dense: false,
            justifyAvailable: [
            'start',
            'center',
            'end',
            'space-around',
            'space-between',
            ],
            justify: 'center',
        }
    },
    mounted () {
        this.fillData()
    },
    methods: {
        getTotalUserNum () {
            this.totalUserNum = 8 //#$
            // this.totalUserNum =  (유저 불러와서 토탈 갯수 불러오기) length
        },
        getTotalCatNum () {
            this.totalCatNum = 8 //#$
            // this.totalUserNum =  (유저 불러와서 토탈 갯수 불러오기) length
        },
        setOption () {
            this.chartTitle //
            this.selectOption = 0 // : 전체
            this.selectOption = 1 // 강남구~

            this.chartData = null
            this.chartOptions = null
            this.selectedKey = ''
            // if()
        },

    // Bar chart - 지역구별 수/암/중수/중암컷 통계 데이터 (for 중성화 현황 파악을 위한) 
        fillData () {
        // 월별 고양이 등록 수 통계
        this.datacollection = {
            labels: ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'],
            datasets: [
            {
                label: '수컷',
                backgroundColor: '#f87979',
                // data: [ 20, 30, 15, 40 ] 형식
                data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), ]
            }, {
                label: '암컷',
                backgroundColor: "#00D8FF",
                data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), ]
            }, {
                label: '중성화 수컷',
                backgroundColor: "#41B883",
                data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), ]
             }, {
                label: '중성화 암컷',
                backgroundColor: '#11111',
                data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), ]
             }
            ]
        },
        this.datacollection2 = {
            labels: ['3월','4월','5월','6월','7월','8월','9월','10월','11월', '12월', '1월', '2월'],
            datasets: [
            {
                label: '수컷',
                backgroundColor: '#f87979',
                // data: [ 20, 30, 15, 40 ] 형식
                data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), ]
            }, {
                label: '암컷',
                backgroundColor: "#00D8FF",
                data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), ]
            }, {
                label: '중성화 수컷',
                backgroundColor: "#41B883",
                data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), ]
             }, {
                label: '중성화 암컷',
                backgroundColor: '#11111',
                data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), ]
             }
            ]
        }
        },
        getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
        }
    }
    }
</script>

<style>
    .emptySpace{
        height: 70px;
    }
    .big {
    max-width: 85%;
    margin:  20px auto;
    }
    .small {
    max-width: 600px;
    margin:  20px auto;
    }
    #boardView{
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


