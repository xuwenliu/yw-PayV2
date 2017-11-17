<template>
  <div class="depositRecord">

    <title>提现记录</title>


    <div class="content">

      <div class="list-view bb1  bg0" v-if="logs.length!=0">

        <mt-loadmore
          :bottom-method="loadBottom"
          :bottom-all-loaded="allLoaded"
          @bottom-status-change="handleBottomChange"
          ref="loadmore"
          :auto-fill="false"
          :max-distance="80">

          <div v-for="(item,index) in logs" :class="{'bb1':index!=logs.length-1}"
               @click="listenerItemClick(item)" data-index="index">

            <div v-show="item.showHeader" class="item-item-header f22 bb1" style="background-color: #f5f5f9">
              {{item.payDate | setMonth}}
              <!--{{item.month}}-->
            </div>

            <div class="item-item-main">
              <div class="item-left">
                <span style="margin-top:0.10666rem; text-algin:center; word-break: break-all" class="f26 fc2">{{item.payModeDesc}}</span>
                <span class="f26 fc1">{{item.payDate | setDate}}</span>
              </div>

              <div class="item-right">
                <span v-show="false" class="f24" style="color: #b2b2b2;margin-right: 0.2rem">处理中</span>
                <span class="f30 b">{{item.amount | toF2}}元</span>
                <img style="margin-left:0.4rem;" class="arrow" src="../../../assets/img/more_ic@2x.png"/>
              </div>

            </div>


          </div>

          <div slot="bottom" class="mint-loadmore-bottom" style="font-size:0.37333rem;">
            <span v-show="bottomStatus === 'pull'">上拉加载</span>
            <span v-show="bottomStatus === 'drop'">释放加载</span>
            <span v-show="bottomStatus === 'loading'">
				      		<Spinner type="fading-circle" :size="20"></Spinner>&nbsp;加载中...

				      	</span>
          </div>
        </mt-loadmore>


        <!--<div class="weui-loadmore" hidden="{{isHideLoadMore}}">
                        <div class="weui-loading"></div>
                        <div class="weui-loadmore-tips">正在加载</div>
                      </div>-->
      </div>
      <NoFile v-else>
        <img slot="bgimg" src="../../../assets/img/wjyjl_ic.png">
        <span slot="info" class="f32" style="color: #282828">您还没有提现记录</span>
      </NoFile>
    </div>
  </div>
</template>

<script>
  import TopHeader from '../../../components/Header'
  import NoFile from '../../../components/NoFile'
  import {MessageBox} from 'mint-ui';
  export default {
    name: 'depositRecord',
    components: {
      TopHeader,
      NoFile,
    },
    data() {
      return {
        allLoaded: false,
        bottomStatus: "",
        pageNum: 1,
        pageSize: 10,
        logs: [],
      }
    },
    created() {
      this.getDataInfo();

    },

    mounted(){

    },


    methods: {
      //mint-ui 上拉加载
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      loadBottom() {
        this.pageNum += 1;
        setTimeout(() => {
          this.getDataInfo();
          this.$refs.loadmore.onBottomLoaded();
        }, 1500);
      },

      /*默认数据*/
      getDataInfo(){
        this.$http.get(`${window.Host.apiHost}/pos/twitter/applied/record?pageNum=${this.pageNum}&pageSize=${this.pageSize}`).then((res) => {
          console.log(res);
          if (res.data.stateCode === 0) {

            if (this.pageNum == 1) {
              this.logs = res.data.data || [];
              this.logs.length < this.pageSize ? this.allLoaded = true : this.allLoaded = false; //true是禁止上拉加载
            } else {
              this.logs = this.logs.concat(res.data.data) || []
            }

            for (var i = 0; i < this.logs.length; i++) {
              if (this.logs[i]) {
                var date = new Date(this.logs[i].transactionDate);
                var month = date.getFullYear() + "-" + (date.getMonth() + 1);
                this.logs[i].month = month;

                if (i == 0) {
                  this.logs[i].showHeader = true;
                } else {
                  this.logs[i - 1].month == this.logs[i].month ? this.logs[i].showHeader = false : this.logs[i].showHeader = false;
                }
              }
            }

          } else {
            this.allLoaded = true;
            MessageBox({
              closeOnClickModal: false, closeOnClickModal: false, confirmButtonText: "我知道了",
              title: '提示',
              message: res.data.message,
              showCancelButton: false
            });
          }
        })
      },

      goBack() {
        this.$router.go(-1);
      },
      listenerItemClick(dt) {
        localStorage.listInfo = JSON.stringify(dt);
        this.$router.push({"name": "depositRecordDetail", query: {'image': dt.voucher}});
      },
    }, //methods结束
  }
</script>

<style scoped lang="less">
  /* logs.wxss */

  .mint-loadmore-bottom span {
    display: inline-block;
    vertical-align: middle
  }

  .log-list {
    display: flex;
    flex-direction: column;
    padding: 0.53333rem;
  }

  .list-view {
  }

  .list-item {

  }

  .item-item-header {
    height: 0.66666rem;
    line-height: 0.66666rem;
    padding-left: 0.4rem;
  }

  .item-item-main {
    display: flex;
    height: 1.33333rem;
    align-items: center;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    justify-content: space-between;
  }

  .item-left {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
  }

  .item-left img {
    width: 1.06666rem;
    height: 1.06666rem;
    margin-right: 0.4rem;
    box-sizing: border-box;
    border-radius: 1.06666rem;
  }

  .item-center {
    display: flex;
    flex-grow: 2;
    flex-direction: column;
  }

  .item-right {
    display: flex;
    align-items: center;
  }

</style>
