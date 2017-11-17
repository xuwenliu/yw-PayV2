<template>
  <div class="inputBankInfo">
    <!--<TopHeader>-->
    <!--<div class="clickMe" @click="goBack"><span></span></div>-->
    <!--快捷收款-->
    <!--</TopHeader>-->
    <BottomFooter>
      <div @click="listenerNextClick(dataInfo)">下一步</div>
    </BottomFooter>

    <!--<mt-popup v-model="popupVisible" popup-transition="popup-fade"-->
    <!--style="width:85%; padding:0.5rem 0;box-sizing: content-box;">-->

    <!--<div class="bank-area">-->

    <!--<div class="desc-area f28">-->
    <!--<span>贷记卡（信用卡 </span>-->
    <!--<img style="margin: 0 0.06666rem;" class="logo" src="../../../assets/img/yuan_more_bt.png"/>-->
    <!--<span> ）</span>-->
    <!--<span style="margin-left:0.61333rem;">借记卡（储蓄卡</span>-->
    <!--<img style="margin: 0 0.06666rem;" class="logo" src="../../../assets/img/sanjiao_more_bt.png"/>-->
    <!--<span> ）</span>-->
    <!--</div>-->

    <!--<div class="bank-list" style="margin-top:0.66666rem;">-->
    <!--<div class="item f28" v-for="item in banks">-->
    <!--<span>{{item.bank_name}}</span>-->
    <!--<div class="item-icon-area" style="margin-left:0.26666rem;">-->
    <!--<img v-if="item.xyk" class="logo" src="../../../assets/img/yuan_more_bt.png"></img>-->
    <!--</div>-->
    <!--<div class="item-icon-area" style="margin-left:0.13333rem;">-->
    <!--<img v-if="item.cxk" class="logo" src="../../../assets/img/sanjiao_more_bt.png"></img>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->

    <!--</mt-popup>-->
    <title>快捷收款</title>


    <!--inputBankInfo.wxml 添加新卡支付-->
    <div>
      <div class="info-input mt30 bt1 bb1" style="height: 1.76rem">
        <span>金额</span>
        <span style="text-align: left;flex-grow: 3;">{{dataInfo.amount | toF2}}</span>
        <input type="hidden" v-model="dataInfo.amount"/>
      </div>

      <!--<div class="bank-support-area">-->
      <!--<span style="padding:0.26666rem" @click="listenerViewSupportBankClick">支持的银行卡列表</span>-->
      <!--</div>-->

      <div class="bg0 bt1 bb1" style="margin-top: 0.4rem">
        <div class="info-input">
          <span>银行卡号</span>
          <input placeholder="请输入付款银行卡号" type="tel" maxlength="21" v-model="dataInfo.cardNO"/>
          <img @click="listenerSupportBankClick" src="../../../assets/img/info_ic@2x.png"
               style="height: 0.53rem;width: 0.53rem">
        </div>
        <div class="divider-padding-left"></div>
        <div class="info-input">
          <span>持卡人</span>
          <input placeholder="请输入持卡人姓名" type="text" maxlength="10" v-model="dataInfo.name"/>
        </div>
        <div class="divider-padding-left"></div>
        <div class="info-input">
          <span>身份证号</span>
          <input placeholder="请输入身份证号" type="text" maxlength="18" v-model="dataInfo.idCardNO"/>
        </div>
        <div class="divider-padding-left"></div>
        <div class="info-input">
          <span>手机号码</span>
          <input placeholder="请输入手机号码" type="tel" maxlength="11" v-model="dataInfo.mobilePhone"/>
        </div>
      </div>

      <div class="bg7"
           style="padding-top: 0.4rem;padding-bottom: 0.66666rem;display: flex;align-items: center;justify-content: center">

        <a style="display: flex;align-items: center;height: 0.8rem" @click="checkUserArgument"><img
          style="width: 0.4rem;height: 0.4rem;margin-right: 0.2rem" :src="defaultCheck"></a>
        <span class="fc1 f22">记录上述信息，下次无需重复输入</i></span>

      </div>


      <div class="bg0 bt1 bb1">
        <div style="margin-left:0.4rem;height: 0.88rem;line-height:0.88rem;color:#787878;" class="f28">
          使用信用卡，还需提供下列信息
        </div>
        <div class="divider-padding-left"></div>
        <div class="info-input">
          <span>有效期</span>
          <input placeholder="例如09/15，输入0915" type="tel" maxlength="4" v-model="dataInfo.validDate"/>
        </div>
        <div class="divider-padding-left"></div>
        <div class="info-input">
          <span>CVV2</span>
          <input placeholder="卡背后三位" type="tel" maxlength="3" v-model="dataInfo.cvv2"/>
        </div>
      </div>

      <div style="margin:0.4rem;" class="desc-area">
        <img style="margin-right:0.26666rem;width: 0.32rem;height: 0.32rem;"
             src="../../../assets/img/red_info_ic@2x.png"/> <span class="fc1 f22">信用卡第一次使用会扣除0.01元的预授权款，该款将在1周内退回</span>
      </div>
    </div>
  </div>
</template>

