<template>
	<scroll-view id="root-view" :style="{height}">
	<web-view :src="'https://miaoyu66.com/kph5/index.html#/pages/index/index?token='+token+'&strategist_id='+strategistId" @load="load"></web-view>
	</scroll-view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				token: uni.getStorageSync('wx_login_token'),
				height: ''
			}
		},
		computed: {
			...mapState([ 'strategistId']),
		},
		onLoad() {
			this.setIosBackground()
			uni.setNavigationBarTitle({
				title:""
			})
			const info = uni.getSystemInfoSync()
			this.height = info.windowHeight+ 'px'
		},
		methods: {
			load() {
				console.log('load success!')
			},
			setIosBackground() {
				if (getApp().globalData.platform == 2) {
					console.log('setIosBackgroundColor:');
					setTimeout(()=> {
						
						uni.setBackgroundColor({
							backgroundColorTop: "#333", // 顶部窗口的背景色为蓝色
							backgroundColorBottom: "#333", // 底部窗口的背景色为绿
						});
					}, 300);
				}
			}
		}
	}
</script>

<style lang="scss">
.list {
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);  
		padding-bottom: env(safe-area-inset-bottom);  
	}
	web-view {
		height: 100vh - calc(env(safe-area-inset-bottom));
		background-color: #333;
	}
#root-view {
	width: 100vw;
	height: 100vh;
	background-color: #333;
	@extend .list;
}


</style>
