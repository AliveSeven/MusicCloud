<<template>
    <div id="nav-phone" :class=" navPhoneOpen ? 'open' : 'close'">
        <!-- 用户头像 -->
        <div class="avatar-img is-center">
            <!-- <span v-show="!isLogin" @click="toLogin()">登录</span>
            <img  v-show="isLogin" :src="userInfo.avater" @click="toLogin()" > -->
            <img src="https://pic.imgdb.cn/item/630b81ff16f2c2beb1982bcc.jpg" alt="">
        </div>
        <!-- 用户个人选项 -->
        <div class="site-data is-center">

        </div>
        <!-- 分割线 -->
        <el-divider></el-divider>
        
        <!-- 导航菜单 -->
        <div class="menus_items">
            <div class="menus_item" @click="hideNav()">
                <i class="el-icon-headset"></i>
                <router-link to="/discovery">
                  <span class="nav-router">发现音乐</span>
                </router-link>
            </div>
            <div class="menus_item" @click="hideNav()">
                <i class="el-icon-trophy"></i>
                <router-link to="/playlists"> <span class="nav-router">推荐歌单</span> </router-link>
            </div>
            <div class="menus_item" @click="hideNav()">
                <i class="el-icon-star-off"></i>
                <router-link to="/songs"> <span class="nav-router">最新音乐</span> </router-link>
            </div>
            <div class="menus_item" @click="hideNav()">
                <i class="el-icon-film"></i>
                <router-link to="/mvs"> <span class="nav-router">最新MV</span> </router-link>
            </div>
            <div class="menus_item" @click="hideNav()">
                <i class="el-icon-s-data"></i>
                <router-link to="/leaderboard"> <span class="nav-router">排行榜</span> </router-link>
            </div>
            <div class="menus_item" @click="hideNav()">
                <i class="el-icon-mic"></i>
                <router-link to="/artists"> <span class="nav-router">歌手</span> </router-link>
            </div>
            
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'NavPhone',
    computed:{
        ...mapState(['userInfo','isLogin','token','navPhoneOpen'])
    },
    methods: {
        // 点击导航跳转路有关闭
        hideNav(){
            this.$store.dispatch('changeNavPhone' , false)
        }
    },
}
</script>

<style lang="less">
    #nav-phone.open{
        -webkit-transform: translate3d(-100%, 0, 0);
        -moz-transform: translate3d(-100%, 0, 0);
        -o-transform: translate3d(-100%, 0, 0);
        -ms-transform: translate3d(-100%, 0, 0);
        transform: translate3d(-100%, 0, 0);

        > :nth-child(1){
            -webkit-animation: sidebarItem 0.2s;
            -moz-animation: sidebarItem 0.2s;
            -o-animation: sidebarItem 0.2s;
            -ms-animation: sidebarItem 0.2s;
            animation: sidebarItem 0.2s;
        }

        > :nth-child(2) {
            -webkit-animation: sidebarItem 0.4s;
            -moz-animation: sidebarItem 0.4s;
            -o-animation: sidebarItem 0.4s;
            -ms-animation: sidebarItem 0.4s;
            animation: sidebarItem 0.4s;
        }
    }

    #nav-phone{
        position: fixed;
        top: 60px;
        right: -300px;
        z-index: 103;
        overflow-x: hidden;
        overflow-y: auto;
        width: 300px;
        height: 100%;
        background: #f6f8fa;
        -webkit-transition: all 0.5s;
        -moz-transition: all 0.5s;
        -o-transition: all 0.5s;
        -ms-transition: all 0.5s;
        transition: all 0.5s;
        box-sizing: border-box;

        .avatar-img {
            overflow: hidden;
            margin: 20px auto;
            width: 110px;
            height: 110px;
            border-radius: 70px;
            cursor: pointer;

            img{
                width: 100%;
                height: 100%;
                -webkit-transition: filter 375ms ease-in 0.2s, -webkit-transform 0.3s;
                -moz-transition: filter 375ms ease-in 0.2s, -moz-transform 0.3s;
                -o-transition: filter 375ms ease-in 0.2s, -o-transform 0.3s;
                -ms-transition: filter 375ms ease-in 0.2s, -ms-transform 0.3s;
                transition: filter 375ms ease-in 0.2s, transform 0.3s;
                object-fit: cover;
            }
        }

        .is-center {
            text-align: center;
        }

        .site-data{
            padding: 0 10px;
            display: table;
            width: 100%;
            table-layout: fixed;
        }

        .menus_items{
            padding: 0 10px 40px;

            .menus_item{
                position: relative;
                display: block;
                padding: 6px 30px 10px 22px;
                color: #4c4948;
                font-size: 20px;
                cursor: pointer;

                i{
                    width: 15%;
                    text-align: left;
                    font-weight: 900;
                    -webkit-font-smoothing: antialiased;
                    font-style: normal;
                    font-variant: normal;
                    line-height: 1;
                    text-rendering: auto;
                }

                .nav-router{
                    padding-left: 5px;
                    color: #4c4948;
                }
            }
        }

        .avatar-img img:hover {
            -webkit-transform: rotate(360deg);
            -moz-transform: rotate(360deg);
            -o-transform: rotate(360deg);
            -ms-transform: rotate(360deg);
            transform: rotate(360deg);
        }

    }

    .menus_item:hover{
       background: rgba(73,177,245,0.7);
    }

    
</style>