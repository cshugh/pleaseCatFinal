<template>
  <div>
    <div class="signup text page">
      <div class="title-signup">
        😺고양이를 부탁캣😺 계정 만들기
      </div>

      <div class="reg-wrap">

        <div class="selectPhoto">
          <!-- <p>프로필 사진 추가</p> -->
          <div class="canvas-wrap">
            <canvas id="previewCanvas">
              <!-- :src="uploadImage" -->
            </canvas>
          </div>

          <div class="file-input-div">
            <p>
              <input
                type="button"
                value="프로필 사진 추가"
                class="file-input-button"
              />
              <input
                class="file-input-hidden"
                v-on:change="fileSelect"
                ref="userProfileImage"
                type="file"
                name="photo"
                required="required"
              >
            </p>
          </div>
        </div>

        <div class="input-wrap">
          <!-- 입력받을 정보: name, email, id, pw, image, desc -->
          <div class="input-row">
            <label for="email">E-mail</label>
            <input
              type="email"
              id="email"
              v-model="user_email"
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div class="input-row">
            <label for="password">비밀번호</label>
            <input
              type="password"
              id="password"
              v-model="user_pw"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <div class="input-row">
            <label for="id">닉네임</label>
            <input
              type="text"
              id="id"
              v-model="user_id"
              placeholder="아이디를 입력하세요"
            />
          </div>
        </div>

      </div>

      <div class="btn-wrap">
        <button
          class="btn-signup"
          v-on:click="signup"
        >계정 만들기</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import UserApi from "@/apis/UserApi";
import { mapActions, mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      userImg: "",

      user_id: "",
      user_pw: "",
      user_email: "",

      error: {
        user_id: false,
        user_pw: false,
        user_email: false
      }
    };
  },
  created() {
    this.server = this.$store.state.server;
  },

  methods: {
    ...mapActions(["postSignUp"]),

    fileSelect: function(event) {
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

    signup() {
      this.userImg = this.$refs.userProfileImage.files[0];
      const fd = new FormData();
      fd.append("userImg", this.userImg);
      fd.append("user_email", this.user_email);
      fd.append("user_id", this.user_id);
      fd.append("user_pw", this.user_pw);

      for (let key of fd.entries()) {
        console.log(`${key}`);
      }
      this.postSignUp(fd);
      // this.$router.push('/login')
    }
  }
};
</script>

<style lang="scss" scoped>
.signup {
  position: absolute;
  width: 75vw;
  margin-left: 10vw;
  margin-right: 15vw;
  margin-top: 10px;
  margin-bottom: 60px;
  padding-top: 10px;
  padding-bottom: 125px;
}
.signup .title-signup {
  margin-top: 60px;
  margin-bottom: 40px;
  // font-weight: bold;
  font-weight: 500;
  font-size: 22px;
}
#previewCanvas {
  width: 100%;
}
.canvas-wrap {
  position: relative;
  margin: -5.8px auto;

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
  color: #1d3e6e;
  // border-radius: 8px;

  background: linear-gradient(
    135deg,
    #b1f6ff,
    #7aafeb,
    #48bdeb,
    #f4ff5c,
    #fde34d
  );
  background-size: 500% 500%;
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
.input-wrap {
  padding-bottom: 16px;
}

.input-row {
  width: 100%;
  height: 56px;
  border-bottom: solid 1px rgba(49, 137, 209, 0.308);

  label {
    display: inline-block;
    line-height: 56px;
    max-width: 100%;
  }
  input {
    width: 78%;
    height: 56px;
    line-height: 56px;
    float: right;
    background: 0 0; //? 이게 무슨 속성일까!
    box-sizing: border-box;
    padding: 7px 8px 7px;
  }
  input::placeholder {
    color: #2d57966e;
  }
}
.btn-signup {
  float: right;
  width: 142px;
  height: 42px;
  border-radius: 8px;
  background: #83d0fd;
  color: #1d3e6e;
  text-align: center;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
  transition: all 0.3s;

  &:hover {
    color: #fff;
    box-shadow: 148px 0 0 0 rgba(12, 132, 230, 0.493) inset;
    // color: #1d2f3a;
    // font-weight: 550;
  }
}

@media (min-width: 600px) {
  .signup {
    width: 450px;
    margin-left: calc((100vw - 450px) / 2);
    margin-right: calc((100vw - 450px) / 2);
  }
  #previewCanvas {
    width: 60vw;
  }
  .selectPhoto {
    float: none;
    width: auto;
  }
}
</style>