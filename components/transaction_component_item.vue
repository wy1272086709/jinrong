<template>
	<view>
		<view class="transaction-view" :style="customStyle">
			<view class="box">
				<view class="transaction-sname u-line-1" >
					{{strategyInfo.sName}}
				</view>
				<view class="bk">
					<!-- style="width:520rpx;" -->
					<view class="transaction-view-top" @click="gotoTrasactionPage">
						<view >
							<view class="transaction-view-group" >
								<view class="u-m-l-15 juzhong2">
									<image style="width: 30rpx;height: 30rpx;" src="../static/image/overall_view/people.png"></image>
								</view>
								<view class="u-m-l-15">
									{{ strategyInfo.strategyGroupName }}
								</view>
								<view>
									<u-tag bg-color="rgba(255,255,255,0.1)" class="u-m-l-20" :text="statusText" mode="plain"  :closeable="false" :border-color="statusColor" :color="statusColor"	size="mini"/>
								</view>
								<view class="font-adjust u-m-l-20">
									<text class="transaction-view-middle-label u-m-l-40">胜率:</text>
									<text :class="[stategyTrasactionInfo.winRatio>0?'green-css':'red-css']">{{stategyTrasactionInfo.winRatio}}%</text>
								</view>
							</view>
							
							
						</view>
						
						
							<!-- <u-button :disabled="disabled" type="default" size="mini" class="my-btn" @click="gotoTrasactionPage">去交易</u-button> -->
							<!-- <image src="../static/image/overall_view/btn2.png" style="width: 60px;height: 30px;" @click="gotoTrasactionPage"></image> -->
							
							<view class="jiaoyi">
								<!-- <u-icon width="110rpx" label="去交易" label-color="#999999" label-pos="left" label-size="24rpx" name="arrow-right" size="28" color="#999999"></u-icon> -->
								<view class="jiaoyi1">
									<text>交易</text>
								</view>
							</view>
							
						
					</view>
					<view class="total_benifit">
						<view class="left-item">
							<view class="u-m-t-8">
								<image src="../static/image/overall_view/money.png" style="width:26rpx;height:26rpx"></image>
							</view>
							<view class="u-m-l-15">
								<text class="transaction-view-middle-label u-font-27">累计收益</text>
							</view>
							<view class="u-m-l-15">
								<text :class="stategyTrasactionInfo.accumulatedIncome>0?'green-css':'red-css'">{{stategyTrasactionInfo.accumulatedIncome}}</text>
							</view>
							
						</view>
						<view class="right-item">
							<view class="u-m-r-40">
								<text :class="stategyTrasactionInfo.accumulatedIncomeRatio>0?'green-css':'red-css'">({{stategyTrasactionInfo.accumulatedIncomeRatio}}%)</text>
							</view>
							<view class="u-m-t-8">
								<image v-if="stategyTrasactionInfo.accumulatedIncomeRatio>0" style="width: 28rpx;height: 32rpx;" src="@/static/image/overall_view/prev.png"></image>
								<image v-if="stategyTrasactionInfo.accumulatedIncomeRatio<=0" style="width: 28rpx;height: 32rpx;" src="@/static/image/overall_view/next.png"></image>
							</view>
							
						</view>
					</view>
					<view v-if="hasStore">
						<view class="cangwei">
							<view class="kaiduo">
								<view class="kaiduo-left">
									<view class="u-m-t-8">
										<image style="width:26rpx;height:26rpx" src="@/static/image/overall_view/duo.png"></image>
									</view>
									<view class="u-m-l-20">
										<text >开多仓位</text>
									</view>
									<view class="u-m-l-40">
										<text>{{stategyTrasactionInfo.kaiduoStorings}}</text>
									</view>
								</view>
								<view class="kaiduo-right">
									<view class="u-m-r-40 u-m-l-40">
										<text>开多仓价</text>
									</view>
									<view>
										<text>{{stategyTrasactionInfo.kaiduoPrice!==undefined ? parseFloat(stategyTrasactionInfo.kaiduoPrice).toFixed(2): ''}}</text>
									</view>
								</view>
							</view>
							<view class="kaikong">
								<view class="kaikong-left">
									<view class="u-m-t-8">
										<image style="width:26rpx;height:26rpx" src="@/static/image/overall_view/kong.png"></image>
									</view>
									<view class="u-m-l-16">
										<text >开空仓位</text>
									</view>
									<view class="u-m-l-40">
										<text>{{stategyTrasactionInfo.kaikongStrorings}}</text>
									</view>
								</view>
								<view class="kaikong-right">
									<view class="u-m-r-40 u-m-l-40">
										<text>开空仓价</text>
									</view>
									<view>
										<text>{{stategyTrasactionInfo.kaikongPrice!==undefined ? parseFloat(stategyTrasactionInfo.kaikongPrice).toFixed(2): ''}}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view v-if="!hasStore" class="no-store">
						<text>暂无仓位信息</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>


