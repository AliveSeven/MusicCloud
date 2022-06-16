import request_2 from './request_2'

// 获取背景图片，横图
export function getBgAPI(){
    return request_2({
        url:'?sort=pc&type=json',
        method:'get',
    })
}

// 获取图片，竖图
export function getShuBgAPI(){
    return request_2({
        url:'?sort=mp&type=json',
        method:'get',
    })
}