<template>
	<view class="blogWrapper">
		<view class="head">
			<view class="userInfo">
				<view class="avatar">
					<image
						:src="itemInfo.user_id[0].avatar_file ? itemInfo.user_id[0].avatar_file.url : '../../static/userdefault.png'"
						mode=" aspectFill" />
				</view>
				<view class="name">
					{{itemInfo.user_id[0].nickname ? itemInfo.user_id[0].nickname : itemInfo.user_id[0].username  }}
				</view>
				<view class="time">
					<uni-dateformat :date="itemInfo.publish_date" :threshold="[60000,360000*24*30]"
						format="MM月dd hh:mm" />
				</view>

			</view>

			<view class="more">
				<text class="iconfont icon-gengduo" />
			</view>

		</view>
		<!-- 中间部分 -->
		<view class="body">
			<view class="title" @click="toDetail">
				{{itemInfo.title}}
			</view>
			<view class="text" @click="toDetail">
				<view class="textItem">
					{{itemInfo.descrtion ?itemInfo.descrtion : '' }}
				</view>
			</view>
			<view class="picList">
				<view class="pic" v-for="(item,index) in itemInfo.piculs " :key="index">
					<image @click="clickImage(index)" :src="item" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<!--评论,点赞,之类的 -->
		<view class="footer">
			<view class="box">
				<text class="iconfont icon-yueduxiao" /><text>{{itemInfo.view_count}}</text>
			</view>
			<view class="box">
				<text
					class="iconfont icon-pinglun" /><text>{{itemInfo.comment_count == 0 ? "评论" : itemInfo.comment_count}}</text>
			</view>

			<view class="box">
				<text class="iconfont icon-zan" /><text>{{itemInfo.like_count == 0 ? "点赞" : itemInfo.like_count}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "blogItem",
		props: {
			itemInfo: {
				typeof: Object,
				default: {
					title: '',
					content: '',
					publish_date: undefined,
					like_count: 0,
					view_count: 1,
					comment_count: 0,
					province: "",
					descrtion: '',
					piculs: [],
					user_id: [],
				}
			}
		},
		data() {
			return {
				picList: [1]
			};
		},
		onLoad(){
			// console.log('fuck',this.itemInfo)
		},
		methods: {
			// 点击缩略图
			clickImage: function(index) {
				uni.previewImage({
					urls: this.itemInfo.piculs,
					current: index
				})
			},

			//  跳转详情页面
			toDetail: function() {
				uni.navigateTo({
					url: '/pages/details/details?id=' + this.itemInfo._id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.blogWrapper {
		.head {
			display: flex;
			font-size: 32rpx;
			align-items: center;
			justify-content: space-between;

			.userInfo {
				display: flex;
				align-items: center;

				.avatar {
					width: 40rpx;
					height: 40rpx;
					border-radius: 50%;
					overflow: hidden;

					image {
						width: 100%;
						height: 100%;
						display: block;
					}
				}

				.name {
					color: #222;
					padding-left: 10rpx;
				}

				.time {
					color: #888;
					font-size: 32rpx;
					padding-left: 20rpx;
				}
			}

			.more {
				padding: 5rpx;

				.iconfont {
					font-size: 50rpx;
					color: #888;
				}
			}
		}

		.body {
			padding: 15rpx 0 30rpx;

			.title {
				font-size: 40rpx;
				color: #000;
				font-weight: 600;
				text-align: justify;

				.textItem {
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: hidden;
					-webkit-line-clamp: 2;
					line-clamp: 2;
					-webkit-box-orient: vertical;
				}

			}

			.picList {
				display: flex;
				padding-top: 20rpx;

				.pic {
					width: 225rpx;
					height: 225rpx;
					margin-right: 6rpx;
					overflow: hidden;

					image {
						height: 100%;
						width: 100%;
					}

					&:first-child {
						border-top-left-radius: 20rpx;
						border-bottom-left-radius: 20rpx;
					}

					&:last-child {
						border-top-right-radius: 20rpx;
						border-bottom-right-radius: 20rpx;
					}

					&:only-child {
						border-radius: 20rpx;
					}
				}
			}

		}

		.footer {
			display: flex;
			align-items: center;
			justify-content: space-around;
			font-size: 24rpx;
			color: #333;

			.box {
				display: flex;
				align-items: center;
				padding: 15rpx 0 0 5px;
				flex: 1;
				justify-content: center;

				.iconfont {
					font-size: 40rpx;
					padding-right: 12rpx;
				}
			}
		}
	}
</style>