<template>
  <!--交易记录详情-->
  <div class="dealRecordDetail">
    <title>提现记录</title>

    <div class="content">
      <img style="width: 100%" :src="image">
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
        image: this.$route.query.image
      }
    },
    created() {
      console.log(this.info)


    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
    }, //methods结束
  }
</script>

<style scoped lang="less">

</style>
