<template>
	<view class="warp">
		<!-- <view class="header">
			<text>{{user}}</text>
		</view> -->
		<view class="fixed-css u-width" :style="{zIndex}">
			<view class="u-300 bg-border">
				<u-dropdown  :close-on-click-self="self_close" :close-on-click-mask="mask" ref="uDropdown" inactive-color="#fff" :activeColor="activeColor" @open="openDropdown" @close="closeDropdown">
					<!-- <u-dropdown-item @change="change" v-model="value1" title="距离" :options="options1"></u-dropdown-item>
					<u-dropdown-item @change="change" v-model="value2" title="温度" :options="options2"></u-dropdown-item> -->
					<u-dropdown-item class="u-drop" :title="title" >
						<view class="slot-content">
							<view class="item-box">
								<view class="item" :class="[item.active ? 'active' : '']" @tap="tagClick(index)" v-for="(item, index) in userList" :key="index">
									{{item}}
								</view>
							</view>
							<!-- <u-button type="primary" @click="closeDropdown">确定</u-button> -->
						</view>
					</u-dropdown-item>
				</u-dropdown>
			</view>
		</view>
		<scroll-view :scroll-y="true" :style="{height:scrollHeight, marginTop: '80rpx',zIndex:2}">
			<view class="body">
				<view class="content">
					<view class="content_top">
						<view class="content_left">
							<text>本月目标交易笔数:</text>
							<text class="u-m-l-10">{{month_trade_target}}</text>
						</view>
						<view class="content_right">
							<text>已达成交易笔数:</text>
							<text class="u-m-l-10">{{month_trade_now}}</text>
						</view>
					</view>
					<view class="content_bottom">
						<view class="content_bottom_progress">
							<u-line-progress active-color="#51DEFF" :percent="line_percent1" :show-percent="false" :striped="true" :striped-active="true"></u-line-progress>
						</view>
						<text class="u-font-20">{{line_percent1+'%'}}</text>
					</view>
				</view>
				<view class="content">
					<view class="content_top">
						<view class="content_left">
							<text>本月目标收益率:</text>
							<text class="u-m-l-10">{{month_profit_target}}%</text>
						</view>
						<view class="content_right">
							<text>已达成收益率:</text>
							<text class="u-m-l-10">{{month_profit_now}}%</text>
						</view>
					</view>
					<view class="content_bottom">
						<view class="content_bottom_progress">
							<u-line-progress active-color="#FF3F6A" :percent="line_percent2" :show-percent="false" :striped="true" :striped-active="true"></u-line-progress>
						</view>
						<text class="u-font-20">{{line_percent2+'%'}}</text>
					</view>
				</view>
				<view class="content">
					<view class="content_top">
						<view class="content_left">
							<text>本期目标交易笔数:</text>
							<text class="u-m-l-10">{{threeMonth_trade_target}}</text>
						</view>
						<view class="content_right">
							<text>已达成交易笔数:</text>
							<text class="u-m-l-10">{{threeMonth_trade_now}}</text>
						</view>
					</view>
					<view class="content_bottom">
						<view class="content_bottom_progress">
							<u-line-progress active-color="#51DEFF" :percent="line_percent3" :show-percent="false" :striped="true" :striped-active="true"></u-line-progress>
						</view>
						<text class="u-font-20">{{line_percent3+'%'}}</text>
					</view>
				</view>
				<view class="content">
					<view class="content_top">
						<view class="content_left">
							<text>本期目标收益率:</text>
							<text class="u-m-l-10">{{threeMonth_profit_target}}%</text>
						</view>
						<view class="content_right">
							<text>已达成收益率:</text>
							<text class="u-m-l-10">{{threeMonth_profit_now}}%</text>
						</view>
					</view>
					<view class="content_bottom">
						<view class="content_bottom_progress">
							<u-line-progress active-color="#FF3F6A" :percent="line_percent4" :show-percent="false" :striped="true" :striped-active="true"></u-line-progress>
						</view>
						<text class="u-font-20">{{line_percent4+'%'}}</text>
					</view>
				</view>
			</view>
			<view class="foot">
				
				<view>
					<u-circle-progress width="300" bg-color="#333" :active-color="circleActiveColor" :percent="circle_percent">
						<view class="u-progress-content">
							<text :class="['u-progress-info', percentCssName ]">{{circle_percent}}%</text>
						</view>
					</u-circle-progress>	
				</view>
				<!--
				<view v-else-if="circle_percent>=10 && circle_percent<20">
					<u-circle-progress width="300" bg-color="#333" active-color="#F7BA0B" :percent="circle_percent">
						<view class="u-progress-content">
							<text class="u-progress-info yellow">{{circle_percent}}%</text>
						</view>
					</u-circle-progress>	
				</view>
				<view v-else="circle_percent>=20">
					<u-circle-progress width="300" bg-color="#333" active-color="#ff0000" :percent="circle_percent">
						<view class="u-progress-content">
							<text class="u-progress-info red">{{circle_percent}}%</text>
						</view>
					</u-circle-progress>	
				</view>
				-->
				<view class="u-m-t-20">
					<text class="font_class">最大回撤</text>
				</view>
				<view class="u-m-t-40 u-m-b-60 upgrade" @tap="upGrade">
					<text>升级申请</text>
				</view>
			</view>
			<view>
				<u-toast ref="uToast"></u-toast>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	
	import {getCheckUpList, getUpgradeLevel} from "@/api/user_view.js";
	export default {
		data() {
			return {
				title: 'admin',
				scrollHeight: '',
				month_trade_target: 0,
				month_trade_now: 0,
				month_profit_target: 0,
				month_profit_now: 0,
				
				threeMonth_trade_target: 0,
				threeMonth_trade_now: 0,
				threeMonth_profit_target: 0,
				threeMonth_profit_now: 0,
				
				max_retracement:0,
				dropdownIndex: '',
				value1: '',
				value2: '2',
				mask: true,
				self_close: true,
				user:'asdad',
				line_percent1: 0,
				line_percent2:0,
				line_percent3:0,
				line_percent4:0,
				circle_percent:0,
				userList:[],
				hasUpgrade:false,
				apply:0,
				periodDate:''
			}
		},
		onLoad() {
			const res = uni.getStorageSync('wx_strategist_list');
			console.log("res",res);
			// this.title = this.userName;
			const info = uni.getSystemInfoSync()
			this.scrollHeight = info.windowHeight -uni.upx2px(80) +'px'
			this.userList = JSON.parse(res);
			
			//this.userList = res;
			console.log("userList: "+" "+ this.userList);
			this.getDate(this.strategistId);
			if(this.strategistId)
			{
				this.title = this.userList[this.strategistId];
			}
			else{
				this.title = this.userName;
			}
		},
		methods: {
			openDropdown(index) {
				console.log('openDropdown+index'+index);
				this.dropdownIndex = index;
			},
			closeDropdown(index) {
				this.dropdownIndex = '';
			},
			format(data) {
				var data1 = 0;
				if(data >100)
				{
					data1 = 100;
				}
				else
				{
					data1 = Math.round(data);
				}
				return data1;
			},
			async getDate(index) {
				
				console.log('title',this.title);
				const data = await getCheckUpList(index);
				console.log("data:",data);
				// 本月交易次数百分比
				this.month_trade_target = data.standard.month_tradingCount;
				this.month_trade_now = data.this_month.trading_count;
				if(this.month_trade_now === undefined)
				{
					this.month_trade_now =0;
				}
				
				var percent1 = 0;
				var percent2 = 0;
				var percent3 = 0;
				var percent4 = 0;
				
				percent1 = this.month_trade_now/this.month_trade_target * 100;
				this.line_percent1 = this.format(percent1);
				console.log("now: ",this.month_trade_now);
				console.log('target',this.month_trade_target);
				console.log("line1",this.line_percent1);
				
				
				//本月收益率百分比
				this.month_profit_target = data.standard.month_yield;
				
				this.month_profit_now =data.this_month.yield;
				
				if(  isNaN(this.month_profit_now))
				{
					this.month_profit_now = 0;
				}
				
				if(this.month_profit_now <= 0)
				{
					this.line_percent2 = 0;
				}
				else{
					percent2 = this.month_profit_now / this.month_profit_target * 100;
					this.line_percent2 = this.format(percent2);
				}
				
				//本期交易次数百分比
				this.threeMonth_trade_target = data.standard.period_tradingCount;
				this.threeMonth_trade_now = data.period.trade_count;
				percent3 = this.threeMonth_trade_now / this.threeMonth_trade_target * 100;
				this.line_percent3 = this.format(percent3);
				
				//本期收益率百分比
				this.threeMonth_profit_target = data.standard.period_yield;
				this.threeMonth_profit_now = data.period.yield;
				if(this.threeMonth_profit_now <= 0)
				{
					this.line_percent4 = 0;
				}
				else{
					percent4 = this.threeMonth_profit_now / this.threeMonth_profit_target * 100;
					this.line_percent4 =this.format(percent4);
				}
				
				//本期最大回撤
				this.max_retracement = data.period.drawdown.drawdown_rate;
				this.circle_percent = this.max_retracement;
				
				//是否能够申请提升等级
				if(data.period.results == 1)
				{
					this.hasUpgrade = true;
				}
				this.apply = data.period.apply;
				this.periodDate = data.period.date_range;
			},
			tagClick(index) {
				console.log("index",index);
				this.getDate(index);
				console.log("title:",this.title);
				this.$refs.uDropdown.close();
				this.title = this.userList[index];
			},
			async upGrade() {
				// const res =await getUpgradeLevel(this.periodDate);
				// console.log("resssssssss"+ res.msg);
				// this.$refs.uToast.show({
				// 	title: res.msg
				// })
				if(this.hasUpgrade && this.apply == 0)
				{
					const res = getUpgradeLevel(this.periodDate);
					this.$refs.uToast.show({
						title: res.msg
					})
				}
				else if(this.hasUpgrade && this.apply == 1)
				{
					this.$refs.uToast.show({
						title:'您已经申请过了，请等待审核!!!'
					})
				}
				else{
					this.$refs.uToast.show({
						title:'没有申请权限，请继续努力!!!'
					})
				}
			}
		},
		
		computed:{
			...mapState(['strategistId']),
			zIndex: function() {
				return this.dropdownIndex!==''?99999999:'';
			},
			circleActiveColor: function() {
				const f = this.circle_percent
				let color = '#fff'
				if (f>=0 && f<10) {
					color = '#28713E'
				}
				if (f>=10 && f<20) {
					color = '#F7BA0B'
				} else if (f>=20) {
					color = '#ff0000'
				}
				return color
			},
			percentCssName() {
				const f = this.circle_percent
				let cssName = ''
				if (f>=0 && f<10) {
					cssName = 'green'
				}
				if (f>=10 && f<20) {
					cssName = 'yellow'
				} else if (f>=20) {
					cssName = 'red'
				}
				return cssName
			},
			userName: function() {
				if (this.$store.state && this.$store.state.userName) {
					return this.$store.state.userName
				}
				return uni.getStorageSync('wx_login_username')
			},
		}
	}
