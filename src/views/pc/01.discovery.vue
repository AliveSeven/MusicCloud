<template>
  <div class="discovery-container">
    <!-- 轮播图，宽度平行于下面组件 -->
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <!-- 使用懒加载,动态改变图片链接 -->
        <img v-lazy="item.imageUrl" alt="" @click="PlayBanner(item)" />
        <h3 class="medium">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>

    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="titl">推荐歌单</h3>
      <!-- 图片项 -->
      <div class="items">
        <div class="item" v-for="(item, index) in list" :key="index">
          <div class="img-wrap">
            <!-- 歌单描述 -->
            <div class="desc-wrap">
              <span class="desc">播放量：{{ item.playCount }}</span>
            </div>
            <!-- 歌单图片 -->
            <img v-lazy="item.picUrl" alt="" @click="toPlaylist(item.id)" />
            <span class="iconfont icon-play" @click="toPlaylist(item.id)"></span>
          </div>
          <!-- 歌单名字 -->
          <p class="name">{{ item.name }} </p>
        </div>
      </div>
    </div>

    <!-- 最新音乐 -->
    <div class="news">
      <h3 class="title">最新音乐</h3>
      <div class="items">
        <div class="item" v-for="(item, index) in songs" :key="index">
          <div class="img-wrap">
            <!-- 封面 -->
            <img v-lazy="item.picUrl" alt="">
            <span @click="PlayMusic(item)" class="iconfont icon-play"></span>
          </div>

          <div class="song-wrap">
            <!-- 歌名 -->
            <div class="song-name">{{ item.name }}</div>
            <!-- 歌手名 -->
            <div class="singer">{{ item.song.artists[0].name }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- MV推荐 -->
    <div class="mvs">
      <h3 class="title">MV推荐</h3>
      <div class="items">
        <div class="item" v-for="(item, index) in mvs" :key="index" @click="toMvDetail(item.id)">
          <!-- 图片包 -->
          <div class="img-wrap">
            <img v-lazy="item.picUrl" alt="">
            <!-- 圆圈那个东西，点下去播放 -->
            <span class="iconfont icon-play icon1"></span>
            <!-- 播放次数 -->
            <div class="num-wrap">
              <span class="iconfont icon-play icon2"></span>
              <div class="num">{{ item.playCount }}</div>
            </div>
          </div>
          <!-- MV信息 -->
          <div class="info-wrap">
            <!-- MV名 -->
            <div class="name">{{ item.name }}</div>
            <!-- 歌手名字 -->
            <div class="singer">{{ item.artistName }}</div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import axios from "axios";
import { bannerAPI, recommendSonglistAPI, recommendSongAPI, recommendMVAPI, playMusicAPI } from '@/utils/api';
import { checkMusic, getSongUrl, getEverySongDetail } from '@/utils/playmusic'
import { mapActions } from 'vuex'

export default {
  name: 'discovery',
  data() {
    return {
      //轮播图
      banners: [],
      //推荐歌单
      list: [],
      //最新音乐
      songs: [],
      //MV推荐
      mvs: [],
      // 最新音乐获取限制
      newSongLimit: 15,
    }
  },
  // 注意，created()函数是在页面加载的时候调用一次，后续要多次调用改为用监听watch
  created() {
    //console.log('created')
    //轮播图接口
    bannerAPI().then(res => {
      // console.log(res)
      this.banners = res.data.banners
    }).then(() => {
      this.loading = false
    })

    // 推荐歌单，params传入{limit:15}
    recommendSonglistAPI({ limit: 15 }).then(res => {
      // console.log("推荐歌单",res)
      this.list = res.data.result
    })

    // 最新音乐
    recommendSongAPI(this.newSongLimit).then(res => {
      // console.log('最新音乐',res)
      this.songs = res.data.result
    })

    //MV推荐
    recommendMVAPI().then(res => {
      // console.log('MV推荐',res)
      this.mvs = res.data.result
    })

  },

  //方法调用
  methods: {

    // 点击按钮，播放音乐
    PlayMusic(song) {
      // 先检查歌曲是否可用
      checkMusic(song.id)
        .then(res => {
          // 获取歌曲url
          getSongUrl(song.id).then(res => {
            this.$store.dispatch("saveSongUrl", res.data.data[0].url);
          });
          getEverySongDetail(song.id).then(res => {
            console.log('detail', res)
            // 更新播放状态
            this.$store.dispatch("changePlayState", true);
            //提交vuex保存当前歌曲详情
            this.$store.dispatch("saveSongDetail", res.data.songs[0]);
            // 提交vuex添加到播放列表
            this.$store.dispatch("addPlayinglist", res.data.songs[0]);
            // console.log('nowSongDetail',this.nowSongDetail)
          })
        })
        .catch(err => {
          console.log(err);
          this.$message({
            message: "暂时无法播放，换首试试",
            type: "warning",
            center: true,
          });
        });
    },

    PlayBanner(item) {
      if (item.targetId == 0) return;
      if (item.targetType == 1 || item.typeTitle == 300) {
        // 获取歌曲url
        getSongUrl(item.targetId).then(res => {
          this.$store.dispatch("saveSongUrl", res.data.data[0].url);
        }).catch(err => err);
        /* 根据歌曲id获取每首歌的信息*/
        getEverySongDetail(item.targetId).then(res => {
          // 提交vuex保存当前歌曲详情
          this.$store.dispatch("saveSongDetail", res.data.songs[0]);
          // 提交vuex添加到播放列表
          this.$store.dispatch("addPlayinglist", res.data.songs[0]);
        }).catch(err => err);
      } else if (item.targetType == 1000) {
				return ;
			} else if (item.targetType == 10) {
				return ;
			}
    },

    // 点击跳转到歌单详细页面
    toPlaylist(id) {
      // 跳转并携带数据即可
      this.$router.push(`/playlist?q=${id}`)
    },
    // 跳转到MV页面
    toMvDetail(id) {
      this.$router.push(`/mv?q=${id}`);
    },

  },


}
</script>

<style>
</style>