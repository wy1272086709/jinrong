<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<view v-for="item in list" :key="item.nid">
			<text>{{item.text}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			const list = [
				{ nid: 1, text: '哈哈1' },
				{ nid: 2, text: '哈哈2' },
				{ nid: 3, text: '哈哈3' },
			]
			return { 
				title: 'Hello',
				list: Object.freeze(list)
			}
		},
		onLoad() {
			this.test()
			this.list[0].text = '改变了值'
		},
		methods: {
			async test() {
				var p1 = Promise.resolve(3).catch(function(err) {
				    return err;
				});
				var p2 = Promise.reject(2).catch(function(err) {
					throw "hahaha";
					return 5
				}).catch(err => {
					return err
				});
				var p3 = new Promise((resolve, reject) => {
					setTimeout(resolve, 100, "foo");
				}).catch(function(err) {
					return err;
				}); 
				let values =  await Promise.all([p1, p2, p3])
				console.log(values); // [3, 2, "foo"]
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
