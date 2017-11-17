<template>
  <div class="bg7" style="position: absolute;top: 0;left: 0;right: 0;bottom: 0;">

    <title>备忘录</title>

    <!--<div class="login-input-area" style="margin-top: 0.85333rem">-->
    <!--<input type="tel" placeholder="请输入手机号码" maxlength="11" v-model="bindUsernameInput" @keyup="eventUserNameInput">-->
    <!--</div>-->

    <!--<div class="login-input-area" style="margin-top: 0.56rem">-->
    <!--<input type="password" placeholder="请输入密码" maxlength="20" v-model="bindPwasswordInput">-->
    <!--</div>-->

    <textarea placeholder="请输入备注，30字以内" v-model.trim="channelRemark" rows=30 cols="4"
              class="inputBox-input f32 mt30" style="color: #000000"></textarea>

    <div class="login-button">
      <button class="fc0 f28 login-button-n" style="margin-top: 0.4rem"
              @click="listenerConfirm">完成
      </button>
    </div>

  </div>

</template>
<script>
  import TopHeader from '../../components/Header'
  import {MessageBox} from 'mint-ui';
  import {Indicator} from 'mint-ui';
  import {Toast} from 'mint-ui';

  export default{
    name: 'editRemark',
    components: {
      TopHeader
    },
    data(){
      return {
        isDisabled: false,
        channelRemark: '',
        channelUserId: ''
      }
    },

    created(){

      this.channelRemark = this.$route.query.channelRemark;
      this.channelUserId = this.$route.query.channelUserId;



    },

    methods: {

      listenerConfirm(){

        if (!this.channelRemark) {
          Toast({message: '输入不能为空', position: 'center', duration: 3000});
          return false;
        }
        if (this.channelRemark.length > 30) {
          Toast({message: '备注小于30个字', position: 'center', duration: 3000});
          return false;
        }

//        var data = {
//          "remark": this.channelRemark
//        };

//        console.log(data);

        Indicator.open();
        this.$http.post(`${window.Host.apiHost}/pos/develop/${this.channelUserId}/remark?remark=${this.channelRemark}`).then((res) => {
          Indicator.close();
          console.log(res);
          if (res.data.stateCode === 0) {
            this.$router.go(-1)
          } else {
            Toast({message: res.data.message, position: 'center', duration: 3000});
          }
        })
      }


    },

  }

</script>

<style>
  .inputBox-input {
    width: 100%;
    background-color: #FFFFFF;
    padding: 0.4rem;
    height: 2.02666rem;
    border: 0.026666rem #737373 solid;
    border: solid 1px #FFFFFF;
    text-align: start;
    box-sizing: border-box;
  }
</style>
