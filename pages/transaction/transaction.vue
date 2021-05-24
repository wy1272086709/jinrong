<template>
	<view id="root-view" @tap.stop="hideOption">
		<template v-if="options1.length>0">
			<view id="icon-header-view">
				<u-icon :custom-style="{ paddingRight: '25px'}" name="list-dot" size="28" color="#FFFFFF"
					@click.stop="showUserList" v-if="canSwithStrategIst"></u-icon>

				<u-dropdown height="52" @open="openDropdown" @close="closeDropdown" inactiveColor="#FFF"
					activeColor="#FFF">
					<view :scroll-y="true" :style="{height: strategyMenuHeight+'px'}">
						<u-dropdown-item v-model="value1" :title="title1" :options="options1" @input="changeValue1">
						</u-dropdown-item>
					</view>
				</u-dropdown>
			</view>
			<u-tabs-swiper bg-color="#333" activeColor="#ffffff" inactiveColor="#b1b7bc" ref="tabs"
				:list="[{name: '交易'}, {name: '仓位信息'}]" item-width="250" bar-height="3" :current="current"
				@change="switchTab" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>

			<swiper class="swiper-box" :current="activeTabIndex" @transition="transition"
				@animationfinish="animationfinish" :style="{height: swiperHeight+'px'}">
				<swiper-item class="swiper-item">
					<view class="list" :scroll-y="true" :style="{height: viewHeight+'px'}">
						<view id="currency-view">
							<view id="header-view">
								<view id="header-view-row-2">
									<view class="w300">
										<view class="header-view-row-2-label"><text
												style="margin-right: 10rpx;">当前价格:</text><text
												:class="[ strategyIncomeInfo.strategyValue>0?'green-css':'red-css', 'font-26']">{{strategyIncomeInfo.strategyValue}}</text>
										</view>
									</view>
									<view class="flex-1">
										<view class="header-view-row-2-label bold-text">
											{{currencyPair}}
										</view>
									</view>
								</view>
							</view>
							<single-select-row :select-options="[
					{ label: '市价单', value: 'MARKET' },
					{ label: '限价单', value: 'LIMIT' },
					{ label: '追多追空单', value: 'STOP' },
				]" :value="curDelegateOption.label===undefined?'限价单':curDelegateOption.label" @selectOne="selectDelegate"
								ref-prop="delegateSelect" ref="delegateSelectRef" button-type="label" button-text="委托类型"
								select-width="470rpx" btn-width="210rpx">
							</single-select-row>

							<single-select-row ref-prop="priceRef" ref="priceInputRef" :input-type="'input'"
								:disabled="curDelegateOption.value=='MARKET'?true:priceDisabled" @input="changePrice"
								button-text="价格" button-type="label" :inputPlaceHolder="holderValue"
								:keyboardType="'digit'" :input-prop-value="price" btn-width="210rpx"
								@focus="focusHanlder">
							</single-select-row>

							<single-select-row ref-prop="qualityRef" input-type="custom" button-text="数量"
								ref="qualityInputRef" btn-width="210rpx" button-type="label"
								custom-style="align-items:center" @focus="focusHanlder">
								<input
									:style="{'background-color':'rgba(103,109,129,0.2)', width: '470rpx', height: '50rpx', 'min-height': '50rpx','border-radius':'10rpx', border: '1px solid rgba(255,255,255,0.2)', textAlign:'left', paddingLeft:'20rpx', boxSizing: 'border-box'}"
									:placeholder="qualityPlaceHoladerText" placeholder-style="rgba(255,255,255,0.5)"
									v-model="qualityVal" class="my-input" type="digit" @input="changeQuality" />
							</single-select-row>

							<single-select-row :is-one-button="false" input-type="custom1" button-type="label"
								buttonText="" btnWidth="210rpx">
								<view id="select-quality-btn">
									<u-button hover-class="none" size="mini" type="primary" class="my-blue-btn"
										:custom-style="{backgroundColor: qualityBtnIndex==0?'#676D81':'rgba(255,255,255,0.1)', width: '110rpx'}"
										@click="qualitySelect(0)" throttle-time="500">10%</u-button>
									<u-button hover-class="none" size="mini" type="primary" class="my-blue-btn"
										:custom-style="{backgroundColor: qualityBtnIndex==1?'#676D81':'rgba(255,255,255,0.1)', width: '110rpx'}"
										@click="qualitySelect(1)" throttle-time="500">25%</u-button>
									<u-button hover-class="none" size="mini" type="primary" class="my-blue-btn"
										:custom-style="{backgroundColor: qualityBtnIndex==2 ? '#676D81':'rgba(255,255,255,0.1)', width: '110rpx'}"
										@click="qualitySelect(2)" throttle-time="500">50%</u-button>
									<u-button hover-class="none" size="mini" type="primary" class="my-blue-btn"
										:custom-style="{backgroundColor: qualityBtnIndex==3?'#676D81':'rgba(255,255,255,0.1)', width: '110rpx'}"
										@click="qualitySelect(3)" throttle-time="500">100%</u-button>
								</view>
							</single-select-row>

							<single-select-row ref-prop="stopProfitPriceRef" :input-type="'input'"
								inputPlaceHolder="请输入止盈委托价" @input="changeStopProfitPrice" button-text="止盈委托价"
								ref="stopProfitPriceInputRef" button-type="label" :keyboardType="'digit'"
								:input-prop-value="profit_price" btn-width="210rpx" @focus="focusHanlder">

							</single-select-row>

							<single-select-row ref-prop="stopLossPriceRef" ref="stopLossPriceInputRef"
								:input-type="'input'" inputPlaceHolder="请输入止损委托价" @input="changeStopLossPrice"
								button-text="止损委托价" button-type="label" :keyboardType="'digit'"
								:input-prop-value="loss_price" btn-width="210rpx" @focus="focusHanlder">
							</single-select-row>

							<single-select-row button-type="label" button-text="移动止损间距" inputPlaceHolder="请输入止损间距"
								:input-type="'input'" :keyboardType="'digit'" @input="changeLossDelta"
								:input-prop-value="loss_delta" btn-width="210rpx" @focus="focusHanlder">
							</single-select-row>

							<view id="bottom-view">
								<view class="transaction-btn">
									<view class="transaction-btn-left" hover-stop-propagation="" @tap.stop="buyKaiDuo">
										<view class="juzhong">
											<image style="width: 40rpx;height: 40rpx;"
												src="../../static/image/overall_view/duo.png"></image>
										</view>
										<view class="u-m-l-20">
											<text>买入开多</text>
										</view>

									</view>
									<view class="transaction-btn-right" hover-stop-propagation=""
										@tap.stop="sellKaiKong">
										<view class="juzhong">
											<image style="width: 40rpx;height: 40rpx;"
												src="../../static/image/overall_view/kong.png"></image>
										</view>
										<view class="u-m-l-20">
											<text>卖出开空</text>
										</view>

									</view>

								</view>
							</view>
						</view>

						<u-gap height="20" bg-color="rgba(255,255,255,0.1)"></u-gap>

						<view id="link-view">
							<view class="bold-text">当前委托</view>
							<view id="link-view-right">
								<navigator
									:url="'/pages/user/history_delegate_log?currencyPairs='+currencyPair+'&sName='+sName+'&sid='+sid">
									<text>查看历史</text>
									<u-icon name="arrow-right" color="#c3c3c3"
										:custom-style="{'margin-right': '-12rpx'}"></u-icon>
								</navigator>
							</view>
						</view>
						<u-gap height="2" bg-color="rgba(255,255,255,0.1)"></u-gap>
						<scroll-view :style="{height: scrollHeight}" :scroll-y="true">

							<delegate-component-item :bold-text="item.cname" v-for="item, index in delegateLogList"
								:key="item.id" :delegate-info="item" @showDelegateForm="showDelegateForm(item)"
								@deleteDelegate="deleteDelegate(item)" @pingFunc="pingFunc(item)"
								v-if="delegateLogList.length>0"></delegate-component-item>
							<!--
								<view style="height: 40rpx;" class="list" v-if="delegateLogList.length > 0"></view>
								-->
							<u-empty text="暂无触发策略条件" v-if="delegateLogList.length == 0"></u-empty>


							<u-loadmore bg-color="#333" status="nomore" v-if="delegateLogList.length>0"></u-loadmore>
							<view style="height: 70rpx;" class="list" v-if="delegateLogList.length > 0"></view>

						</scroll-view>
					</view>
				</swiper-item>


				<!-- 委托 -->


				<!-- 持仓 -->
				<swiper-item class="swiper-item">
					<view :scroll-y="true" :style="{height: swiperHeight}">
						<view class="cangwei-header">
							<view class="cangwei-title">
								<view class="title-left">
									<view>
										<text>合约:</text>
										<text class="u-m-l-10">{{basicInfoList[6].val}}</text>
									</view>

									<!-- <view class="u-m-l-20">
								<u-tag :text="gangganglv" size="mini" type="warning"></u-tag>
							</view> -->
									<view class="tag-box u-m-l-20">
										<text>{{gangganglv}}</text>
									</view>
								</view>
							</view>
							<u-gap height="2" bg-color="rgba(255,255,255,0.2)"></u-gap>
							<view id="basic-info-list">
								<view class="basic-info-row">
									<text>交易所</text>
									<text>{{basicInfoList[3].val}}</text>
								</view>
								<view class="basic-info-row">
									<text class="u-m-l-30">交易代码</text>
									<text>{{basicInfoList[5].val}}</text>
								</view>
								<view class="basic-info-row">
									<text>初始资金</text>
									<text>{{basicInfoList[0].val}}</text>
								</view>
								<view class="basic-info-row">
									<text class="u-m-l-30">当前资金</text>
									<text>{{basicInfoList[2].val}}</text>
								</view>
								<view class="basic-info-row">

									<text>合约乘数</text>
									<text>{{basicInfoList[1].val}}</text>
								</view>
							</view>
						</view>


						<view class="basic-info-title" style="margin-top: 60rpx;padding-top: 0px;"
							v-if="storeRes.length>0">
							<text>仓位</text>
						</view>
						<u-gap height="2" bg-color="rgba(255,255,255,0.2)"></u-gap>
						<view class="store-view-info" v-for="item,index in storeRes" :key="index">
							<view class="store-view-row">
								<!--
						<view class="store-view-row-left">
							<text class="bold-text">{{currencyPair}}</text>
						</view>
						-->
								<view class="store-view-row-1">
									<view class="u-m-l-20">
										<image v-if="item.pos>0" style="width: 40rpx;height: 40rpx;"
											src="../../static/image/overall_view/duo.png"></image>
										<image v-if="item.pos<=0" style="width: 40rpx;height: 40rpx;"
											src="../../static/image/overall_view/kong.png"></image>
									</view>
									<view class="u-m-l-20">
										<text v-if="item.pos>0" class="duo">买入开多</text>
										<text v-if="item.pos<=0" class="kong">卖出开空</text>
									</view>
								</view>
								<view class="store-view-row-2" @tap="item.pos>0? oneKeyPingDuo(): oneKeyPingKong()">
									<text class="u-m-l-40">平仓</text>
								</view>
							</view>

							<view class="store-res">
								<view class="store-res-row">
									<view class="store-res-row-left">
										<text class="store-res-row-label">开仓均价: </text>
										<text class="light-bold-text u-m-l-20"
											:style="item.pos>0?'color:#0BF4FD':'color:#FB3F69'">{{item.avgPrice}}</text>
									</view>
									<view class="store-res-row-right">
										<text class="store-res-row-label">仓位:</text>
										<text class="light-bold-text u-m-l-20">{{item.pos}}</text>
									</view>
								</view>
								<u-gap height="2" margin-top="20" bg-color="rgba(255,255,255,0.1)"></u-gap>
								<view class="store-res-row u-font-23">
									<view class="store-res-row-left">
										<text class="store-res-row-label">收益:</text>
										<text class="light-bold-text u-m-l-72"
											:style="'color:'+getColor(item.benifit)">{{item.benifit}}</text>
									</view>
									<view class="store-res-row-right right-icon">
										<text class="light-bold-text"
											:style="'color:'+getColor(item.percent)">{{item.percent+'%'}}</text>
										<view class="juzhong">
											<image v-if="item.percent <=0" style="width: 27rpx;height: 32rpx;"
												src="../../static/image/overall_view/next.png"></image>
											<image v-if="item.percent >0" style="width: 27rpx;height: 32rpx;"
												src="../../static/image/overall_view/prev.png"></image>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</swiper-item>

			</swiper>
			<u-modal v-model="showModal" cancel-color="#b1b7bc" confirm-color="#ffffff" :show-title="false"
				@confirm="saveDelegateForm()" async-close mask-close-able show-cancel-button closeable>
				<view class="slot-content">
					<view class="slot-content-row" v-for="item in adjust_items" :key="item">
						<label>{{getEditFormLabel(item)}}</label>
						<input v-model="delegateRow[item]" type="digit" />
					</view>
				</view>
			</u-modal>

			

			<u-modal :title-style="{color:'#FFFFFF'}" :modalStyle="{backgroundColor:'#333'}"
				:confirm-style="{color:'#ffffff'}" :content-style="{ color: '#b1b7bc'}" v-model="showMsg"
				mask-close-able :content="msg"></u-modal>
			<u-modal @confirm="pingFunc1" :cancel-style="{color:'#b1b7bc'}" :confirm-style="{color:'#ffffff'}"
				:title-style="{color:'#FFFFFF'}" :modalStyle="{backgroundColor:'#333'}"
				:content-style="{ color: '#b1b7bc'}" v-model="showMsg1" show-cancel-button mask-close-able
				:content="msg1"></u-modal>
		</template>
		<template v-else>
			<view style="height: 100vh;">
				<view id="icon-header-view">
					<u-icon :custom-style="{ paddingRight: '25px'}" name="list-dot" size="28" color="#FFFFFF"
						@click.stop="showUserList" v-if="canSwithStrategIst"></u-icon>
				</view>
		<u-empty text="暂无交易策略,请重新选择用户" mode="list">

		</u-empty>
		</view>
		</template>
		<uni-drawer ref="showLeft" @close="closeDrawer" mode="left" :width="320" :visible="drawVisible">
			<view class="status-line" :style="{height: lineHeight+'px'}"></view>
			<view id="admin-header">
				<view id="admin-header-left">
					<image src="../../static/image/overall_view/user_avatar.png" class="admin-avatar"></image>
				</view>
				<view id="admin-header-right">
					<view id="admin-header-right-top">
						<text>{{userName}}</text>
					</view>
					<view id="admin-header-right-bottom">
						<label class="user-logout-underline" @tap="logout">退出</label>
					</view>
				</view>
			</view>
		
			<view style="margin-bottom: 30px;margin-left:35px;margin-top: 32px;">
				<text id="blockchain-product">区块链产品</text>
			</view>
			<scroll-view id="user-list" :scroll-y="true" :style="{height: userListHeight, width:'185px'}">
				<view id="user-list-view">
					<view class="user-account-css" @tap="switchStrategist('')">
						<text>{{userName}}</text>
						<icon type="success_no_circle" v-if="strategistId===''"></icon>
					</view>
					<view v-for="(user, index) in userList" :key="index" class="user-account-css"
						@tap="switchStrategist(index)">
						<text>{{ user }}</text>
		
						<icon type="success_no_circle" v-if="strategistId===index"></icon>
					</view>
					<view class="user-account-css">
						<text></text>
					</view>
		
				</view>
			</scroll-view>
		</uni-drawer>
		
		<u-modal @confirm="confirmLogout" :cancel-style="{color:'#b1b7bc'}" :confirm-style="{color:'#ffffff'}"
			:title-style="{color:'#FFFFFF'}" :modalStyle="{backgroundColor:'#333'}"
			:content-style="{ color: '#b1b7bc'}" v-model="showExitMsg" show-cancel-button mask-close-able
			content="你确定要退出吗?"></u-modal>
