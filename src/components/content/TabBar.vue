<template>
	<div class="tabbar">
		<div class="tab">
			<div class="tab-item" v-for="(item, index) in tabitems" :key="index" :class="{ active: currentIndex == index }" @click="tabItemClick(index)">
				{{ item.name }}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "TabBar",
	props: {
		tabitems: {
			type: Array,
			default() {
				return [];
			},
		},
	},
	data() {
		return {
			currentIndex: 0,
		};
	},
	methods: {
		tabItemClick(index) {
			this.currentIndex = index;
			this.$emit("tabItemClick", index);
		},
	},
};
</script>

<style lang="less" scoped>
.tabbar {
	.tab {
		display: flex;
		justify-content: space-between;
		cursor: pointer;
		.tab-item {
			border: solid 1px #ddd;
			padding: 5px 25px;
		}
		.tab-item:nth-child(1) {
			border-right: 0;
		}
	}
}
.active {
	background: #909399;
	color: #fff;
}
</style>
