<template>
	<view :style="colStyle">
		<text v-if="columnType == 'text'">{{columnData}}</text>
		<label v-if="columnType == 'label'">{{columnData}}</label>
		<slot v-if="columnType == 'custom'" />
	</view>
</template>

<script>
	export default {
		props: {
			// 默认text 类型, input 
			columnType: {
				type: String,
				default: 'text'
			},
			// 默认为空
			columnData: {
				type: String,
				default: ''
			},
			customStyle: {
				
			},
			width : {
				type: String,
				default: ''
			}
		},
		computed: {
			colStyle() {
				return { width: this.width ,...this.customStyle };
			}
		},
		created() {
			
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>

</style>
