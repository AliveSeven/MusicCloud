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
                <span class="num">{{ item.playCount }}</span>
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
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
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

<style>
</style>