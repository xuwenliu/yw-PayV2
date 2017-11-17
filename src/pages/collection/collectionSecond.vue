<template>
  <div>
    <BottomFooter>
      <div @click="listenerConfirmClick(listenerSmsCodeInput)">确认</div>
    </BottomFooter>
    <title>快捷收款</title>

    <DialogWindow v-show="showSucc">
      <div class="show-dialog-box">

        <div class="index-dialog">
          <img src="../../assets/img/popup_ic_pass_n@2x.png" class="index-dialog-icon">
          <span>收款成功</span>
          <!--<p class="en-cut-txt">收款成功</p>-->
          <button @click="showSuccDialog(false)" class="f28 fc0">我知道了</button>
        </div>
      </div>

    </DialogWindow>

    <!--collectionSecond.wxml 快捷收款第二步 确认账单信息-->
    <div class="bb1 bt1 f32" style="margin-top:0.4rem;">
      <div class="btn-tab-s fc2" style="height: 1.76rem">
        <span>金额</span>
        <i>{{info.amount | toF2}}</i>
      </div>
      <div class="btn-tab-s bb1 bt1">
        <span>银行卡号</span>
        <i>{{info.cardNO | setSpaceBank}}</i>
      </div>

      <div class="btn-tab-s mt30  bt1">
        <span>验证码</span>
        <input style="width: 2rem;flex-grow: 2" type="tel" maxlength="6" focus="true" placeholder="请输入验证码"
               v-model="listenerSmsCodeInput"/>
        <!--<button class="send-sms-btn" @click="listenerSendSmsCodeClick" :style="{'opacity':(isdisabled?0.5:1)}"-->
        <!--:disabled="isdisabled">{{sendBtnText}}-->
        <!--</button>-->

        <div style="width: 1px;background-color:#b2b2b2; height: 0.5rem"></div>

        <button class="reg-send-text bg0 f30"
                :class="{'reg-send-text-d':isdisabled}"
                @click="listenerSendSmsCodeClick" :disabled="isdisabled">{{sendBtnText}}
        </button>
      </div>
    </div>


    <!--<div class="btn-tab-s mt30  bt1" v-if="way != 1">-->
    <!--<div class="f24" style="color: #787878;">使用信用卡收款，还需提供下列信息:</div>-->
    <!--<div class="btn-tab-s bb1 bt1">-->
    <!--<span>有效期</span>-->
    <!--<input class="f30" style="flex-grow: 2" type="text" maxlength="4" focus="true" placeholder="例如09/15，输入0915"-->
    <!--v-model="yxDate"/>-->
    <!--</div>-->
    <!--<div class="btn-tab-s bb1 bt1" v-if="way == 1">-->
    <!--<span>CVV2</span>-->
    <!--<input class="f30" style="flex-grow: 2" type="tel" maxlength="3" focus="true" placeholder="卡背后三位"-->
    <!--v-model="validDate"/>-->
    <!--</div>-->
    <!--</div>-->


  </div>
</template>

<script>
  //	import TopHeader from '../../../components/Header'
  import BottomFooter from '../../components/Footer'
  import DialogWindow from '../../components/DialogWindow'

  /*mint-ui*/
  import {MessageBox} from 'mint-ui';
  import {Indicator} from 'mint-ui';
  import {Toast} from 'mint-ui';


  export default {
    name: 'collectionSecond',
    components: {
      BottomFooter,
      DialogWindow
    },
    data() {
      return {
        info: {
          amount: this.$route.query.amount,
          cardNO: this.$route.query.cid,
          id: this.$route.query.id,
        },
        sendBtnText: "发送验证码",
        isdisabled: false,
        listenerSmsCodeInput: "",
        ispass: true,
        showSucc: false,
        validDate: '',
        cvv2: ''
      }
    },
    created() {

    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },

      showSuccDialog(show){
        this.showSucc = show;
        if (!show) {
          localStorage.getMoneyCompleted = 1;
          this.$router.go(-1);
        }
      },

      /**
       * 发送验证码
       * **/
      listenerSendSmsCodeClick() {
        if (!(this.info.id)) {
          return false
        }
        Indicator.open();
        this.$http.post(`${window.Host.apiHost}/pos/getSmsCode/${this.info.id}`).then((res) => {
          console.log(res);
          Indicator.close();
          if (res.data.stateCode === 0) {
            this.downTime(this);
          } else {
            Toast({message: res.data.message, position: 'center', duration: 3000});
          }
        })

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
       * 提交确定
       * **/
      listenerConfirmClick(dt) {

        this.toPat(dt);

      },


      toPat(dt){
        if (!(Regex.phonecode.test(dt))) {
          MessageBox({
            closeOnClickModal: false,
            confirmButtonText: "我知道了",
            message: '验证码为6位数字',
            showCancelButton: false
          });
          return false
        }

        if (!this.ispass) {
          return false
        }
        this.ispass = false;
        Indicator.open();

        this.$http.post(`${window.Host.apiHost}/pos/getMoney/${this.info.id}?smsCode=${this.listenerSmsCodeInput}`).then((res) => {
          this.ispass = true;
          Indicator.close();
          console.log(res);
          if (res.data.stateCode === 0) {
            this.showSuccDialog(true);

          } else {
            Toast({message: res.data.message, position: 'center', duration: 3000});
          }
        })
      },

    }, //methods结束
  }
</script>

<style scoped lang="less">
  .content {
    bottom: 1.33333rem;
  }

  .index-dialog {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 6.4rem;
    border-radius: 0.26666rem;
    background-color: #ffffff;
  }

  .index-dialog-icon {
    width: 1.0666rem;
    height: 1.0666rem;
    margin: 0.5333rem 0;
  }

  .index-dialog-icon-p {
    width: 0.82666rem;
    height: 1.0666rem;
    margin: 0.5333rem 0;
  }

  .index-dialog span {
    color: #505050;
    font-size: 0.42666rem;
    font-weight: bold;
  }

  .index-dialog p {
    text-align: center;
    font-size: 0.42666rem;
    margin-top: 0.26666rem;
    margin-left: 0.50666rem;
    line-height: 0.753333rem;
    margin-right: 0.50666rem;
    color: #505050;
  }

  .index-dialog button {
    width: 4rem;
    height: 0.93333rem;
    line-height: 0.93333rem;
    text-align: center;
    margin-top: 0.93333rem;
    margin-bottom: 0.4rem;
    border-radius: 0.6rem;
    background-image: url("../../assets/img/btn_n.png");
  }

  .btn-tab-s {
    display: flex;
    height: 1.33333rem;
    align-items: center;
    padding-right: 0.74666rem;
    padding-left: 0.74666rem;
    background-color: #ffffff;
  }

  .btn-tab-s span {
    width: 2.13333rem;
  }

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

</style>
