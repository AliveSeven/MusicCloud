<template>
  <div class="mvs-container">
    <div class="filter-wrap">
      <div class="wrap-container">
          <!-- 地区包 -->
        <div class="section-wrap">
          <!-- 分类切换地区 -->
          <span class="section-type">地区:</span>
          <!-- 标签包 -->
          <ul class="tabs-wrap">
            <!-- 标签 -->
            <li class="tab">
              <span
                class="title"
                :class="{ active: area == '全部' }"
                @click="area = '全部'"
                >全部</span
              >
            </li>

            <li class="tab">
              <span
                class="title"
                :class="{ active: area == '内地' }"
                @click="area = '内地'"
                >内地</span
              >
            </li>

            <li class="tab">
              <span
                class="title"
                :class="{ active: area == '港台' }"
                @click="area = '港台'"
                >港台</span
              >
            </li>

            <li class="tab">
              <span
                class="title"
                :class="{ active: area == '欧美' }"
                @click="area = '欧美'"
                >欧美</span
              >
            </li>

            <li class="tab">
              <span
                class="title"
                :class="{ active: area == '日本' }"
                @click="area = '日本'"
                >日本</span
              >
            </li>

            <li class="tab">
              <span
                class="title"
                :class="{ active: area == '韩国' }"
                @click="area = '韩国'"
                >韩国</span
              >
            </li>
          </ul>
        </div>

        <!-- 类型包 -->
        <div class="type-wrap">
          <span class="type-type">类型:</span>
          <ul class="tabs-wrap">
            <li class="tab">
              <span
                class="title"
                :class="{ active: type == '全部' }"
                @click="type = '全部'"
              >
                全部
              </span>
            </li>
            <li class="tab">
              <span
                class="title"
                :class="{ active: type == '官方版' }"
                @click="type = '官方版'"
              >
                官方版
              </span>
            </li>
            <li class="tab">
              <span
                class="title"
                :class="{ active: type == '原声' }"
                @click="type = '原声'"
              >
                原声
              </span>
            </li>
            <li class="tab">
              <span
                class="title"
                :class="{ active: type == '现场版' }"
                @click="type = '现场版'"
              >
                现场版
              </span>
            </li>
            <li class="tab">
              <span
                class="title"
                :class="{ active: type == '网易出品' }"
                @click="type = '网易出品'"
              >
                网易出品
              </span>
            </li>
          </ul>
        </div>

        <!-- 排序包 -->
        <div class="order-wrap">
          <span class="order-type">排序:</span>
          <ul class="tabs-wrap">
            <li class="tab">
              <span
                class="title"
                :class="{ active: order == '上升最快' }"
                @click="order = '上升最快'"
              >
                上升最快
              </span>
            </li>
            <li class="tab">
              <span
                class="title"
                :class="{ active: order == '最热' }"
                @click="order = '最热'"
              >
                最热
              </span>
            </li>
            <li class="tab">
              <span
                class="title"
                :class="{ active: order == '最新' }"
                @click="order = '最新'"
              >
                最新
              </span>
            </li>
          </ul>
        </div>
      </div>

    </div>
    <!-- mv容器 -->
    <!-- 推荐MV -->
    <div class="mvs">
      <div class="items">
        <div
          class="item"
          v-for="(item, index) in list"
          :key="index"
          @click="toMvDetail(item.id)"
        >
          <div class="img-wrap">
            <img v-lazy="item.cover" alt="" />
            <div class="iconfont icon-play iconplay"></div>
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <!-- 处理播放次数,超过100000的话替换一下四个零 -->
              <div class="num">{{ item.playCount | ellipsisPlayVolume }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.artistName }}</div>
          </div>
        </div>
      </div>

      <!-- 分页器 -->
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
        :page-size="5"
        :pager-count="5"
        :limit="limit"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { mvListAPI } from "@/utils/api";
export default {
  name: "mvs",
  data() {
    return {
      //总条数
      total: 20,
      //页码
      page: 1,
      //页容量
      limit: 8,
      //地区
      area: "全部",
      //类型
      type: "全部",
      //排序
      order: "上升最快",
      //查询结果
      list: [],
    };
  },

  //侦听器
  watch: {
    area() {
      //返回第一页
      this.page = 1;
      // 获取数据
      this.getList();
    },

    type() {
      //返回第一页
      this.page = 1;
      // 获取数据
      this.getList();
    },

    order() {
      //返回第一页
      this.page = 1;
      // 获取数据
      this.getList();
    },
  },

  created() {
    //网页打开调用一次方法
    this.getList();
  },

  methods: {
    // 跳转到MV页面
    toMvDetail(id) {
      this.$router.push(`/mv?q=${id}`);
    },
    // 获取MV数据
    getList() {
      let params = {
        //传入当前地区 类型 排序
        area: this.area,
        type: this.type,
        order: this.order,
        //数量
        limit: this.limit,
        // 偏移值 分页 (页码-1)*数量
        offset: (this.page - 1) * this.limit,
      };
      mvListAPI(params).then((res) => {
        // console.log(res);
        this.list = res.data.data;
        // 保存总条数
        // 接口问题 有count 就赋值
        if (res.data.count) {
          this.total = res.data.count;
        }
      });
    },

    handleCurrentChange(val) {
      // console.log(val)
      // console.log(`当前页: ${val}`)
      this.page = val;
      this.getList();
    },
  },
};
</script>

<style>
</style>