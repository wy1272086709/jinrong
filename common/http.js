class http {
	static request(url, params = {}, method = "POST", contentType = "application/x-www-form-urlencoded") {
		return new Promise((resolve, reject) => {
				uni.request({
					url:url, //仅为示例，并非真实接口地址。
					data: params,
					header: {
						'Content-Type': contentType
					},
					method:method,
					success: (res) => {
						if (!params.filterData ) {
							resolve(res.data.data);
						} else if(params.filterData===1){
							//console.log('common res:'+JSON.stringify(res))
							resolve(res.data)
						} else if(params.filterData){
							resolve(res.data);
						}
					}
				});
			});
	}
}

export default http