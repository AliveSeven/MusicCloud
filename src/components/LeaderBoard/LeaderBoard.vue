<template>
  <div class="lead-container">
      <div class="lead-wrap" v-for="(item, index) in leaderList" :key="index" @click="toPlaylist(item.id)">
          <div class="item">
            <div class="img-wrap">
                <!-- 播放小图标 -->
                <span class="iconfont icon-play player-icon"></span>
                <!-- 封面 -->
                <img v-lazy="item.coverImgUrl" alt="">
                <div class="num-wrap">
                    <!-- 播放图标 -->
                    <span class="iconfont icon-play num-icon"></span>
                    <!-- 播放次数 -->
                    <div class="num">{{ item.playCount | ellipsisPlayVolume }}</div>
                </div>
            </div>
                <!-- 标题 -->
            <div class="title">{{item.name}}</div>
          </div>
      </div>
  </div>
</template>

<script>
import { getleadAPI } from '@/utils/api'
export default {
    name:'leaderboard',
    data() {
        return {
            // 数据
            leaderList: []
        }
    },
    created() {
        getleadAPI().then((res)=>{
            // console.log('榜单数据',res)
            this.leaderList = res.data.list
        })
    },
    methods: {
        // 获取排行榜详细,跳转到歌单详情处
        toPlaylist(id){
            // 跳转并携带数据即可
            // console.log('排行榜歌单',id)
            this.$router.push(`/playlist?q=${id}`);
        }
    },
}
</script>

<style lang="less" scoped>
.lead-container{
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 1200px;
    margin: 35px 50px;
    display: flex;
    flex-wrap: wrap;

    .lead-wrap{
        margin: 10px 20px;
        margin-bottom: 80px;

        .item{
            .img-wrap{
                width: 200px;
                position: relative;
                cursor: pointer;
                
                img{
                    width: auto;
                    height: auto;
                    max-width: 100%;
                    max-height: 100%;
                    border-radius: 10px;
                    box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.3);
                }

                .player-icon{
                    position: absolute;
                    top: 50%;
                    left: 50%;  
                    transform: translate(-50%, -50%); /* 设为居中 */
                    width: 40px;
                    height: 40px;
                    color: #dd6d60;
                    font-size: 20px;    /* 文字大小 */
                    border-radius: 50%;   /* 描边 */
                    display: flex; 
                    align-items: center;
                    justify-content: center;   /* 横轴纵轴居中 */
                    padding-left: 5px;
                    background: rgba(255, 255, 255, 0.8);
                    opacity: 0;
                }

                &:hover .player-icon{
                    opacity: 1;
                }
            }

            .title{
                text-align: center;
            }

            .num-wrap{
                position: absolute;
                color: white;
                top: 5px;
                right: 5px;
                display: flex;
                align-items: center;
                font-size: 15px;
                padding-right: 5px;

                .num-icon{
                    margin-right: 5px;
                }
            }
        }
    }

}

@media screen and (max-width : 500px) {
    .lead-container{
        margin : 0;
        justify-content: center;
    }

    .lead-container .lead-wrap{
        margin: 20px;
    }

    .lead-container .lead-wrap .item .img-wrap{
        width: 110px;
    }

    .lead-container .lead-wrap .item .title{
        width: 100px;
        overflow: hidden;
        font-size: 10px;
    }
  
}
</style>