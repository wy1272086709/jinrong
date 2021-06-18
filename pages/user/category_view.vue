<template>
	<view id="root-view" :style="{width, height:'100%', paddingBottom: isIphoneX?'68rpx': ''}">
		<view id="strategy-search" :style="'z-index:'+zIndex">
			<view id="strategy-search-1">
				<view id="strategy-search-1-select">
					<u-dropdown height="52" @open="openDropdown" @close="closeDropdown" inactiveColor="#FFF" activeColor="#FFF">
					<u-dropdown-item v-model="value1" :title="title1" :options="options1" @input="changeValue1"></u-dropdown-item>
						<u-dropdown-item v-model="value2" :title="title2" :options="options2" @input="changeValue2"></u-dropdown-item>
					</u-dropdown>
				</view>
				<view id="strategy-search-2-checkbox">
					<checkbox-group @change="changeCheckbox">
						<label>
							<text id="show-strategy-font">查看已停止</text>
							<checkbox  value="1" :checked="checkStop" color="#B1B7BC"/>							
						</label>
					</checkbox-group>
				</view>
			</view>
		</view>
		<!-- 间隔52px -->
		<u-gap height="4" :custom-style="{ 'margin-top': '75rpx' }" bg-color="#626262"></u-gap>
		
		<scroll-view :scroll-y="true" :style="'height:'+scrollHeight+ 'px'+';z-index:3'">
			<view>
				
			<view class="category-component-clazz" :style="index == categoryList.length -1 ? 'margin-bottom:0px':''" v-for="categoryObject, index in categoryList" :key="categoryObject.title" @gotoCategoryView="gotoCategoryView" v-if="categoryList.length>0">
				<view class="strategy-group-name" v-if="!isCgroupId">
					{{categoryObject.title}}
				</view>
				<strategy-component-item @stopOrStart="statusControl" :item="item"  v-for="item in categoryObject.slist" :key="item.id">
					<view class="flex-center">
						
						<u-button plain size="mini" :custom-style="{
							width: '174rpx',
							height: '48rpx',
							background: 'rgba(255, 255, 255, 0)', 
							border: '1px solid #B0B0B0',
							fontSize: '28rpx',
							fontFamily: 'SimHei',
							fontWeight: '400',
							color: '#B0B0B0',
							marginRight: '155rpx',
							borderRadius: '8rpx'}" @click.stop="pingFunc(item)" type="default" :disabled="hasPingStoreBtn(item)?false:true" v-if="item.is_manual!=1 && item.status!=4">平仓</u-button>
							
						<u-button plain size="mini" :custom-style="{
							width: '174rpx',
							fontSize: '28rpx',
							fontFamily: 'SimHei',
							fontWeight: '400',
							color: '#B0B0B0',
							height: '48rpx',
							background: 'rgba(255, 255, 255, 0)',
							border: '1px solid #B0B0B0',
							borderRadius: '8rpx'}" type="default" @click="gotoDetail(item)">更多详情</u-button>
					</view>
				</strategy-component-item>
				<!-- 最后一个元素,不要间隔槽 -->
				<!--
				<u-gap height="20"  bg-color="#626262" v-if="index != categoryList.length -1"></u-gap>-->
				
			</view>
				<u-loadmore :status="status" bg-color="#333" />
				<view style="height: 20px"></view>
			</view>
		</scroll-view>
		<!-- 用于平仓的弹框,有二次确认,有取消按钮-->
		<u-modal v-model="showModal" :title-style="{color:'#FFFFFF'}" :modalStyle="{backgroundColor:'#333'}" :content-style="{ color: '#FFFFFF'}"  mask-close-able :content="msg" :show-cancel-button="isShowCancel" v-if="isShowCancel" @confirm="confirmPingStore"></u-modal>
		
		<!-- 用于改变运行状态的弹框, 无取消按钮 -->
		<u-modal v-model="showModal" :title-style="{color:'#FFFFFF'}" :modalStyle="{backgroundColor:'#333'}" :content-style="{ color: '#FFFFFF'}"  mask-close-able :content="msg"  v-if="!isShowCancel"></u-modal>
		
	</view>
</template>

