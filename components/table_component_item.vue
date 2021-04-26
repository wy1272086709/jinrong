<template>
	<view>
		<view id="table-header">
			<view v-for="info in labelArr" :key="info.nid" :style="'width'+info.width">{{info.label}}</view>
			<!--
			<view style="width: 104rpx;">条件名</view>
			<view style="width: 60rpx;">状态</view>
			<view style="width: 94rpx;">数量</view>
			<view style="width: 134rpx;">价格</view>
			<view style="width: 230rpx;">操作</view>
			-->
		</view>
		<view v-for="item in dataList" :key="item.nid" class="row-style">
			<view>{{item[keyNameArr[0]]}}</view>
			<view style="width:104rpx">{{item[keyNameArr[1]]}}</view>
			<view style="width:60rpx">
				<text :style="(item.status == 1 || item.status == 2) ? 'background:#E1FBF3;color:#00C087': 'background:#FFF0EB;color:#FF6C47' " class="status-btn ">{{ item.status==1?'平空':'开多' }}</text>
			</view>     
			<view style="width:94rpx">
				{{item[keyNameArr[3]]}}
			</view>
			<view style="width:134rpx">{{item[keyNameArr[4]]}}</view>
			<view :style="{'flex-direction':'row', width:'230rpx'}" >
				<u-button size="mini" @click="showDelegateForm(item)" class="modify-btn">调整</u-button>
				<u-button size="mini" @click="deleteDelegate(item)">删除</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// type 取值 text, custom 一般这两种
			// 形如 [{width: '200rpx', label: '排序', type:'custom'}] 这种形式
			labelArr: {
				type: Array,			
				default() {
					return []
				}
			},
			// 表格数据源,类似于 [{nid: 3, title:'止损单' }, {nid: 1,title: '止损单' }, { nid:2,title: '止损单' }] 这种形式
			dataList: {
				type: Array,
				default() {
					return  [];
				}
			},
			// 字段名,[ 'nid', 'title' ]
			keyNameArr: {
				type: Array,
				default() {
					return [];
				}
			},
			// 不存在操作
			hasActions: {
				type: Boolean,
				default: false,
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.row-style {
	margin-top:20px;
	margin-bottom: 20px;
	display: flex;
	justify-content: space-between;
	view {
		
	}
}

#table-header {
	display: flex;
	justify-content: space-between;
	view {
		
	}
}
</style>
