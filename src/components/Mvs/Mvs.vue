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

<style lang="less" scoped>
.mvs-container {
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 1100px;
  margin: 35px 100px;

  .filter-wrap .wrap-container>div{
    margin-bottom: 30px;
    vertical-align: baseline;
    /* 使单元格的基线，与该行中所有以基线对齐的其它单元格的基线对齐。  */
    display: flex;
    /* 弹性布局,横着放 */
    align-items: center;

    span {
      font-size: 14px;
      height: 100%;

      &.title {
        margin: 20px;
        color: gray;
        cursor: pointer;
        padding: 5px 20px;

        &.active {
          color: black;
          background-color: #fcf6f5;
          border-radius: 20px;
        }
      }
    }

    ul{
      display: flex;

      li:not(:last-child){
        border-right: 1px solid #f2f2f1;
      }
    }
  }

  .mvs .items{
    display: flex;
    /* 让items盒子里面的元素横着排,弹性布局 */
    justify-content: flex-start;
    /* 从行首起始位置开始排列 */
    flex-wrap: wrap;
    /* 让弹性盒元素在必要的时候拆行 */

    .item{
      width: 250px;
      /* 调整item黑子大小 */
      cursor: pointer;
      /* 鼠标经过盒子处变成一只手 */
      margin-right: 25px;
      /* 外边距调整 */
      margin-bottom: 30px;

      .img-wrap{
        width: 100%;
        position: relative;

        img {
          width: 100%;
          border-radius: 5px;
        }

        .iconplay{
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          /* 设为居中 */
          width: 40px;
          height: 40px;
          color: #dd6d60;
          font-size: 20px;
          /* 文字大小 */
          border-radius: 50%;
          /* 描边 */
          display: flex;
          align-items: center;
          justify-content: center;
          padding-left: 5px;
          /* 横轴纵轴居中 */
          background: rgba(255, 255, 255, 0.8);
          opacity: 0;
        }

        &:hover{
          .iconplay{
            opacity: 1;
          }
        }

        .num-wrap {
          position: absolute;
          color: white;
          top: 0;
          /* 最上边 */
          right: 0;
          /* 最右边 */
          display: flex;
          /* 弹性布局 */
          align-content: center;
          font-size: 15px;
          padding-right: 5px;
          padding-top: 2px;

          .icon-play {
            font-size: 12px;
            display: flex;
            align-items: center;
            margin-right: 5px;
          }
        }
      }

      .info-wrap{
        .name {
          font-size: 15px;
        }

        .singer {
          font-size: 14px;
          color: darkcyan;
        }
      }
    }
  }
}

@media screen and (max-width : 500px){
  .mvs-container{
    margin: 20px 0;
  }

  .mvs-container .filter-wrap{
    display: flex;
    justify-content: center;
  }

  .mvs-container .filter-wrap .wrap-container>div span.title{
    margin: 5px;
    padding: 3px 3px;
  }

  .mvs-container .mvs .items {
    justify-content: center;
  }

  .mvs-container .mvs .items .item{
    width: 130px;
  }

}

</style>