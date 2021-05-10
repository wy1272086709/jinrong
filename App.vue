<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			const res = uni.getSystemInfoSync()
			let modelmes = res.model;
			if (modelmes.search('iPhone X') != -1 || modelmes.search('iPhoneX')!=-1) {
				this.globalData.isIphoneX = true;
			}
			let platform = res.platform.toLowerCase();
			//android: 安卓, ios: IOS, devtools:PC
			if (platform == 'android' || platform == 'devtools') {
				_self.globalData.platform = 1;	
			} else if(platform == 'ios' ){
				_self.globalData.platform = 2;
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {
			serverUrl: 'https://vpwx.ofbei.com/api',
			serverUrl2: 'https://vpwx.ofbei.com',
			platform: 0,
			wssServer: 'wss://vpwx.ofbei.com:6010'
		},
	}
</script>


	
<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>

