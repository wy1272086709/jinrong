<template>
	<view>
	<uni-drawer ref="showLeft" @close="closeDrawer"  mode="left" :width="320" :drawVisible="drawVisible">
		<view class="status-line" :style="{height: lineHeight+'px'}"></view>
		<view id="admin-header">
			<view id="admin-header-left">
			<image src="@/static/image/overall_view/user_avatar.png" class="admin-avatar"></image>
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
	<u-modal @confirm="confirmLogout" :cancel-style="{color:'#b1b7bc'}" :confirm-style="{color:'#ffffff'}"  :title-style="{color:'#FFFFFF'}" :modalStyle="{backgroundColor:'#333'}" :content-style="{ color: '#b1b7bc'}" v-model="showMsg"  show-cancel-button mask-close-able content="你确定要退出吗?"></u-modal>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		name:"user-drawer",
		computed: {
			...mapState(['userName', 'strategistId']),
			userList: function() {
				const obj = str ? JSON.parse(str): {};
				return obj;
			}
		},
		data() {
			return {
				drawVisible: false,
			}
		},
		props: {
			lineHeight: {
				type: [Number, String],
				default: '44'
			}
		},
		methods: {
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
				this.commit("switch-strategist")
			},
			closeDrawer(e) {
				this.drawVisible = false
			},
			showDrawer(e) {
				this.drawVisible = true
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
						_self.drawVisible = false
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
		}
	}
</script>

<style lang="scss">
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

.status-line {
	background-color: $kp-bg-color;
	color: $kp-font-color;
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
}

.user-logout-underline {
	padding-right: 20rpx;
	color: $kp-red-color;
	text-decoration: underline;
}

</style>
