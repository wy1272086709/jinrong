<template>
	<view id="root-view">
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
				<u-button size="mini" type="default" @click="showUserList"  :custom-style="{width: '71rpx',
				backgroundColor: '#333333',
				height: '44rpx',
				fontSize: '20rpx',
				fontFamily: 'SimHei',
				fontWeight: 400,
				color: '#FFFFFF',
				opacity: 0.4,
				borderRadius: '7rpx'}" v-if="canSwithStrategIst">切换</u-button>
			</view>
		</view>
		
		<view id="mid-view" class="mid-font flex-1">
			<!-- tabs 栏 -->
			<view id="mid-view-tabs">
				<u-subsection  bgColor="rgba(255,255,255,0.2)"  :list="['人工', '量化']"  :current="current" @change="changeTabs" activeColor="#FFFFFF" inactiveColor="#999999" buttonColor="#b1b7bc"></u-subsection>
			</view>
			<view id="mid-view-content">
				<view :class="['column',' flex-1', 'center-text' ]">
					<view>本期收益</view>
					<view :class="['data-view', statRes.profit>0?'blue-css': 'red-css']">{{statRes.profit}}</view>
				</view>
				<view :class="['column',' flex-1', 'center-text' ]">
					<view>昨日收益</view>
					<view :class="['data-view', statRes.earnings_yesterday>0?'blue-css': 'red-css' ]">{{statRes.earnings_yesterday}}</view>
				</view>
				
				<view :class="['column',' flex-1', 'center-text' ]">
					<view>提成</view>
					<view :class="[ 'data-view', statRes.allowance>0?'blue-css': 'red-css' ]">{{statRes.allowance}}</view>
				</view>
			</view>
		</view>
		
		<view id="bottom-view">
			<u-cell-group :border="false">
				<u-cell-item index=0 @click="gotoDetailPage"  title="收益明细" :arrow="true" :border-bottom="false" :border-top="false"></u-cell-item>
				<u-gap bgColor="#333" height="10"></u-gap>
				<u-cell-item index=1 @click="gotoDetailPage" title="结算明细" :arrow="true" :border-bottom="false" :border-top="false"></u-cell-item>
				<u-gap bgColor="#333" height="10"></u-gap>
				<u-cell-item  index=2  @click="gotoDetailPage" title="保证金明细" :arrow="true" :border-bottom="false" :border-top="false"></u-cell-item>
				<u-gap bgColor="#333" height="10"></u-gap>
				<u-cell-item  index=3 @click="gotoDetailPage"  title="考核指标" :arrow="true" :border-bottom="false" :border-top="false"></u-cell-item>
			</u-cell-group>
		</view>
		
		<uni-drawer ref="showLeft" @close="closeDrawer"  mode="left" :width="320">
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
		
		<u-modal @confirm="confirmLogout" :cancel-style="{color:'#b1b7bc'}" :confirm-style="{color:'#ffffff'}"  :title-style="{color:'#FFFFFF'}" :modalStyle="{backgroundColor:'#333'}" :content-style="{ color: '#b1b7bc'}" v-model="showMsg"  show-cancel-button mask-close-able content="你确定要退出吗?"></u-modal>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import { getStrategIstIncome, getIncomeSearch  } from '@/api/user_view.js';
	
	export default {
		data() {
			return {
				strategIst: '',
				job: '',
				avatarUrl: '',
				// 保存人工和量化的,结果，对应的元素的数据项如下所示:
				// 昨日收益
				// 人工数据
				"manual_res": {
					earnings_yesterday: 0,
					// 提成
					allowance: '',
					// 本期收益
					profit: '',
				},
				// 量化数据
				"quantify_res": {
					earnings_yesterday: 0,
					// 提成
					allowance: '',
					// 本期收益
					profit: '',
				},
				//result: [],
				showMsg: false,
				current: 0,
				lineHeight: '',
				userList: {}
			}
		},
		computed: {
			...mapState([ 'hasLogin', 'userName', 'strategistId']),
			canSwithStrategIst: function() {
				if (Object.keys(this.userList).length<=0) {
					return false
				}
				return true
			},
			statRes: function() {
				// 判断是人工，还是量化的数据
				const isManual = this.current == 0 ? 1: 0;
				return isManual ? this.manual_res: this.quantify_res
			}
		},
		onPullDownRefresh() {
			this.initPageInfo(true);
		},
		onShow() {
			this.initPageInfo(1);
			this.initPageInfo(0);
		},
		onLoad() {
			console.log("1");
			const str = uni.getStorageSync('wx_strategist_list');
			console.log('str:'+str);
			const obj = JSON.parse(str);
			this.userList = obj;
			console.log('this.userList',this.userList);
			const info = uni.getSystemInfoSync();
			this.scrollHeight = info.windowHeight - uni.upx2px(76) - 80+'px';
		},
		methods: {
			changeTabs(index) {
				console.log(index)
				this.current = index
				//this.initPageInfo()
			},
			open() {
				this.$refs.calendar.open()
			},
			async initPageInfo(isManualValue) {
				// 0 为人工,1不为人工
				let isManual = 0;
				if (isManualValue!==undefined) {
					isManual = isManualValue
				} else {
					isManual = this.current == 0 ? 1: 0;
				}
				try {
					const res = await getStrategIstIncome(this.strategistId, isManual);
					const { profit, strategist_name, date_range, allowance, level_name, earnings_yesterday } = res;
					
					this.strategIst = strategist_name;
					this.job = level_name;
					
					uni.setStorageSync('date_range', date_range);
					console.log('earnings_yesterday'+earnings_yesterday)
					if (isManualValue) {
						this.manual_res = {
							earnings_yesterday: earnings_yesterday,
							profit: profit,
							allowance: allowance
						}
					} else {
						this.quantify_res = {
							earnings_yesterday: earnings_yesterday,
							profit: profit,
							allowance: allowance
						}
					}
				} catch(e) {
					this.strategIst = '';
					this.job = '';
					return;
				}
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
			showUserList() {
				let _self = this;
				if (Object.keys(this.userList).length<=0) {
					return;
				}
				uni.hideTabBar({
					animation:true,
					success() {
						console.log('hideTabBar success!');
						_self.showDrawer('showLeft');
					},
				});
				//this.visible = true;
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
			gotoDetailPage(index) {
				const arr = [
					// 收益明细
					'/pages/user/income_detail',
					'/pages/user/income_balance',
					'/pages/user/bond',
					'/pages/user/checkup_system'
				];
				uni.navigateTo({
					url: arr[index],
					complete(res) {
						console.log('res')
					}
				})
				console.log(index);
			}
		}
	}
</script>

<style lang="scss">

#root-view {
	background-color: $kp-bg-color;
	min-height: 100vh;
	width: 750rpx;
	
	::v-deep .uni-drawer__content {
		background-color: $kp-bg-color;
		color: $kp-font-color;
	}
	
	::v-deep .hairline-left {
		border-left: 1rpx solid #b1b7bc;
	}
	
	#mid-view {
		margin-top: 55rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		display: flex;
		flex-direction: column;
		background: #3D3F43 !important;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		
		&-tabs {
			display: flex;
			justify-content: center;
			margin-bottom: 50rpx;
		}
		
		&-content {
			display: flex;
		}
		
		::v-deep .u-subsection {
			width: 500rpx;
		}
	}
	
	#bottom-view {
		margin-top: 71rpx;
		
		::v-deep .u-cell-box {
			margin-left: 20rpx;
			margin-right: 20rpx;
			width: 710rpx;
			background: #3D3F43;
			
		}
		
		::v-deep .u-cell {
			background: #3D3F43 !important;
			
		}
		
		
		::v-deep .u-cell_title {
			@extend  .mid-font;
		}
		
		::v-deep .u-cell__right-icon-wrap {
			// 颜色
			color: #FFFFFF;
			font-size: 37.8rpx;
		}
		
		
	}
}

.column {
	flex-direction: column;
}

.mid-font {
	font-size: 30rpx;
	font-family: SimHei;
	font-weight: 400;
	color: #FFFFFF;
}

.user-logout-underline {
	padding-right: 20rpx;
	color: $kp-red-color;
	text-decoration: underline;
}

.flex-1 {
	display: flex;
	flex: 1;
}

.center-text {
	text-align: center;
}

.right-text {
	text-align: right;
}

.left-text {
	text-align: left;
}

#header-view {
	display: flex;
	margin-left: 31rpx;
	margin-right: 31rpx;
	padding-top: 44rpx;
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

.data-view {
	margin-top: 25rpx;
}
.common-font {
	font-family: SimHei;
	font-weight: 400;
}
	
@mixin large-text {
	font-size: 30rpx;
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
</style>
