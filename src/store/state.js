const state = {
	// 是否登录
	isLogin: sessionStorage.getItem("isLogin") ? JSON.parse(sessionStorage.getItem("isLogin")) : false,
	// 是否保存token 如果缓存中有就取出来，没有则为空
	token : sessionStorage.getItem("token") ? JSON.parse(sessionStorage.getItem("token")) : null,
	// 是否保存cookie 如果缓存中有就取出来，没有则为空
	cookie : sessionStorage.getItem("cookie") ? JSON.parse(sessionStorage.getItem("cookie")) : null,
	// 用户信息 如果缓存中有就取出来，没有则为空
	userInfo: sessionStorage.getItem("userInfo") ? JSON.parse(sessionStorage.getItem("userInfo")) : { username : '', avater : '', userid : ''},
	// 用户私人歌单
	userSongList: localStorage.getItem("userSongList") ? JSON.parse(localStorage.getItem("userSongList")) : [],
	// 用户喜欢的音乐id列表
	likeSongIds: localStorage.getItem("likeSongIds") ? JSON.parse(localStorage.getItem("likeSongIds")) : [],
	// 用户的关注列表
	userFollowsList: [],
	// 用户收藏的专辑 歌手 MV视频
	subAlbumlist: [],
	subSingerlist: [],
	subMvlist: [],

	// 登录状态
    loginStatus: false,
    showLogin: false,
	// 移动端展开栏状态
	navPhoneOpen : false,

	/* 
	音乐播放
	 */
	// 音乐播放状态
	isPlaying: false,
	// 当前下载音乐信息
	downloadMusicInfo: {},
	// 是否显示当前歌曲详情页
	isShowSongDetail: false,
	// 是否显示悬浮歌词
	showFloatLyric: false,
	// 当前播放歌曲歌词
	currentLyric: [],
	//当前歌曲url
	songUrl: " ",
	// 当前歌曲详情
	nowSongDetail: localStorage.getItem("nowSongDetail") ? JSON.parse(localStorage.getItem("nowSongDetail")) : { },
	//正在播放列表
	playingList: localStorage.getItem("playingList") ? JSON.parse(localStorage.getItem("playingList")) : [],
	// 历史播放列表
	historyPlay: localStorage.getItem("historyPlay") ? JSON.parse(localStorage.getItem("historyPlay")) : [],
	// 当前歌曲播放的实时秒数
	currentSecond: localStorage.getItem("currentSecond") ? JSON.parse(localStorage.getItem("currentSecond")) : 0,
	//当前歌曲播放的歌词行
	currentRow: localStorage.getItem("currentRow") ? JSON.parse(localStorage.getItem("currentRow")) : 0,
}

export default state;
