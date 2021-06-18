<template>
	<!--
	v-for="delegateInfo in delegateLogList" :key="delegateInfo.id" 
	-->
	<view class="delegate-row" :style="[ customStyle ]">
		<view class="delegate-row-1" v-if="hasSlot == 0">
			<view class="left-text">
				<!-- <u-tag :text="delegateInfo.description" :bg-color="delegateInfo.description.indexOf('平空')!==-1 || delegateInfo.description.indexOf('开多')!==-1? '#00C087':'#ED3F5D'"
				:color="'#FFFFFF'" border-color="transparent"></u-tag>
				<text class="bold-text" style="margin-left: 30rpx;">{{boldText}}</text> -->
				<view class="juzhong1">
					<image v-if="delegateInfo.description.indexOf('开多')!==-1" style="width: 40rpx;height: 40rpx;" src="../static/image/overall_view/duo.png"></image>
					<image v-if="delegateInfo.description.indexOf('开空')!==-1" style="width: 40rpx;height: 40rpx;" src="../static/image/overall_view/kong.png"></image>
				</view>
				<view class="u-m-l-20">
					<text :class="[delegateInfo.description.indexOf('开多')!==-1?'green-css':'red-css']">{{delegateInfo.description}}</text>
				</view>
				<view>
					<text class="bold-text" style="margin-left: 30rpx;">{{boldText}}</text>
				</view>
			</view>
			<view class="right-text">
				<text class="status-text">{{getDelegateStatus(delegateInfo.status)}}</text>
			</view>
		</view>
		
		<slot v-if="hasSlot!=0" />
		<!-- 委托列表 -->
		<view class="delegate-row-3 xlk" v-if="delegateType == 'list'">
			<view class="left-text pre-text1">
				<text >委托价格</text>
				<text class="u-m-l-60" :class="[delegateInfo.description.indexOf('开多')!==-1?'green-css':'red-css']">{{delegateInfo.price}}</text>
			</view>
			<view class="right-text pre-text1">开仓价格 {{delegateInfo.open_price}}</view>
		</view>
		
		<!--  -->
		<!-- 委托历史记录 -->
		<!--
		<view class="delegate-row-3" v-if="delegateType == 'history_list'">
			<view class="left-text pre-text">
				<text style="margin-right: 10rpx;">开仓时间:  </text>
				<text>{{delegateInfo.opening_at}}</text>
			</view>
			<view class="right-text pre-text">
				<text style="margin-right: 10rpx;">平仓时间:  </text>
				<text>{{delegateInfo.updated_at}}</text>
			</view>
		</view>
		-->
		
		<view class="delegate-row-3" v-if="delegateType == 'list'">
			
			<view class="left-text pre-text">
				<view>
					<text class="green-css">止盈</text>
					<text class="u-m-l-30">{{delegateInfo.prof_price}}</text>
				</view>
				<view class="u-m-l-10 u-font-20">
					<text v-if="delegateInfo.prof_price>0" class="green-css">{{getFloatProfit(1)}}</text>
				</view>
				
				<!--
				<text>估盈: {{delegateInfo.prof_price}}</text>
				-->
			</view>
			<view class="right-text pre-text">
				<text>数量</text>
				<text class="u-m-l-60">{{delegateInfo.volume}}</text>
			</view>
		</view>
		
		<view class="delegate-row-3" v-if="delegateType == 'list'">
			<view class="left-text pre-text">
				<view>
					<text class="red-css">止损</text>
					<text class="u-m-l-30">{{delegateInfo.loss_price}}</text>	
				</view>
				<view class="u-m-l-10 u-font-20">
					<text v-if="delegateInfo.loss_price>0" class="red-css">{{getFloatProfit(2)}}</text>
				</view>
				
				<!--
				<text>估损: {{delegateInfo.loss_price}}</text>
				-->
			</view>
			<view class="right-text pre-text">
				      
				<text>止损间距</text>
				<text class="u-m-l-60">{{delegateInfo.loss_delta}}</text>
			</view>
		</view>
		
		
		
		<view class="button-style" v-if="delegateType == 'list'">
			<!-- center-text -->
			<view class="left-text ">
			
				<u-button  hover-class="none" :custom-style="{'background-color':'#333333',width:'180rpx',height: '50rpx', color:'rgba(255,255,255,0.7)', border:'1rpx solid rgba(255,255,255,0.1)', marginRight:'126rpx'}" @click="$emit('showDelegateForm')">修改</u-button>
			</view>
			<view class="right-text ">
				<u-button hover-class="none"  @click="$emit('deleteDelegate')" plain :custom-style="{'background-color':'#333333',color:'rgba(255,255,255,0.7)', border:'1rpx solid rgba(255,255,255,0.1)', width:'180rpx',height: '50rpx'}" v-if="delegateInfo.status != 'WAIT_CLOSE'">撤销</u-button>
				<u-button  hover-class="none" @click="$emit('pingFunc')" plain :custom-style="{'background-color':'#333333',color:'rgba(255,255,255,0.7)', border:'1rpx solid rgba(255,255,255,0.1)', width:'180rpx',height: '50rpx'}" v-if="delegateInfo.status == 'WAIT_CLOSE'">平仓</u-button>
			</view>
		</view>
		<view class="delegate-row-3 xlk" v-if="delegateType == 'history_list'">
			<view class="left-text pre-text">
				<text class="u-font-27 font-color">成交价格</text>
				<text class="u-m-l-20 u-font-20" :class="[delegateInfo.description.indexOf('开多')!==-1?'green-css':'red-css']">{{delegateInfo.open_price}}</text>
			</view>
			<view class="right-text pre-text history-right-text">
				<text class="font-color u-font-27">委托数量</text>
				<text class="u-m-l-20">{{delegateInfo.volume}}</text>
			</view>
		</view>
		
		<!-- 止盈,止损,止损间距 && delegateLabel == '限价单'"-->
		<view class="delegate-row-3" v-if="delegateType == 'history_list'">
			<view class="left-text pre-text">
				<text style="color: #0BF4FD;font-size: 27rpx;">止盈</text>
				<text class="u-font-20 u-m-l-20">{{delegateInfo.prof_price}}</text>
				<text style="color: #C94A65;font-size: 27rpx;" class="u-m-l-20">止损</text>
				<text class="u-font-20 u-m-l-20">{{delegateInfo.loss_price}}</text>
			</view>
			<view class="right-text pre-text history-right-text">
				<text class="u-font-27 font-color">止损间距</text>
				<text class="u-font-20 u-m-l-20">{{delegateInfo.loss_delta}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	
	// 委托组件
	export default {
		props: {
			// 第一行，第二行，为自定义的插槽
			hasSlot: {
				type: [ Boolean, Number, String ],
				default: 0
			},
			delegateType: {
				type: String,
				default: 'list'
			},
			boldText: {
				type: String,
				default: ''
			},
			delegateLabel: {
				type: String,
				default: '限价单'
			},
			delegateInfo: {
				type: Object,
				default() {
					return {}
				}
			},
			customStyle: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		created() {
			console.log('hasSlot:',this.hasSlot);
			this.info = this.delegateInfo.info;
			console.log("info",this.info);
		},
		data() {
			return {
				floatProfit:"",
				info: 0
			};
		},
		methods: {
			getDelegateStatus(status) {
				const map = {'WAIT_OPEN': "等待开仓",
				'OPENING' : "正在开仓",
				'WAIT_CLOSE':"等待平仓",
				'CLOSING' :"正在平仓",
				'COMPLETE':"条件完成",
				'INVALID' : "条件无效"
				}
				// this.info = parseFloat(this.delegateInfo.info);
				// console.log("info2",this.info);
				return map[status] ?map[status]: ''
			},
			getFloatProfit(item){
				
				let volume =[];
				volume = this.delegateInfo.volume.split('/');
				let volume1 = volume[0];
				console.log("floatProfit"+ parseFloat(this.delegateInfo.open_price)+"open_price"+ parseFloat(this.delegateInfo.open_price)+ "prof_price"+parseFloat(this.delegateInfo.prof_price) + "info"+parseFloat(this.delegateInfo.info)+"loss_price"+parseFloat(this.delegateInfo.loss_price)+"volume1"+volume1);
				if(item == 1)
				{
					if(parseFloat(this.delegateInfo.prof_price) > 0)
					{
						const floatProfit = (parseFloat(this.delegateInfo.open_price) - parseFloat(this.delegateInfo.prof_price)) *parseFloat(volume1) *this.info;
						return "(预估盈利"+ Math.abs(parseFloat(floatProfit).toFixed(2))  + ")";
					}
					else{
						return "(预估盈利 0)";
					}
				}
				else{
					if(parseFloat(this.delegateInfo.loss_price) > 0)
					{
						const floatProfit = (parseFloat(this.delegateInfo.open_price) - parseFloat(this.delegateInfo.loss_price))*parseFloat(volume1) *this.info;
						return "(预估亏损-"+ Math.abs(parseFloat(floatProfit).toFixed(2))  + ")";
					}
					else{
						return "(预估亏损 0)";
					}
				}
				
				
				
				
	
			}
		}
	}
</script>

<style lang="scss">
	.delegate-row {
		display: flex;
		flex-direction: column;
		background-color: #333;
		/*margin-left: 32rpx;
		margin-right: 32rpx;
		padding-left: 40rpx;
		padding-right: 40rpx;*/
		padding-left: 32rpx;
		padding-right: 32rpx;
		// border-bottom: 1px solid #F2F2F2;
		/*margin-bottom: 20rpx;*/
		padding-bottom: 25rpx;
		&-1 {
			margin-top: 20rpx;
			border-radius: 8rpx;
			height: 74rpx;
			background-color: rgba(255,255,255,0.1);
			display: flex;
			justify-content: space-between;
			/*margin-top:22rpx;*/
			//padding-top:25rpx;
			//padding-bottom: 10rpx;
			align-items: center;
			&-left {
				display: flex;
				align-items: center;
				width: 60%;
			}
			&-right {
				display: flex;
				align-items: center;
				/*margin-right: 60rpx;*/
				width: 40%;
			}
		}
		&-2 {
			display: flex;
			padding-top:10rpx;
			padding-bottom: 10rpx;
		}
		&-3 {
			display: flex;
			padding-top:20rpx;
			padding-bottom: 20rpx;
		}
		&-4 {
			display: flex;
			padding-top:10rpx;
			padding-bottom: 20rpx;
		}
	}
	.button-style{
		display: flex;
		margin-top: 20rpx;
		/*margin-bottom: 40rpx;*/
		margin-bottom: 7rpx;
		justify-content: center;
	}
	.juzhong1{
		display: flex;
		align-items: center;
	}
	.left-text {
		display: flex;
		width: 65%;
		margin-left: 20rpx;
		align-items: center;
	}
	.center-text {
		display: flex;
		justify-content: center;
		width: 100%;
	}
	
	.right-text {
		display: flex;
		width: 35%;
		align-items: center;
	
	}
	.xlk{
		border-bottom: 1px solid rgba(255,255,255,0.1);
	}
	.history-right-text {
		justify-content: flex-start;
	}
	
	.bold-text {
		font-weight: 800;
		font-size: 24rpx;
		color:rgba(255,255,255,0.5);
	}
	.status-text {
		color: #ffffff;
		margin-left: 80rpx;
		display: flex;
		align-items: center;
		font-size: 24rpx;
	}
	.font-color{
		color: rgba($color: #c3c3c3, $alpha: 0.96);
	}
	.pre-text {
		font-size: 22rpx;
		color: rgba(195,195,195,0.96);
	}
	.pre-text1 {
		font-size: 26rpx;
		color: rgba(195,195,195,0.96);
	}
.green-css {
	color:#24f5fd;
	font-weight: 600;
}
.red-css {
	color:#fb3f69;
}
</style>
