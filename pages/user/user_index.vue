<template>
	<view id="root-view">
		<view id="sub-view">
			
				<view id="header-view" @tap.stop="showUserList">
					<view id="header-view-left">
						<view id="header-view-left-image">
							<image :src="avatarUrl?avatarUrl: '../../static/image/overall_view/user_avatar.png'" class="avatar-class"></image>
						</view>
						<view id="header-view-left-text">
							<view>{{strategIst}}</view>
							<view>{{job}}</view>
						</view>
					</view>
					<view id="header-view-right">
						<u-button size="mini" type="default" @click="showUserList"   v-if="Object.values(userList).length>0" :custom-style="{width: '71rpx',
						backgroundColor: '#333333',
height: '44rpx',
fontSize: '20rpx',
fontFamily: 'SimHei',
fontWeight: 400,
color: '#FFFFFF',
opacity: 0.4,
borderRadius: '7rpx'}">切换</u-button>
					</view>
				</view>
				
				<view id="income-view">
					<view id="income-view-row-0" class="small-font">
						<text>{{sDate}}~{{eDate}}</text>
					</view>
					
					<view id="income-view-row-1">
						<view id="income-view-row-1-left">
							<text class="bold-text large-font">本期收益</text>
						</view>
						<view id="income-view-row-1-right" :class="isShowJiesuan?'has-jiesuan-btn':'no-jiesuan-btn'">
							<view :style="isShowJiesuan?'margin-right:20rpx;':''" class="bold-text large-font">
								{{ incomeStatusText }}
							</view>
							<view id="wait-balance-btn-view" v-if="isShowJiesuan">
								<u-button type="default" size="mini" @click="jiesuan">结算</u-button>
							</view>
						</view>
					</view>
					<view id="income-view-row-2">
						<view class="medium-font">
							{{currentIncome}}
						</view>
						<view class="medium-font">
							{{waitBalance}}
						</view>
					</view>
					
					
					
					<view id="income-view-row-3">
						<u-button @click="viewIncomeHistory" :custom-style="{fontSize: '24rpx',
