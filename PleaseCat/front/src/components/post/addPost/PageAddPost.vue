<template>
  <div class="addPost page">
    <div class="title-addPost">게시글 등록</div>

    <div class="upload-wrap">
      <div class="selectPhoto">

        <div class="canvas-wrap">
          <canvas id="previewCanvas"></canvas>
        </div>

        <div class="file-input-div">
          <p>
            <input
              type="button"
              value="고양이 사진 선택"
              class="file-input-button"
            />
            <input
              class="file-input-hidden"
              v-on:change="fileSelect"
              ref="postImage"
              type="file"
              name="photo"
              required="required"
            />
          </p>
        </div>

      </div>

    </div>

    <div class="btn-wrap">

      <div class="modal selectLoc">
        <button
          id="btn-show-modal-loc"
          @click="showModalRegLocation = true"
        >
          <div id="lb-addLoc">위치 추가</div>
          <div id="lb-selectedLoc">{{ post_location }}</div>
          <div style="clear:both:"></div>
        </button>

        <modal
          v-if="showModalRegLocation"
          @close="showModalRegLocation = false"
        >
          <h3
            slot="header"
            style="margin-top:6px; color: #1d2f3a; font-weight: 550;"
          >핀을 움직여 위치를 선택하세요</h3>

          <div slot="footer">
            <!-- 지도 component 추가 -->
            <div id="mapCpnt">
              <mapComponent v-on:selectLoc-event="receiveLoc"></mapComponent>
            </div>

          </div>
          <div
            slot="footer"
            class="modal-footer-regLoc"
          >
            <button
              class="btn-regLoc"
              @click="showModalRegLocation = false"
            > 확인</button>
            <p></p>
          </div>
        </modal>
      </div>

      <div class="modal selectCat">

        <button
          id="btn-show-modal-cat"
          @click=" showModalSelectCat = true"
        >
          <div id="lb-tagCat">#고양이 태그</div>
          <div id="lb-selectedCat">{{ selectedCat }}</div>
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
              v-for="nc in nearCatList"
              @click="tagCat(`${nc.no}`, `${nc.cat_name}`), showModalSelectCat = false "
              :key=nc.no
            >
              <div class="btn-circle-border">
                <img
                  class="btn-circle"
                  :src='require(`@/assets/images/cats/_profile/${ nc.no }.jpg`)'
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
            <!-- <router-link :to="'/addcat'"> -->
              <button
                class="btn-addNewCat"
                @click="showModalSelectCat = false , pushAddCat()"
              > 고양이 추가</button>
              <p></p>
            <!-- </router-link> -->
          </div>

        </modal>
      </div>

    </div>
    <div class="writingText">
      <textarea
        v-model="post_content"
        wrap="hard"
        placeholder=" 문구 입력..."
      ></textarea>
      <!-- <hr noshade border="0px"  size="0.5px" color="#3da0a9"> -->
    </div>

    <div class="submit-wrap">
      <p>
        <input
          class="btn-upload"
          v-on:click="submit"
          type="submit"
          value="공유하기"
        />
      </p>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import Modal from "@/components/post/modal/ModalAddPost.vue";
import EXIF from "../../../../node_modules/exif-js/exif";
import mapComponent from "@/components/map/selectlLocationMap";
import InfiniteLoading from "vue-infinite-loading";
import { mapGetters } from "vuex";

