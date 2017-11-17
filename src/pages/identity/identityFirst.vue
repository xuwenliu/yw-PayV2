<template>
  <div class="bg0"
       style="position: absolute;top: 0;left: 0;right: 0;bottom: 0;padding-bottom: 1.4rem;overflow-y: auto;">

    <title>身份信息</title>

    <div class="input-area" style="margin-top: 0.85333rem">
      <span>真实姓名</span>
      <input :disabled="!baseInfo.realNameCanModify" type="text" maxlength="10" placeholder="请输入持卡人姓名"
             v-model="baseInfo.realName">
    </div>


    <div class="input-area" style="margin-top: 0.56rem">
      <span>身份证号</span>
      <input :disabled="!baseInfo.idCardNoCanModify" type="text" maxlength="18" placeholder="请输入持卡人身份证号"
             v-model="baseInfo.idCardNo">
    </div>

    <!--身份证正面照-->
    <div class="identity-edit-box" style="margin-top: 0.96rem">

      <div class="identity-edit-img-area">

        <button v-show="!baseInfo.idImageA" class="identity-edit-add bgt" @click="listenerOpenChooseImage(0)"></button>

        <div v-show="baseInfo.idImageA && baseInfo.imageCanModify " class="identity-edit-modify"
             @click="listenerOpenChooseImage(0)">点击修改
        </div>

        <img v-show="!baseInfo.idImageA" src="../../assets/img/sfzzm_pic@2x.png">

        <img v-show="baseInfo.idImageA" :src="baseInfo.idImageA">

      </div>

      <span class="identity-edit-title">上传身份证正面照</span>

    </div>

    <!--身份证反面照-->
    <div class="identity-edit-box" style="margin-top: 0.96rem">

      <div class="identity-edit-img-area">

        <button v-show="!baseInfo.idImageB" class="identity-edit-add bgt" @click="listenerOpenChooseImage(1)"></button>

        <div v-show="baseInfo.idImageB && baseInfo.imageCanModify " class="identity-edit-modify"
             @click="listenerOpenChooseImage(1)">点击修改
        </div>

        <img v-show="!baseInfo.idImageB" src="../../assets/img/sfzfm_pic@2x.png">

        <img v-show="baseInfo.idImageB" :src="baseInfo.idImageB">

      </div>

      <span class="identity-edit-title">上传身份证反面照</span>

    </div>


    <!--手持身份证-->
    <div class="identity-edit-box" style="margin-top: 0.96rem">

      <div class="identity-edit-img-area">

        <button v-show="!baseInfo.idHoldImage" class="identity-edit-add bgt"
                @click="listenerOpenChooseImage(2)"></button>

        <div v-show="baseInfo.idHoldImage && baseInfo.imageCanModify " class="identity-edit-modify"
             @click="listenerOpenChooseImage(2)">点击修改
        </div>

        <img v-show="!baseInfo.idHoldImage" src="../../assets/img/sfzsc_pic@2x.png">

        <img v-show="baseInfo.idHoldImage" :src="baseInfo.idHoldImage">

      </div>

      <span class="identity-edit-title">上传手持身份证正面照</span>

    </div>

    <!--bottom button-->
    <button class="bottom-button" @click="listenerNextClick" style="position: fixed">下一步</button>

  </div>

