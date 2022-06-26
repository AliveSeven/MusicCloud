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
import { getleadAPI,playlistDetailAPI } from '@/utils/api'
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

<style>

</style>