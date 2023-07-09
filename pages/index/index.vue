<template>
	<view class="home">
		<view class="topNav">
			<u-tabs :list="navList" @click="clickList" :activeStyle="{
		            color: '#333',
		            fontWeight: 'bold',
		            transform: 'scale(1.05)'
		        }" :inactiveStyle="{
		            color: '#888',
		            transform: 'scale(1)'
		        }" lineColor="#2c993a" />
		</view>
		<view class="loadingStatus" v-show="loading">
			<u-skeleton rows="4" title loading avatar></u-skeleton>
		</view>
		<view class="content">
			<view class="item" v-for="(item, index) in dataList" :key="item._id">
				<blogItem :itemInfo="item"></blogItem>
			</view>
		</view>
		<view class="edit">
			<text class="iconfont icon-bianjisekuai" @click="editPages"></text>
		</view>
	</view>
</template>

<script>
	const db = uniCloud.database()
	export default {
		data() {
			return {
				navList: [{
						id: 1,
						name: "最新",
						type: "publishDate"
					},
					{
						id: 2,
						name: "热门",
						type: "view_count"
					}
				],
				tabsActive: 0,
				loading: true,
				dataList: []
			}
		},
		onLoad() {
			this.getArticleData()
		},
		methods: {
			// 获取页面数据
			getArticleData: function() {
				// 主表
				let artTmp = db.collection("xm-article").field(
						'user_id,title,content,publish_date,like_count,view_count,comment_count,descrtion,province,piculs'
					)
					.getTemp()
				// 副表
				let userTmp = db.collection("uni-id-users").field("_id,username,nickname,avatar_file.url").getTemp()
				db.collection(artTmp, userTmp).orderBy(this.navList[this.tabsActive].type, 'desc').get().then(res => {
					this.dataList = res.result.data
					this.loading = false
				})
			},

			// 切换 tabs
			clickList: function(e) {
				this.tabsActive = e.index
				this.dataList = [] 
				this.loading = true
				this.getArticleData()
			},
			editPages: function() {
				uni.navigateTo({
					url: "/pages/edit/edit"
				})
			}
		}
	}
</script>

<style lang="scss">
	.home {
		.topNav {
			margin-bottom: 30rpx;
		}



		.content {
			.item {
				padding: 30rpx 20rpx;
				border-bottom: #f7f7f7 solid 10rpx;
			}
		}

		.loadingStatus {
			padding: 30rpx;
		}

		.edit {
			width: 120rpx;
			height: 120rpx;
			background-color: #2c993a;
			border-radius: 50%;
			color: #f7f7f7;
			position: fixed;
			z-index: 100;
			bottom: 150rpx;
			right: 50rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			box-shadow: 0 0 20rpx rgba(44, 153, 58, 0.6);

			.iconfont {
				font-size: 50rpx;
			}
		}
	}
</style>