import axios from 'axios'
import {Message} from 'element-ui'
// 导入 Nprogress 
import NProgress from 'nprogress'

// 默认接口
// let baseURL = "https://music-cloud-fpgfem8aa-aliveleqi.vercel.app/"
// let baseURL = "http://124.223.89.194:3000/"
// let baseURL = "http://localhost:3000"
// let baseURL = "https://autumnfish.cn"

// if(process.env.NODE_ENV == "development"){
// }else{
let  baseURL = 'http://duoduozuikeail.top:3000'
// }

const service = axios.create({
    baseURL,
    timeout:5000,
    changeOrigin: true,  //跨域
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
        if(response.status == 200) {
            return Promise.resolve(response)
        }else{
            return Promise.reject(response)
        }
    },
    error => {
        error && Message({
            type:'error',
            message:'网络连接出问题了~ 请重试~ ',
            showClose:true
        })
    }
)

export default service