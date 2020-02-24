<template>
  <div class="login text page">
    <div class="title-login">
      로그인
    </div>
    <div class="input-wrap">
      <div class="input-row">
        <label for="id">Email</label>
        <input
          type="text"
          v-model="user_email "
          id="id"
          placeholder="이메일을 입력하세요."
        />
      </div>
      <div class="input-row">
        <label for="password">비밀번호</label>
        <input
          type="password"
          id="password"
          v-model="user_pw"
          @keyup.enter="login"
          placeholder="비밀번호를 입력하세요."
        />
      </div>
    </div>
    <div class="btn-wrap">
      <router-link class="btn-pushSignUp" :to="'/signUp'">
        계정 만들기
      </router-link>
      <button
        class="btn-login"
        v-on:click="login"
      >로그인</button>
    </div>
  </div>
</template>


<script>
import UserApi from "@/apis/UserApi";
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      user_email: "",
      user_pw: "",
      error: {
        user_email: false,
        user_pw: false
      },
      idChecked: false,
      pwChecked: false
    };
  },
  created() {},
  methods: {
    ...mapActions(["postLogin"]),
    login() {
      // id, pw가 DB에 존재하는지 확인
      let { user_email, user_pw } = this;
      let data = {
        user_email,
        user_pw
      };
      this.postLogin(data);
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  position: absolute;
  width: 75vw;
  margin-left: 10vw;
  margin-right: 15vw;
  margin-top: 10px;
  margin-bottom: 60px;
  padding-top: 10px;
  padding-bottom: 125px;
}
.login .title-login {
  margin-top: 60px;
  margin-bottom: 40px;
  font-weight: 500;
  font-size: 28px;
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
.btn-wrap {
  height: 42px;
  line-height: 42px;
  margin-bottom: 25px;
  color: rgb(51, 136, 248);
}
.btn-wrap a:link {
  //href 속성이 있고 아직 클릭하지 않은 a태그의 색
  color: rgb(51, 136, 248);
}
.btn-wrap a:visited {
  //href 속성이 있고 클릭한 a태그의 색
  color: rgb(51, 136, 248);
}
.btn-login {
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
  .login {
    width: 400px;
    margin-left: calc((100vw - 400px)/2);
    margin-right: calc((100vw - 400px)/2);
  }
}
</style>