fontFamily: 'SimHei',
fontWeight: 400,
backgroundColor: '#333333',
width: '198rpx',
height: '50rpx',
borderRadius: '7rpx',
color: '#B1B7BC'}" size="mini">查看往期收益</u-button>
					</view>
					
				</view>	
			
			
			<!--
				<u-cell-group>
					<u-cell-item iconSize="50" :title-style="{fontSize: '36rpx', color:'#999999'}" center :is-link="true"    hover-class=""
					  title="结算列表"  :arrow="false" @click="gotoBalanceList">
					  <template v-slot:icon>
						  <view class="slot-bill-image">
						  <image src="../../static/image/user/bill.png" style="width: 56rpx;height: 56rpx;"></image>
						  </view>
					  </template>
					  <template v-slot:right-icon>
						  <u-icon name="arrow-right" size="36" color="#999999"></u-icon>
					  </template>
					</u-cell-item>
				</u-cell-group>
			-->
			<!-- 收益查询界面 -->
			<u-sticky @fixed="fixed" @unfixed="unfixed" >
				<view id="income-search">
					<!--
					<view id="basic-title">
						<text>收益明细查询</text>
					</view>
					-->
					<view class="row-css justify-css padding-css margin-bottom-css">
						<view class="row-css bg-css align-css w-css">
							<view class="date-select" @tap="startDateOpen">
								<text>{{sDateText}}</text>
								<u-icon name="arrow-down-fill" size="10" style="margin-left:5px;"></u-icon>
							</view>
							<view class="date-select" @tap="endDateOpen">
								<text>{{eDateText}}</text>
								<u-icon name="arrow-down-fill" size="10" style="margin-left:5px;"></u-icon>
							</view>
						</view>
						<!-- 查询功能 -->
						<view>
							<u-button size="mini"  type="mybtn" :custom-style="{
								background: '#676D81',
								width: '150rpx',
								height: '50rpx',
								boxShadow: '0px 14px 28px 0px rgba(50, 50, 50, 0.09)',
								borderRadius: '5px 5px 5px 5px',
								fontSize: '23rpx',
								fontFamily: 'SimHei',
								fontWeight: 400,
								color: '#FFFFFF'
							}" @click="incomeSearch">收益查询</u-button>
						</view>
					</view>
				</view>
			</u-sticky>
		
			<view id="bottom-view">
				<view>
					<view class="row-css margin-css  benifit-size total-benefit-css" style="margin-left:20rpx;margin-right: 32rpx;padding-left:20rpx;padding-right: 20rpx;">
						<view class="flex-1">
							
							<view class="flex-vertical-center" style="margin-right: 14rpx;">
								<image src="/static/image/user/benifits.png" style="width: 40rpx;height:40rpx;"></image>
							</view>
							<view>总利润</view>
						</view>
						<view :class="[ 'row-data',' flex-1',' flex-row-center', totalIncome>0?'green-css':'red-css' ]">{{totalIncome}}</view>	
						<view :class="['row-data',' flex-1',' flex-row-center', incomeRate>0? 'green-css':'red-css' ]">{{incomeRate}}%</view>
						<!-- 一个月的收益 -->
						<view class="flex-1 flex-vertical-center flex-row-end">
							<image v-if="totalIncome<0" src="@/static/image/overall_view/next.png" style="width: 30rpx;height: 30rpx;"></image>
							
							<image v-if="totalIncome>=0" src="@/static/image/overall_view/prev.png" style="width: 30rpx;height: 30rpx;"></image>
						</view>
					</view>
					<!-- 收益组件 -->
					<income-component :title="item.sname" :income="item._profit" :income-ratio="'0'" :transaction-cnt="item.trade_count" :max-withdrawal="item.drawdown.drawdown_rate" v-for="(item,key, index) in incomeDataList" :is-last-ele="index==incomeDataList.length-1" :key="item.sname"></income-component>
				</view>
			</view>
			
			<uni-drawer ref="showLeft" @close="closeDrawer"  mode="left" :width="320">
				<view class="status-line" :style="{height: lineHeight}"></view>
				<view id="admin-header">
					<view id="admin-header-left">
					<image src="../../static/image/overall_view/user_avatar.png" class="admin-avatar"></image>
					</view>
					<view id="admin-header-right">
						<view id="admin-header-right-top">
							<text>{{userName}}</text>
						</view>
						<view id="admin-header-right-bottom">
							<label class="user-logout-underline" @tap="logout">退出</label>
						</view>
					</view>
				</view>
				<view id="user-list">
					<text id="blockchain-product">区块链产品</text>
					<view id="user-list-view">
						<view class="user-account-css" @tap="switchStrategist('')">
							<text>总体一览</text>
							<icon type="success_no_circle" v-if="strategistId===''"></icon>
						</view>
						<view v-for="(user, index) in userList" :key="index" class="user-account-css" @tap="switchStrategist(index)">
							<text>{{ user }}</text>
							
							<icon type="success_no_circle" v-if="strategistId===index"></icon>
						</view>
					</view>
				</view>
			</uni-drawer>
			<w-picker
				:visible.sync="rangeVisible"
				mode="range" 
				:startYear="startYear" 
				:endYear="endYear"
				:value="rangeVal"
				:current="true"
				@confirm="onConfirm($event,'range')"
				theme-color="#2979FF"
				@cancel="onCancel"
				ref="range" 
			></w-picker>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import { getStrategIstInfo  } from '../../mock/user_index.js'
	import { getStrategIstIncome, getHistoryIncomeList, getIncomeSearch  } from '@/api/user_view.js';
	import incomeComponent from '@/common/income-component.vue';
	export default {
		data() {
			return {
				show: false,
				incomeDataList: [
					
				],
				rangeVisible:false,
				endYear: '',
				startYear: '',
				result:{
					result:""
				},
				rangeVal:[],
				stickyStatus: 0, // 吸附前初始变量
				scrollHeight: '',
				// 策略师
				strategIst: '',
				plain: true,
				job: '',
				sDateVisible: false,
				eDateVisible: false,
				// 头像路径
				avatarUrl: '',
				sDate: '',
				eDate: '',
				currentIncome: '0',
				waitBalance: '0',
				userList: {},
				lineHeight: '',
				sDateText: '',
				eDateText: '',
				isShowJiesuan: false,
				totalIncome: 0,
				incomeRate: '0%',
				incomeStatusText: '待清算'
			}
		},
		onPullDownRefresh() {
			this.initPageInfo(true);
		},
		async onLoad() {
			const getYesFormatDate = () => {
				const curDate = new Date(); 
				const date = new Date(curDate.getTime() - 24*60*60*1000); //前一天
				const seperator1 = "-";
				const year = date.getFullYear();
				let month = date.getMonth() + 1;
				const strDate = date.getDate();
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if (strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				const currentdate = year + seperator1 + month + seperator1 + strDate;
				console.log('currentdate'+currentdate);
				return currentdate;
			};
			const getMonthFirstDay = () => {
				const date = new Date(); //前一天
				const seperator1 = "-";
				const year = date.getFullYear();
				let month = date.getMonth() + 1;
				
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				const currentdate = year + seperator1 + month + seperator1 + '01';
				return currentdate;
			};
			// this.sDateText = getMonthFirstDay();
			//this.eDateText = getYesFormatDate();
			//this.lineHeight = 
			const str = uni.getStorageSync('wx_strategist_list');
			console.log('str:'+str);
			const obj = JSON.parse(str);
			this.userList = obj;
			console.log('this.userList')
			const info = uni.getSystemInfoSync();
			this.scrollHeight = info.windowHeight - uni.upx2px(76) - 80+'px';
			
		},
		onShow() {
			this.initPageInfo();
		},
		components: {
			incomeComponent
		},
		computed: {
			...mapState([ 'hasLogin', 'userName', 'strategistId'])
		},
		methods: {
			// 跳转到结算列表
			gotoBalanceList() {
				uni.navigateTo({
					url: '/pages/user/income_balance'
				})
			},
			// 选择查询日期
			changeQueryDate(e) {
				console.log(e)
				console.log('changeQueryDate')
				this.sDateText = e.startDate
				this.eDateText = e.endDate
			},
			async initPageInfo(isRefresh) {
				const res = await getStrategIstIncome(this.strategistId);
				const { profit, strategist_name, date_range, allowance, level_name } = res;
				console.log('res:'+JSON.stringify(res))
				this.strategIst = strategist_name;
				this.job = level_name;
				this.currentIncome = profit;
				this.waitBalance   = allowance;
				this.sDate = this.sDateText =  date_range[0];
				this.eDate = this.eDateText =  date_range[1];
				this.rangeVal = [ date_range[0], date_range[1] ]
				this.endYear  = date_range[1].substr(0, 4)
				this.startYear= parseInt(this.endYear) -2
				this.incomeSearch();
				if (isRefresh) {
					uni.stopPullDownRefresh()
				}
			},
			open() {
				this.$refs.calendar.open()
			},
			logout() {
				// 退出登录
				const _self = this;
				uni.showModal({
					content:"你确定要退出吗?",
					cancelText:'取消',
					showCancel:true,
					confirmText:'确定',
					complete(res) {
						// 
						if(res.confirm) {
							console.log('用户点击了确定!');
							uni.showTabBar({
								success() {
									console.log('showTabBar success!');
									_self.$refs['showLeft'].close();
								},
								animation: true
							});
							_self.$store.commit('logout');
							uni.removeStorageSync('wx_login_username');
							uni.removeStorageSync('wx_login_password');
							uni.reLaunch({
								url: '/pages/user/login'
							});
						} else {
							console.log('用户点击了取消!');
						}
					}
				})
				
			},
			async incomeSearch() {
				if (this.eDateText<this.sDateText) {
					uni.showToast({
						title:'截止日期小于起始日期',
						icon: 'none'
					});
					return;
				}
				if (this.sDateText == '起始日期' || this.eDateText == '截止日期') {
					uni.showToast({
						title:'请勾选起止日期范围',
						icon:'none'
					});
					return;
				}
				
				const res = await getIncomeSearch(this.strategistId, this.sDateText, this.eDateText);
				console.log('incomeSearch:'+JSON.stringify(res))
				this.incomeDataList = res.detail;
				this.totalIncome = res.sum.sum;
				this.incomeRate = res.sum.margins
			},
			startDateOpen() {
				//this.sDateVisible = true;
				//this.open()
				//this.show = true
				this.rangeVisible = true
			},
			endDateOpen() {
				//this.eDateVisible = true;
				//this.open()
				//this.show = true
				this.rangeVisible = true
			},
			onConfirm(e, selector) {
				console.log('e')
				console.log(e);
				this.sDateText = e.value[0];
				this.eDateText = e.value[1];
			},
			fixed(index) {
				/*this.extraHeight = '100px';
				this.marginTop = '340px';*/
				this.stickyStatus = 1;
			},
			unfixed(index) {
				/*this.extraHeight = '';
				this.marginTop = '';*/
				this.stickyStatus = 0;
			},
			viewIncomeHistory() {
				uni.navigateTo({
					url: '/pages/user/income_balance'
				})
			},
			jiesuan() {
				this.incomeStatusText = '已结算';
			},
			showUserList() {
				let _self = this;
				uni.hideTabBar({
					animation:true,
					success() {
						console.log('hideTabBar success!');
						_self.showDrawer('showLeft');
					},
				});
				//this.visible = true;
			},
			confirm(e) {
				console.log('confirm', e);
			},
			// 打开窗口
			showDrawer(e) {
				this.$refs[e].open()
			},
			// 关闭窗口
			closeDrawer(e) {
				uni.showTabBar({
					success() {
						console.log('showTabBar success!');
					},
					animation: true
				});
				console.log('close closeDrawer');
			},
			onCancel() {
				
			},
			switchStrategist(strategist_id) {
				// 更新策略师ID的值...
				this.$store.commit('setStrategistId', strategist_id);
				let _self = this;
				uni.showTabBar({
					success() {
						console.log('showTabBar success!');
						_self.$refs['showLeft'].close();
					},
					animation: true
				});
				this.initPageInfo();
			},
		}
	}
</script>

<style lang="scss">
	scroll-view ::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
		background-color: transparent;
	}
