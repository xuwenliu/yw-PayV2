webpackJsonp([15],{116:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(61),i=n.n(a),o=n(1);n.n(o);e.default={name:"collectionSecond",components:{BottomFooter:i.a},data:function(){return{info:{amount:this.$route.query.amount,cardNO:this.$route.query.cid,id:this.$route.query.id},way:this.$route.query.id,sendBtnText:"发送验证码",isdisabled:!1,listenerSmsCodeInput:"",ispass:!0,validDate:"",cvv2:""}},created:function(){if(1==localStorage.getMoneyCompleted)return this.$router.go(-1),!1},methods:{goBack:function(){this.$router.go(-1)},listenerSendSmsCodeClick:function(){var t=this;if(!this.info.id)return!1;o.Indicator.open(),this.$http.post(window.Host.apiHost+"/pos/getSmsCode/"+this.info.id).then(function(e){console.log(e),o.Indicator.close(),0===e.data.stateCode?t.downTime(t):n.i(o.Toast)({message:e.data.message,position:"center",duration:3e3})})},downTime:function(t){t.isdisabled=!0;var e=60,n=setInterval(function(){e--,t.sendBtnText=e+"s",t.isdisabled=!0,0==e&&(clearInterval(n),t.sendBtnText="重新发送",t.isdisabled=!1)},1e3)},listenerConfirmClick:function(){this.selectedCardPay()},selectedCardPay:function(){var t=this,e={id:this.info.id,amount:this.info.amount,validDate:Rsa(this.validDate),cvv2:Rsa(this.cvv2)};o.Indicator.open(),this.$http.post(window.Host.apiHost+"/pos/selectCard",e).then(function(e){o.Indicator.close(),0===e.data.stateCode?t.$router.push({path:"/collectionSecond",query:{amount:e.data.data.amount,id:e.data.data.id,cid:e.data.data.cardNO,way:1}}):n.i(o.MessageBox)({closeOnClickModal:!1,confirmButtonText:"我知道了",title:"提示",message:e.data.message,showCancelButton:!1})})}}}},134:function(t,e,n){e=t.exports=n(25)(!0),e.push([t.i,".content[data-v-18a88d76]{bottom:1.33333rem}.btn-tab-s[data-v-18a88d76]{display:flex;height:1.33333rem;align-items:center;padding-right:.74666rem;padding-left:.74666rem;background-color:#fff}.btn-tab-s span[data-v-18a88d76]{width:2.13333rem}.desc-area[data-v-18a88d76],.reg-input-area[data-v-18a88d76]{display:flex;flex-direction:row;align-items:center}.reg-input-area[data-v-18a88d76]{height:1.33333rem;margin:0 .74rem;box-sizing:border-box;justify-content:space-between;border-bottom:1px solid #ff293c;font-size:.4rem}.reg-input-area input[data-v-18a88d76]{flex-grow:2;margin-left:.93333rem}.reg-send-text[data-v-18a88d76]{color:#ff293c;width:2.4rem;text-align:center}.reg-send-text.reg-send-text-d[data-v-18a88d76]{color:#b2b2b2}","",{version:3,sources:["/Users/jamisonline/Documents/web/ywmjPayV2/src/pages/collection/selectedCardPay.vue"],names:[],mappings:"AACA,0BACE,iBAAmB,CACpB,AACD,4BACE,aAAc,AACd,kBAAmB,AACnB,mBAAoB,AACpB,wBAA0B,AAC1B,uBAAyB,AACzB,qBAA0B,CAC3B,AACD,iCACE,gBAAkB,CACnB,AAMD,6DAJE,aAAc,AACd,mBAAoB,AACpB,kBAAoB,CAYrB,AAVD,iCACE,kBAAmB,AACnB,gBAAkB,AAElB,sBAAuB,AAEvB,8BAA+B,AAE/B,gCAAiC,AACjC,eAAkB,CACnB,AACD,uCACE,YAAa,AACb,qBAAwB,CACzB,AACD,gCACE,cAAe,AACf,aAAc,AACd,iBAAmB,CACpB,AACD,gDACE,aAAe,CAChB",file:"selectedCardPay.vue",sourcesContent:["\n.content[data-v-18a88d76] {\n  bottom: 1.33333rem;\n}\n.btn-tab-s[data-v-18a88d76] {\n  display: flex;\n  height: 1.33333rem;\n  align-items: center;\n  padding-right: 0.74666rem;\n  padding-left: 0.74666rem;\n  background-color: #ffffff;\n}\n.btn-tab-s span[data-v-18a88d76] {\n  width: 2.13333rem;\n}\n.desc-area[data-v-18a88d76] {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n.reg-input-area[data-v-18a88d76] {\n  height: 1.33333rem;\n  margin: 0 0.74rem;\n  display: flex;\n  box-sizing: border-box;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  border-bottom: solid 1px #ff293c;\n  font-size: 0.4rem;\n}\n.reg-input-area input[data-v-18a88d76] {\n  flex-grow: 2;\n  margin-left: 0.93333rem;\n}\n.reg-send-text[data-v-18a88d76] {\n  color: #ff293c;\n  width: 2.4rem;\n  text-align: center;\n}\n.reg-send-text.reg-send-text-d[data-v-18a88d76] {\n  color: #b2b2b2;\n}\n"],sourceRoot:""}])},156:function(t,e,n){var a=n(134);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n(26)("78ed657f",a,!0)},209:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("BottomFooter",[n("div",{on:{click:t.listenerConfirmClick}},[t._v("下一步")])]),t._v(" "),n("title",[t._v("快捷收款")]),t._v(" "),n("div",{staticClass:"bb1 bt1 f32",staticStyle:{"margin-top":"0.4rem"}},[n("div",{staticClass:"btn-tab-s fc2",staticStyle:{height:"1.76rem"}},[n("span",[t._v("金额")]),t._v(" "),n("i",[t._v(t._s(t._f("toF2")(t.info.amount)))])]),t._v(" "),n("div",{staticClass:"btn-tab-s bb1 bt1"},[n("span",[t._v("银行卡号")]),t._v(" "),n("i",[t._v(t._s(t._f("setSpaceBank")(t.info.cardNO)))])])]),t._v(" "),1!=t.way?n("div",{staticClass:"mt30 bg0  f32 bt1"},[n("div",{staticClass:"f24 bb1",staticStyle:{color:"#787878","margin-left":"0.74666rem",padding:"0.2rem 0"}},[t._v("使用信用卡收款，还需提供下列信息:")]),t._v(" "),n("div",{staticClass:"btn-tab-s "},[n("span",[t._v("有效期")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.validDate,expression:"validDate"}],staticClass:"f30",staticStyle:{"flex-grow":"2"},attrs:{type:"text",maxlength:"4",focus:"true",placeholder:"例如09/15，输入0915"},domProps:{value:t.validDate},on:{input:function(e){e.target.composing||(t.validDate=e.target.value)}}})]),t._v(" "),n("div",{staticStyle:{"margin-left":"0.74666rem",height:"1px","background-color":"#e5e5e5"}}),t._v(" "),n("div",{staticClass:"btn-tab-s bb1 "},[n("span",[t._v("CVV2")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.cvv2,expression:"cvv2"}],staticClass:"f30",staticStyle:{"flex-grow":"2"},attrs:{type:"tel",maxlength:"3",focus:"true",placeholder:"卡背后三位"},domProps:{value:t.cvv2},on:{input:function(e){e.target.composing||(t.cvv2=e.target.value)}}})])]):t._e()],1)},staticRenderFns:[]}},33:function(t,e,n){n(156);var a=n(11)(n(116),n(209),"data-v-18a88d76",null);t.exports=a.exports},58:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"footer"}},59:function(t,e,n){e=t.exports=n(25)(!0),e.push([t.i,".footer[data-v-af03e7f6]{width:100%;height:1.33333rem;background-color:#ff293c;line-height:1.33333rem;font-size:.48rem;color:#fff;text-align:center;position:fixed;bottom:0;z-index:999}","",{version:3,sources:["/Users/jamisonline/Documents/web/ywmjPayV2/src/components/Footer.vue"],names:[],mappings:"AACA,yBACC,WAAY,AACZ,kBAAmB,AACnB,yBAA0B,AAC1B,uBAAwB,AACxB,iBAAmB,AACnB,WAAY,AACZ,kBAAmB,AACnB,eAAgB,AAChB,SAAU,AACV,WAAa,CACb",file:"Footer.vue",sourcesContent:["\n.footer[data-v-af03e7f6] {\n\twidth: 100%;\n\theight: 1.33333rem;\n\tbackground-color: #ff293c;\n\tline-height: 1.33333rem;\n\tfont-size: 0.48rem;\n\tcolor: #fff;\n\ttext-align: center;\n\tposition: fixed;\n\tbottom: 0;\n\tz-index: 999;\n}\n"],sourceRoot:""}])},60:function(t,e,n){var a=n(59);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n(26)("964a2e20",a,!0)},61:function(t,e,n){n(60);var a=n(11)(n(58),n(62),"data-v-af03e7f6",null);t.exports=a.exports},62:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"footer"},[t._t("default")],2)},staticRenderFns:[]}}});
//# sourceMappingURL=15.8f83120d70e1165cf71e.js.map