<script>
	//import CategoryComponentItem from '@/common/category_component_item.vue';
	import strategyComponentItem from '@/common/strategy-component-item.vue';
	import { getStrategyList, getCurrrcyPairs, getRunningStatus } from '../../mock/category_view.js';
	import { getStrategyChildGroupList, getStrategyStats, getStrategyCategory } from '@/api/category_view.js';
	import { oneKeyDoneFunc } from '@/api/transaction_list.js'
	import { mapState } from 'vuex';
	import { statusControl } from '@/api/transaction.js'
	let totalpage = 1;
	let pageNo = 1;
	export default {
		data() {
			return {
				width: '',
				height: '',
				status: 'nomore',
				strategyInfo: {
					
				},
				msg: '',
				// 不勾选查看已停止
				checkStop: false,
				dropdownIndex: '',
				categoryList: [],
				scrollHeight: '',
				value1: 'ALL',
				value2: -1,
				value3: 0,
				options1: [],
				options2: [],
				oldValue2: '',
				title3: '策略分类',
				options3: [
					
				],
				isIphoneX: false,
				customStyle1: {
					/*color: 'rgba(255, 255, 255, 1)',
					marginBottom: '30rpx',
					width: '160rpx',
					backgroundColor: 'rgba(254,65,87,1)',
					height: '60rpx',*/
					/*border: '1rpx solid rgba(254,65,87,1)'*/
				},
				customStyle2: {
					color: 'rgba(255, 255, 255, 1)',
					backgroundColor: 'rgba(38,214,80,1)',
					marginBottom: '30rpx',
					width: '160rpx',
					height: '60rpx',
					/*border: '1rpx solid rgba(38,214,80,1)'*/
				},
				isShowCancel: false,
				showModal: false,
				title1: '全部币种',
				title2: '所有状态',
				isCgroupId: false,
				marginTop: ''
			}
		},
		computed:{
			...mapState(['strategistId']),
			zIndex: function() {
				return this.dropdownIndex!==''?99999999:2;
			},
		},
		components:{
			//CategoryComponentItem
			strategyComponentItem
		},
		async onLoad(option) {
			const info = uni.getSystemInfoSync();
			console.log('info'+JSON.stringify(info));
			this.width = info.windowWidth + 'px';
			this.height= info.windowHeight + 'px';
			
			if (option.title) {
				uni.setNavigationBarTitle({
					title:option.title
				});
			}
			if (option.groupId) {
				this.groupId = option.groupId;
				this.isCgroupId = false
			} else if(option.cgroup_id) {
				this.groupId = option.cgroup_id
				this.isCgroupId = true
			}
			//console.log('list:'+JSON.stringify(this.categoryList));
			this.options2 = getRunningStatus();
			this.isIphoneX = getApp().globalData.isIphoneX
			const iphoneXPadding = this.isIphoneX ? uni.upx2px(68): 0;
			this.scrollHeight = info.windowHeight - uni.upx2px(79-4) - iphoneXPadding;
			//this.marginTop = 40+'px';
			this.marginTop = uni.upx2px(79) 
			this.setCategoryList()
		},
		onShow() {
			this.interval = setInterval(async ()=>{
				this.setCategoryList()
			}, 1000*5);
		},
		beforeDestroy() {
			if (this.interval) {
				clearInterval(this.interval)
			}
		},
		onHide() {
			if (this.interval) {
				clearInterval(this.interval)
			}
		},
		methods: {
			async statusControl(item) {
				// 2 运行中,1 暂停
				if (item.status != 1 && item.status != 2) {
					return;
				}
				const status = item.status 
				const statusVal = status == 2 ? false: true
				const resp = await statusControl(statusVal, item.id)
				console.log('resp'+JSON.stringify(resp))
				// 不显示cancel 按钮
				this.isShowCancel = false
				this.msg = resp.msg
				this.showModal = true
				
				setTimeout(()=> {
					this.setCategoryList()
					this.showModal = false
				}, 1000)
			},
			gotoDetail(item) {
				uni.navigateTo({
					//url: '/pages/transaction/strategy_detail?sName='+item.sName
					url: '/pages/user/detail_page?sName='+item.sName+'&cname='+(item.cname!==undefined ?item.cname: '')
				});
			},
			gotoIncomeDetail(item) {
				const nameStr = item.sName;
				let path = '/pages/user/income_detail?sName='+nameStr;
				uni.navigateTo({
					url: path
				});
			},
			hasPingStoreBtn(item) {
				console.log(item)
				console.log(item.positions)
				return item.positions!== undefined && item.positions.pos!=0 && item.positions.pos!==undefined;
			},
			async pingFunc(item) {
				this.isShowCancel = true
				this.showModal = true
				this.msg = '你确定要平仓吗?'
				this.item = item
			},
			confirmPingStore() {
				const func = async (item) =>  {
					let direction = ''
					if (item.positions !== undefined && item.positions.pos!==undefined  && item.positions.pos!=0) {
						direction = 'long'
					}
					else if (item.positions !== undefined && item.positions.pos!==undefined && item.positions.pos!=0) {
						direction = 'short'
					}
					const resp = await oneKeyDoneFunc(this.strategistId, item.id, direction);
					return resp
				};
				
				// 
				const resp = func(this.item)
				this.msg = resp.msg !== undefined ? resp.msg : (resp.message!==undefined? resp.message: '' )
				this.showModal = true
				this.isShowCancel = false
				
				setTimeout(()=> {
					this.setCategoryList()
					this.showModal = false
				}, 1000)
			},
			// 资金明细
			gotoMoneyDetail(item) {
				uni.navigateTo({
					url: '/pages/user/money_detail?sName='+item.sName
				});
			},
			async setCategoryList() {
				const res  = await getStrategyCategory(this.groupId, this.value2, this.strategistId, this.isCgroupId);
				//console.log('res:'+JSON.stringify(res)+',title3:');
				if (res.currency_list.length ==0) {
					this.categoryList = [];
					return [];
				}
				let rows = res.category_rows;
				const currencyList = res.currency_list;
				const options = [
					{ label: '全部币种', value: 'ALL' }
				];
				for(let m = 0;m<currencyList.length;m++) {
					options.push({label: currencyList[m], value: currencyList[m]});
				}
				this.options1 = options;
				rows = Object.values(rows);
				//console.log('rows:'+JSON.stringify(rows));
				this.categoryList = rows;
			},
			openDropdown(index) {
				console.log('openDropdown+index'+index);
				this.dropdownIndex = index;
			},
			closeDropdown(index) {
				this.dropdownIndex = '';
			},
			transformToOptions(units) {
				const options = []
				units.forEach((item) => {
					options.push({label:item.name, value: item.id});
				});
				return options;
			},
			transformChildGroupToOptions(groupList) {
				const options = []
				const len = groupList.length;
				for (let m = 0;m<len;m++) {
					options.push({ label: groupList[m].name, value: groupList[m].id })
				}
				return options;
			},
			changeCheckbox(e) {
				const values = e.detail.value;
				console.log('values'+JSON.stringify(values));
				if (values.length>0) {
					this.oldValue2 = this.value2;
					this.value2 = 4; // 不勾选,对应的值是''
					console.log('this.oldValue2:'+this.oldValue2);
					this.checkStop = true;
					this.title2 = '运行状态'
					this.setCategoryList();
				} else {
					// 显示之前勾选的...
					this.value2 = this.oldValue2;
					const index = this.options2.findIndex((item)=> {
						return item.value == this.value2;
					});
					this.checkStop = false;
					this.title2 = this.options2[index].label;
					this.setCategoryList();
				}
			},
			//改变币对
			async changeValue1(v) {
				this.value1 = v;
				const index = this.options1.findIndex((item)=> {
					return item.value == v;
				});
				this.title1 = this.options1[index].label;
				
				
				const res  = await getStrategyCategory(this.groupId, this.value2, this.strategistId);
				console.log('res:'+JSON.stringify(res)+',title3:');
				if (res.currency_list.length ==0) {
					return;
				}
				let rows = res.category_rows;
				if (v == 'ALL') {
					this.categoryList = Object.values(rows);
					return;
				}
				rows = Object.values(rows);
				const newRows = [];
				for(let s = 0;s<rows.length;s++) {
					const list = rows[s].slist;
					const res  = list.filter(row => {
						return row.currency == v;
					});
					console.log('res:'+JSON.stringify(res));
					if (res.length>0) {
						newRows.push({
							title:rows[s].title,
							slist: res,
						});
					} 
				}
				this.categoryList = newRows;
				console.log('filter currency values:'+JSON.stringify(rows));
				console.log('change value1:'+v)
			},
			// 改变状态,发送请求
			changeValue2(v) {
				this.value2 = v;
				this.oldValue2 = v;
				const index = this.options2.findIndex((item)=> {
					return item.value === v;
				});
				this.title2 = this.options2[index].label;
				this.checkStop = false;
				console.log('change value2:'+v)
				this.setCategoryList();
			},
			changeValue3(v) {
				this.value3 = v;
				const index = this.options3.findIndex((item)=> {
					return item.value == v;
				});
				this.title3 = this.options3[index].label;
				console.log('change value1:'+v)
				this.setCategoryList();
			},
			gotoStrategyDetail(item) {
				console.log('gotoStrategyDetail');
				uni.navigateTo({
					url: '/pages/user/detail_view?sName='+item.sName
				})
			},
			gotoCategoryView() {
				console.log('gotoCategoryView...');
			}
		},
		onReachBottom() {
			this.status = 'nomore';
			/*setTimeout(()=> {
				if (pageNo>totalpage) {
					this.status = 'nomore';
					return;
				}
				this.status = 'loading';
				pageNo++;
				const res = getStrategyList(pageNo, 5);
				if (res.list.length>0) {
					this.categoryList = this.categoryList.concat(res.list);
				} else {
					this.status = 'nomore';
				}
			}, 500);*/
		}
	}
