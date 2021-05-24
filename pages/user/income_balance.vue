<template>
	<view  :class="['global-css', isIphoneX?'list': '']">
		<view id="header-view">
			<u-row>
				
			</u-row>
			<u-row gutter="64">
				<u-col span="0">
					<!--
					<text class="bold-text large-font">结算详情</text>
					-->
				</u-col>
				<u-col span="12" textAlign="right" @click="showFilterModal">
					<image src="../../static/image/user/income_filter.png" style="width: 40rpx;height: 40rpx;"></image>
				</u-col>
			</u-row>
		</view>
		<view id="tab-view">
			<u-subsection  bgColor="rgba(255,255,255,0.2)"  :list="['人工', '量化']"  :current="current" @change="changeTabs" activeColor="#FFFFFF" inactiveColor="#999999" buttonColor="#b1b7bc"></u-subsection>
		</view>
		<scroll-view :scroll-y="true" :style="{height: scrollHeight}">
			<view  class="balance-income-view" 
			v-for="(item, title) in validBillList" :key="title">
				
				<u-gap v-if="item" bgColor="#676D81" height="38" :custom-style="{opacity: 0.5, 'line-height': '38rpx', paddingLeft: '24rpx', marginTop:title!=Object.keys(billList)[0]?'42rpx':'20rpx'}">
						{{title}}
				</u-gap>
				
				<view class="user-balance-view" v-for="row,key in item" :key="getKey(title, row)">
					<u-row gutter="76">
						<u-col span="12">
						
							<text class="bold-text">{{row.user_name}}</text>
						</u-col>
					</u-row>
					<view class="data-row">
						<view class="flex-1">
							<view class="flex-1-center label-text">总收益</view>
							<view class="flex-1-center label-text">保证金变动</view>
							<view class="flex-1-center label-text">提成</view>
							<view class="flex-1-center label-text">实结算</view>
						</view>
						<view style="height: 2px;">
						<u-line :custom-style="{ borderBottomColor: 'rgba(255, 255, 255, 0.3)' }"></u-line>
						</view>
						<view class="flex-1">
							<view :class="['flex-1-center',row.earnings>0?'blue-css':'red-css']">{{row.earnings}}</view>
							<view :class="['flex-1-center', row.deposit>0?'blue-css':'red-css']">{{row.deposit}}</view>
							<view :class="['flex-1-center', row.actual_profit>0?'blue-css':'red-css']">{{row.actual_profit}}</view>
							<view :class="['flex-1-center', row.settlement>0?'blue-css':'red-css']">{{row.settlement}} 
							<!--
							<text class="white-css">{{ row.remaining_profits>0? '(未结算)':'(已结算)'}}</text>
							-->
							</view>
						</view>
					</view>
				</view>
				
			</view>
			
			<u-empty mode="list" margin-top="30" v-if="billList.length == 0"></u-empty>
			<view style="height: 20px;">
				
			</view>
		</scroll-view>
		
		<u-modal v-model="showModal" mask-close-able showCancelButton :show-title="false" @confirm="billSearch" :title-style="{color:'#FFFFFF'}" :modalStyle="{backgroundColor:'#333'}" :content-style="{ color: '#FFFFFF'}" confirmColor="#FFFFFF">
			<view class="bill-content">
				<view class="bill-content-title light-bold-text">
					<view class="bill-content-title-left">
						<text>账期筛选</text>
					</view>
					<view class="bill-content-title-right">
						<checkbox-group @change="allSelectChange">
							<checkbox value="1" :checked="allCheckboxStatus"></checkbox>
							<text>全选</text>
						</checkbox-group>
					</view>
				</view>
				<view class="bill-content-list-box">
					<checkbox-group @change="billCheck">
						<view class="bill-content-list light-bold-text" v-for="item in billPeriodList" :key="item">
							<text>{{item}}</text>
							<checkbox :value="item" :checked="allCheckboxStatus? true: (checkedPeriods.includes(item)? true: false)"></checkbox>
						</view>
					</checkbox-group>
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import { getHistoryIncomeList } from '@/api/user_view.js'
	import { mapState } from 'vuex';
	export default {
		computed: {
			...mapState(['strategistId']),
			
			validBillList: function () {
				const keys = Object.keys(this.billList)
				const len  = keys.length
				const list = {}
				for (let m = 0;m<len;m++) {
					if (this.billList[keys[m]]) {
						list[keys[m]] = this.billList[keys[m]]
					}
				}
				console.log('validBillList:')
				console.log(list)
				return list;
			}
		},
		data() {
			return {
				scrollHeight: '',
				showModal: false,
				allCheckboxStatus: false,
				billList: [
					
				],
				isIphoneX: false,
				// 默认人工
				current: 0,
				billPeriodList: [],
				checkedPeriods: []
			}
		},
		async onShow() {
			//0 人工,1 量化
			this.initBillListAndInfo();
		},
		onLoad() {
			const info = uni.getSystemInfoSync();
			const isIphoneX = getApp().globalData.isIphoneX;
			this.isIphoneX = isIphoneX
			this.scrollHeight = info.windowHeight -uni.upx2px(160) - (isIphoneX ? uni.upx2px(68): 0)+'px';
		},
		methods: {
			async initBillListAndInfo() {
				const isManual = this.current == 0 ? 1: 0;
				try {
					const resp = await getHistoryIncomeList(this.strategistId, isManual);
					console.log(resp);
					this.checkedPeriods = [];
					this.billList = resp.data;
					this.oldBillList = resp.data;
					this.billPeriodList = Object.keys(this.billList);
				} catch (e) {
					this.checkedPeriods = [];
					this.billList = [];
					this.oldBillList = [];
					this.billPeriodList = []
				}
			},
			billSearch() {
				const keys = this.checkedPeriods;
				if (keys.length<=0) {
					this.billList = this.oldBillList;
					return;
				}
				const res = {};
				for (let m = 0;m< keys.length;m++) {
					res[keys[m]] = this.oldBillList[keys[m]];
				}
				console.log(res)
				this.billList = res;
				
			},
			getKey(title, row) {
				return title+'_'+row.user_id
			},
			async changeTabs(index) {
				this.current = index;
				this.initBillListAndInfo();
			},
			showFilterModal() {
				this.showModal = true;
			},
			allSelectChange(e) {
				const values = e.detail.value;
				if (values.length>0) {
					this.allCheckboxStatus = true;
					this.checkedPeriods = Object.keys(this.oldBillList);
				} else {
					this.allCheckboxStatus = false;
					this.checkedPeriods = [];
				}
			},
			billCheck(e) {
				const values = e.detail.value;
				this.checkedPeriods = values;
				console.log(values)
			}
		}
	}
