// 用户信息
export const isLogin = state => state.isLogin;
export const userInfo = state => state.userInfo;
// 用户歌单
export const userSongList = state => state.userSongList;
// 用户关注列表
export const userFollowsList = state => state.userFollowsList;

// 用户的收藏
export const subAlbumlist = state => state.subAlbumlist;
export const subSingerlist = state => state.subSingerlist;
export const subMvlist = state => state.subMvlist;
export const likeSongIds = state => state.likeSongIds;

/* 音乐播放 */
// 音乐播放状态
export const isPlaying = state => state.isPlaying;
// 当前歌曲url
export const songUrl = state => state.songUrl;
// 当前下载音乐信息
export const downloadMusicInfo = state => state.downloadMusicInfo;
// 当前歌曲详情
export const nowSongDetail = state => state.nowSongDetail;
// 正在播放列表
export const playingList = state => state.playingList;
// 历史记录
export const historyPlay = state => state.historyPlay;
// 是否显示当前歌曲详情页
export const isShowSongDetail = state => state.isShowSongDetail;
// 当前歌曲播放的实时秒数
export const currentSecond = state => state.currentSecond;

// 当前播放歌曲歌词
export const currentLyric = state => state.currentLyric;
export const currentRow = state => state.currentRow;
// 是否显示悬浮歌词
export const showFloatLyric = state => state.showFloatLyric;
