<template>
	<web-view :src="'https://miaoyu66.com/kph5/index.html#/pages/index/index?token='+token+'&strategist_id='+strategistId" @load="load"></web-view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				token: uni.getStorageSync('wx_login_token'),
			}
		},
		computed: {
			...mapState([ 'strategistId']),
		},
		methods: {
			load() {
				console.log('load success!')
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $kp-bg-color;
	}
web-view {
	background-color: $kp-bg-color;
}
</style>
