<template>
  <div class="bg0" style="position: absolute;top: 0;left: 0;right: 0;bottom: 0;">

    <title>欢迎注册钱刷刷</title>


    <div v-show="referrerUserInfo.referrerName" class="f30 fc2"
         style="display: flex;justify-content: center;margin-top: 0.66666rem;align-items: center">
      <img style="width: 0.42666rem;height: 0.42666rem;margin-right: 0.13333rem" src="../../assets/img/tjr_ic@2x.png">
      <span style="margin-right: 0.2rem">推荐人:{{referrerUserInfo.referrerName}} </span>
      <span> {{referrerUserInfo.referrerPhone | phonefilter(3)}}</span>
    </div>

    <div class="reg-input-area" style="margin-top: 0.85333rem">
      <span class="fc2">手机号</span>
      <input type="tel" placeholder="请输入手机号码" maxlength="11" v-model="bindUsernameInput" @keyup="eventUserNameInput">
    </div>


    <div class="reg-input-area" style="margin-top: 0.56rem">
      <span class="fc2">验证码</span>
      <input style="width: 2rem" type="number" placeholder="请输入验证码" maxlength="6" v-model="bindCodeInput"
             @keyup="eventUserNameInput">
      <div style="width: 1px;background-color:#b2b2b2; height: 0.5rem"></div>

      <button class="reg-send-text bg0 f30"
              :class="{'reg-send-text-d':isdisabled}"
              @click="listenerSendSmsCodeClick(bindUsernameInput)" :disabled="isdisabled">{{sendBtnText}}
      </button>
    </div>

    <div class="reg-input-area" style="margin-top: 0.56rem">
      <span class="fc2">新密码</span>
      <input type="password" placeholder="请输入8-20位数字或字母" maxlength="20" v-model="bindPwasswordInput">
    </div>


    <div class="reg-user-argument" v-show="false">
      <img @click="checkUserArgument" style="width: 0.4rem;height: 0.4rem;margin-right: 0.2rem" :src="defaultCheck">
      <span class="f22 fc2">我同意 <i @click="goUserArgument">《用户服务协议》</i></span>
    </div>

    <div class="login-button" style="margin-top: 0.66666rem">
      <button class="fc0 f28" :class="{'login-button-n':loginBtnEnable}"
              @click="listenerConfirmClick([bindUsernameInput,bindCodeInput,bindPwasswordInput])">提交注册
      </button>
    </div>

  </div>