export default {
  components: {
    Modal: Modal,
    mapComponent,
    InfiniteLoading
  },
  computed: {
    ...mapGetters(["getLoginInfo", 'getUserLoc',]),
    ...mapGetters('storeCat',["catList"]),
    nearCatList: function(catList) {
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
                  console.log('고양이 계산')
                    if(distance(this.getUserLoc.lat, this.getUserLoc.lng, cat.cat_x, cat.cat_y) < 1000){
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
  data() {
    return {
      positions: [
        {
          no: "1",
          pos_x: 33.450705,
          pos_y: 126.570677
        }
      ],

      showModalSelectCat: false,
      showModalRegLocation: false,

      cat_no: "",
      user_no: "",
      post_image: "",
      post_time: "",
      post_content: "",
      post_location: "",
      postImage: "",
      gpsX: "",
      gpsY: "",

      photoGps: [],
      userGps: [],
      gps: [],

      // infiniteLoading
      limit: 0,

      selectedCat: ""
    };
  },
  created() {
    this.server = this.$store.state.server;
  },

  methods: {
    receiveLoc(rLocation) {
      this.gpsX = rLocation.X;
      this.gpsY = rLocation.Y;
      this.post_location = rLocation.Addr;
      console.log(this.gpsX, this.gpsY);
      console.log(this.post_location);
    },
    toDecimal(gpsInfo) {
      return (
        gpsInfo[0].numerator +
        gpsInfo[1].numerator / (60 * gpsInfo[1].denominator) +
        gpsInfo[2].numerator / (3600 * gpsInfo[2].denominator)
      );
    },
    setGps() {
      // 사진의 메타데이터에 gps 정보가 있는 경우.
      if (this.photoGps) {
        console.log("사진에 gps 정보 있음");
        this.gps = this.photoGps;
      }
      // 사진 메타데이터에 gps정보가 없는 경우, 사용자의 현재위치를 gps에 저장한다.
      else if (!this.photoGps.latitude || !this.photoGps.longitude) {
        console.log("사진에 gps 정보 없음...");
        this.gps = this.userGps;
      }
      // 사용자의 현재위치가 없는 경우,  default값 설정
      else if (!this.userGps.latitude || this.userGps.latitude) {
        console.log("사용자의 현재위치 없음..");
        this.gps = {
          latitude: 37.558245,
          longitude: 126.998207
        };
      }
    },
    getUserLoc() {
      // 사용자의 현재 위치를 가져오는 함수
      if (navigator.geolocation) {
        var self = this;
        navigator.geolocation.getCurrentPosition(
          function(position) {
            self.userGps = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            };
            console.log(
              "위도 : " +
                position.coords.latitude +
                ", 경도: " +
                position.coords.longitude
            );
          },

          function(err) {
            console.log("error");
            if (err.code == 1) {
              console.log("Error: Access is denied!");
            } else if (err.code == 2) {
              console.log("Error: Position is unavailable!");
            }
          },
          { timeout: 30000, enableHighAccuracy: true, maximumAge: 75000 }
        );
      } else {
        console.log("이 브라우저는 Geolocation을 지원하지 않음.");
      }
    },
    fileSelect() {
      //사진 선택 시 canvas에서 사진 미리보기
      var canvas = document.getElementById("previewCanvas");
      var ctx = canvas.getContext("2d");

      var reader = new FileReader();
      reader.onload = function(event) {
        var img = new Image();

        img.onload = function() {
          var MAX_WIDTH = 375;
          var MAX_HEIGHT = 375;
          var width = img.width;
          var height = img.height;

          // 이미지 리사이징
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
        };

        img.src = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);

      // 사진 메타데이터 중 gps정보 가져오기

      // clear photoGps list
      this.photoGps = [];

      if (this.$refs.postImage.files[0]) {
        var self = this;
        // console.log(self)

        EXIF.getData(this.$refs.postImage.files[0], function() {
          // console.log('image info', this )
          if (this.exifdata.GPSLatitude && this.exifdata.GPSLongitude) {
            /*
            console.log(
              '위도 N', 
              this.exifdata.GPSLatitude[0].numerator, this.exifdata.GPSLatitude[1].numerator, this.exifdata.GPSLatitude[2].numerator 
            )
            console.log(
              '경도 E', 
              this.exifdata.GPSLongitude[0].numerator, this.exifdata.GPSLongitude[1].numerator, this.exifdata.GPSLongitude[2].numerator
            )
            */

            // photoGps 정보(시, 분, 초)를 소수로 바꿔 저장
            var lat = EXIF.getTag(this, "GPSLatitude");
            var long = EXIF.getTag(this, "GPSLongitude");
            // console.log(lat, long);
            var dec_lat = self.toDecimal(lat);
            var dec_long = self.toDecimal(long);
            self.photoGps = {
              latitude: dec_lat,
              longitude: dec_long
            };
            // console.log(dec_lat, dec_long);
          }

          // 지도 선택 시 기준이 될 gps좌표 설정
          // self.setGps();
          // 지도에서 위치 선택

          // gps 정보 이용해 근처 고양이 목록 불러오기
          // axios
          //   .get(self.$store.getters.getServer + `/api/cat/searchAll`)
          //   .then(res => {
          //     if (res.data.state == "ok") {
          //       // clear nearCats list
          //       self.nearCats = [];
          //       for (var i = 0; i < res.data.data.length; i++) {
          //         self.nearCats.push({
          //           no: res.data.data[i].cat_no,
          //           name: res.data.data[i].cat_name
          //         });
          //       }
          //     } else {
          //       console.log("cat 정보 불러오기 실패");
          //     }
          //   })
          //   .catch(err => {
          //     console.log("서버 통신 실패");
          //     console.log(err);
          //   });
        });
      } else {
        console.log(`it's not a image`);
      }
    },
    tagCat(no, name) {
      // 선택한 고양이 값 받아오기
      this.cat_no = no;
      this.selectedCat = name;
      // console.log("cat_no: " + no + ", cat_name: " + name + "  선택!!")
    },
    pushAddCat() {
      
      if (this.post_location == "") {
        alert("위치를 추가하세요. 😺 \n위치를 추가하면 근처 고양이 목록을 불러옵니다.");
        return false;
      }
      else {
        this.$router.push({
          name: 'AddCat' ,
          params: { X: this.gpsX , Y: this.gpsY, Loc: this.post_location}
        })
        
      }

    },
    submit() {
      // postImage에 사진 등록
      // file 태그애 Vue 인스턴스로 접근하기 위해 $refs 속성을 사용함.
      this.postImage = this.$refs.postImage.files[0];

      // 사진, 위치, 고양이 없으면 게시글 등록 불가 => 동작 test 후 alert로 바꾸기
      if (this.postImage == null) {
        alert("고양이 사진이 없습니다. 😿");
        return false;
      }
      if (this.post_location == "") {
        alert("위치를 추가하세요. 😺");
        return false;
      }
      if (this.cat_no == "") {
        alert("고양이를 태그하세요. 😺");
        return false;
      }

      // backend와 통신 할 때 넘겨줄 FormData 구성
      const fd = new FormData();
      fd.append("cat_no", this.cat_no);
      fd.append("user_no", this.getLoginInfo.user_no);
      fd.append(
        "post_time",
        Vue.prototype.moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
      );
      fd.append("post_content", this.post_content);
      fd.append("post_location", this.post_location);
      fd.append("post_x", this.gpsX);
      fd.append("post_y", this.gpsY);
      fd.append("catImg", this.postImage);

      // FormData 확인할 때 key 이용.
      for (let key of fd.entries()) {
        console.log(`${key}`);
      }

      // axios 통신
      axios
        .post(this.$store.getters.getServer + `/api/post/insert`, fd, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          console.log("200");
          if (res.data.state == "ok") {
            console.log("post 저장 성공");
            console.log(res);
          } else {
            console.log("post 등록 실패");
          }
        })
        .catch(err => {
          console.log("FAILURE");
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.addPost {
  // position: absolute;
  width: 90vw;
  margin-left: 5vw;
  margin-right: 5vw;
  margin-top: 10px;
  margin-bottom: 60px;
  // padding-top: 100px;
  padding-top: 10px;
  padding-bottom: 125px;
}
.addPost .title-addPost {
  margin-top: 60px;
  margin-bottom: 32px;
  font-weight: 500;
  font-size: 28px;
}
#previewCanvas {
  width: 100%;
}
.canvas-wrap {
  position: relative;
  margin: -5.8px auto;
  // width: 70%;
  // padding-bottom: 70%;
  // border: solid 1px #1d2f3a;

  &::after {
    content: "";
    display: block;
    // padding-bottom: 100%;
  }
}
.file-input-div {
  // margin: 0 auto;
  position: relative;
  width: 100%;
  height: 56px;
  overflow: hidden;
}
.file-input-button {
  width: 100%;
  height: 56px;
  position: absolute;
  top: 0px;
  color: #1d2f3a;

  background: linear-gradient(165deg, #c2c8ff, #6bccb4, #6eaecc, #c2ffc5);
  background-size: 600% 600%;
  -webkit-animation: inputBtn-Animation 10s ease infinite;
  -moz-animation: inputBtn-Animation 10s ease infinite;
  -o-animation: inputBtn-Animation 10s ease infinite;
  animation: inputBtn-Animation 10s ease infinite;
  @-webkit-keyframes inputBtn-Animation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @-moz-keyframes inputBtn-Animation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @-o-keyframes inputBtn-Animation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @keyframes inputBtn-Animation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
}
.file-input-hidden {
  font-size: 25px;
  position: absolute;
  right: 0px;
  top: 0px;
  opacity: 0;
  width: 100%;

  filter: alpha(opacity=0);
  -ms-filter: "alpha(opacity=0)";
  -khtml-opacity: 0;
  -moz-opacity: 0;
}
// #uploadCanvas {
//   position: absolute;
//   width: 100%;
//   height: 100%;
// }
.writingText {
  margin-top: -5px;
  border-bottom: solid 1px #3da0a9;
  textarea {
    resize: none;
    padding: 12px 0px 12px;
    height: 212px;
    width: 100%;
  }
  textarea::placeholder {
    color: rgb(81, 138, 163);
  }
}
#btn-show-modal-cat {
  margin-top: -5px;
}
#btn-show-modal-loc {
  margin-top: 1px;
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
  #lb-tagCat,
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

@media (min-width: 600px) {
  .addPost {
    width: 600px;
    margin-left: calc((100vw - 600px) / 2);
    margin-right: calc((100vw - 600px) / 2);
  }
  #previewCanvas {
    width: 60vw;
  }
  .selectPhoto {
    float: none;
    width: auto;
  }
  .writingText {
    // border: 1px solid #3396F4;
    float: none;
    width: auto;
  }
}
</style>