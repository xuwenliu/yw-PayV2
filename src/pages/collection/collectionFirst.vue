<template>
  <div class="bg7">
    <BottomFooter>
      <div @click="listenerNextClick">下一步</div>
    </BottomFooter>


    <DialogWindow v-show="showRemoveCard">
      <div class="show-dialog-box" @click="showRemoveCardDialog(false)">

        <div class="index-dialog" style="padding-top: 1.73333rem">
          <span>{{currentCard.bankName}} {{currentCard.cardTypeDesc}}</span>
          <span style="margin-top: 0.4rem">{{currentCard.cardNO | setStartBank}}</span>
          <p>移除后，再次使用这张卡收款需要重新填写相关信息</p>
          <div class="index-dialog-btn-area f28">
            <span @click="listenerRemoveCardDialogCancel">取消</span>
            <div style="height: 0.85333rem;background-color: #ffffff;width: 1px"></div>
            <span @click="listenerRemoveCardDialogConfirm">确认</span>
          </div>
        </div>
      </div>

    </DialogWindow>


    <title>快捷收款</title>


    <div>


      <div style="height: 2.77333rem;position: relative" class="bg0">
        <div class="amount-area bt1 bg0 fc2">
          <span>金额</span>
          <input type="tel" placeholder="每笔限额10-20000元" v-model="listenerAmountInput" maxlength="8"
                 @keyup="(listenerAmountInput>50000?listenerAmountInput=50000:'')"/>
          <img @click="listenerSupportBank" src="../../assets/img/info_ic@2x.png">
        </div>


        <div class="bb1" style="position:absolute; z-index:100;width :100%;height: 1.17rem;">
          <img style="width: 100%;height: 1.17rem" src="../../assets/img/bg_bank_area.png">


          <div
            style="position:absolute;bottom:0;padding-left: 0.74666rem;height: 1.01333rem;line-height:1.01333rem;">
            <span class="f24 fc1">手续费：{{bankBaseInfo.poundageRate}}%+{{bankBaseInfo.poundage}}元 到账时间：{{bankBaseInfo.arrival}}</span>
          </div>
        </div>

      </div>


      <div class="fee-area">
        <div class="fee-view bg0 f26 fc1">

          <!--<div class="fee-area-desc bb1">-->
          <!--<span class="f22">手续费:{{bankBaseInfo.poundageRate}}%+{{bankBaseInfo.poundage}}元 到账时间:{{bankBaseInfo.arrival}}</span>-->
          <!--</div>-->
          <div class="fee-view-tab ">
            <span class="text-l">付款手续费</span>
            <span
              class="text-r">{{(listenerAmountInput>=10?(listenerAmountInput*bankBaseInfo.poundageRate / 100):0 )|toF2}}</span>
          </div>
          <div class="fee-view-tab bb1 bt1">
            <span class="text-l">结算手续费</span>
            <span class="text-r">{{(listenerAmountInput>=10?bankBaseInfo.poundage:0) |toF2 }}</span>
          </div>
          <div class="fee-view-tab ">
            <span class="text-l">应到账金额</span>
            <span class="text-r">{{(listenerAmountInput>=10?(listenerAmountInput-(listenerAmountInput*bankBaseInfo.poundageRate / 100)-bankBaseInfo.poundage):0) | toF2}}</span>
          </div>

        </div>
        <div class="fee-area-desc f22 fc1" style="margin-top:0.8rem;">
          <img style="box-sizing:border-box;width: 0.32rem;height: 0.32rem;" src="../../assets/img/red_info_ic@2x.png"/>
          <span class="f22" style="margin-left:0.21333rem;color:#828282">以上数据仅供参考,以实际到账金额为准</span>
        </div>
      </div>

      <div class="bank-info-area" style="margin-bottom: 1.5rem">
        <div v-if="bankBaseInfo.cardBaseInfos">
          <div class="bg0 f24"
               style="padding-left:0.74666rem;height:0.88rem;line-height:0.88rem;color:#787878;box-sizing: border-box;">
            选择银行卡
          </div>
          <div class="">
            <ul style="padding-left:0.74666rem;" class="bb1 bt1 bg0">
              <li class="bank-info-tab" @click="checkNewBankCard">
                <div class="bank-info-tab-left fc2 b f32">
                  使用新银行卡
                </div>
                <img :src="defaultNewBankCard" alt=""/>
              </li>
              <li class="bank-info-tab bt1" v-for="(item,index) in bankBaseInfo.cardBaseInfos"
                  @click="checkBankCard(index,item)">
                <div class="bank-info-tab-left">
                  <div class="bank-info-tab-left-top">
                    <span class="f28">{{item.bankName}} {{item.cardTypeDesc}}</span>
                    <span @click="listenerRemoveCard(item)" class="f24" style="padding: 0.05rem 0.2rem;color: #ff293c">点击移除</span>
                  </div>
                  <div class="b f36 mt10">{{item.cardNO | setStartBank}}</div>
                </div>
                <img :src="inow==index?checkIcon[1]:checkIcon[0]" alt=""/>
              </li>
            </ul>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BottomFooter from '../../components/Footer'
  import DialogWindow from '../../components/DialogWindow'

  import {MessageBox} from 'mint-ui';
  import {Indicator} from 'mint-ui';
  import {Toast} from 'mint-ui';

  export default {
    name: 'collectFirst',
    components: {
      BottomFooter,
      DialogWindow
    },
    data() {
      return {
        inow: -1,
        showFooter: true,
        listenerAmountInput: "",
        defaultNewBankCard: "",
        checkIcon: [require("../../assets/img/gouxuan_weixuanzhong.png"), require("../../assets/img/choice_ic@2x.png"),],
        bankBaseInfo: '',
        finalAmount: 0,
        cardID: 0,
        cardNO: 0,
        showRemoveCard: false,
        currentCard: {},
        cardType: 1//int, 1==借记卡 2==信用卡),
      }
    },
    created() {
      this.defaultNewBankCard = this.checkIcon[1];
      if (localStorage.getMoneyCompleted == 1) {
        this.$router.go(-1)
        return false;
      }
      this.getBaseInfo();

    },
    mounted() {
      var _this = this;
      var h = document.body.scrollHeight;
      window.onresize = function () {
        if (document.body.scrollHeight < h) {
          _this.showFooter = false;
          _this.btm = 0;

        } else {
          _this.showFooter = true;
          _this.btm = 1.33333;
        }
      };
    },
    methods: {
      getBaseInfo() {
        Indicator.open();
        this.$http.get(`${window.Host.apiHost}/pos/quickGetMoney`).then((res) => {
          Indicator.close();
          console.log(res);
          if (res.data.stateCode === 0) {
            this.bankBaseInfo = res.body.data;
            for (var i in res.body.data.cardBaseInfos) {
              var cardNO = res.body.data.cardBaseInfos[i].cardNO;
              var realCardN = decRsa(cardNO);
              this.bankBaseInfo.cardBaseInfos[i].cardNO = realCardN;
            }
          } else {
            MessageBox({
              closeOnClickModal: false,
              confirmButtonText: "我知道了",
              title: '提示',
              message: res.body.message,
              showCancelButton: false
            }).then(action => {
              var code = res.data.stateCode;
              if (code === 1821) {//暂无收款权限
                this.$router.push({path: `/index`})
              } else if (code === 1824) {//身份认证未通过
                this.$router.push({path: `/index`})
              } else if (code === 1811) {//身份认证未提交
                this.$router.push({path: `/identityFirst`})
              } else {

              }
            });
          }
        })
      },


      listenerSupportBank(){
        this.$router.push({path: '/supportBank'})
      },

      listenerRemoveCard(item){
        this.currentCard = item;
        this.showRemoveCardDialog(true);
      },

      listenerRemoveCardDialogCancel(){
        this.showRemoveCardDialog(false);
      },


      listenerRemoveCardDialogConfirm(){
        this.showRemoveCardDialog(false);
        this.$http.post(`${window.Host.apiHost}/pos/bank-card/${this.currentCard.id}/delete`).then((res) => {
          if (res.body.succ) {
            MessageBox.alert('操作成功').then(action => {
              console.log("remove");
              this.checkNewBankCard();
              this.getBaseInfo();
            })
          } else {
            MessageBox({
              closeOnClickModal: false,
              confirmButtonText: "我知道了",
              title: '提示',
              message: res.data.message,
              showCancelButton: false
            });
          }
        }, (error) => {

        })
      },


      showRemoveCardDialog(show){
        this.showRemoveCard = show
      },

      goBack() {
        this.$router.go(-1);
      },
      checkNewBankCard() {
        this.defaultNewBankCard = this.checkIcon[1];
        this.inow = -1;

      },
      checkBankCard(idx, item) {
        this.inow = idx;
        this.cardId = item.id;
        this.cardNO = item.cardNO;
        this.defaultNewBankCard = this.checkIcon[0];
        this.cardType = item.cardType;
      },

      /**
       * 下一步
       * **/
      listenerNextClick() {

        localStorage.amountRes = this.listenerAmountInput; // 输入的金额

        if (!(Regex.price.test(this.listenerAmountInput)) || (this.listenerAmountInput) * 1 < 10 || (this.listenerAmountInput) * 1 > 20000) {
          MessageBox({
            closeOnClickModal: false,
            confirmButtonText: "我知道了",
            message: "金额错误，每笔限额10-20000元",
            showCancelButton: false
          });
          return false
        }

        if ((this.inow > -1) && (this.cardId)) {


          if (this.cardType == 1) {
            //选择储蓄卡支付
            var data = {
              id: this.cardId,
              amount: this.listenerAmountInput,
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

          } else {
            //选择信用卡支付/**/
            this.$router.push({
              "path": "/selectedCardPay",
              query: {'amount': this.listenerAmountInput, 'id': this.cardId, 'cid': this.cardNO, 'way': 1}
            });

          }


        } else {
          this.$router.push({"name": "inputBankInfo"})
        }
      }
    },
  }
</script>

<style scoped lang="less">
  /* collectFirst.wxss */

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
    font-size: 0.34666rem;
    margin-top: 0.26666rem;
    margin-left: 0.50666rem;
    line-height: 0.753333rem;
    margin-right: 0.50666rem;
    color: #505050;
  }

  .index-dialog-btn-area {
    margin-top: 0.93333rem;
    border-bottom-left-radius: 0.26666rem;
    background-color: #ff293c;
    text-align: center;
    width: 100%;
    height: 1.33333rem;
    line-height: 1.33333rem;
    align-items: center;
    display: flex;
    justify-content: space-between;
    border-bottom-right-radius: 0.26666rem;
  }

  .index-dialog-btn-area span {
    width: 50%;
    height: 100%;
    background-color: transparent;
    color: #ffffff;
  }

  .content {
    bottom: 1.33333rem;
  }

  .amount-area {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    height: 1.76rem;
    align-items: center;
    padding: 0 0.4rem;
    margin-top: 0.4rem;
    font-size: 0.42666rem;

  span {
    width: 2.88rem;
  }

  input {
    flex-grow: 2;
  }

  img {
    width: 0.53333rem;
    height: 0.53333rem;
  }

  }

  .fee-area {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding-top: 0.50666rem;
    padding-left: 0.74666rem;
    padding-right: 0.74666rem;
  }

  .fee-view {
    width: 100%;
    box-sizing: border-box;
    font-size: 0.34666rem;
    border: solid #e5e5e5 1px;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .fee-view-tab {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    height: 1.09333rem;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    margin: 0 0.8rem;
  }

  .fee-view-tab .text-l {
  }

  .fee-view-tab .text-r {
  }

  .fee-area-desc {
    flex-grow: 2;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .bank-info-area {
    width: 100%;
    /*position: absolute;*/
    /*bottom: 0;*/
    /*z-index: 99;*/
    margin-top: 0.64rem;
  }

  .bank-info-tab {
    height: 1.76rem;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .bank-info-tab-left {
    display: flex;
    flex-direction: column;
  }

  .bank-info-tab-left-top {
    display: flex;
    align-items: center;
  }

  /*.bank-info-tab span {*/
  /*width: 2.88rem;*/
  /*text-align: center;*/
  /*line-height: 1.3rem;*/
  /*height: 1.3rem;*/
  /*}*/

  /*.bank-info-tab div {*/
  /*display: flex;*/
  /*flex-grow: 2;*/
  /*justify-content: flex-start;*/
  /*flex-direction: column;*/
  /*}*/

  .bank-info-tab img {
    margin-right: 0.4rem;
    width: 0.61333rem;
    height: 0.61333rem;
  }

  .bankcards-area {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
</style>
