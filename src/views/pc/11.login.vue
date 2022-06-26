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
                            <input class="code" v-model="verification" type="text" placeholder="请输入验证码">
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
            phone: '17858756825',
            // 输入密码
            password: 'jdm123123',
            // 输入验证码
            verification:'',
            // 左边图片
            pic:'https://www.xdocin.com/xdoc?_key=4usklvd325aqbbzk2tcofoquoe&_func=down&_dir=login.jpg',
            // 加载
            // loading : true
            // 用户信息
            usr :{
                usrname : '',
                avater : '',
                usrid : '',
                level : ''
            }
        }
    },
    //通过刚才导入得mapState函数，将当前组件需要的全局属性，映射为当前组件的computed属性
    computed:{
        ...mapState(['usrInfo'])
    },
    created() {

    },
    methods:{
        ...mapMutations(['updataUsrInfo']),
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
                    this.usr.usrname = res.data.profile.nickname,
                    this.usr.avater = res.data.profile.avatarUrl
                    this.usr.usrid = res.data.profile.userId
                    this.$store.commit('updataUsrInfo', this.usr)
                    this.success()
                }else {
                    console.log('登录失败，密码或者账号错误')
                }
                console.log('手机密码登录',res)
            })

        },

        // 手机验证码登录
        loginByPhoneCode(){
            let params = {
                phone: this.phone,
                captcha: this.verifiation,
            }
            loginByPhoneCodeAPI(params).then(res =>{
                console.log('手机验证码登录',res)
            })
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
                    this.$router.go(0)
                }
            })
        },
        // 登录成功
        success(){
            this.$message({
                message : '登录成功',
                type : 'success'
            })
        }
        

    }
}
</script>

<style>

</style>