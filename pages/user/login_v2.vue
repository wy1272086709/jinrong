<template>
	<view id="root-view" class="list">
		<view id="header-view" :style="{height: lineHeight}">
			
		</view>
		<!-- 图片区域 -->
		<view id="top-view">
			<view id="top-view-left">
				<image src="@/static/image/user/login/logo.png" class="image-logo"></image>
				<view class="title-font-css">
					<text>鲲鹏资产</text>
				</view>
			</view>
			
			<view id="top-view-right">
				<image src="@/static/image/user/top.png"></image>
			</view>
		</view>
		<!-- 登录 -->
		<!--
		<view id="title-view">
			登录
		</view>
		-->
		<view id="login-view">
			<u-field labelPosition="top" label="账户" placeholder-style="font-family: SimHei;font-size: 28rpx;font-weight: 400;color:#D1D1D1" placeholder="请输入您的账号" :clearable="false" :field-style="{fontFamily: 'SimHei',fontSize: '28rpx',fontWeight: 400, color: '#FFFFFF'}" type="input" v-model="username">
				
			</u-field>
			<u-field labelPosition="top" :clearable="false" label="密码" placeholder="请输入您的账号密码"  password v-model="password"
			placeholder-style="font-family: SimHei;font-size: 28rpx;font-weight: 400;color: #D1D1D1" type="password" :field-style="{fontFamily: 'SimHei',fontSize: '28rpx',fontWeight: 400, color: '#FFFFFF'}" @confirm="submitLogin">
				
			</u-field>
		</view>
		<view id="login-btn">
			<view hover-stop-propagation="" @tap.stop="submitLogin">
				<text>立即登录</text>
			</view>
		</view>
		<view id="bottom-image">
			<image src="@/static/image/user/bottom.png" class="bottom-image"></image>
		</view>
		
		<!-- 用于改变运行状态的弹框, 无取消按钮 -->
		<u-modal v-model="showModal" :title-style="{color:'#FFFFFF'}" :modalStyle="{backgroundColor:'#333'}" :content-style="{ color: '#FFFFFF'}" confirmColor="#FFFFFF"  mask-close-able :content="msg"></u-modal>
	</view>
</template>

<script>
	import http from '../../common/http.js';
	export default {
		data() {
			return {
				lineHeight: '',
				username: '',
				password: '',
				showModal: false,
				msg: ''
			}
		},
		onLoad() {
			const info = uni.getSystemInfoSync()
			this.lineHeight = info.statusBarHeight+44+'px'
			this.autoLogin()
		},
		methods: {
			autoLogin() {
				let _self = this;
				uni.getSystemInfo({
					success(res) {
						//做自动登录...
						let uname    = uni.getStorageSync('wx_login_username');
						let password = uni.getStorageSync('wx_login_password');
						console.log('uname', uname, 'password', password);
						_self.username = uname;
						_self.password = password;
						if(uname && password) {
							uni.showLoading({
								title: '自动登录中...'
							});
							// 这里做登录
							_self.loginRequest(uname, password)
						}
					}
				})
			},
			submitLogin() {
				if (!this.username) {
					this.showModal = true
					this.msg = '用户名不能为空!'
				}
				if (!this.password) {
					this.showModal = true
					this.msg = '密码不能为空!'
				}
				uni.showLoading({
					title: '登录中...'
				});
				this.loginRequest(this.username, this.password);
			},
			loginRequest(uname, password) {
				let apiPrefix = getApp().globalData.serverUrl;
				let url = apiPrefix+"/login";
				http.request(
					url, 
					{
						username: uname,
						password: password,
						filterData: true,
					},
				).then(resp=> {
					console.log('resp', resp);
					uni.hideLoading();
					if(resp.status == 1) {
						this.$store.commit('login', uname);
						uni.setStorageSync('wx_login_token', resp.token);
						uni.setStorageSync('wx_login_username', uname);
						uni.setStorageSync('wx_login_password', password);
						uni.setStorageSync('wx_strategist_list', JSON.stringify(resp.strategist_list));
						uni.showToast({
							title:"登录成功!",
							duration:500,
							complete() {
								uni.switchTab({
									url:'/pages/user/overall_view'
								});
							}
						});
					} else {
						this.showModal = true
						this.msg = resp.msg
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	.list {
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);  
		padding-bottom: env(safe-area-inset-bottom);  
		/*margin-bottom: 80rpx;*/
	}
	#root-view {
		background: linear-gradient(0deg, #2C2C2C, #3D3D3D);
		height: 100vh;
		#login-view {
			margin-top: 300rpx;
			margin-left: 56rpx;
		}
		::v-deep .u-label {
			font-size: 40rpx;
			font-family: SimHei;
			font-weight: 400;
			color: #FFFFFF;
			margin-bottom: 42rpx;
		}
		
		::v-deep .u-field {
			font-size: 28rpx;
			padding: 31rpx 0rpx;
			text-align: left;
			
		}
		::v-deep .u-border-bottom::after {
			width: 1280rpx;
			color: #B9B9B9;
			transform: scale(0.5);
		}
		
		#title-view {
			font-size: 56rpx;
			margin-left: 56rpx;
			font-family: SimHei;
			font-weight: 400;
			color: #5B80F5;
			margin-top: 120rpx;
			margin-bottom: 109rpx;
		}
		
		#top-view {
			position: relative;
			display: flex;
			&-left {
				width: 324rpx;
				height: 325rpx;
				left: 119rpx;
				top: 100rpx;
				position: absolute;
				/*opacity: 0.4;*/
				border-radius: 23rpx;
				>image {
					width: 145rpx;
					height: 144rpx;
				}
			}
			&-right {
				position: absolute;
				right: 0px;
				>image {
					width: 299rpx;
					height: 245rpx;
				}
			}
		}
	}
	#login-btn {
		margin-left: 40rpx;
		width:670rpx;
		height: 88rpx;
		border-radius: 200rpx;
		margin-top: 80rpx;
		>view {
			height: 100%;
			display: flex;
			flex: 1;
			justify-content: center;
			align-items: center;
			font-size: 36rpx;
			font-family: SimHei;
			font-weight: 400;
			color: #FFFFFF;
			
		}
		background: linear-gradient(-90deg, #4F7AED, #91AEFE);
	}
.common-font-property {
	font-family: SimHei;
	font-weight: 400;
}
.common-font {
	font-size: 28rpx;
	@extend .common-font-property;
}
.title-font-css {
	font-size: 36rpx;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #A7A7A7;
}

.input-placeholder-color {
	color: #D1D1D1;
}
#bottom-image {
	position: absolute;
	bottom: constant(safe-area-inset-bottom);
	bottom: env(safe-area-inset-bottom);  
	left: 0px;
}

#top-image {
	
}

.bottom-image {
	width: 325rpx;
	height: 195rpx;
}

.field-font {
	font-size: 40rpx;
	@extend .common-font-property;
}
</style>
