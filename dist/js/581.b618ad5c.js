"use strict";(self["webpackChunkcloud_music"]=self["webpackChunkcloud_music"]||[]).push([[581],{6581:function(t,a,s){s.r(a),s.d(a,{default:function(){return p}});var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"result-container",attrs:{"element-loading-background":"rgba(0, 0, 0, 0)"}},[s("div",{staticClass:"title-wrap"},[s("h2",{staticClass:"title"},[t._v(t._s(t.keywords))]),s("span",{staticClass:"sub-title"},[t._v("找到 "+t._s(t.total)+" 个结果")])]),s("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(a){t.activeName=a},expression:"activeName"}},[s("el-tab-pane",{attrs:{label:"歌曲",name:"first"}},[s("table",{staticClass:"el-table"},[s("thead",[s("th"),s("th",[t._v("音乐标题")]),s("th",[t._v("歌手")]),s("th",[t._v("专辑")]),s("th",[t._v("时长")])]),s("tbody",t._l(t.songsList,(function(a,e){return s("tr",{key:e,staticClass:"el-table__row",on:{dblclick:function(s){return t.PlayMusic(a)}}},[s("td",[t._v(t._s(t.pageSize*(t.page-1)+e+1))]),s("td",[s("div",{staticClass:"song-wrap"},[s("div",{staticClass:"name-wrap"},[s("div",{staticClass:"first-title"},[t._v(t._s(a.name)),0!=a.mvid?s("span",{staticClass:"iconfont icon-mv"}):t._e()]),0!=a.alia.length?s("div",{staticClass:"second-title"},[t._v(t._s(a.alia[0]))]):t._e()])])]),s("td",[t._v(t._s(a.ar[0].name))]),s("td",[t._v(t._s(a.al.name))]),s("td",[t._v(t._s(t._f("formatDuration")(a.dt)))])])})),0)])]),s("el-tab-pane",{attrs:{label:"歌单",name:"second"}},[s("div",{staticClass:"items"},t._l(t.playList,(function(a,e){return s("div",{key:e,staticClass:"item",on:{click:function(s){return t.toPlaylist(a.id)}}},[s("div",{staticClass:"img-wrap"},[s("div",{staticClass:"num-wrap"},[t._v(" 播放量: "),s("span",{staticClass:"num"},[t._v(t._s(t._f("ellipsisPlayVolume")(a.playCount)))])]),s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:a.coverImgUrl,expression:"item.coverImgUrl"}],attrs:{alt:""}}),s("span",{staticClass:"iconfont icon-play"})]),s("p",{staticClass:"name"},[t._v(t._s(a.name))])])})),0)]),s("el-tab-pane",{attrs:{label:"MV",name:"third"}},[s("div",{staticClass:"items mv"},t._l(t.mvList,(function(a,e){return s("div",{key:e,staticClass:"item",on:{click:function(s){return t.toMV(a.id)}}},[s("div",{staticClass:"img-wrap"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:a.cover,expression:"item.cover"}],attrs:{alt:""}}),s("span",{staticClass:"iconfont icon-play"}),s("div",{staticClass:"num-wrap"},[s("div",{staticClass:"iconfont icon-play"}),s("div",{staticClass:"num"},[t._v(t._s(t._f("ellipsisPlayVolume")(a.playCount)))])]),s("span",{staticClass:"time"},[t._v(t._s(t._f("formatDuration")(a.duration)))])]),s("div",{staticClass:"info-wrap"},[s("div",{staticClass:"name"},[t._v(t._s(a.name))]),s("div",{staticClass:"singer"},[t._v(t._s(a.artistName))])])])})),0)])],1),s("el-pagination",{attrs:{"hide-on-single-page":!0,background:"","current-page":t.page,"page-size":t.pageSize,layout:"prev, pager, next",total:t.total},on:{"current-change":t.currentPageChange}})],1)},i=[],l=(s(6166),s(2741)),n=s(7871),r=s(9059),o={name:"result",data(){return{keywords:"",activeName:"first",songsList:[],playList:[],mvList:[],page:1,total:0,pageSize:10,type:1,showAddBall:!1}},created(){this.keywords=this.$route.query.q,this.getTableData()},watch:{$route(t){this.keywords=t.query.q,this.total=0,this.page=1,this.getTableData(this.type)}},methods:{...(0,l.nv)(["getAudio"]),currentPageChange(t){this.page=t,this.getTableData(this.type)},handleClick(t){let a=t.label;switch(a){case"歌曲":this.total=0,this.page=1,this.type=1,this.pageSize=10,this.getTableData();break;case"歌单":this.total=0,this.page=1,this.type=1e3,this.pageSize=10,this.getTableData(this.type);break;case"MV":this.total=0,this.page=1,this.type=1004,this.pageSize=8,this.getTableData(this.type);break}},getTableData(t=1){let a={keywords:this.keywords,limit:this.pageSize,offset:(this.page-1)*this.pageSize,type:t};(0,n.OF)(a).then((a=>{let s=[];switch(t){case 1:s=a.data.result.songs,0==this.total&&(this.total=a.data.result.songCount),this.songsList=s;break;case 1e3:s=a.data.result.playlists,0==this.total&&(this.total=a.data.result.playlistCount),this.playList=s;break;case 1004:s=a.data.result.mvs,0==this.total&&(this.total=a.data.result.mvCount),this.mvList=s;break}}))},PlayMusic(t){(0,r.Ai)(t.id).then((a=>{(0,r.TS)(t.id).then((t=>{this.$store.dispatch("saveSongUrl",t.data.data[0].url)})),(0,r.Pc)(t.id).then((t=>{console.log("detail",t),this.$store.dispatch("changePlayState",!0),this.$store.dispatch("saveSongDetail",t.data.songs[0]),this.$store.dispatch("addPlayinglist",t.data.songs[0])}))})).catch((t=>{console.log(t),this.$message({message:"暂时无法播放，换首试试",type:"warning",center:!0})}))},toPlaylist(t){this.$router.push(`/playlist?q=${t}`)},toMV(t){this.$router.push(`/mv?q=${t}`)}}},c=o,h=s(3736),d=(0,h.Z)(c,e,i,!1,null,null,null),p=d.exports}}]);
//# sourceMappingURL=581.b618ad5c.js.map