.user-logout-underline {
	/*padding-left: 20rpx;*/
	padding-right: 20rpx;
	/*margin-left: 5px;*/
	color: $kp-red-color;
	text-decoration: underline;
}
#root-view {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	margin: auto;
	background-color: #333333;
	::v-deep .u-close--top-right {
		padding-left: 10px !important;
		padding-right: 10px !important;
	}
	
	::v-deep .u-border-top:after {
	    border-top-width: 0px;
	}
	
	::v-deep .u-flex {
		margin-right: 32rpx;
	}
	
	::v-deep .u-cell {
		
	}
	
	::v-deep .uni-drawer__content {
		background-color: #333333;
		color: #FFFFFF;
	}
	
	::v-deep .u-select {
		background: #333 ;
	}
	
	::v-deep .u-select__header {
		background: rgba(255, 255, 255, 0.1) ;
		color: $kp-font-color;
	}
	
	::v-deep .uni-picker-view-mask {
	  
	}
	
	::v-deep .my-black-mask {
		background: rgba(255,255, 255, 0.1);
	}
	
	::v-deep .my-indicator-class {
		color: red;
	}
	
	::v-deep .my-datepicker-mask {
		background: rgba(255,255, 255, 0.1);
	}
	
	::v-deep .w-picker-header {
		background-color: #333333;
		color: #FFFFFF;
	}
	
	::v-deep .w-picker-view {
		background-color: $kp-bg-color;
		color: $kp-font-color;
	}
	
	::v-deep .u-select__body__picker-view {
		background-color: $kp-bg-color;
		color: $kp-gray-color;
	}
	
	::v-deep .u-select__body__picker-view__item {
		background-color: $kp-bg-color;
		color: $kp-font-color;
	}
	::v-deep .uni-picker-view-indicator {
		color: $kp-gray-color;
	}
	::v-deep .uni-picker-view-indicator:after {
		border-bottom: 1px solid rbga(#FFFFFF, 0.3);
		
	}
	
	::v-deep .uni-picker-view-indicator:before {
		border-bottom: 1px solid rbga(#FFFFFF, 0.3);
	}
	
}
#sub-view {
	height: 100%;
	width: calc(100vw + 6px);
	overflow-y: auto;
	overflow-x: hidden;
}