</script>



<style lang="scss">
	page {
		background-color: #333;
	}
	.fixed-css {
		position: fixed;
		/* #ifndef H5 */
		top: 0px;
		/* #endif */
		/* #ifdef H5 */
		top: 44px;
		/* #endif */
	}
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		display: none;	
		color:transparent;
	}
	.green{
		color: #28713E;
	}
	.yellow{
		color: #F7BA0B;
	}
	.red{
		color: #ff0000;
	}
	.u-config-wrap {
		padding: 40rpx;
	}
	.u-padding {
		padding-left: 20rpx;
		padding-right: 20rpx;
	}
	.u-300 {
		width: 300rpx;
	}
	.u-width{
		@extend .u-padding;
		width: 750rpx;
	}
	.bg-border {
		background-color: rgba(255,255,255,0.1);
		border-radius:8rpx;
		height: 80rpx;
	}
	.font_class{
		color: #fff;
	}
	.slot-content {
		width: 300rpx;
		background-color: rgba(255,255,255,0.1);
		/*margin-left: 20rpx;*/
		//padding: 24rpx;
		margin-left: 20rpx;
		box-sizing: content-box;
		.item-box {
			//margin-bottom: 50rpx;
			display: flex;
			flex-direction: column;
			flex-wrap: nowrap;
			justify-content: space-between;
			
			.item {
				border: 1px solid #b2b2b2;
				color: #b2b2b2;
				background-color: #333;
				border-radius: 8rpx;
				height: 80rpx;
				display: flex;
				align-items: center;
				justify-content: space-around;
				//padding: 8rpx 40rpx;
				//border-radius: 100rpx;
				//margin-top: 30rpx;
			}
			
			.active {
				color: #FFFFFF;
				//background-color: $u-type-primary;
			}
		}
	}
	.warp{
		
	}
	.header{
		width: 40%;
		height: 60rpx;
		background-color: rgba(255,255,255,0.2);
		border-radius: 8rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.body{
		padding-left: 20rpx;
		padding-right: 20rpx;
		color: #ffffff;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		display: flex;
		flex-direction: column;
		.content{
			margin-top: 20rpx;
			margin-bottom: 10rpx;
			height: 160rpx;
			border-radius: 8rpx;
			background-color: rgba(255,255,255,0.1);
			display: flex;
			align-items: center;
			flex-direction: column;
			.content_top{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				height: 50%;
				width: 80%;
				margin: 10rpx;
				font-size: 20rpx;
				color: rgba(255,255,255,0.7);
			}
			.content_bottom{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				width: 80%;
				margin: 10rpx;
				align-items: center;
				height: 50%;
				.content_bottom_progress{
					height: 30rpx;
					align-items: center;
					width: 85%;
				}
			}
		}
	}
	.foot{
		display: flex;
		position: relative;
		align-items: center;
		flex-direction: column;
		/*justify-content: space-around;*/
		.upgrade{
			width: 30%;
			height: 60rpx;
			background-color: #676D81;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 8rpx;
		}
	}
	.u-progress-content{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.u-progress-info {
			font-size: 36rpx;
			padding-left: 16rpx;
			letter-spacing: 2rpx;
		}
</style>
