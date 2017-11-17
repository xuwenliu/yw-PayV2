<template>
  <div style="position: absolute;top: 0;left: 0;right: 0;bottom: 0;overflow-y: auto;padding-bottom: 1.4rem" class="bg7">

    <title>钱刷刷</title>

    <DialogWindow v-show="showIdentityReason">
      <div class="show-dialog-box" @click="showIdentityReasonDialog(false)">

        <div class="index-dialog">
          <img src="../../assets/img/popup_ic_not_pass_n@2x.png" class="index-dialog-icon">
          <span>未通过原因</span>
          <p class="en-cut-txt">{{baseInfo.rejectReason}}</p>
          <button @click="goIdentity" class="f28 fc0">重新提交资料</button>
        </div>
      </div>

    </DialogWindow>

    <DialogWindow v-show="showNoPermission">
      <div class="show-dialog-box">
        <div class="index-dialog">
          <img src="../../assets/img/popup_ic_no_permission_n@2x.png" class="index-dialog-icon-p">

          <span>暂无快捷收款权限</span>
          <p>抱歉，您的收款权限已关闭若有疑问，请联系</p>
          <p>
            <a href="tel:02885108029" class="b" style="border-bottom: solid 1px #ff293c;color: #ff293c">028-85108029</a>
          </p>

          <button @click="showNoPermissionDialog(false)" class="f28 fc0">我知道了</button>

        </div>
      </div>
    </DialogWindow>

    <!--未登录头部布局-->
    <div class="index-header-logout bg0" v-show="!logged">
      <div class="index-header-area">
        <div class="index-header-bg"></div>

        <div class="index-header-portrait-area">
          <img class="index-header-portrait-img" src="../../assets/img/home_user_login_n@2x.png">
        </div>
        <img @click="goFuncDesc"
             style="width: 1.86666rem;height: 0.48rem;position: absolute;right: 0.32rem;top: 0.61333rem; "
             src="../../assets/img/home_btn_info_n@2x.png">
      </div>
      <div style="text-align: center" class="f24 fc1 mt10">注册账号，开通快捷收款</div>
      <div class="index-header-login-button-area">
        <button class="index-header-login-button bg0 mt10 fc4 f30" @click="goLogin">登录 / 注册</button>
      </div>
    </div>

    <!--已登录头部布局-->
    <div class="index-header-logged bg0" v-show="logged">

      <div class="index-header-bg">

        <!--用户信息-->
        <div class="index-header-user-area">

          <img class="index-header-portrait-img" src="../../assets/img/home_pic_user_head_n@2x.png"
               :src="baseInfo.customerDto.showHead">

          <div class="index-header-user-info" style="flex-grow: 2;margin-left: 0.8rem">

            <div v-show="!baseInfo.customerDto.showName" class="f36 fc0 b">{{baseInfo.customerDto.userPhone |
              phonefilter(3)}}
            </div>
            <div v-show="baseInfo.customerDto.showName" class="f36 fc0 b">{{baseInfo.customerDto.showName}}</div>
            <div class="f32" style="color: #fed0cb;margin-top: 0.2666rem" @click="loginOut">退出登录</div>

          </div>

          <img @click="goFuncDesc" style="width: 1.86666rem;height: 0.48rem "
               src="../../assets/img/home_btn_info_n@2x.png">

        </div>
      </div>

      <!--card area-->
      <div class="index-user-card-area" style="bottom: 0;left: 0;right: 0;">


        <!--background-->
        <img style="height:3.41333rem;position: absolute;z-index: 0;left: 0;right: 0;bottom: 0;"
             src="../../assets/img/home_bg_bank_n@2x.png">
        <!--0 = 未提交，1 = 未审核，2 = 已通过，3 = 未通过,-->
        <!--未进行过身份认证-->
        <div v-show="baseInfo.auditStatus == 0" class="index-identity-authentication"
             style="height:3.41333rem;width: 100%;position: absolute; z-index: 2">
          <img class="index-identity-authentication-icon" src="../../assets/img/home_ic_authentication_n@2x.png">
          <div class="index-identity-authentication-button" @click="goIdentity">
            <span class="f28 fc3">请进行身份认证</span>
            <img src="../../assets/img/more_ic_red@2x.png">
          </div>
        </div>

        <!--&lt;!&ndash;进行过身份认证 && 认证审核中&ndash;&gt;-->
        <!--<div v-show="baseInfo.auditStatus == 1" class="index-identity-authentication"-->
        <!--style="height:3.41333rem;width: 100%;position: absolute; z-index: 2">-->
        <!--<img class="index-identity-authentication-icon" src="../../assets/img/home_ic_authentication_n@2x.png">-->
        <!--<div class="index-identity-authentication-button">-->
        <!--<span class="f28 fc3">审核中</span>-->
        <!--<img src="../../assets/img/more_ic_red@2x.png">-->
        <!--</div>-->
        <!--</div>-->

        <!--进行过身份认证 && 认证未通过-->
        <div v-show="baseInfo.auditStatus == 3 " class="index-identity-authentication"
             style="height:3.41333rem;width: 100%;position: absolute; z-index: 2">
          <img class="index-identity-authentication-icon" src="../../assets/img/home_ic_authentication_fail_n@2x.png">
          <div class="index-identity-authentication-button" @click="showIdentityReasonDialog(true)">
            <span class="f28 fc3">身份认证未通过，点击查看原因</span>
            <img src="../../assets/img/more_ic_red@2x.png">
          </div>
        </div>

        <!--进行过身份认证 && 认证通过-->
        <div v-show="baseInfo.auditStatus == 2 || baseInfo.auditStatus == 1" class="index-identity-authentication"
             style="height:3.41333rem;width: 100%;box-sizing:border-box;position: absolute; z-index: 2">

          <div class="index-identity-bank"
               style="height:3.41333rem;left:0;top:0;position: absolute;right: 0; z-index: 2">

            <img v-show="baseInfo.bankGrayLogo"
                 style="width: 2.74666rem;z-index:0;height: 2.37333rem;position: absolute;bottom: 0;right: 0.87333rem;box-sizing: border-box"
                 :src="baseInfo.bankGrayLogo">

            <span class="f24 fc1">结算银行卡</span>

            <div class="index-identity-bank-info" style="position: relative;z-index: 2">
              <img :src="baseInfo.bankLogo">

              <div>
                <span class="f32 fc2">{{baseInfo.bankName}}</span>
                <span class="f38 fc2">{{baseInfo.cardNO | setStartBank}}</span>
              </div>
            </div>


          </div>

        </div>

      </div>

    </div>

    <!--func area-->
    <div class="index-func-area bg0 bb1">

      <div class="index-func-button" @click="goCollections">

        <div style="display: flex;flex-direction: column;width:  1.52rem;height:  1.52rem;position: relative;">

          <img class="index-func-button-icon" src="../../assets/img/home_btn_-collect_n@2x.png">
          <i class="f26 fc1">快捷收款</i>

          <img v-show="baseInfo.showGetRedDot" class="index-func-dot" src="../../assets/img/home_bubble_new_n@2x.png">

        </div>

      </div>
      <div class="dc-deep" style="width: 1px;height: 0.66666rem"></div>
      <div class="index-func-button" @click="goDealLogs">

        <img class="index-func-button-icon" src="../../assets/img/home_btn_payment_n@2x.png">
        <i class="f26 fc1">交易记录</i>
      </div>
    </div>

    <!--menus area-->
    <ul
      v-show="logged && ((baseInfo.twitterStatus == 2 || baseInfo.twitterStatus == 3) || baseInfo.showSpread || baseInfo.showDevelop)"
      class="index-menus-area bg0 f26 fc1 bt1 bb1">

      <!--我的收益-->
      <li @click="goMyEarnings" v-show="baseInfo.twitterStatus == 2 || baseInfo.twitterStatus == 3">
        <img class="index-menus-area-icon" src="../../assets/img/home_ic_wdsy_n@2x.png">
        <i>我的收益</i>
        <img class="index-func-area-arrow" src="../../assets/img/more_ic@2x.png">
      </li>

      <!--发展收款客户-->
      <li class="bt1" @click="goDevelopCustomers" v-show="baseInfo.showSpread">
        <img class="index-menus-area-icon" src="../../assets/img/home_ic_fzskkh_n@2x.png">
        <i>发展收款客户</i>
        <img class="index-func-area-arrow" src="../../assets/img/more_ic@2x.png">
      </li>

      <!--发展下级推客-->
      <li class="bt1" @click="goDevelopTwitters" v-show="baseInfo.showDevelop">
        <img class="index-menus-area-icon" src="../../assets/img/home_ic_fzxxtk_n@2x.png">
        <i>发展下级推客</i>
        <img class="index-func-area-arrow" src="../../assets/img/more_ic@2x.png">
      </li>

    </ul>

    <!--bottom button-->
    <button class="bottom-button" @click="attentionYwmjPay" style="position: fixed">一键关注 钱刷刷</button>

  </div>

