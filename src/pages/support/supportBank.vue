<template>
  <div class="supportBank">
    <title>支持的银行卡及限额列表</title>
    <div class="content">
      <!--supportBank.wxml-->
      <div class="bank-title f26 b">
        贷记卡（信用卡）
      </div>
      <ul>
        <li class="item-cell f26" style="background-color: #ff7963;color: #FFFFFF">
          <span>银行</span>
          <span>单笔限额</span>
          <span>每日限额</span>
        </li>
        <li v-for="(item,index) in xyks" class="item-cell bb bg0 f26">
          <span class="bbr">{{item.name}}</span>
          <span class="bbr">{{item.db}}万</span>
          <span>{{item.mr}}万</span>
        </li>
      </ul>


      <div class="bank-title f26 b mt30">
        借记卡（储蓄卡）
      </div>
      <ul>
        <li class="item-cell f26" style="background-color: #ff7963;color: #FFFFFF">
          <span>银行</span>
          <span>单笔限额</span>
          <span>每日限额</span>
        </li>
        <li v-for="(item,index) in cxks" class="item-cell bb bg0 f26">
          <span class="bbr">{{item.name}}</span>
          <span class="bbr">{{item.db}}万</span>
          <span>{{item.mr}}万</span>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'supportBank',
    components: {},
    data() {
      return {
        xyks: [
          {
            "name": "工商银行",
            "db": 2,
            "mr": 5
          },
          {
            "name": "农业银行",
            "db": 2,
            "mr": 5
          },
          {
            "name": "建设银行",
            "db": 1,
            "mr": 1
          },
          {
            "name": "中国银行",
            "db": 2,
            "mr": 5
          },
          {
            "name": "招商银行",
            "db": 0.5,
            "mr": 2
          },
          {
            "name": "交通银行",
            "db": 1,
            "mr": 2
          },
          {
            "name": "邮储银行",
            "db": 2,
            "mr": 5
          },
          {
            "name": "中信银行",
            "db": 2,
            "mr": 5
          },
          {
            "name": "兴业银行",
            "db": 2,
            "mr": 5
          },
          {
            "name": "浦发银行",
            "db": 2,
            "mr": 5
          },
          {
            "name": "华夏银行",
            "db": 2,
            "mr": 5
          },
          {
            "name": "平安银行",
            "db": 2,
            "mr": 5
          },
          {
            "name": "光大银行",
            "db": 2,
            "mr": 5
          },
          {
            "name": "广发银行",
            "db": 2,
            "mr": 5
          },
          {
            "name": "北京银行",
            "db": 2,
            "mr": 5
          },
          {
            "name": "上海银行",
            "db": 2,
            "mr": 5
          },
          {
            "name": "民生银行",
            "db": 2,
            "mr": 5
          }
        ],
        cxks: [
          {
            "name": "工商银行",
            "db": 5,
            "mr": 5
          },
          {
            "name": "农工银行",
            "db": 2,
            "mr": 5
          },
          {
            "name": "中国银行",
            "db": 5,
            "mr": 5
          },
          {
            "name": "建设银行",
            "db": 5,
            "mr": 5
          },
          {
            "name": "邮储银行",
            "db": 5,
            "mr": 5
          },
          {
            "name": "交通银行",
            "db": 5,
            "mr": 5
          },
          {
            "name": "招商银行",
            "db": 5,
            "mr": 5
          },
          {
            "name": "光大银行",
            "db": 5,
            "mr": 5
          },
          {
            "name": "兴业银行",
            "db": 5,
            "mr": 5
          },
          {
            "name": "华夏银行",
            "db": 5,
            "mr": 5
          },
          {
            "name": "中信银行",
            "db": 1,
            "mr": 2
          },
          {
            "name": "广发银行",
            "db": 2,
            "mr": 5
          } ,
          {
            "name": "民生银行",
            "db": 1,
            "mr": 5
          },
          {
            "name": "平安银行",
            "db": 2,
            "mr": 5
          }
        ],
      }
    },
    created() {

    },
    methods: {

    }, //methods结束
  }
</script>

<style scoped lang="less">

  .bank-title {
    height: 1.30666rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000000;
    color: #FFFFFF;
  }


  .item-cell {
    display: flex;
    flex-wrap: nowrap;
    height: 0.93333rem;
    justify-content: space-between;
  }

  .bbr {
    border-right: solid 1px #bbbbbb;
  }

  .bb {
    border-bottom: solid 1px #bbbbbb;
  }

  .item-cell span {
    text-align: center;
    width: 33.33333%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
