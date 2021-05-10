<template>
	<view id="root-view">
		
		<view id="header-view">
			<view id="strategy-search-select">
				<!--
				<u-dropdown :height="36" @open="openDropdown" @close="closeDropdown" :title-size="22">
					<u-dropdown-item v-model="value1" :title="contractTitle" :options="options1" @input="changeValue1"></u-dropdown-item>
					<u-dropdown-item v-model="value2" :title="statusTitle" :options="options2" @input="changeValue2"></u-dropdown-item>
				</u-dropdown>
				-->
				<view class="strategy-search-select-one" @tap.stop="selectContract">
					<text :style="{color:isShowContract?'#fff': ''}">{{contractTitle}}</text>
					<u-icon class="u-m-l-10" name="arrow-down" size="26" color="#c0c4cc" v-if="!isShowContract"></u-icon>
					<u-icon class="u-m-l-10" name="arrow-up" size="26" color="#c0c4cc" v-if="isShowContract"></u-icon>
				</view>
				<view class="strategy-search-select-two" @tap.stop="selectStatus">
					<text :style="{color:isShowStatus?'#fff': ''}">{{statusTitle}}</text>
					<u-icon class="u-m-l-10" name="arrow-down" size="26" color="#c0c4cc" v-if="!isShowStatus"></u-icon>
					<u-icon class="u-m-l-10" name="arrow-up" size="26" color="#c0c4cc" v-if="isShowStatus"></u-icon>
				</view>
			</view>
			<!--
			<u-input v-model="value" type="type" :border="true"  />
			-->
			<view id="strategy-search-input">
				<!-- <uni-search-bar style="height: 32px;" placeholder="搜索币对/交易对/合约" bgColor="#f2f2f2" cancelButton="none" radius="5" :clear-font-size="16" @clear="clearKeyword" @input="change" @confirm="confirmSearch"></uni-search-bar> -->
				<u-search bg-color="#333333" color="#ffffff" border-color="#676d81" v-model="searchKeyword" height="64" :show-action="false" shape="square" placeholder="搜索" @clear="clearKeyword" @search="confirmSearch"></u-search>
			</view>
		</view>
	
		<view :class="['mymask', (isShowContract|| isShowStatus)? 'show-flex': 'hide']" @tap.stop="closeMask">
			
		
		<view :class="['menu',  'show-flex']" :style="(isShowContract || isShowStatus)?'transform:translateY(46px);opacity:1;transition: transform 0s;':('opacity:0.5;transform:translateY(-100%); transition: transform 0s;')" @touchmove.stop.prevent @tap.stop.prevent>
			<view :class="['submenu',((isShowContract &&(item.value == value1)) || (item.value==value2 && isShowStatus))?'submenu-active': '']" v-for="item in options" :key="item.value" @tap.stop="switchMenu(item)">
				<view>
					<text>{{item.label}}</text>
				</view>
				<view  v-if="(isShowContract &&(item.value == value1)) || (item.value==value2 && isShowStatus)">
					<u-icon name="checkbox-mark" size="28" color="#fff" ></u-icon>
				</view>
			</view>
		</view>
		</view>
		
		
		<!-- 'margin-top':scrollTop @scrolltolower="lower" @scrolltoupper="upper"-->
		<scroll-view   :scroll-y="true"  :style="{ width,height,'z-index': 3, marginTop:'104rpx' }">
			<!-- <u-gap height="20" bg-color="rgba(255,255,255,0.1)"></u-gap> -->
			<transaction-component-item @pingduofunc="pingduoFunc" @pingkongfunc="pingkongFunc" v-for="item,index in transactionList" :key="item.id" :custom-style="(index!=0?'margin-top:20rpx;':'')" :stategy-trasaction-info="getStategyTrasactionInfo(item)" :strategy-info="getStrategyInfo(item)" @gotransaction="gotoTrasactionPage(item)"></transaction-component-item>
			<u-loadmore :status="status" bg-color="#333" color="rgba(255,255,255,0.1)" marginTop="20" margin-bottom="20" />
			
		</scroll-view>
		<u-modal v-model="showMsg" :mask-close-able="true" :content="msg"></u-modal>
		
		
	</view>
</template>