<script>
  import TopHeader from '../../../components/Header'
  import BottomFooter from '../../../components/Footer'
  import {Indicator} from 'mint-ui';
  import {MessageBox} from 'mint-ui';
  import {Toast} from 'mint-ui';


  export default {
    name: 'inputBankInfo',
    components: {
      TopHeader,
      BottomFooter,

    },
    data() {
      return {
        info: {
          amount: this.$route.query.amount,
          cardNO: this.$route.query.cid,
          id: this.$route.query.id,
        },
        dataInfo: {
          amount: localStorage.amountRes
        },
        checks: [require("../../../assets/img/login_btn_agreement_s@2x.png"), require("../../../assets/img/login_btn_agreement_n@2x.png")],
        defaultCheck: "",
        userArgumentChecked: false,
        bankInfo: {},
        popupVisible: false,
        banks: [
          {
            "bank_name": "工商银行",
            "xyk": true,
            "cxk": true
          },
          {
            "bank_name": "农业银行",
            "xyk": true,
            "cxk": false
          },
          {
            "bank_name": "建设银行",
            "xyk": true,
            "cxk": true
          },
          {
            "bank_name": "中国银行",
            "xyk": true,
            "cxk": false
          },
          {
            "bank_name": "招商银行",
            "xyk": true,
            "cxk": false
          },
          {
            "bank_name": "交通银行",
            "xyk": true,
            "cxk": false
          },
          {
            "bank_name": "邮储银行",
            "xyk": true,
            "cxk": false
          },
          {
            "bank_name": "中信银行",
            "xyk": true,
            "cxk": true
          },
          {
            "bank_name": "兴业银行",
            "xyk": true,
            "cxk": false
          },
          {
            "bank_name": "浦发银行",
            "xyk": true,
            "cxk": false
          },
          {
            "bank_name": "华夏银行",
            "xyk": true,
            "cxk": true
          },
          {
            "bank_name": "平安银行",
            "xyk": true,
            "cxk": true
          },
          {
            "bank_name": "光大银行",
            "xyk": true,
            "cxk": true
          },
          {
            "bank_name": "广发银行",
            "xyk": true,
            "cxk": true
          },
          {
            "bank_name": "北京银行",
            "xyk": true,
            "cxk": true
          },
          {
            "bank_name": "上海银行",
            "xyk": true,
            "cxk": false
          },
          {
            "bank_name": "民生银行",
            "xyk": true,
            "cxk": false
          }]
      }
    },
    created() {
      this.defaultCheck = this.checks[1]
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
       * 同意记录银行卡信息
       */
      checkUserArgument(){
        this.userArgumentChecked = !this.userArgumentChecked;
        if (this.userArgumentChecked) {
          this.defaultCheck = this.checks[0]
        } else {
          this.defaultCheck = this.checks[1]
        }
      },


      /**
       * 查看支持的银行卡列表
       */
      listenerSupportBankClick(){
        this.$router.push({path: '/supportBank'})
      },


      //下一步
      listenerNextClick(dt) {
        if (!(Regex.bankCard.test(dt['cardNO']))) {
          Toast({message: '银行卡号格式不正确', position: 'center', duration: 3000});
          return false
        }

        if (!(Regex.realname.test(dt['name']))) {
          Toast({message: '持卡人姓名格式不正确', position: 'center', duration: 3000});
          return false
        }

        if (!(Regex.identity.test(dt['idCardNO']))) {
          Toast({message: '身份证格式不正确', position: 'center', duration: 3000});
          return false
        }

        if (!(Regex.phone.test(dt['mobilePhone']))) {
          Toast({message: '手机号不正确', position: 'center', duration: 3000});
          return false
        }

        if (dt['validDate'] && !((/^[\d]{4}$/).test(dt['validDate']))) {
          Toast({message: '有效期格式不正确', position: 'center', duration: 3000});
          return false
        }

        if (dt['cvv2'] && !((/^[\d]{3}$/).test(dt['cvv2']))) {
          Toast({message: '请输入3位置数字', position: 'center', duration: 3000});
          return false
        }

        /*加密*/
        function forRsa(dt) {
          if (!dt) {
            return false
          }
          var o = {};
          for (var j in dt) {
            o[j] = Rsa(dt[j])
          }
          return o
        }

        var data = forRsa(dt);
        data.amount = dt.amount;
        data.recordBankCard = this.userArgumentChecked;
        console.log(data);
        Indicator.open();
        this.$http.post(`${window.Host.apiHost}/pos/writeCard`, data).then((res) => {
          Indicator.close();
          if (res.data.stateCode === 0) {
            this.$router.push({
              "path": "/collectionSecond",
              query: {'amount': res.data.data.amount, 'id': res.data.data.id, 'cid': res.data.data.cardNO, 'way': 2}
            });
          } else {
            Toast({message: res.data.message, position: 'center', duration: 3000});
          }
        })

      }
    }, //methods结束
  }
</script>

<style scoped lang="less">
  /* inputBankInfo.wxss */

  .content {
    bottom: 1.33333rem;
  }

  .bank-support-area {
    display: flex;
    height: 1.46666rem;
    justify-content: center;
    align-items: center;
    color: #3f87ea;
    font-size: 0.34666rem;
  }

  /**/
  .supportBank-title {

    display: flex;
    justify-content: center;
    margin: 0.66666rem 0;
  }

  .bank-area {
    padding: 0 0.4rem;
  }

  .bank-list {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .desc-area {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .logo {
    width: 0.18666rem;
    height: 0.18666rem;
  }

  .item {
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 2.8rem;
    height: 0.4rem;
    margin-bottom: 0.18666rem;
  }

  .item-icon-area {
    width: 0.18666rem;
    height: 0.18666rem;
    line-height: 0.18666rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }


</style>
