<template>
  <div class="addCat">
    <div class="title-addCat">NEW POST</div>

    <div class="reg-wrap">
      <div class="selectPhoto">
        <p>고양이 이미지 추가</p>

        <div class="canvas-wrap">
          <canvas id="previewCanvas">
            <!-- :src="uploadImage" -->
          </canvas>

        </div>

        <p>
          <input
            v-on:change="fileSelect"
            ref="catProfileImage"
            type="file"
            name="photo"
            id="uploadPhoto"
            required="required"
          >
        </p>
      </div>

      <div class="input-wrap">
        <!-- 넘겨줄 정보 -->

        <div class="basic-input">
          <!-- 입력받을 정보: cat_name, age, sex, cat_desc -->
          <div class="input-row">
            <label for="name">고양이 이름</label>
            <input
              type="text"
              id="name"
              v-model="cat_name"
              placeholder="고양이 이름을 지어주세요!!"
            >
          </div>
          <div class="input-row">
            <label for="age">나이</label>
            <input
              type="text"
              id="age"
              v-model="age"
              placeholder="고양이 나이"
            >
          </div>
          <div class="input-row">
            <label for="sex">성별</label>
            <input
              type="text"
              id="sex"
              v-model="sex"
              placeholder="남자/여자"
            >
          </div>

          <div class="writingText">
            <p>
              <textarea
                class="textField"
                v-model="cat_desc"
                wrap="hard"
                placeholder=" 상세 설명.."
              ></textarea>
            </p>
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

    <p>
      <input
        class="btn-upload"
        v-on:click="submit"
        type="submit"
        value="저장~!"
      >
    </p>
  </div>
</template>

<script>
import axios from "axios";
import Modal from "@/components/post/modal/Modal.vue";
import myModal from "@/components/post/modal/ModalExtraInfo";
export default {
  components: {
    Modal: Modal,
    appMyModal: myModal
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

      skinDiseaseOptions: [
        { value: 1, text: "네 피부병이 있습니다." },
        { value: 2, text: "아니요 피부병이 없습니다." },
        { value: 3, text: "모르겠습니다." }
      ],
      neuterOptions: [
        { value: 1, text: "네 중성화 수술을 했습니다." },
        { value: 2, text: "아니요 중성화 수술을 하지 않았습니다." },
        { value: 3, text: "모르겠습니다." }
      ],
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
      console.log(this.$refs);
      this.catImg = this.$refs.catProfileImage.files[0];
      console.log(this.catImg);

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
          canvas.width = 300;
          canvas.height = 300;
          ctx.drawImage(img, 0, 0, 300, 300);
        };

        img.src = event.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    },
    submit() {
      /* 피부병, 중성화, 다침 여부 Integer값으로 설정 */
      /*
      // 피부병 Yes: 1, No: 0, ?: -1
      if(this.skin_disease=='네 피부병이 있습니다.') {
        this.skin_disease = 1
      }else if(this.skin_disease=='아니요 피부병이 없습니다.') {
        this.skin_disease = 2
      }else {
        this.skin_disease = 3
      }

      // 중성화 Yes: 1, No: 0, ?: -1
      if(this.neuter=='네 중성화 수술을 했습니다.') {
        this.neuter = 1
      }else if(this.neuter=='아니요 중성화 수술을 하지 않았습니다.') {
        this.neuter = 2
      }else {
        this.neuter = 3
      }
      */

      const fd = new FormData();
      fd.append("cat_location", this.cat_location);
      fd.append("catImg", this.catImg);

      fd.append("cat_no", this.cat_no);
      fd.append("cat_manager", this.cat_manager);
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
        .post(this.server + `/api/cat/insert`, 
          fd, 
          { headers: {
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
  width: 600px;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 60px;
  // padding-top: 100px;
  padding-top: 10px;
  padding-bottom: 125px;
}
.canvas-wrap {
  position: relative;
  width: 70%;
  height: 360px;
}
.canvas-wrap:after {
  content: "";
  display: block;
  // padding-bottom: 100%;
}
#uploadCanvas {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>