<script>
	import transactionComponentItem from '@/components/transaction_component_item.vue';
	// getContractList, getStatusList,
	import {mapState} from 'vuex';
	import {  getTransactionInfoList, oneKeyDoneFunc } from '@/api/transaction_list.js';
	import {getStatusList} from '@/mock/transaction_list.js'
	/** font-size:26rpx;margin-right:0rpx **/
	let totalpage = 1, pageNo = 1;
	export default {
		computed: {
			...mapState(['strategistId']),
			zIndex: function() {
				return this.dropdownIndex!==''?99999999:90;
			},
			options: function() {
				if (this.isShowContract) {
					return this.options1
				} else if(this.isShowStatus) {
					return this.options2
				}
				return []
			}
		},
		data() {
			return {
				value: 1,
				value1: '所有合约', // 合约类型,为-1的时候,不作为请求参数传递
				value2: -1,// 状态,为0的时候,不作为请求参数传递
				options1: [
					
				],
				searchValue:"",
				showMsg: false,
				msg: '',
				dropdownIndex: '',
				width: '',
				height: '',
				options2: [],
				status: 'nomore',
				transactionList: [],
				contractTitle: '所有合约',
				statusTitle: '所有状态',
				styleStr: '',
				//scrollTop: 0,
				marginTop:'',
				isShowContract: false,
				isShowStatus: false,
				old: {
					scrollTop: 0
				},
				searchKeyword: ''
			}
		},
		async onLoad() {
			this.options2 = getStatusList();
			const sysinfo = uni.getSystemInfoSync();
			this.width = sysinfo.windowWidth+'px';
			// - uni.upx2px(52)
			this.height = sysinfo.windowHeight - uni.upx2px(104) +'px';
			this.marginTop = 56+'px';
			
		},
		onPullDownRefresh() {
			this.initTransactionList(true)
		},
		async onShow() {
			// 和传递ALL 值效果一样
			if (this.contractTitle == '合约') {
				//this.contractTitle = '所有合约';
			}
			this.initTransactionList()
		},
		components: {
			transactionComponentItem
		},
		methods: {
			closeMask() {
				this.isShowContract = false
				this.isShowStatus   = false
				
			},
			async switchMenu(info) {
				// 合约列表
				if (this.isShowContract && !this.isShowStatus) {
					const index = this.options1.findIndex((item)=> {
						return item.value == info.value;
					});
					this.contractTitle = this.options1[index].label;
					this.value1 = this.contractTitle;
					
					this.isShowContract = false
					this.isShowStatus = false
					
					const res = await getTransactionInfoList(this.strategistId, this.value2, this.value1, this.searchKeyword);
					if (!res || (Array.isArray(res) && res.length == 0)) {
						this.transactionList = []
					} else {
						this.transactionList = res.strategy_list;
						totalpage = res.totalpage;
					}
				}
				
				if (!this.isShowContract && this.isShowStatus) {
					this.value2 = info.value;
					const index = this.options2.findIndex((item)=> {
						return item.value == info.value;
					});
					this.statusTitle = this.options2[index].label;
					
					this.isShowContract = false
					this.isShowStatus = false
					
					const res = await getTransactionInfoList(this.strategistId, this.value2, this.value1, this.searchKeyword);
					if (!res || (Array.isArray(res) && res.length == 0)) {
						this.transactionList = []
					} else {
						this.transactionList = res.strategy_list;
						totalpage = res.totalpage;
					}
				}
			},
			selectStatus() {
				
				this.isShowContract = false
				this.isShowStatus = !this.isShowStatus
				
			},
			selectContract() {
				console.log('selectContract...')
				
				this.isShowContract = !this.isShowContract
				this.isShowStatus = false
				
			},
			async initTransactionList(isStopRefresh) {
				const res = await getTransactionInfoList(this.strategistId, this.value2, this.contractTitle, this.searchKeyword);
				if (!res || (Array.isArray(res) && res.length == 0)) {
					this.transactionList = []
					this.options1 = [{ label: '所有合约', value: '所有合约' }]
				} else {
					this.transactionList = res.strategy_list;
					totalpage = res.totalpage;
					this.options1 = [{ label: '所有合约', value: '所有合约' }].concat(this.transformContract(res.contract));
				}
				//this.transactionList = res.strategy_list;
				
				console.log('init transaction list')
				//totalpage = res.totalpage;
				if (isStopRefresh) {
					uni.stopPullDownRefresh();
				}
			},
			openDropdown(index) {
				console.log('openDropdown+index'+index);
				this.dropdownIndex = index;
			},
			async clearKeyword() {
				const res = await getTransactionInfoList(this.strategistId, this.value2, this.value1);
				if (!res || (Array.isArray(res) && res.length == 0)) {
					this.transactionList = []
				} else {
					this.transactionList = res.strategy_list;
					totalpage = res.totalpage;
				}
				//this.transactionList = res.strategy_list;
				//totalpage = res.totalpage;
			},
			closeDropdown(index) {
				this.dropdownIndex = '';
			},
			transformContract(contract) {
				const keys = Object.values(contract);
				const texts = Object.values(contract);
				const list = [];
				for(let m = 0;m<keys.length;m++) {
					let pair = { value: keys[m], label: texts[m]};
					list.push(pair);
				}
				return list;
			},
			getStategyTrasactionInfo(item) {
				const info = {
					winRatio: item.profit_loss.rate,
					accumulatedIncome: item.accumulated_income,
					// 累计收益率
					accumulatedIncomeRatio: item.yield_strategy.total !== undefined ? item.yield_strategy.total: 0,
					totalStorings: item.positions.pos,// 总仓位
					kaiduoStorings: item.positions.long_pos,
					kaikongStrorings: item.positions.short_pos,
					kaiduoPrice: item.positions.long_open_price,
					kaikongPrice: item.positions.short_open_price,
					
				};
				console.log('getStategyTrasactionInfo'+ JSON.stringify(info));
				return info;
			},
			getStrategyInfo(item) {
				return {
					sName:item.sName,
					id: item.id,
					status: item.status,
					strategyGroupName: item.cgroup_name
				};
			},
			async pingduoFunc(sid) {
				const resp = await oneKeyDoneFunc(this.strategistId, sid, 'long');
				if (resp.status == 1) {
					/*uni.showToast({
						title: resp.msg,
						icon: "none",
						complete() {
							
						}
					})*/
					this.showMsg = true
					this.msg = resp.msg
					setTimeout(async () => {
						this.initTransactionList()
					}, 2000)
				} else {
					/*uni.showModal({
						title: resp.msg,
						showCancel: false
					})*/
					this.showMsg = true
					this.msg = resp.msg
				}
			},
			async changeValue1(v) {
				this.value1 = v;
				const index = this.options1.findIndex((item)=> {
					return item.value == v;
				});
				this.contractTitle = this.options1[index].label;
				this.value1 = this.contractTitle;
				const res = await getTransactionInfoList(this.strategistId, this.value2, this.value1, this.searchKeyword);
				if (!res || (Array.isArray(res) && res.length == 0)) {
					this.transactionList = []
				} else {
					this.transactionList = res.strategy_list;
					totalpage = res.totalpage;
				}
				
				console.log('change value1:'+v)
			},
			async changeValue2(v) {
				this.value2 = v;
				const index = this.options2.findIndex((item)=> {
					return item.value == v;
				});
				this.statusTitle = this.options2[index].label;
				const res = await getTransactionInfoList(this.strategistId, this.value2, this.value1, this.searchKeyword);
				if (!res || (Array.isArray(res) && res.length == 0)) {
					this.transactionList = []
				} else {
					this.transactionList = res.strategy_list;
					totalpage = res.totalpage;
				}
			},
			lower() {
				console.log('lower!');
				/*setTimeout(()=> {
					if (pageNo>totalpage) {
						this.status = 'nomore';
						return;
					}
					this.status = 'loading';
					pageNo++;
					const res = getTransactionInfoList(pageNo, 10);
					this.transactionList = this.transactionList.concat(res.list);
				}, 500);*/
			},
			upper() {
				
			},
			change(data) {
				const v = data.value;
				this.searchKeyword = v;
			},
			async confirmSearch() {
				console.log("searchword is: ",this.searchKeyword);
				const res = await getTransactionInfoList(this.strategistId, this.value2, this.value1, this.searchKeyword);
				if (!res || (Array.isArray(res) && res.length == 0)) {
					this.transactionList = []
				} else {
					this.transactionList = res.strategy_list;
					totalpage = res.totalpage;
				}
				
			},
			async pingkongFunc(sid) {
				const resp = await oneKeyDoneFunc(this.strategistId, sid, 'short');
				if (resp.status == 1) {
					this.showMsg = true
					this.msg = resp.msg
					setTimeout(async () => {
						this.initTransactionList()
					}, 2000)
				} else {
					this.showMsg = true
					this.msg = resp.msg
				}
			},
			gotoTrasactionPage(item) {
				console.log('gotoTrasactionPage');
				uni.navigateTo({
					url: '/pages/transaction/transaction?sName='+item.sName+'&sid='+item.id,
					fail(res) {
						console.log('fail navigate:'+JSON.stringify(res));
					}
				});
			}
		},
		onReachBottom() {
			
		}
	}