</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import easySelect from '@/components/easy-select.vue';
	import singleSelectRow from '@/components/single_select_row.vue';
	import {
		getSingleStrategyStatData
	} from '@/api/strategy_detail.js';
	import {
		getDataFromKeys
	} from '@/common/util.js';
	import {
		oneKeyDoneFunc,
		getTransactionInfoList
	} from '@/api/transaction_list.js';
	import {
		getDelegateLogList,
		conditionCreate,
		conditionPing,
		conditionUpdate,
		conditionDel,
		getVolumeLimit
	} from '@/api/transaction.js';
	import delegateComponentItem from '@/components/delegate-component-item.vue'
	let pageNo = 1,
		totalpage = 1;



	export default {
		data() {
			return {
				item: {},
				showModal: false,
				quality: '',
				price: '',
				loss_price: '',
				currencyPair: '',
				profit_price: '',
				priceDisabled: false,
				loss_delta: '',
				title1: '',
				value1: '',
				showExitMsg: false,
				drawVisible: false,
				options1: [

				],
				userListHeight: '',
				msg: '',
				showMsg: false,
				msg1: '',
				showMsg1: false,
				current: 0,
				activeTabIndex: 0,
				// 选择的数量的索引,默认为-1
				qualityBtnIndex: -1,
				gangganglv: "",
				lineHeight: '',
				basicInfoList: [{
						name: 'initial_capital',
						val: '',
						label: '初始资金:'
					},
					{
						name: 'contract_multiplier',
						val: '',
						label: '合约乘数:'
					},
					{
						name: 'total_amount',
						val: '',
						label: '当前资金:'
					},
					{
						name: 'exchange',
						val: '',
						label: '交易所:'
					},
					{
						name: 'leverage',
						val: '',
						label: '杠杆率:'
					},
					{
						name: 'swap_exchange',
						val: '',
						label: '交易代码:'
					},
					{
						name: 'contract',
						val: '',
						label: '合约:'
					},
				],
				sName: '',
				scrollHeight: '',
				// 历史委托记录列表
				strategyIncomeInfo: {
					strategyValue: '',
				},
				qualityPlaceHoladerText: '',
				//tradeType: '交易类型',

				delegateRow: {

				},
				// 止盈止损列表
				delegateLogList: [

				],
				curDelegateOption: {
					label: '限价单',
					value: 'LIMIT'
				},
				value2: 2,
				qualityVal: '',
				storeRes: [

				],
				sid: '',
				curStatusOption: {

				},
				viewHeight: '',
				swiperHeight: '',
				adjust_items: [],
				status: 'loadmore',
				holderValue: '请输入价格',
				strategyMenuHeight: '',
			}
		},
		async onLoad(option) {
			console.log('option:' + JSON.stringify(option));

			const info = uni.getSystemInfoSync()
			this.lineHeight = info.statusBarHeight;
			this.isIphoneX = getApp().globalData.isIphoneX
			const iphoneXPadding = this.isIphoneX ? uni.upx2px(68) : 0
			console.log('iphoneXpadding:' + iphoneXPadding)

			this.swiperHeight = info.windowHeight - uni.upx2px(52)
			this.strategyMenuHeight = this.swiperHeight - iphoneXPadding
			this.scrollHeight = info.windowHeight - uni.upx2px(52) - uni.upx2px(82) - iphoneXPadding - uni.upx2px(
				712) - 14 + 'px'
			this.viewHeight = info.windowHeight - uni.upx2px(52) - uni.upx2px(82);
			this.userListHeight = info.windowHeight - info.statusBarHeight - 30 - 26 + 'px'
		},
		onShow() {
			this.initTrasactionPage()
		},
		beforeDestroy() {
			console.log('beforeDestroy ....')
			if (this.interval) {
				clearInterval(this.interval)
			}
		},
		onHide() {
			console.log('onHIde ....')
			if (this.interval) {
				clearInterval(this.interval)
			}
		},
		onReachBottom() {
			setTimeout(() => {
				if (pageNo > totalpage) {
					this.status = 'nomore';
					return;
				}
				pageNo++;
				this.status = 'nomore';
			}, 500);
		},
		components: {
			easySelect,
			singleSelectRow,
			delegateComponentItem
		},
		computed: {
			...mapState(['strategistId']),
			userList: function() {
				const str = uni.getStorageSync('wx_strategist_list');
				return str ? JSON.parse(str) : [];
			},
			userName: function() {
				if (this.$store.state && this.$store.state.userName) {
					return this.$store.state.userName
				}
				return uni.getStorageSync('wx_login_username')
			},
			canSwithStrategIst: function() {
				if (Object.keys(this.userList).length <= 0) {
					return false
				}
				return true
			}
		},
		methods: {
			focusHanlder() {
				this.hideOption()
			},
			openDropdown() {

			},
			async initSNameInfo() {
				const transactionList = await getTransactionInfoList(this.strategistId, 2, -1, '')
				if (transactionList.strategy_list.length > 0) {
					const list = transactionList.strategy_list
					this.options1 = this.transformListToPairs(list)
					this.value1 = this.options1[0].value
					this.title1 = this.options1[0].label
					this.sid = this.value1
					this.sName = this.sNameMap[this.value1]
				} else {
					this.options1 = []
					if (this.interval) {
						clearInterval(this.interval)
					}
				}
			},
			async initTrasactionPage() {
				await this.initSNameInfo()
				if (this.options1.length>0) {
					this.switchStrategyFunc()
				}
			},
			async switchStrategyFunc() {
				const promises = [getSingleStrategyStatData(this.sName).catch(err => {
						return err
					}), getVolumeLimit(this.sid).catch((err) => {
						return err
					}),
					getDelegateLogList(this.sid).catch(err => {
						return err
					})
				]
				let [result, volumeData, resp] = await Promise.all(promises)

				this.basicInfoList[0].val = result.initial_capital !== undefined ? result.initial_capital : '';
				this.basicInfoList[2].val = result.total_amount !== undefined ? result.total_amount : '';
				this.basicInfoList[4].val = result.leverage !== undefined ? result.leverage : '';
				this.basicInfoList[6].val = (result.swap_exchange !== undefined && result.swap_exchange.trading !==
					undefined) ? result.swap_exchange.trading : '';
				this.basicInfoList[1].val = result.contract_multiplier !== undefined ? result.contract_multiplier : '';
				this.basicInfoList[3].val = (result.swap_exchange !== undefined && result.swap_exchange.exchange !==
					undefined) ? result.swap_exchange.exchange : '';
				this.basicInfoList[5].val = (result.swap_exchange !== undefined && result.swap_exchange.currency !==
					undefined) ? result.swap_exchange.currency : '';
				this.gangganglv = this.basicInfoList[4].val + 'X';
				console.log('transation_result:' + JSON.stringify(result));
				if (!Array.isArray(result)) {
					this.strategyIncomeInfo.strategyValue = result.price_now;
					this.currencyPair = result.swap_exchange.currency;
					console.log('asdsd', this.currencyPair);
				}

				if (volumeData && volumeData.buy_limit !== undefined) {
					console.log('volume:', volumeData);
					this.maxQuality = volumeData.buy_limit;
				} else {
					console.log('catch hehehe');
					this.maxQuality = ''
					volumeData = {
						buy_limit: 0
					}
				}
				this.qualityPlaceHoladerText = '最多可开约' + this.maxQuality;
				const arr = (String)(volumeData.buy_limit).split('.');
				if (arr[1] !== undefined) {
					const len = arr[1].length;
					this.sliderStep = 1 / Math.pow(10, len);
				} else {
					this.sliderStep = 0
				}
				if (Array.isArray(resp) && resp.length > 0) {
					for (let m = 0; m < resp.length; m++) {
						resp[m].info = this.basicInfoList[1].val;
					}
					this.delegateLogList = resp
				} else {
					this.delegateLogList = []
				}
				if (this.interval) {
					clearInterval(this.interval)
				}

				this.interval = setInterval(async () => {
					const result = await getSingleStrategyStatData(this.sName);
					if (!Array.isArray(result) && result.price_now !== undefined) {
						this.strategyIncomeInfo.strategyValue = result.price_now;
						this.getStoreResByPositions(result.positions)
						if (this.curDelegateOption.value == 'MARKET') {
							this.holderValue = this.strategyIncomeInfo.strategyValue + '';
							console.log("now price is,", this.holderValue);
						} else {
							this.holderValue = "请输入价格";
						}
					}
				}, 1000 * 5)
			},
			transformListToPairs(list) {
				const n = list.length;
				const pairs = []
				const sNameMap = {}
				for (let m = 0; m < n; m++) {
					const sName = list[m].sname
					const pos = sName.indexOf('.')
					const text = sName.substring(0, pos)
					sNameMap[list[m].id] = sName
					pairs.push({
						value: list[m].id,
						label: text
					});
				}
				// 得到value 和sName 的对应关系
				this.sNameMap = sNameMap
				return pairs;
			},
			showUserList(e) {
				console.log('showUserList:e' + e)
				this.showDrawer('showLeft')
			},
			showDrawer(e) {
				//this.$refs[e].open()
				this.drawVisible = true
			},
			switchStrategist(strategist_id) {
				// 更新策略师ID的值...
				this.$store.commit('setStrategistId', strategist_id);
				this.$refs['showLeft'].close()
				this.initTrasactionPage()
			},
			getEditFormLabel(field) {
				const forms = {
					volume: '数量',
					price: '价格',
					open_price: '正仓价',
					prof_price: '止盈价',
					loss_price: '止损价',
					loss_delta: '止损间距'
				}
				return forms[field]
			},
			closeDropdown() {

			},
			changeValue1(idStr) {
				console.log('change Value1:')
				console.log(idStr)
				const index = this.options1.findIndex((item) => {
					return item.value == idStr
				})
				this.value1 = this.sid = this.options1[index].value
				this.title1 = this.options1[index].label
				this.sName = this.sNameMap[this.sid]
				this.switchStrategyFunc()
			},
			logout() {
				this.showExitMsg = true
			},
			confirmLogout() {
				console.log('用户点击了确定!');
				this.$refs['showLeft'].close();
				this.$store.commit('logout');
				uni.removeStorageSync('wx_login_username');
				uni.removeStorageSync('wx_login_password');
				uni.removeStorageSync('wx_strategist_list');
				uni.reLaunch({
					url: '/pages/user/login_v2'
				});
			},
			oneKeyPingFunc(item) {
				if (item.pos > 0) {
					this.oneKeyPingDuo()
				}
				if (item.pos < 0) {
					this.oneKeyPingKong()
				}
			},
			qualitySelect(index) {
				this.qualityBtnIndex = index
				const arr = [0.1, 0.25, 0.5, 1]
				const sArr = String(this.maxQuality).split(".")
				let len = 0
				if (sArr[1] !== undefined) {
					len = sArr[1].length
				}
				this.qualityVal = parseFloat(arr[index] * this.maxQuality).toFixed(len);
			},
			getColor(value) {
				if (value === undefined) {
					return '#ffffff'
				}

				let color = '';
				if (value == 0) {
					color = '#FB3F69'
				} else if (value > 0) {
					color = '#0BF4FD'
				} else if (value < 0) {
					color = '#FB3F69'
				}
				return color
			},
			validateQuality(v) {
				if (v > this.maxQuality) {
					uni.showToast({
						icon: 'none',
						title: '可用量不足'
					});
				}
			},
			calculateKaiduoPrice() {
				if (this.delegateLogList.length == 0) {
					return 0;
				}
				// 筛选开多的
				const logsList = this.delegateLogList
				const rows = logsList.filter((item, index) => {
					return item.description.indexOf('开多') !== -1
				})
				console.log(JSON.stringify(rows))
				return rows.length > 0 ? this.calculateAvgPrice(rows) : 0
			},
			calculateKaikongPrice() {
				if (this.delegateLogList.length == 0) {
					return 0;
				}
				const logsList = this.delegateLogList
				const rows = logsList.filter((item, index) => {
					return item.description.indexOf('开空') !== -1
				})
				if (rows.length > 0)
					return this.calculateAvgPrice(rows)
				else
					return 0
			},
			calculateAvgPrice(rows) {
				console.log(rows)
				// 计算总价格
				const len2 = rows.length;
				let sum = 0
				for (let j = 0; j < len2; j++) {
					const price = rows[j].cname == '市价单' ? (rows[j].open_price ? rows[j].open_price : 0) : (rows[j].price ?
						rows[j].price : 0);
					const v = String(rows[j].volume)
					const arr = v.split("/")
					const volume = arr[1] !== undefined ? parseFloat(arr[1]) : 0
					sum += parseFloat(price) * volume
				}
				console.log('sum' + sum)
				// 计算总量
				const len = rows.length;
				let totalVolume = 0;
				for (let j = 0; j < len; j++) {
					const v = String(rows[j].volume)
					const arr = v.split("/")
					const volume = arr[1] !== undefined ? arr[1] : 0
					totalVolume += parseFloat(volume)
				}
				const v = parseFloat(sum) / parseFloat(totalVolume)
				const floatVal = v.toFixed(2)
				console.log(floatVal)
				return floatVal
			},
			async oneKeyPingDuo() {
				const resp = await oneKeyDoneFunc(this.strategistId, this.sid, 'long')
				if (resp.status == 1) {
					this.showMsg = true
					this.msg = resp.msg
					setTimeout(() => {
						this.refreshList();
					}, 2500)
				} else {
					this.showMsg = true
					this.msg = resp.msg
				}
			},
			async oneKeyPingKong() {
				const resp = await oneKeyDoneFunc(this.strategistId, this.sid, 'short');
				if (resp.status == 1) {

					this.showMsg = true
					this.msg = resp.msg
					setTimeout(() => {
						this.refreshList();
					}, 2500)
				} else {
					this.showMsg = true
					this.msg = resp.msg
				}
			},
			async pingFunc1() {
				console.log("pingfunc1" + this.item.id);
				const resp = await conditionPing(this.sid, this.item.id);
				if (resp.status == 1) {
					console.log("pingfunc1");
					this.showMsg = true
					this.msg = resp.msg
					setTimeout(() => {
						this.refreshList()
					}, 2500)
				}
			},
			async pingFunc(item) {
				console.log("pingfun" + item);
				this.showMsg1 = true;
				this.msg1 = "你确定要平仓吗?";
				this.item = item;
				console.log("pingfun" + this.item);
			},
			async refreshList() {
				// 刷新列表
				const resp = await getDelegateLogList(this.sid);
				console.log('refresh list...' + JSON.stringify(resp))
				this.delegateLogList = resp;
			},
			getDelegateStatus(status) {
				const map = {
					'WAIT_OPEN': "等待开仓",
					'OPENING': "正在开仓",
					'WAIT_CLOSE': "等待平仓",
					'CLOSING': "正在平仓",
					'COMPLETE': "条件完成",
					'INVALID': "条件无效"
				}
				return map[status] ? map[status] : ''
			},
			showDelegateForm(item) {
				if (item.modifiable_item.length <= 0) {
					this.showMsg = true
					this.msg = '该委托暂时不能修改'
					return;
				}
				this.showModal = true;
				console.log('item' + JSON.stringify(item));
				const editItem = item.modifiable_item;
				// 如果存在is_force
				const n = editItem.length;
				const modifiableItem = [];
				for (let m = 0; m < n; m++) {
					if (editItem[m] != 'is_force') {
						modifiableItem.push(editItem[m])
					}
				}
				this.adjust_items = modifiableItem
				this.delegateRow = item;
			},
			confirmDelete() {

			},
			sliderChange(e) {
				console.log(e)
				const arr = String(this.sliderStep).split(".")
				const len = arr[1] !== undefined ? arr[1].length : 0
				this.qualityVal = String(parseFloat(e.detail.value).toFixed(len));
			},
			// 保存授权单信息
			async saveDelegateForm() {
				const refreshList = async () => {
					// 刷新列表
					const resp = await getDelegateLogList(this.sid);
					console.log('refresh list...' + JSON.stringify(resp))
					this.delegateLogList = resp;
				};

				this.showModal = false;
				// 重新刷新列表...
				const keys = this.adjust_items;
				const row = this.delegateRow;
				console.log('row:' + JSON.stringify(row));
				const formData = getDataFromKeys(keys, row);
				const resp = await conditionUpdate(this.sid, row.id, formData);
				console.log(resp);
				// 修改策略信息成功
				if (resp.status == 1) {
					this.showMsg = true
					this.msg = resp.msg
					setTimeout(() => {
						refreshList()
					}, 2500)
				} else {
					this.showMsg = true
					this.msg = resp.msg
				}
			},
			async deleteDelegate(item) {
				// 发送ajax 请求...
				const editItem = item.modifiable_item;
				if (editItem.indexOf('is_force') !== -1) {
					this.msg = '该委托暂时不能删除'
					this.showMsg = true
					return
				}
				const cid = item.id;
				const refreshList = async () => {
					// 刷新列表
					const resp = await getDelegateLogList(this.sid);
					this.delegateLogList = resp;
				};
				const conditionDelCallback = async (sid, cid) => {
					const resp = await conditionDel(sid, cid)
					if (resp.status == 1) {
						this.msg = resp.msg
						this.showMsg = true
						setTimeout(() => {
							refreshList();
						}, 2500)
					} else {
						this.msg = resp.msg
						this.showMsg = true
					}
				};
				const sid = this.sid;
				conditionDelCallback(sid, cid)
			},
			async buyKaiDuo() {
				this.$u.throttle(() => {
					this.buyOrSell('LONG');
				}, 2000);
			},
			async sellKaiKong() {
				this.$u.throttle(() => {
					this.buyOrSell('SHORT');
				}, 2000);
			},
			async buyOrSell(direction) {
				const v = this.curDelegateOption.value;
				let priceVal = 0;
				if (parseFloat(this.qualityVal) <= 0) {
					uni.showToast({
						title: "数量必须大于0",
						icon: "none"
					});
					return;
				}
				if (v !== undefined && v != 'MARKET' && this.price <= 0) {
					uni.showToast({
						icon: 'none',
						title: '委托类型不为市价单时，此项必须大于0!'
					})
					return;
				}
				if (parseFloat(this.qualityVal) > parseFloat(this.maxQuality) || parseFloat(this.qualityVal) < 0) {
					uni.showToast({
						icon: 'none',
						title: '可用量不足'
					});
					return;
				}
				// 买入开多,且委托类型不为市价单,大于开仓价
				if (this.curDelegateOption.value !== undefined && this.curDelegateOption.value != 'MARKET') {
					// 止盈价限制
					if (parseFloat(this.profit_price) <= parseFloat(this.price) && direction == 'LONG') {
						uni.showToast({
							icon: 'none',
							title: '买入开多,且委托类型不为市价单时候,止盈价应该大于开仓价'
						});
						return;
					}
					// 止损价限制
					if (parseFloat(this.loss_price) >= parseFloat(this.price) && direction == 'LONG') {
						uni.showToast({
							icon: 'none',
							title: '买入开多,且委托类型不为市价单时候,止损价应该小于开仓价'
						});
						return;
					}

					// 止损价限制
					if (parseFloat(this.loss_price) <= parseFloat(this.price) && direction == 'SHORT') {
						uni.showToast({
							icon: 'none',
							title: '卖出开空,且委托类型不为市价单时候,止损价应该大于开仓价'
						});
						return;
					}

					// 止盈价限制,
					if (parseFloat(this.profit_price) >= parseFloat(this.price) && direction == 'SHORT') {
						uni.showToast({
							icon: 'none',
							title: '卖出开空,且委托类型不为市价单时候,止盈价应该小于开仓价'
						});
						return;
					}
				}

				const params = {
					type: v,
					price: parseFloat(this.price),
					loss_price: parseFloat(this.loss_price),
					prof_price: parseFloat(this.profit_price),
					loss_delta: parseFloat(this.loss_delta),
					volume: this.qualityVal,
					direction: direction,
				};
				console.log('params', params);
				const resp = await conditionCreate(params, this.sid);
				console.log('resp' + JSON.stringify(resp));
				if (resp.status == 1) {
					this.showMsg = true
					this.msg = resp.msg
					// 刷新列表
					const refreshList = async () => {
						// 刷新列表
						const resp = await getDelegateLogList(this.sid);
						for (let m = 0; m < resp.length; m++) {
							resp[m].info = this.basicInfoList[1].val;
						}
						this.delegateLogList = resp;
					};
					setTimeout(() => {
						refreshList();
					}, 2500)
				} else {
					this.showMsg = true
					this.msg = resp.msg
				}
			},
			gotoStrategyDetail() {
				uni.navigateTo({
					url: '/pages/transaction/strategy_detail?sName=' + this.sName
				});
			},
			hideOption() {
				console.log('hideOptions')
				if (this.activeTabIndex == 0 && this.$refs.delegateSelectRef !==undefined && this.$refs.delegateSelectRef.hideOption!==undefined) {
					this.$refs.delegateSelectRef.hideOptions();
				}
			},
			// 切换状态
			selectStatus(option) {
				this.curStatusOption = option;
				//this.statusText = option.label;
			},
			closeDrawer(e) {
				//this.$refs['showLeft'].close()
				this.drawVisible = false
				console.log('close closeDrawer');
			},
			changeDelegatePrice(e) {
				console.log('e changeDelegatePrice:' + JSON.stringify(e))
			},
			changePrice(e) {
				console.log('e changePrice:' + JSON.stringify(e));
				//this.$refs.delegateSelectRef.hideOptions();
				this.price = e;
			},
			changeQuality(v) {
				console.log('e change quality:' + JSON.stringify(v));
				const arr = v.detail.value.split('.')
				let dotLen = 0
				if (arr[1] != undefined) {}
				if (parseFloat(v.detail.value) > parseFloat(this.maxQuality)) {

					this.qualityVal = String(this.maxQuality);
					uni.showToast({
						title: "可用量不足",
						icon: "none"
					})
				} else {
					const arr = (String)(this.maxQuality).split('.')
					if (arr[1] != undefined) {
						const len = arr[1].length;
						const arr2 = (String)(v.detail.value).split('.')
						if (arr2.length > 1) {
							const len2 = arr2[1].length
							if (len2 > len)
								this.qualityVal = parseFloat(v.detail.value).toFixed(len);
						} else {

						}
					}
				}
				//this.$refs.delegateSelectRef.hideOptions();
			},
			changeStopProfitPrice(e) {
				console.log('e changeStopProfitPrice' + JSON.stringify(e))
				this.profit_price = e;
				//this.$refs.delegateSelectRef.hideOptions();
			},
			changeLossDelta(e) {
				this.loss_delta = e;
				//this.$refs.delegateSelectRef.hideOptions();
				console.log('e changeLossDelta:' + JSON.stringify(e));
			},
			changeStopLossPrice(e) {
				console.log('e changeStopLossPrice' + JSON.stringify(e))
				//this.$refs.delegateSelectRef.hideOptions();
				this.loss_price = e;
			},
			selectDelegate(option) {
				this.curDelegateOption = option;
				console.log('option' + JSON.stringify(option));
				// 为市价单的时候,价格不能改
				if (option.value == 'MARKET') {
					this.price = 0;
					this.priceDisabled = true;
					this.holderValue = this.strategyIncomeInfo.strategyValue;
				} else {
					this.priceDisabled = false;
					this.holderValue = "请输入价格";
				}
				//this.delegateType = option.label;
			},
			// u-tabs 点击切换tab 
			async switchTab(index) {
				console.log('switchTab...')
				this.activeTabIndex = index
			},
			async switchTabFunc(index) {
				this.status = 'nomore';
				console.log('switchTabFunc...')
				if (index == 0) {

				} else if (index == 1) {
					setTimeout(async () => {
						const result = await getSingleStrategyStatData(this.sName)
						const storeRes = result.positions;
						this.getStoreResByPositions(storeRes)
					}, 500)
				}
			},
			getStoreResByPositions(storeRes) {
				if (storeRes !== undefined && !Array.isArray(storeRes)) {
					const openAvgPrice = this.calculateKaiduoPrice();
					const shortAvgPrice = this.calculateKaikongPrice();
					console.log('open' + openAvgPrice)
					this.storeRes = []
					if (storeRes.long_pos != 0 && storeRes.long_pos !== undefined) {
						this.storeRes.push({
							avgPrice: openAvgPrice,
							pos: storeRes.long_pos,
							benifit: storeRes.profit_estimate.long.pnl_benifit !== undefined ? storeRes
								.profit_estimate.long.pnl_benifit : '',
							percent: storeRes.profit_estimate.long.pnl_percent !== undefined ? storeRes
								.profit_estimate.long.pnl_percent : ''
						});
					}
					if (storeRes.short_pos != 0 && storeRes.short_pos !== undefined)
						this.storeRes.push({
							avgPrice: shortAvgPrice,
							pos: storeRes.short_pos,
							benifit: storeRes.profit_estimate.short.pnl_benifit !== undefined ? storeRes
								.profit_estimate.short.pnl_benifit : '',
							percent: storeRes.profit_estimate.short.pnl_percent !== undefined ? storeRes
								.profit_estimate.short.pnl_percent : ''
						});
					console.log('this.storeRes:' + JSON.stringify(this.storeRes))
				}
			},
			// 这里关闭其他的select
			closeOtherSelect(selectRef) {
				this.$refs.delegateSelectRef.hideOptions();
			},
			transition({
				detail: {
					dx
				}
			}) {
				this.$refs.tabs.setDx(dx);
			},
			// swiper 滑动切换tab
			animationfinish({
				detail: {
					current
				}
			}) {
				this.$refs.tabs.setFinishCurrent(current);
				this.activeTabIndex = current;
				this.current = current;
				console.log('animation finish')
			}
		}
	}
