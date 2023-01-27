<template>
  <div class="artists-container">
        <!-- 选项过滤容器 -->
        <div class="filter-wrap">
            <div class="wrap-container">
                <div class="area-wrap">
                    <!-- 分类切换语种 -->
                    <span class="area-type">语种:</span>
                    <!-- 地区标签包 -->
                    <ul class="areas-wrap">
                        <!-- 地区、语种：-1 全部 -->
                        <li class="tab">
                            <span class="title" :class="{active : area == -1}" @click="area = -1 ">全部</span>
                        </li>
                        <!-- 7 华语 -->
                        <li class="tab">
                            <span class="title" :class="{active : area == 7}" @click="area = 7">华语</span>
                        </li>
                        <!-- 欧美 -->
                        <li class="tab">
                            <span class="title" :class="{active : area == 96}" @click=" area = 96">欧美</span>
                        </li>
                        <!-- 日本 -->
                        <li class="tab">
                            <span class="title" :class="{active : area == 8}" @click=" area = 8">日本</span>
                        </li>
                        <!-- 韩国 -->
                        <li class="tab">
                            <span class="title" :class="{active : area == 16}" @click=" area = 16">韩国</span>
                        </li>
                        <!-- 其他 -->
                        <li class="tab">
                            <span class="title" :class="{active : area == 0}" @click=" area = 0">其他</span>
                        </li>
                    </ul>
                </div>

                <div class="type-wrap">
                    <!-- 分类切换歌手类型 -->
                    <span class="types-type">分类:</span>
                    <!-- 类型标签包 -->
                    <ul class="types-wrap">
                        <!-- 歌手类型：-1 全部 -->
                        <li class="tab">
                            <span class="title" :class="{active : type == -1}" @click="type = -1 ">全部</span>
                        </li>
                        <!-- 歌手类型：1 男歌手 -->
                        <li class="tab">
                            <span class="title" :class="{active : type == 1}" @click="type = 1 ">男歌手</span>
                        </li>
                        <!-- 歌手类型：2 女歌手 -->
                        <li class="tab">
                            <span class="title" :class="{active : type == 2}" @click="type = 2 ">女歌手</span>
                        </li>
                        <!-- 歌手类型：3 乐队 -->
                        <li class="tab">
                            <span class="title" :class="{active : type == 3}" @click="type = 3 ">乐队组合</span>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
        <!-- 歌手容器 -->
        <div class="artists">
            <div class="artists-wrap" v-for="(item, index) in artistsList" :key="index" @click="toAlbum(item.id)">
                <div class="img-wrap">
                    <img v-lazy="item.img1v1Url" alt="">
                </div>
                <div class="name">{{item.name}}</div>
            </div>
        </div>
        <!-- 分页器 -->
        <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
        :page-size="limit"
        :pager-count="5"
      ></el-pagination>
  </div>
</template>

<script>
import { getArtistsAPI } from '@/utils/api'
export default {
    name: 'artists',
    data() {
        return {
            // 总条数
            total : 400,
            // 获取结果列表
            artistsList : [],
            // 类型 : -1、全部 1、男歌手 2、女歌手 3、乐队
            type : -1,
            // 语种、地区 : -1、全部 7、华语 96、欧美 8、日本 16、韩国 0、其他
            area : -1,
            // 页码
            page : 1,
            // 获取数量
            limit : 20,
        }
    },

    watch :{
        area(){
            //返回第一页
            this.page = 1;
            // 获取数据
            this.getData()
        },
        type(){
            //返回第一页
            this.page = 1;
            // 获取数据
            this.getData()
        }
    },

    created() {
        this.getData()
    },
    
    methods: {
        getData(){
            let params = {
                limit : this.limit, // 获取数量
                type : this.type, // 获取类型，-1为全部
                area : this.area, // 获取歌手地区，-1为全部
                offset : (this.page - 1) * this.limit
            }
            getArtistsAPI(params).then(res =>{
                // console.log('全部歌手列表',res);
                // 赋值
                this.artistsList = res.data.artists
            })
        },
        handleCurrentChange(val) {
            // console.log(val)
            // console.log(`当前页: ${val}`)
            this.page = val;
            this.getData();
        },
        toAlbum(id){
            this.$router.push(`/artist?q=${id}`)
        }
    },
}
</script>

<style lang="less" scoped>
.artists-container{
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 1200px;
    margin: 35px 50px;

    .filter-wrap{
        .wrap-container{
            &>div{
                margin-bottom: 30px;
                vertical-align: baseline; /* 使单元格的基线，与该行中所有以基线对齐的其它单元格的基线对齐。  */
                display: flex; /* 弹性布局,横着放 */
                align-items: center;

                span{
                    font-size: 14px;
                    height: 100%;

                    &.title{
                        margin: 20px;
                        color: gray;
                        cursor: pointer;
                        padding: 5px 20px;

                        &.active{
                            color: black;
                            background-color: #fcf6f5;
                            border-radius: 20px;
                        }
                    }
                }

                ul{
                    display: flex;

                    /* 除了最后一个元素外,其他元素在其右边加上一条solid(实心)边框 */
                    li:not(:last-child) {
                        border-right: 1px solid #f2f2f1;
                    }
                }
            }
        }
    }

    .artists{
        display: flex;
        flex-wrap: wrap;

        .artists-wrap{
            margin: 10px 20px;

            .img-wrap{
                width: 200px;
                position: relative;
                cursor: pointer;

                img{
                    width: auto;
                    height: auto;
                    max-width: 100%;
                    max-height: 100%;
                    border-radius: 50%;
                    box-shadow: 0 0 20px 2px rgba(0, 0, 0, .3);
                }

                &:hover img{
                    transform: scale(1.1);
                }
            }

            .name{
                text-align: center;
                margin: 10px auto;
            }
        }
    }
}

@media screen and (max-width : 500px) {
    .artists-container{
        margin: 20px 0;
    }

    .artists-container .filter-wrap{
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .artists-container .filter-wrap .wrap-container > div span.title{
        margin: 7px;
        padding: 2px;
    }

    .artists-container .artists{
        justify-content: center;
    }

    .artists-container .artists .artists-wrap .img-wrap{
        width: 120px;
    }

    .artists-container .artists .artists-wrap .name{
        width: 100px;
    }
}

@media screen and (max-width : 360px){
    .artists-container .artists .artists-wrap .img-wrap{
        width: 110px;
    }
}

</style>