</script>

<style lang="scss">
	#show-strategy-font {
		/*font-size: 18rpx;*/
		color: $kp-font-color;
		opacity: 0.5;
	}
	.list {
		padding-bottom: 0;
		padding-bottom: 68rpx;
	}
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		display: none;
		color:transparent;
	}

	.strategy-group-name {
		font-weight: 800;
		margin-left: 32rpx;
		
	}
		
	#root-view {
		display: flex;
		flex-direction: column;
		background-color: $kp-bg-color;
		color: $kp-font-color;
		
		::v-deep .u-hairline-border:after {
			border-width: 0px;
		}
		::v-deep .u-line {
			opacity: 0.3;
		}
		::v-deep .u-cell-item-box {
			background-color: $kp-bg-color;
		}
		
		::v-deep .u-dropdown__menu__item__text {
			font-size: 28rpx;
			font-family: SimHei;
			font-weight: 400;
			color: #FFFFFF;
			opacity: 0.5;
		}
		
		::v-deep .u-border-bottom:after {
			border-bottom-color: $kp-gray-color;
			border-bottom-width: 0px;
		}
		
		::v-deep .u-border-top:after {
			border-bottom-color: $kp-gray-color;
			border-bottom-width: 1px;
		}
		
		::v-deep .hairline-left {
			border-left: 1px solid #F2F2F2;
		}
		
		::v-deep .u-default-plain-hover {
			background: rgba(255, 255, 255, 0.2) !important;
		}
		/** 最后一个元素,margin-bottom 为0px **/
		::v-deep .category-component-clazz {
			margin-bottom: 20px;
		}
		
		::v-deep .category-component-clazz:nth-child(1) {
			margin-top: 27rpx;
		}
		
		#strategy-search {
			display: flex;
			box-sizing: content-box;
			/*height: 104rpx;*/
			background-color: $kp-bg-color;
			position: fixed;
			flex-direction: column;
			&-1 {
				display: flex;
			}
			&-1-select {
				width: 500rpx;
			}
			&-2 {
				display: flex;
				width: 250rpx;
				&-checkbox {
					width: 250rpx;
					justify-content: center;
					display: flex;
					align-items: center;
					checkbox-group {
						width: 250rpx;
					}
					checkbox {
						transform: scale(0.7);
					}
				}
			}
		
		}
	}
	
	
	
	.four_stat_view {
		text-align: center;
		padding-bottom: 20px;
		.view-stat-view-link {
			text-decoration: underline;
			color: #999999;
		}
	}
	.flex-center {
		display: flex;
		justify-content: center;
		text-align: center;
		padding-top: 27rpx;
		padding-bottom: 20rpx;
		> navigator {
			color: blue;
		}
	}
	
	.flex-1 {
		flex: 1
	}
	.list {
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);  
		padding-bottom: env(safe-area-inset-bottom);  
	}
	
</style>