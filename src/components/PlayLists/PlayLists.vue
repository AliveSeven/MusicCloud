<template>
  <div class="playlists-container">
    <!-- 最上面设一个精品歌单推荐的卡片 -->
    <div class="top-card">
      <div class="icon-wrap">
        <!-- 封面 -->
        <img v-lazy="topList.coverImgUrl" alt=""  />
      </div>
      <!-- 内容，文字秒速 -->
      <div class="content-wrap">
        <div class="tag">精品歌单</div>
        <!-- 歌单标题 -->
        <div class="title">
          {{ topList.name }}
        </div>
        <!-- 介绍，描述 -->
        <div class="info">
          {{ topList.description }}
        </div>
      </div>
      <!-- 歌单卡片背景 -->
      <div>
        <img v-lazy="topList.coverImgUrl" alt="" class="bg" />
        <div class="bg-mask"></div>
      </div>
    </div>

    <div class="tab-container">
      <!-- tab栏顶部 -->
      <div class="tab-bar">
        <span
          v-for="(item, index) in tags"
          :key="index"
          class="item"
          :class="['item', { active: tag == item }]"
          @click="tag = item"
          >{{ item }}</span
        >
      </div>

      <!-- tab的内容区域 -->
      <div class="tab-content">
        <div class="items">
          <div class="item" v-for="(item, index) in list" :key="index">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{ item.playCount | ellipsisPlayVolume }}</span>
              </div>
              <img v-lazy="item.coverImgUrl" alt="" @click="toPlaylist(item.id)" />
              <span class="iconfont icon-play" @click="toPlaylist(item.id)"></span>
            </div>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </div>

      <!-- 分页器
      total 总条数
      current-page 当前页
      page-size 每页多少条数据
      current-change 页码改变事件
     -->
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
        :page-size="10"
        :pager-count="5"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { highQualityAPI,songListAPI} from '@/utils/api'
export default {
  data() {
    return {
      //总条数
      total: 0,
      //页码
      page: 1,
      // 歌单的标签，有[全部、欧美、华语、流行、说唱...]
      tag: "全部",
      // 顶部的推荐歌单
      topList: {},
      //歌单列表
      list: [],
      //推荐标签
      tags: [
        "全部",
        "欧美",
        "华语",
        "流行",
        "说唱",
        "摇滚",
        "民谣",
        "电子",
        "轻音乐",
        "影视原声",
        "ACG",
        "怀旧",
        "治愈",
        "旅行",
      ],
    };
  },
  //侦听
  watch: {
    //观察tag的值，当tag的值改变的时候就会被调用
    tag() {
      // 顶部的 精品歌单
      this.topData();
      //观察tag
      // console.log(this.tag);
      //tab内容
      this.listData();
      //修改 page
      this.page = 1;
    },
  },

  //调用方法
  created() {
    //顶部的精品歌单
    this.topData();
    //tab内容
    this.listData();
  },

  methods: {
    // 抽取的方法1 顶部的数据
    async topData() {
      highQualityAPI({limit: 1,cat: this.tag}).then((res) => {
          // console.log('精品歌单',res);
          this.topList = res.data.playlists[0];
        });
    },
    // 抽取的方法2 获取歌单数据
    listData() {
      let params = {
                  //限制获取十个数据
                  limit: 10,
                  // 起始的值 （页码-1）*每页多少条数据
                  offset: (this.page - 1) * 10,
                  // 分类数据，歌单的标签
                  cat: this.tag,
                }

      songListAPI(params).then((res) => {
          // console.log(res);
          // 保存总条数
          this.total = res.data.total;
          // 保存数据
          this.list = res.data.playlists;
        });
    },

    //页码改变事件
    handleCurrentChange(val) {
      // console.log(val)
      // console.log(`当前页: ${val}`)
      // 保存页码
      this.page = val;
      // 重新获取数据
      this.listData();
    },

    // 点击跳转到歌单详细页面
    toPlaylist(id) {
      // 跳转并携带数据即可
      this.$router.push(`/playlist?q=${id}`);
    },
  },
};
</script>

