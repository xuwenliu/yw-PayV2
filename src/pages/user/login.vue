<template>
  <div class="bg0" style="position: absolute;top: 0;left: 0;right: 0;bottom: 0;">

    <title>登录注册</title>

    <div class="login-input-area" style="margin-top: 0.85333rem">
      <input type="tel" placeholder="请输入手机号码" maxlength="11" v-model="bindUsernameInput" @keyup="eventUserNameInput">
    </div>

    <div class="login-input-area" style="margin-top: 0.56rem">
      <input type="password" placeholder="请输入密码" maxlength="20" v-model="bindPwasswordInput"
             @keyup="eventUserNameInput">
    </div>

    <div class="login-button" style="margin-top: 1.33333rem">
      <button class="fc0 f28" :class="{'login-button-n':loginBtnEnable}"
              @click="listenerLoginClick([bindUsernameInput,bindPwasswordInput])">登录
      </button>
    </div>


    <div class="extra-button-area f28">
      <button class="fc1 bg0" @click="listenerFindClick">忘记密码?</button>
      <button class="fc3 bg0" @click="listenerRegisterClick">注册新账号</button>
    </div>

  </div>

</template>
<script>
  import TopHeader from '../../components/Header'
  import {MessageBox} from 'mint-ui';
  import {Indicator} from 'mint-ui';
  import {Toast} from 'mint-ui';

  //  王兵:
  //    13900000004
  //  王兵:
  //    13880756056

  export default{
    name: 'login',
    components: {
      TopHeader
    },
    data(){
      return {
        isDisabled: false,
        bindUsernameInput: '',
        bindPwasswordInput: '',
        isShow: true,
        loginBtnEnable: false
      }
    },

    created(){
      /*登录直接跳首页*/
      if (localStorage.sessions) {
        this.$router.push({path: "/index" + location.search})
//        this.$router.go(-1)
      }
//      localStorage.removeItem('sessions');


    },

    methods: {

      getQuery(){
        const uri = this.$route || "";
        return uri.fullPath.replace(uri.path, '') || "?";
      },

      goBack(){
        this.$router.go(-1);
      },

      eventUserNameInput(){
        this.loginBtnEnable = this.bindUsernameInput.length == 0 ? false : true;
      },

      listenerFindClick(){
        this.$router.push({path: `/reg${this.getQuery()}&t=2`});//t=1,注册；t=2,找回密码
      },
      listenerRegisterClick(){
        this.$router.push({path: `/reg${this.getQuery()}&t=1`});//t=1,注册；t=2,找回密码

      },

      /**
       * login
       * **/
      listenerLoginClick(dt){


        if (!this.loginBtnEnable)return false;
        if (!dt) {
          return false
        }
        if (!(Regex.phone.test(dt[0]))) {
          Toast({
            message: '手机号输入不正确',
            position: 'center',
            duration: 3000
          });
          return false
        }

        if (!(Regex.password.test(dt[1]))) {
          Toast({
            message: '密码格式不正确',
            position: 'center',
            duration: 3000
          });
          return false
        }


        const data = {
          "phone": dt[0],
          "password": Rsa(dt[1]),
          "type": this.$route.query.type || 1,
          "leaderId": this.$route.query.leaderId || 1
        };
        this.isDisabled = true;
        Indicator.open();
        this.$http.post(`${window.Host.apiHost}/user/login`, data).then((res) => {
          Indicator.close();
          console.log(res);
          if (res.data.stateCode === 0) {
//            localStorage.removeItem('sessions');
            localStorage.sessions = JSON.stringify(res.data.data.userSession);//刷新仍登录
            localStorage.userId = res.data.data.id;
            this.$router.push({path: "/index" + location.search})

          } else {
            this.isDisabled = false;
            Toast({
              message: res.data.message,
              position: 'center',
              duration: 3000
            });
          }
        })
      }
    },

  }

</script>

<style>
  /* login.wxss */

  .login-input-area {
    height: 1.33333rem;
    margin: 0 0.74rem;
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-bottom: solid 1px #ff293c;
    font-size: 0.4rem;
  }

  .login-input-area input {
    flex-grow: 2;
    width: 100%;
    font-size: 0.4rem;
  }

  .extra-button-area {
    box-sizing: border-box;
    margin-left: 0.74rem;
    margin-right: 0.74rem;
    display: flex;
    justify-content: space-between;
    margin-top: 0.773333rem;
  }
</style>
