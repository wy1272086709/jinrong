<template>
	<view  @tap="gotoCategoryView(item.cgroup_id,item.group_id)" :class="isLastElement ?'overall_view overall_view_last': 'overall_view'">
		<!-- <view class="first_stat_view">
			<view class="first_stat_view_title">
				{{item.sName}}
			</view>
			<view class="first_stat_view_status" :style="{color:item.status==2?'rgba(38,214,80,1)':(item.status == 1?'#ec9217':(item.status ==4? 'rgba(254,65,87,1)':'#7CFC00'))}">
				<view>{{statusText(item.status)}}</view>
				<view v-if="(item.status == 1 || item.status == 2) && item.is_manual!=1">
					<u-button size="mini" @click="$emit('stopOrStart', item)" :custom-style="{backgroundColor:'#F2F2F2'}">{{item.status == 2? '暂停': (item.status == 1? '运行': '')}}</u-button>
				</view>
			</view>
			
		</view> -->
		<view class="run-stats">
			<view class="left-item">
				<view>{{item.sName}}</view>
			</view>
			<view class="right-item">
				<view class="right-item-1" :style="{color:item.status==2?'#00CCCC':(item.status == 1?'#ec9217':(item.status ==4? 'rgba(254,65,87,1)':'#7CFC00'))}" v-if="item.status != 4">
					{{statusText(item.status)}}
				</view>
				<u-subsection :list="['开', '关']" mode="subsection" activeColor="#93A0CB" bgColor="#676D81" height="40" v-if="item.status != 4" :current="item.status == 2? 0: 1" @change="changeStatus(index)"></u-subsection>
				<!--
				<u-switch size="40" inactive-color="#ec9217" active-color="rgba(38,214,80,1)" v-model="checked" @change="changeState(item)" v-if="item.status != 4"></u-switch>
				-->
			</view>
		</view>
		<view class="second_stat_view" v-if="item.status!=4">
			<!-- 总金额 -->
			<view class="flex-1">
				<view class="total_amount_text">
					<text class="">总金额($)</text>
				</view>
				<view class="total_amount_number vertical-center-css ">
					<text class="white-number-color large-text">
						{{ item.total_amount }}
					</text>
				</view>
			</view>
			<!-- 累计收益 -->
			<view class="  flex-1">
				<view class="accumulated_income_text">
					<text class="">持仓</text>
				</view>
				
				<view class="total_amount_number vertical-center-css column-flex">
					<template v-if="positionInfo.length==2">
					<view>
						<text v-for="positionStr, index in positionInfo[0]" :key="index" :style="{color:positionStr=='- -' ? '#FFFFFF': positionStr.startsWith('开空') ? '#ED4066': '#24F5FD'}">{{positionStr}}</text>
					</view>
					<view  style="margin-top:10rpx">
						<text v-for="num,index in positionInfo[1]" :key="index" :style="{color:num==0 ? '#FFFFFF': num<0 ? '#ED4066': '#24F5FD'}">{{num}}</text>
					</view>
					</template>
					<template v-else>
						<view>
							<text>- -</text>
						</view>
					</template>
				</view>
			</view>
			<view class=" flex-1">
				<view class="accumulated_income_text">
					<text class="">开仓价</text>
				</view>
				<view class="white-number-color vertical-center-css">
					<text class="large-text">{{item.positions.short_open_price!==undefined && item.positions.short_open_price!==0?item.positions.short_open_price.toFixed(2):(item.positions.long_open_price!==undefined && item.positions.long_open_price!==0 ? item.positions.long_open_price.toFixed(2): '- -')}}</text>
				</view>
			</view>
			<view class=" flex-1">
				<view class="accumulated_income_text">
					<text class="">持仓盈亏</text>
				</view>
				<view class="total_amount_number bold-text vertical-center-css column-flex">
					<view>
						<text  :style="{color:getPositionBenefitColor(item)}">{{getPositionBenefits(item)}}</text>
					</view>
					<!-- -->
					<view :style="'margin-top: 10rpx;color:'+getPositionBenefitColor(item)">
						<text>{{getPositionRatio(item)+'%'}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<u-line  margin="0px 32rpx" color="#FFFFFF"  :custom-style="{
			width:'622rpx',
			borderBottomWidth: '2px',
		}"></u-line>
		<view class="third_stat_view" :style="item.status == 4? 'border-bottom-width:0px': ''">
			<!-- :show="isShowExtra" -->
			<view class="third_stat_view-top">
				<!-- 累计收益 -->
				<view class="  flex-1">
					<view class="gray-color-view">
						<text class="">累计收益￥</text>
					</view>
					<view class="total_amount_number cumulative_rate_number">
						<text class="light-green-number-color" :style="item.accumulated_income>0? 'color:#24F5FD;': 'color:#ED4066;'">{{item.accumulated_income}}</text>
					</view>
				</view>
				<view class="cumulative_rate_view flex-1">
					<view class="gray-color-view">
						<text class="">累计收益率</text>
					</view>
					<view class="cumulative_rate_number">
						<text class="light-green-number-color" :style="item.yield_strategy.total>0? 'color:#24F5FD;': 'color:#ED4066;'">
							{{ item.yield_strategy.total+'%' }}
						</text>
					</view>
				</view>
				<view class="nearly_week_view flex-1">
					<view class="gray-color-view">
						<text>近一周</text>
					</view>
					<view class="cumulative_rate_number">
						<text class="light-green-number-color" :style="item.yield_strategy.week>0? 'color:#24F5FD': 'color:#ED4066;'">
							{{ item.yield_strategy.week+'%' }}
						</text>
					</view>
				</view>
				<view class="nearly_month_view flex-1">
					<view class="gray-color-view">
						<text>近一月</text>
					</view>
					<view class="cumulative_rate_number">
						<text class="light-green-number-color" :style="item.yield_strategy.month>0? 'color:#24F5FD;': 'color:#ED4066;'">
							{{ item.yield_strategy.month+'%' }}
						</text>
					</view>
				</view>
				
			</view>
		
			<!-- :show="!isShowExtra" -->
			<view class="third_stat_view-bottom">
				
			</view>
		</view>
		<u-line margin="0px 32rpx" color="#FFFFFF"  :custom-style="{
			width:'622rpx',
			borderBottomWidth: '2px',
		}"></u-line>
		<slot />
	
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default() {
					return {}
				}
			},
			isLastElement: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				checked: true,
				mode: 'left',
				isShowExtra: true,
			}
		},
		computed: {
			positionInfo: function() {
				let positions = this.item.positions
				if (positions===undefined) return [ '- -']
				let positionArr = []
				let positionNum = []
				if (positions.short_pos!=0 && positions.short_pos!= undefined) {
					positionArr.push('开空')
					positionNum.push(positions.short_pos)
				}
				if (positions.long_pos!=0 && positions.long_pos!= undefined) {
					positionArr.push('开多')
					positionNum.push(positions.long_pos)
				}
				//console.log('positionArr:'+JSON.stringify(positionArr))
				return positionArr.length>0 ? [ positionArr, positionNum ]: [ '- -' ]
			},
		},
		methods: {
			changeState(item)
			{
				this.$emit('stopOrStart', item);
			},
			changeStatus(index) {
				this.$emit('stopOrStart', this.item);
			},
			statusColor(status) {
				const color = status==2?'rgba(38,214,80,1)':(status == 1?'#ec9217':(status ==4? 'rgba(254,65,87,1)':'#7CFC00'));
				return {color:color};
			},
			statusText(status) {
				console.log('status...'+status)
				return status==2?'运行中':(status == 1?'暂停': (status == 4?'已停止':'未初始化'));
			},
			gotoCategoryView(cgGroupId, groupId) {
				this.$emit('gotoCategoryView', { groupId:groupId, cgGroupId: cgGroupId });
			},
			showExtraStatInfo(mode) {
				this.isShowExtra = !this.isShowExtra;
				this.mode = mode;
			},
			positionDirection(item) {
				if (item.status == 2)
				{
					this.checked = true;
				}
				else{
					this.checked = false;
				}
				if (item.positions===undefined) return '--'
				let positionArr = []
				if (item.positions.short_pos!=0 && item.positions.short_pos!= undefined) {
					positionArr.push('开空')
				}
				if (item.positions.long_pos!=0 && item.positions.long_pos!= undefined) {
					positionArr.push('开多')
				}
				return positionArr.length>0 ? positionArr.join("-"): '--'
			},
			
			getPositionBenefits(item) {
				if (item.transaction_info === undefined) {
					return 0;
				} 
				const num = item.transaction_info.earnings!==undefined ? item.transaction_info.earnings: (item.transaction_info.profit_loss!==undefined? item.transaction_info.profit_loss: 0);
				return num
			},
			getPositionRatio(item) {
				const benefits = this.getPositionBenefits(item)
				const ratio = parseFloat(benefits*100/parseFloat(item.total_amount))
				return ratio.toFixed(2)
			},
			getPositionBenefitColor(item) {
				if (item.transaction_info === undefined) {
					return '#FFFFFF'
				}
				const num = item.transaction_info.earnings!==undefined ? item.transaction_info.earnings: (item.transaction_info.profit_loss!==undefined? item.transaction_info.profit_loss: 0);
				let color = '';
				if (num == 0) {
					color = '#FFFFFF'
				} else if(num>0) {
					color = '#24F5FD'
				} else if(num<0) {
					color = '#ED4066'
				}
				return color
			},
			// 持仓方向，也要根据颜色做区分
			getDirectionColor() {
				let color = ''
				const item = this.item
				if (item.positions===undefined) {
					color = '#FFFFFF'
					return
				}
				if (item.positions.short_pos!=0 && item.positions.long_pos!=0) {
					color = '#FFFFFF'
				}
				else if(item.positions.short_pos!=0) {
					color = '#ED4066'
				}
				else if(item.positions.long_pos!=0) {
					color = '#24F5FD'
				}
				return color
			}
		}
	}
