<template>
	<view class="home">
		<view class="topNav">
			<u-tabs :list="navList" @click="()=>clickList" 
			:activeStyle="{
		            color: '#333',
		            fontWeight: 'bold',
		            transform: 'scale(1.05)'
		        }" 
			:inactiveStyle="{
		            color: '#888',
		            transform: 'scale(1)'
		        }"
			lineColor="#2c993a"
				 />
		</view>
		<view class="loadingStatus" v-show="loading">
				<u-skeleton
				    rows="4"
				    title
					loading
					avatar 
				></u-skeleton>
		</view>
		<view class="content">
			<view class="item" v-for="(item, index) in dataList" :key="index" >
				<blogItem></blogItem>
			</view>
		</view>
		<view class="edit">
			<text class="iconfont icon-bianjisekuai" @click="editPages"></text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navList: [{
						id: 1,
						name: "最新"
					},
					{
						id: 2,
						name: "热门"
					}
				],
				loading:false,
				dataList:[1,2,3]
			}
		},
		onLoad() {

		},
		methods: {
			clickList: function(e) {

			},
			editPages:function (){
				uni.navigateTo({
					url:"/pages/edit/edit"
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
			.item{
				padding: 30rpx 20rpx;
				border-bottom: #f7f7f7 solid 10rpx;
			}
		}

		.loadingStatus{
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