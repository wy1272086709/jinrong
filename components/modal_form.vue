<template>
	<view>
		<u-modal v-model="showModal" title="">
			<view class="slot-content">
				<view class="slot-content-row">
					<label>数量</label>
					<input v-model="quality" />
				</view>
				<view class="slot-content-row">
					<label>价格</label>
					<input v-model="price" />
				</view>
				<view class="slot-content-row">
					<label>其他</label>
					<input v-model="other" />
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		props: {
			
			
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">

</style>
