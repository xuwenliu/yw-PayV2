<template>
  <div>
    <BottomFooter>
      <div @click="listenerConfirmClick">下一步</div>
    </BottomFooter>
    <title>快捷收款</title>


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
    </div>


    <div class="mt30 bg0  f32 bt1" v-if="way != 1">
      <div class="f24 bb1" style="color: #787878;margin-left: 0.74666rem;padding: 0.2rem 0;">使用信用卡收款，还需提供下列信息:</div>
      <div class="btn-tab-s ">
        <span>有效期</span>
        <input class="f30" style="flex-grow: 2" type="text" maxlength="4" focus="true" placeholder="例如09/15，输入0915"
               v-model="validDate"/>
      </div>

      <div style="margin-left: 0.74666rem;height: 1px;background-color: #e5e5e5"></div>

      <div class="btn-tab-s bb1 ">
        <span>CVV2</span>
        <input class="f30" style="flex-grow: 2" type="tel" maxlength="3" focus="true" placeholder="卡背后三位"
               v-model="cvv2"/>
      </div>
    </div>

  </div>
</template>

<script>
  //	import TopHeader from '../../../components/Header'
  import BottomFooter from '../../components/Footer'

  /*mint-ui*/
  import {MessageBox} from 'mint-ui';
  import {Indicator} from 'mint-ui';
  import {Toast} from 'mint-ui';


  export default {
    name: 'collectionSecond',
    components: {
      BottomFooter,
    },
    data() {
      return {
        info: {
          amount: this.$route.query.amount,
          cardNO: this.$route.query.cid,
          id: this.$route.query.id,
        },
        way: this.$route.query.id,
        sendBtnText: "发送验证码",
        isdisabled: false,
        listenerSmsCodeInput: "",
        ispass: true,
        validDate: '',
        cvv2: ''
      }
    },
    created() {
      if (localStorage.getMoneyCompleted == 1) {
        this.$router.go(-1)
        return false;
      }

    },
    methods: {
      goBack() {
        this.$router.go(-1);
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
      listenerConfirmClick() {
        this.selectedCardPay();
      },


      selectedCardPay(){

//        if (!this.validDate) {
//          Toast({message: '请输入有效期', position: 'center', duration: 3000});
//          return false
//        }
//
//        if (!this.cvv2) {
//          Toast({message: '请输入卡背后三位', position: 'center', duration: 3000});
//          return false
//        }

        var data = {
          id: this.info.id,
          amount: this.info.amount,
          validDate: Rsa(this.validDate),
          cvv2: Rsa(this.cvv2)
        };
        Indicator.open();
        this.$http.post(`${window.Host.apiHost}/pos/selectCard`, data).then((res) => {
          Indicator.close();
          if (res.data.stateCode === 0) {
            this.$router.push({
              "path": "/collectionSecond",
              query: {'amount': res.data.data.amount, 'id': res.data.data.id, 'cid': res.data.data.cardNO, 'way': 1}
            });
          } else {
            MessageBox({
              closeOnClickModal: false,
              confirmButtonText: "我知道了",
              title: '提示',
              message: res.data.message,
              showCancelButton: false
            });
          }
        })
      }

    }, //methods结束
  }
</script>

<style scoped lang="less">
  .content {
    bottom: 1.33333rem;
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

  .desc-area {
    display: flex;
    flex-direction: row;
    align-items: center;
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
