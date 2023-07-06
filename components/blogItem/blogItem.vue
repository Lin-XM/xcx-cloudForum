<template>
	<view class="blogWrapper">
		<view class="head">
			<view class="userInfo">
				<view class="avatar">
					<image src="../../static/userdefault.png" mode=" aspectFill" />
				</view>
				<view class="name">
					老王
				</view>
				<view class="time">
					<uni-dateformat date="2020/10/20 20:20:20" :threshold="[60000,360000*24*30]" format="MM月dd hh:mm" />
				</view>

			</view>

			<view class="more">
				<text class="iconfont icon-gengduo" />
			</view>

		</view>
		<!-- 中间部分 -->
		<view class="body">
			<view class="title">
				default title
			</view>
			<view class="text">
				<view class="textItem">
					conetntcionaodawdhahdafbhoibqawo
				</view>
			</view>
			<view class="picList">
				<view class="pic" v-for="(item,index) in picList " :key="index">
					<image src="../../static/test.png" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<!--评论,点赞,之类的 -->
		<view class="footer">
			<view class="box">
				<text class="iconfont icon-yueduxiao" /><text>11</text>
			</view>
			<view class="box">
				<text class="iconfont icon-pinglun" /><text>11</text>
			</view>

			<view class="box">
				<text class="iconfont icon-zan" /><text>11</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "blogItem",
		data() {
			return {
				picList: [1]
			};
		}
	}
</script>

<style lang="scss">
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