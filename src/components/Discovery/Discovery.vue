<template>
  <div class="discovery-container">
    <!-- 电脑端的轮播图 -->
    <div class="banner-pc">
      <!-- 轮播图，宽度平行于下面组件 -->
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="(item, index) in banners" :key="index">
          <!-- 使用懒加载,动态改变图片链接 -->
          <img v-lazy="item.imageUrl" alt="" @click="PlayBanner(item)" />
          <h3 class="medium">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 移动端的轮播图 -->
    <div class="banner-phone">
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="(item, index) in banners" :key="index">
          <!-- 使用懒加载,动态改变图片链接 -->
          <img v-lazy="item.imageUrl" alt="" @click="PlayBanner(item)" />
          <h3 class="medium">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="title">推荐歌单</h3>
      <!-- 图片项 -->
      <div class="items">
        <div class="item" v-for="(item, index) in list" :key="index">
          <div class="img-wrap">
            <!-- 歌单描述 -->
            <div class="desc-wrap">
              <span class="desc">播放量：{{ item.playCount | ellipsisPlayVolume }}</span>
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
        <div class="item" v-for="(item, index) in songs" :key="index" @dblclick="PlayMusic(item)">
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
import { bannerAPI, recommendSonglistAPI, recommendSongAPI, recommendMVAPI, checkMusicAPI, getSongUrlAPI, songInfoAPI } from '@/utils/api';

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
      checkMusicAPI(song.id)
        .then(res => {
          // 获取歌曲url
          getSongUrlAPI({id : song.id}).then(res => {
            this.$store.dispatch("saveSongUrl", res.data.data[0].url);
          });
          const params = { ids:song.id }
          songInfoAPI(params).then(res => {
            // console.log('detail', res)
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
        getSongUrlAPI({id: item.targetId}).then(res => {
          this.$store.dispatch("saveSongUrl", res.data.data[0].url);
        }).catch(err => err);
        /* 根据歌曲id获取每首歌的信息*/
        const params = { ids : item.targetId }
        songInfoAPI(params).then(res => {
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

<style lang="less" scoped>
.discovery-container {
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 1100px;
    margin: 35px 100px;

    .banner-phone{
      display: none;
    }

    /* 设置轮播框高度 */
    .el-carousel__container {
        height: 230px;
    }

    /* 轮播框里面的图片占满整个框 */
    .el-carousel__item img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }

    .title {
      font-weight: normal;
      margin-bottom: 20px;
      padding-left: 8px;
    }

    /* 推荐歌单布局↓ */
    .recommend {
      margin-bottom: 40px;

      /* 设置歌单集，指定 flex元素多行显示。允许换行， */
      .items {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        /* 单个歌单设置，overflow 定义当一个元素的内容太大而无法适应，hidden设为隐藏太大的部分 */
        .item {
          width: 200px;
          margin: 10px;
          position: relative;
          overflow: hidden;

          /* 歌单图片设置，宽和高设置一下 */
          img {
            width: 200px;
            height: 200px;
            border-radius: 5px;
          }

          /* 设置那个'热门推荐' ...*/
          .desc-wrap {
            position: absolute;
            width: 100%;
            height: 30px;
            left: 0;
            font-size: 16px;
            color: white;
            background: rgba(0, 0, 0, 0.5);
            max-height: 50px; 
            padding: 5px;
            overflow: hidden; /* 超过盒子部分隐藏 */
            text-overflow: ellipsis;  /* 省略号 */
            display: -webkit-box;
            -webkit-box-orient: vertical; /*  */
            -webkit-line-clamp: 2;  /*  */
            top: -30px;

            span{
              font-size: 14px;
            }
          }

          &:hover{
            .desc-wrap{
              top: 0;
            }
          }

          .img-wrap{
            position: relative;
            cursor: pointer;

            .icon-play{
              position: absolute;  /* 绝对定位，定死 */
              top: 40%;
              right: 40%;
              width: 40px;
              height: 40px;
              color: #dd6d60;
              font-size: 20px;
              border-radius: 50%;
              display: flex; /* 弹性布局 */
              align-items: center;   /* 侧轴居中，默认垂直方向 */
              justify-content: center; /* 主轴居中，默认水平方向 */
              padding-left: 5px;
              background: rgba(255, 255, 255, 0.8);
              opacity: 0; /* 透明度为0 */ 
            }

            &:hover{
              .icon-play{
                opacity: 1;
              }
            }
          }

          .name{
            overflow: hidden;   /*超过的部分隐藏*/
            text-overflow: ellipsis; /* ellipsis设置超过的部分为省略号*/
            display: -webkit-box;        /*  */
            -webkit-box-orient: vertical;  /* 从顶部向底部垂直布置子元素 */
            -webkit-line-clamp: 1;   /* 设为最多一行 */
            font-size: 14px;
          }
        }
      }
    }

    /* 最新音乐的布局↓ */
    .news{
      margin-bottom: 40px;

      .items{
        height: 500px;
        width: 75%;
        display: flex; /* 弹性布局 */
        flex-direction: column; /* 向下排  */
        flex-wrap: wrap; /* 规定灵活的项目在必要的时候拆行或拆列。 */
        padding-left: 15px; /* 盒子左边加15px */

        .item {
          height: 100px; /* 设定盒子高度 */
          width: 45%; /* 设定盒子宽度 */
          display: flex;
          align-items: center;
          cursor: pointer; /* 变成一只手 */

          &:hover{
            background-color: #f5f5f5;
          }

          .img-wrap{
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center; /* 主轴居中，默认水平居中 */

            img{
              width: 80px;
              height: 80px;
            }

            .iconfont{
              position: absolute; 
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%); /* 实现水平垂直居中 */
              width: 30px;
              height: 30px;
              color: #dd6d60;
              text-align: center;
              line-height: 30px;
              border-radius: 50%;
              font-size: 14px;
              padding-left: 2px;
              background: rgba(255, 255, 255, 0.8);
              opacity: 0; /* 不透明度为0 */

              &::before{
                transform: translateX(3px);
              }
            }

            &:hover{
              .iconfont{
                opacity: 1; 
              }
            }
          }

          .song-wrap{
            display: flex;
            flex-direction: column; /* 歌名和歌手名向下排  */
            justify-content: space-around; /* 均匀排序每个元素，每个元素分配相同的空间，在弹性盒对象的 <div> 元素中的各项周围留有空白 */
            height: 100%;
            padding: 10px;
            font-size: 16px;

            .song-name{
              overflow: hidden;   /*超过的部分隐藏*/
              text-overflow: ellipsis; /* ellipsis设置超过的部分为省略号*/
              display: -webkit-box;        /*  */
              -webkit-box-orient: vertical;  /* 从顶部向底部垂直布置子元素 */
              -webkit-line-clamp: 1;   /* 设为最多一行 */
            }

            .singer{
              font-size: 14px;
              color: darkcyan;
              overflow: hidden;   /*超过的部分隐藏*/
              text-overflow: ellipsis; /* ellipsis设置超过的部分为省略号*/
              display: -webkit-box;        /*  */
              -webkit-line-clamp: 1;   /* 设为最多一行 */
              -webkit-box-orient: vertical;  /* 从顶部向底部垂直布置子元素 */
            }
          }
        }
      }
    }

    .mvs{
      padding-bottom: 80px;

      .items{
        display: flex;
        flex-wrap: wrap;
        /* 均匀排序每个元素，每个元素分配相同的空间，在弹性盒对象的 <div> 元素中的各项周围留有空白 */
        justify-content: space-around;

        .item{
          width: 250px;
          height: 250px;
          cursor: pointer;
          margin-right: 25px;

          .img-wrap{
            width: 250px;
            height: 180px;
            position: relative;

            img{
              width: 100%;
              height: 100%;
              border-radius: 5px;
              box-shadow: 0 0 20px 0px rgba(0, 0, 0, .3);
            }

            .icon1{
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 40px;
              height: 40px;
              color: #ee0000;
              font-size: 20px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              padding-left: 4px;
              padding-bottom: 1px;
              background: rgba(255, 255, 255, 0.8);
              opacity: 0;
            }

            &:hover{
              .icon1{
                opacity: 1;
              }
            }

            .num-wrap {
              position: absolute;
              color: white;
              top: 0;  /* 设置在最顶部 */
              right: 0;  /* 设置在最左边 */
              display: flex;
              align-content: center;
              font-size: 15px;
              padding-right: 5px;
              padding-top: 2px;

              .icon2{
                padding-top: 4px;
                margin-right: 5px;
              }

              .num{
                margin-top: 2px;
              }
            }


          }

          .info-wrap{
            .name{
              font-size: 15px;
              margin: 5px auto;
            }

            .singer{
              font-size: 14px;
              /* color: #c5c5c5; */
              color: darkcyan;
            }
          }
        }
      }
    }
}

/* 移动端布局 */
@media screen and (max-width : 500px) {
  .discovery-container{
    margin: 20px 0 0 0;
  }

  /* 小标题居中 */
  .discovery-container .title{
    text-align: center;
    margin-bottom: 10px;
  }

  /* 歌单图片大小调整 */
  .discovery-container .recommend .items .item {
    width: 110px;
    margin: 10px;
    position: relative;
    overflow: hidden;
  }

  /* 歌单图片大小调整 */
  .discovery-container .recommend .items .item img {
    width: 100%;
    height: 110px;
    border-radius: 5px;
  }

  /* 歌单描述变为上限两行 */
  .discovery-container .recommend .items .item .name{
    /* height: 40px; */
    -webkit-line-clamp: 2;
    font-size: 10px;
  }

  /* 播放量UI调整 */
  .discovery-container .recommend .items .item .desc-wrap span{
    font-size: 4px;
    top: 2px;
    position: absolute;
  }

  /* 最新音乐UI调整 */
  .discovery-container .news .items{
    height: 100%;
    width: 100%;
  }

  /* 最新音乐UI调整 */
  .discovery-container .news .items .item{
    width: 100%;
  }

  /* mv部分UI调整 */
  .discovery-container .mvs .items .item{
    width: 160px;
    height: 200px;
    margin: 0;
  }

  /* 轮播图部分切换为移动端 */
  .discovery-container .banner-phone{
    display: block;
  }

  /* PC端轮播图不展示 */
  .discovery-container .banner-pc{
    display: none;
  }

  /* 轮播图高度调整 */
  .el-carousel__container {
    height: 150px;
  }

  /* MV图片大小调整 */
  .discovery-container .mvs .items .item .img-wrap{
    width: 150px;
    height: 120px;
  }

  /* 播放小图标UI调整 */
  .discovery-container .recommend .items .item .img-wrap .icon-play {
    position: absolute; 
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* 实现水平垂直居中 */
    width: 30px;
    height: 30px;
    color: #dd6d60;
    text-align: center;
    line-height: 30px;
    border-radius: 50%;
    font-size: 14px;
    background: rgba(255, 255, 255, 0.8);
    opacity: 0; /* 不透明度为0 */
  } 

  /* 播放量数字调整 */
  .discovery-container .recommend .items .item .desc-wrap {
    position: absolute;
    width: 100%;
    height: 20px;
    left: 0;
    font-size: 16px;
    color: white;
    background: rgba(0, 0, 0, 0.5);
    max-height: 50px; 
    padding: 5px;
    overflow: hidden; /* 超过盒子部分隐藏 */
    text-overflow: ellipsis;  /* 省略号 */
    display: -webkit-box;
    -webkit-box-orient: vertical; /*  */
    -webkit-line-clamp: 1;  /*  */
    top: -30px;
  }

  .discovery-container .mvs .items .item .info-wrap .name{
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
  }

  .discovery-container .mvs .items .item .info-wrap .singer{
    font-size: 12px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

}


@media screen and (max-width : 450px){
  /* 歌单图片大小调整 */
  .discovery-container .recommend .items .item {
    width: 90px;
    margin: 10px;
    position: relative;
    overflow: hidden;
  }

  .discovery-container .recommend .items .item img {
    width: 100%;
    height: 90px;
    border-radius: 5px;
  }
}

@media screen and (max-width : 360px){
  /* 歌单图片大小调整 */
  .discovery-container .recommend .items .item {
    width: 120px;
    margin: 10px;
    position: relative;
    overflow: hidden;
  }

  .discovery-container .recommend .items .item img {
    width: 100%;
    height: 120px;
    border-radius: 5px;
  }
}

</style>