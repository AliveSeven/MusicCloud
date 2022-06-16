const actions = {
	/* 更新登录状态 */
	updateLogin({ commit }, payload) {
		commit("updateLogin", payload);
	},
	/* 保存用户信息 */
	saveUserInfo({ commit }, payload) {
		commit("saveUserInfo", payload);
	},
	/* 保存用户歌单 */
	saveUserSongList({ commit }, payload) {
		commit("saveUserSongList", payload);
	},

	/* 保存用户关注列表 */
	saveUserFollowsList({ commit }, payload) {
		commit("saveUserFollowsList", payload);
	},

	/* 保存用户的收藏 */
	// 专辑
	saveFavoriteAlbum({ commit }, payload) {
		commit("saveFavoriteAlbum", payload);
	},
	// 歌手
	saveFavoriteSinger({ commit }, payload) {
		commit("saveFavoriteSinger", payload);
	},
	//MV
	saveFavoriteMv({ commit }, payload) {
		commit("saveFavoriteMv", payload);
	},
	// 用户喜欢的音乐id列表
	saveLikeSongIds({ commit }, payload) {
		commit("saveLikeSongIds", payload);
	},

	/* 音乐播放 */
	//改变播放状态
	changePlayState({ commit }, payload) {
		commit("changePlayState", payload);
	},
	// 保存歌曲url
	saveSongUrl({ commit }, payload) {
		commit("saveSongUrl", payload);
	},
	// 保存当前播放歌曲详情
	saveSongDetail({ commit }, payload) {
		commit("saveSongDetail", payload);
	},
	//添加单曲到当前播放列表
	addPlayinglist({ commit }, payload) {
		commit("addPlayinglist", payload);
	},
	// 点击播放全部，添加当前歌单所有歌曲到播放列表
	addAllSong({ commit }, payload) {
		commit("addAllSong", payload);
	},
	// 删除播放列表单曲
	deleteSong({ commit }, payload) {
		commit("deleteSong", payload);
	},
	// 清空播放列表
	deleteAll({ commit }) {
		commit("deleteAll");
	},
	// 清空历史记录
	deleteAllHistory({ commit }) {
		commit("deleteAllHistory");
	},
	// 删除历史记录单曲
	deleteHistory({ commit }, payload) {
		commit("deleteHistory", payload);
	},
	// 保存当前歌曲播放的实时秒数
	saveCurrentSeconds({ commit }, payload) {
		commit("saveCurrentSeconds", payload);
	},

	// 保存当前播放歌曲歌词
	saveCurrentLyric({ commit }, payload) {
		commit("saveCurrentLyric", payload);
	},
};
export default actions;
