<template>
	<view class="select-box">
		<view class="select-wrap">
			<view class="select-current" @tap.stop="openClose">
				<text class="current-name" v-if="!selectedGroupId">{{selectName}}</text>
				<text class="current-name" v-if="selectedGroupId">{{current}}</text>
			</view>
			<!-- max-width:26rpx;max-height: 14rpx; -->
			<view class="select-image" @tap.stop="openClose">
				<uni-icons type="arrowdown" size="20"></uni-icons>
			</view>
		</view>
		<view class="option-list" v-if="isShow" @tap.stop="optionTap" :style="{top:top+'rpx;'}">
			<text class="option" v-if="defaultOptionShow"
			  :data-id="defaultOptionObj.id"
			  :data-name="defaultOptionObj.name">{{defaultOptionObj.name}}
			</text>
			<text class="option"
			  v-for="item in result"
			  :key="item.id"
			  :data-id="item.id"
			  :data-name="item.name">{{item.name}}
			</text>
		</view>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue';
	export default {
		data() {
			return {
				result: [],
				isShow: this.isShowOption,
				defaultOptionObj: {},
				selectName: '',
				
			}
		},
		components: {
			uniIcons
		},
		props: {
		    options: {
		      type: Array,
		      value: []
		    },
		    defaultOption: {
		      type: Object,
		      default: {
		        id: '0',
		        name: '请选择'
		      }
		    },
			top: {
				type: Number,
				default: 128
			},
			defaultOptionShow: {
				default: false,
				type: Boolean
			},
			isShowOption: {
				default: 0,
				type: Number
			},
			selectedGroupId: {
				default: 0,
				type: Number
			}
		},
		watch:{
			isShowOption: function(val) {
				console.log('val', val);
				this.isShow = val;
			},
			options: function(options) {
				this.result = options;
			},
			defaultOption: function(defaultOption) {
				this.defaultOptionObj = defaultOption;
				if(!this.selectedGroupId) {
					this.selectName = defaultOption.name;
				}
			}
		},
		computed:{
			current: function() {
				// 更改为select 框选中的值...
				console.log('selectedGroupId--options', this.selectedGroupId, this.options);
				const nameStr = this.getNameStrById(this.selectedGroupId, this.options);
				console.log('nameStr', nameStr);
				return nameStr;
			}
		},
		mounted() {
			this.attached();
		},
		methods: {
			optionTap(e) {
				let dataset = e.target.dataset
				//this.current = dataset;
				this.selectName = dataset.name;
				this.isShow  = 0;
				this.$emit('optionclose', false);
				console.log('dataset', dataset);
				// 调用父组件方法，并传参
				this.$emit("change", { ...dataset })
			},
			openClose() {
				this.isShow =   1 - this.isShow;
				this.$emit('optionclose', this.isShow);
			},
			attached() {
				this.result = this.options;
				console.log('attached', this.defaultOption);
				/*this.current= Object.assign({}, this.defaultOption);*/
			},
			getCurrentName() {
				return this.current;
			},
			getNameStrById(id,options) {
				let res = options;
				let n = res.length;
				console.log('res getNameStrById', res);
				for(let m = 0;m<n;m++) {
					if(res[m].id == id) {
						return res[m].name;
					}
				}
				return '';
			}
		}
	}
</script>

<style scoped>
.select-box {
	flex-direction: column;
	font-size: 30rpx;
}

.select-wrap {
	border-radius: 50rpx;
	-webkit-box-shadow: 0rpx 0rpx 1rpx 1rpx rgba(0, 0, 0, 0.2) inset;
	box-shadow: 0rpx 0rpx 1rpx 1rpx rgba(0, 0, 0, 0.2) inset;
	background-color: #DEE2E6;
	color:rgba(51,51,51,1);
	justify-content: center;
	padding: 0 10rpx;
}

.select-current {
	/*width:110rpx;*/
	line-height: 60rpx;
	/*border: 1rpx solid #ddd;
	border-radius: 6rpx;*/
	box-sizing: border-box;
	margin-left: 35rpx;
	padding-right:10rpx;
}


.current-name {
	display: flex;
	word-wrap: normal;
	overflow: hidden;
	font-family:Source Han Sans CN;
	font-weight:400;
}

.option-list {
	position: absolute;
	flex-direction: column;
	/*padding: 12rpx 20rpx 10rpx 20rpx;*/
	padding-top: 12rpx;
	padding-bottom: 10rpx;
	border-radius: 6rpx;
	box-sizing: border-box;
	box-shadow: 0rpx 0rpx 1rpx 1rpx rgba(0, 0, 0, 0.2) inset;
	background-color: #fff;
	z-index: 9999;
	left:0;
}

.option {
	display: flex;
	width: 750rpx;
	justify-content: center;
	line-height: 70rpx;
	border-bottom: 1rpx solid #eee;
}

.option:last-child {
	border-bottom: none;
	padding-bottom: 0;
}

.select-image {
	align-items: center;
}

.select-current {
	
}
</style>
