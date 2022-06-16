<template>
	<div
		ref="progressBox"
		class="progressBox"
		:style="progressBoxStyle"
		@mousemove="setTooltip"
		@mouseleave="progressBoxLeave"
		@click="changeProgressBar"
	>
		<!-- 进度条 -->
		<div class="progressBar" ref="progressBar" :style="progressBarStyle">
			<div class="activeBar" v-if="isActiveBar"></div>
		</div>
		<!-- 进度条上圆形按钮 -->
		<transition name="el-fade-in-linear">
			<div
				class="radiusBtn"
				ref="radiusBtn"
				:style="radiusBtnStyle"
				v-show="showRadiusBtn ? showRadiusBtn : hoverShowRadiusBtn"
				@mouseenter="radiusBtnHover"
				@mouseleave="radiusBtnLeave"
				@mousedown="dragProgressBar"
			></div>
		</transition>
		<!--提示框  -->
		<transition name="el-fade-in-linear">
			<div class="tooltip" ref="tooltip" :style="{ bottom: `${progressSize + 10}px` }" v-show="showToolTip && hoverShowToolTip">
				{{ tooltipTxt }}
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	name: "Progress",
	props: {
		// 百分比进度
		percent: {
			type: Number,
			default: 0,
		},
		// 进度条尺寸
		progressSize: {
			type: [Number, String],
			default: 6,
		},
		// 是否一直显示圆形按钮
		showRadiusBtn: {
			type: Boolean,
			default: true,
		},
		// 是否禁用进度条
		disabled: {
			type: Boolean,
			default: false,
		},
		// 是否显示提示框
		showToolTip: {
			type: Boolean,
			default: true,
		},
		// 是否格式化提示框
		isFormatTooltip: {
			type: Boolean,
			default: false,
		},
		// 格式化提示框函数
		formatTooltip: {
			type: Function,
		},
		// 是否显示activeBar
		isActiveBar: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			tooltipTxt: 0, //悬浮提示框文本
			hoverShowRadiusBtn: false, //鼠标经过显示进度条圆按钮
			radiusBtnActive: false, //圆按钮是否处于活跃
			hoverShowToolTip: false, //鼠标经过显示tooltip
			isDrag: false, //是否正在拖拽进度条
		};
	},
	mounted() {
		this.setProgressBar(this.percent);
	},
	model: {
		prop: "percent",
		event: "onChange",
	},
	computed: {
		// 进度条盒子样式
		progressBoxStyle() {
			let style = {
				height: `${this.progressSize}px`,
				borderRadius: `${this.progressSize}px`,
				cursor: this.disabled ? "not-allowed" : "pointer",
			};
			return style;
		},
		// 进度条样式
		progressBarStyle() {
			let style = {
				// width: `${this.percent}%`,
				borderRadius: `${this.progressSize}px`,
				transition: this.isDrag ? "none" : "all 0.3s ease-out",
				cursor: this.disabled ? "not-allowed" : "pointer",
			};
			return style;
		},
		// 圆形按钮样式
		radiusBtnStyle() {
			let style = {
				// left: `${this.percent}%`,
				width: this.radiusBtnActive ? `${this.radiusBtnSize + 2}px` : `${this.radiusBtnSize}px`,
				height: this.radiusBtnActive ? `${this.radiusBtnSize + 2}px` : `${this.radiusBtnSize}px`,
				transform: `translate(${-this.radiusBtnSize + 5}px,-50%)`,
				transition: this.isDrag ? "none" : "all 0.3s ease-out",
				cursor: this.disabled ? "not-allowed" : "pointer",
			};
			return style;
		},
		// 进度条圆形按钮大小，根据进度条大小动态计算
		radiusBtnSize() {
			let radiusBtnSize = this.progressSize >= 8 ? this.progressSize * 2 : this.progressSize * 2.5;
			radiusBtnSize = this.progressSize <= 3 ? this.progressSize * 4 : radiusBtnSize;
			radiusBtnSize = radiusBtnSize < 12 ? 12 : radiusBtnSize;
			return radiusBtnSize;
		},
	},
	methods: {
		// 获取鼠标在进度条上的位置，返回一个百分比值
		getMousePositon(e) {
			let progressBoxWidth = this.$refs.progressBox.getBoundingClientRect().width; //进度条总宽度
			let progressBoxLeft = this.$refs.progressBox.getBoundingClientRect().left; //进度条距左边距离
			let mousePositon = e.clientX - progressBoxLeft;
			mousePositon = mousePositon <= 0 ? 0 : mousePositon; //设置最小边界值
			mousePositon = mousePositon >= progressBoxWidth ? progressBoxWidth : mousePositon; //设置最大边界值
			let percentLength = Math.ceil((mousePositon * 100) / progressBoxWidth);
			return percentLength;
		},
		// 设置进度条长度
		setProgressBar(percent) {
			this.$refs.progressBar.style.width = percent + "%";
			this.$refs.radiusBtn.style.left = percent + "%";
		},
		// 鼠标在进度条上移动时,设置tooltip位置,设置当前位置百分比数值
		setTooltip(e) {
			this.hoverShowRadiusBtn = true;
			if (this.disabled) return; //禁用进度条
			if (!this.showToolTip) return; // 父组件传值控制不显示tooltip
			this.hoverShowToolTip = true;
			let percentLength = this.getMousePositon(e);
			this.$refs.tooltip.style.left = percentLength + "%";
			this.tooltipTxt = this.isFormatTooltip
				? this.formatTooltip
					? this.formatTooltip(percentLength)
					: percentLength
				: percentLength;
		},
		//改变进度条progressBar
		changeProgressBar(e) {
			if (this.disabled) return;
			let percentLength = this.getMousePositon(e);
			this.$emit("onChange", percentLength);
		},
		// 鼠标经过圆形按钮
		radiusBtnHover() {
			this.hoverShowRadiusBtn = true;
			this.radiusBtnActive = true;
		},
		// 鼠标离开圆形按钮
		radiusBtnLeave() {
			if (!this.isDrag) {
				this.hoverShowRadiusBtn = false;
				this.radiusBtnActive = false;
			}
		},
		// 鼠标按下圆形按钮拖拽进度条
		dragProgressBar() {
			//禁用进度条
			if (this.disabled) return;
			// 鼠标移动，拖拽进度条
			let move = e => {
				this.isDrag = true;
				let percentLength = this.getMousePositon(e);
				this.setProgressBar(percentLength);
				this.setTooltip(e);
			};
			// 鼠标松开，就停止拖拽，让鼠标移动事件解除,并且改变进度条
			let moveup = e => {
				this.isDrag = false;
				document.removeEventListener("mousemove", move);
				this.changeProgressBar(e);
				this.progressBoxLeave();
				this.radiusBtnActive = false;
				document.removeEventListener("mouseup", moveup);
			};
			document.addEventListener("mousemove", move);
			document.addEventListener("mouseup", moveup);
		},
		// 鼠标离开进度条栏
		progressBoxLeave() {
			this.hoverShowToolTip = false;
			this.hoverShowRadiusBtn = false;
		},
	},
	watch: {
		percent(percent) {
			if (!this.isDrag) {
				this.setProgressBar(percent);
			}
		},
	},
};
</script>