</script>
<style>
	page {
		background-color: #333333;
	}
</style>
<style lang="scss">
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		display: none;
		color: transparent;
	}

	.duo {
		color: #24F5FD;
	}

	.kong {
		color: #FB3F69;
	}

	#no-condition-info {
		margin-left: 32rpx;
		margin-right: 32rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		padding-top: 20rpx;
		text-align: center;
		padding-bottom: 20rpx;
		background-color: #F2F2F2;
	}

	.right-icon {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	#root-view {
		display: flex;
		flex-direction: column;
		min-height: 100vh;

		::v-deep .u-tag {
			font-size: 15px;
		}

		::v-deep .u-model {
			background-color: #333;
		}

		::v-deep .u-model__content__message {
			word-break: break-word !important;
		}

		::v-deep .u-model__footer>view:nth-child(1) {
			border-right: 1px solid rgba(255, 255, 255, 0.2);
		}

		.u-close--top-right {
			top: 10rpx;
			right: 10rpx;
		}

		::v-deep .u-hairline-border:after {
			border-width: 0px;
		}

		::v-deep .u-tabs {
			width: 750rpx;
			position: fixed;
			border-bottom: 1px solid rgba(255, 255, 255, 0.2);
			z-index: 10000000001;
		}

		::v-deep .hairline-left {
			border-left: 1rpx solid #b1b7bc;
		}

		#icon-header-view {
			padding-left: 32rpx;
			padding-right: 32rpx;
			display: flex;

			::v-deep .u-dropdown {
				/*width: 300rpx;*/
			}

			::v-deep .u-cell {
				background-color: $kp-bg-color !important;
			}
		}

		#header-view {
			display: flex;
			align-items: center;
			padding-left: 32rpx;
			padding-right: 32rpx;
			/*margin-top: 20rpx;*/
			margin-bottom: 20rpx;

			&-row-1 {
				margin-top: 10px;
				margin-bottom: 10px;
				display: flex;
				justify-content: space-between;

				view:nth-child(1) {
					display: flex;
				}

				&-title {
					font-size: 23rpx;
					word-break: break-all;
					font-weight: 800;
				}

				view:nth-child(2) {
					display: flex;
				}
			}

			&-row-2 {
				display: flex;
				margin-top: 20rpx;
				height: 50rpx;
				align-items: flex-end;
				flex-direction: row-reverse;

				.w300 {
					display: flex;
					width: 270rpx;
					margin-left: 46rpx;
					font-size: 36rpx;
				}

				.flex-1 {
					display: flex;
					flex: 1;
				}
			}
		}

		#bottom-view {
			display: flex;
			margin-top: 20rpx;
			margin-bottom: 20rpx;
			justify-content: center;

		}

		::v-deep .uni-drawer__content {
			background-color: $kp-bg-color;
			color: $kp-font-color;
		}
	}

	.header-view-row-2-label {
		color: #999999;
		font-size: 26rpx;
		white-space: pre-wrap;
		display: block;
	}

	.font-26 {
		font-size: 26rpx;
	}

	#currency-view {
		margin-top: 82rpx;
		background-color: #333333;
		display: flex;
		flex-direction: column;

		#delegate-view {
			background-color: rgba(103, 109, 129, 0.2);
		}

		::v-deep .easy-select {
			width: 470rpx !important;
			background-color: rgba(103, 109, 129, 0.2);
			display: flex;
			border: 1px solid rgba(255, 255, 255, 0.2);
		}

		::v-deep .my-input {
			width: 470rpx !important;
			flex-shrink: 0;
			flex-grow: 0;
			flex-basis: auto;
		}

		::v-deep .u-input {
			/*border-radius: 10rpx;*/
			border: 1px solid #333333;
			background-color: transparent;
		}

		::v-deep .easy-select-options {
			margin-left: -1px;
		}

		::v-deep .easy-select-options-item {
			text-align: left;
		}
	}

	#table-view-2 {
		padding-top: 20px;
		background-color: #F2F2F2;
		margin-left: 32rpx;
		margin-right: 32rpx;
		margin-bottom: 30px;
	}

	.single-select-row {
		margin-top: 10px;
		margin-bottom: 10px;
	}


	.flex-1 {
		display: flex;
		flex: 1;
	}

	#delegate-view {
		::v-deep .u-cell-item-box {
			background-color: #F2F2F2;
		}

		::v-deep .u-dropdown__content {
			width: 686rpx;
			margin-left: 32rpx;
			margin-right: 32rpx;
		}
	}

	.store-view-row {
		display: flex;
		flex-direction: row;
		align-items: center;
		/*padding-left: 32rpx;
	padding-right: 32rpx;*/
		margin-top: 10px;
		/*margin-bottom: 10px;*/
		height: 74rpx;
		border-radius: 8rpx;
		background-color: rgba(255, 255, 255, 0.1);
		justify-content: space-between;

		/*padding-top: 20px;
	padding-bottom: 20px;*/
		&-left {
			width: 60%;
			color: #999999;
		}

		&-right {
			width: 40%;
			display: flex;
			align-items: center;
		}

		.store-view-row-1 {
			display: flex;
			flex-direction: row;
		}

		.store-view-row-2 {
			height: 50rpx;
			width: 140rpx;
			border: 1px solid #a1a1a1;
			border-radius: 8rpx;
			margin-right: 10rpx;
			display: flex;
			align-items: center;
			color: #a1a1a1;
		}
	}

	.store-view-row-bottom {
		text-align: center;
		margin-top: 20rpx;
	}

	.store-res {
		display: flex;
		flex-direction: column;

		color: rgba($color: #c3c3c3, $alpha: 0.96);

		&-row {
			display: flex;
			margin-top: 20rpx;

			&-left {
				display: flex;
				width: 60%;
				margin-left: 26rpx;
			}

			&-right {
				display: flex;
				width: 40%;
			}

			&-label {
				margin-right: 10rpx;
			}
		}
	}

	.store-view-info {
		margin-left: 20rpx;
		margin-right: 20rpx;
		margin-top: 10rpx;
		display: flex;
		flex-direction: column;
		margin-bottom: 10rpx;
		padding-bottom: 40rpx;
	}

	.cangwei-header {
		height: 300rpx;
		margin: 20rpx;
		background-color: rgba(255, 255, 255, 0.1);
		border-radius: 8rpx;
		margin-top: 110rpx;

		.cangwei-title {

			height: 80rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
		}

		.title-left {
			display: flex;
			flex-direction: row;
			margin-left: 26rpx;
			color: #ffffff;
			font-size: 30rpx;
			align-items: center;
		}

		.tag-box {
			display: flex;
			align-items: center;
			border: 1px solid #2979FF;
			justify-content: center;
			border-radius: 8rpx;
			height: 30rpx;
			width: 60rpx;
			color: #2979ff;
			font-size: 20rpx;
		}

		.title-right {
			margin-right: 36rpx;
			color: #16D0D7;
			font-size: 24rpx;
		}
	}

	.basic-info-border {
		margin-top: 20px;
		margin-left: 5px;
		padding-bottom: 10px;
		font-weight: 800;
		//border-bottom: 1px solid #969696;
	}

	.basic-info-title {
		font-size: 32rpx;
		font-weight: 800;
		margin-top: 90rpx;
		margin-left: 46rpx;
		margin-right: 46rpx;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		color: #ffffff;
	}

	#basic-info-list {
		margin-left: 26rpx;
		margin-right: 30rpx;
		padding-bottom: 30rpx;
		color: #b8b8b8;
		//border-radius: 20rpx;
		display: flex;
		flex-wrap: wrap;

		#basic-info-left {
			width: 50%;
			padding-left: 32rpx;

			>view {
				display: flex;
				margin-top: 10px;
				margin-bottom: 10px;
				padding-left: 5px;
			}

			flex-direction: column;
		}

		#basic-info-right {
			width: 50%;
			margin-left: 30rpx;
			padding-right: 32rpx;
			flex-direction: column;

			>view {
				display: flex;
				/*justify-content: flex-end;*/
				margin-top: 10px;
				margin-bottom: 10px;
				padding-left: 5px;
			}
		}
	}

	.basic-info-row {
		display: flex;
		width: 50%;
		margin-top: 20rpx;

		text:nth-child(1) {
			margin-right: 10rpx;
		}
	}

	.green-css {
		color: #0BF4FD;
		font-weight: 600;
	}

	.red-bgc {
		background-color: rgb(237, 63, 93);
	}

	.green-bgc {
		background-color: rgb(0, 192, 135);
	}

	.red-css {
		color: #FB3F69;
	}

	.modify-btn {
		margin-right: 10rpx;
		;
	}

	.bold-text {
		font-weight: 800;
		font-size: 32rpx;
		color: #fff;
	}

	.bold1-text {
		font-weight: 800;
		font-size: 24rpx;
		color: #333;
	}

	.light-bold-text {
		font-weight: 600;
		color: #B0B0B0;
	}

	.slot-content {
		display: flex;
		padding-top: 20px;
		flex-direction: column;

		&-row {
			display: flex;
			justify-content: center;
			margin-top: 20rpx;
			margin-bottom: 20rpx;

			>label {
				width: 35%;
				display: inline-flex;
				padding-left: 20px;
				color: #b1b7bc;
			}

			>input {
				color: #b1b7bc;
				display: inline-flex;
				width: 65%;
				padding-left: 10rpx;
				margin-right: 20px;
				border: 1px solid rgba(255, 255, 255, 0.1);
			}
		}
	}

	.pre-whitespace {
		white-space: pre;
	}

	.my-slider {
		margin-top: 0;
		margin-bottom: 0;
		margin-left: 0;
		margin-right: 0;
	}

	#select-quality-btn {
		margin-left: 210rpx;
		display: flex;
		justify-content: space-between;
		width: 470rpx;
	}

	.my-blue-btn {
		//background-color: #90BFF1;
	}

	.status-btn {
		font-size: 22rpx;
	}

	.juzhong {
		display: flex;
		align-items: center;
		margin-left: 40rpx;
	}

	.transaction-btn {
		// position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;

		&-left {
			display: flex;
			flex-direction: row;
			border: 1px solid #24F5FD;
			border-radius: 8rpx;
			color: #24F5FD;
			font-weight: bold;
			width: 260rpx;
			height: 70rpx;
			line-height: 70rpx;
		}

		&-right {
			margin-left: 40rpx;
			display: flex;
			flex-direction: row;
			border: 1px solid #FB3F69;
			border-radius: 8rpx;
			width: 260rpx;
			color: #FB3F69;
			height: 70rpx;
			line-height: 70rpx;
		}

		.parallelogram {
			position: absolute;
			left: calc(50% - 20rpx);
			top: 0;
			transform: translate(-50%, -50%);
			width: 40rpx;
			height: 70rpx;
			background: #ffffff;
			transform: skew(30deg);
		}
	}

	#link-view {
		display: flex;
		padding-left: 32rpx;
		padding-right: 32rpx;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		// border-top: 1px solid #F2F2F2;
		justify-content: space-between;

		>view:nth-child(1) {
			color: #ffffff;
		}

		&-right {
			display: flex;
			justify-content: space-between;

			>navigator {
				color: #c3c3c3;
				display: flex;
				align-items: center;
			}
		}
	}

	#admin-header {
		display: flex;
		align-items: flex-end;
		margin-bottom: 5px;

		&-left {
			display: flex;
		}

		&-right {
			display: flex;
			height: 108rpx;
			justify-content: space-between;
			flex-direction: column;

			&-top {
				display: flex;
				margin-top: 10rpx;
			}

			&-bottom {
				display: flex;
				justify-content: flex-start;
			}
		}
	}

	.admin-avatar {
		margin-left: 16px;
		margin-right: 10px;
		width: 108rpx;
		height: 108rpx;
	}

	#user-list-view {
		display: flex;
		flex-direction: column;
		padding-right: 10px;
	}

	#user-list {
		display: flex;

		margin-left: 35px;
		flex-direction: column;
		font-family: Microsoft YaHei;
		font-size: 16px;
	}

	.user-account-css {
		display: flex;
		padding-bottom: 30px;
		padding-left: 5px;
		justify-content: space-between;
	}

	#blockchain-product {
		font-weight: bolder;
		font-family: Microsoft YaHei;
		font-size: 20px;
		padding-bottom: 30px;
	}

	.user-logout-underline {
		padding-right: 20rpx;
		/*margin-left: 5px;*/
		color: $kp-red-color;
		text-decoration: underline;
	}

	.list {
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		/*margin-bottom: 80rpx;*/
	}
</style>
