<template>
  <div class="view">
    <section class="main">
      <div class="video-description">{{ data.remark }}</div>
      <div v-for="(item, index) in coverList" :key="index" class="imgItem">
        <img :src="item" @click="onPreviewImage(coverList, item)"/>
      </div>
    </section>
    <div class="footer">
      <button class="btn" @click="clickCommen">评论</button>
      <button class="btn" @click="showRewardPicker = true">赏</button>
    </div>
    <div class="reward-picker" v-show="showRewardPicker" @click="showRewardPicker = false">
      <div class="reward-view" @click.stop>
        <P class="title">请输入打赏金额</P>
        <div class="amount-view">
          <input class="amount" v-model.number="rewardParams.money"/>
          <span class="label">元</span>
        </div>
        <div class="reward-view">
          <button class="reward-btn" @click="onReward">打赏</button>
        </div>
      </div>
    </div>
    <!--评论-->
    <div class="comment-picker" v-show="showCommenPicker" @click="showCommenPicker = false">
      <!--评论-->
      <scroll-view :scroll-y="true" class="comment-scroll" @scrolltolower="scrolltolower">
        <div class="comment-content" @click.stop>
          <div class="comment-item" v-for="(item, index) in commentList" :key="index" @click="clickCommentItem(item)">
              <img class="avatar-img" :src="item.author.avatarUrl"/>
              <div class="text">
                <p class="nickname">{{ item.author.nickName }}</p>
                <p class="content">{{ item.content }}</p>
                <div class="parent" v-if="item.parent !== null">
                  <p class="parent-nickname">{{ item.parent.author.nickName }}</p>
                  <p class="parent-content">{{ item.parent.content }}</p>
                </div>
                <p class="comment-time">{{ item.createTime }}</p>
              </div>
            </div>
          <p class="more" v-show="commentList.length === 0">暂无评论，快去评论吧~</p>
          <p v-show="showMore" class="more">没有更多了~</p>
        </div>
      </scroll-view>
      <div class="send-comment-view" @click.stop>
        <input
          :placeholder="inputStatus.placeholder"
          v-model="commentParams.content"
          :auto-focus="inputStatus.focus"
          :maxlength="-1"
          :show-confirm-bar="false"
          @blur="textareaBlur"/>
        <span @click="onComment">发送</span>
      </div>
    </div>
    <div v-if="showDetail" class="increase-popup" @click="showDetail = false">
      <div class="increase-wrap" @click.stop>
       <p @click="clickReply">回复</p>
       <p @click="clickCopy">复制</p>
       <p @click="clickAccuse">举报</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { comment, commentList, reward, payRewardByuniPub } from '../../api'
  import { statusCode } from '../../config/api.cfg'
  import moment from 'moment'
  import { mapGetters } from 'vuex'
  import store from '../../store/index'
  import { formatTime } from '../../utils'

  export default {
    name: 'Reward',
    store,
    computed: {
      ...mapGetters(['userInfo'])
    },
    data () {
      return {
        data: [],
        showRewardPicker: false,
        showCommenPicker: false,
        commentList: [],
        comment: '',
        commentListParams: {
          videoid: '',
          page: 0,
          size: 20,
          sort: 'createTime,desc'
        },
        commentParams: {
          videoid: '',
          content: '',
          parentid: ''
        },
        rewardParams: {
          money: '',
          receiverid: '',
          sourceid: ''
        },
        totalPages: 0,
        showMore: false,
        inputStatus: {
          focus: false,
          placeholder: '留下你的精彩评论吧'
        },
        coverList: [],
        showDetail: false,
        commentItem: {}
      }
    },
    methods: {
      moment,
      onPreviewImage (picList, item) {
        uni.previewImage({
          urls: picList,
          current: item
        })
      },
      clickAccuse () {
        const obj = {
          id: this.commentItem.id,
          type: 'comment'
        }
        uni.navigateTo({ url: '../report-reason/main?obj=' + JSON.stringify(obj) })
      },
      clickCopy () {
        uni.setClipboardData({
          data: this.commentItem.content,
          success: () => {
            this.showDetail = false
            uni.showToast({
              title: '复制成功'
            })
          }
        })
      },
      clickReply () {
        this.showDetail = false
        this.commentParams.parentid = this.commentItem.id
        this.inputStatus.focus = true
        this.inputStatus.placeholder = `回复${this.commentItem.author.nickName}：`
      },
      async payReward (id) {
        const res = await await payRewardByuniPub({
          rewardid: id,
          openid: this.userInfo.openid,
          paychannel: 'uni_lite'
        })
        if (res.data.code === statusCode.OK) {
          const data = res.data.data
          const credential = JSON.parse(data.data.credential)
          uni.requestPayment({
            timeStamp: credential.timeStamp,
            nonceStr: credential.nonceStr,
            package: credential.package,
            signType: credential.signType,
            paySign: credential.paySign,
            success: (res) => {
              this.showRewardPicker = false
              this.rewardParams.money = ''
            },
            fail: (res) => {
              console.log(res)
            }
          })
        }
      },
      async onReward () {
        this.rewardParams.receiverid = this.data.author.id
        this.rewardParams.sourceid = this.data.id
        this.rewardParams.money = this.rewardParams.money * 100
        const res = await reward(this.rewardParams)
        if (res.data.code === statusCode.OK) {
          const data = res.data.data
          const credential = JSON.parse(data.credential)
          uni.requestPayment({
            timeStamp: credential.timeStamp,
            nonceStr: credential.nonceStr,
            package: credential.package,
            signType: credential.signType,
            paySign: credential.paySign,
            success: (res) => {
              this.showRewardPicker = false
              this.rewardParams.money = ''
            },
            fail: (res) => {
              console.log(res)
            }
          })
        }
      },
      setTime (createTime) {
        return formatTime(new Date(createTime))
      },
      textareaBlur (event) {
        if (this.commentParams.parentid !== null && this.commentParams.parentid !== '') {
          this.inputStatus.focus = false
          this.inputStatus.placeholder = '留下你的精彩评论吧'
          this.commentParams.content = ''
          this.commentParams.parentid = ''
        }
      },
      clickCommentItem (item) {
        this.showDetail = true
        this.commentItem = item
        // this.commentParams.parentid = item.id
        // this.inputStatus.focus = true
        // this.inputStatus.placeholder = `回复${item.author.nickName}：`
      },
      clickCommen () {
        this.showCommenPicker = true
        this.showMore = false
        this.commentListParams.page = 0
        this.commentList = []
        this.loadCommentList()
      },
      scrolltolower () {
        this.commentListParams.page++
        if (this.commentListParams.page >= this.totalPages) {
          this.showMore = true
          return
        } else {
          this.showMore = false
        }
        this.loadCommentList()
      },
      likeClick () {
        uni.switchTab({ url: '../hairhongbao/main' })
      },
      async onComment () {
        const res = await comment({
          videoid: this.commentParams.videoid,
          content: this.commentParams.content,
          parentid: this.commentParams.parentid
        })
        if (res.data.code === statusCode.OK) {
          this.setCommentStatus()
          this.loadCommentList()
        }
      },
      setCommentStatus () {
        this.commentListParams.page = 0
        this.commentList = []
        this.commentParams.content = ''
        this.commentParams.parentid = ''
        this.inputStatus.placeholder = '留下你的精彩评论吧'
      },
      async loadCommentList () {
        const res = await commentList(this.commentListParams)
        if (res.data.code === statusCode.OK) {
          const list = res.data.data.content
          this.commentList.push(...list)
          this.totalPages = res.data.data.totalPages
          this.commentList.forEach((item) => {
            item.createTime = formatTime(new Date(item.createTime))
          })
        }
      }
    },
    onUnload () {
      this.showCommenPicker = false
    },
    onReady () {
      uni.setNavigationBarTitle({
        title: '评论'
      })
      this.data = JSON.parse(this.$mp.query.item)
      this.coverList = JSON.parse(this.data.cover)
      this.commentListParams.videoid = this.data.id
      this.commentParams.videoid = this.data.id
    }
  }