<style lang="less" scoped>
/* 调整最外边的盒子的长宽，外边距 */
.playlists-container {
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 1100px;
    margin: 35px 100px;

    .top-card {
      padding: 20px;
      /* 固定内边距20px */
      height: 200px;
      /* 固定盒子高度 */
      display: flex;
      /* 垂直变水平，弹性布局 */
      position: relative;
      /* 设置相对布局， */
      overflow: hidden;
      /* 超过盒子的部分隐藏 */
      border-radius: 5px;

      .icon-wrap {
        margin-right: 20px;
        z-index: 1;

        img {
          width: 160px;
          height: 160px;
        }
      }

      .content-wrap {
        z-index: 1;

        .tag {
          color: #dfac67;
          border: 1px solid #dfac67;
          width: 100px;
          height: 30px;
          text-align: center;
          border-radius: 5px;
          font-size: 16px;
          line-height: 30px;
          cursor: pointer;
        }

        .title {
          color: white;
          padding-top: 10px;
        }

        .info {
          color: rgb(210, 212, 216);
          /* 设置颜色 */
          font-size: 14px;
          padding-top: 5px;
          overflow: hidden;
          /* 超过盒子部分隐藏 */
          text-overflow: ellipsis;
          /* 文字超过部分用省略号表示 */
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 5;
          /* 最多5行 */
        }
      }

      .bg {
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 0;
        filter: blur(20px);
        /*设置高斯模糊，括号里面的值越大越模糊*/
      }

      .bg-mask {
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
      }

    }

    .tab-container {
      padding-top: 30px;

      .tab-bar {
        display: flex;
        justify-content: flex-end;
        /* 从行尾位置开始排列 */

        .item {
          font-size: 15px;
          color: gray;
          margin-right: 20px;
          cursor: pointer;
          text-align: center;

          &.active {
            color: black;
          }
        }
      }

      /* tab内容上外边距 */
      .tab-content {
        margin-top: 20px;

        .items {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          /* 让弹性盒元素在必要的时候拆行 */

          .item {
            width: 200px;
            margin: 10px;
            position: relative;
            overflow: hidden;
            /* 超过部分隐藏 */
            cursor: pointer;

            img {
              width: 200px;
              height: 200px;
              border-radius: 5px;
            }

            .num-wrap {
              position: absolute;
              top: 0;
              left: 0;
              font-size: 14px;
              color: white;
              line-height: 30px;
              /* 行间距30px */
              background: rgba(0, 0, 0, 0.5);
              height: 30px;
              width: 100%;
              padding-left: 5px;
              top: -30px;
              overflow: hidden;
            }

            &:hover{
              .num-wrap{
                top: 0;
              }
            }

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

            .img-wrap{
              position: relative;

              &:hover{
                .icon-play{
                  opacity: 1;
                }
              }
            }

            .name{
              overflow: hidden;
              text-overflow: ellipsis; /* 超过部分省略 */
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2; /* 最多两行 */
              font-size: 14px;
            }
          }
        }
      }
    }
}

@media screen and (max-width : 500px) {
    .playlists-container{
        margin: 20px 0;
    }

    .playlists-container .top-card .content-wrap .tag{
        font-size: 14px;
    }
    
    .playlists-container .top-card .content-wrap .title{
        font-size: 8px;
    }

    .playlists-container .top-card .content-wrap .info{
        font-size : 6px;
    }

    .playlists-container .tab-container .tab-bar .item{
        font-size: 10px;
        margin-right: 10px;
        text-align: center;
    }

    .playlists-container .tab-container .tab-content .items .item{
        width: 110px;
        margin: 10px;
    }

    .playlists-container .tab-container .tab-content .items .item img{
        width: 100%;
        height: 110px;
    }

    /* 设置圆圈 */
    .playlists-container .tab-container .tab-content .items .item .img-wrap .icon-play {
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

    .playlists-container .tab-container .tab-content .items .item .num-wrap{
        font-size: 6px;
    }

    .playlists-container .tab-container .tab-content .items .item .name{
        font-size: 10px;
    }
}

@media screen and (max-width : 450px){
    .playlists-container .tab-container .tab-content .items .item{
        width: 90px;
        margin: 10px;
    }

    .playlists-container .tab-container .tab-content .items .item img{
        width: 100%;
        height: 90px;
    }

  }
  
@media screen and (max-width : 360px){
  /* 歌单图片大小调整 */
  .playlists-container .tab-container .tab-content .items .item{
    width: 120px;
    margin: 10px;
    position: relative;
    overflow: hidden;
  }

  .playlists-container .tab-container .tab-content .items .item img{
    width: 100%;
    height: 120px;
    border-radius: 5px;
  }
}
</style>