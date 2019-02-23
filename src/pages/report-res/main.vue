<template>
  <div class="view">
    <div class="reason">
      <span class="label">举报理由</span>
      <span class="value">{{ reportreason.reason }}</span>
    </div>
    <p class="description-title">举报描述(选填)</p>
    <div class="description">
      <textarea class="textarea-view" v-model="reason.description" placeholder="详细描述举报理由..."></textarea>
    </div>
    <button class="confirm" @click="confirm">提交</button>
  </div>
</template>

<script>
import { videoAccuse, commentAccuse, reviewVideoBan } from "../../api";
import { statusCode } from "../../config/api.cfg";
export default {
  name: "ReportRes",
  data() {
    return {
      params: {},
      videoid: "",
      id: null,
      reason: {
        reason: "",
        description: ""
      },
      type: "",
      status: {
        video: videoAccuse,
        comment: commentAccuse,
        reviewVideo: reviewVideoBan
      },
      statuVideo:'',
			reportreason:[],
			userInfo:[]
    };
  },
  methods: {
		// 视频举报提交
    async confirm() {
      console.log(this.reason.reason);
      console.log(this.reason.description);
      console.log(this.id);
      const res = await videoAccuse({
				userId:this.userInfo.User.id,
				session:this.userInfo.token.userToken,
        videoid: this.reportreason.id,
        reason: this.reason.description
      });
      console.log(res);
      if (res.data.msg == "ok") {
        uni.showToast({
          title: "举报成功"
        });
        // setTimeout(() => {
        //   if(this.statuVideo=='1'){
        //   uni.navigateTo({
        //     url: `/pages/review-video/main`
        //   });
        //   }else if(this.statuVideo=='0'){
        //        uni.navigateTo({
        //       url: `/pages/index/main`
        //   });
        //   }
        // }, 2000);
         this.reason.description=''
              
             console.log('跳');
             
     
        console.log(this.statuVideo);
        if(this.statuVideo===0){
          console.log(545675674657556);
          setTimeout(() => {
              uni.switchTab({
            url: '../index/main'
          });
          }, 2000);
     
        }else if(this.statuVideo===1){
          setTimeout(()=>{
               uni.navigateTo({
            url: `../review-video/main`
          });
          },2000)
        }
        
      } else {
        uni.showToast({
          title: "提交失败",
          icon: "none"
        });
      }
      // const res = await this.status[this.type](this.id, {
      //   reason: JSON.stringify(this.reason)
      // })
      //  videoAccuse({videoid:this.})

      // if (res.data.msg == "ok") {
      //   uni.showToast({
      //     title: '举报成功'
      //   })
      //   setTimeout(() => {
      //         uni.reLaunch({
      //          url:`/pages/review-video/main`
      //        })
      //     if (this.type === 'reviewVideo') {
      //       // uni.redirectTo({ url: '/pages/review-video-play/main' })
      //       uni.navigateBack({
      //         data:'2'
      //       })
      //     } else {
      //       uni.switchTab({ url: '/pages/home/main' })
      //     }
      //   }, 1000)
      // } else {
      //   uni.showToast({
      //     title: '提交失败',
      //     icon: 'none'
      //   })
      // }
    }
  },
  onShow() {
    uni.setNavigationBarTitle({
      title: "视频举报"
    });
		/*
    const params = JSON.parse(this.$mp.query.params);
    this.id = params.id;
    this.reason.reason = params.reason;
    this.type = params.type;
    this.statuVideo=params.status*/
  },
	onLoad() {
		let that = this
		uni.getStorage({
				key: 'params',
				success: (res) => {
						console.log(res.data);
						that.reportreason = res.data
				}
		});
		uni.getStorage({
			key: 'list',
			success: (res) => {
			//console.log(res.data);
			that.userInfo = res.data
		}
		});
	}
};
</script>

<style lang="less" scoped>
@import "../../common/style/variable";
.view {
  padding: 0 15px;
	font-size:14px;
  .reason {
    .label {
      color: #c4c4c4;
    }
    .value {
      margin-left: 15px;
    }
  }
  .description-title {
    margin: 20px 0 10px 0;
  }
  .description {
    border: 1px solid #e5eaee;
    padding: 10px;
    font-size: 14px;
    color: #999999;
    letter-spacing: 0;
    .textarea-view {
      width: 100%;
    }
  }
  .confirm {
		width:80vw;
		height:40px;
		line-height:40px;
    margin: 5% auto;
    background: #ff6029;
    border-radius: 31px;
    color: @color-white;
    letter-spacing: 0;
  }
}
</style>
