<template>
  <div class="index-contain">
    <!-- 返回顶部按钮<target要指向父容器，这里有滚动条的就只有main容器 -->
		<el-backtop target=".index-contain .main" :right="40" :bottom="100" id="playBackTop"></el-backtop>
    <div class="nav">
      <li class="nav-list">
        <i class="el-icon-headset"></i>
        <router-link to="/discovery">
          <span class="nav-router">发现音乐</span>
        </router-link>
      </li>
      <li class="nav-list">
        <i class="el-icon-trophy"></i>
        <router-link to="/playlists"> <span class="nav-router">推荐歌单</span> </router-link>
      </li>
      <li class="nav-list">
        <i class="el-icon-star-off"></i>
        <router-link to="/songs"> <span class="nav-router">最新音乐</span> </router-link>
      </li>
      <li class="nav-list">
        <i class="el-icon-film"></i>
        <router-link to="/mvs"> <span class="nav-router">最新MV</span> </router-link>
      </li>
      <li class="nav-list">
        <i class="el-icon-s-data"></i>
        <router-link to="/leaderboard"> <span class="nav-router">排行榜</span> </router-link>
      </li>
      <li class="nav-list">
        <i class="el-icon-mic"></i>
        <router-link to="/artists"> <span class="nav-router">歌手</span> </router-link>
      </li>
    </div>

    <div class="nav-sec" @click.stop="">
      <!-- 采用一个透明的遮罩层进行点击事件从而达到隐藏 -->
      <div id="menu-mask" :style="navPhoneOpen ? 'display: block; animation: 0.5s ease 0s 1 normal none running to_show;' : ''" @click="hideNav()"></div>
      <NavPhone></NavPhone>
    </div>

    <div class="Lyric-wrap">
      <transition name="el-fade-in-linear">
		  	  <FloatLyric v-show="showFloatLyric" />
		  </transition>
    </div>

    <div class="main">
      <div class="container">
        <!-- 设置路由出口 -->
        <!-- 给router-view加个唯一的key，来保证路由切换时都会重新渲染触发钩子了 -->
        <router-view :key="key"></router-view>
      </div>
    </div>

  </div>
</template>

<script>
import discovery from "@/views/pc/01.discovery.vue";
import FloatLyric from '@/components/content/FloatLyric'
import NavPhone from '@/components/content/NavPhone';
import { mapGetters, mapState } from "vuex";

export default {
  name: "index",
  components: {
    discovery,
    FloatLyric,
    NavPhone,
},

  computed: {
    // 通过vuex获取
    ...mapGetters(["nowSongDetail","isShowSongDetail","showFloatLyric"]),
    ...mapState(['navPhoneOpen']),
    
    // 给router-view加个唯一的key，来保证路由切换时都会重新渲染触发钩子了
    key(){
      return this.$route.name?this.$route.name+ +new Date():this.$route+ +new Date()
    }
  },

  data() {
    return {
    // 下载的音乐的信息
			downloadMusicInfo: {
				name: "",
				url: "",
			},
    };
  },

  // Bus的接收端，mounted()方法和data()和methods是同级别的，在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作

  methods: {
    hideNav(){
      this,this.$store.dispatch('changeNavPhone' , false)
    }
  },
};
</script>

<style>
.icon-shanchu:before {
  color: #f56c6c;
  position: relative;
  right: 5px;
}
.clearMusic {
  position: absolute;
  right: 100px;
  bottom: 27px;
  width: 20px;
  font-size: 18px;
  height: 20px;
}
</style>