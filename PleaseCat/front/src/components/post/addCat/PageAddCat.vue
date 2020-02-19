<script src="js/load-image.all.min.js"></script>
<template>
  <div class="addCat">
    <div class="title-addCat">고양이 등록</div>

    <div class="reg-wrap">
      <div class="selectPhoto">
        <p>고양이 이미지 추가</p>

        <div class="canvas-wrap">
          <canvas id="previewCanvas">
            <!-- :src="uploadImage" -->
          </canvas>

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
              ref="catProfileImage"
              type="file"
              name="photo"
              required="required"
            >
          </p>
        </div>

      </div>

      <div class="input-wrap">
        <!-- 넘겨줄 정보 -->

        <div class="basic-input">
          <!-- 입력받을 정보: cat_name, age, sex, cat_desc -->
          <div class="basic-input-row">
            <label for="name">고양이 이름</label>
            <input
              type="text"
              id="name"
              v-model="cat_name"
              placeholder="고양이 이름을 지어주세요!!"
            >
          </div>
          <div class="basic-input-row">
            <label for="age">나이</label>
            <input
              type="text"
              id="age"
              v-model="age"
              placeholder="고양이 나이"
            >
          </div>
          <div class="basic-input-row">
            <label for="sex">성별</label>
            <input
              type="text"
              id="sex"
              v-model="sex"
              placeholder="남자/여자"
            >
          </div>

          <div class="writingText">
            <div class="basic-input-row">
              <label for="sex">상세 설명</label>
              <textarea
                class="textField"
                v-model="cat_desc"
                wrap="hard"
                placeholder=" 상세 설명.."
              ></textarea>
            </div>
          </div>
        </div>

        <div class="test">
          <button @click="handleClickButton">추가 정보를 입력해볼까요?</button>
          <!-- <app-my-modal title="This is modal" :visible.sync="visible"> -->
          <app-my-modal :visible.sync="visible">
            <div class="extra-input">
              <!-- 입력받을 정보: skin_disease, neuter, hurt, hair_color, eye_color -->
              <div class="extra-input-row select-input-row">
                <label for="skin_disease">피부병</label>
                <select v-model="skin_disease">
                  <option
                    disabled
                    value
                  >피부병이 있나요?</option>
                  <option
                    v-for="opt in skinDiseaseOptions"
                    v-bind:value="opt.value"
                    :key="opt.value"
                  >
                    {{opt.text}}
                  </option>
                </select>
              </div>
              <div class="extra-input-row select-input-row">
                <label for="neuter">중성화</label>
                <select v-model="neuter">
                  <option
                    disabled
                    value
                  >중성화 수술을 했나요?</option>
                  <option
                    v-for="opt in neuterOptions"
                    v-bind:value="opt.value"
                    :key="opt.value"
                  >
                    {{opt.text}}
                  </option>
                </select>
              </div>
              <div class="extra-input-row select-input-row">
                <label for="hurt">다친곳</label>
                <select v-model="hurt">
                  <option
                    disabled
                    value
                  >상처가 있나요?</option>
                  <option
                    v-for="opt in hurtOptions"
                    v-bind:value="opt.value"
                    :key="opt.value"
                  >
                    {{opt.text}}
                  </option>
                </select>
              </div>

              <div class="extra-input-row">
                <label for="hair_color">털색깔</label>
                <input
                  type="text"
                  id="hair_color"
                  v-model="hair_color"
                  placeholder="털 색깔을 알려주세요."
                >
              </div>
              <div class="extra-input-row">
                <label for="eye-color">눈색깔</label>
                <input
                  type="text"
                  id="eye_color"
                  v-model="eye_color"
                  placeholder="눈 색깔을 알려주세요."
                >
              </div>
            </div>
          </app-my-modal>
        </div>
      </div>
    </div>

    <div class="submit-wrap">
      <p>
        <input
          class="btn-save"
          v-on:click="submit"
          type="submit"
          value="등록하기"
        >
      </p>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import Modal from "@/components/post/modal/Modal.vue";