<style lang="less" scoped>
// 进度条背景盒子
.progressBox {
	position: relative;
	width: 100%;
	height: 6px;
	background-color: #eee;
	border-radius: 6px;
}
/* 已播放的进度条颜色 */
.progressBar {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	width: 0;
	// background-color: var(--themeColor);
	background-color: rgb(236, 65, 65);
	border-radius: 6px;
	transition: all 0.3s ease-out;
}
// 进度条小球按钮
.radiusBtn {
	position: absolute;
	top: 50%;
	left: 0;
	border-radius: 50%;
	// border: 2px solid var(--themeColor);
	border: 2px solid rgb(236, 65, 65);;
	background: #fff;
	transition: all 0.3s ease-out;
	&::after {
		content: "";
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 40%;
		height: 40%;
		border-radius: 50%;
		// background-color: var(--themeColor);
		background-color: rgb(236, 65, 65);;
		transition: all 0.3s ease-out;
	}
}
/* 悬停显示百分比 */
.tooltip {
	position: absolute;
	transform: translateX(-50%);
	background-color: #303133;
	color: #fff;
	font-size: 12px;
	padding: 5px 6px;
	border-radius: 4px;
	&::after {
		content: "";
		position: absolute;
		top: 22px;
		left: 50%;
		transform: translateX(-50%);
		width: 0;
		height: 0;
		border: 8px solid;
		border-left-color: transparent;
		border-top-color: #303133;
		border-right-color: transparent;
		border-bottom-color: transparent;
	}
}
/* 进度活跃条动画 */
.activeBar {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: #000;
	border-radius: 6px;
	animation: activebar 2s ease-out infinite;
}
@keyframes activebar {
	0% {
		opacity: 0.3;
		width: 0;
	}
	100% {
		opacity: 0;
		width: 100%;
	}
}
</style>
