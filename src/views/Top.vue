<template>
  <div class="header">
    <!-- <script src="https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script> -->
    <!-- 标题 -->
    <div class="header-title">
      <h2 @click="gohome">云音乐播放器By Alive</h2>
    </div>
    <!-- 返回和前进的按钮 -->
    <div class="btns">
      <!-- 点击后退 -->
      <i class="el-icon-arrow-left" @click="go(-1)"></i>
      <!-- 点击前进 -->
      <i class="el-icon-arrow-right" @click="go(1)"></i>
      <!-- 点击改变背景 -->
      <i class="el-icon-picture-outline" id="btbg" @click=""></i>
    </div>

    <div>
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
 
    <div class="sliderBar">
      <el-slider v-model="sliderValue" :format-tooltip="formatTooltip" ></el-slider>
    </div>

    <div class="userInfo-wrap">
      <div class="avater">
        <span v-show="!isLogin" @click="toLogin()">登录</span>
        <img  v-show="isLogin" :src="userInfo.avater" @click="toLogin()" >
      </div>
      <div class="user-wrap">
        <span>{{ userInfo.username }}</span>
        <i class="el-icon-caret-bottom"></i>
      </div>
    </div>

    <div class="nav-phone-btn">
      <!-- 移动端导航栏展开按钮 -->
      <i :class="navPhoneOpen ? 'el-icon-s-fold' : 'el-icon-s-unfold'" style="font-size: 20px; transition: .3s;" @click="changeNavPhone()"></i>
    </div>
  
  </div>
</template>

<style>
</style>

<script>
import { searchHintAPI,searchSuggestAPI,hotSearchAPI } from '@/utils/api'
import { mapState } from 'vuex'
import NavPhone from '@/components/Content/NavPhone';
export default {
  name: "Top",
  /* 子组件 */
  components: { NavPhone },
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
      sliderValue: 35,
      // 是否聚焦
      // isFocus: false,
    };
  },
  computed:{
    ...mapState(['userInfo','isLogin','token','navPhoneOpen'])
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
      if(this.isLogin || this.token || localStorage.getItem('token')){
        this.$router.push(`/userInfo`);
      }else{
        this.$router.push(`/login`);
      }
    },

    // 改变背景
    // changeBg(){
    //     getBgAPI()
    //     .then(res => {
    //       console.log('改变背景',res)
    //       this.bg = res.data.pic
    //       let style = document.createElement(`style`)
    //       let text = document.createTextNode(`body::after{background-image: url(${this.bg});}`);    // 添加伪类样式
    //       style.appendChild(text)
    //       document.body.appendChild(style)})
    // },

    // 展开、关闭移动端导航栏
    changeNavPhone(){
      const payload = !this.navPhoneOpen;
      this.$store.dispatch('changeNavPhone',payload)
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
            console.log("获取热搜:", res);
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
    },

  },
};
</script>

