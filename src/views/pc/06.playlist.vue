<template>
  <div class="playlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <!-- 封面 -->
        <img v-lazy="playlist.coverImgUrl" alt="" />
      </div>
      <!-- 详细信息 -->
      <div class="info-wrap">
        <!-- 名字 -->
        <p class="title">{{ playlist.name }}</p>
        <div class="author-wrap">
          <!-- 头像 -->
          <img v-lazy="playlist.creator.avatarUrl" class="avatar" />
          <!-- 作者名字 -->
          <span class="name">{{ playlist.creator.nickname }}</span>
          <!-- 创建日期 -->
          <span class="time">{{ playlist.createTime | LocaleDateString }} 创建</span>
        </div>

        <!-- 播放框框 -->
        <div class="play-wrap">
          <span class="iconfont icon-circle-play"></span>
          <span class="text" @click="PlayAll">播放全部</span>
        </div>
        <!-- 标签处 -->
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <!-- 分类标签 -->
          <ul>
            <li v-for="(item, index) in playlist.tags" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
        <!-- 简介 -->
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <!-- 简介 -->
          <span class="desc">
            {{ playlist.description }}
          </span>
        </div>
      </div>
    </div>
    <!-- 歌曲列表部分，由activeIndex控制  -->
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲列表" name="1">
        <!-- 表格 -->
        <table class="el-table playlist-table">
          <!-- 表头 -->
          <thead>
            <th></th>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <!-- 表身体 -->
          <tbody>
            <!-- 表格中的每一行，tr表示一行 -->
            <tr class="el-table__row" v-for="(item, index) in playlist.tracks" :key="index" @dblclick="PlayMusic(item)">
              <!-- td代表HTML表格中的一个单元格。 -->
              <td>{{ index + 1 }}</td>
              <td>
                <!-- 歌曲封面 -->
                <div class="img-wrap">
                  <img v-lazy="item.al.picUrl" alt="" />
                  <span class="iconfont icon-play" @click="PlayMusic(item)"></span>
                </div>
              </td>
              <!-- 音乐标题 -->
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <!-- 歌名 -->
                    <span>{{ item.name }}</span>
                    <!-- 增加列表 -->
                    <el-tooltip class="item" effect="dark" content="添加到播放列表" :enterable="false" placement="bottom">
                      <span class="iconfont add-music icon-add-list" @click="AddMusic(item)"></span>
                    </el-tooltip>
                  </div>
                </div>
              </td>
              <!-- 歌手名称 -->
              <td>{{ item.ar[0].name }}</td>
              <!-- 专辑名称 -->
              <td>{{ item.al.name }}</td>
              <!-- 音乐时长 -->
              <td>{{ item.dt | formatDuration }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>

      <!-- 歌曲列表部分，由activeIndex控制  -->
      <el-tab-pane :label="
        '评论(' + (commentInfo.total + commentInfo.hotComments.length) + ')'
      " name="2">
        <!-- 热门评论 -->
        <div v-if="commentInfo.hotComments.length > 0" class="comment-wrap">
          <p class="title">
            热门评论<span class="number">{{
                commentInfo.hotComments.length
            }}</span>
          </p>
          <div class="comments-wrap">
            <div class="item" v-for="(item, index) in commentInfo.hotComments" :key="index">
              <!-- 热门评论用户头像 -->
              <div class="icon-wrap">
                <img v-lazy="item.user.avatarUrl" alt="" />
              </div>
              <!-- 评论内容 -->
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{ item.user.nickname }}：</span>
                  <span class="comment">{{ item.content }}</span>
                </div>
                <!-- 评论的评论，如果存在的话，将其弄出来 -->
                <div class="re-content" v-if="item.beReplied[0]">
                  <!-- 评论的评论的人名字 -->
                  <span class="name">
                    {{ item.beReplied[0].user.nickname }}：</span>
                  <!-- 评论的评论的人评论内容 -->
                  <span class="comment"> {{ item.beReplied[0].content }} </span>
                </div>
                <!-- 评论时间 -->
                <div class="date">
                  <span> {{ item.time | LocaleDateString }} </span>
                  <!-- 点赞数 -->
                  <span class="iconfont icon-zan float-right">
                    {{ item.likedCount }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 最新评论 -->
        <div v-if="commentInfo.comments.length > 0" class="comment-wrap">
          <p class="title">
            最新评论<span class="number">{{ commentInfo.total }}</span>
          </p>
          <!-- 评论 -->
          <div class="comments-wrap">
            <div class="item" v-for="(item, index) in commentInfo.comments" :key="index">
              <div class="icon-wrap">
                <img v-lazy="item.user.avatarUrl" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{ item.user.nickname }}：</span>
                  <span class="comment">{{ item.content }}</span>
                </div>
                <!-- 评论的评论 -->
                <div class="re-content" v-if="item.beReplied[0]">
                  <span class="name">{{ item.beReplied[0].user.nickname }}：</span>
                  <span class="comment">{{ item.beReplied[0].content }}</span>
                </div>
                <!-- 评论时间 -->
                <div class="date">{{ item.time | LocaleDateString }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 分页器 -->
        <el-pagination :hide-on-single-page="true" background @current-change="handleCurrentChange" :current-page="page"
          :page-sizes="[5, 10, 20, 30, 50]" :page-size="10" layout="total, sizes, prev, pager, next, jumper"
          :total="commentInfo.total">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// 导入 axios
import { playlistDetailAPI, commentsAPI } from '@/utils/api'
import {  getSongUrl, getEverySongDetail } from '@/utils/playmusic'
export default {
  name: "playlist",
  data() {
    return {
      // 歌曲、评论两个栏切换
      activeIndex: "1",
      // 总条数
      total: 0,
      // 页码
      page: 1,
      // 歌单详细数据
      // tracks 歌曲列表
      playlist: {
        creator: {
          avatarUrl: "",
        },
      },
      // 评论信息
      commentInfo: {
        // 普通评论
        comments: [],
        // 热门评论
        hotComments: [],
        // 评论总数
        total: 0,
      },
    };
  },
  //生命周期钩子 回调函数
  created() {
    // 获取歌单详情
    this.GetLists();
    // 获取评论信息
    this.GetComments();
  },
  // 调用方法
  methods: {

    // 点击按钮，播放音乐
    //每行歌曲双击播放
		PlayMusic(song) {
			getSongUrl(song.id).then(res => {
        if(res.data.data[0].url == null){
          	this.$message({
						message: "暂时没有版权播放，换首试试",
						type: "warning",
						center: true,
					});
          return ;
        }else{
            this.$store.dispatch("saveSongUrl", res.data.data[0].url);
            getEverySongDetail(song.id).then(res =>{
            console.log('detail',res)
            // 更新播放状态
			      this.$store.dispatch("changePlayState", true);
			      //提交vuex保存当前歌曲详情
			      this.$store.dispatch("saveSongDetail", res.data.songs[0]);
			      // 提交vuex添加到播放列表
			      this.$store.dispatch("addPlayinglist", res.data.songs[0]);
            // console.log('nowSongDetail',this.nowSongDetail)
          })
        }
			}).catch(err => {
          console.log(err);
					this.$message({
						message: "暂时没有版权播放，换首试试",
						type: "warning",
						center: true,
					});
				});
		},

    // 点击添加按钮
    AddMusic(song) {
      // 提交vuex添加到播放列表
      this.$store.dispatch("addPlayinglist", song);
      this.$message({
        message: "已添加到播放列表",
        type: "success",
        center: true,
      });
    },

    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      // 保存页码
      this.page = val;
      // 重新获取数据
      this.GetComments()
    },

    // 获取歌单详情
    async GetLists() {
      let params = {
        id: this.$route.query.q,
        limit: 10,
        // 根据页码计算
        offset: (this.page - 1) * 10,
      }
      playlistDetailAPI(params).then((res) => {
        // console.log("歌单详情", res);
        this.playlist = res.data.playlist;
        // console.log('这个歌单',res)
      });
    },
    // 增加歌单全部歌曲到播放列表 
    AddAplayer() {

    },

    // 播放全部
    PlayAll() {

    },

    // 获取歌单评论
    async GetComments() {
      let params = {
        // id 用传入的id
        id: this.$route.query.q,
        // 评论一页获取个数
        limit: 10,
        // 分页
        offset: (this.page - 1) * 10,
      }
      // 传入params和type = 'playlist'获取歌单评论
      commentsAPI(params, 'playlist').then((res) => {
        // console.log("评论", res);
        // 评论页大于1的时候，重新赋值新的评论
        if (this.page > 1) {
          // 赋值评论信息
          this.commentInfo.comments = res.data.comments;
        } else {
          // 新建一个newData保存评论喝个数
          let newData = {
            // 评论数组赋值
            comments: res.data.comments,
            // 这是普通评论的总个数
            total: res.data.total,
          };
          // 热门评论
          newData.hotComments = res.data.hotComments || res.data.topComments;
          // 评论信息赋值
          this.commentInfo = newData;
        }
      });
    },


  },
};
</script>

<style>
</style>