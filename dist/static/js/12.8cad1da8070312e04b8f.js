webpackJsonp([12],{130:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=t(55),o=t.n(i),r=t(52),s=t.n(r),a=t(1);t.n(a);n.default={name:"reg",components:{TopHeader:s.a},data:function(){return{isDisabled:!1,type:this.$route.query.t,sendBtnText:"发送验证码",bindUsernameInput:"",bindCodeInput:"",bindPwasswordInput:"",isdisabled:!1,loginBtnEnable:!1,dataAuto:{},totalTime:60,checks:[t(91),t(90)],userArgumentChecked:!0,defaultCheck:""}},created:function(){this.defaultCheck=this.checks[0]},mounted:function(){},methods:{eventUserNameInput:function(){this.loginBtnEnable=0!=this.bindUsernameInput.length},checkUserArgument:function(){this.userArgumentChecked=!this.userArgumentChecked,this.userArgumentChecked?this.defaultCheck=this.checks[0]:this.defaultCheck=this.checks[1]},listenerSendSmsCodeClick:function(e){var n=this;return Regex.phone.test(e)?!this.isDisabled&&(a.Indicator.open(),void this.$http.post(window.Host.apiHost+"/user/sendSmsCode?phone="+e+"&source="+(2==this.type?2:1)).then(function(e){0===e.data.stateCode&&(n.downTime(n),a.Indicator.close())})):(t.i(a.Toast)({message:"手机号输入不正确",position:"center",duration:3e3}),!1)},goUserArgument:function(){this.$router.push({path:"/userArgument"})},downTime:function(e){e.isdisabled=!0;var n=60,t=setInterval(function(){n--,e.sendBtnText=n+"s",e.isdisabled=!0,0==n&&(clearInterval(t),e.sendBtnText="重新发送",e.isdisabled=!1)},1e3)},listenerConfirmClick:function(e){var n=this;if(!this.loginBtnEnable)return!1;if(!e)return!1;if(1==this.type&&!this.userArgumentChecked)return t.i(a.Toast)({message:"请勾选用户服务协议",position:"center",duration:3e3}),!1;if(!Regex.phone.test(e[0]))return t.i(a.Toast)({message:"手机号输入不正确",position:"center",duration:3e3}),!1;if(!Regex.phonecode.test(e[1]))return t.i(a.Toast)({message:"验证码为6位数字",position:"center",duration:3e3}),!1;if(!Regex.password.test(e[2]))return t.i(a.Toast)({message:"密码格式不正确",position:"center",duration:3e3}),!1;var i={phone:e[0],smsCode:e[1],password:Rsa(e[2])};this.dataAuto={phone:e[0],password:String(e[2])},this.isDisabled=!0,this.$http.post(1==this.type?window.Host.apiHost+"/user/register":window.Host.apiHost+"/user/getBackPassword",i).then(function(e){0===e.data.stateCode?e.data.data&&e.data.data.needConfirm?t.i(a.MessageBox)({closeOnClickModal:!1,message:e.data.data.message,showCancelButton:!0},function(e){"confirm"==e&&n.openUserC(i)}):(a.Indicator.open(),console.log(n.dataAuto),n.relogin(n.dataAuto)):(n.isDisabled=!1,t.i(a.MessageBox)({closeOnClickModal:!1,confirmButtonText:"我知道了",message:e.data.message,showCancelButton:!1}))})},openUserC:function(e){this.$http.post(window.Host.apiHost+"/user/confirm",e).then(function(e){0===e.data.stateCode?(localStorage.loginAutoData=o()(this.dataAuto),this.$router.go(-1)):(this.isDisabled=!1,t.i(a.MessageBox)({closeOnClickModal:!1,confirmButtonText:"我知道了",message:e.data.message,showCancelButton:!1}))})},relogin:function(e){var n=this,i={phone:e.phone,password:Rsa(e.password),type:this.$route.query.type||1,leaderId:this.$route.query.leaderId||1};this.$http.post(window.Host.apiHost+"/user/login",i).then(function(e){a.Indicator.close(),0===e.data.stateCode?(localStorage.sessions=o()(e.data.data.userSession),localStorage.userId=e.data.data.id,n.$router.go(-1)):t.i(a.MessageBox)({closeOnClickModal:!1,confirmButtonText:"我知道了",title:"提示",message:e.data.message,showCancelButton:!1})})}}}},142:function(e,n,t){n=e.exports=t(25)(!0),n.push([e.i,".reg-input-area{height:1.33333rem;margin:0 .74rem;display:flex;box-sizing:border-box;flex-direction:row;justify-content:space-between;align-items:center;border-bottom:1px solid #ff293c;font-size:.4rem}.reg-input-area input{flex-grow:2;margin-left:.93333rem}.reg-send-text{color:#ff293c;width:2.4rem;text-align:center}.reg-send-text.reg-send-text-d{color:#b2b2b2}.reg-user-argument{display:flex;flex-direction:row;margin-top:.82666rem;box-sizing:border-box;justify-content:center;align-items:center}","",{version:3,sources:["/Users/jamisonline/Documents/web/ywmjPayV2/src/pages/user/reg.vue"],names:[],mappings:"AAiTA,gBACE,kBAAmB,AACnB,gBAAkB,AAClB,aAAc,AACd,sBAAuB,AACvB,mBAAoB,AACpB,8BAA+B,AAC/B,mBAAoB,AACpB,gCAAiC,AACjC,eAAkB,CACnB,AACD,sBACE,YAAa,AACb,qBAAwB,CACzB,AACD,eACE,cAAe,AACf,aAAc,AACd,iBAAmB,CACpB,AACD,+BACE,aAAe,CAChB,AACD,mBACE,aAAc,AACd,mBAAoB,AACpB,qBAAuB,AACvB,sBAAuB,AACvB,uBAAwB,AACxB,kBAAoB,CACrB",file:"reg.vue",sourcesContent:["\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* login.wxss */\n.reg-input-area {\n  height: 1.33333rem;\n  margin: 0 0.74rem;\n  display: flex;\n  box-sizing: border-box;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  border-bottom: solid 1px #ff293c;\n  font-size: 0.4rem;\n}\n.reg-input-area input {\n  flex-grow: 2;\n  margin-left: 0.93333rem;\n}\n.reg-send-text {\n  color: #ff293c;\n  width: 2.4rem;\n  text-align: center;\n}\n.reg-send-text.reg-send-text-d {\n  color: #b2b2b2;\n}\n.reg-user-argument {\n  display: flex;\n  flex-direction: row;\n  margin-top: 0.82666rem;\n  box-sizing: border-box;\n  justify-content: center;\n  align-items: center;\n}\n\n"],sourceRoot:""}])},164:function(e,n,t){var i=t(142);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);t(26)("25524919",i,!0)},217:function(e,n){e.exports={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"bg0",staticStyle:{position:"absolute",top:"0",left:"0",right:"0",bottom:"0"}},[t("title",[e._v(e._s(1==e.type?"注册新账号":"找回密码"))]),e._v(" "),t("div",{staticClass:"reg-input-area",staticStyle:{"margin-top":"0.85333rem"}},[t("span",{staticClass:"fc2"},[e._v("手机号")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.bindUsernameInput,expression:"bindUsernameInput"}],attrs:{type:"tel",placeholder:"请输入手机号码",maxlength:"11"},domProps:{value:e.bindUsernameInput},on:{keyup:e.eventUserNameInput,input:function(n){n.target.composing||(e.bindUsernameInput=n.target.value)}}})]),e._v(" "),t("div",{staticClass:"reg-input-area",staticStyle:{"margin-top":"0.56rem"}},[t("span",{staticClass:"fc2"},[e._v("验证码")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.bindCodeInput,expression:"bindCodeInput"}],staticStyle:{width:"2rem"},attrs:{type:"number",placeholder:"请输入验证码",maxlength:"6"},domProps:{value:e.bindCodeInput},on:{keyup:e.eventUserNameInput,input:function(n){n.target.composing||(e.bindCodeInput=n.target.value)}}}),e._v(" "),t("div",{staticStyle:{width:"1px","background-color":"#b2b2b2",height:"0.5rem"}}),e._v(" "),t("button",{staticClass:"reg-send-text bg0 f30",class:{"reg-send-text-d":e.isdisabled},attrs:{disabled:e.isdisabled},on:{click:function(n){e.listenerSendSmsCodeClick(e.bindUsernameInput)}}},[e._v(e._s(e.sendBtnText)+"\n    ")])]),e._v(" "),t("div",{staticClass:"reg-input-area",staticStyle:{"margin-top":"0.56rem"}},[t("span",{staticClass:"fc2"},[e._v("新密码")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.bindPwasswordInput,expression:"bindPwasswordInput"}],attrs:{type:"password",placeholder:"请输入8-20位数字或字母",maxlength:"20"},domProps:{value:e.bindPwasswordInput},on:{input:function(n){n.target.composing||(e.bindPwasswordInput=n.target.value)}}})]),e._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:1==e.type,expression:"type == 1"}],staticClass:"reg-user-argument"},[t("img",{staticStyle:{width:"0.4rem",height:"0.4rem","margin-right":"0.2rem"},attrs:{src:e.defaultCheck},on:{click:e.checkUserArgument}}),e._v(" "),t("span",{staticClass:"f22 fc2"},[e._v("我同意 "),t("i",{on:{click:e.goUserArgument}},[e._v("《用户服务协议》")])])]),e._v(" "),t("div",{staticClass:"login-button",staticStyle:{"margin-top":"0.66666rem"}},[t("button",{staticClass:"fc0 f28",class:{"login-button-n":e.loginBtnEnable},on:{click:function(n){e.listenerConfirmClick([e.bindUsernameInput,e.bindCodeInput,e.bindPwasswordInput])}}},[e._v(e._s(1==e.type?"注册":"确认")+"\n    ")])])])},staticRenderFns:[]}},47:function(e,n,t){t(164);var i=t(11)(t(130),t(217),null,null);e.exports=i.exports},50:function(e,n){!function(n,t){e.exports=function(e,n){function t(n,t,i){e.WeixinJSBridge?WeixinJSBridge.invoke(n,o(t),function(e){a(n,e,i)}):u(n,i)}function i(n,t,i){e.WeixinJSBridge?WeixinJSBridge.on(n,function(e){i&&i.trigger&&i.trigger(e),a(n,e,t)}):i?u(n,i):u(n,t)}function o(e){return e=e||{},e.appId=_.appId,e.verifyAppId=_.appId,e.verifySignType="sha1",e.verifyTimestamp=_.timestamp+"",e.verifyNonceStr=_.nonceStr,e.verifySignature=_.signature,e}function r(e){return{timeStamp:e.timestamp+"",nonceStr:e.nonceStr,package:e.package,paySign:e.paySign,signType:e.signType||"SHA1"}}function s(e){return e.postalCode=e.addressPostalCode,delete e.addressPostalCode,e.provinceName=e.proviceFirstStageName,delete e.proviceFirstStageName,e.cityName=e.addressCitySecondStageName,delete e.addressCitySecondStageName,e.countryName=e.addressCountiesThirdStageName,delete e.addressCountiesThirdStageName,e.detailInfo=e.addressDetailInfo,delete e.addressDetailInfo,e}function a(e,n,t){"openEnterpriseChat"==e&&(n.errCode=n.err_code),delete n.err_code,delete n.err_desc,delete n.err_detail;var i=n.errMsg;i||(i=n.err_msg,delete n.err_msg,i=c(e,i),n.errMsg=i),t=t||{},t._complete&&(t._complete(n),delete t._complete),i=n.errMsg||"",_.debug&&!t.isInnerInvoke&&alert(JSON.stringify(n));var o=i.indexOf(":");switch(i.substring(o+1)){case"ok":t.success&&t.success(n);break;case"cancel":t.cancel&&t.cancel(n);break;default:t.fail&&t.fail(n)}t.complete&&t.complete(n)}function c(e,n){var t=e,i=h[t];i&&(t=i);var o="ok";if(n){var r=n.indexOf(":");o=n.substring(r+1),"confirm"==o&&(o="ok"),"failed"==o&&(o="fail"),-1!=o.indexOf("failed_")&&(o=o.substring(7)),-1!=o.indexOf("fail_")&&(o=o.substring(5)),o=o.replace(/_/g," "),o=o.toLowerCase(),("access denied"==o||"no permission to execute"==o)&&(o="permission denied"),"config"==t&&"function not exist"==o&&(o="ok"),""==o&&(o="fail")}return n=t+":"+o}function d(e){if(e){for(var n=0,t=e.length;t>n;++n){var i=e[n],o=m[i];o&&(e[n]=o)}return e}}function u(e,n){if(!(!_.debug||n&&n.isInnerInvoke)){var t=h[e];t&&(e=t),n&&n._complete&&delete n._complete,console.log('"'+e+'",',n||"")}}function l(e){if(!(C||I||_.debug||"6.0.2">B||T.systemType<0)){var n=new Image;T.appId=_.appId,T.initTime=k.initEndTime-k.initStartTime,T.preVerifyTime=k.preVerifyEndTime-k.preVerifyStartTime,N.getNetworkType({isInnerInvoke:!0,success:function(e){T.networkType=e.networkType;var t="https://open.weixin.qq.com/sdk/report?v="+T.version+"&o="+T.isPreVerifyOk+"&s="+T.systemType+"&c="+T.clientVersion+"&a="+T.appId+"&n="+T.networkType+"&i="+T.initTime+"&p="+T.preVerifyTime+"&u="+T.url;n.src=t}})}}function p(){return(new Date).getTime()}function f(n){S&&(e.WeixinJSBridge?n():A.addEventListener&&A.addEventListener("WeixinJSBridgeReady",n,!1))}function g(){N.invoke||(N.invoke=function(n,t,i){e.WeixinJSBridge&&WeixinJSBridge.invoke(n,o(t),i)},N.on=function(n,t){e.WeixinJSBridge&&WeixinJSBridge.on(n,t)})}if(!e.jWeixin){var m={config:"preVerifyJSAPI",onMenuShareTimeline:"menu:share:timeline",onMenuShareAppMessage:"menu:share:appmessage",onMenuShareQQ:"menu:share:qq",onMenuShareWeibo:"menu:share:weiboApp",onMenuShareQZone:"menu:share:QZone",previewImage:"imagePreview",getLocation:"geoLocation",openProductSpecificView:"openProductViewWithPid",addCard:"batchAddCard",openCard:"batchViewCard",chooseWXPay:"getBrandWCPayRequest",openEnterpriseRedPacket:"getRecevieBizHongBaoRequest",startSearchBeacons:"startMonitoringBeacons",stopSearchBeacons:"stopMonitoringBeacons",onSearchBeacons:"onBeaconsInRange",consumeAndShareCard:"consumedShareCard",openAddress:"editAddress"},h=function(){var e={};for(var n in m)e[m[n]]=n;return e}(),A=e.document,v=A.title,w=navigator.userAgent.toLowerCase(),y=navigator.platform.toLowerCase(),C=!(!y.match("mac")&&!y.match("win")),I=-1!=w.indexOf("wxdebugger"),S=-1!=w.indexOf("micromessenger"),x=-1!=w.indexOf("android"),b=-1!=w.indexOf("iphone")||-1!=w.indexOf("ipad"),B=function(){var e=w.match(/micromessenger\/(\d+\.\d+\.\d+)/)||w.match(/micromessenger\/(\d+\.\d+)/);return e?e[1]:""}(),k={initStartTime:p(),initEndTime:0,preVerifyStartTime:0,preVerifyEndTime:0},T={version:1,appId:"",initTime:0,preVerifyTime:0,networkType:"",isPreVerifyOk:1,systemType:b?1:x?2:-1,clientVersion:B,url:encodeURIComponent(location.href)},_={},M={_completes:[]},P={state:0,data:{}};f(function(){k.initEndTime=p()});var R=!1,E=[],N={config:function(e){_=e,u("config",e);var n=!1!==_.check;f(function(){if(n)t(m.config,{verifyJsApiList:d(_.jsApiList)},function(){M._complete=function(e){k.preVerifyEndTime=p(),P.state=1,P.data=e},M.success=function(e){T.isPreVerifyOk=0},M.fail=function(e){M._fail?M._fail(e):P.state=-1};var e=M._completes;return e.push(function(){l()}),M.complete=function(n){for(var t=0,i=e.length;i>t;++t)e[t]();M._completes=[]},M}()),k.preVerifyStartTime=p();else{P.state=1;for(var e=M._completes,i=0,o=e.length;o>i;++i)e[i]();M._completes=[]}}),_.beta&&g()},ready:function(e){0!=P.state?e():(M._completes.push(e),!S&&_.debug&&e())},error:function(e){"6.0.2">B||(-1==P.state?e(P.data):M._fail=e)},checkJsApi:function(e){var n=function(e){var n=e.checkResult;for(var t in n){var i=h[t];i&&(n[i]=n[t],delete n[t])}return e};t("checkJsApi",{jsApiList:d(e.jsApiList)},function(){return e._complete=function(e){if(x){var t=e.checkResult;t&&(e.checkResult=JSON.parse(t))}e=n(e)},e}())},onMenuShareTimeline:function(e){i(m.onMenuShareTimeline,{complete:function(){t("shareTimeline",{title:e.title||v,desc:e.title||v,img_url:e.imgUrl||"",link:e.link||location.href,type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareAppMessage:function(e){i(m.onMenuShareAppMessage,{complete:function(){t("sendAppMessage",{title:e.title||v,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareQQ:function(e){i(m.onMenuShareQQ,{complete:function(){t("shareQQ",{title:e.title||v,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareWeibo:function(e){i(m.onMenuShareWeibo,{complete:function(){t("shareWeiboApp",{title:e.title||v,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareQZone:function(e){i(m.onMenuShareQZone,{complete:function(){t("shareQZone",{title:e.title||v,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},startRecord:function(e){t("startRecord",{},e)},stopRecord:function(e){t("stopRecord",{},e)},onVoiceRecordEnd:function(e){i("onVoiceRecordEnd",e)},playVoice:function(e){t("playVoice",{localId:e.localId},e)},pauseVoice:function(e){t("pauseVoice",{localId:e.localId},e)},stopVoice:function(e){t("stopVoice",{localId:e.localId},e)},onVoicePlayEnd:function(e){i("onVoicePlayEnd",e)},uploadVoice:function(e){t("uploadVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadVoice:function(e){t("downloadVoice",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},translateVoice:function(e){t("translateVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},chooseImage:function(e){t("chooseImage",{scene:"1|2",count:e.count||9,sizeType:e.sizeType||["original","compressed"],sourceType:e.sourceType||["album","camera"]},function(){return e._complete=function(e){if(x){var n=e.localIds;n&&(e.localIds=JSON.parse(n))}},e}())},getLocation:function(e){},previewImage:function(e){t(m.previewImage,{current:e.current,urls:e.urls},e)},uploadImage:function(e){t("uploadImage",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadImage:function(e){t("downloadImage",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},getLocalImgData:function(e){!1===R?(R=!0,t("getLocalImgData",{localId:e.localId},function(){return e._complete=function(e){if(R=!1,E.length>0){var n=E.shift();wx.getLocalImgData(n)}},e}())):E.push(e)},getNetworkType:function(e){var n=function(e){var n=e.errMsg;e.errMsg="getNetworkType:ok";var t=e.subtype;if(delete e.subtype,t)e.networkType=t;else{var i=n.indexOf(":"),o=n.substring(i+1);switch(o){case"wifi":case"edge":case"wwan":e.networkType=o;break;default:e.errMsg="getNetworkType:fail"}}return e};t("getNetworkType",{},function(){return e._complete=function(e){e=n(e)},e}())},openLocation:function(e){t("openLocation",{latitude:e.latitude,longitude:e.longitude,name:e.name||"",address:e.address||"",scale:e.scale||28,infoUrl:e.infoUrl||""},e)},getLocation:function(e){e=e||{},t(m.getLocation,{type:e.type||"wgs84"},function(){return e._complete=function(e){delete e.type},e}())},hideOptionMenu:function(e){t("hideOptionMenu",{},e)},showOptionMenu:function(e){t("showOptionMenu",{},e)},closeWindow:function(e){e=e||{},t("closeWindow",{},e)},hideMenuItems:function(e){t("hideMenuItems",{menuList:e.menuList},e)},showMenuItems:function(e){t("showMenuItems",{menuList:e.menuList},e)},hideAllNonBaseMenuItem:function(e){t("hideAllNonBaseMenuItem",{},e)},showAllNonBaseMenuItem:function(e){t("showAllNonBaseMenuItem",{},e)},scanQRCode:function(e){e=e||{},t("scanQRCode",{needResult:e.needResult||0,scanType:e.scanType||["qrCode","barCode"]},function(){return e._complete=function(e){if(b){var n=e.resultStr;if(n){var t=JSON.parse(n);e.resultStr=t&&t.scan_code&&t.scan_code.scan_result}}},e}())},openAddress:function(e){t(m.openAddress,{},function(){return e._complete=function(e){e=s(e)},e}())},openProductSpecificView:function(e){t(m.openProductSpecificView,{pid:e.productId,view_type:e.viewType||0,ext_info:e.extInfo},e)},addCard:function(e){for(var n=e.cardList,i=[],o=0,r=n.length;r>o;++o){var s=n[o],a={card_id:s.cardId,card_ext:s.cardExt};i.push(a)}t(m.addCard,{card_list:i},function(){return e._complete=function(e){var n=e.card_list;if(n){n=JSON.parse(n);for(var t=0,i=n.length;i>t;++t){var o=n[t];o.cardId=o.card_id,o.cardExt=o.card_ext,o.isSuccess=!!o.is_succ,delete o.card_id,delete o.card_ext,delete o.is_succ}e.cardList=n,delete e.card_list}},e}())},chooseCard:function(e){t("chooseCard",{app_id:_.appId,location_id:e.shopId||"",sign_type:e.signType||"SHA1",card_id:e.cardId||"",card_type:e.cardType||"",card_sign:e.cardSign,time_stamp:e.timestamp+"",nonce_str:e.nonceStr},function(){return e._complete=function(e){e.cardList=e.choose_card_info,delete e.choose_card_info},e}())},openCard:function(e){for(var n=e.cardList,i=[],o=0,r=n.length;r>o;++o){var s=n[o],a={card_id:s.cardId,code:s.code};i.push(a)}t(m.openCard,{card_list:i},e)},consumeAndShareCard:function(e){t(m.consumeAndShareCard,{consumedCardId:e.cardId,consumedCode:e.code},e)},chooseWXPay:function(e){t(m.chooseWXPay,r(e),e)},openEnterpriseRedPacket:function(e){t(m.openEnterpriseRedPacket,r(e),e)},startSearchBeacons:function(e){t(m.startSearchBeacons,{ticket:e.ticket},e)},stopSearchBeacons:function(e){t(m.stopSearchBeacons,{},e)},onSearchBeacons:function(e){i(m.onSearchBeacons,e)},openEnterpriseChat:function(e){t("openEnterpriseChat",{useridlist:e.userIds,chatname:e.groupName},e)}},U=1,O={};return A.addEventListener("error",function(e){if(!x){var n=e.target,t=n.tagName,i=n.src;if("IMG"==t||"VIDEO"==t||"AUDIO"==t||"SOURCE"==t){if(-1!=i.indexOf("wxlocalresource://")){e.preventDefault(),e.stopPropagation();var o=n["wx-id"];if(o||(o=U++,n["wx-id"]=o),O[o])return;O[o]=!0,wx.getLocalImgData({localId:i,success:function(e){n.src=e.localData}})}}}},!0),A.addEventListener("load",function(e){if(!x){var n=e.target,t=n.tagName;if(n.src,"IMG"==t||"VIDEO"==t||"AUDIO"==t||"SOURCE"==t){var i=n["wx-id"];i&&(O[i]=!1)}}},!0),n&&(e.wx=e.jWeixin=N),N}}(n)}(window)},51:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=t(50);n.default={name:"header",mounted:function(){this.shareBtn()},methods:{shareBtn:function(){this.$http.post(window.Host.apiHost+"/pos/getSign",{url:location.href}).then(function(e){var n=e.data.data;i.config({debug:!1,appId:n.appId,timestamp:n.timestamp,nonceStr:n.nonceStr,signature:n.signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage"]})}),i.error(function(e){}),i.ready(function(){i.onMenuShareAppMessage({title:"钱刷刷",desc:"装修主材，信息服务工具。",link:"http://"+location.host+"#/index",imgUrl:"http://osz2pnx97.bkt.clouddn.com/xiaochengxu_share.png",type:"link",success:function(){},cancel:function(){}}),i.onMenuShareTimeline({title:"钱刷刷",link:"http://"+location.host+"#/index",imgUrl:"http://osz2pnx97.bkt.clouddn.com/xiaochengxu_share.png",success:function(){},cancel:function(){}})})}}}},52:function(e,n,t){var i=t(11)(t(51),t(53),null,null);e.exports=i.exports},53:function(e,n){e.exports={render:function(){var e=this,n=e.$createElement;return(e._self._c||n)("div",{staticClass:"header title",staticStyle:{background:"#3f87ea",color:"#fff","font-size":"0.48rem"}},[e._t("default")],2)},staticRenderFns:[]}},54:function(e,n){var t=e.exports={version:"2.5.1"};"number"==typeof __e&&(__e=t)},55:function(e,n,t){e.exports={default:t(56),__esModule:!0}},56:function(e,n,t){var i=t(54),o=i.JSON||(i.JSON={stringify:JSON.stringify});e.exports=function(e){return o.stringify.apply(o,arguments)}},90:function(e,n){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAmJJREFUeNrEl81LVFEYh8+dyqyNZVrgMqjcWCCECH5E4Fi7wcLat7Cy1Nq2cNM6yz6lf0AlXEpNUDEFEVFQbSaE/gAt1E2JIdPvhefELebr5tzbCw/3nLn3vs/MPffMeU+QyWRcFbFN9Is+cVTsF7s4tyK+iLfiqXgiflZKuLXCeUs+Ji6K5hLX7INOMSK+irviJl+qaKTKSM+KvBhH+on2cdEitkMLn41zTRPtPDmKRlDkUW8Rt8UF+i/FNY7VRLe4Lnro3xeXxUa5X2zSWaRr4rzojSD1X/QY966Ra5bcJcU2LgOMjT2+KVFw0aPAvZZjmZy3SonPiEvihzghXrvNh+U4Kb6LYRx/iO3tnaR9VbxxtQvLdYX2pJ+GXmxTZi/jM+VqHw9FDseYF9cxTx1vbyEGcYHcDledidPM048R396o8Up8wJX2Yos5F394R7+J2+nkEhB7R7uJD9LJJyD+zPGAiRvofEtA7B0NKfefwsSrtPck4POOVRMv0GlNQHyI44KJ34WWs7jDL5XvTZylcyoB8QDHrBfb23ZYdMUotdxHxJLVZSZeF3c4aZVDEIM0ILfFPXOmQgXAItXGUAzic+RewvV7WVyhQrS4ITpqKO0IVR8jvvIM/4HMUJbuEPOUq5uNTnLtJPd0qZprlBWkUTzjsQf/OKZD5Ggk52i5Ys9K0EFK0nrxQLyIOMft2ufcW0+uwb/L22I7iQ2qhBxj00PbivVHFAt5dgyOAr4V4WnRxueL/MrpqFsYu+ExhdowCduqXIFsPCfKbWGCiJu2dGjTtptzy6FNWxbWKyX8JcAAK5yFJrpQI/kAAAAASUVORK5CYII="},91:function(e,n){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFJREFUeNqsl1lIVFEYx+9cxslsm6KIoqeENIt60UoMotKapGmh1SIKaYGiwIqQqCeDdiIKggizIHzIaJkQaRGCFgJ7q6ECewish4TMJiMTp/8X/xuny13Ode4HP86dOeee/1m+7zvnRrKJCkPDCkASVIFSUAhGsi4DOkEHaAOtoM+vw4iP8ARQD3YqQpZ9B4NgjO3/b+AKOAG63To2PUR3gPdgPxgBHoE9YDbIA6NBHMTATNa1cyAHuAq1QWYsHTWBGv5uAUfBW0PPikEDWMvfNziAfq8Zi2iKol/BCrAugKjBtvLOKtADNrPPmJdwI1gCukA5Xxiq3WUfXeyzyU24lqOTUVaCd0buJrNfzNWrod/8JzwenOPztoBL62cyga18PsVI+SdcTy9t4RKFbSn2HafWX6+W5PCJYTA9pNnKrB7SoUoUb0+DH2CizLiaou0hiRZwhhLvWdt+P2YiSopwghW3QhCNsZ+59OZltvrbLKtM5l6xJzmKRpgqE4wMKT/a2jxlWWoy4RtMj6rtUrxRx86CLeAnWA5eO7RJsyyMcs0lsf+2NToPhoEBpj0vOwjqeGisB89c2g3wcBllKstktyMsZfnKPERlVU7zeTu47zPIQSuOM4zhqK3BGXAd5IM7YJJDJ9UcmNhhcNVHNI8RlDGV1Fji0FDO4ZdgMsXzlbpyJoUot+W4hh9MY9lp8uYgNt+h4S+wmqExh4lezuZ5XNLhoJn7q2MLWHaYzDAGjzEn+8w68dYN3JoXYBx4wNye1RRew7LN5Mh7eSIVubwgq7IQPKeIeOZFDqg/wAVhESOo1eRyXqJnH/N4Ufa6gg4pzriXq6BrDUqU9FlXHzkWP0h88daRMsK1lXTOXiasbiuO5Ta4j88XQhYtVm4fddbNU41dqZwaYM90rIi30zizX6PuvToXkw+Aa2AsvT+pTsrUONAPuSQXr6W9Ce5RtNkuqiO8EZwEbxjvcmmfwdRnmWzXLLCbbdK8U/cw821y2r6oj7Dk6insoJKonyomI0E1STCX+QnzZajfTpZJmlzKG0WZy0fbK+5lSuej7Y8AAwDALbfSFVBJDgAAAABJRU5ErkJggg=="}});
//# sourceMappingURL=12.8cad1da8070312e04b8f.js.map