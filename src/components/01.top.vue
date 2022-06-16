<template>
  <div class="header">
    <!-- <script src="https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script> -->
    <!-- 标题 -->
    <div class="header-title">
      <h2 @click="gohome">AliveSeven自制音乐播放器</h2>
    </div>
    <!-- 返回和前进的按钮 -->
    <div class="btns">
      <!-- 点击后退 -->
      <i class="el-icon-arrow-left" @click="go(-1)"></i>
      <!-- 点击前进 -->
      <i class="el-icon-arrow-right" @click="go(1)"></i>
      <!-- 点击改变背景 -->
      <i class="el-icon-picture-outline" @click="changeBg()"></i>
    </div>
    <!-- 输入搜索框 -->
    <div class="input-box">
      <el-input
        v-model="searchValue"
        :placeholder="placeholder"
        prefix-icon="el-icon-search"
        @keyup.enter.native="search"
        @focus="getSearchData"
        @blur="outblur"
      >
      </el-input>
    </div>
    <div class="sliderBar">
      <el-slider v-model="sliderValue" :format-tooltip="formatTooltip" ></el-slider>
    </div>

    <div class="usrInfo-wrap">
      <div class="avater">
        <img :src="usrInfo.avater" @click="toLogin()">
      </div>
      <div class="usr-wrap">
        <span>{{ usrInfo.usrname }}</span>
        <i class="el-icon-caret-bottom"></i>
      </div>
    </div>

    <!-- 热搜框，聚焦于搜索框的时候弹出来 -->
    <!-- @mousedown.event.preventDefault();，可以防止触发blur函数，即可以不让热搜榜或者是搜索建议榜消失 -->
    <transition name="el-fade-in-linear">
      <div class="search-hot" v-show="showHot" ref="hot">
        <!-- 在 element-UI 中有一个隐藏组件 <el-scrollbar>，这个组件的滚动条还是很不错的，比原生的滚动条好看，而且还有一些效果（鼠标移入时显示，移出时隐藏）。 -->
        <el-scrollbar style="height: 100%">
          <div class="history" v-if="history.length">
            <span
              class="hot-title"
              style="display: inline-block; margin-right: 5px"
              >搜索历史</span
            >
            <span
              class="iconfont icon-lajitong"
              style="cursor: pointer"
              title="清空搜索历史"
              @mousedown="deleteHistory(0, true)"
            ></span>
            <div class="history-wrap">
              <div
                class="history-item"
                v-for="(item, index) in history"
                :key="index"
                @mousedown="toHot(item)"
              >
                {{ item }}
                <span
                  class="delete-btn"
                  title="删除"
                  @mousedown.stop="deleteHistory(index, false)"
                  >×</span
                >
              </div>
            </div>
          </div>
  
          <div class="hot-title">热搜榜</div>
          <ul>
            <li
              class="hot-item"
              v-for="(item, index) in hotData"
              :key="index"
              @mousedown="toHot(item.searchWord)"
            >
              <!-- 歌曲序列 -->
              <div class="hot-index">{{ index + 1 }}</div>
              <!-- 热搜信息 -->
              <div class="hot-info">
                <div class="hot-top">
                  <!-- 热搜数据的名字 -->
                  <div class="hot-name">{{ item.searchWord }}</div>
                  <div class="hot-score">{{ item.score }}</div>
                  <img
                    class="hot-icon"
                    v-show="item.iconUrl && item.iconType != 5"
                    :src="item.iconUrl"
                  />
                </div>
                <div class="hot-content">{{ item.content }}</div>
              </div>
            </li>
          </ul>
        </el-scrollbar>
      </div>
    </transition>

    <transition name="el-fade-in-linear">
      <div class="search-hot" v-show="isAdvice" >
        <el-scrollbar style="height: 100%">
          <ul>
            <li
              class="hot-item"
              v-for="(item, index) in suggestionList.songs"
              :key="index"
              @mousedown="toHot(item.name)"
            >
              <!-- 热搜信息 -->
              <div class="hot-info">
                <div class="hot-top">
                  <!-- 热搜数据的名字 -->
                  <div class="hot-name">{{ item.name }}</div>
                </div>
              </div>
            </li>
          </ul>
        </el-scrollbar>
      </div>
    </transition>
  </div>
</template>

<style>
</style>

