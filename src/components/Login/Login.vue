<template>
    <div class="login-container">
        <div class="left">
            <img :src="pic" alt="">
        </div>
        <div class="right">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="密码登录" name="login-one">
                    <form action="">
                         <!-- oninput="value=value.replace(/^\.+|[^\d.]/g,'')"设置只能输入数字 -->
                        <input class="tel" type="text" v-model="phone" placeholder="请输入手机号" oninput="value=value.replace(/^\.+|[^\d.]/g,'')">
                        <div class="code-wrap">
                            <input class="code" v-model="password" type="password" placeholder="请输入密码">
                        </div>
                    </form>
                    <div class="btn-wrap">
                        <div class="btn-register">
                            <el-button>注册</el-button>
                        </div>
                        <div class="btn-login">
                            <el-button type="primary" @click="loginByPhone()">登录</el-button>
                        </div>
                    </div>
                </el-tab-pane>

                <el-tab-pane label="短信登录" name="login-two">
                    <form action="">
                         <!-- oninput="value=value.replace(/^\.+|[^\d.]/g,'')"设置只能输入数字 -->
                        <input class="tel" type="text" v-model="phone" placeholder="请输入手机号" oninput="value=value.replace(/^\.+|[^\d.]/g,'')">
                        <div class="code-wrap">
                            <input class="code" v-model="captcha" type="text" placeholder="请输入验证码">
                            <el-button type="primary" round @click="sentLoginCode()">获取验证码</el-button>
                        </div>
                    </form>
                    <div class="btn-wrap">
                        <div class="btn-register">
                            <el-button>注册</el-button>
                        </div>
                        <div class="btn-login">
                            <el-button type="primary" @click="loginByPhoneCode()">登录</el-button>
                        </div>
                    </div>
                </el-tab-pane>


            </el-tabs>
            <div class="other-wrap">
                <span>其他方式登录</span>
            </div>
        </div>
        
    </div>

</template>

<script>
import { loginByPhoneAPI,loginByPhoneCodeAPI,sentLoginCodeAPI,loginStatusAPI } from '@/utils/api'
import { mapMutations, mapState } from 'vuex'
export default {
    data() {
        return {
            // 登录方式
            activeName:'login-one',
            // 输入手机号
            phone: '',
            // 输入密码
            password: '',
            // 输入验证码
            captcha:'',
            // 左边图片
            pic:'https://www.xdocin.com/xdoc?_key=4usklvd325aqbbzk2tcofoquoe&_func=down&_dir=login.jpg',
            // 加载
            // loading : true
            // 用户信息
            user :{
                username : '',
                avater : '',
                userid : '',
            }
        }
    },
    //通过刚才导入得mapState函数，将当前组件需要的全局属性，映射为当前组件的computed属性
    computed:{
        ...mapState(['userInfo','isLogin'])
    },
    created() {

    },
    methods:{
        ...mapMutations(['updataUsrInfo','updateLogin','updataToken','updataCookie']),
        handleClick(tab){
            
        },
        // 手机密码登录
        loginByPhone(){
            let params = {
                phone : this.phone,
                password : this.password
            }
            loginByPhoneAPI(params).then(res =>{
                if(res.data.code == 200){
                    // 赋值操作
                    this.success(res)
                }else {
                    this.fail()
                    console.log('登录失败，密码或者账号错误')
                }
                console.log('手机密码登录',res)
            }).catch(err => err)

        },

        // 手机验证码登录
        loginByPhoneCode(){
            let params = {
                phone: this.phone,
                captcha: this.captcha,
            }
            loginByPhoneCodeAPI(params).then(res =>{
                if(res.data.code == 200){
                    this.success(res)
                }else{
                    this.fail()
                }
                console.log('手机验证码登录',res)
            }).catch(err => err)
        },
        // 发送验证码
        sentLoginCode(){
            let params = {
                phone : this.phone
            }
            sentLoginCodeAPI(params).then(res =>{
                console.log('发送验证码',res)
            })
        },
        // 登录状态
        loginStatus(){
            loginStatusAPI().then(res =>{
                if(res.data.data.code == 200){
                    this.$router.push(0)
                }
            })
        },
        // 登录成功
        success(res){
            this.$message({
                message : '登录成功',
                type : 'success'
            })
            this.user.username = res.data.profile.nickname
            this.user.avater = res.data.profile.avatarUrl
            this.user.userid = res.data.profile.userId,
            this.$store.commit('updataToken', res.data.token)
            this.$store.commit('updataCookie',res.data.cookie)
            this.$store.commit('updataUsrInfo', this.user)
            this.$store.commit('updateLogin' , true ),
            this.$router.push(`/userInfo`)
        },

        fail(){
            this.$message({
                message : '登录失败，账号密码或者验证码错误',
                type : 'error'
            })
        }
        
    }
}
</script>

<style lang="less" scoped>
.login-container {
    display: flex;
    position: relative;
    width: 100%;
    height: 500px;
    border-radius: 1.5rem;
    width: 900px;
    margin: 5% auto;
    box-shadow: 0 0 1rem 0.2rem rgb(0 0 0 / 10%);

    .left {
        position: relative;
        width: 50%;
        height: 100%;
        /* background-image: url('http://i0.hdslb.com/bfs/article/7defa0e153529aecb0643bc2122aca45d0677d73.jpg'); */
        background-size: cover;

        img{
            border-radius: 1.5rem 0 0 1.5rem;
            max-width:100%;
            max-height:100%;
            overflow: hidden;
            background-size: cover;
        }
    }

    .right {
        display: flex;
        width: 70%;
        margin-right: 30px;
        margin-top: 50px;
        flex-direction: column;
        align-items: center;

        form{
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            justify-content: center;

            .tel {
                outline: none;
                font-size: 15px;
                width: 100%;
                height: 40px;
                margin: 5% auto;
                border: none;
                border-bottom:1px solid rgb(144,129,241) ;
                color: rgb(144,129,241);
                background-color: rgba(0,0,0,0);
            }
        }

        .code-wrap{
            display: flex;
            margin-top: 15px;

            .code{
                outline: none;
                font-size: 15px;
                width: 100%;
                height: 40px;
                border: none;
                border-bottom:1px solid rgb(144,129,241) ;
                color: rgb(144,129,241);
                background-color: rgba(0,0,0,0);
            }
        }

        .btn-wrap{
            margin : 15% auto;
            display: flex;

            .el-button{
                width: 140px;
            }

            .btn-register{
                margin-right: 10px;
            }
        }

        .other-wrap span{
            color: darkcyan;
        }
    }

}
</style>