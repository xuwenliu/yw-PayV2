import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

export default new Router({
  //mode:'history',
  routes: [

    {path: '/', redirect: {name: 'index'}},
    /*首页*/
    {path: '/index', name: 'index', component: (resolve => require(['../pages/index/index'], resolve))},
    /*登录*/
    {path: '/login', name: 'login', component: (resolve => require(['../pages/user/login'], resolve))},
    {path: '/userArgument', name: 'userArgument', component: (resolve => require(['../pages/user/userArgument'], resolve))},
    /*注册，找回*/
    {path: '/reg', name: 'reg', component: (resolve => require(['../pages/user/reg'], resolve))},
    {path: '/register', name: 'register', component: (resolve => require(['../pages/user/register'], resolve))},
    /*身份认证第一页-身份信息*/
    {path: '/identityFirst', name: 'identityFirst', component: (resolve => require(['../pages/identity/identityFirst'], resolve))},
     /*身份认证第二页-结算卡信息*/
    {path: '/identitySecond', name: 'identitySecond', component: (resolve => require(['../pages/identity/identitySecond'], resolve))},

    // /*绑定收款银行卡*/
    //   { path: '/bindBank', name: 'bindBank',component: (resolve => require(['../pages/collection/bindBank/bindBank'], resolve))},
    /*快捷收款*/
    { path: '/collectionFirst', name: 'collectionFirst',component: (resolve => require(['../pages/collection/collectionFirst'], resolve))},
    /*快捷收款-有卡收款*/
    { path: '/collectionSecond', name: 'collectionSecond',component: (resolve => require(['../pages/collection/collectionSecond'], resolve))},
    { path: '/selectedCardPay', name: 'selectedCardPay',component: (resolve => require(['../pages/collection/selectedCardPay'], resolve))},
    /*快捷收款-支持的银行卡列表*/
    { path: '/inputBankInfo', name: 'inputBankInfo',component: (resolve => require(['../pages/collection/inputBankInfo/inputBankInfo'], resolve))},
    /*我的收益*/
    { path: '/earnings', name: 'earnings',component: (resolve => require(['../pages/earnings/earnings'], resolve))},
    /*提现记录*/
    { path: '/depositRecord', name: 'depositRecord',component: (resolve => require(['../pages/earnings/logs/depositRecord'], resolve))},
    { path: '/depositRecordDetail', name: 'depositRecordDetail',component: (resolve => require(['../pages/earnings/logs/depositRecordDetail'], resolve))},
     /*每日收益*/
    { path: '/earningsRecord', name: 'earningsRecord',component: (resolve => require(['../pages/earnings/logs/earningsRecord'], resolve))},
    /*查看交易记录*/
    { path: '/dealRecord', name: 'dealRecord',component: (resolve => require(['../pages/collection/logs/dealRecord'], resolve))},
    /*查看交易记录-交易记录详情*/
    { path: '/dealRecordDetail', name: 'dealRecordDetail',component: (resolve => require(['../pages/collection/logs/dealRecordDetail'], resolve))},

    /*发展客户*/
    {path:'/developCustomer',name:'develop',component:(resolve => require(['../pages/develop/developCustomer'],resolve))},
    /*发展推客*/
    {path:'/developTwitter',name:'developTwitter',component:(resolve => require(['../pages/twitter/developTwitter'],resolve))},
    {path:'/editRemark',name:'editRemark',component:(resolve => require(['../pages/twitter/editRemark'],resolve))},
       /*支持的银行卡列表*/
    { path: '/supportBank', name: 'supportBank',component: (resolve => require(['../pages/support/supportBank'], resolve))},
    { path: '/funcDesc', name: 'funcDesc',component: (resolve => require(['../pages/index/funcDesc'], resolve))},

    //{
    //	path: '/twitterInfo',
    //	name: 'twitterInfo',
    //	component: twitterInfo,
    //
    //	meta: {
    //		keepAlive: true //需要被缓存
    //	}
    //},

  ]
})
