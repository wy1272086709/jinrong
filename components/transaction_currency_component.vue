<template>
	<view>
		<view class="currency-view" v-if="storeType == 1">
			<view class="currency-view-row-2">
				<view>
					<u-button size="mini">委托类型</u-button>
				</view>
				<easy-select size="mini" :options="delegateOptions" :value="delegateType" @selectOne="selectDelegate" :custom-style="{'background-color':'#FFFFFF'}"></easy-select>
			</view>
			
			<view class="currency-view-row-3">
				<view>
					<u-button size="mini">价格</u-button>
				</view>
				<u-input :custom-style="{'background-color':'#FFFFFF'}" placeholder="请输入价格"></u-input type="number">
			</view>
			<view class="currency-view-row-4">
				<view>
					<u-button size="mini">数量</u-button>
				</view>
				<u-input :custom-style="{'background-color':'#FFFFFF'}" placeholder="请输入价格"></u-input type="number">
			</view>
			<view class="currency-view-row-5">
				<view>
					<u-button size="mini">止盈委托价</u-button>
				</view>
				<u-input :custom-style="{'background-color':'#FFFFFF'}" placeholder="请输入价格"></u-input type="number">
			</view>
			<view class="currency-view-row-6">
				<view>
					<u-button size="mini">止损委托价</u-button>
				</view>
				<u-input :custom-style="{'background-color':'#FFFFFF'}" placeholder="请输入价格"></u-input type="number">
			</view>
			<view class="currency-view-row-7">
				<u-button size="mini" :plain="true" :custom-style="{border:'1px solid '}">买入开多</u-button>
				<u-button size="mini" :plain="true">卖出开空</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import easySelect from '@/components/easy-select.vue';
	import singleSelectRow from '@/components/single_select_row.vue';
	export default {
		data() {
			return {
				
			};
		},
		props: {
			// 开仓或者平仓这两种类型
			storeType: {
				default: 1,
				type: [ Number, String ]
			}
			
		},
		components: {
			easySelect,
			singleSelectRow
		},
		methods: {
			selectDelegate(option) {
				this.delegateType = option.label;
			},
			openStore() {
				
			},
			pingStore() {
				
			},
		}
	}
</script>

<style lang="scss">
.currency-view {
	display: flex;
	flex-direction: column;
	margin-left:32rpx;
	margin-right: 32rpx;
	padding-left:30rpx;
	padding-right: 30rpx;
	background-color: #F2F2F2;
	padding-bottom: 10px;
	&-row-2 {
		display: flex;
		margin-top:10px;
		view:nth-child(1) {
			width: 50%;
		}
	}
	&-row-3, &-row-5, &-row-6 {
		display: flex;
		margin-top: 10px;
		view:nth-child(1) {
			width: 50%;
		}
	}
	
	&-row-7 {
		display: flex;
		margin-top: 10px;
	}
}

</style>
