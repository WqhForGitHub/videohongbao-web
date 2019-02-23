<template>
  <div class="view">
    <div v-for="(item, index) in data" :key="index" class="item">
      <div class="userInfo">
        <img :src="item.avatarUrl" class="avatar"/>
        <span class="nickName">{{ item.nickName }}</span>
      </div>
      <p class="title">{{ item.title }}</p>
      <img :src="picItem" class="img" v-for="(picItem, picIndex) in item.picList" :key="picIndex" @click="imgClick(item.picList, picItem)" mode='aspectFill'/>
     <div class="idnex">浏览量{{item.zan}}</div>
     <div style="overflow: hidden;"> 
       <span style="font-size:13px;">{{item.ren}}人已浏览....</span>
     </div>
    </div>
    
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import store from '../../store'
  export default {
    name: 'FalsHome',
    store,
    computed: {
      ...mapGetters(['userInfo'])
    },
    data () {
      return {
        data: [
          {
            avatarUrl: 'https://youimg1.c-ctrip.com/target/100a0o000000eqt6lE4F5.jpg',
            nickName: 'REICE',
            title: '巴菲尔铁塔 sola！！！',
            zan:1688,
            ren:['drams','reise','孤独住着你个人','没有人总是照顾你','人心总是复杂的',1552],
            picList: [
              'https://youimg1.c-ctrip.com/target/100a0o000000eqt6lE4F5.jpg',
              'https://youimg1.c-ctrip.com/target/10030a0000004mlnfD927.jpg',
              'https://youimg1.c-ctrip.com/target/10050a0000004ml4pEAAD.jpg',
              'https://youimg1.c-ctrip.com/target/100m0a0000004rc478F42.jpg'
            ]
          },
          {
            avatarUrl: 'http://www.biaobaiju.com/uploads/20180122/21/1516629307-cgofhyRNbZ.jpg',
            nickName: '生活如此多娇',
            title: '虽然累,但是很开心',
            zan:958,
            ren:['drams','reise','孤独住着你个人','没有人总是照顾你','人心总是复杂的',1052],
            picList: [
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544365760945&di=acf7af257f08f14b4fc47573967fddd8&imgtype=0&src=http%3A%2F%2Fimg1.qunarzz.com%2Ftravel%2Fd2%2F1505%2F2b%2F4a62d7d8643220.jpg_r_365x650x95_d246e4af.jpg',
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544365760944&di=53b476b26bb7e3b5f735fdc13f2e2eb6&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1206%2F07%2Fc10%2F11916174_11916174_1339058803703_mthumb.jpg',
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544365760942&di=e4762561b7549947b13753434316b7c6&imgtype=0&src=http%3A%2F%2Fstatic01.lvye.com%2Falbum%2F201011%2F28%2F794881_1290913963xxSB.jpg',
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544365760942&di=8d63150da204cfe2c94ee566a96ac030&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fphotoblog%2F9%2F3%2F6%2F0%2F9360608%2F20097%2F22%2F1248248013387_mthumb.jpg'
            ]
          },
          {
            avatarUrl: 'http://m.3fantizi.com/article/pic/201446191130633.jpg',
            nickName: '开心每一天',
            title: '好久没出来浪了',
            zan:1315,
            ren:['drams','reise','孤独住着你个人','没有人总是照顾你','人心总是复杂的',1110],
            picList: [
              'http://imgsrc.baidu.com/imgad/pic/item/58ee3d6d55fbb2fb29bdac3b444a20a44623dc01.jpg',
              'http://d.hiphotos.baidu.com/lvpics/w=1000/sign=0598e632ce1349547e1eec64667e9358/b812c8fcc3cec3fda744f9c6d388d43f8794270e.jpg',
              'http://pic.5tu.cn/uploads/allimg/1203/201053136840.jpg',
              'http://58pic.ooopic.com/58pic/14/04/37/97M58PICDZz.jpg'
            ]
          },
          {
            avatarUrl: 'http://img.xiazaizhijia.com/uploads/2018/0509/20180509032552197.jpg',
            nickName: '👻元帅',
            title: '这是哪？？？',
            zan:1525,
            ren:['时间都去哪了,','等一分钟','狼人','隔壁有个老王~','奋斗才是财富',754],

            picList: [
              'http://upload.linmingzhe.com//FpWhuBcoupe1XUmTmfDUpmL2NWii',
              'http://upload.linmingzhe.com//FnfNEv9tQFD2vDr1bG6zO4ASrBh3'
            ]
          },
          {
            avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/a5FMF6AyAoiclrOFYkXQhmRHPZY6OGicKB1ephXSSQDgdY5RFvJNuWusz084SD04yPyicRHk8V3ic8Gd2MlFYoK4CQ/132',
            nickName: '大屌丝',
            title: '一座来了不想走的城市-成都，主要还是美食！！！',
            zan:5645,
            ren:['影魅&,','初次想你','风~爱','站在风口的猪','浪迹天涯',6512],
            picList: [
              'http://upload.linmingzhe.com//FpcnWP-P-MTAOcyPW-FwzwI_tHVb',
              'http://upload.linmingzhe.com//FlS06wQEZ1wvXJZr5mxsq-pRWDKq',
              'http://upload.linmingzhe.com//FsYPCEgjUq303NkE3u73SEpjHNLB',
              'http://upload.linmingzhe.com//Fs8CtG6ag-UW_I7ahquaHhhpE0iS'
            ]
          },
          {
            avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKSL3j0YXvGzcI5AD8x8m1uT0VlEcTTEZAFFQMu4y60cgI1e1ZYFAqXXPCgTD8dcMV80UYRiaYnf0Q/132',
            nickName: 'aldclaose',
            title: '好嗨呦！！！',
            zan:298,
            ren:['初闻不如相见','殇','soloa','Annice','安好',245],
            picList: [
              'https://youimg1.c-ctrip.com/target/1001080000003h0el0683.jpg',
              'https://youimg1.c-ctrip.com/target/100j060000001q9az7E25.jpg',
              'https://youimg1.c-ctrip.com/target/100i0q000000gn5fh08CA.jpg',
              'https://youimg1.c-ctrip.com/target/100m0q000000gxhg81069.jpg'
            ]
          },
          {
            avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/pQ0ZcFkqrCS7rhzzeiagguhLd5q0JC0edTmEfbGprsjiaF3Rf8RgkGwO5qyOuFzkVNxjibnw2Kg1TXCAZ1l4PZ9iaw/132',
            nickName: '青春不再回',
            title: '红海滩风景区，有机会去一次',
            zan:367,
            ren:['奔跑,','北有乔峰','毕加索','吃货桑不起','淡看江湖',120],
            picList: [
              'https://youimg1.c-ctrip.com/target/100a0o000000eqt6lE4F5.jpg',
              'https://youimg1.c-ctrip.com/target/10030a0000004mlnfD927.jpg',
              'https://youimg1.c-ctrip.com/target/10050a0000004ml4pEAAD.jpg',
              'https://youimg1.c-ctrip.com/target/100m0a0000004rc478F42.jpg'
            ]
          }
        ]
      }
    },
    methods: {
      imgClick (picList, item) {
        uni.previewImage({
          urls: picList,
          current: item
        })
      }
    },
    onPullDownRefresh(){
        setTimeout(() => {
          uni.showToast({
              title: "刷新成功",
              success(){
                uni.stopPullDownRefresh()
              }
            });
        }, 1500);
              
          
    },
     onReachBottom: function () {
       uni.showLoading({
            title: '玩命加载中',
        })
      setTimeout(() => {
         uni.hideLoading()
        }, 1500);
       
  }
  }
</script>

<style lang="less" scoped>
  @import "../../common/style/variable";
  .idnex{
    font-size: 14px;
    color:#ddd;
  }
  .view{
    width: 100%;
    height: 100vh;
    .item{
      margin: 5px 19px 0 20px;
      box-sizing: border-box;
      .userInfo{
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        .avatar{
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border:1px solid #ddd;
        }
        .nickName{
          font-size: 16px;
          margin-left: 10px;
          overflow: hidden;
        }
      }
      .title{
        color: #6e6e6e;
        font-size: 14px;
        margin-bottom: 10px;
      }
      .img{
        width: 100px;
        height: 114px;
        border-radius:10px;
        margin-left: 3px;
        margin-bottom: 3px;
        vertical-align: top;
      }
    }
  }
</style>
