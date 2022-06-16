const mutations = {
	/* 更新登录状态 */
	updateLogin(state, payload) {
		state.isLogin = payload;
	},
	/* 保存用户信息 */
	saveUserInfo(state, payload) {
		state.userInfo = payload;
	},
	/* 保存用户歌单 */
	saveUserSongList(state, payload) {
		state.userSongList = payload;
	},

	/* 保存用户关注列表 */
	saveUserFollowsList(state, payload) {
		state.userFollowsList = payload;
	},

	/* 保存用户的收藏 */
	// 收藏的专辑
	saveFavoriteAlbum(state, payload) {
		state.subAlbumlist = payload;
	},
	// 歌手
	saveFavoriteSinger(state, payload) {
		state.subSingerlist = payload;
	},
	// mv
	saveFavoriteMv(state, payload) {
		state.subMvlist = payload;
	},
	// 用户喜欢的音乐id列表
	saveLikeSongIds(state, payload) {
		state.likeSongIds = payload;
		localStorage.setItem("likeSongIds", JSON.stringify(state.likeSongIds));
	},

	/* 
	音乐播放
	 */
	// 改变音乐播放状态
	changePlayState(state, payload) {
		state.isPlaying = payload;
	},

	// 保存歌曲url
	saveSongUrl(state, payload) {
		state.songUrl = payload;
	},

	// 保存当前播放歌曲详情,并且添加当前播放歌曲到播放历史记录
	saveSongDetail(state, payload) {
		state.nowSongDetail = payload;
		localStorage.setItem("nowSongDetail", JSON.stringify(state.nowSongDetail));
		// 添加当前播放歌曲到播放历史记录
		let index = state.historyPlay.findIndex(item => {
			return item.id == payload.id;
		});
		//如果列表不存在相同的歌曲 再添加到播放历史列表
		if (index == -1) {
			state.historyPlay.unshift(payload);
			// JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串
			localStorage.setItem("historyPlay", JSON.stringify(state.historyPlay));
		}
	},

	//添加单曲到当前播放列表
	addPlayinglist(state, song) {
		// 列表查找相同的歌曲
		let index = state.playingList.findIndex(item => {
			return item.id == song.id;
		});
		//如果列表不存在相同的歌曲 再添加到播放列表
		if (index == -1) {
			state.playingList.unshift(song);
			localStorage.setItem("playingList", JSON.stringify(state.playingList));
		}
	},

	// 点击播放全部，添加当前歌单所有歌曲到播放列表
	addAllSong(state, payload) {
		state.playingList = payload;
		localStorage.setItem("playingList", JSON.stringify(state.playingList));
	},

	// 删除播放列表单曲
	deleteSong(state, songId) {
		let index = state.playingList.findIndex(item => {
			return songId == item.id;
		});
		state.playingList.splice(index, 1);
		localStorage.setItem("playingList", JSON.stringify(state.playingList));
	},

	// 清空播放列表
	deleteAll(state) {
		state.playingList = [];
		state.songUrl = "";
		state.nowSongDetail = {};
		state.isPlaying = false;
		localStorage.removeItem("playingList");
		localStorage.removeItem("nowSongDetail");
		localStorage.removeItem("currentRow");
	},

	// 清空历史记录
	deleteAllHistory(state) {
		state.historyPlay = [];
		localStorage.setItem("historyPlay", JSON.stringify(state.historyPlay));
	},

	// 删除历史记录单曲
	deleteHistory(state, songId) {
		let index = state.historyPlay.findIndex(item => {
			return songId == item.id;
		});
		state.historyPlay.splice(index, 1);
		localStorage.setItem("historyPlay", JSON.stringify(state.historyPlay));
	},

	//是否显示当前播放歌曲详情页
	showSongDetail(state) {
		state.isShowSongDetail = !state.isShowSongDetail;
	},

	// 保存当前歌曲播放的实时秒数
	saveCurrentSeconds(state, payload) {
		state.currentSecond = payload;
		localStorage.setItem("currentSecond", JSON.stringify(state.currentSecond));
	},

	//保存当前播放歌词行数
	saveCurrentRow(state, payload) {
		state.currentRow = payload;
		localStorage.setItem("currentRow", JSON.stringify(state.currentRow));
	},

	/* 
	浮动歌词
	 */
	//当前播放歌曲歌词 用于浮动歌词显示
	saveCurrentLyric(state, payload) {
		state.currentLyric = payload;
	},
	// 是否显示浮动歌词
	showFloatLyric(state) {
		state.showFloatLyric = !state.showFloatLyric;
	},
	// 更新当前下载的音乐信息
	updateDownloadMusicInfo(state, payload) {
		state.downloadMusicInfo = payload;
	},
};
export default mutations;
