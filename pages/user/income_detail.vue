<template>
	<view id="root-view" class="list">
		<view id="search-view">
			<view id="search-view-area">
				<view>
					<view id="search-view-area-user">
						<u-dropdown height="50" @open="openDropdown" @close="closeDropdown" inactiveColor="#FFF" activeColor="#FFF" ref="uDropdown">
							<!--
							<u-dropdown-item v-model="value1" :title="title1" :options="options1" @input="changeValue1"></u-dropdown-item>
							-->
							<u-dropdown-item class="u-drop" :title="title1" >
								<view class="slot-content">
									<view class="item-box">
										<view class="item" :class="[ (index ==  selectStrategistId || (index == strategistId))? 'active' : '']" @tap="tagClick(index)" v-for="(item, index) in options1" :key="index">
											{{item}}
										</view>
									</view>
									<!-- <u-button type="primary" @click="closeDropdown">确定</u-button> -->
								</view>
							</u-dropdown-item>
						</u-dropdown>
					</view>
					<view id="search-view-area-date" class="flex-1" @tap.stop="dateVisible= !dateVisible">
						<view id="search-view-area-date-one" class="flex-1">
							<view>
								<text class="start-date-text date-text">{{sDateText}}</text>
							</view>
							<u-icon name="arrow-down" size="22" color="#FFFFFF" v-if="dateVisible"></u-icon>
							<u-icon name="arrow-up" size="22" color="#FFFFFF" v-if="!dateVisible"></u-icon>
						</view>
						<view id="search-view-area-date-two" class="flex-1">
							<view>
								<text class="end-date-text date-text">{{eDateText }}</text>
							</view>
							<u-icon name="arrow-down" size="22" color="#FFFFFF" v-if="dateVisible"></u-icon>
							<u-icon name="arrow-up" size="22" color="#FFFFFF" v-if="!dateVisible"></u-icon>
						</view>
					</view>
					
				</view>
				<!--
				<view>
					<u-button size="mini" type="my" class="btn-text" :custom-style="{width: '108rpx',
	height: '50rpx',
	background: '#676D81',
	boxShadow: '0px 14rpx 28rpx 0px rgba(50, 50, 50, 0.09)',
	fontSize: '23rpx',
	fontFamily: 'SimHei',
	fontWeight: 400,
	color: '#FFFFFF',
	borderRadius: '5rpx'}" @click="incomeSearch">查询</u-button>
				</view>
				-->
			</view>
			<u-gap height="2" bgColor="#626262" marginTop="10"></u-gap>
		</view>
		<scroll-view :style="{height:scrollHeight, marginTop:'20rpx'}" :scroll-y="true" @scrolltolower="lower" @scrolltoupper="upper">
			<view id="basic-view">
				<view class="flex-1 center-text column-flex">
					<view class="label-text">总收益</view>
					<view :class="totalIncome>0?'blue-css':'red-css'" style="margin-top: 32rpx;">{{totalIncome}}</view>
				</view>
				<view class="flex-1 center-text column-flex">
					<view class="label-text">收益率</view>
					<view :class="incomeRate>0? 'blue-css': 'red-css'" style="margin-top: 32rpx;">{{incomeRate+'%'}}</view>
				</view>
			</view>
			<view id="income-detail-view">
				<income-component :title="item.sname" :income="item._profit" :income-ratio="item.margins" :transaction-cnt="item.trade_count" :max-withdrawal="item.drawdown.drawdown_rate" v-for="(item,key, index) in incomeDataList" :is-last-ele="index==incomeDataList.length-1" :key="item.sname"></income-component>
				<u-empty mode="list" margin-top="30" v-if="incomeDataList.length == 0"></u-empty>
			</view>
			<view style="height: 20px;">
				
			</view>
		</scroll-view>
		
		
		<w-picker
			:visible.sync="dateVisible"
			mode="range" 
			:startYear="startYear" 
			:endYear="endYear"
			:value="rangeVal"
			:current="true"
			@confirm="onConfirm($event,'range')"
			@cancel="onCancel"
			theme-color="#FFFFFF"
			ref="range" 
			:header-style="{ backgroundColor: '#333333', color: '#FFFFFF' }"
		></w-picker>
	</view>
</template>