</script>

<style lang="less" scoped>
  @import "../../common/style/variable";
  .view{
    .main{
      margin: 0 19px 20px 20px;
      .video-description{
        margin-bottom: 16px
      }
      .imgItem{
        display: inline-block;
        vertical-align: top;
        width: 110px;
        height: 114px;
        margin: 0 3px 3px 0;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .footer{
      display: flex;
      justify-content: space-around;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 9px 0;
      border-top: 1px solid @color-gray-ll;
      background: @color-white-background;
      .btn{
        width: 158px;
        height: 36px;
        line-height: 36px;
        background: #FF6029;
        border-radius: 59px;
        font-size: @font-size-medium-x;
        color: @color-white;
        letter-spacing: 0;
      }
    }
    .overlayer{
      position:fixed;
      left:0;
      top:0;
      width:100%;
      height:100%;
      z-index:10;
      background-color: #000;
      background: rgba(0, 0, 0, 0.9);
    }
    .reward-picker, .comment-picker{
      position: fixed;
      left: 0;
      top: 0;
      width: 100vw;
      height: 100vh;
      color: @color-gray-l;
    }
    .send-comment-view{
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 54px;
      background: @color-white-background;
      input{
        width: 251px;
        height: 38px;
        background: #F3F6F9;
        border: 1px solid #E5EAEE;
        border-radius: 58px;
        padding: 0 20px;
        margin-left: 20px;
      }
      span{
        display: inline-block;
        font-size: @font-size-medium-x;
        color: #333333;
        margin-right: 20px;
      }
    }
    .reward-view{
      position: absolute;
      bottom: 0;
      height: 300px;
      width: 100vw;
      background-color: #000;
      background: rgba(0, 0, 0, 0.9);
      z-index:500;
      .title{
        font-size: @font-size-large-x;
        color: @color-white;
        text-align: center;
        margin: 30px 0 20px 0;
      }
      .amount-view{
        display: flex;
        align-items: center;
        font-size: @font-size-medium;
        margin: 0 20px;
        background: @color-white;
        border-radius: 2px;
        .amount{
          display: inline-block;
          width: 90%;
          padding-left: 10px;
        }
        .label{
          width: 10%;
        }
      }
      .reward-view{
        position: absolute;
        left: 0;
        bottom: 0;
        height: 54px;
        background: @color-white-background;
        .reward-btn{
          background: #FF6029;
          border-radius: 58px;
          margin: 8px 20px;
          font-size: @font-size-medium-x;
          color: @color-white;
          letter-spacing: 0;
        }
      }
    }
    .comment-scroll{
      position: absolute;
      bottom: 50px;
      width: 100vw;
      height: 318px;
      background: rgba(0,0,0,0.70);
      font-size: @font-size-small;
      .comment-content{
        width: 100%;
        height: 100%;
        .comment-item{
          display: flex;
          justify-content: flex-start;
          padding: 8px;
          .avatar-img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }
          .text{
            display: inline-block;
            width: 85%;
            margin-left: 8px;
            .nickname{
              font-size: 15px;
            }
            .content{
              font-size: @font-size-medium;
            }
            .content, .parent-content{
              word-break: break-all;
              word-wrap: break-word;
            }
            .nickname, .parent-nickname{
              letter-spacing: 0;
              color: @color-white;
            }
            .comment-time{
              font-size:@font-size-small;
              color: #999999;
              letter-spacing: 0;
            }
            .parent{
              margin-top: 5px;
              border-left: 1px solid #ccc;
              padding-left: 10px
            }
          }
        }
        .comment-item:last-child{
          border-bottom: none;
        }
      }
      .more{
        width: 100vw;
        text-align: center;
        margin: 15px 0;
      }
    }
    .increase-popup{
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      box-sizing: border-box;
      background: rgba(0,0,0,.5);
      z-index: @z-index-l2;
      .increase-wrap{
        width: 100%;
        margin: 0 16px;
        padding: 0 16px;
        border-radius: 8px;
        box-sizing: border-box;
        background: @color-white-background;
        p{
          padding: 10px;
        }
      }
    }
  }
</style>
