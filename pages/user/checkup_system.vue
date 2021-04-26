<template>
	<view class="warp">
		<!-- <view class="header">
			<text>{{user}}</text>
		</view> -->
		<view>
			<view class="u-width ">
				<u-dropdown  :close-on-click-self="self_close" :close-on-click-mask="mask" ref="uDropdown" inactive-color="#fff" :activeColor="activeColor">
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
					<u-line-progress active-color="#51DEFF" :percent="line_percent1" :striped="true" :striped-active="true"></u-line-progress>
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
					<u-line-progress active-color="#FF3F6A" :percent="line_percent2" :striped="true" :striped-active="true"></u-line-progress>
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
					<u-line-progress active-color="#51DEFF" :percent="line_percent3" :striped="true" :striped-active="true"></u-line-progress>
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
					<u-line-progress active-color="#FF3F6A" :percent="line_percent4" :striped="true" :striped-active="true"></u-line-progress>
				</view>
			</view>
		</view>
		<view class="foot">
			<view v-if="circle_percent>=0 && circle_percent<10">
				<u-circle-progress width="300" bg-color="#333" active-color="#28713E" :percent="circle_percent">
					<view class="u-progress-content">
						<text class="u-progress-info green">{{circle_percent}}%</text>
					</view>
				</u-circle-progress>	
			</view>
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
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	
	import {getCheckUpList} from "@/api/user_view.js";
	export default {
		data() {
			return {
				title: 'admin',
				
				month_trade_target: 0,
				month_trade_now: 0,
				month_profit_target: 0,
				month_profit_now: 0,
				
				threeMonth_trade_target: 0,
				threeMonth_trade_now: 0,
				threeMonth_profit_target: 0,
				threeMonth_profit_now: 0,
				
				max_retracement:0,
				
				value1: '',
				value2: '2',
				mask: true,
				self_close: true,
				user:'asdad',
				line_percent1:0,
				line_percent2:0,
				line_percent3:0,
				line_percent4:0,
				circle_percent:0,
				activeColor: '#FFFFFF',
				userList:[]
			}
		},
		onLoad() {
			const res = uni.getStorageSync('wx_strategist_list');
			console.log("res",res);
			// this.title = this.userName;
			this.userList = JSON.parse(res);
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
			async getDate(index) {
				
				console.log('title',this.title);
				const data = await getCheckUpList(index);
				console.log("data:",data);
				// 本月交易次数百分比
				this.month_trade_target = data.standard.month_tradingCount;
				this.month_trade_now = data.this_month.trading_count;
				this.line_percent1 = (this.month_trade_now/this.month_trade_target).toFixed(2)*100;
				//本月收益率百分比
				this.month_profit_target = data.standard.month_yield;
				this.month_profit_now =data.this_month.yield;
				if(this.month_profit_now < 0)
				{
					this.line_percent2 = 0;
				}
				else{
					this.line_percent2 = (this.month_profit_now / this.month_profit_target).toFixed(2)*100;
				}
				
				//本期交易次数百分比
				this.threeMonth_trade_target = data.standard.period_tradingCount;
				this.threeMonth_trade_now = data.period.trade_count;
				this.line_percent3 = (this.threeMonth_trade_now / this.threeMonth_trade_target).toFixed(2)*100;
				
				//本期收益率百分比
				this.threeMonth_profit_target = data.standard.period_yield;
				this.threeMonth_profit_now = data.period.yield;
				if(this.threeMonth_profit_now < 0)
				{
					this.line_percent4 = 0;
				}
				else{
					this.line_percent4 = (this.threeMonth_profit_now / this.threeMonth_profit_target).toFixed(2)*100;
				}
				
				//本期最大回撤
				this.max_retracement = data.period.drawdown.drawdown_rate;
				this.circle_percent = this.max_retracement;
			},
			tagClick(index) {
				console.log("index",index);
				this.getDate(index);
				console.log("title:",this.title);
				this.$refs.uDropdown.close();
				this.title = this.userList[index];
			},
			upGrade() {
				this.$refs.uToast.show({
					title:'暂未开通升级申请!'
				})
			}
		},
		
		computed:{
			...mapState(['strategistId','userName']),
		}
	}
</script>

<style>
	page{
		background-color: #333;
	}
</style>

<style lang="scss">
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
	.u-width{
		width: 40%;
		background-color: rgba(255,255,255,0.1);
		border-radius:8rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
	}
	.font_class{
		color: #fff;
	}
	.slot-content {
		width: 40%;
		background-color: rgba(255,255,255,0.1);
		margin-left: 20rpx;
		//padding: 24rpx;
		
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
		margin-left: 20rpx;
		margin-right: 20rpx;
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
				width: 80%;
				margin: 10rpx;
				align-items: center;
				height: 50%;
			
			}
		}
	}
	.foot{
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: space-around;
		.upgrade{
			width: 30%;
			height: 60rpx;
			background-color: #676D81;
			display: flex;
			justify-content: space-around;
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