<script>
	
	export default {
		
		props: {
			customStyle: {
				type: String,
				default: ""
			},
			// 策略信息，比如策略名称,状态这些
			strategyInfo: {
				type: Object,
				default() {
					return {
						sName: 'N5_S-2018-01 ethusdt.OKEX',
						status: 1,
						strategyGroupName: '人工_YZQ',
						id: 37
					}
				}
			},
			// 交易信息,比如仓位信息,
			stategyTrasactionInfo: {
				type: Object,
				default() {
					return {
						
					};
				}
			}
		},
		computed:{
			hasStore() {
				return  ((this.stategyTrasactionInfo.kaiduoStorings!== undefined && this.stategyTrasactionInfo.kaiduoStorings != 0) || (this.stategyTrasactionInfo.kaikongStrorings!==undefined && this.stategyTrasactionInfo.kaikongStrorings != 0))
			},
			statusText() {
				const status = this.strategyInfo.status;
				return status==2?'运行中':(status == 1?'暂停': (status == 4?'已停止':'未初始化'));
			},
			statusColor() {
				const status = this.strategyInfo.status;
				return status==2?'#00cccc':(status == 1?'#ec9217':(status ==4?'#ee4368':'#7CFC00'));
			}
		},
		data() {
			const config = {
				customStyle1: {
					color: 'rgba(255, 255, 255, 1)',
					marginBottom: '30rpx',
					width: '160rpx',
					backgroundColor: 'rgb(237, 63, 93)',
					height: '60rpx',
					
				},
				customStyle2: {
					color: 'rgba(255, 255, 255, 1)',
					backgroundColor: 'rgb(0, 192, 135)',
					marginBottom: '30rpx',
					width: '160rpx',
					height: '60rpx'
				},
				disabled: false
			};
			if (this.stategyTrasactionInfo.kaiduoStorings!==undefined && this.stategyTrasactionInfo.kaiduoStorings!=0 && this.stategyTrasactionInfo.kaikongStrorings!=0 && this.stategyTrasactionInfo.kaikongStrorings!==undefined) {
			config.customStyle1.marginRight = '126rpx';
			} else {
				config.customStyle1.marginRight = '0px';
			}
			config.disabled =  this.strategyInfo.status == 0?true: false
			return config
		},
		methods: {
			gotoTrasactionPage() {
				console.log('click')
				this.$emit('gotransaction');
			}
		}
	}
</script>