</template>
<script>
  import TopHeader from '../../components/Header'
  import DialogWindow from '../../components/DialogWindow'
  import {MessageBox} from 'mint-ui';
  import {Indicator} from 'mint-ui';
  import {Toast} from 'mint-ui';
  const wx = require("weixin-js-sdk");


  //  王兵:
  //    13900000004
  //  王兵:
  export default{
    name: 'login',
    components: {
      TopHeader,
      DialogWindow
    },
    data(){
      return {
        logged: false,//是否已登录
        showIdentityReason: false,
        showNoPermission: false,
        bindCard: false,
        baseInfo: {
          "customerDto": {
            "id": 0,
            "userName": "",
            "password": "",
            "userPhone": "15681112269",
            "userType": "",
            "available": false,
            "name": "",
            "gender": "",
            "age": "",
            "mail": "",
            "idCard": "",
            "idImageA": "",
            "idImageB": "",
            "idHoldImage": "",
            "idHoldImageB": "",
            "createUserId": 0,
            "createTime": "",
            "updateTime": "",
            "lastLoginTime": "",
            "loginIp": "",
            "loginAddress": "",
            "registerIp": "",
            "registerAddress": "",
            "imUid": "",
            "nickName": "",
            "headImage": "",
            "customerType": "",
            "customerTypeDesc": "",
            "intention": false,
            "remarks": "",
            "customerTwitterId": 0,
            "twitterName": "",
            "twitterPhone": "",
            "showName": "",
            "showHead": ""
          },
          "cardNO": "",
          "bankName": "",
          "bankLogo": "",
          "auditStatus": 0,//身份认证审核状态，0 = 未提交，1 = 未审核，2 = 已通过，3 = 未通过,
          "rejectReason": "",
          "showGetRedDot": false,
          "twitterStatus": 2,
          "showSpread": false,
          "showDevelop": false
        },
      }
    },

    created(){

//      location.href = location.href + "?u=" + localStorage.userId;
//      console.log(location.href);
//      localStorage.removeItem('sessions');
      this.getBaseInfo();
      this.wxInit();


      if (this.$route.query.open) {
        localStorage.open = 'open';
        location.href = location.origin + "/#" + this.$route.path + `?u=${localStorage.userId}&type=1`;
        return false;
      }

      if (!localStorage.sessions) {
        if (this.$route.query.u && !localStorage.open) {
          this.$router.push({path: `/register`, query: {u: this.$route.query.u, type: 1}});
          return false;
        }
      }

      localStorage.removeItem("open")


    },

    methods: {

      getQuery(){
        const uri = this.$route || "";
        return uri.fullPath.replace(uri.path, '') || "?";
      },


      wxInit(){
        var _this = this;
        console.log("xxxxx");

        console.log(window.location.href.split('#')[0]);
        this.$http.post(`${window.Host.apiHost}/pos/getSign`, {
          "url": window.location.href.split('#')[0]
//          "url": "https://prepos.yingwumeijia.com/"
        }).then((res) => {
          console.log(res);

          if (res.body.succ) {
            var result = res.data.data;
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: result.appId, // 必填，公众号的唯一标识
              timestamp: result.timestamp, // 必填，生成签名的时间戳
              nonceStr: result.nonceStr, // 必填，生成签名的随机串
              signature: result.signature, // 必填，签名，见附录1
              jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });

            wx.error(function (res) {
              //config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
//              alert(JSON.stringify(res));

            });


            wx.ready(function () {


              //朋友圈
              wx.onMenuShareTimeline({
                title: '钱刷刷', // 分享标题
                link: location.protocol + "//" + location.host + `#/register?u=${localStorage.userId}&type=1`,
                // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: 'http://osz2pnx97.bkt.clouddn.com/xiaochengxu_share.png',
                success: function () {

                },
                cancel: function () {

                }
              });

              //朋友
              wx.onMenuShareAppMessage({
                title: '钱刷刷',
                desc: '装修主材，信息服务工具。', //分享描述
                link: location.protocol + "//" + location.host + `#/register?u=${localStorage.userId}&type=1`,
                imgUrl: 'http://osz2pnx97.bkt.clouddn.com/xiaochengxu_share.png',
                type: 'link', //分享类型,music、video或link，不填默认为link
                success: function () {

                },
                cancel: function () {

                }
              });

            });


          }
        });


      },


      /**
       * 获取页面基础信息
       */
      getBaseInfo(){
        this.$http.get(`${window.Host.apiHost}/pos/user`).then((res) => {
          console.log(res);
          if (res.body.succ) {
            this.logged = true;
            this.baseInfo = res.body.data;
            this.baseInfo === 0 ? this.isIdentity = false : this.isIdentity = true;
            if (res.body.data.cardNO) {
              this.baseInfo.cardNO = decRsa(res.body.data.cardNO)
            }
//            this.bindCard = this.baseInfo.cardNO;
//            this.showDot = this.baseInfo.showGetRedDot;
            localStorage.identityCompleted = 0 //提交认证资料的开关
          } else {
            if (res.body.stateCode == 312) {
              this.logged = false;
              localStorage.removeItem('sessions')
            } else {
              Toast({message: res.data.message, position: 'center', duration: 3000});
            }
          }
        })

      },


      loginOut(){
        this.$http.post(`${window.Host.apiHost}/user/logout`).then((res) => {
          console.log(res);
          if (res.body.succ) {
            this.goLogin()
          } else {
            Toast({message: res.data.message, position: 'center', duration: 3000});
          }
        })
      },

      /*打开登录*/
      goLogin(){
        console.log("登录");
        this.$router.push({path: `/login${this.getQuery()}`})
      },

      /*打开功能说明*/
      goFuncDesc(){
        console.log("功能说明")
        this.$router.push({path: `/funcDesc`})
      },


      /*打开收款*/
      goCollections(){
        if (!this.logged) {
          this.goLogin();
          return false;
        }
        localStorage.getMoneyCompleted = 0;

        if (this.baseInfo.auditStatus == 3) {
          this.showIdentityReasonDialog(true);
          return false;
        }


        if (!this.baseInfo.canGet) {
          this.showNoPermissionDialog(true);
          return false;
        }

        if (this.baseInfo.auditStatus == 0) {
          this.$router.push({path: `/identityFirst`})
        } else {
          this.$router.push({path: `/collectionFirst`});
        }

      },


      /*打开交易记录*/
      goDealLogs(){
        if (!this.logged) {
          this.goLogin();
          return false;
        }
        console.log("交易记录");
        this.$router.push({path: `/dealRecord`});
      },


      /**
       * 打开身份认证
       */
      goIdentity(){
        this.showIdentityReasonDialog(false);
        this.$router.push({path: `/identityFirst`})
      },

      /**
       * 显示未通过原因弹窗
       */
      showIdentityReasonDialog(show){
        this.showIdentityReason = show;
      },


      /**
       * 显示没有收款权限弹窗
       */
      showNoPermissionDialog(show){
        this.showNoPermission = show;
      },

      /*打开我的收益*/
      goMyEarnings(){
        console.log("我的收益");
        this.$router.push({path: `/earnings`})
      },

      /*发展收款客户*/
      goDevelopCustomers(){
        console.log("发展收款客户");
        if (this.baseInfo.auditStatus == 3) {
          this.showIdentityReasonDialog(true);
          return false;
        }
        this.$router.push({path: `/developCustomer`, query: {'u': localStorage.userId, 'type': 1}})
      },


      /*发展下级推客*/
      goDevelopTwitters(){
        console.log("发展下级推客");//leaderId=${localStorage.userId}&type=2
        if (this.baseInfo.auditStatus == 3) {
          this.showIdentityReasonDialog(true);
          return false;
        }
        this.$router.push({path: `/developTwitter`, query: {'u': localStorage.userId, 'type': 2}})
      },


      /*关注钱刷刷*/
      attentionYwmjPay(){
        console.log("关注钱刷刷");
        window.location.href = "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzUyODQ0OTA2NA==&scene=110#wechat_redirect"

      }
    },

  }

