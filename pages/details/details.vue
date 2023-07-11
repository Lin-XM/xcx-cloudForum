<template>
	<view class="detailWrapper">
		<view class="container">
			<view v-if="loadingStatus">
				<u-skeleton rows="4" title loading avatar></u-skeleton>
			</view>
			<view v-else>
				<view class="title">{{data.title}}</view>
				<view class="userinfo">
					<view class="avatar">
						<image
							:src="data.user_id[0].avatar_file ? data.user_id[0].avatar_file.url  : '../../static/userdefault.png'"
							mode="aspectFill"></image>
					</view>
					<view class="text">
						<view class="name">
							{{data.user_id[0].nickname ? data.user_id[0].nickname : data.user_id[0].username }}
						</view>
						<view class="small">
							<uni-dateformat :date="data.publish_date" :threshold="[60000,360000*24*30]"
								format="yyyy年MM月dd hh:mm:ss" />
							发布于{{data.province ? data.province : "火星"}}
						</view>
					</view>
				</view>
				<view class="content">
					<u-parse :content="data.content" :selectable="true" :style="tagStyle"></u-parse>
				</view>
				<view class="like">
					<view class="btn">
						<text class="iconfont icon-zan"></text>
						<text v-show="data.like_count != 0">{{data.like_count}}</text>
					</view>
					<view class="users">
						<image src="../../static/userdefault.png" mode="aspectFill"></image>
					</view>
					<view class="text"><text class="num">{{data.view_count}}</text>人看过</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const db = uniCloud.database()
	let timer = null
	export default {
		data() {
			return {
				artId: null,
				tagStyle: {
					p: "line-height:1.7rem;font-size:16rpx;padding-bottom:12rpx",
					img: "margin:10rpx 0 "
				},
				loadingStatus: true,
				data: {
					title: '',
					user_id: [],
					publish_date: undefined,
					province: '',
					content: '',
					view_count: 0,
					like_count: 0,
				}
			};
		},
		onLoad: function(e) {
			this.artId = e.id
			if (e.id) {
				this.getDataDetail()
			} else {
				this.errFunc()
			}

		},
		onUnload: function() {
			clearTimeout(timer)
		},
		methods: {
			// error 错误信息
			errFunc: function() {
				uni.showToast({
					title: "参数错误！"
				})
				timer = setTimeout(() => {
					uni.reLaunch({
						url: '/pages/index/index'
					})
				}, 500)
			},
			// 获取数据
			getDataDetail: function() {
				let artTemp = db.collection('xm-article').getTemp()
				let userTemp = db.collection('uni-id-users').field('_id,username,nickname,avatar_file').getTemp()
				db.collection(artTemp, userTemp).where(`_id == '${this.artId}'`).get({
					getOne: true
				}).then(res => {
					console.log(res)
					if (!res.result.data) {
						this.errFunc()
					}
					this.data = res.result.data
					this.loadingStatus = false
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detailWrapper {
		background: #f8f8f8;
		min-height: calc(100vh - var(--window-top));

		.container {
			padding: 30rpx;
			background: #fff;

			.title {
				font-size: 46rpx;
				color: #333;
				line-height: 1.4em;
				font-weight: 600;
			}

			.userinfo {
				padding: 20rpx 0 50rpx;
				display: flex;
				align-items: center;

				.avatar {
					width: 60rpx;
					height: 60rpx;
					padding-right: 15rpx;

					image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}

				.text {
					font-size: 28rpx;
					color: #555;

					.small {
						font-size: 20rpx;
						color: #999;
					}
				}
			}

			.content {}

			.like {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 80rpx 50rpx 50rpx;

				.btn {
					width: 260rpx;
					height: 120rpx;
					background-color: #e4e4e4;
					border-radius: 100rpx;
					color: #fff;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					font-size: 28rpx;

					.iconfont {
						font-size: 50rpx;
					}

					&.active {
						background: #0199FE;
					}
				}

				.text {
					font-size: 26rpx;
					color: #666;

					.num {
						color: #0199FE
					}

					.spot {
						padding: 0 10rpx;
					}
				}

				.users {
					display: flex;
					justify-content: center;
					padding: 30rpx 0;

					image {
						width: 50rpx;
						height: 50rpx;
						border-radius: 50%;
						border: 3px solid #fff;
						margin-left: -20rpx;
					}
				}
			}

		}
	}
</style>