<style lang="scss" scoped>
.transaction-view {
	background-color: #333333;
	// border:1px solid #F2F2F2;
	/*margin-left:32rpx;
	margin-right: 32rpx;*/
	&-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.transaction-view-group {
			display: flex;
			//margin-top:20rpx;
			align-items: center;
			>view:nth-child(2) {
				color: rgba(255,255,255,0.7);
				
			}
		}
		
		padding-top: 20rpx;
		padding-bottom: 20rpx;
	    border-bottom: 1px solid rgba(255,255,255,0.3);
	}
	&-middle {
		display: flex;
		margin-left:32rpx;
		margin-right: 32rpx;
		> view {
			display: flex;
			margin-top:20rpx;
			margin-bottom: 40rpx;
			
		}
		&-label {
			color: rgba($color: #c3c3c3, $alpha: 0.96);
			margin-right: 10rpx;
		}
	}
	&-bottom {
		display: flex;
		padding-left:32rpx;
		padding-right: 32rpx;
		&_left {
			display: flex;
			/*width: 646rpx;*/
			width: 100%;
			flex-direction: column;
			.first-row {
				display: flex;
			}
			.second-row {
				display: flex;
			}
			.transaction-view-middle-label {
				margin-bottom: 36rpx;
				
			}
			
			text:nth-child(1) {
				margin-right: 5px;
			}
		}
		&_right {
			display: flex;
			justify-content: center;
		}
	}
}
.juzhong2{
	display: flex;
	align-items: center;
}
.box{
	margin:20rpx 20rpx 40rpx 20rpx;
}

.jiaoyi{
	width:100rpx;
	height:40rpx;
	border:1px solid rgba(255,255,255,0.3);
	border-radius:8rpx;
	margin-right:40rpx;
	.jiaoyi1{
		color:#b1b7bc;
		text-align:center;
	}
}
.total_benifit{
	display:flex;
	flex-direction:row;
	justify-content:space-between;
	align-items:center;
	height:80rpx;
	margin:20rpx 20rpx 0 20rpx;
	.left-item{
		display:flex;
		flex-direction:row;
		align-items:center;
	}
	.right-item{
		display:flex;
		flex-direction:row;
		align-items:center;
	}
}
.cangwei{
	margin:0 20rpx 20rpx 20rpx;
	display:flex;
	flex-direction:column;
	color:rgba($color: #c3c3c3, $alpha: 0.96);
	font-size: 26rpx;
	.kaiduo{
		height:80rpx;
		display:flex;
		flex-direction:row;
		align-items:center;
		.kaiduo-left{
			display:flex;
			flex-direction:row;
			align-items:center;
			width:50%;
		}
		.kaiduo-right{
			display:flex;
			flex-direction:row;
			align-items:center;
			width:50%;
		}
	}
	.kaikong{
		height:80rpx;
		display:flex;
		flex-direction:row;
		
		align-items:center;
		.kaikong-left{
			display:flex;
			flex-direction:row;
			align-items:center;
			width:50%;
		}
		.kaikong-right{
			display:flex;
			flex-direction:row;
			align-items:center;
			width:50%;
		}
	}
}
.flex-1 {
	flex: 1;
}
.font-adjust {
	font-size: 26rpx;
}
.center-class {
	text-align: center;
}

.right-text{
	text-align:right;
}

.left-class {
	text-align: left;
}
.right-class {
	text-align: right;
}
.black-font {
	color: #282828;
}

.my-btn {
	padding-left: 20rpx;
	padding-right: 4rpx;
}
.green-css {
	color:#00cccc;
}

.red-css {
	color:#ee4368;
}

.custom-style-1 {
	color:rgb(237, 63, 93);
	border: 1px solid rgb(237, 63, 93);
}

.custom-style-2 {
	color: rgb(0, 192, 135);
	border: 1px solid rgb(0, 192, 135);
}
.transaction-sname {
	margin-bottom:20rpx;
	color:#ffffff;
	font-size: 24rpx;
}
.bk{
	//border: 1px solid rgba(255,255,255,0.3);
	border-radius: 8rpx;
	background-color: rgba(255,255,255,0.1);
}
.no-store {
	height: 60rpx;
	color: #CCC;
	text-align: center;
	margin-bottom: 5px;
}
</style>
