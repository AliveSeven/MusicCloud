import axios from 'axios'
import { Message } from 'element-ui'
// 导入 Nprogress 
import NProgress from 'nprogress'

// 默认接口
let baseURL = "https://music-cloud-fpgfem8aa-aliveleqi.vercel.app/"
// let baseURL = "http://124.223.89.194:3000/"
// let baseURL = "http://localhost:3000"
// let baseURL = "https://lianghj.top:3000"
// let baseURL = 'http://duoduozuikeail.top:3000'
// let baseURL = 'https://netease-cloud-music-api-six-rust.vercel.app/'


// let baseURL = 'https://lianghj.top:3000'
// let baseURL = 'https://www.codeman.ink/api/'
// let baseURL = 'https://music.cyrilstudio.top/'
// let baseURL = "https://netease-cloud-music-api-six-rust.vercel.app"

const service = axios.create({
    baseURL,
    timeout: 5000,
    changeOrigin: true,  //跨域
    withCredentials: true, //axios 设置请求自动携带cookie
    XMLHttpRequest : true
})

// 添加请求拦截器
// 添加 请求头 和 进度条 NProgress.start()
service.interceptors.request.use(config => {
    // 添加 进度条
    NProgress.start()

    return config
})

// 添加响应拦截器
service.interceptors.response.use(config => {
    // 隐藏 进度条
    NProgress.done()

    return config
})

service.interceptors.response.use(
    response => {
        if (response.status == 200) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    },
    error => {
        error && Message({
            type: 'error',
            message: 'API接口出了点问题~ 请重新刷新~ ',
            showClose: true
        })
    }
)

export default service