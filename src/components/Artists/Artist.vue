<template>
  <div class="artist-container">
      <!-- 歌手介绍部分 -->
      <div class="artist-wrap">
          <div class="img-wrap">
              <!-- 歌手封面 -->
              <img v-lazy="artistData.img1v1Url" alt="">
          </div>
          <!-- 歌手信息 -->
          <div class="artist-info">
                <!-- 名字 -->
                <div class="author-wrap">
                    <h2>{{artistData.name}}</h2>
                    <!-- 英文名 -->
                    <div class="alias-wrap" >
                        <span v-for="(item, index) in alias" :key="index" >{{item}}</span>
                    </div>
                </div>
                <div class="creation-wrap">
                    <span>单曲数:{{artistData.musicSize}}</span>
                    <span>专辑数:{{artistData.albumSize}}</span>
                    <span>MV数:{{artistData.mvSize}}</span>
                </div>
                <div class="desc-wrap">
                    <p>简介:{{artistData.briefDesc}}</p>
                </div>
          </div>
      </div>
        <!-- 歌手的部分热门歌曲 -->
        <el-tabs v-model="activeName">
          <el-tab-pane label="热门歌曲" name="hotsongs">
              <table class="el-table">
                  <!-- 这里是表头  -->
                    <thead>
                        <!-- 表头单元格 -->
                        <th></th>
                        <th>音乐标题</th>
                        <th>歌手</th>
                        <th>专辑</th>
                        <th>时长</th>
                    </thead>
                    <!-- 表身体部分，tr表示HTML表格中的一行。 -->    
                    <tbody>
                        <tr v-for="(item, index) in hotSongs" :key="index" class="el-table__row"
                            @dblclick="PlayMusic(item)">
                            <td>{{index+1}}</td>
                            <td>
                                <div class="song-wrap">
                                    <div class="name-wrap">
                                    <!-- 歌名 / mv图标 -->
                                    <div class="first-title">{{item.name}}<span v-if="item.mvid != 0" class="iconfont icon-mv" ></span></div>
                                    <!-- 二级标题 -->
                                    <div v-if="item.alia.length != 0" class="second-title">{{ item.alia[0] }}</div>
                                    </div>
                                </div>
                            </td>
                            <!-- 歌手 -->
                            <td class="td-title">
                                <div class="td-wrap">
                                    {{ item.ar[0].name }}
                                </div>
                            </td>
                            <!-- 专辑名 -->
                            <td class="td-title">
                                <div class="td-wrap">
                                    {{ item.al.name }}
                                </div>
                            </td>
                            <!-- 时长 -->
                            <td class="td-title">
                                <div class="td-wrap">
                                    {{ item.dt | formatDuration }}
                                </div>
                            </td>
                        </tr>
                    </tbody>
              </table>
          </el-tab-pane>
        </el-tabs>
        
        <div class="empty-wrap">

        </div>
  </div>
</template>

<script>
import { singerSongsAPI, checkMusicAPI, getSongUrlAPI, songInfoAPI } from '@/utils/api'
export default {
    name : 'artist',
    data() {
        return {
            activeName : 'hotsongs',
            // 歌手id
            artistId : this.$route.query.q,
            // 获取数量
            limit : 50,
            // 页数
            page : 1,
            // 歌手数据列表
            artistData : {},
            // 英文名
            alias : [],
            // 歌手热门单曲
            hotSongs : [],
        }
    },
    created() {
        // 开局直接调用
        this.getSingerSongs()
    },
    // vue-router 同一个页面地址栏参数改变，页面不刷新的问题
    watch: {
      '$route' (to, from) {
        this.search(this.$route.query.q)
      }
    },

    methods: {

        // 歌手单曲
        getSingerSongs(){
            let id = this.artistId
            singerSongsAPI({id}).then(res => {
                // console.log('歌手单曲',res)
                // 赋值歌手数据
                this.artistData = res.data.artist
                if(res.data.artist.alias.length !=0){
                    // 赋值英语名字
                    this.alias = res.data.artist.alias
                }
                // 赋值歌手热门歌曲数据
                this.hotSongs = res.data.hotSongs
            })
        },

        //播放音乐
		PlayMusic(song) {
			// 先检查歌曲是否可用
			checkMusicAPI(song.id)
				.then(res => {
					// 获取歌曲url
					getSongUrlAPI({id : song.id}).then(res => {
						this.$store.dispatch("saveSongUrl", res.data.data[0].url);
					});
          songInfoAPI({ids : song.id}).then(res =>{
            // console.log('detail',res)
            // 更新播放状态
					  this.$store.dispatch("changePlayState", true);
					  //提交vuex保存当前歌曲详情
					  this.$store.dispatch("saveSongDetail", res.data.songs[0]);
					  // 提交vuex添加到播放列表
					  this.$store.dispatch("addPlayinglist", res.data.songs[0]);
            // console.log('nowSongDetail',this.nowSongDetail)
          })
				})
				.catch(err => {
          console.log(err);
					this.$message({
						message: "暂时无法播放，换首试试",
						type: "warning",
						center: true,
					});
				});
		},
    },

}
</script>

<style lang="less" scoped>
.artist-container{
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 1200px;
    margin: 35px 50px;

    .artist-wrap{
        display: flex;

        .img-wrap{
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 30px;

            img{
                width: 230px;
                height: 230px;
            }
        }

        .artist-info{
            >div{
                margin-top: 20px;
            }

            .author-wrap .alias-wrap{
                display: flex;
                margin-top: 10px;
            }

            .alias-wrap span:not(:last-child){
                margin-right: 10px;
            }

            .creation-wrap span:not(:last-child){
                margin-right: 10px;
            }

            .desc-wrap p{
                font-size: 15px;
                color:darkslategray;
                /* 调整一下字间距 */
                letter-spacing : 1px;
            }
        }
    }

    .name-wrap{
        font-size: 15px;
        width: 75%;

        .first-title{
            text-align: left;
        }
    }
    
    .el-table{
        .song-wrap{
            display: flex;
            align-items: center;
            justify-content: center;

            .second-title{
                overflow: hidden;
                display: -webkit-box; 
                -webkit-box-orient : vertical;
                -webkit-line-clamp: 1; /*  最多1行 */
                text-overflow: ellipsis;  /* 多余的文字显示为省略号 */
                font-size: 5px;
                color: #888482;
                text-align: left;
            }
        }
    }
}


@media screen and (max-width : 500px){
    .artist-container{
        margin: 0;
    }

    .artist-container .artist-wrap .img-wrap img{
        width: 150px;
        height: 150px;
    }

    .artist-container .artist-wrap .artist-info > div span{
        font-size: 12px;
    }

    .artist-container .artist-info .desc-wrap{
        display: -webkit-box;
        -webkit-line-clamp: 4;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
    }

    .artist-container .artist-info .desc-wrap p{
        font-size: 12px;
    }

    .artist-container .td-title .td-wrap{
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        font-size: 12px;
    }

    .artist-container .td-title .td-wrap:nth-last-child(1){
        padding-left: 5px;
      }
    
    .artist-container .el-table th:nth-last-child(1){
      padding-left: 5px;
    }

    .artist-container .name-wrap .first-title{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
</style>