</script>

<style>

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

  .index-header-area {
    height: 5.50666rem;
    position: relative;
  }

  .index-header-bg {
    height: 4.45333rem;
    background-image: url("../../assets/img/home_bg@2x.png");
    background-repeat: no-repeat;
    background-size: cover;
    box-sizing: border-box;
  }

  .index-header-portrait-area {
    height: 2.10666rem;
    width: 2.10666rem;
    border-radius: 1.05333rem;
    position: absolute;
    bottom: 0;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: -1.05333rem;
    background-color: #ffffff;
  }

  .index-header-portrait-img {
    height: 1.84rem;
    width: 1.84rem;
    border-radius: 0.92rem;
    background-image: url("../../assets/img/home_pic_user_head_n@2x.png");
  }

  .index-header-login-button-area {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .index-header-login-button {
    text-align: center;
    width: 5.25333rem;
    height: 1.12rem;
    line-height: 1.12rem;
    border-radius: 0.10666rem;
    border: solid 1px #ff2e2e;
  }

  .index-header-logged {
    height: 6.21333rem;
    position: relative;
  }

  .index-header-user-area {
    margin-left: 0.96rem;
    margin-right: 0.32rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding-top: 0.61333rem;
  }

  .index-header-user-info {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .index-user-card-area {
    height: 3.41333rem;
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
  }

  .index-identity-authentication {
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    align-items: center;
  }

  .index-identity-authentication-icon {
    width: 1.33333rem;
    height: 1.01333rem;
  }

  .index-identity-authentication-button {
    display: flex;
    align-items: center;
    padding-top: 0.42666rem;
  }

  .index-identity-authentication-button img {
    width: 0.16rem;
    margin-left: 0.13333rem;
    height: 0.30666rem;
  }

  .index-identity-bank {
    display: flex;
    flex-direction: column;
    margin-left: 1.17333rem;
    justify-content: center;
  }

  .index-identity-bank-info {
    margin-top: 0.34666rem;
    display: flex;
  }

  .index-identity-bank-info img {
    width: 1.38666rem;
    height: 1.38666rem;
    margin-right: 0.45333rem;
  }

  .index-identity-bank-info div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .index-func-area {
    height: 3.78666rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .index-func-button {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    text-align: center;
  }

  .index-func-button-icon {
    height: 1.52rem;
    width: 1.52rem;
  }

  .index-func-dot {
    height: 0.506666rem;
    width: 0.506666rem;
    position: absolute;
    top: 0;
    right: 0rem;
  }

  .index-menus-area {
    margin-top: 0.45333rem;
  }

  .index-menus-area li {
    height: 1.33333rem;
    display: flex;
    margin-left: 0.66666rem;
    box-sizing: border-box;
    align-items: center;
  }

  .index-menus-area i {
    flex-grow: 2;
  }

  .index-menus-area-icon {
    width: 0.66666rem;
    margin-right: 0.4rem;
    height: 0.66666rem;
  }

  .index-func-area-arrow {
    width: 0.2rem;
    height: 0.373333rem;
    margin-right: 0.66666rem;

  }

</style>