<style lang="less" scoped>
.header {
    position: fixed;
    width: 100%;
    background-color: rgb(243, 244, 246);
    display: flex;
    align-items: center;
    height: 60px;
    margin: 0 auto;
    z-index: 999;
    box-shadow: 0 0 10px 0px rgba(0, 0, 0, .3);

  .header-title{
    overflow: hidden;
    text-overflow: ellipsis; /* ellipsis设置超过的部分为省略号*/
    display: -webkit-box;        /*  */
    -webkit-box-orient: vertical;  /* 从顶部向底部垂直布置子元素 */
    -webkit-line-clamp: 1;   /* 设为最多一行 */

    h2 {
      color: blueviolet;
      letter-spacing: .1rem;
      margin: 0 30px;
      cursor: pointer;
    }
  }

  .btns{
    display: flex;
    margin-left: 10px;

    i {
      color: rgba(144, 147, 153);
      border-radius: 50%;
      padding: 10px;
      box-sizing: border-box;
      cursor: pointer;

      &:hover {
        background-color: rgba(166, 169, 173, .3);
      }
    }
  }

  .nav-phone-btn{
    display: none;
    margin-left: 5px;

    i{
      color: rgba(144, 147, 153);
      border-radius: 50%;
      padding: 10px;
      box-sizing: border-box;
      cursor: pointer;

      &:hover {
        background-color: rgba(166, 169, 173, .3);
      }
    }
  }

  .input-box {
    width: 400px;
    margin-left: 30px;

    input {
      border-radius: 20px;
      background-color: rgb(255, 255, 255);
      border: none;
      outline: none;
      font-size: 12px;
      color: black;
    }

  }

  .sliderBar{
    margin-left: 30px;
    width: 200px;
  }

  .search-hot {
    width: 400px;
    height: 300px;
    /* border: 1px solid #333; */
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, .3);
    border-radius: 10px;
    background-color: #fff;
    z-index: 1;
    padding: 10px 10px;
    box-sizing: border-box;
    position: absolute;
    margin-left: 30px;
    margin-top: 10px;
  }

  .hot-title {
    margin: 10px 0;
    font-weight: bold;
  }

  .hot-item {
    display: flex;
    align-items: center;
    padding: 5px;
    cursor: default;

    &:hover{
      background-color: seashell;
    }
  }

  .hot-index {
    font-size: 20px;
    color: rgb(236, 65, 65);
    margin-right: 15px;
  }

  .hot-info {
      flex: 1;
      font-size: 12px;
      color: slategray;
  }

  .hot-top {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
  }

  .hot-name {
      font-size: 16px;
      margin-right: 15px;
      color: #000;
  }

  .hot-icon {
      width: 30px;
      /* height: 15px; */
      margin-left: 5px;
  }

  .history-wrap {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .history-item {
    border: 1px solid #ddd;
    padding: 5px 10px;
    border-radius: 10px;
    font-size: 13px;
    display: inline-block;
    cursor: pointer;
    margin: 5px;

    &:hover {
      background-color: #F5F7FA;

      .delete-btn {
        opacity: 1 !important;
      }
    }
  }

  .delete-btn {
    cursor: pointer;
    opacity: 0;
  }

  .userInfo-wrap{
    display: flex;

    .user-wrap{
      cursor: pointer;
      margin-left: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: blueviolet;

      i{
        margin-left: 5px;
        font-size: 20px;
      }
    }

    .avater{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      cursor: pointer;
      margin-left: 30px;
      background: #f6f6f6;
      color: #00AEEC;
      border: 1px solid white;
      border-radius: 50%;

      img{
        width: 100%;
        border-radius: 2rem;
      }
    }
  }
}

.el-input__icon {
  color: black;
}

@media screen and (max-width : 980px) {
    .header .sliderBar{
        display: none;
    }

    .header .input-box {
        width: 300px;
        margin-left: 30px;
    }

    .header .search-hot {
        width: 300px;
        height: 300px;
        /* border: 1px solid #333; */
        box-shadow: 0 0 5px 2px rgba(0, 0, 0, .3);
        border-radius: 10px;
        background-color: #fff;
        z-index: 1;
        padding: 10px 10px;
        box-sizing: border-box;
        position: absolute;
        margin-left: 30px;
    }

    .header #btbg{
        display: none;
    }
  
}

@media screen and (max-width : 500px) {
    .header .userInfo-wrap{
        display: none;
    }

    .header .nav-phone-btn{
        display: block;
    }
}

@media screen and (max-width : 450px) {

    .header .header-title{
        display: none;
    }

    .header .input-box {
        width: 250px;
        margin-left: 10px;
    }

    .header .search-hot {
        width: 220px;
        height: 300px;
        /* border: 1px solid #333; */
        box-shadow: 0 0 5px 2px rgba(0, 0, 0, .3);
        border-radius: 10px;
        background-color: #fff;
        z-index: 1;
        padding: 10px 10px;
        box-sizing: border-box;
        position: absolute;
        margin-left: 10px;
    }

    .header .hot-index {
        font-size: 12px;
        color: rgb(236, 65, 65);
        margin-right: 15px;
    }

    .header .hot-name {
        font-size: 10px;
        margin-right: 15px;
        color: #000;
        width: 100px;
    }
    
    .header .hot-score{
        display: none;
    }

    .header .hot-content{
        font-size: 8px;
    }

    .header .userInfo-wrap .avater{
        margin-left: 10px;
    }

    .header .userInfo-wrap .user-wrap{
        display: none;
    }
}

@media screen and (max-width : 390px){
    .header .input-box {
        width: 220px;
    }
}

@media screen and (max-width : 355px){
    .header .input-box {
        width: 200px;
    }
}
</style>