<script>
	import { getIncomeSearch } from '@/api/user_view.js'
	import { mapState } from 'vuex'
	import incomeComponent from '@/common/income-component.vue';
	export default {
		data() {
			return {
				scrollHeight: '',
				incomeDataList: [
					
				],
				sDateText: '',
				eDateText: '',
				dateVisible: false,
				startYear: '',
				endYear: '',
				rangeVal: [],
				totalIncome: 0,
				incomeRate: 0,
				options1: [],
				title1: '',
				value1: '',
				selectStrategistId: '',
			}
		},
		computed: {
			...mapState(['strategistId', 'userName'])
		},
		components: {
			incomeComponent
		},
		onLoad() {
			const info = uni.getSystemInfoSync()
			const isIphoneX = getApp().globalData.isIphoneX;
			const paddingVal = isIphoneX ? uni.upx2px(68): 0;
			console.log('paddingBottom:'+paddingVal)
			this.scrollHeight = info.windowHeight - paddingVal - uni.upx2px(50) - uni.upx2px(20)+'px';
			this.initDateRange()
			this.incomeSearch()
			const str = uni.getStorageSync('wx_strategist_list');
			const userList = str ? JSON.parse(str): [];
			// select 选择框
			this.options1  = userList;
			
		},
		methods: {
			tagClick(index) {
				this.selectStrategistId = index
				this.title1 = this.options1[index];
				console.log("title:",this.title);
				this.$refs.uDropdown.close();
				this.incomeSearch()
			},
			getOptionPairs(userList) {
				const keys = Object.keys(userList)
				const pairs = []
				for (let key of keys) {
					pairs.push({label: userList[key], value: key})
				}
				return pairs
			},
			async changeValue1(v) {
				this.value1 = v;
				const index = this.options1.findIndex((item)=> {
					return item.value == v;
				});
				this.title1 = this.options1[index].label;
			},
			openDropdown() {
				
			},
			closeDropdown() {
				
			},
			initDateRange() {
				const d = new Date
				this.endYear  =  d.getFullYear()
				this.startYear= parseInt(this.endYear) -2
				this.rangeVal = uni.getStorageSync('date_range');
				this.sDateText = this.rangeVal[0]
				this.eDateText = this.rangeVal[1]
			},
			getMonthFirstDay() {
				const date = new Date(); //前一天
				const seperator1 = "-";
				const year = date.getFullYear();
				let month = date.getMonth() + 1;
				
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				const currentdate = year + seperator1 + month + seperator1 + '01';
				return currentdate;
			},
			getTodayDay() {
				const date = new Date(); //前一天
				const seperator1 = "-";
				const year = date.getFullYear();
				let month = date.getMonth() + 1;
				
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				const d = date.getDate()
				const currentdate = year + seperator1 + month + seperator1 + (d>10?d:'0'+d);
				return currentdate;
			},
			async incomeSearch() {
				let res = []
				
				const strategistId = this.selectStrategistId ? this.selectStrategistId: this.strategistId;
				
				res = await getIncomeSearch(strategistId, this.rangeVal[0], this.rangeVal[1]);
				
				console.log('incomeSearch:'+JSON.stringify(res))
				if (Array.isArray(res) && res.length == 0) {
					this.incomeDataList = []
					this.totalIncome = 0;
					this.incomeRate = 0
				} else {
					this.incomeDataList = Object.values(res.detail);
					this.totalIncome = res.sum.sum;
					this.incomeRate = res.sum.margins
				}
				if (!this.title1) {
					if (this.strategistId) {
						this.title1 = this.options1[this.strategistId]
					} else {
						this.title1 = this.userName;
					}
				}
			},
			upper() {
				
			},
			lower() {
				
			},
			onCancel() {
				
			},
			onConfirm(e, type) {
				console.log(e)
				this.sDateText = e.value[0]
				this.eDateText = e.value[1]
				this.rangeVal = [ this.sDateText, this.eDateText ]
				this.incomeSearch()
			}
		}
	}
</script>

