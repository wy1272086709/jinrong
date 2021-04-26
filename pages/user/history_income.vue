<template>
	<view>
		<u-table align="left">
			<u-tr>
				<u-th>期数</u-th>
				<u-th>收益</u-th>
				<u-th>应结算</u-th>
				<u-th>结算</u-th>
			</u-tr>
			<u-tr v-for="item in rows" :key="item.nid">
				<u-td>
					
					<view>
						<text>{{item.cycle}}</text>
					</view>
				</u-td>
				<u-td>
					<view>
						<!-- :class="item.pay_amount <= 0?'no-balance-css':''" -->
						<text >
					{{item._profit}} 
						</text>
					</view>
				</u-td>
				<u-td width="400" class="u-td-income" :custom-style="{'flex-direction':'row','justify-content':'flex-start'}">
						<text>{{(parseFloat(item.allowance) - parseFloat(item.pay_amount)).toFixed(2)}}</text>
						<u-button  v-if=" (parseFloat(item.allowance) - parseFloat(item.pay_amount)).toFixed(2)>= 0 && strategistId=='admin'" class="bujie-status" size="mini" :custom-style="{height:'40rpx'}">补结</u-button>
				</u-td>
				
				<u-td>
					<text>{{item.pay_amount}}</text>
				</u-td>
			</u-tr>
			
		</u-table>
	</view>
</template>

<script>
	import { getHistoryIncomeList } from '@/api/user_view.js'
	import { mapState } from 'vuex';
	export default {
		computed: {
			...mapState(['strategistId'])
		},
		data() {
			return {
				rows: [
				]
			}
		},
		async onLoad() {
			const resp = await getHistoryIncomeList(this.strategistId);
			this.rows = resp;
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.no-balance-css {
	color: red;
}

.u-td-income {
	
}
.bujie-status {
	color: blue;
	margin-left:5px;
}

.u-td-income> view:nth-child(1) {
	/*width: 30%;*/
}

.u-td-income> view:nth-child(2) {
	/*width: 70%;*/
}

::v-deep u-table>.u-table {
	margin-top: 20px;
}
</style>
