/*
 * uCharts®
 * 高性能跨平台图表库，支持H5、APP、小程序（微信/支付宝/百度/头条/QQ/360）、Vue、Taro等支持canvas的框架平台
 * Copyright (c) 2021 QIUN®秋云 https://www.ucharts.cn All rights reserved.
 * Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
 * 复制使用请保留本段注释，感谢支持开源！
 * 
 * uCharts®官方网站
 * https://www.uCharts.cn
 * 
 * 开源地址:
 * https://gitee.com/uCharts/uCharts
 * 
 * uni-app插件市场地址：
 * http://ext.dcloud.net.cn/plugin?id=271
 * 
 */

// 主题颜色配置：如每个图表类型需要不同主题，请在对应图表类型上更改color属性
const color = ['#1890FF', '#91CB74', '#FAC858', '#EE6666', '#73C0DE', '#3CA272', '#FC8452', '#9A60B4', '#ea7ccc'];

const formatDateTime = (timeStamp, returnType)=>{
  var date = new Date();
  date.setTime(timeStamp * 1000);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  if(returntype =='m-d') {return  m+'-'+d;}
  if(returnType == 'full'){return y + '-' + m + '-' + d + ' '+ h +':' + minute + ':' + second;}
  if(returnType == 'y-m-d'){return y + '-' + m + '-' + d;}
  if(returnType == 'h:m'){return  h +':' + minute;}
  if(returnType == 'h:m:s'){return  h +':' + minute +':' + second;}
  return [y, m, d, h, minute, second];
}
module.exports = {
  //demotype为自定义图表类型
	"type":["pie","ring","rose","word","funnel","map","arcbar","line","column","area","radar","gauge","candle","mix","demotype","line1","column1","line2","column4","line3"],
	"range":["饼状图","圆环图","玫瑰图","词云图","漏斗图","地图","圆弧进度条","折线图","柱状图","区域图","雷达图","仪表盘","K线图","混合图","自定义类型","自定义柱状图","自定义折线图","column4","line3"],
  //增加自定义图表类型，如果需要categories，请在这里加入您的图表类型例如最后的"demotype"
	"categories":["line","column","area","radar","gauge","candle","mix","demotype","line1","column1","line2","column4","line3"],
  //instance为实例变量承载属性，option为eopts承载属性，不要删除
  "instance":{},
  "option":{},
  //下面是自定义format配置，因除H5端外的其他端无法通过props传递函数，只能通过此属性对应下标的方式来替换
  "formatter":{
    "yAxisDemo1":function(val){return val+'%'},
    "yAxisDemo2":function(val){return val.toFixed(2)},
    "seriesDemo1":function(val){
      return val+'元'
    },
	"seriesTips":function(val){
		if(val < 0){
			return '-'+ val;
		}
	},
    "tooltipDemo1":function(item, category, index, opts){
      if(index==0){
      	return '随便用'+item.data+'年'
      }else{
      	return '其他我没改'+item.data+'天'
      }
    },
	"tooltips":function(item,category){
		return category + ' 累计收益率' + item.data+'%'
	},
    "pieDemo":function(val, index, series){
      if(index !== undefined){
        return series[index].name+'：'+series[index].data+'元'
      }
    },
  },
  //这里演示了自定义您的图表类型的option，可以随意命名，之后在组件上 type="demotype" 后，组件会调用这个花括号里的option，如果组件上还存在opts参数，会将demotype与opts中option合并后渲染图表。
  "demotype":{
    //我这里把曲线图当做了自定义图表类型，您可以根据需要随意指定类型或配置
    "type": "line",
    "color": color,
    "padding": [15,10,0,15],
    "xAxis": {
      "disableGrid": true,
    },
    "yAxis": {
      "gridType": "dash",
      "dashLength": 2,
    },
    "legend": {
    },
    "extra": {
    	"line": {
    		"type": "curve",
    		"width": 2
    	},
    }
  },
  "line3":{
      "type": "area",
      "canvasId": "MCScEZfB5JkHmwLAOBSANGpfoHaViPSx",
      "canvas2d": true,
      "background": "#4D5269",
      "animation": true,
      "timing": "easeOut",
      "duration": 1000,
      "color": [
          "#1890FF",
          "#91CB74",
          "#FAC858",
          "#EE6666",
          "#73C0DE",
          "#3CA272",
          "#FC8452",
          "#9A60B4",
          "#ea7ccc"
      ],
      "padding": [
          15,
          15,
          0,
          15
      ],
      "rotate": false,
      "errorReload": true,
      "fontSize": 10,
      "fontColor": "#ffffff",
      "enableScroll": false,
      "touchMoveLimit": 60,
      "enableMarkLine": false,
      "dataLabel": false,
      "dataPointShape": false,
      "dataPointShapeType": "solid",
      "xAxis": {
          "disabled": false,
          "axisLine": true,
          "axisLineColor": "#CCCCCC",
          "calibration": false,
          "fontColor": "#fff",
          "fontSize": 10,
          "rotateLabel": false,
          "labelCount": 3,
          "itemCount": 0,
          "boundaryGap": "center",
          "disableGrid": true,
          "gridColor": "#CCCCCC",
          "gridType": "solid",
          "dashLength": 4,
          "gridEval": 1,
          "scrollShow": false,
          "scrollAlign": "left",
          "scrollColor": "#A6A6A6",
          "scrollBackgroundColor": "#EFEBEF",
          "format": ""
      },
      "yAxis": {
          "disabled": false,
          "disableGrid": false,
          "splitNumber": 5,
          "gridType": "dash",
          "dashLength": 2,
          "gridColor": "#CCCCCC",
          "padding": 10,
          "showTitle": false,
          "data": []
      },
      "legend": {
          "show": false,
          "position": "bottom",
          "float": "center",
          "padding": 5,
          "margin": 5,
          "backgroundColor": "rgba(0,0,0,0)",
          "borderColor": "rgba(0,0,0,0)",
          "borderWidth": 0,
          "fontSize": 13,
          "fontColor": "#666666",
          "lineHeight": 11,
          "hiddenColor": "#CECECE",
          "itemGap": 10
      },
      "extra": {
          "area": {
              "type": "straight",
              "opacity": 0.2,
              "addLine": true,
              "width": 2,
              "gradient": false
          },
          "tooltip": {
              "showBox": true,
              "showArrow": true,
              "showCategory": false,
              "borderWidth": 0,
              "borderRadius": 0,
              "borderColor": "#000000",
              "borderOpacity": 0.7,
              "bgColor": "#000000",
              "bgOpacity": 0.7,
              "gridType": "solid",
              "dashLength": 4,
              "gridColor": "#CCCCCC",
              "fontColor": "#FFFFFF",
              "splitLine": true,
              "horizentalLine": false,
              "xAxisLabel": false,
              "yAxisLabel": false,
              "labelBgColor": "#FFFFFF",
              "labelBgOpacity": 0.7,
              "labelFontColor": "#666666"
          },
          "markLine": {
              "type": "solid",
              "dashLength": 4,
              "data": []
          }
      }
  },
  "column4":{
      "type": "column",
     
      "canvas2d": true,
	  "canvasId": "aF2d6ejUMpFr00Z9c1dREg7xaUup0Mpu",
      "background": "#666",
      "animation": true,
      "timing": "easeOut",
      "duration": 1000,
      "color": [
          "#1890FF",
          "#91CB74",
          "#FAC858",
          "#EE6666",
          "#73C0DE",
          "#3CA272",
          "#FC8452",
          "#9A60B4",
          "#ea7ccc"
      ],
      "padding": [
          10,
          10,
          10,
          10
      ],
      "rotate": false,
      "errorReload": true,
      "fontSize": 10,
      "fontColor": "#fff",
      "enableScroll": false,
      "touchMoveLimit": 60,
      "enableMarkLine": false,
      "dataLabel": false,
      "dataPointShape": false,
      "dataPointShapeType": "solid",
      "xAxis": {
          "disabled": false,
          "axisLine": true,
          "axisLineColor": "#CCCCCC",
          "calibration": false,
          "fontColor": "#fff",
          "fontSize": 10,
          "rotateLabel": false,
          "labelCount": 3,
          "itemCount": 0,
          "boundaryGap": "center",
          "disableGrid": true,
          "gridColor": "#CCCCCC",
          "gridType": "solid",
          "dashLength": 4,
          "gridEval": 1,
          "scrollShow": false,
          "scrollAlign": "left",
          "scrollColor": "#A6A6A6",
          "scrollBackgroundColor": "#EFEBEF",
          "format": ""
      },
      "yAxis": {
          "disabled": false,
          "disableGrid": false,
          "splitNumber": 5,
          "gridType": "dash",
          "dashLength": 2,
          "gridColor": "#CCCCCC",
          "padding": 10,
          "showTitle": false,
          "data": []
      },
      "legend": {
          "show": false,
          "position": "bottom",
          "float": "center",
          "padding": 5,
          "margin": 5,
          "backgroundColor": "rgba(0,0,0,0)",
          "borderColor": "rgba(0,0,0,0)",
          "borderWidth": 0,
          "fontSize": 13,
          "fontColor": "#666666",
          "lineHeight": 11,
          "hiddenColor": "#CECECE",
          "itemGap": 10
      },
      "extra": {
          "column": {
              "type": "group",
              "width": 10,
              "seriesGap": 2,
              "categoryGap": 3,
              "barBorderCircle": false,
              "linearType": "none",
              "linearOpacity": 1,
              "colorStop": 0,
              "meterBorder": 1,
              "meterFillColor": "#FFFFFF",
              "activeBgColor": "#fff",
              "activeBgOpacity": 0.1,
              "meterBorde": 1
          },
          "tooltip": {
              "showBox": true,
              "showArrow": true,
              "showCategory": false,
              "borderWidth": 0,
              "borderRadius": 0,
              "borderColor": "#000",
              "borderOpacity": 0.7,
              "bgColor": "#000",
              "bgOpacity": 0.7,
              "gridType": "solid",
              "dashLength": 4,
              "gridColor": "#CCCCCC",
              "fontColor": "#FFFFFF",
              "splitLine": true,
              "horizentalLine": false,
              "xAxisLabel": false,
              "yAxisLabel": false,
              "labelBgColor": "#FFFFFF",
              "labelBgOpacity": 0.7,
              "labelFontColor": "#666666"
          },
          "markLine": {
              "type": "solid",
              "dashLength": 4,
              "data": []
          }
      }
  },
  "column1":{
      "type": "column",
      "canvasId": "NQdtTYwbUfaQacybcWrUADxyYjK",
      "canvas2d": true,
      "background": "#333",
      "animation": true,
      "timing": "easeOut",
      "duration": 1000,
      "color": [
          "#1890FF",
          "#91CB74",
          "#FAC858",
          "#EE6666",
          "#73C0DE",
          "#3CA272",
          "#FC8452",
          "#9A60B4",
          "#ea7ccc"
      ],
      "padding": [
          15,
          20,
          20,
          20
      ],
      "rotate": false,
      "reserve": false,
      "fontSize": 13,
      "fontColor": "#fff",
      "enableScroll": false,
	  "enableMarkLine": false,
      "touchMoveLimit": 60,
      "dataLabel": false,
      "dataPointShape": true,
      "dataPointShapeType": "solid",
      "xAxis": {
          "disabled": false,
          "axisLine": true,
          "axisLineColor": "#ccc",
          "calibration": false,
          "fontColor": "#fff",
          "fontSize": 10,
          "rotateLabel": false,
		  "labelCount": 4,
          //"itemCount": 30,
          "boundaryGap": "center",
          "disableGrid": true,
          "gridColor": "#CCCCCC",
          "gridType": "solid",
          "dashLength": 4,
          "gridEval": 1,
          "scrollShow": false,
          "scrollAlign": "left",
          "scrollColor": "#A6A6A6",
          "scrollBackgroundColor": "#EFEBEF"
      },
      "yAxis": {
          "disabled": false,
          "disableGrid": false,
          "splitNumber": 5,
          "gridType": "dash",
          "dashLength": 8,
          "gridColor": "#CCCCCC",
          "padding": 10,
          "showTitle": false,
          "data": []
      },
      "legend": {
          "show": true,
          "position": "bottom",
          "float": "center",
          "padding": 5,
          "margin": 5,
          "backgroundColor": "rgba(0,0,0,0)",
          "borderColor": "rgba(0,0,0,0)",
          "borderWidth": 0,
          "fontSize": 13,
          "fontColor": "#666666",
          "lineHeight": 11,
          "hiddenColor": "#CECECE",
          "itemGap": 10
      },
      "extra": {
          "column": {
              "type": "group",
              "width": 10,
              "seriesGap": 2,
              "categoryGap": 3,
              "barBorderCircle": false,
              "linearType": "opacity",
              "linearOpacity": 1,
              "colorStop": 0,
              "meterBorder": 1,
              "meterFillColor": "#FFFFFF",
              "activeBgColor": "#ff0000",
              "activeBgOpacity": 0.08,
              "meterBorde": 1
          },
          "tooltip": {
              "showBox": true,
              "showArrow": true,
              "borderWidth": 0,
              "borderRadius": 0,
              "borderColor": "#000000",
              "borderOpacity": 0.7,
              "bgColor": "#000000",
              "bgOpacity": 0.7,
              "gridType": "solid",
              "dashLength": 4,
              "gridColor": "#CCCCCC",
              "fontColor": "#FFFFFF",
              "splitLine": true,
              "horizentalLine": false,
              "xAxisLabel": false,
              "yAxisLabel": false,
              "labelBgColor": "#FFFFFF",
              "labelBgOpacity": 0.7,
              "labelFontColor": "#666666"
          },
          "markLine": {
			  "type": "dash",
			  "dashLength": 20,
			  "data": [
				  // // {
					 // //  "value": 0,
					 // //  "lineColor": "#ffffff",
					 // //  "showLabel": true,
					 // //  "labelFontColor": "#ffffff",
					 // //  "labelBgColor": "#333333",
					 // //  "labelBgOpacity": 0,
					 // //  "yAxisIndex": 0
				  // }
			  ]
		  }
      }
  },
  "line2":{
      "type": "line",
      "canvasId": "MCScEZfB5JkHmwLAOBSANGpfoHaViPSx",
      "canvas2d": true,
      "background": "#333333",
      "animation": true,
      "timing": "easeOut",
      "duration": 1000,
      "color": [
          "#1890FF",
          "#91CB74",
          "#FAC858",
          "#EE6666",
          "#73C0DE",
          "#3CA272",
          "#FC8452",
          "#9A60B4",
          "#ea7ccc"
      ],
      "padding": [
          15,
          10,
          0,
          15
      ],
      "rotate": false,
      "reserve": false,
      "fontSize": 13,
      "fontColor": "#fff",
      "enableScroll": false,
      "touchMoveLimit": 60,
      "enableMarkLine": true,
      "dataLabel": false,
      "dataPointShape": false,
      "dataPointShapeType": "hollow",
      "xAxis": {
          "disabled": false,
          "axisLine": true,
          "axisLineColor": "#CCCCCC",
          "calibration": false,
          "fontColor": "#fff",
          "fontSize": 10,
          "rotateLabel": false,
          "labelCount": 3,
          "itemCount": 30,
          "boundaryGap": "center",
          "disableGrid": true,
          "gridColor": "#CCCCCC",
          "gridType": "solid",
          "dashLength": 4,
          "gridEval": 1,
          "scrollShow": false,
          "scrollAlign": "left",
          "scrollColor": "#A6A6A6",
          "scrollBackgroundColor": "#EFEBEF"
      },
      "yAxis": {
          "disabled": false,
          "disableGrid": false,
          "splitNumber": 5,
          "gridType": "dash",
          "dashLength": 8,
          "gridColor": "#CCCCCC",
          "padding": 10,
          "showTitle": false,
          "data": []
      },
      "legend": {
          "show": true,
          "position": "bottom",
          "float": "center",
          "padding": 5,
          "margin": 5,
          "backgroundColor": "rgba(0,0,0,0)",
          "borderColor": "rgba(0,0,0,0)",
          "borderWidth": 0,
          "fontSize": 13,
          "fontColor": "#666666",
          "lineHeight": 11,
          "hiddenColor": "#CECECE",
          "itemGap": 10
      },
      "extra": {
          "line": {
              "type": "straight",
              "width": 2
          },
          "tooltip": {
              "showBox": true,
              "showArrow": true,
              "borderWidth": 0,
              "borderRadius": 0,
              "borderColor": "#000000",
              "borderOpacity": 0.7,
              "bgColor": "#000000",
              "bgOpacity": 0.7,
              "gridType": "solid",
              "dashLength": 4,
              "gridColor": "#CCCCCC",
              "fontColor": "#FFFFFF",
              "splitLine": true,
              "horizentalLine": false,
              "xAxisLabel": false,
              "yAxisLabel": false,
              "labelBgColor": "#FFFFFF",
              "labelBgOpacity": 0.7,
              "labelFontColor": "#666666"
          },
          "markLine": {
              "type": "dash",
              "dashLength": 8,
              "data": [				
				   {
					  "value": 0,
					  "lineColor": "rgba(255,255,255,0.5)",
					  "showLabel": false,
					  "labelFontColor": "#ffffff",
					  "labelBgColor": "#333333",
					  "labelBgOpacity": 0,
					  "yAxisIndex": 0
				  }]
          }
      }
  },
  //下面是自定义配置，请添加项目所需的通用配置
    "line1":{
      "type": "line",
      "canvasId": "NQdtTY3wbUf7aQ8acybcWrU9ADxyYj3K",
      "canvas2d": true,
      "background": "#333",
      "animation": true,
      "timing": "easeOut",
      "duration": 1000,
      "color": [
          "#1890FF",
          // "#91CB74",
          // "#FAC858",
          "#EE6666",
          // "#73C0DE",
          // "#3CA272",
          // "#FC8452",
          // "#9A60B4",
          // "#ea7ccc"
      ],
      "padding": [
          15,
          10,
          0,
          0
      ],
      "rotate": false,
      "rotateLock": false,
      "fontSize": 13,
      "fontColor": "#666666",
      "touchMoveLimit": 60,
      "enableMarkLine": true,
      "dataLabel": false,
      "dataPointShape": false,
      "dataPointShapeType": "solid",
      "xAxis": {
          "disabled": true,
          "axisLine": true,
          "axisLineColor": "#CCCCCC",
          "calibration": false,
          "fontColor": "#666666",
          "fontSize": 13,
          "rotateLabel": false,
          "itemCount": 5,
          "boundaryGap": "center",
          "disableGrid": true,
          "gridColor": "#CCCCCC",
          "gridType": "solid",
          "dashLength": 4,
          "gridEval": 1,
          "scrollShow": true,
          "scrollAlign": "left",
          "scrollColor": "#A6A6A6",
          "scrollBackgroundColor": "#EFEBEF"
      },
      "yAxis": {
          "disabled": false,
          "disableGrid": false,
          "splitNumber": 5,
          "gridType": "dash",
          "dashLength": 2,
          "gridColor": "#CCCCCC",
          "padding": 10,
          "showTitle": false,
          "data": []
      },
      "legend": {
          "show": true,
          "position": "bottom",
          "float": "center",
          "padding": 5,
          "margin": 5,
          "backgroundColor": "rgba(0,0,0,0)",
          "borderColor": "rgba(0,0,0,0)",
          "borderWidth": 0,
          "fontSize": 13,
          "fontColor": "#666666",
          "lineHeight": 11,
          "hiddenColor": "#CECECE",
          "itemGap": 10
      },
      "extra": {
          "line": {
              "type": "curve",
              "width": 3
          },
          "tooltip": {
              "showBox": true,
              "showArrow": true,
              "borderWidth": 0,
              "borderRadius": 0,
              "borderColor": "#000000",
              "borderOpacity": 0.7,
              "bgColor": "#000000",
              "bgOpacity": 0.7,
              "gridType": "solid",
              "dashLength": 4,
              "gridColor": "#CCCCCC",
              "fontColor": "#FFFFFF",
              "splitLine": true,
              "horizentalLine": false,
              "xAxisLabel": true,
              "yAxisLabel": false,
              "labelBgColor": "#333333",
              "labelBgOpacity": 0.7,
              "labelFontColor": "#666666"
          },
          "markLine": {
              "type": "solid",
              "dashLength": 4,
              "data": []
          }
      }
  },
	"pie":{
		"type": "pie",
    "color": color,
		"padding": [5,5,5,5],
		"extra": {
			"pie": {
				"activeOpacity": 0.5,
				"activeRadius": 10,
				"offsetAngle": 0,
				"labelWidth": 15,
				"border": true,
				"borderWidth": 3,
				"borderColor": "#FFFFFF"
			},
		}
	},
	"ring":{
		"type": "ring",
    "color": color,
		"padding": [5,5,5,5],
		"rotate": false,
		"dataLabel": true,
		"legend": {
			"show": true,
			"position": "right",
      "lineHeight": 25,
		},
		"title": {
			"name": "收益率",
			"fontSize": 15,
			"color": "#666666"
		},
		"subtitle": {
			"name": "70%",
			"fontSize": 25,
			"color": "#7cb5ec"
		},
		"extra": {
			"ring": {
				"ringWidth":30,
				"activeOpacity": 0.5,
				"activeRadius": 10,
				"offsetAngle": 0,
				"labelWidth": 15,
				"border": true,
				"borderWidth": 3,
				"borderColor": "#FFFFFF"
			},
		},
	},
	"rose":{
		"type": "rose",
    "color": color,
		"padding": [5,5,5,5],
		"legend": {
			"show": true,
			"position": "left",
      "lineHeight": 25,
		},
		"extra": {
			"rose": {
				"type": "area",
				"minRadius": 50,
				"activeOpacity": 0.5,
				"activeRadius": 10,
				"offsetAngle": 0,
				"labelWidth": 15,
				"border": false,
				"borderWidth": 2,
				"borderColor": "#FFFFFF"
			},
		}
	},
	"word":{
		"type": "word",
    "color": color,
		"extra": {
			"word": {
				"type": "normal",
				"autoColors": false
			}
		}
	},
	"funnel":{
		"type": "funnel",
    "color": color,
		"padding": [15,15,0,15],
		"extra": {
			"funnel": {
				"activeOpacity": 0.3,
				"activeWidth": 10,
				"border": true,
				"borderWidth": 2,
				"borderColor": "#FFFFFF",
				"fillOpacity": 1,
				"labelAlign": "right"
			},
		}
	},
	"map":{
		"type": "map",
    "color": color,
		"padding": [0,0,0,0],
    "dataLabel": true,
		"extra": {
			"map": {
				"border": true,
				"borderWidth": 1,
				"borderColor": "#666666",
				"fillOpacity": 0.6,
				"activeBorderColor": "#F04864",
				"activeFillColor": "#FACC14",
				"activeFillOpacity": 1
			},
		}
	},
	"arcbar":{
		"type": "arcbar",
    "color": color,
		"title": {
			"name": "百分比",
			"fontSize": 25,
			"color": "#00FF00"
		},
		"subtitle": {
			"name": "默认标题",
			"fontSize": 15,
			"color": "#666666"
		},
		"extra": {
			"arcbar": {
				"type": "default",
				"width": 12,
				"backgroundColor": "#E9E9E9",
				"startAngle": 0.75,
				"endAngle": 0.25,
				"gap": 2
			}
		}
	},
	"line":{
		"type": "line",
    "color": color,
		"padding": [15,10,0,15],
		"xAxis": {
      "disableGrid": true,
		},
		"yAxis": {
      "gridType": "dash",
      "dashLength": 2,
		},
		"legend": {
		},
		"extra": {
			"line": {
				"type": "straight",
				"width": 2
			},
		}
	},
	"column":{
		"type": "column",
    "color": color,
		"padding": [15,15,0,5],
		"xAxis": {
      "disableGrid": true,
		},
		"yAxis": {
		},
		"legend": {
		},
		"extra": {
			"column": {
				"type": "group",
				"width": 30,
				"meterBorde": 1,
				"meterFillColor": "#FFFFFF",
				"activeBgColor": "#000000",
				"activeBgOpacity": 0.08
			},
		}
	},
	"area":{
		"type": "area",
		"color": color,
		"padding": [15,15,0,15],
		"xAxis": {
      "disableGrid": true,
		},
		"yAxis": {
      "gridType": "dash",
      "dashLength": 2,
		},
		"legend": {
		},
		"extra": {
			"area": {
				"type": "straight",
				"opacity": 0.2,
				"addLine": true,
				"width": 2,
				"gradient": false
			},
		}
	},
	"radar":{
		"type": "radar",
		"color": color,
		"padding": [5,5,5,5],
		"legend": {
			"show": true,
			"position": "right",
      "lineHeight": 25,
		},
		"extra": {
			"radar": {
				"gridType": "radar",
				"gridColor": "#CCCCCC",
				"gridCount": 3,
				"opacity": 0.2,
				"labelColor": "#666666",
				"max": 200
			},
		}
	},
	"gauge":{
		"type": "gauge",
		"color": color,
		"title": {
			"name": "66Km/H",
			"fontSize": 25,
			"color": "#2fc25b",
			"offsetY": 50
		},
		"subtitle": {
			"name": "实时速度",
			"fontSize": 15,
			"color": "#1890ff",
			"offsetY": -50
		},
		"extra": {
			"gauge": {
				"type": "default",
				"width": 30,
				"labelColor": "#666666",
				"startAngle": 0.75,
				"endAngle": 0.25,
				"startNumber": 0,
				"endNumber": 100,
				"labelFormat": "",
				"splitLine": {
					"fixRadius": 0,
					"splitNumber": 10,
					"width": 30,
					"color": "#FFFFFF",
					"childNumber": 5,
					"childWidth": 12
				},
				"pointer": {
					"width": 24,
					"color": "auto"
				}
			}
		}
	},
	"candle":{
		"type": "candle",
		"color": color,
		"padding": [15,15,0,15],
		"enableScroll": true,
		"enableMarkLine": true,
		"dataLabel": false,
		"xAxis": {
			"labelCount": 4,
			"itemCount": 40,
			"disableGrid": true,
			"gridColor": "#CCCCCC",
			"gridType": "solid",
			"dashLength": 4,
			"scrollShow": true,
			"scrollAlign": "left",
			"scrollColor": "#A6A6A6",
			"scrollBackgroundColor": "#EFEBEF"
		},
		"yAxis": {
		},
		"legend": {
		},
		"extra": {
			"candle": {
				"color": {
					"upLine": "#f04864",
					"upFill": "#f04864",
					"downLine": "#2fc25b",
					"downFill": "#2fc25b"
				},
				"average": {
					"show": true,
					"name": ["MA5","MA10","MA30"],
					"day": [5,10,20],
					"color": ["#1890ff","#2fc25b","#facc14"]
				}
			},
			"markLine": {
				"type": "dash",
				"dashLength": 5,
				"data": [
					{
						"value": 2150,
						"lineColor": "#f04864",
						"showLabel": true
					},
					{
						"value": 2350,
						"lineColor": "#f04864",
						"showLabel": true
					}
				]
			}
		}
	},
	"mix":{
		"type": "mix",
		"color": color,
		"padding": [15,15,0,15],
		"xAxis": {
      "disableGrid": true,
		},
		"yAxis": {
			"disabled": false,
			"disableGrid": false,
			"splitNumber": 5,
			"gridType": "dash",
			"dashLength": 4,
			"gridColor": "#CCCCCC",
			"padding": 10,
			"showTitle": true,
			"data": []
		},
		"legend": {
		},
		"extra": {
			"mix": {
				"column": {
					"width": 20
				}
			},
		}
	},
	"point":{
		"type": "point",
		"color":color,
		"padding":[15,15,0,15],
	},
	"bubble":{
		"type": "bubble",
		"color":color,
		"padding":[15,15,0,15],
	}
}