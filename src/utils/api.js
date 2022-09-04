import request from './request'

// 获取最新歌曲
export function getNewSongsAPI(params){
    return request({
        url:'/top/song',
        method:'get',
        params
    })
}

// 获取播放音乐url
export function getSongUrlAPI(params){
    return request({
        url:'/song/url',
        method:'get',
        params
    })
}

// 轮播图
export function bannerAPI(){
    return request({
        url:'/banner',
        method:'get',
    })
}

// 推荐歌单的接口
export function recommendSonglistAPI(params){
    return request({
        url:'/personalized',
        method:'get',
        params
    })
}

// 最新音乐的接口
export function recommendSongAPI(limit){
    return request({
        url:'/personalized/newsong',
        method:'get',
        params:{
            limit
        }
    })
}

// 推荐MV的接口
export function recommendMVAPI(limit){
    return request({
        url:'/personalized/mv',
        method:'get',
        params:{
            limit
        }
    })
}

// 获取精品歌单接口
export function highQualityAPI(params){
    return request({
        url:'/top/playlist/highquality',
        method:'get',
        params
    })
}

// 歌单(网友精选碟)接口
export function songListAPI(params){
    return request({
        url:'/top/playlist',
        method:'get',
        params
    })
}

// 获取推荐mv
export function mvListAPI(params){
    return request({
        url:"/mv/all",
        method:'get',
        params
    })
}

// 获取歌单详情
export function playlistDetailAPI(params){
    return request({
        url:"/playlist/detail",
        method:'get',
        params
    })    
}

// 获取歌曲详细
export function songInfoAPI(params){
    return request({
        url:"/song/detail",
        method:'get',
        params
    })      
}

// 获取评论,传入params和type,type可以是歌单 / MV等
export function commentsAPI(params,type){
    return request({
        url:"/comment/"+type,
        method:'get',
        params
    })      
}

 // 搜索接口,调用此接口,传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个
export function searchAPI(params){
    return request({
        url:"/cloudsearch",
        method:'get',
        params
    })      
}
// 获取mv播放链接url
export function playMVAPI(params){
    return request({
        url:"/mv/url",
        method:'get',
        params
    })       
}
// 获取相似mv
export function simiMVAPI(params){
    return request({
        url:"/simi/mv",
        method:'get',
        params
    })       
}
// 获取mv详情
export function mvDetailAPI(params){
    return request({
        url:"/mv/detail",
        method:'get',
        params
    })       
}
// 歌手的接口
export function artistsAPI(params,type=""){
    let url = type=="" ? '/artists' : '/artist/'+type
    if(type == 'simi')
        url = '/simi/artist'
    return request({
        url,
        method:'get',
        params
    })     
}

// export function albumAPI(params){
//     return request({
//         url:"/album",
//         method:'get',
//         params
//     })       
// }

// 获取歌词
export function lyricAPI(id){
    return request({
        url:"/lyric",
        method:'get',
        params:{
            id
        }
    })       
}
// 获取热搜数据
export function hotSearchAPI(){
    return request({
        url:"/search/hot/detail",
        method:'get',
    })       
}

// 获取默认搜索提示和关键字
export function searchHintAPI(){
    return request({
        url:"/search/default",
        method:'get'
    })       
}
// 获取搜索建议
export function searchSuggestAPI(params){
    return request({
        url:"/search/search/suggest",
        method:'get',
        params
    })       
}

// 获取榜单,排行榜
export function getleadAPI(){
    return request({
        url:"/toplist",
        method:'get',
    })       
}

// 获取歌手列表
export function getArtistsAPI(params){
    return request({
        url : "/artist/list",
        method : 'get',
        params
    })
}

// 获取歌手单曲
export function singerSongsAPI(params){
    return request({
        url : "/artists",
        method : 'get',
        params
    })
}

// 手机密码登录
export function loginByPhoneAPI(params){
    return request({
        url: '/login/cellphone',
        method: 'post',
        params
    })
}

// 手机验证码登录
export function loginByPhoneCodeAPI(params){
    return request({
        url: "/login/cellphone",
        method: 'post',
        params
    })
}

// 发送手机登录验证码
export function sentLoginCodeAPI(params){
    return request({
        url: "/captcha/sent",
        method : 'post',
        params
    })
}

// 查询登录状态
export function loginStatusAPI(){
    return request({
        url: '/login/status',
    })
}

// 退出登录状态，注销
export function logoutAPI(){
    return request({
        url : '/logout'
    })
}

// 检查歌曲是否可用
export function checkMusicAPI(id){
    return request({
        url:'/check/music',
        params:{
            id
        }
    })
}

// 喜欢当前歌曲
export function likeNowSongAPI(id,like){
    return request({
        url:'/like',
        params:{
            id,
            like,
            timestamp:Date.parse(new Date())
        }
    })
}
// 获取用户喜欢的歌曲列表
export function getLikSongListAPI(uid){
    return request({
        url:'/likelist',
        params:{
            uid,
            timestamp:Date.parse(new Date())
        }
    })
}