</script>
<style>
	page{
		background-color:#333333;
	}
</style>
<style lang="scss">
	::v-deep uni-search-bar> .uni-searchbar {
		padding: 0rpx !important;
	}
	::v-deep .uni-searchbar__box {
		border-width: 0px !important;
	}
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		display: none;
		color:transparent;
	}
	
	#strategy-search-input {	
		::v-deep .uni-searchbar__box {
			padding-right: 0px !important;
		}
		::v-deep .uni-searchbar {
			padding-top: 0px !important;
			padding-bottom: 0px !important;
			padding-left: 0px;
			padding-right: 0px;
		}
		::v-deep .uni-searchbar__box-search-input {
			font-size: 20rpx !important;
		}
		
		::v-deep .uni-searchbar__text-placeholder {
			font-size: 20rpx !important;
			margin-left: 2px !important;
		}
		
		::v-deep .uni-searchbar__box {
			width: 286rpx;
		}
	}
	#strategy-search-select {
		::v-deep .u-dropdown__content {
			position: absolute;
			z-index: 9999999999999;
		}
		::v-deep .u-cell-item-box{
			background-color: #F2F2F2;
			overflow-y: auto;
		}
		
		::v-deep .u-flex {
			white-space: nowrap;
		}
	}

#root-view {
	display: flex;
	flex-direction: column;
	//background-color: #ffffff;
	position: absolute;
	width: 100%;
	height: 100%;
	#header-view {
		display: flex;
		/*
		margin-bottom: 26rpx;
		margin-top: 26rpx;
		*/
	    border-bottom: 2px solid rgba(255,255,255,0.2);
	    width: 100%;
		height: 104rpx;
		box-sizing: border-box;
		align-items: center;
		padding-top: 10px;
		padding-bottom: 10px;
		position: fixed;
		padding-left: 32rpx;
		padding-right: 32rpx;
		background-color: #333333;
		z-index: 99999;
		#strategy-search-select {
			display: flex;
			width: 66%;
			.strategy-search-select-one {
				display: flex;
				align-items: center;
				font-size: 24rpx;
				width: 60%;
				>text {
					color: #606266;
					font-size: 25rpx;
				}
			}
			.strategy-search-select-two {
				display: flex;
				// padding-right: 15rpx;
				justify-content: flex-end;
				align-items: center;
				>text {
					color: #606266;
					font-size: 25rpx;
				}
			}
		}
		
		#strategy-search-input {
			display: flex;
			width: 34%;
			/*width: 278rpx;*/
			/*width: 330rpx;*/
		}
	}
}

.show-flex {
	display: block;
}
.mymask {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: rgba($color: #333333, $alpha: 0.5);
	z-index: 1000000000001;
	/*transition: background 1s linear;*/
}
.menu {
	color: #fff;
	display: flex;
	flex-direction: column;
	width: 750rpx;
	position: absolute;
	top: 0;
	left:0;
	z-index: 90;
	background-color: #333333;
}
.submenu-active {
	justify-content: space-between;
	color: #fff;
}

.hide {
	display: none;
}
.submenu {
	display: flex;
	padding-top: 10px;
	padding-bottom: 10px;
	padding-left: 32rpx;
	padding-right: 32rpx;
}
</style>