</template>
<script>
  import {Indicator} from 'mint-ui';
  import {Toast} from 'mint-ui';
  import {MessageBox} from 'mint-ui';

  const wx = require("weixin-js-sdk");

  export default{
    name: 'login',
    components: {},
    data(){
      return {
        isDisabled: true,
        bindUsernameInput: '',
        bindPwasswordInput: '',
        isShow: true,
        loginBtnEnable: false,
        baseInfo: {
          "realName": "",
          "realNameCanModify": true,
          "idCardNo": "",
          "idCardNoCanModify": true,
          "idImageA": '',
          "idImageB": '',
          "idHoldImage": '',
          "imageCanModify": true
        }
      }
    },

    created(){

      if (localStorage.identityCompleted == 1) {//认证资料已经全部提交了，返回首页
        this.$router.go(-1);
        return false;
      }
      this.wxInit();
      this.getIdentityInfo();


    },
    mounted(){

    },
//    computed: {
//      // 计算属性的 getter
//      postInfo: function () {
//
//
//        var info = this.baseInfo;
//
////        console.log("befor");
////        console.log(this.baseInfo);
//        info.realName = Rsa(this.baseInfo.realName);
//        info.idCardNo = Rsa(this.baseInfo.idCardNo);
////        console.log("after");
////        console.log(this.baseInfo);
//
//
//        // `this` 指向 vm 实例
//        return info;
//      }
//    },

    methods: {


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
              jsApiList: ["chooseImage", "uploadImage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });

            wx.error(function (res) {
              //config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
              alert(JSON.stringify(res));
            });
          }
        });


      },


      /***
       * 获取已提交的身份认证信息
       */
      getIdentityInfo(){
        this.$http.get(`${window.Host.apiHost}/pos/identity`).then((res) => {
          console.log(res);
          if (res.body.data) {
            var info = res.body.data;
            info.idImageA = info.idImageA || "";
            info.idImageB = info.idImageB || "";
            info.idHoldImage = info.idHoldImage || "";
            this.baseInfo = info;
            if (info.realName)
              this.baseInfo.realName = decRsa(info.realName);
            if (info.idCardNo)
              this.baseInfo.idCardNo = decRsa(info.idCardNo);
            console.log("getInfo");
            console.log(this.baseInfo);
          }
        }, (error) => {

        })
      },


      /***
       * 打开图片选择器
       */
      listenerOpenChooseImage(index){
        console.log(index);
        wx.chooseImage({
          count: 1, // 默认9
//          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
//          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: (res) => {
            console.log(res);
            var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
//            this.didChooseImageCompleted(index, localIds[0]);
//            Toast({message: '选择图片完成', position: 'center', duration: 3000});
            this.uploadImageToWx(index, localIds[0]);
          }
        });
      },


      /*上传图片到微信服务器*/
      uploadImageToWx(index, localId){
//        Toast({message: '开始上传', position: 'center', duration: 3000});
        wx.uploadImage({
          localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: (res) => {
            var serverId = res.serverId; // 返回图片的服务器端ID
//            Toast({message: serverId, position: 'center', duration: 3000});
            this.uploadImageToQiniu(index, serverId);
          },
          fail: (error) => {
            Toast({message: error, position: 'center', duration: 3000});
          }
        });

      },


      /*上传图片到七牛*/
      uploadImageToQiniu(index, mediaId){
        console.log(mediaId);
        Indicator.open();
        this.$http.get(`${window.Host.apiHost}/images/upload/wechat-media?mediaId=${mediaId}`).then((res) => {
          Indicator.close();
          if (res.body.succ) {
            this.didChooseImageCompleted(index, res.body.data)
          } else {
            Toast({message: res.body.message, position: 'center', duration: 3000});
          }
        }, (error) => {

        })
      },

      /*选择图片成功*/
      didChooseImageCompleted(index, localId){
        switch (index) {
          case 0:
            this.baseInfo.idImageA = localId;
            break;
          case 1:
            this.baseInfo.idImageB = localId;
            break;
          case 2:
            this.baseInfo.idHoldImage = localId;
            break;
        }
      },


      /***
       * @onClick 下一步
       */
      listenerNextClick(){
        if (this.preconditionPass()) {
          var info = {
            "realName": Rsa(this.baseInfo.realName),
            "realNameCanModify": this.baseInfo.realNameCanModify,
            "idCardNo": Rsa(this.baseInfo.idCardNo),
            "idCardNoCanModify": this.baseInfo.idCardNoCanModify,
            "idImageA": this.baseInfo.idImageA,
            "idImageB": this.baseInfo.idImageB,
            "idHoldImage": this.baseInfo.idHoldImage,
            "imageCanModify": this.baseInfo.imageCanModify
          };

//          if (this.baseInfo.realName)
//              info.realName = this.baseInfo.realName;
//          if (this.baseInfo.idImageA)
//              info.idImageA = this.baseInfo.idImageA;
//          if(this.baseInfo.idImageB)
//              info.idImageB = this.baseInfo.idImageB;
//          if (this.baseInfo.idHoldImage)
//              info.idHoldImage = this.baseInfo.idHoldImage
          Indicator.open();
          this.$http.post(`${window.Host.apiHost}/pos/identity`, info).then((res) => {
            Indicator.close();
            if (res.body.succ) {
              this.didIdentityCompleted()
            } else {
              Toast({message: res.body.message, position: 'center', duration: 3000})
            }
          }, (error) => {
            Toast({message: "网路异常", position: 'center', duration: 3000})
          })
        }
      },


      /***
       * 提交身份信息成功
       */
      didIdentityCompleted(){
        this.$router.push({path: `/identitySecond`, query: {'name': this.baseInfo.realName}})
      },


      /**
       * 下一步的先决条件
       */
      preconditionPass(){
        var info = this.baseInfo;
        if (!(Regex.realname.test(info.realName))) {
          Toast({message: '持卡人姓名格式不正确', position: 'center', duration: 3000});
          return false;
        }

        if (!(Regex.identity.test(info.idCardNo))) {
          Toast({message: '身份证格式不正确', position: 'center', duration: 3000});
          return false
        }

        if (!(info.idImageA)) {
          Toast({message: '请上传身份证正面照', position: 'center', duration: 3000});
          return false
        }

        if (!(info.idImageB)) {
          Toast({message: '请上传身份证反面照', position: 'center', duration: 3000});
          return false
        }

        if (!(info.idHoldImage)) {
          Toast({message: '请上传身份证持证照', position: 'center', duration: 3000});
          return false
        }
        return true;
      }
    },

  }

</script>

<style>

  .identity-edit-box {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .identity-edit-title {
    color: #282828;
    font-size: 0.4rem;
    margin-top: 0.26666rem;
    margin-bottom: 0.66666rem;
  }

  .identity-edit-img-area {
    width: 8.5333rem;
    height: 5.54666rem;
    border: solid 1px #b4b4b4;
    position: relative;
    border-radius: 0.26666rem;
  }

  .identity-edit-img-area img {
    width: 8.5333rem;
    height: 5.54666rem;
    box-sizing: border-box;
    border-radius: 0.26666rem;
  }

  .identity-edit-add {
    background-image: url("../../assets/img/add_ic@2x.png");
    width: 1.6rem;
    height: 1.6rem;
    position: absolute;
    left: 50%;
    margin-left: -0.8rem;
    top: 50%;
    margin-top: -0.8rem;
    background-repeat: no-repeat;
    background-size: 100%;

  }

  .identity-edit-modify {
    width: 8.5333rem;
    height: 0.88rem;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    bottom: 0;
    border-bottom-left-radius: 0.26666rem;
    text-align: center;
    line-height: 0.88rem;
    font-size: 0.4rem;
    color: #ffffff;
    border-bottom-right-radius: 0.26666rem;
  }

</style>
