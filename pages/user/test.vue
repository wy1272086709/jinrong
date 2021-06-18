<template>
	<view :style="{width, height}">
	<mpvue-echarts height="500px" id="main" ref="mapChart" @onInit="renderLine" :lazyLoad="lazyLoad" />
	</view>
</template>


<script>
	import * as echarts from '@/components/echarts.min.js'; /*chart.min.js为在线定制*/
	import mpvueEcharts from '@/components/echarts.vue';

	export default {
		data() {
			return {
				width: '',
				height: '',
				lazyLoad: false
			}
		},
		onLoad() {
			const info = uni.getSystemInfoSync()
			this.width = info.windowWidth+'px'
			this.height = info.windowHeight+'px'
			//初始化echarts实例
			const options = this.getOption()
			this.options = options
			this.$refs.mapChart.test()
			/*setTimeout(()=> {
				this.lazyLoad = false
			}, 1000)*/
		},
		components: {
			mpvueEcharts
		},
		methods: {
			getOption() {
				 var option = {
				    "color": ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
				    "title": {
				      "text": ""
				    },
				    "tooltip": {
				      "trigger": "axis"
				    },
				    "grid": {
				      "top": 30,
				      "bottom": 50,
				      "right": 15,
				      "left": 40
				    },
				    "legend": {
				      "bottom": "left",
				      "textStyle": {
				        "color": "#FFF"
				      }
				    },
				    "toolbox": {
				      "show": false
				    },
				    "xAxis": [{
				      "type": "category",
				      "axisLabel": {
				        "color": "#666666"
				      },
				      "splitLine": {
				        "show": false
				      },
				      "axisLine": {
				        "lineStyle": {
				          "color": "#CCCCCC",
				          "type": "solid"
				        }
				      },
				      "boundaryGap": true,
				      "data": ["2021-03-25", "2021-03-26", "2021-03-27", "2021-03-28", "2021-03-29", "2021-03-30", "2021-03-31", "2021-04-01", "2021-04-02", "2021-04-03", "2021-04-04", "2021-04-05", "2021-04-06", "2021-04-07", "2021-04-08", "2021-04-09", "2021-04-10", "2021-04-11", "2021-04-12", "2021-04-13", "2021-04-14", "2021-04-15", "2021-04-16", "2021-04-17", "2021-04-18", "2021-04-19", "2021-04-20", "2021-04-21", "2021-04-22", "2021-04-23", "2021-04-24", "2021-04-25", "2021-04-26", "2021-04-27", "2021-04-28", "2021-04-29", "2021-04-30", "2021-05-01", "2021-05-02", "2021-05-03", "2021-05-04", "2021-05-05", "2021-05-06", "2021-05-07", "2021-05-08", "2021-05-09", "2021-05-10", "2021-05-11", "2021-05-12", "2021-05-13", "2021-05-14", "2021-05-15", "2021-05-16", "2021-05-17", "2021-05-18", "2021-05-19", "2021-05-20", "2021-05-21", "2021-05-22", "2021-05-23", "2021-05-24", "2021-05-25", "2021-05-26", "2021-05-27", "2021-05-28", "2021-05-29", "2021-05-30", "2021-05-31", "2021-06-01", "2021-06-02", "2021-06-03", "2021-06-04", "2021-06-05", "2021-06-06", "2021-06-07", "2021-06-08", "2021-06-09", "2021-06-10", "2021-06-11", "2021-06-12", "2021-06-13", "2021-06-14", "2021-06-15", "2021-06-16", "2021-06-17"]
				    }],
				    "yAxis": [{
				      "type": "value",
				      "axisTick": {
				        "show": false
				      },
				      "splitLine": {
				        "show": true,
				        "lineStyle": {
				          "type": "dashed"
				        }
				      },
				      "axisLabel": {
				        "color": "#666666",
				        "textStyle": {
				          "color": "#FFF"
				        },
				        "fontSize": 9,
				        "formatter": "{value}"
				      },
				      "axisLine": {
				        "lineStyle": {
				          "color": "#CCCCCC",
				          "type": "solid"
				        }
				      }
				    }],
				    "seriesTemplate": {
				      "name": "",
				      "type": "bar",
				      "data": [],
				      "barwidth": 20,
				      "label": {
				        "show": false,
				        "color": "#666666",
				        "position": "top"
				      }
				    },
				    "dataZoom": [{
				      "type": "inside",
				      "show": true,
				      "xAxisIndex": [0],
				      "start": 1,
				      "end": 35
				    }],
				    "id": "NQdtTYwbUfaQacybcWrUADxyYjK",
				    "series": [{
				      "name": "收益",
				      "type": "bar",
				      "data": [{
				        "value": "-136.3700",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "-424.7500",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "-202.6300",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "241.9400",
				        "itemStyle": {
				          "color": "#0BF4FD"
				        }
				      }, {
				        "value": "229.0600",
				        "itemStyle": {
				          "color": "#0BF4FD"
				        }
				      }, {
				        "value": "145.0300",
				        "itemStyle": {
				          "color": "#0BF4FD"
				        }
				      }, {
				        "value": "47.2200",
				        "itemStyle": {
				          "color": "#0BF4FD"
				        }
				      }, {
				        "value": "-149.2600",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "-29.5900",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "-116.1900",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "-188.2200",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "0.7600",
				        "itemStyle": {
				          "color": "#0BF4FD"
				        }
				      }, {
				        "value": "14.2000",
				        "itemStyle": {
				          "color": "#0BF4FD"
				        }
				      }, {
				        "value": "-39.1200",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "-710.5700",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "-552.0300",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "2138.4500",
				        "itemStyle": {
				          "color": "#0BF4FD"
				        }
				      }, {
				        "value": "-718.6700",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "408.1200",
				        "itemStyle": {
				          "color": "#0BF4FD"
				        }
				      }, {
				        "value": "3942.1600",
				        "itemStyle": {
				          "color": "#0BF4FD"
				        }
				      }, {
				        "value": "-86.5900",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "-1.1500",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "-3965.1400",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "1447.1000",
				        "itemStyle": {
				          "color": "#0BF4FD"
				        }
				      }, {
				        "value": "9550.3500",
				        "itemStyle": {
				          "color": "#0BF4FD"
				        }
				      }, {
				        "value": "-2307.5100",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "-1968.2700",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "-5467.2800",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "2861.2000",
				        "itemStyle": {
				          "color": "#0BF4FD"
				        }
				      }, {
				        "value": "9917.0600",
				        "itemStyle": {
				          "color": "#0BF4FD"
				        }
				      }, {
				        "value": "-3111.9800",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "-2673.1900",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "1935.7900",
				        "itemStyle": {
				          "color": "#0BF4FD"
				        }
				      }, {
				        "value": "-361.3000",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "-1140.6200",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "-2886.2700",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "-7602.8900",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "1184.5400",
				        "itemStyle": {
				          "color": "#0BF4FD"
				        }
				      }, {
				        "value": "-2931.4100",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "1733.3700",
				        "itemStyle": {
				          "color": "#0BF4FD"
				        }
				      }, {
				        "value": "-2837.7400",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "-17022.0700",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "-3910.7600",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "-8138.2700",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "-1358.4800",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "-1084.4400",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "4126.2200",
				        "itemStyle": {
				          "color": "#0BF4FD"
				        }
				      }, {
				        "value": "-7940.2200",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "-4976.8400",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "38089.0700",
				        "itemStyle": {
				          "color": "#0BF4FD"
				        }
				      }, {
				        "value": "473.2100",
				        "itemStyle": {
				          "color": "#0BF4FD"
				        }
				      }, {
				        "value": "4145.7700",
				        "itemStyle": {
				          "color": "#0BF4FD"
				        }
				      }, {
				        "value": "-1092.5000",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "21924.3100",
				        "itemStyle": {
				          "color": "#0BF4FD"
				        }
				      }, {
				        "value": "-13070.1300",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "47644.5000",
				        "itemStyle": {
				          "color": "#0BF4FD"
				        }
				      }, {
				        "value": "-15026.6100",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "-24813.9300",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "23505.7700",
				        "itemStyle": {
				          "color": "#0BF4FD"
				        }
				      }, {
				        "value": "34150.2200",
				        "itemStyle": {
				          "color": "#0BF4FD"
				        }
				      }, {
				        "value": "-23582.0900",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "24.6100",
				        "itemStyle": {
				          "color": "#0BF4FD"
				        }
				      }, {
				        "value": "-157.1900",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "34.1400",
				        "itemStyle": {
				          "color": "#0BF4FD"
				        }
				      }, {
				        "value": "-14396.4100",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "-6580.1200",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "-18936.2300",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "-55.5100",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "-6751.4700",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "-247.0700",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "4041.9800",
				        "itemStyle": {
				          "color": "#0BF4FD"
				        }
				      }, {
				        "value": "2243.1100",
				        "itemStyle": {
				          "color": "#0BF4FD"
				        }
				      }, {
				        "value": "8358.2000",
				        "itemStyle": {
				          "color": "#0BF4FD"
				        }
				      }, {
				        "value": "2123.1100",
				        "itemStyle": {
				          "color": "#0BF4FD"
				        }
				      }, {
				        "value": "-8970.5300",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "35116.5800",
				        "itemStyle": {
				          "color": "#0BF4FD"
				        }
				      }, {
				        "value": "-1019.3200",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "4855.3400",
				        "itemStyle": {
				          "color": "#0BF4FD"
				        }
				      }, {
				        "value": "54.0100",
				        "itemStyle": {
				          "color": "#0BF4FD"
				        }
				      }, {
				        "value": "-2898.7000",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "-1042.9800",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "15886.7000",
				        "itemStyle": {
				          "color": "#0BF4FD"
				        }
				      }, {
				        "value": "-7239.4700",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": "-16448.0700",
				        "itemStyle": {
				          "color": "#EE4368"
				        }
				      }, {
				        "value": 6.38,
				        "itemStyle": {
				          "color": "#0BF4FD"
				        }
				      }],
				      "barwidth": 20,
				      "label": {
				        "show": false,
				        "color": "#666666",
				        "position": "top"
				      }
				    }]
				  }
				return option
			},
			renderLine(e) {
				let {
					canvas,
					width,
					height
				} = e;
				console.log('renderLine')
				echarts.setCanvasCreator(() => canvas);
				const chart = echarts.init(canvas, null, {
					width: width,
					height: height
				});
				canvas.setChart(chart);
				this.options = this.getOption()
				chart.setOption(this.options)
				
			}
		}
	}
</script>


<style>
	
	
</style>