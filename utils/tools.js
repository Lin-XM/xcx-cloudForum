// 获取 image 的网络 URL地址
export function getImageSrc(richText, num = 3) {
	let imageList = [];
	richText.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, (match, capture) => {
		imageList.push(capture);
	});
	imageList = imageList.slice(0, num);
	return imageList;
};
// 获取省份的函数
export function getProvince() {
	return new Promise((resolve, reject) => {
		// localstorage
		let history = uni.getStorageSync("historyProvince");
		if (history) {
			// 一小时重新获取一次
			if ((Date.now() - history.time) > 1000 * 60 * 60) {
				getUserIp().then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			}
			resolve(history)
		} else {
			getUserIp().then(res => {
				resolve(res)
			}).catch(error => {
				reject(error)
			})
		}
	})
};
// 获取发布文章的用户当前IP的地址
export function getUserIp() {
	return new Promise((resolve, reject) => {
		uni.request({
			// 参数 key 为高德地图的开发者key，调用次数每日 5000
			// url:"https://restapi.amap.com/v3/ip?key=545387a4c32ec737e7ec5d0fc9942462&ip=123.13.123.123",
			url: "https://restapi.amap.com/v3/ip?key=545387a4c32ec737e7ec5d0fc9942462",
			success: (res) => {
				if (typeof(res.data.province) !== "string") {
					res.data.province === '火星'
				}
				resolve(res.data)
				let obj = {
					province: res.data.province,
					time: Date.now()
				}
				uni.setStorageSync("historyProvince", obj)
			},
			fail: (error) => {
				reject(error)
			}
		})
	})

}

/// 获取用户昵称
export function getNickname(itemInfo){
	return itemInfo.user_id[0]?.nickname ||   itemInfo.user_id[0]?.username || itemInfo.user_id[0]?.moblie || "请设置名称"
	
}
// 获取头像
export function getAvatar(itemInfo){
	return itemInfo.user_id[0].avatar_file ? itemInfo.user_id[0].avatar_file.url : '../../static/userdefault.png'
}