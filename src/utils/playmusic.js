import request from './request'

// 检查歌曲是否可用
export function checkMusic(id){
    return request({
        url:'/check/music',
        params:{
            id
        }
    })
}

// 获取歌曲url
export function getSongUrl(id){
    return request({
        url:'/song/url',
        params:{
            id
        }
    })
}

// 获取歌词
export function getNowLyric(id){
    return request({
        url:'/lyric',
        params:{
            id
        }
    })
}

// 获取每首歌的详细信息
export function getEverySongDetail(ids){
    return request({
        url:'/song/detail',
        params:{
            ids,  //音乐id(支持多个id, 用 , 隔开)
        }
    })
}
// 喜欢当前歌曲
export function likeNowSong(id,like){
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
export function getLikSongList(uid){
    return request({
        url:'/likelist',
        params:{
            uid,
            timestamp:Date.parse(new Date())
        }
    })
}