</script>

<style lang="scss">
	.global-css {
		background-color: $kp-bg-color;
		color: $kp-font-color;
		height: 100vh;
	}
	scroll-view ::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
		background-color: transparent;
	}
	
	#header-view {
		height: 70rpx;
	}
	#tab-view {
		display: flex;
		width: 100vw;
		height: 90rpx;
		justify-content: center;
		
		::v-deep .u-subsection {
			width: 60vw;
		}
	}
.u-row {
	padding-top: 10rpx;
	padding-bottom: 10rpx;
}
.bold-text {
	font-weight: 800;
}
.large-font {
	font-size: 32rpx;
}
.bill-content {
	display: flex;
	flex-direction: column;
	padding-left: 32rpx;
	margin-top: 40rpx;
	padding-right: 32rpx;
	&-title {
		display: flex;
		justify-content: space-between;
		&-left {
			
		}
		&-right {
			display: flex;
			align-items: center;
			>checkbox-group {
				display: flex;
				align-items: center;
				>checkbox {
					transform: scale(0.6);
				}
				>text {
					font-size: 24rpx;
				}
			}
		}
	}
	&-list-box {
		display: flex;
		margin-bottom: 20rpx;
		>checkbox-group {
			width: 686rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
		}
		.bill-content-list {
			font-size: 24rpx;
			margin-top:10rpx;
			margin-bottom: 10rpx;
			
			height: 48rpx;
			line-height: 48rpx;
			
			>text {
				margin-right: 10rpx;
			}
			>checkbox {
				transform: scale(0.6);
			}
		}
	}
}
.balance-income-view {
	
}

.bill-date {
	font-size: 20rpx;
	font-family: SimHei;
	font-weight: 400;
	color: #FFFFFF;
	opacity: 0.7;
}

.data-row {
	display: flex;
	margin-left: 20rpx;
	margin-right: 20rpx;
	flex-direction: column;
	height: 154.4rpx;
	background: rgba(255, 255, 255, 0.1);
	border: 1rpx solid rgba(#FFFFFF, 0.1);
	border-radius: 10rpx;
}

.flex-1 {
	display: flex;
	flex: 1;
}

.flex-1-center {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
}

.common-font {
	font-size: 28rpx;
	font-family: SimHei;
	font-weight: 400;
}

.red-css {
	@extend  .common-font;
	color: $kp-red-color;
}

.blue-css {
	@extend  .common-font;
	color: $kp-blue-color;
}

.white-css {
	@extend  .common-font;
	color: $kp-font-color;
}

.label-text {
	@extend  .common-font;
	color: rgba(255, 255, 255, 0.7);
}

.flex-1-column {
	display: flex;
	flex: 1;
	flex-direction: column;
}

.light-bold-text {
	font-weight: 600;
}

::v-deep .hairline-left {
	border-left: 1px solid #F2F2F2;
}
.margin-css {
	margin-right: 10rpx;
}
.user-balance-view {
	/*border-bottom: 1px solid #F2F2F2;*/
}
.list {
	padding-bottom: 0;
	padding-bottom: 68rpx;
	padding-bottom: 68rpx;
}
</style>
