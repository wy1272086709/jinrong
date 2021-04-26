<template>
	<view class="currency-view-row" hover-stop-propagation :style="customStyle">
		<view v-if="isOneButton" class="currency-view-row-btn" :style="{width:btnWidth}">
			<u-button size="mini" v-if="buttonType=='u-button'">{{buttonText}}</u-button>
			<label v-if="buttonType=='label'">{{buttonText}}</label>
		</view>
		<slot  v-if="!isOneButton" />
		
		
		<easy-select :ref="refProp" size="small" :options="selectOptions" :value="value" @selectOne="selectOneFunc"  v-if="inputType=='select'" @closeOtherSelect="closeOtherSelect"></easy-select>
		
		<u-input placeholder-style="rgba(255,255,255,0.5)" borderColor="#333" :custom-style="styles" class="my-input" :placeholder="inputPlaceHolder"  :type="keyboardType" input-align="center" v-if="inputType=='input'" @input="handleInput" :maxlength="maxlength" :clearable="false" :disabled="disabled" v-model="inputValue" @blur="$emit('blur', inputValue)" @focus="onFocus" />	
		<template v-if="inputType=='custom'">
			<slot />
		</template>
	</view>
</template>

<script>
	import easySelect from '@/components/easy-select.vue';
	export default {
		props: {
			value: {
				type: [ String, Number ],
				default: '',
			},
			inputPropValue: {
				type: [ String, Number ],
				default: ''
			},
			keyboardType: {
				type: String,
				default: 'text',
			},
			maxlength: {
				type: [Number, String],
				default: 8,
			},
			inputType: {
				type: String,
				default: 'select', // 这里有select input 两种选项
			},
			buttonType: {
				type: String,
				default: 'u-button'
			},
			customStyle: {
				type: String,
				default: ''
			},
			disabled: {
				type: Boolean,
				default: false,
			},
			selectOptions: {
				type: Array,
				default() {
					return [ ];
				}
			},
			selectWidth: {
				type: String,
				default: '',
			},
			btnWidth: {
				type: [Number, String],
				default() {
					return '50%';
				}
			},
			// 按钮上的文本
			buttonText: {
				type: String,
				default: ''
			},
			refProp: {
				type: String,
				default: ''
			},
			// 是否一个按钮
			isOneButton: {
				type: Boolean,
				default: true,
			},
			
			inputPlaceHolder: {
				type: String,
				default: '请输入价格'
			}
		},
		components:{
			easySelect
		},
		data() {
			return {
				inputValue: this.inputPropValue
			};
		},
		computed: {
			styles() {
				const style = {color:'#B1B7BC', 'border-radius':'10rpx', border: '1px solid rgba(255,255,255,0.2)',width:'470rpx', height: '50rpx', 'min-height': '50rpx',textAlign:'left',paddingLeft:'20rpx', boxSizing: 'border-box'}
				if (this.disabled)
					style.backgroundColor = 'rgba(255,255,255,0.5)';
				else
					style.backgroundColor = 'rgba(103,109,129,0.2)';
				return style
			}
		},
		watch: {
			inputPropValue(n, o) {
				this.inputValue = n;
			}
		},
		methods:{
			onFocus() {
				this.$emit("focus")
			},
			selectOneFunc(data) {
				this.$emit('selectOne', data)
			},
			handleInput(v) {
				this.$emit('input', v);
			},
			click() {
				console.log('focus')
				//this.$emit('closeOtherSelect');
			},
			closeSelect() {
				// 调用子元素的方法
				const ref = this.refProp;
				this.$refs[ref].hideOptions();
			},
			hideOptions() {
				const ref = this.refProp;
				this.$refs[ref].hideOptions();
			},
			closeOtherSelect() {
				console.log('single_select_row+closeOtherSelect');
				const refVal = this.refProp;
				this.$emit('closeOtherSelect');
			}
		}
	}
</script>

<style lang="scss">

.currency-view-row {
	display: flex;
	margin-top:10rpx;
	text-align: center;
	padding-left: 32rpx;
	padding-right: 32rpx;
	align-items: center;
	/*height: 54rpx;*/
	color: #b1b7bc;
	/*justify-content: space-between;*/
	&-btn {
		display: flex;
		
	}
}
</style>
