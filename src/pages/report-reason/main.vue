<template>
	<div>
		<div v-show="!hide">
			<div class="inputarea">
				<textarea v-model="remark" class="textarea" rows="6" maxlength="300" placeholder="请输入审核不通过原因">
				</textarea>
			</div>
			<div class="buttongroup">
				<van-button class="warn" type="warning" @click="jubao">举报</van-button>
				<van-button class="danger" type="danger" @click="cirfim">确定</van-button>
			</div>
		</div>
		<div class="view" v-show="hide">
			<div class="index" @click="itemClick(item.label)" :data-value='item.label' v-for="(item,i) in data" :key="i">
				<p>{{item.label}}</p>
			</div>
		</div>
	</div>
</template>

<script>
	import {getnoaudit} from '../../api'
  import store from '../../store/index'
  import myItem from '../../components/my-item'
  export default {
    name: 'ReportReason',
    store,
    components: {
      myItem
    },
    data () {
      return {
				hide:false,
        data: [
          {
            label: '色情低俗',
            value: '',
            showIcon: true
          },
          {
            label: '政治敏感',
            value: '',
            showIcon: true
          },
          {
            label: '违法犯罪',
            value: '',
            showIcon: true
          },
          {
            label: '涉嫌欺诈',
            value: '',
            showIcon: true
          },
          {
            label: '造谣传谣',
            value: '',
            showIcon: true
          },
          {
            label: '垃圾广告',
            value: '',
            showIcon: true
          }
        ],
        params: {
          id: '',
          reason: '',
          type: '',
          status:''
        },
				obj:{},
				remark:'',
				userInfo:{}
      }
    },
    methods: {
			cirfim() {
				this.ongetnoaudit();
			},
			async ongetnoaudit() {
				const res = await getnoaudit({
					session:this.userInfo.token.userToken,
					userId:this.userInfo.User.id,
					videoid:this.obj.id,
					banReason:this.remark
				})
				uni.showToast({
          title: '审核成功',
          icon: 'success',
        });
        uni.navigateBack({
          delta:1,
        })
			},
      itemClick (reason) {
        const obj = this.obj
        this.params.status = obj.status
        this.params.id = obj.id
        this.params.type = obj.type
        this.params.reason = reason
        console.log( this.params);
				uni.setStorage({
						key: 'params',
						data: this.params,
						success: () => {
								console.log('params is success');
						}
				});
        uni.navigateTo({ url: '../report-res/main?'})
      },
			jubao() {
				this.hide = true
			}
    },
    onShow () {
      uni.setNavigationBarTitle({
        title: '填写审核不通过原因'
      })
    },
		onLoad() {
			this.remark = ''
			let that = this
			uni.getStorage({
				key:'obj',
				success: (res) => {
					console.log(res.data)
					that.obj = res.data
				}
			})
			uni.getStorage({
				key: 'list',
				success: (res) => {
					that.userInfo = res.data
					console.log('get')
					console.log(that.userInfo)
				}
			});
		}
  }
</script>

<style lang="less" scoped>
  @import "../../common/style/variable";
  .view{
    width:100%;
    height:100vh;
		font-size:20px;
    background: #fff;
    .index{
      width: 100%;
      height: 50px;
      border-bottom: 1px solid #d0d0d0;
      color:#000;
      line-height: 50px;
      text-align: center;
    }
}
.inputarea {
	width:95vw;
	height:100px;
	margin:0 auto;
	border:1px solid #f0f0f0;
	box-shadow: 0 1px 10px rgba(lightgray);
	overflow: scroll;
	.textarea {
		width:98%;
	}
}
.buttongroup {
	width:93vw;
	height:50px;
	margin:3% auto;
	display: flex;
	justify-content: space-between;
	.warn {
		width:70px;
		height:40px;
		line-height: 40px;
		border-radius:20px;
	}
	.danger {
		width:70px;
		height:40px;
		line-height: 40px;
		border-radius:20px;
	}
}
</style>
