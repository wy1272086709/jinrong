<template>
	
	
		<view class="category-component-clazz">
			
			<view class="strategy-group-name">
				{{categoryObject.title}}
			</view>
			
			<strategy-component-item :item="item"  v-for="item in categoryObject.slist" :key="item.id">
				<slot />
			</strategy-component-item>
		</view>
</template>

<script>
	import strategyComponentItem from '@/common/strategy-component-item.vue';
	let categoryList =  [
		
	];
	export default {
		props:{
			categoryObject: {
				default() {
					return {};
				} ,
				type: Object	
			},
			isLastElement: {
				type: Boolean,
				default: false
			}
		},
		components: {
			strategyComponentItem
		},
		watch:{
			
		},
		data() {
			return {
				
			}
		},
		created() {
			console.log('receive Props:'+JSON.stringify(this.categoryObject))
		},
		computed:{
			
		},
		methods: {
			totalAmount(index) {
				console.log('index', index);
				console.log('categoryList', this.categoryList);
				if(this.isShowTotalMount == 1) {
					return this.categoryList[index].total_amount;
				}
				const len = this.categoryList[index].total_amount.length;
				return "*".repeat(len);
			},
			switchShow(index) {
				this.categoryList[index].isOpenEyes = 1- this.categoryList[index].isOpenEyes;
			},
			
		}
	}
</script>

<style lang="scss">
	
</style>
