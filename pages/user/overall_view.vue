<template>
	<view class="bar-sticky" id="root-view">
		<view id="top-view" :style="lineHeight+headerHeight+'px'">
			<view class="status-line" :style="{height: lineHeight+'px'}"></view>
			
			<view id="user_header" :style="'height:'+headerHeight+'px'" @tap.stop="showUserList()">
				<view>
					<image src="../../static/image/overall_view/user_avatar.png" style="width: 64rpx;height: 64rpx;" />
				</view>
				<view>
					{{strategyIstName}}
				</view>
			</view>
		 </view>
		
		<!-- @scrolltoupper="upper"  @scrolltolower="lower" @scrolltoupper="upper" -->
		<scroll-view :scroll-y="true"  :show-scrollbar="false" :style="'height:'+scrollHeight+'px;margin-top:'+marginTop" >
		
		<view id="overall_view">
			<!--
			<view class="cover_title_view">
				<text>总体一览</text>
			</view>
			
			<u-gap height="20" bg-color="$kp-bg-color"></u-gap>
			-->
			<view id="second_stat_view">
				<view id="initial_total_amount">
					<view class="total_amount_text" @tap="switchShow" >
						<view>
							实投总资金($)
						</view>
					</view>
					<view class="total_amount_number" >
						<text class="total_number_text" >
							{{ isOpenEyes? initialCapital: '*'.repeat(String(initialCapital).length) }}
						</text>
					</view>
				</view>
				<!-- 总金额 -->
				<view id="total_amount">
					<view class="total_amount_text" @tap="switchShow" >
						<view>
							当前总金额($)
						</view>
						<view style="padding-left: 5px;">
							<image :src="iconSrc" style="width:39rpx;height:25rpx;"></image>
						</view>
					</view>
					<view class="total_amount_number" style="text-align: left;">
						<text class="total_number_text">
							{{ totalAmount }}
						</text>
					</view>
				</view>
			</view>
			<view id="third_stat_view">
				<view class="cumulative_rate_view">
					<view class="cumulative_rate_text">
						<text class="">昨日收益($)</text>
					</view>
					<view class="cumulative_rate_number">
						<text :class="['cumulative_rate_number_text', overall_info.total_amount_yesterday>0? 'green-css': 'red-css']">
						{{ isOpenEyes? overall_info.total_amount_yesterday.toFixed(2): '*'.repeat(String(overall_info.total_amount_yesterday.toFixed(2)).length) }}
							
						</text>
					</view>
				</view>
				<view class="nearly_week_view">
					<view class="cumulative_rate_text">
						<text>累计收益($)</text>
					</view>
					<view class="cumulative_rate_number">
						<text class="nearly_week_number_text" :style="overall_info.accumulated_income>0? 'color:#24F5FD;': 'color:#ed3f5d;'">
							
							{{ isOpenEyes? (overall_info.accumulated_income.toFixed(2)): '*'.repeat(String(overall_info.accumulated_income.toFixed(2)).length) }}
							
						</text>
					</view>
				</view>
				<view class="nearly_month_view">
					<view class="cumulative_rate_text">
						<text>七日收益率</text>
					</view>
					<view class="cumulative_rate_number">
						<text class="month_week_number_text" :style="overall_info.nearly_week>0? 'color:#24F5FD;': 'color:#ed3f5d;'">
						{{ isOpenEyes? (overall_info.nearly_week.toFixed(2)+'%'): '*'.repeat(String(overall_info.nearly_week.toFixed(2)).length+1) }}
							
						</text>
					</view>
				</view>
			</view>
		</view>
		<view id="four_stat_view" @tap="gotoOverallStat">
			<text>查看收益详细</text>
		</view>
		<!--
		<u-gap height="20" bg-color="#kp-bg-color"></u-gap>
		-->
		
		<view v-for="strategy,index in category_list" :key="strategy.cgroup_id" class="strategy-row" @tap="gotoStrategyGroupDetail(strategy)" :style="index!=0 ? 'margin-top:83rpx;':''">
			<view class="flex-class"> 
				<view class="flex-class-0">
					<view class="strategy-name-class">
						{{strategy.title}}
					</view>
					<view>
						<text class="margin-css ">实投资金:</text>
						<text class=" black-css">{{strategy.actual_investment.toFixed(2)}}</text>
					</view>
				</view>
			</view>
			<view class="flex-row-class margin-row-css">
				<view>
					<image v-if="strategy.month_profit>0" src="../../static/image/overall_view/up.png" style="width: 30rpx;height: 30rpx;"></image>
					<image v-if="strategy.month_profit<=0" src="../../static/image/overall_view/down.png" style="width: 30rpx;height: 30rpx;"></image>
				</view>
				<view class="font-class center-flex-row">
					<!--   class="margin-css" -->
					<view  space="ensp" class="margin-css">近一月收益:  </view> 
					<view :class="strategy.month_profit<0?'red-class': 'green-class'">{{strategy.month_profit.toFixed(2)}}</view>
					<view>
						<text :class="strategy.nearly_month<0?'red-class': 'green-class'">({{strategy.nearly_month.toFixed(2)}}%)</text>
					</view>
				</view>
				<view>
					<!-- 一个月的收益 -->
					<image v-if="strategy.month_profit<0" src="../../static/image/overall_view/next.png" style="width: 30rpx;height: 30rpx;"></image>
					
					<image v-if="strategy.month_profit>=0" src="../../static/image/overall_view/prev.png" style="width: 30rpx;height: 30rpx;"></image>
				</view>
			</view>
			
			<u-line length="710" margin="0px 20rpx 0px 20rpx" color="#FFFFFF"></u-line>
			<view class="flex-row-class flex-row-class2">
				<view>
					<image v-if="strategy.total_profit>0" src="../../static/image/overall_view/up.png" style="width: 30rpx;height: 30rpx;"></image>
					<image v-if="strategy.total_profit<=0" src="../../static/image/overall_view/down.png" style="width: 30rpx;height: 30rpx;"></image>
				</view>
				<view class="font-class center-flex-row">
					<view space="ensp" class="margin-css">总收益:  </view>
					<view :class="strategy.total_profit<0?'red-class': 'green-class'">{{strategy.total_profit.toFixed(2)}}
					</view>
					<view>
						<text :class="strategy.cumulative_rate<0?'red-class': 'green-class'">({{strategy.cumulative_rate.toFixed(2)}}%)</text>
						</view>
				</view>
					
					<view>
						<image v-if="strategy.total_profit<=0" src="../../static/image/overall_view/next.png" style="width: 30rpx;height: 30rpx;"></image>
						<image v-if="strategy.total_profit>0" src="../../static/image/overall_view/prev.png" style="width: 30rpx;height: 30rpx;"></image>
					</view>
				</view>
			<!--
			<u-gap height="2" bg-color="#f2f2f2" margin-top="40"></u-gap>
			-->
		</view>
		
		<view style="height: 40rpx;">
			
		</view>
		</scroll-view>
		
		<uni-drawer ref="showLeft" @close="closeDrawer"  mode="left" :width="320">
			<view class="status-line" :style="{height: lineHeight+'px'}"></view>
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
			
				<view style="margin-bottom: 30px;margin-left:35px;margin-top: 32px;">
					<text id="blockchain-product">区块链产品</text>
				</view>
				<scroll-view id="user-list" :scroll-y="true" :style="{height: userListHeight, width:'185px'}">
					<view id="user-list-view">
						<view class="user-account-css" @tap="switchStrategist('')">
							<text>{{userName}}</text>
							<icon type="success_no_circle" v-if="strategistId===''"></icon>
						</view>
						<view v-for="(user, index) in userList" :key="index" class="user-account-css" @tap="switchStrategist(index)">
							<text>{{ user }}</text>
							
							<icon type="success_no_circle" v-if="strategistId===index"></icon>
						</view>
						<view class="user-account-css">
							<text></text>
						</view>
						
					</view>
				</scroll-view>
		</uni-drawer>
		
		<u-modal @confirm="confirmLogout" :cancel-style="{color:'#b1b7bc'}" :confirm-style="{color:'#ffffff'}"  :title-style="{color:'#FFFFFF'}" :modalStyle="{backgroundColor:'#333'}" :content-style="{ color: '#b1b7bc'}" v-model="showMsg" show-cancel-button mask-close-able content="你确定要退出吗?"></u-modal>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import http from '../../common/http.js';
	let statData = {};
	export default {
		onPullDownRefresh: function() {
			console.log('refresh...');
		    this.getCategorySumStats(1);
		},
		mounted() {
			const systemInfo = uni.getSystemInfoSync();
			// px转换到rpx的比例
			let pxToRpxScale = 750 / systemInfo.windowWidth;
			this.lineHeight =  systemInfo.statusBarHeight;
			this.headerHeight = 44;
			
		},
		onTabItemTap(item) {
			console.log('item onTabItemTap 11:', item);
			//this.strategistId = -1;
			
		},
		onShow() {
			console.log('onShow ....');
			this.pageNo = 1
			this.getCategorySumStats();
		},
		onHide() {
			
		},
		computed: {
			...mapState([ 'hasLogin',  'strategistId']),
			userName: function() {
				if (this.$store.state && this.$store.state.userName) {
					return this.$store.state.userName
				}
				return uni.getStorageSync('wx_login_username')
			},
			iconSrc:function() {
				return this.isOpenEyes ? '../../static/image/overall_view/open-eyes.png': '../../static/image/overall_view/closeeye.png';
			},
			totalAmount:function() {
				let s = this.overall_info.total_amount;
				if(this.isOpenEyes == 1) {
					return s.toFixed(2);
				}
				if (typeof s!='string') {
					s+="";
				} 
				const len = s.length;
				return "*".repeat(len);
			},
			strategyIstName: function() {
				if (!this.strategistId) {
					return this.userName
				} else {
					const obj = this.userList
					return obj[this.strategistId]
				}
			}
		},
		components:{
			
		},
		data() {
			return {
				show: false,
				visible: false,
				pageNo: 1,
				totalpage: '',
				headerHeight: 0,
				lineHeight: '',
				isOpenEyes: 1,
				initialCapital: 0.0,
				userList: [],
				strategyData: [],
				userListHeight: '',
				scrollHeight: '',
				status: 'loadmore',
				username: "",
				marginTop: '',
				showMsg: false,
				overall_info: {
					// 总金额(元)
					total_amount: 0.0,
					// 累计收益（元）
					accumulated_income: 0.0,
					//累计收益率
					cumulative_rate: 0.0,
					// 近一周
					nearly_week: 0.0,
					// 近一月
					nearly_month: 0.0,
					total_amount_yesterday: 0.0
				},
				category_list: [
					
				]
			}
		},
		onLoad() {
			if(getApp().globalData.platform == 2) {
				this.setIosBackground();
			}
			this.username = this.userName + ", 欢迎使用鲲鹏资管管理系统";
			if (!this.hasLogin) {
				let sysinfo = uni.getSystemInfoSync();
				let w = sysinfo.windowWidth;
				let radio = 750/w;
				let h = sysinfo.statusBarHeight;
				console.log('h', h, h*radio);
				uni.showToast({
				    title: '标题',
					icon: 'loading',
					success() {
						uni.reLaunch({
							url: '/pages/user/login'
						});
					},
				    duration: 100
				});
			}
			const str = uni.getStorageSync('wx_strategist_list');
			this.userList = str ? JSON.parse(str): [];
			const systemInfo = uni.getSystemInfoSync();
			const h = systemInfo.windowHeight;
			console.log('h'+h)
			this.marginTop = uni.upx2px(48) + 44 + systemInfo.statusBarHeight-10 + 'px'
			this.scrollHeight = h - uni.upx2px(48) - 44 +10- systemInfo.statusBarHeight
			this.userListHeight = h - this.lineHeight - 30- 26 + 'px'
			console.log('userList', this.userList);
		},
		methods: {
			gotoStrategyGroupDetail(strategy) {
				console.log('gotoStrategyGroupDetail click...'+JSON.stringify(strategy));
				uni.navigateTo({
					url: '/pages/user/category_view?groupId='+strategy.group_id+'&title='+strategy.title
				});
			},
			setIosBackground() {
				uni.setBackgroundColor({
				    backgroundColorBottom: "#333333", // 底部窗口的背景色为绿
					backgroundColorTop:"#333333",
					backgroundColor:"#333333"
				})
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
			},
			confirm(e) {
				console.log('confirm', e);
			},
			switchStrategist(strategist_id) {
				// 更新策略师ID的值...
				this.$store.commit('setStrategistId', strategist_id);
				this.getCategorySumStats();
				//this.visible = false;
				let _self = this;
				uni.showTabBar({
					success() {
						console.log('showTabBar success!');
						_self.$refs['showLeft'].close();
					},
					animation: true
				});
			},
			upper() {
				console.log('upper!');
				uni.showLoading({
					mask: true,
					title: '加载中...'
				});
				this.getCategorySumStats(true);
			},
			lower() {
				/*setTimeout(()=> {
					console.log('lower...'+this.pageNo+','+this.totalpage);
					this.pageNo++;
					if (this.pageNo>this.totalpage) {
						return;
					}
					this.status = 'loading';
					// 请求下一页
					const result = getStrategyGroupList(this.pageNo, 10);
					this.strategyData = this.strategyData.concat(result.res);
				}, 500);*/
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
			gotoOverallStat() {
				uni.navigateTo({
					url: '/pages/user/overall_stat'
				})
			},
			gotoCategoryView(obj) {
				//分组ID 传递过去
				console.log('obj', obj)
				uni.setStorageSync('gotoCategoryView_data', obj);
				uni.switchTab({
					url:'/pages/user/category_view'
				});
			},
			logoutOrSwitchUser() {
				if (this.userList.length == 0) {
					this.logout();
				} else {
					this.showUserList();
				}
			},
			logout() {
				// 退出登录
				const _self = this;
				this.showMsg = true
			},
			confirmLogout() {
				console.log('用户点击了确定!');
				const _self = this;
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
				uni.removeStorageSync('wx_strategist_list');
				uni.reLaunch({
					url: '/pages/user/login_v2'
				});
			},
			switchShow() {
				//console.log('hehe', this.isOpenEyes);
				if(this.isOpenEyes == 1) {
					this.isOpenEyes = 0;
					this.addTotalMountVal(0, this.category_list);
				} else {
					this.isOpenEyes = 1;
					this.addTotalMountVal(1, this.category_list);
				}
			},
			cache:function(key, value, seconds) {
				let timestamp = Date.parse(new Date()) / 1000
				console.log(timestamp+"==="+key)
				if (key && value === null) {
					//删除缓存
					//获取缓存
					let val = uni.getStorageSync(key);
					let tmp = val.split("|");
					if (!tmp[1] || timestamp >= tmp[1]) {
						console.log("key已失效");
						uni.removeStorageSync(key);
						return "";
					} else {
						console.log("key未失效")
						return tmp[0]
					}
				} else if (key && value) {
					//设置缓存
					let expire = '';
					if (!seconds) {
						expire = timestamp + (3600 * 1);
					}else{
						expire = timestamp + seconds;
					}
					value = value + "|" + expire;
					uni.setStorageSync(key, value);
				} else {
					console.log("key不能空")
				}
			},
			getCategorySumStats(isRefresh)
			{
				// 获取策略面板数组
				const url = getApp().globalData.serverUrl+"/strategys/overall_stats";
				const token = uni.getStorageSync('wx_login_token');
				let params = {
					token:token,
					filterData: true,
				};
				params.strategist_id = this.strategistId;
				http.request(url, params).then(resp => {
					if(isRefresh) {
						uni.stopPullDownRefresh();
						//uni.hideLoading();
					}
					if(resp.status == 1) {
						let data = resp.data;
						//this.cache('ovallRes', JSON.stringify(data), 20*60);
						this.overall_info = data.overall;
						
						let list = data.category;
						this.addTotalMountVal(1, list);
						this.category_list = list;
						console.log('list:'+JSON.stringify(list))
						if (list.length != 0) {
							//const sum = this.calculateCapital(list);
							this.initialCapital = data.overall.actual_investment
						} else {
							this.initialCapital = 0.0
						}
					}
				});
			},
			// 计算初始总资金
			calculateCapital(arr) {
				const len = arr.length;
				console.log('arr')
				console.log(arr)
				let sum = 0;
				for (let i = 0;i<len;i++) {
					sum+=arr[i].actual_investment ? arr[i].actual_investment:0
				}
				return parseFloat(sum).toFixed(2);
			},
			addTotalMountVal(isShow, list) {
				let len  = list.length;
				if(isShow>0) {
					for(let s = 0;s<len;s++) {
						let val  = list[s].total_amount;
						list[s] = {...list[s], total_amount_val:val };
					}
				} else {
					console.log(list);
					for(let s = 0;s<len;s++) {
						let val  = list[s].total_amount;
						val+="";
						let len = val.length;
						val = "*".repeat(len);
						list[s] = {...list[s],  total_amount_val:val };
					}
				}
				//console.log('list', list);
				return list;
			}
		}
	}
</script>

<style lang="scss">
	view {
		box-sizing: border-box;
	}
	
	#root-view {
		display: flex;
		flex-direction: column;
		background-color: $kp-bg-color;
		color: $kp-font-color;
		background-repeat: no-repeat;
		height: 100vh;
		::v-deep .u-line {
			opacity: 0.5;
		}
		
		::v-deep .uni-drawer__content  {
			background-color: $kp-bg-color;
			color: $kp-font-color;
		}
		
		::v-deep .hairline-left {
		    border-left: 1rpx solid #b1b7bc;
		}
	}
	#top-view {
		position: fixed;
		width: 100vw;
	}
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		display: none;	
		color:transparent;
	}
	
	.status-line {
		background-color: $kp-bg-color;
		color: $kp-font-color;
	}
	#user_header {
		@extend  .status-line 
	}

	
	.position{
		position: fixed;
		top: 0;
		width: 100%;
		height: 104rpx;
		z-index: 999;
		background-color: #ffffff;
	}
	.margin-row-css {
		margin-top: 39rpx;
		padding-bottom: 20px;
	}
	
	.user-header{
		display: flex;
		flex-direction: row;
		justify-content: center;
		height:104rpx;
		.user-icon{
			width: 64rpx;
			height: 64rpx;
			margin: 20rpx;
			display: flex;

			justify-content: center;
		}
		
		.user-search{
			height: 64rpx;
			margin: 20rpx 20rpx;
			width: 80%;
		}
	}
	
	#user_header {
		display: flex;
		align-items: center;
		padding-left: 29rpx;
		
		>view:nth-child(1) {
			margin-right: 22rpx;
		}
	}
	
	#overall_view {
		display: flex;
		flex-direction: column;
		/*box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.2);
		opacity: 0.2;
		border: 1px solid rgba(255, 255, 255, 0.2);*/
		border-radius: 8rpx;
		margin-left : $kp-margin;
		margin-right: $kp-margin;
		background-color: rgba(255, 255, 255, 0.2);
	}


	#user_avatar {
		width:72rpx;
		margin-left:22rpx;
	}
	
	#user_avatar_image {
		max-width:72rpx;
		max-height:72rpx;
	}
	
	#user_text {
		width:656rpx;
		padding-left:21rpx;
		font-size:28rpx;
		font-family:Arial;
		font-weight:400;
		color: #333333;
		align-items: center;
		justify-content: flex-start;
	}
	
	.logout-underline {
		margin-left:10px;
		text-decoration: underline;
		color: #999;
	}
	
	.user-logout-underline {
		/*padding-left: 20rpx;*/
		padding-right: 20rpx;
		/*margin-left: 5px;*/
		color: $kp-red-color;
		text-decoration: underline;
	}
	
	#overall_title{
		
		
	}
	#overall_title_image_view {
		flex-direction: row;
		justify-content: center;
	}
	
	.overall_title_image {
		max-width: 220rpx;
		max-height: 44rpx;
	}
	.cover_title_view {
		width:100%;
		height:44rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background:url('https://kuxou.com/images/title.png');
		background-size: 220rpx 44rpx;
		background-position: center;
		background-repeat: no-repeat;
	}

	.cover_title_view >text {
		font-size:24rpx;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(255,255,255,1);
	}
	.center-flex-row {
		display: flex;
		flex: 1;
		>view {
			flex: 1;
		}
		>view:nth-child(1) {
			font-size: 22rpx;
			font-family: SimHei;
		}
		>view:nth-child(2) {
			font-size: 28rpx;
			font-family: SimHei;
		}
		>view:nth-child(3) {
			font-size: 28rpx;
			font-family: SimHei;
		}
	}
	
	
	#second_stat_view {
		display: flex;
		margin-top:49rpx;
		padding-left: 50rpx;
		padding-right: 60rpx;
		justify-content: space-between;
	}
	#total_amount {
		
	}
	
	#initial_total_amount {
	
	}
	
	#accumulated_income {
		flex-direction: column;
		margin-right:112rpx;
	}
	.total_amount_text {
		display: flex;
		height:66rpx;
		font-size: 30rpx;
		font-family: SimHei;
		font-weight: 400;
		color: $kp-gray-color;
	}
	.initial-amount-text {
		display: flex;
		justify-content: flex-start;
	}


	
	.w55 {
		width: 55%;
		display: flex;
	}
	
	.w45 {
		width: 45%;
		display: flex;
	}
	
	.total_amount_number {
		
	}
	.common-font-css {
		font-size: 48rpx;
		font-family: SimHei;
		font-weight: 400;
	}
	
	.total_number_text {
		@extend .common-font-css;
		color: $kp-font-color;
	}
	#third_stat_view {
		display: flex;
		flex-direction: row;
		margin-top:63rpx;
		
	}
	
	#four_stat_view {
		display:flex;
		justify-content: center;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		> text {
			text-decoration: underline;
			color: #FFFFFF;
			opacity: 0.5;
			font-size: 22rpx;
			font-size: SimHei;
		}
	}
	
	.cumulative_rate_view,.nearly_week_view,.nearly_month_view {
		flex-direction:column;
		flex: 1;
		text-align: center;
		padding-bottom: 47rpx;
	}
	.cumulative_rate_view, .nearly_week_view {
		border-right: 0.5px solid $kp-gray-color;
	}
	.cumulative_rate_number {
		margin-top:28rpx;
	}
	
	.cumulative_rate_text {
		color: #FFFFFF;
		justify-content: center;
	}
	
	.cumulative_rate_text>text {
		font-size:24rpx;
		font-family:Source Han Sans CN;
		font-weight:400;
		color: #FFFFFF;
	}
	
	.cumulative_rate_number_text{
		font-size:32rpx;
		font-family:Source Han Sans CN;
		font-weight:bold;
		color:rgb(0, 192, 135);
	}
	
	.nearly_week_number_text {
		font-size:32rpx;
		font-family:Source Han Sans CN;
		font-weight:bold;
		color:rgb(237, 63, 93);
	}
	
	.month_week_number_text {
		font-size:32rpx;
		font-family:Source Han Sans CN;
		font-weight:bold;
		color:rgb(0, 192, 135);
	}
	.strategy-row,.flex-class {
		display: flex;
		
		flex-direction: column;
	}
	.flex-class {
		display: flex;
		margin-top: 20rpx;
		padding-left: 40rpx;
		padding-right: 40rpx;
	}
	
	.flex-row-class2 {
		margin-top: 39rpx;
	}
	
	.strategy-row:nth-child(2){
		
	}
	
	.font-class {
		color: $kp-font-color;
		font-size: 24rpx;
	}
	.strategy-name-class {
		font-size: 28rpx;
		font-family: SimHei;
		font-weight: 800;
	}
	.eclipse-class {
		overflow-x: hidden;
		text-overflow: ellipsis;
		display: block;
	}
	.font-min-class {
		font-size: 12px;
	}
	.black-css {
		color: $kp-font-color;
		opacity: 0.5;
	}
	.flex-row-class {
		display: flex;
		justify-content: space-between;
		/*padding-top:5px;*/
		/*height: 60rpx;*/
		/*height: 60rpx;*/
		align-items: center;
		margin-left: 40rpx;
		margin-right: 40rpx;
	}
	
	#strategy-title  {
		font-weight: bold;
		margin: 20rpx 20rpx;
		font-size: 34rpx;
	}
	
	#dx_view {
		display: flex;
		height:40rpx;
		justify-content: center;
		width: 666rpx;
		margin-left: 42rpx;
		margin-right: 42rpx;
		
	}
	#dx_view::before{
	    position:relative;
		content: "";
		height: 1px;
		top:50%;
		border-top:1px solid rgba(179,179,179,1);
		width: 261rpx;
	}
	
	#dx_view::after {
		border-top:1px solid rgba(179,179,179,1);
		position:relative;
		content: "";
		height: 1px;
		top:50%;
		width: 261rpx;
	}
	
	.dx_class {
		height:40rpx;
		align-items: center;
	}
	.dx_class>text {
		color: rgba(179,179,179,1);
		font-size: 24rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
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
	

	.flex-class-0 {
		display: flex;
		> view {
			display: flex;
		}
		justify-content: space-between;
		>view:nth-child(2) {
			font-size: 22rpx;
			font-family: SimHei;
		}
	}
	.margin-css {
		margin-left: 30rpx;
		opacity: 0.7;
	}
	.flex-class-1 {
		display: flex;
		flex-direction: row-reverse;
		margin-top: 10rpx;
		height: 60rpx;
		> view {
			display: flex;
		}
		justify-content: space-between;
		align-items: center;
	}
	
	.green-css {
		color:$kp-green-color;
	}
	.red-css {
		color:$kp-red-color;
	}
	.green-class {
		color: $kp-green-color;
	}
	
	.red-class {
		color: $kp-red-color;
	}
</style>
