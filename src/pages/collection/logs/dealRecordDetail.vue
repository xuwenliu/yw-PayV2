<template>
  <!--交易记录详情-->
  <div class="dealRecordDetail">
    <title>交易记录</title>

    <div class="content">
      <div class="base-area">
        <img :src="info.bankLogo"/>
        <span style="margin-top:0.4rem;" class="f28">{{info.bankName+info.cardType}}（{{info.cardNO | last4}}）</span>
        <span style="margin-top:0.8rem;font-size:0.53333rem;text-align: center;"
              class="b">{{info.amount | toF2 }}元</span>
      </div>
      <div class="btn-area bg0 bb1 bt1 f32">
        <div class="tab-log">
          <span>手续费</span>
          <span>{{info.serviceCharge | toF2}}元</span>
        </div>
        <div class="tab-log bb1 bt1">
          <span>到账金额</span>
          <span>{{info.arrivalAmount | toF2}}元</span>
        </div>
        <div class="tab-log">
          <span>交易时间</span>
          <span>{{info.transactionDate| setTime}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TopHeader from '../../../components/Header'
  export default {
    name: 'dealRecordDetail',
    components: {
      TopHeader
    },
    data() {
      return {
        info: JSON.parse(localStorage.listInfo, "{}")
      }
    },
    created() {

    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
    }, //methods结束
  }
</script>

<style scoped lang="less">
  /* logsDetail.wxss */
  .btn-area {
    padding: 0 0 0 0.4rem;
  }

  .base-area {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .base-area img {
    height: 1.6rem;
    width: 1.6rem;
    border-radius: 1.6rem;
    margin-top: 1.06666rem;
  }

  .tab-log {
    padding-right: 0.4rem;
    height: 1.76rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
</style>