</script>

<style lang="scss">
	.strategy-group-name {
		font-weight: 800;
		margin-left: 32rpx;
	}
	
	.overall_view {
		margin-left: 32rpx;
		margin-right: 32rpx;
		position: relative;
		background: rgba(255, 255, 255, 0.1);
		flex-direction: column;		
		/*border: 1px solid #FFFFFF;*/
		border-radius: 20rpx;		
		margin-bottom: 27rpx;
		margin-top: 27rpx;
	}
	
	
	
	.gray-color-view {
		font-size: 24rpx;
		font-family: SimHei;
		font-weight: 400;
		color: #C3C3C3;
		opacity: 0.5;
	}
	
	.overall_title{
		
		
	}
	.overall_title_image_view {
		flex-direction: row;
		justify-content: center;
	}
	
	.overall_title_image {
		max-width: 220rpx;
		max-height: 44rpx;
	}
	.overall_title_view {
		width:100%;
		height:44rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background:url('https://kuxou.com/images/title.png');
		background-size: 280rpx 44.4rpx;
		background-position: center;
		background-repeat: no-repeat;
	}
	
	.cumulative_rate_text {
		/* justify-content: center; */
		color: #999999;
	}
	
	.overall_title_view >text {
		font-size:24rpx;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(255,255,255,1);
	}
	.author_view {
		flex-direction: row;
		justify-content: flex-end;
		margin-right:116rpx;
		margin-top:20rpx;
		font-size: 24rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: rgba(51,51,51,1);
	}
	
	.first_stat_view {
		display: flex;
		flex-direction: row;
		margin-bottom:36rpx;
		/*padding-left: 32rpx;
		padding-right: 46rpx;*/
		margin-left: 32rpx;
		margin-right: 32rpx;
		padding-top: 40rpx;
		
		justify-content: space-between;
		/*align-items: center;*/
		
	}
	
	.first_stat_view_title {
		font-weight: 600;
		color: #999999;
		font-size: 20rpx;
		/*padding-bottom: 20rpx;*/
		width: 485rpx;
		display: flex;
		align-items: center;
		overflow: hidden;
		text-overflow:ellipsis; 
		white-space: nowrap;
		width: 70%;
	}
	.run-stats{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding-left: 20rpx;
		padding-right: 20rpx;
		padding-top: 27rpx;
		margin-bottom: 27rpx;
		
		.left-item{
			font-weight: 600;
			color: #FFFFFF;
			opacity: 0.5;
			font-size: 20rpx;
			width: 70%;
			/*margin-left: 12rpx;*/
			>view {
				overflow: hidden;
				text-overflow:ellipsis; 
				white-space: nowrap;
				
			}
		}
		.right-item{
			display: flex;
			flex-direction: row;
			align-items: center;
		}
		.right-item-1{
			margin-right: 10rpx;
			font-size: 24rpx;
		}
	}
	.first_stat_view_status {
		color: #00FF00;
		display: flex;
		>view:nth-child(1) {
			display: flex;
			align-items: center;
			margin-right: 20rpx;
		}
	}
	.second_stat_view {
		display: flex;
		flex-direction: row;
		margin-left: 32rpx;
		margin-right: 32rpx;
		/*margin-top:36rpx;*/
		justify-content: space-between;
		padding-bottom: 20rpx;
		/*border-bottom: 1px solid #F2F2F2;*/
	}
	.flex-1 {
		flex: 1;
		text-align: center;
		
	}
	.total_amount {
		flex-direction: column;
	}
	.accumulated_income {
		flex-direction: column;
	}
	.total_amount {
		margin-left:55rpx;
	}
	.accumulated_income {
		margin-right:55rpx;
	}
	
	.total_amount_text,.accumulated_income_text {
		height:66rpx;
	}
	.accumulated_income_text {
		color: $kp-font-color;
		opacity: 0.5;
		@extend  .font-config;
	}
	.total_amount_text {
		color: $kp-font-color;
		opacity: 0.5;
		@extend  .font-config;
	}
	.total_amount_text>text, .accumulated_income_text>text {
		font-size: 24rpx;
		font-family: SimHei;
		font-weight: 400;
	}
	
	.total_amount_number {
		@extend  .font-config;
	}
	
	.one-number-color {
		font-size:28rpx;
		font-family:Source Han Sans CN;
		font-weight:bold;
		color:rgba(0,0,0,1);
	}
	.grey-number-color {
		color: #999999;
	}
	.black-number-color {
		font-size:28rpx;
		font-family:Source Han Sans CN;
		font-weight:bold;
		color:rgba(0,0,0,1);
	}
	.green-number-color {
		font-size:28rpx;
		font-family:Source Han Sans CN;
		font-weight:bold;
		color:#00CC00;
	}
	.light-green-number-color { 
		color: #24F5FD;
	}
	
	.third_stat_view {
		display: flex;
		flex-direction: column;
		/*padding-top:36rpx;*/
		padding-bottom: 20rpx;
		/*border-bottom: 1px solid #F2F2F2;*/
		
		margin-left: 32rpx;
		margin-right: 32rpx;
		padding-top: 20rpx;
		/*justify-content: space-around;*/
		&-top {
			display: flex;
		}
		&-bottom {
			display: flex;
		}
	}
	
	.cumulative_rate_view,.nearly_week_view,.nearly_month_view {
		flex-direction:column;
	}
	
	.nearly_week_view,.nearly_month_view {
		@extend .font-config;
	}
	
	.cumulative_rate_number {
		margin-top:28rpx;
		/*text-align: center;*/
	}
	.cumulative_rate_view {
		display: flex;
		width:228.66rpx;
		@extend  .font-config;
	}
	/*
	.cumulative_rate_text>text {
		font-size:24rpx;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(204,204,204,1);
	}*/
	
	.cumulative_rate_number_text{
		font-size:32rpx;
		font-family:Source Han Sans CN;
		font-weight:bold;
		color:rgba(38,214,80,1);
	}
	
	.nearly_week_number_text {
		font-size:32rpx;
		font-family:Source Han Sans CN;
		font-weight:bold;
		color:rgba(254,65,87,1);
	}
	
	.month_week_number_text {
		font-size:32rpx;
		font-family:Source Han Sans CN;
		font-weight:bold;
		color:rgba(38,214,80,1);
	}
	.overall_view_last {
		margin-bottom: 50rpx;
	}
	
	/*/deep/ .uni-transition {
		transition-timing-function: linear;
		transition-duration: 2s;
		transition-property: transform, opacity;
	}*/
	
	.flex-1 {
		flex: 1;
		text-align: center;
		align-items: center;
	}
	
	.center-css {
		text-align: center;
	}
	
	.third_stat_view_left {
		display: flex;
		padding-left: 32rpx;
		width: 100%;
	}
	
	.third_stat_view_right {
		display: flex;
		padding-right: 32rpx;
		width: 100%;
		
	}
	
	.status-title-view {
		position: absolute;
		display: block;
		line-height: 44rpx;
		text-align: center;
		top: 0;
		width:100rpx;
		height:44rpx;
		right:0rpx;
		
		border-bottom-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		color: #FFFFFF;
		font-size:24rpx;
	}
	.category-component-clazz {
		margin-bottom: 20px;
	}
	.font-config {
		font-size: 24rpx;
		font-family: SimHei;
		font-weight: 400;
	}
	.white-number-color {
		@extend  .font-config;
		color: #FFFFFF;
	}
	
	.large-text {
		font-size: 28rpx;
		font-family: SimHei;
		font-weight: 400;
		color: #FFFFFF;
	}
	
	.vertical-center-css {
		height: 66rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.column-flex {
		display: flex;
		flex-direction: column;
	}
</style>
