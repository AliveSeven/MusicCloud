<template>
	<div class="playing-list" id="playing-song-list">
		<div class="top-nav">
			<TabBar :tabitems="tabitems" @tabItemClick="tabItemClick" />
		</div>
		<!-- 播放列表 -->
		<div class="play-list" v-if="activeItem == 0">
			<div class="hd">
				<h4 style="padding: 0px 10px">总{{ playingList.length }}首</h4>
				<span @click="deleteAll"><i class="iconfont icon-delete"></i>清空</span>
			</div>
			<div class="bd">
				<el-table size="mini" :show-header="false" style="width: 100%" :row-class-name="tableRowClassName" :data="playingList" @row-dblclick="playSongClick" empty-text="暂无歌曲">
					<el-table-column width="50">
						<template v-slot="scope">
							<span class="iconfont" :class="isPlaying ? ' icon-voice' : 'icon-jingyin_laba'" v-if="scope.row.id === nowSongDetail.id"></span>
							<span v-else>{{ scope.row.index | formatIndex }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="name" label="歌曲" :show-overflow-tooltip="true" width="100"> </el-table-column>
					<el-table-column prop="ar[0].name" label="歌手" :show-overflow-tooltip="true" width="100">
						<template v-slot="scope">
							<span @click="toSinger(scope.row.ar[0].id)" class="sname">
								{{ scope.row.ar[0].name }}
							</span>
						</template>
					</el-table-column>
					<el-table-column prop="dt" label="时长">
						<template v-slot="scope">
							<span>
								{{ scope.row.dt | formatDuration }}
							</span>
						</template>
					</el-table-column>
					<el-table-column width="60">
						<template v-slot="scope">
							<span class="iconfont icon-guanbi" @click="deleteSong(scope.row)"></span>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<!-- 历史记录 -->
		<div class="history-list" v-if="activeItem == 1">
			<div class="hd">
				<h4 style="padding: 0px 10px">总{{ historyPlay.length }}首</h4>
				<span @click="deleteAllHistory" style="cursor: pointer"><i class="iconfont icon-delete"></i>清空</span>
			</div>
			<div class="bd">
				<el-table size="mini" :show-header="false" style="width: 100%" :row-class-name="tableRowClassName" :data="historyPlay" @row-dblclick="playHistorySong" empty-text="暂无记录">
					<el-table-column width="50">
						<template v-slot="scope">
							<span class="iconfont" :class="isPlaying ? ' icon-voice' : 'icon-jingyin_laba'" v-if="scope.row.id == nowSongDetail.id"></span>
							<span v-else>{{ scope.row.index | formatIndex }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="name" label="歌曲" :show-overflow-tooltip="true" width="100"> </el-table-column>
					<el-table-column prop="ar[0].name" label="歌手" :show-overflow-tooltip="true" width="100">
						<template v-slot="scope">
							<span @click="toSinger(scope.row.ar[0].id)" class="sname">
								{{ scope.row.ar[0].name }}
							</span>
						</template>
					</el-table-column>
					<el-table-column prop="dt" label="时长">
						<template v-slot="scope">
							<span>
								{{ scope.row.dt | formatDuration }}
							</span>
						</template>
					</el-table-column>
					<el-table-column width="60">
						<template v-slot="scope">
							<span class="iconfont icon-guanbi" @click="deleteHistory(scope.row)"></span>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import { getSongUrl, checkMusic,getNowLyric } from "@/utils/playmusic";
import TabBar from "../content/TabBar.vue";
export default {
	name: "PlayingList",
	components: { TabBar },
	computed: {
		...mapGetters(["playingList", "historyPlay", "nowSongDetail", "isPlaying"]),
	},
	data() {
		return {
			tabitems: [{ name: "播放列表" }, { name: "历史记录" }],
			activeItem: 0,
		};
	},
	filters: {
		formatIndex(index) {
			if (index < 9) {
				return "0" + (index + 1);
			} else return index + 1;
		},
	},
	methods: {
		// 顶部tab点击切换
		tabItemClick(index) {
			this.activeItem = index;
		},
		// 播放列表双击播放歌曲
		playSongClick(song) {
			checkMusic(song.id)
				.then(res => {
					// 获取歌曲url
					getSongUrl(song.id).then(res => {
						this.$store.dispatch("saveSongUrl", res.data.data[0].url);
					});
					// 更新播放状态
					this.$store.dispatch("changePlayState", true);
					//提交vuex保存当前歌曲详情
					this.$store.dispatch("saveSongDetail", song);
				})
				.catch(err => {
					this.$message({
						message: "暂时无法播放，换首试试",
						type: "warning",
						center: true,
					});
					this.$store.dispatch("deleteSong", song.id);
				});
		},
		// 删除播放列表单曲
		deleteSong(song) {
			this.$store.dispatch("deleteSong", song.id);
		},
		// 清空播放列表
		deleteAll() {
			this.$store.dispatch("deleteAll");
			this.$store.dispatch("saveCurrentLyric", []);
		},
		// 双击播放历史记录歌曲
		playHistorySong(song) {
			// 播放歌曲
			this.playSongClick(song);
			// 提交vuex添加到播放列表
			this.$store.dispatch("addPlayinglist", song);
		},
		// 清空播放历史记录
		deleteAllHistory() {
			this.$store.dispatch("deleteAllHistory");
		},
		// 删除历史记录单曲
		deleteHistory(song) {
			this.$store.dispatch("deleteHistory", song.id);
		},
		// 实现当前播放歌曲行显示小喇叭
		tableRowClassName({ row, rowIndex }) {
			row.index = rowIndex;
			if (rowIndex % 2 !== 0) {
				return "rowEven";
			}
		},
		// 点击歌手 去往歌手页面
		toSinger(id) {
			this.$router.push(`/artist?q=${id}`);
		},


	},
	mounted() {
		// 点击其他区域(不包括播放器控制栏)关闭播放列表
		let playingList = document.querySelector("#playing-song-list");
		let footer = document.querySelector("#footer");
		document.addEventListener("mousedown", e => {
			if (playingList) {
				if (!playingList.contains(e.target) && !footer.contains(e.target)) {
					this.$emit("closePlayList");
				}
			}
		});
	},
};
</script>

<style lang="less" scoped>
.playing-list {
	position: absolute;
	bottom: 70px;
	right: 0;
	height: calc(100vh - 130px);
	background: #fff;
	border-left: 1px solid #ebebeb;
	box-shadow: -3px 0px 5px 0px #eee;
}
.top-nav {
	display: flex;
	justify-content: center;
	width: 100%;
	height: 24px;
	margin-top: 10px;
}
.hd {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 24px;
	margin: 10px 0;
	padding: 10px 0;
	border-bottom: 1px solid #eee;
	span {
		padding-right: 30px;
		font-size: 14px;
		cursor: pointer;
		&:hover {
			// color: var(--themeColor);
			color: rgb(236, 65, 65);
		}
	}
}
.play-list,
.history-list {
	height: calc(100% - 78px);
	.bd {
		height: 100%;
		overflow-y: scroll;
		.sname {
			cursor: pointer;
			&:hover {
				// color: var(--themeColor);
				color: rgb(236, 65, 65);
			}
		}
		.icon-guanbi:hover {
			// color: var(--themeColor);
			color: rgb(236, 65, 65);
			cursor: pointer;
		}
		.icon-voice,
		.icon-jingyin_laba {
			// color: var(--themeColor);
			color: rgb(236, 65, 65);
		}
	}
}

::-webkit-scrollbar {
	width: 5px;
	height: 12px;
	background-color: #fff;
}
</style>