<style lang="scss">
	.flex-1 {
		display: flex;
		flex: 1;
	}
	.column-flex {
		flex-direction: column;
	}
	
	.center-text {
		text-align: center;
		justify-content: center;
	}
	
	.label-text {
		@extend  .common-font;
		font-size: 30rpx;
		color: #B1B7BC;
	}
	
	.btn-text {
		@extend  .common-font;
		font-size: 23rpx;
		color: #FFFFFF;
	}
	
	.common-font {
		font-family: SimHei;
		font-weight: 400;
	}
	
	.data-text {
		@extend  .common-font;
		font-size: 48rpx;
	}
	
	.date-text {
		font-size: 22rpx;
		@extend  .common-font;
		color: #FFFFFF;
		opacity: 0.5;
	}
	
	@mixin large-text {
		font-size: 48rpx;
		@extend  .common-font;
		
	}
	
	.red-css {
		@include large-text;
		color: $kp-red-color;
	}
	
	.blue-css {
		@include large-text;
		color: $kp-blue-color;
	}
	
	scroll-view ::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
		background-color: transparent;
	}
	
	.slot-content {
		width: 220rpx;
		margin-left: 21rpx;
		background-color: #82848A;
		
		.item-box {
			display: flex;
			flex-direction: column;
			flex-wrap: nowrap;
			justify-content: space-between;
			
			.item {
				border: 1px solid #b2b2b2;
				color: #b2b2b2;
				background-color: #333;
				height: 60rpx;
				display: flex;
				align-items: center;
				justify-content: space-around;
			}
			
			.active {
				color: #FFFFFF;
			}
		}
	}
	
	#root-view {
		background-color: $kp-bg-color;
		height: 100vh;
		#search-view {
			
			&-area {
				>view:nth-child(1) {
					display: flex;
					width: 100%;
				}
				display: flex;
				margin-left: 21rpx;
				margin-right: 21rpx;
				justify-content: space-between;
				&-date {
					display: flex;
					
				
					justify-content: center;
					
					&-one {
						display: flex;
						width: 190rpx;
						margin-right: 20rpx;
						border-radius: 14rpx;
						padding-left: 10rpx;
						justify-content: center;
						text-align: center;
						padding-right: 10rpx;
						background: rgba(#676D81, 0.2);
						border: 1px solid rgba(#FFFFFF, 0.2);
						height: 50rpx;
					}
					&-two {
						display: flex;
						border-radius: 14rpx;
						width: 190rpx;
						padding-left: 10rpx;
						padding-right: 10rpx;
						justify-content: center;
						text-align: center;
						background: rgba(#676D81, 0.2);
						border: 1px solid rgba(#FFFFFF, 0.2);
						height: 50rpx;
					}
					&-one>view:nth-child(1) {
						display: flex;
						align-items: center;
						margin-right: 10rpx;
					}
					&-two>view:nth-child(1) {
						display: flex;
						align-items: center;
						margin-right: 10rpx;
					}
				}
				&-user {
					display: flex;
					width:220rpx;
					margin-right: 20rpx;
					align-items: center;
					
					::v-deep .u-icon--right>text {
						font-size: 22rpx !important;
					}
				}
			}
		}
		
		::v-deep .w-picker-view {
			color: $kp-font-color;
			background-color: $kp-bg-color;
		}
		
		::v-deep .my-datepicker-mask {
			background-image: linear-gradient(
			180deg
			, #333, rgba(255, 255, 255, 0.1)),linear-gradient(
			0deg
			,#333, rgba(255, 255, 255, 0.1));
		}
		
		::v-deep .w-picker-header {
			border-width: 0px;
		}
		
		::v-deep  .u-cell-box {
			width: 220rpx;
			border: 1rpx solid rgba(255, 255, 255, 0.2);
		}
		
		::v-deep .u-dropdown {
			width:220rpx;
			height: 50rpx;
			border-radius: 14rpx;
			background: rgba(255, 255, 255, 0.2);
			border: 1rpx solid rgba(255, 255, 255, 0.2);
			font-size: 22rpx;
			@extend .common-font;
			color: #FFFFFF;
		}
		
		.u-dropdown__menu__item__text {
			font-size: 22rpx !important;
			@extend .common-font;
			color: #FFFFFF !important;
		}
		
		::v-deep .u-cell-item-box {
			background-color: #333;
		}
		
		::v-deep .u-flex {
			height: 26rpx;
		}
		
		::v-deep .u-cell {
			background-color: rgba(255, 255, 255, 0.2) !important;
			padding: 0rpx 10rpx;
		}
		
		::v-deep .u-dropdown-item__options {
			margin-left: 21rpx;
		}
	}
	
	#basic-view {
		display: flex;
		height: 181.1rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		background: rgba(#FFFFFF, 0.2);
		box-shadow: 0px 20rpx 40rpx 0px rgba(0, 0, 0, 0.2);
		border-radius: 16rpx;
	}
	
	#income-detail-view {
		::v-deep .income-data-area {
			/*margin-left: 20rpx;
			margin-right: 20rpx;*/
			background: rgba(#FFFFFF, 0.1);
			border: 1rpx solid rgba(#FFFFFF, 0.1);
			border-radius: 10rpx;
			height: 154.4rpx;
			flex-direction: column;
			display: flex;
			align-items: center;
		}
		
		::v-deep .income-label> view {
			font-size: 28rpx;
			@extend  .common-font;
			color: rgba(#FFFFFF, 0.7);
		}
	}
	.list {
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);  
		padding-bottom: env(safe-area-inset-bottom);  
	}
</style>