#header-view {
	display: flex;
	margin-left: 32rpx;
	margin-right: 44rpx;
	
	margin-top: 10px;
	justify-content: space-between;
	&-left {
		display: flex;
		&-image {
			width: 96rpx;
			height: 96rpx;
			.avatar-class {
				width: 96rpx;
				height: 96rpx;
			}
			margin-right: 23rpx;
		}
		
		&-text {
			display: flex;
			flex-direction: column;
			color: #FFFFFF;
			justify-content: space-between;
		}
		&-text>view:nth-child(1) {
			font-size: 25rpx;
			font-family: SimHei;
			font-weight: 400;
			color: #FFFFFF;
		}
		&-text>view:nth-child(2) {
			font-size: 20rpx;
			font-family: SimSun;
			font-weight: 400;
			color: #FFFFFF;
			opacity: 0.4;
		}
	}
	
	&-right {
		display: flex;
		align-items: center;
		
	}
}

#basic-title {
	font-weight: 800;
	margin-top: 20px;
	margin-left: 32rpx;
	margin-bottom: 10px;
}
.row-css {
	display: flex;
	color: #FFFFFF;
}

.benifit-size {
	height: 74rpx;
	line-height: 74rpx;
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

.date-select {
	width: 50%;
	color: #999999;
	font-size: 24rpx;
	text-align: center;
	font-size: 22rpx;
	font-family: SimHei;
	font-weight: 400;
	color: #FFFFFF;
	opacity: 0.5;
}

.row-data {
	margin-left: 10px;;
}
.margin-css {
	margin-top:74rpx;
	margin-bottom:47rpx;
}
.border-bottom-css {
	border-bottom: 1px solid #F2F2F2;
}

.margin-bottom-css {
	margin-top: 26rpx;
	margin-bottom: 10px;
}

.total-benefit-css {
	background: rgba(#FFFFFF, 0.1);
	border: 1px solid rgba(#FFFFFF, 0.1);
}

.bg-css {
	background: rgba(#676D81, 0.2);
	border: 1px solid rgba(#FFFFFF, 0.2);
}
.w-css {
	width: 450rpx;
	height: 50rpx;
}

.justify-css {
	justify-content: space-between;
}

.align-css {
	align-items: center;
}

.padding-css {
	padding-left: 20rpx;
	padding-right: 32rpx;
}

.common-font {
	font-family: SimHei;
	font-weight: 400;
}

.big-font {
	@extend  .common-font;
	font-size: 36rpx;
	color: #FFFFFF;
}

.medium-font {
	font-size: 30rpx;
	@extend  .common-font;
	color: #B1B7BC;
}

.small-font {
	@extend  .common-font;
	font-size: 22rpx;
	color: #FFFFFF;
	opacity: 0.5;
}

#income-view {
	/*background-color: #F2F2F2;*/
	/*margin-left:32rpx;
	margin-right: 44rpx;*/
	margin-left: 20rpx;
	margin-right: 32rpx;
	background: rgba(255, 255, 255, 0.1);
		
	margin-top:34rpx ;
	/*border-radius: 20px;*/
	display: flex;
	flex-direction: column;
	/*padding-top:20px;*/
	padding-bottom: 19rpx;
	color: #FFFFFF;
	&-row-0 {
		text-align: center;
		color: #FFFFFF;
		font-weight: 200;
		margin-top: 15rpx;
		margin-bottom: 43rpx;
		/*margin-bottom: 20px;*/
	}
	&-row-1 {
		display: flex;
		
		&-left {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 50%;
			border-right: 1px solid rgba(#FFFFFF, 0.2);
		}
		
		&-right {
			display: flex;
			align-items: center;
			width: 50%;
			>view:nth-child(1) {
				display: flex;
				align-items: center;
				/*margin-bottom: 54rpx;*/
				justify-content: space-between;
			}
			
		}
	}
	&-row-2 {
		display: flex;
		margin-bottom: 51rpx;
		
		>view:nth-child(1) {
			width: 50%;
			text-align: center;
			padding-top: 63rpx;
			border-right: 1px solid rgba(#FFFFFF, 0.2);
		}
		>view:nth-child(2) {
			width: 50%;
			padding-top: 63rpx;
			text-align: center;
		}
	}
	
	&-row-3 {
		display: flex;
		justify-content: center;
	}
}

#income-search {
	display: flex;
	flex-direction: column;
	/*padding-bottom: 10px;*/
	background-color: #333333;
	/*border-bottom: 1px solid rgba($color: #FFFFFF, $alpha: 0.1);*/
}

.red-css {
	color: $kp-red-color;
}
	
.blue-css {
	color: $kp-blue-color;
}
	
#bottom-view {
	/*margin-top: 20px;*/
	/*padding-left:32rpx;
	padding-right: 32rpx;*/
}
.income-view-top-label {
	margin-bottom: 54rpx;
}

.has-jiesuan-btn {
	padding-right: 20px;
	justify-content: flex-end;
}
.no-jiesuan-btn {
	justify-content: center;
}
#wait-balance-btn-view {
	display: flex;
}


.slot-bill-image {
	align-items: center;
	display: flex;
}
	#admin-header {
		display: flex;
		align-items: flex-end;
		margin-bottom: 5px;
		&-left {
			display: flex;
		}
		&-right {
			display: flex;
			height: 108rpx;
			justify-content: space-between;
			flex-direction: column;
			&-top {
				display: flex;
				margin-top:10rpx;
			}
			&-bottom {
				display: flex;
				justify-content: flex-start;
			}
		}
	}
	
	.admin-avatar {
		margin-left:16px;
		margin-right: 10px;
		width: 108rpx;
		height: 108rpx;
	}
	
	#user-list-view {
		display:flex;
		flex-direction: column;
		padding-right:10px;
	}
	
	#user-list {
		display: flex;
		margin-top:32px;
		margin-left:35px;
		flex-direction: column;
		font-family: Microsoft YaHei;
		font-size:16px;
	}
	
	.user-account-css {
		display: flex;
		padding-bottom:30px;
		padding-left:5px;
		justify-content: space-between;
	}
	
	#blockchain-product {
		font-weight: bolder;
		font-family: Microsoft YaHei;
		font-size:20px;
		padding-bottom:30px;
	}
	
	.bold-text {
		color: #FFFFFF;
	}
	
	.large-font {
		@extend  .common-font;
		font-size: 36rpx;
	}
	
	.flex-1 {
		display: flex;
		flex: 1;
	}
</style>
