"use strict";(self["webpackChunkcloud_music"]=self["webpackChunkcloud_music"]||[]).push([[712],{2712:function(t,a,s){s.r(a),s.d(a,{default:function(){return m}});var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"playlist-container"},[s("div",{staticClass:"top-wrap"},[s("div",{staticClass:"img-wrap"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.playlist.coverImgUrl,expression:"playlist.coverImgUrl"}],attrs:{alt:""}})]),s("div",{staticClass:"info-wrap"},[s("p",{staticClass:"title"},[t._v(t._s(t.playlist.name))]),s("div",{staticClass:"author-wrap"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.playlist.creator.avatarUrl,expression:"playlist.creator.avatarUrl"}],staticClass:"avatar"}),s("span",{staticClass:"name"},[t._v(t._s(t.playlist.creator.nickname))]),s("span",{staticClass:"time"},[t._v(t._s(t._f("LocaleDateString")(t.playlist.createTime))+" 创建")])]),s("div",{staticClass:"play-wrap"},[s("span",{staticClass:"iconfont icon-circle-play"}),s("span",{staticClass:"text",on:{click:t.PlayAll}},[t._v("播放全部")])]),s("div",{staticClass:"tag-wrap"},[s("span",{staticClass:"title"},[t._v("标签:")]),s("ul",t._l(t.playlist.tags,(function(a,e){return s("li",{key:e},[t._v(" "+t._s(a)+" ")])})),0)]),s("div",{staticClass:"desc-wrap"},[s("span",{staticClass:"title"},[t._v("简介:")]),s("span",{staticClass:"desc"},[t._v(" "+t._s(t.playlist.description)+" ")])])])]),s("el-tabs",{model:{value:t.activeIndex,callback:function(a){t.activeIndex=a},expression:"activeIndex"}},[s("el-tab-pane",{attrs:{label:"歌曲列表",name:"1"}},[s("table",{staticClass:"el-table playlist-table"},[s("thead",[s("th"),s("th"),s("th",[t._v("音乐标题")]),s("th",[t._v("歌手")]),s("th",[t._v("专辑")]),s("th",[t._v("时长")])]),s("tbody",t._l(t.playlist.tracks,(function(a,e){return s("tr",{key:e,staticClass:"el-table__row",on:{dblclick:function(s){return t.PlayMusic(a)}}},[s("td",[t._v(t._s(e+1))]),s("td",[s("div",{staticClass:"img-wrap"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:a.al.picUrl,expression:"item.al.picUrl"}],attrs:{alt:""}}),s("span",{staticClass:"iconfont icon-play",on:{click:function(s){return t.PlayMusic(a)}}})])]),s("td",[s("div",{staticClass:"song-wrap"},[s("div",{staticClass:"name-wrap"},[s("span",[t._v(t._s(a.name))]),s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"添加到播放列表",enterable:!1,placement:"bottom"}},[s("span",{staticClass:"iconfont add-music icon-add-list",on:{click:function(s){return t.AddMusic(a)}}})])],1)])]),s("td",{staticClass:"td-title"},[s("div",{staticClass:"td-wrap"},[t._v(" "+t._s(a.ar[0].name)+" ")])]),s("td",{staticClass:"td-title"},[s("div",{staticClass:"td-wrap"},[t._v(" "+t._s(a.al.name)+" ")])]),s("td",{staticClass:"td-title"},[s("div",{staticClass:"td-wrap"},[t._v(" "+t._s(t._f("formatDuration")(a.dt))+" ")])])])})),0)])]),s("el-tab-pane",{attrs:{label:"评论("+(t.commentInfo.total+t.commentInfo.hotComments.length)+")",name:"2"}},[t.commentInfo.hotComments.length>0?s("div",{staticClass:"comment-wrap"},[s("p",{staticClass:"title"},[t._v(" 热门评论"),s("span",{staticClass:"number"},[t._v(t._s(t.commentInfo.hotComments.length))])]),s("div",{staticClass:"comments-wrap"},t._l(t.commentInfo.hotComments,(function(a,e){return s("div",{key:e,staticClass:"item"},[s("div",{staticClass:"icon-wrap"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:a.user.avatarUrl,expression:"item.user.avatarUrl"}],attrs:{alt:""}})]),s("div",{staticClass:"content-wrap"},[s("div",{staticClass:"content"},[s("span",{staticClass:"name"},[t._v(t._s(a.user.nickname)+"：")]),s("span",{staticClass:"comment"},[t._v(t._s(a.content))])]),a.beReplied[0]?s("div",{staticClass:"re-content"},[s("span",{staticClass:"name"},[t._v(" "+t._s(a.beReplied[0].user.nickname)+"：")]),s("span",{staticClass:"comment"},[t._v(" "+t._s(a.beReplied[0].content)+" ")])]):t._e(),s("div",{staticClass:"date"},[s("span",[t._v(" "+t._s(t._f("LocaleDateString")(a.time))+" ")]),s("span",{staticClass:"iconfont icon-zan float-right"},[t._v(" "+t._s(a.likedCount)+" ")])])])])})),0)]):t._e(),t.commentInfo.comments.length>0?s("div",{staticClass:"comment-wrap"},[s("p",{staticClass:"title"},[t._v(" 最新评论"),s("span",{staticClass:"number"},[t._v(t._s(t.commentInfo.total))])]),s("div",{staticClass:"comments-wrap"},t._l(t.commentInfo.comments,(function(a,e){return s("div",{key:e,staticClass:"item"},[s("div",{staticClass:"icon-wrap"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:a.user.avatarUrl,expression:"item.user.avatarUrl"}],attrs:{alt:""}})]),s("div",{staticClass:"content-wrap"},[s("div",{staticClass:"content"},[s("span",{staticClass:"name"},[t._v(t._s(a.user.nickname)+"：")]),s("span",{staticClass:"comment"},[t._v(t._s(a.content))])]),a.beReplied[0]?s("div",{staticClass:"re-content"},[s("span",{staticClass:"name"},[t._v(t._s(a.beReplied[0].user.nickname)+"：")]),s("span",{staticClass:"comment"},[t._v(t._s(a.beReplied[0].content))])]):t._e(),s("div",{staticClass:"date"},[t._v(t._s(t._f("LocaleDateString")(a.time)))])])])})),0)]):t._e(),s("el-pagination",{attrs:{"hide-on-single-page":!0,background:"","current-page":t.page,"pager-count":5,"page-size":10,layout:"prev, pager, next",total:t.commentInfo.total},on:{"current-change":t.handleCurrentChange}})],1)],1)],1)},i=[],n=s(7496),l={name:"playlist",data(){return{activeIndex:"1",total:0,page:1,playlist:{creator:{avatarUrl:""}},commentInfo:{comments:[],hotComments:[],total:0}}},created(){this.GetLists(),this.GetComments()},methods:{PlayMusic(t){(0,n.mo)({id:t.id}).then((a=>{null!=a.data.data[0].url?(this.$store.dispatch("saveSongUrl",a.data.data[0].url),(0,n.oN)({ids:t.id}).then((t=>{this.$store.dispatch("changePlayState",!0),this.$store.dispatch("saveSongDetail",t.data.songs[0]),this.$store.dispatch("addPlayinglist",t.data.songs[0])}))):this.$message({message:"暂时没有版权播放，换首试试",type:"warning",center:!0})})).catch((t=>{console.log(t),this.$message({message:"暂时没有版权播放，换首试试",type:"warning",center:!0})}))},AddMusic(t){this.$store.dispatch("addPlayinglist",t),this.$message({message:"已添加到播放列表",type:"success",center:!0})},handleCurrentChange(t){this.page=t,this.GetComments()},async GetLists(){let t={id:this.$route.query.q,limit:10,offset:10*(this.page-1)};(0,n.E4)(t).then((t=>{this.playlist=t.data.playlist}))},AddAplayer(){},PlayAll(){},async GetComments(){let t={id:this.$route.query.q,limit:10,offset:10*(this.page-1)};(0,n.hE)(t,"playlist").then((t=>{if(this.page>1)this.commentInfo.comments=t.data.comments;else{let a={comments:t.data.comments,total:t.data.total};a.hotComments=t.data.hotComments||t.data.topComments,this.commentInfo=a}}))}}},c=l,o=s(3736),r=(0,o.Z)(c,e,i,!1,null,"b8be43ca",null),m=r.exports}}]);
//# sourceMappingURL=712.94266834.js.map