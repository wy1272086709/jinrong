<template>
	<view class="overall_category_view">
		<category-component-item v-for="(category,index) in categoryList" @tap="gotoCategoryView(category.cgroup_id,category.group_id)" :is-last-element = "index == categoryList.length-1" :category="category"  :key="category.nid">
		</category-component-item>
	</view>
</template>

<script>
	import categoryComponentItem from './category_component_item.vue';
	let categoryList =  [
		
	];
	export default {
		components:{
			categoryComponentItem
		},
		props:{
			categoryList: {
				default: categoryList,
				type: Array,
			}
		},
		data() {
			return {
				isShowExtra: false,
				transformLeftStr: 'translateX(0%, 0%)',
				transformRightStr: 'translateX(-100%, 0%)'
			}
		},
		created() {
			
		},
		computed:{
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.overall_category_view {
		display: flex;
		flex-direction: column;
	}
	
	
</style>
