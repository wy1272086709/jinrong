<template>
	<view class="warp">
		<!-- <view class="header">
			<text>交易员:</text>
			<text class="u-m-l-20">{{userName}}</text>
		</view> -->
		<view class="u-width ">
			<u-dropdown  :close-on-click-self="self_close" :close-on-click-mask="mask" ref="uDropdown" inactive-color="#fff" :activeColor="activeColor">
				<!-- <u-dropdown-item @change="change" v-model="value1" title="距离" :options="options1"></u-dropdown-item>
				<u-dropdown-item @change="change" v-model="value2" title="温度" :options="options2"></u-dropdown-item> -->
				<u-dropdown-item class="u-drop" :title="title" >
					<view class="slot-content">
						<view class="item-box">
							<view class="item" :class="[item.active ? 'active' : '']" @tap="tagClick(index)" v-for="(item, index) in userList" :key="index">
								{{item}}
							</view>
						</view>
						<!-- <u-button type="primary" @click="closeDropdown">确定</u-button> -->
					</view>
				</u-dropdown-item>
			</u-dropdown>
		</view>
		
		<view class="mid">
			<view class="choice">
				<u-subsection inactive-color="#999999" active-color="#666666" @change="change" bg-color="rgba(255,255,255,0.2)" :list="group" :current="current"></u-subsection>
			</view>
			<view class="mid_content">
				<view class="mid_left">
					<text class="bond">足额保证金</text>
					<text class="money u-m-t-20">{{fullBond}}</text>
				</view>
				<view class="mid_right">
					<text class="bond">现有保证金</text>
					<text class="money u-m-t-20">{{nowBond}}</text>
				</view>
			</view>
			
		</view>
		<view class="bottom">
			<view v-if="!hasOperate">
				<u-empty mode="history" margin-top="50"></u-empty>
			</view>
			<view v-else>
				<view class="bottom_block" v-for="item in list" :key="item.nid">
					<view class="bottom_top">
						<text class="u-font-28">{{item.money>0?'增加保证金':'扣除保证金'}}</text>
						<text v-if="item.money>=0" class="u-font-28 blue">{{item.money}}</text>
						<text v-else class="u-font-28 red">{{item.money}}</text>
					</view>
					<view class="bottom_bottom">
						<text class="u-font-22">{{item.updated_at}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import {getBondList} from '@/api/user_view.js';
	export default {
		data() {
			return {
				title:'',
				man_fullBond:0,
				lh_fullBond:0,
				man_nowBond:0,
				lh_nowBond:0,
				fullBond:0,
				nowBond:0,
				hasOperate: false,
				man_bond_list:[],
				lh_bond_list:[],
				list:[],
				group:[
					{name:'人工'},
					{name:'量化'}
				],
				current: 0,
				value1: '',
				value2: '2',
				mask: true,
				self_close: true,
				activeColor: '#FFFFFF',
				userList:[]
			}
		},
		methods: {
			tagClick(index) {
				this.title = this.userList[index];
				this.getData(index);
				this.$refs.uDropdown.close();
				// if(this.current == 1)
				// {
				// 	this.current = 0;
				// }
			},
			async getData(index) {
				const res =await getBondList(index);
				console.log("res",res);
				//this.title = res.sum.user_name;
				this.lh_fullBond = res.sum.amount_deposit_q;
				this.lh_nowBond = res.sum.paid_deposit_q;
				this.lh_bond_list = res.list.paid_deposit_q;
				
				this.man_fullBond = res.sum.amount_deposit_m;
				this.man_nowBond = res.sum.paid_deposit_m;
				this.man_bond_list = res.list.paid_deposit_m;
				
				this.list = this.man_bond_list;
				this.fullBond = this.man_fullBond;
				this.nowBond = this.man_nowBond;
				if(this.list.length>0)
				{
					this.hasOperate = true;
				}
				else{
					this.hasOperate =false;
				}
				console.log("current",this.current);
				this.change(this.current);
			},
			change(index) {
				this.current = index;
				console.log("current1",this.current);
				switch (index){
					case 0:
						this.list = this.man_bond_list;
						this.fullBond = this.man_fullBond;
						this.nowBond = this.man_nowBond;
						if(this.list.length>0)
						{
							console.log("case0");
							this.hasOperate = true;
						}
						break;
					case 1:
						this.list = this.lh_bond_list;
						this.fullBond = this.lh_fullBond;
						this.nowBond = this.lh_nowBond;
						if(this.list.length>0)
						{
							console.log("case1");
							this.hasOperate = true;
						}
						else{
							this.hasOperate = false;
						}
						break;
					default:
						break;
				}
			}
		},
		async onLoad() {
			const res1 = uni.getStorageSync('wx_strategist_list');
			console.log("res",res1);
			// this.title = this.userName;
			console.log("title",this.title);
			this.userList = JSON.parse(res1);
			this.getData(this.strategistId);
			if(this.strategistId)
			{
				this.title = this.userList[this.strategistId];
			}
			else{
				this.title = this.userName;
			}
			
		},
		computed:{
			...mapState(['strategistId','userName'])
		}
	}
</script>

<style>
	page{
		background-color: #333;
	}
</style>
<style lang="scss">
	.u-width{
		width: 40%;
		background-color: rgba(255,255,255,0.1);
		border-radius:8rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
	}
	.font_class{
		color: #fff;
	}
	.slot-content {
		width: 40%;
		background-color: rgba(255,255,255,0.1);
		margin-left: 20rpx;
		//padding: 24rpx;
		
		.item-box {
			//margin-bottom: 50rpx;
			display: flex;
			flex-direction: column;
			flex-wrap: nowrap;
			justify-content: space-between;
			
			.item {
				border: 1px solid #b2b2b2;
				color: #b2b2b2;
				background-color: #333;
				border-radius: 8rpx;
				height: 80rpx;
				display: flex;
				align-items: center;
				justify-content: space-around;
				//padding: 8rpx 40rpx;
				//border-radius: 100rpx;
				//margin-top: 30rpx;
			}
			
			.active {
				color: #FFFFFF;
				//background-color: $u-type-primary;
			}
		}
	}
	.warp{

	}
	.choice{
		margin-bottom: 20rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
	}
	.header{
		height: 40rpx;
		color: #ffffff;
		font-size: 28rpx;
	}
	.mid{
		margin-left: 20rpx;
		margin-right: 20rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		height: 280rpx;
		background-color: rgba(255,255,255,0.2);
		border-radius: 8rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		.mid_content{
			display: flex;
			flex-direction: row;
			justify-content: space-around;
		}
		.mid_left{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
		.mid_right{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
	}
	.bottom{
		margin-left: 20rpx;
		margin-right: 20rpx;
		display: flex;
		flex-direction: column;
		margin: 10rpx;
		border-top: 1px solid rgba($color: #ffffff, $alpha: 0.3);
		
		color: #fff;
		.bottom_top{
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			margin: 10rpx;
		}
		.bottom_bottom{
			margin: 10rpx;
		}
		.bottom_block{
			border-bottom: 1px solid rgba($color: #ffffff, $alpha: 0.3);
		}
	}
	.bond{
		color: #B1B7BC;
		font-size: 30rpx;
	}
	.money{
		color: #ffffff;
		font-size: 48rpx;
	}
	.blue{
		color:#0BF4FD;
	}
	.red{
		color:#E34567;
	}
</style>