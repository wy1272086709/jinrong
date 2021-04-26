<template>
	<view class="income" :style="isLastEle?'margin-bottom:74rpx': ''">
		<view class="income-title">
			<view class="income-title-left">{{title}}</view>
			<!--
			<view class="income-title-right">
				<text>初始资金: </text>
				<text></text>
			</view>
			-->
		</view>
		<!-- 数据区域... -->
		<view class="income-data-area">
			<view class="income-label flex-1">
				<view class="flex-1 flex-row-center">
					<text>利润</text>
				</view>
				<view class="flex-1 flex-row-center">
					<text>利润率</text>
				</view>
				<view class="flex-1 flex-row-center">
					<text>交易次数</text>
				</view>
				<view class="flex-1 flex-row-center">
					<text>最大回撤</text>
				</view>
			</view>
			<view style="height: 4rpx;">
				<u-line length="710"   :custom-style="{borderColor: '#FFFFFF', opacity: 0.1, width: '710rpx'}"></u-line>
			</view>
			<view class="income-data  flex-1">
				<view class="flex-1 flex-row-center" :class="income>0?'blue-css':'red-css'">{{income}}</view>
				<view class="flex-1 data-font flex-row-center" :class="incomeRatio>0?'blue-css':'red-css'">{{incomeRatio}}%</view>
				<view class="flex-1 data-font flex-row-center">{{transactionCnt}}</view>
				<view class="flex-1 flex-row-center">{{maxWithdrawal}}%</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			income: {
				type: [ Number, String ],
				default: 0.0,
			},
			incomeRatio: {
				type: [ Number, String ],
				default: 0,
			},
			transactionCnt: {
				type: [ Number, String ],
				default: 0,
			},
			maxWithdrawal: {
				type: [ Number, String ],
				default: 0
			},
			isLastEle: {
				type: Boolean,
				default: false,
			}
		},
		data() {
			return {}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.income-data{
		color: #999999;
	}
	.common-font {
		font-size: 22rpx;
		font-family: SimHei;
		font-weight: 400;
	}
	.flex-row-center {
		display: flex;
		justify-content: center;
	}
	
	.flex-row-end {
		display: flex;
		justify-content: flex-end;
	}
	// 垂直居中
	.flex-vertical-center {
		display: flex;
		align-items: center;
	}
	
	.data-font {
		font-size: 30rpx;
		font-family: SimHei;
		font-weight: 400;
	}
	
	.initia-funds {
		color: rgba(#FFFFFF, 0.5);
		@extend  .common-font;
	}

	// 利润,利润率,交易次数,涨幅比率的label 样式
	.stat-label {
		@extend .common-font;
		color: rgba(#FFFFFF, 0.7);
	}
	
	.red-css {
		@extend  .data-font;
		color: $kp-red-color;
	}
	
	.blue-css {
		@extend  .data-font;
		color: $kp-blue-color;
	}
	
	.income {
		display: flex;
		flex-direction: column;
		margin-left: 20rpx;
		margin-right: 32rpx;
		margin-top: 33rpx;
		background-color: #333333;
		&-title {
			padding-left: 23rpx;
			padding-right: 23rpx;
			margin-bottom: 23rpx;
			display: flex;
			justify-content: space-between;
			font-size: 20rpx;
			font-family: SimHei;
			font-weight: 400;
			color: #FFFFFF;
			opacity: 0.6;
			&-left {
				
			}
			&-right {
				color: #FFFFFF;
				opacity: 0.5;
			}
		}
		&-label {
			display: flex;
			color: #FFFFFF;
			opacity: 0.7;
			width: 100%;
			align-items: center;
			>view {
				flex: 1
			}
		}
		&-data {
			display: flex;
			width: 100%;
			font-size: 28rpx;
			font-family: SimHei;
			font-weight: 400;
			align-items: center;
			justify-content: space-between;
		}
	}
	.income-label:after {
		width: 686rpx;
		display: block;
		height: 1px;
		border: 1px solid rgba(#FFFFFF, 0.3);
	}
	.flex-1 {
		display: flex;
		flex: 1;
	}
</style>
