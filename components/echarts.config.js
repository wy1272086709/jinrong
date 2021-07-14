export var commonConfig =  {
	color: [
		"#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", 
		"#9A60B4", "#ea7ccc"
	],
    title: {
      text: ""
    },
    tooltip: {
		trigger: "item",
		position: ['50%', '0.5%']
    },
    grid: {
      top: 30,
      bottom: 50,
      right: 15,
      left: 40
    },
    legend: {
		
      bottom: "left",
      textStyle: {
        color: "#FFF"
      }
    },
    toolbox: {
      show: true,
	  y: 'bottom'
    },
    xAxis: [{
      type: "category",
      axisLabel: {
        color: "#666666"
      },
      splitLine: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: "#CCCCCC",
          type: "solid"
        }
      },
      boundaryGap: true,
	  data: [],
	}],
	yAxis: [{
		type: "value",
		axisTick: {
		  show: false
		},
		splitLine: {
		  show: true,
		  lineStyle: {
			type: "dashed"
		  }
		},
	   axisLabel: {
		  color: "#666666",
		  textStyle: {
			"color": "#FFF"
		  },
		  fontSize: 9,
		  formatter: "{value}"
		},
		axisLine: {
		  lineStyle: {
			color: "#CCCCCC",
			type: "solid"
		  }
		}
	  }],
	  seriesTemplate: {
		name: "",
		type: "bar",
		data: [],
		barwidth: 20,
		label: {
		  show: false,
		  color: "#666666",
		  position: "top"
		}
	  },
	  dataZoom: [{
		type: "inside",
		show: true,
		xAxisIndex: [0],
		start: 1,
		end: 35
	  }],
	  id: "NQdtTYwbUfaQacybcWrUADxyYjK",
	  series: [{
		name: "收益",
		type: "bar",
		data: [],
		barwidth: 20,
		label: {
		  show: false,
		  color: "#666666",
		  position: "top"
		}
	  }],		
}

// 折线图配置
export var lineConfig = {
	　	tooltip: {
			trigger: "item",
			showDelay: 0,//显示延时，添加显示延时可以避免频繁切换
			hideDelay: 50,//隐藏延时
			axisPointer: { // 坐标轴指示器配置项。
				type: 'cross', // 'line' 直线指示器  'shadow' 阴影指示器  'none' 无指示
				crossStyle: {
				  color: '#fff',
				  shadowColor: 'rgba(0, 0, 0, 0.5)',
				  opacity: 0.2,
				}
			},
			position: [ '50%', '5%'],
			formatter: function(params) {
				for(let x in params) {
				    return params[x].name +":"+params[x].data.value+"/"+params[x].data.date;
				}
			}
　　　　},
		toolbox: {
			show: true,
			y: 'bottom'
		},
　　　　legend: {　　//代表折线图上方的小标题
　　　　　　data:['累计收益'],
			show: false,
　　　　},
　　　　grid: {
　　　　　　top: 30,
			bottom: 50,
			right: 15,
			left: 40
　　　　},
　　　　xAxis: [
			{
	　　　　　　type: 'category',
	　　　　　　boundaryGap: false,
				splitLine: {
				  show: false
				},
				axisLine: {
				  lineStyle: {
				    color: "#CCCCCC",
				    type: "solid"
				  }
				},
	　　　　　　data: [],//x轴 我显示的是最近7天日期
			}
		],
　　　　yAxis: [{
　　　　　　type: 'value',
			splitLine: {
			  show: false
			},
			axisTick: {
			  show: false
			},
			axisLabel: {
			  color: "#666666",
			  textStyle: {
				color: "#FFF"
			  },
			  fontSize: 8,
			  formatter: "{value}"
			},
			axisLine: {
			  lineStyle: {
				color: "#CCCCCC",
				type: "solid"
			  }
			}
　　　　}],
　　　　dataZoom: [{
			type: "inside",
　　　　　　show: true,
　　　　　　start: 0,
　　　　　　end: 35
　　　　}],
　　　　//每一个series中的{}中数据代表一条折线
　　　　series: [{
			showSymbol: false,
			symbolSize: 4,
			emphasis: {
				borderColor: '#ed3f5d',
				borderWidth: 4
			},
　　　　　　name:'累计收益',
　　　　　　type:'line',
　　　　　　smooth: true,
　　　　　　data:[]
　　　　}]
}