</template>
<script>

  import TopHeader from '../../components/Header'
  /*mint-ui*/
  import {MessageBox} from 'mint-ui';
  import {Indicator} from 'mint-ui';
  import {Toast} from 'mint-ui';


  export default{
    name: 'reg',
    components: {
      TopHeader
    },
    data(){
      return {
        isDisabled: false,
        type: this.$route.query.type,
        userId: this.$route.query.u,
        sendBtnText: '发送验证码',
        bindUsernameInput: "",
        bindCodeInput: '',
        bindPwasswordInput: '',
        isdisabled: false,
        loginBtnEnable: false,
        dataAuto: {},
        totalTime: 60,
        checks: [require("../../assets/img/login_btn_agreement_s@2x.png"), require("../../assets/img/login_btn_agreement_n@2x.png")],
        userArgumentChecked: true,
        defaultCheck: "",
        referrerUserInfo: {
          "userId": 0,
          "referrerName": '',
          "referrerPhone": ''
        }
      }
    },
    created(){

      if (localStorage.sessions) {
        this.$router.push({path: `/index`});
        return false;
      }

      this.getRefrerrUserInfo();

      this.defaultCheck = this.checks[0]
    },
    mounted(){

    },

    methods: {
      eventUserNameInput(){
        this.loginBtnEnable = this.bindUsernameInput.length == 0 ? false : true;
      },

      checkUserArgument(){
        this.userArgumentChecked = !this.userArgumentChecked;
        if (this.userArgumentChecked) {
          this.defaultCheck = this.checks[0]
        } else {
          this.defaultCheck = this.checks[1]
        }
      },

      /**
       * 获取验证码
       * **/
      listenerSendSmsCodeClick(dt){
        if (!(Regex.phone.test(dt))) {
          Toast({
            message: '手机号输入不正确',
            position: 'center',
            duration: 3000
          });
          return false
        }
        if (this.isDisabled)return false;
        Indicator.open();
        this.$http.post(`${window.Host.apiHost}/user/sendSmsCode?phone=${dt}&source=1`).then((res) => {
          if (res.data.stateCode === 0) {
            this.downTime(this);
            Indicator.close();
          }
        })
      },


      getRefrerrUserInfo(){
        this.$http.get(`${window.Host.apiHost}/user/referrer/${this.userId}`).then(res => {
          console.log(res);
          if (res.body.succ) {
            this.referrerUserInfo = res.body.data;
          }
        })
      },


      /*打开用户服务协议*/
      goUserArgument(){
        this.$router.push({path: `/userArgument`})
      },

      /**
       * 倒计时
       * **/
      downTime(dt){
        dt.isdisabled = true;
        let i = 60;
        let timer = setInterval(function () {
          i--;
          dt.sendBtnText = i + "s";
          dt.isdisabled = true;
          if (i == 0) {
            clearInterval(timer);
            dt.sendBtnText = "重新发送";
            dt.isdisabled = false
          }
        }, 1000)
      },


      /**
       * reg post
       * **/
      listenerConfirmClick(dt){
        if (!this.loginBtnEnable)return false;
        if (!dt) {
          return false
        }


        if (this.type == 1) {
          if (!this.userArgumentChecked) {
            Toast({
              message: '请勾选用户服务协议',
              position: 'center',
              duration: 3000
            });
            return false
          }
        }

        if (!(Regex.phone.test(dt[0]))) {

          Toast({
            message: '手机号输入不正确',
            position: 'center',
            duration: 3000
          });
          return false
        }

        if (!(Regex.phonecode.test(dt[1]))) {
          Toast({
            message: '验证码为6位数字',
            position: 'center',
            duration: 3000
          });
          return false
        }


        if (!(Regex.password.test(dt[2]))) {
          Toast({
            message: '密码格式不正确',
            position: 'center',
            duration: 3000
          });
          return false
        }

        const data = {
          "phone": dt[0],
          "smsCode": dt[1],
          "password": Rsa(dt[2])
        };

        this.dataAuto = {
          "phone": dt[0],
          "password": String(dt[2])
        };

        this.isDisabled = true;
        this.$http.post((`${window.Host.apiHost}/user/register`), data).then((res) => {

          if (res.data.stateCode === 0) {
            if ((res.data.data) && (res.data.data.needConfirm)) {

              MessageBox({
                closeOnClickModal: false,
                message: res.data.data.message,
                showCancelButton: true
              }, (res) => {
                if (res == 'confirm') {
                  /*开通角色*/
                  this.openUserC(data)
                }
              });

            } else {
              /*重新登录*/
              Indicator.open();
              console.log(this.dataAuto);
              this.relogin(this.dataAuto);
            }
          } else {
            this.isDisabled = false;
            MessageBox({
              closeOnClickModal: false, confirmButtonText: "我知道了",
              message: res.data.message,
              showCancelButton: false
            });
          }

        })
      },

      /**
       * 如果是E账户开通C端身份
       * **/
      openUserC(data){
        this.$http.post(`${window.Host.apiHost}/user/confirm`, data).then(function (res) {
          if (res.data.stateCode === 0) {

            localStorage.loginAutoData = JSON.stringify(this.dataAuto);

            this.$router.go(-1);


//            this.$router.push({path: "/index", query: {loginAuto: 1}})

          } else {
            this.isDisabled = false;
            MessageBox({
              closeOnClickModal: false, confirmButtonText: "我知道了",
              message: res.data.message,
              showCancelButton: false
            });
          }
        })
      },

      relogin(dt){
        let data = {
          "phone": dt['phone'],
          "password": Rsa(dt['password']),
          "type": this.type || 1,
          "leaderId": this.userId || 1
        };

        this.$http.post(`${window.Host.apiHost}/user/login`, data).then((res) => {
          Indicator.close();
          if (res.data.stateCode === 0) {
            localStorage.sessions = JSON.stringify(res.data.data.userSession);//刷新仍登录
            localStorage.userId = res.data.data.id;
            this.$router.push({path: "/index"})
          } else {

            MessageBox({
              closeOnClickModal: false, confirmButtonText: "我知道了",
              title: '提示',
              message: res.data.message,
              showCancelButton: false
            });
          }
        })
      }

    },


  }

</script>

<style>
  /* login.wxss */

  .reg-input-area {
    height: 1.33333rem;
    margin: 0 0.74rem;
    display: flex;
    box-sizing: border-box;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: solid 1px #ff293c;
    font-size: 0.4rem;
  }

  .reg-input-area input {
    flex-grow: 2;
    margin-left: 0.93333rem;
  }

  .reg-send-text {
    color: #ff293c;
    width: 2.4rem;
    text-align: center;
  }

  .reg-send-text.reg-send-text-d {
    color: #b2b2b2;
  }

  .reg-user-argument {
    display: flex;
    flex-direction: row;
    margin-top: 0.82666rem;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
  }

</style>
