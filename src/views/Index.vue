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

    <div class="nav-sec">
      <!-- 采用一个透明的遮罩层进行点击事件从而达到隐藏 -->
      <transition name="el-fade-in-linear">
        <div v-show="navPhoneOpen" id="menu-mask" @click="hideNav()"></div>
      </transition>
      <NavPhone></NavPhone>
    </div>

    <div class="Lyric-wrap">
      <transition name="el-fade-in-linear">
		  	  <FloatLyric v-show="showFloatLyric" />
		  </transition>
    </div>

    <div class="main">
      <div class="container">
          <transition name="slide-fade">
            <!-- 设置路由出口 -->
            <!-- 给router-view加个唯一的key，来保证路由切换时都会重新渲染触发钩子了 -->
            <router-view :key="key" ></router-view>
          </transition>
        </div>
    </div>

  </div>
</template>

<script>
import discovery from "@/components/Discovery/Discovery.vue";
import FloatLyric from '@/components/Content/FloatLyric'
import NavPhone from '@/components/Content/NavPhone';
import { mapGetters, mapState } from "vuex";

export default {
  name: "Index",
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
      this.$store.dispatch('changeNavPhone' , false)
    }
  },
};
</script>

<style lang="less" scoped>
.index-contain{
    /* 弹性布局，把里面的盒子变成水平放置 */
    display: flex;
    height: 100%;
    padding-top: 50px;

    .nav{
      min-width: 80px;
      /* 高度铺满 */
      margin-top: 10px;
      display: flex;
      align-content: center;
      flex-direction: column;
      background-color: rgb(243, 244, 246);
      /* border-radius: 10px; */
      transition: .3s;
      overflow: hidden;

      &:hover{
        min-width: 210px;

        span {
          opacity: 1 !important;
        }
      }

      .nav-list{
          display: block;
          height: 8%;
          width: 85%;
          margin: 9px;
          position: relative;
          transition: .3s;
          color: #000;
          cursor: pointer;
          
        &:hover{
          background-color: rgb(209, 213, 219);
          color: #000;
        }

        i{
          font-size: 30px;
          position: absolute;
          margin: 7px 0 0 13px;
        }

        span{
          position: relative;
          top: 10px;
          left: 60px;
          font-size: 20px;
          /* 设置透明度为0 */
          opacity: 0;
          transition: .1s;
        }

      }
    }

    .nav-sec #menu-mask {
      position: fixed;
      z-index: 102;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.8);
    }

    .main{
      flex: 1;
      overflow-y: scroll;
      padding: 10px 20px;
      z-index: 1;
      margin-bottom: 70px;

      .container{
        min-width: 1280px;
        transition: all .8s cubic-bezier(.55, 0, .1, 1);
      }
    }

}

@media screen and (max-width : 500px) {
  .nav{
    display: none;
  }

  .index-contain .main .container{
    min-width: 0px;
  }
}

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