import myModal from "@/components/post/modal/ModalExtraInfo";
import { mapGetters } from "vuex";
export default {
  components: {
    Modal: Modal,
    appMyModal: myModal
  },
  computed: {
    ...mapGetters(["getLoginInfo"])
  },
  data() {
    return {
      visible: false,

      cat_no: "",
      cat_manager: "",
      reg_date: "",

      cat_name: "",
      age: "",
      sex: "",
      cat_desc: "",

      skin_disease: "",
      neuter: "",
      hurt: "",
      hair_color: "",
      eye_color: "",

      cat_location: "",
      catImg: "",
      resizedImage: "",

      // uploadImage: '',

      /* 피부병 Yes: 1, No: 0, 모름: -1  */
      skinDiseaseOptions: [
        { value: 1, text: "네 피부병이 있습니다." },
        { value: 2, text: "아니요 피부병이 없습니다." },
        { value: 3, text: "모르겠습니다." }
      ],
      /* 중성화 Yes: 1, No: 0, 모름: -1 */
      neuterOptions: [
        { value: 1, text: "네 중성화 수술을 했습니다." },
        { value: 2, text: "아니요 중성화 수술을 하지 않았습니다." },
        { value: 3, text: "모르겠습니다." }
      ],
      /* 상처 Yes: 1, No: 0, 모름: -1 */
      hurtOptions: [
        { value: 1, text: "네 상처가 있습니다." },
        { value: 2, text: "아니요 상처가 없습니다." },
        { value: 3, text: "모르겠습니다." }
      ]
    };
  },
  created() {
    this.server = this.$store.state.server;
  },
  methods: {
    handleClickButton() {
      this.visible = !this.visible;
    },
    fileSelect: function(event) {
      // console.log(this.$refs);
      this.catImg = this.$refs.catProfileImage.files[0];
      // console.log(this.catImg);

      /*
			var input = event.target
			if(input.files && input.files[0]) {
				var reader = new FileReader()
				reader.onload = (e) => {
					this.uploadImage = e.target.result
				}
				reader.readAsDataURL(input.files[0])
			}
			*/

      var canvas = document.getElementById("previewCanvas");
      var ctx = canvas.getContext("2d");

      var reader = new FileReader();
      reader.onload = function(event) {
        var img = new Image();

        img.onload = function() {
          canvas.width = 600;
          canvas.height = 600;
          ctx.drawImage(img, 0, 0, 600, 600);
        };

        img.src = event.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    },
    submit() {
      const fd = new FormData();
      fd.append("cat_location", this.cat_location);
      fd.append("catImg", this.catImg);

      fd.append("cat_no", this.cat_no);
      fd.append("cat_manager", this.getLoginInfo.user_no);
      fd.append(
        "reg_date",
        Vue.prototype.moment(new Date()).format("YYYY-MM-DD")
      );

      fd.append("cat_name", this.cat_name);
      fd.append("age", this.age);
      fd.append("sex", this.sex);
      fd.append("cat_desc", this.cat_desc);

      fd.append("skin_disease", this.skin_disease);
      fd.append("neuter", this.neuter);
      fd.append("hurt", this.hurt);

      fd.append("hair_color", this.hair_color);
      fd.append("eye_color", this.eye_color);

      for (let key of fd.entries()) {
        console.log(`${key}`);
      }
      console.log(fd);

      axios
        .post(this.server + `/api/cat/insert`, fd, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          console.log("200");
          if (res.data.state == "ok") {
            console.log("cat 저장 성공");
            console.log(res);
          } else {
            console.log("cat 등록 실패");
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
.addCat {
  width: 100%;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 60px;
  // padding-top: 100px;
  padding-top: 10px;
  padding-bottom: 125px;
}
.addCat .title-addCat {
  margin-top: 60px;
  margin-bottom: 40px;
  font-weight: bold;
  font-size: 42px;
}
#previewCanvas {
  width: 100%;
}
.canvas-wrap {
  position: relative;
  margin: 16px auto;

  &::after {
    content: "";
    display: block;
    // padding-bottom: 100%;
  }
}
.file-input-div {
  // margin: 0 auto;
  position: relative;
  width: 200px;
  height: 50px;
  overflow: hidden;
}
.file-input-button {
  width: 142px;
  height: 42px;
  position: absolute;
  top: 0px;
  color: #1d2f3a;
  border-radius: 8px;

  background: linear-gradient(137deg, #ffdab7, #f77c99, #657af2, #c2ffc5);
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

  filter: alpha(opacity=0);
  -ms-filter: "alpha(opacity=0)";
  -khtml-opacity: 0;
  -moz-opacity: 0;
}
// .basic-input {
  
// }
.basic-input label {
  display: inline-block;
  max-width: 100%;
  height: 52px;
  // font-weight: 550;
}
.basic-input input {
  width: 82%;
  height: 52px;
  float: right;
  background: 0 0; //? 이게 무슨 속성일까!
  // border-bottom: 1px solid #3da0a9;
  box-sizing: border-box;
}
#btn-show-modal-cat {
  border-top: solid 1px #3da0a9;
}
#btn-show-modal-cat,
#btn-show-modal-loc {
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
.input-wrap {
  margin-top: 20px;
}
.input-wrap .basic-input-row {
  // margin-bottom: 25px;
}
.basic-input-row {
  width: 100%;
  height: 52px;
  border-bottom: solid 1px #3da0a9;
}
.textField {
  // resize: none;
  margin-top: 30px;
  resize: vertical;
  // height: 252px;
  width: 70%;
  float: right;
}

.submit-wrap {
  width: 100%;
  height: 42px;
  padding-right: 5%;
}
.btn-save {
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
  .addCat {
    width: 600px;
  }
  #previewCanvas {
    width: 600px;
  }
  .selectPhoto {
    float: none;
    width: auto;
  }
  .writingText {
    float: none;
    width: auto;
  }
}
</style>