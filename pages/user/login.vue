<template>
	<view id="root-view">
		<view id="header-image">
			<!-- logo -->
			<view id="header-logo">
				<image src="../../static/image/user/login/logo.png" class="image-logo"></image>
			</view>
			<!-- 标题 -->
			<view id="header-title">
				<text id="platform-text">{{title}}</text>
			</view>
		</view>
		<view id="login-area">
			<form @submit="loginSubmit">
				<view id="login-username-view">
					<view id="login-username-avatar">
						<image src="../../static/image/user/login/username.png" class="login-avatar"></image>
					</view>
					<view id="login-username-text">
						<input type="text" placeholder="请输入用户账号" v-model.trim="username" name="username" />
					</view>
				</view>
				<view id="login-pwd-view">
					<view id="login-pwd-avatar">
						<image src="../../static/image/user/login/pwd.png" class="login-avatar"></image>
					</view>
					<view id="login-pwd-text">
						<input type="password" placeholder="请输入用户密码" v-model="password"   @confirm="loginSubmit"  v-if="!isShowPassword" />
						<input type="text" placeholder="请输入用户密码" v-model="password"   @confirm="loginSubmit"  v-if="isShowPassword" />
					</view>
					<view id="login-pwd-eyes" @tap.stop="togglePwd">
						<image src="../../static/image/user/login/pwd.png" class="login-eyes"></image>
					</view>
				</view>
				<view id="login-btn-view">
					<button  form-type="submit">登录</button>
				</view>
			</form>
		</view>
		<view id="close-image">
			<navigator open-type="exit" target="miniProgram">
				<image src="../../static/image/user/login/close-page.png" class="close-page-icon"></image>
			</navigator>
		</view>
	</view>
</template>

<script>
	import http from '../../common/http.js';
	export default {
		data() {
			return {
				title: "鲲鹏资产管理平台",
				username: '',
				password: '',
				isShowPassword:false,
			}
		},
		computed: {
			
		},
		methods: {
			togglePwd() {
				this.isShowPassword = !this.isShowPassword;
			},
			loginSubmit(e) {
				//console.log(this.password+"----"+this.username);
				
				if (!this.username) {
					uni.showModal({
						content: '用户名不能为空!',
						showCancel: false,
						cancelText: '',
						confirmText: '确定',
						success: res2 => {
							
						}
					});
					return;
				}
				if (!this.password) {
					uni.showModal({
						content: '密码不能为空!',
						showCancel: false,
						cancelText: '',
						confirmText: '确定',
						success: res2 => {
							
						}
					});
					return;
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
						uni.showModal({
							content: resp.msg,
							showCancel: false,
							cancelText: '',
							confirmText: '确定',
							success: res2 => {
								
							}
						});
					}
				});
			},
		},
		onShow() {
			console.log('show!');
		},
		onHide() {
			console.log('hide!');
		},
		onLoad() {
			//console.log('onLoad...');
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
		}
	}
</script>

<style>
* {
	box-sizing: border-box;
}
page {
	width: 750rpx;
}
view, cover-view {
	display: flex;
}
 ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }
#root-view {
	display: flex;
	flex-direction: row;
	justify-content: center;
	overflow-x: hidden;
	background-color: rgba(255,255,255,1);;
}

#header-image {
	height: 810rpx;
	flex-direction: column;
	width: 100%;
	align-items: center;
	background-image: url(https://vpwx.ofbei.com/upload/vx/bg123.png);
	background-size:750rpx;
	background-position:center;
	background-repeat: no-repeat;
}

#header-logo {
	width: 169rpx;
	height:169rpx;
	margin-top:239rpx;
	margin-bottom: 51rpx;
	/*margin-left:290rpx;
	margin-right: 290rpx;*/
}
#close-image {
	position: absolute;
	/*width:100%;*/
	height:39rpx;
	top:87rpx;
	left:56rpx;
}
.close-page-icon {
	max-width: 39rpx;
	max-height: 39rpx;
}

.image-logo {
	max-width: 169rpx;
	max-height:169rpx;
}

#header-title {
	display: flex;
	flex-direction: row;
	width: 100%;
	height:39rpx;
	justify-content: center;
}
/**
 * 处理cover-view 的一些特点
 * 
 */
#login-area {
	display: flex;
	flex-direction: column;
	width:638rpx;
	height:584rpx;
	background:rgba(255,255,255,1);
	border-radius:12px;
	position: absolute;
	left:56rpx;
	top:650rpx;
}
#login-username-view {
	flex-direction: row;
	margin-top:100rpx;
	margin-left:41rpx;
}

#login-username-avatar,#login-pwd-avatar {
	width:42rpx;
	height:50rpx;
}
#login-username-text {
	margin-left:27rpx;
	width:399rpx;
}
#login-pwd-text {
	margin-left:27rpx;
}
#login-pwd-text>input {
	width: 350rpx;
}
#login-pwd-view {
	flex-direction: row;
	margin-top:77rpx;
	margin-left:43rpx;
}
.login-avatar {
	width:42rpx;
	height:50rpx;
}
.login-eyes {
	width:39rpx;
	height:25rpx;
}

#login-btn-view {
	width: 569.4rpx;
	height: 83.3rpx;
	margin-top:85rpx;
	margin-left:40rpx;
}

#login-btn-view>button {
	width:100%;
	height:100%;
	background:rgba(0,122,255,1);
	border-radius:42px;
}

#login-pwd-eyes {
	height:50rpx;
	width:160rpx;
	line-height: 1;
	align-items: center;
}

#platform-text {
	display: flex;
	width:326rpx;
	justify-content: center;
	font-family:Source Han Sans CN;
	font-weight:bold;
	color:rgba(254,254,254,1);
}
</style>