<script>
//导入 axios
import axios from "axios";
import { searchHintAPI,searchSuggestAPI,hotSearchAPI } from '@/utils/api'
import { getBgAPI } from '@/utils/api_2'
import { mapState } from 'vuex'
export default {
  name: "top",
  data() {
    return {
      // 搜索属性
      searchValue: "",
      // 是否展示热搜榜
      showHot: false,
      // 热搜数据
      hotData: [],
      // 搜索历史
      history: [],
      // 输入提示
      placeholder: "",
      // 是否获取建议
      isAdvice: false,
      // 搜索建议数据
      suggestionList: [],
      // 背景
      bg:'',
      // 滑动条
      sliderValue: 25,
      // 是否聚焦
      // isFocus: false,
    };
  },
  computed:{
    ...mapState(['usrInfo'])
  },
  created() {
    // 获取默认搜索关键词
    this.getDefaultKeywords();
  },

  watch: {
    searchValue() {
      this.getSuggestion();
    },
    sliderValue(){
      this.changeOpacity();
    }
  },

  methods: {
    gohome(){
      if (this.$route.path != '/discovery') {
        this.$router.push('/discovery')
      }
    },
    // router返回和前进
    go(n) {
      this.$router.go(n);
    },

    toLogin(){
      this.$router.push(`/login`);
    },

    // 改变背景
    changeBg(){
        getBgAPI()
        .then(res => {
          console.log('改变背景',res)
          this.bg = res.data.pic
          let style = document.createElement(`style`)
          let text = document.createTextNode(`body::after{background-image: url(${this.bg});}`);    // 添加伪类样式
          style.appendChild(text)
          document.body.appendChild(style)})
    },

    // 改变背景透明度
    changeOpacity(){
      // console.log('改变透明为:',this.sliderValue/100)
      let style = document.createElement(`style`)
      let text = document.createTextNode(`body::after{opacity: ${this.sliderValue/100};}`);    // 添加伪类样式
      style.appendChild(text)
      document.body.appendChild(style)
    },

    prevent() {
      event.preventDefault();
    },

    showError() {
      this.$message({
        showClose: true,
        message: "请输入内容",
        type: "error",
      });
    },
    //
    isNull(str) {
      if (str == "") return true;
      var regu = "^[ ]+$";
      var re = new RegExp(regu);
      return re.test(str);
    },

    outblur(){
      this.isAdvice = false
      this.showHot = false
    },

    // 判断搜索属性是否为空
    search() {
      if (this.isNull(this.searchValue)) this.showError();
      else {
        // 历史搜索数组push进数据
        this.$router.push(`/result?q=${this.searchValue}`);
        if (!this.history.includes(this.searchValue))
          this.history.push(this.searchValue);
        this.outblur()
      }
    },

    // 获取默认搜索提示和关键字
    getDefaultKeywords() {
      searchHintAPI().then((res) => {
        // console.log('获取默认搜索提示和关键字:',res)
        // 赋值输入提示
        this.placeholder = res.data.data.showKeyword;
      });
    },

    // 获取搜索建议
    getSuggestion() {
      this.isAdvice = true;
      let params ={
              keywords: this.searchValue,
              // 传入搜索类型，这里搜歌曲
            }
      if (this.searchValue != "") {
            searchSuggestAPI(params).then((res) => {
            // console.log("搜索建议:", res);
            // 获取搜索建议歌曲
            this.suggestionList = res.data.result;
            // 点击跳转之后，取消el-input聚焦
          });
      }else{
        this.isAdvice = false;
      }
    },

    // 获取热搜数据
    getSearchData() {
      if (this.searchValue != "") {
        this.getSuggestion();
      } else {
        this.showHot = true;
        if (this.hotData.length == 0) {
          hotSearchAPI().then((res) => {
            // console.log("获取热搜:", res);
            // 赋值
            this.hotData = res.data.data;
          });
        }
      }
    },

    // 点击热搜跳转
    toHot(value) {{
        this.searchValue = value;
        this.search();
        //阻止blur事件 也可以用@mousedown.prevent; mousedown的优先级高于blur
        // event.preventDefault();
      }
    },

    // 删除历史搜索记录
    deleteHistory(index, all) {
      // 清空记录
      if (all) this.history = [];
      // 遍历history数组，找到传入的index
      else
        for (let i = 0; i < this.history.length; i++) {
          if (i == index)
            // array.splice( start, deleteCount [,items... ] )，splice()函数一直从索引start开始，移除deleteCount个元素，直到数组的结尾。
            this.history.splice(i, 1);
        }
      // 防止点击x删除的时候，导致热搜榜消失，也可以通过.prevent修饰符
      event.preventDefault();
    },
    // 滑动条
    formatTooltip(val) {
        return val / 100;
      }
  },
};
</script>