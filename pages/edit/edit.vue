<!--
  TODOS
  页面在微信小程序中样式错误
  空格回车之后下面图标样式不能回退
  -->

<template>
	<view class="editWrapper">
		<view class="topPart">
			<view class="title">
				<input type="text" v-model="article.title" placeholder="请输入标题内容" placeholder-class="placeholder">
			</view>
			<view class="content">
				<editor ref="editor" class="editor" placeholder="请输入内容" show-img-resize show-img-toolbar show-img-size
					@ready="onReadyShow" @focus="toolsShow = true" @statuschange="statuschange"></editor>
			</view>

		</view>
		<view class="bottomPart">
			<view class="btnGroup">
				<u-button type="primary" text="发表" :disabled="!article.title" @click="getEditorContent"></u-button>
			</view>
			<view class="tools" v-if="toolsShow">
				<view class="item" @click="clickHeader">
					<text class="iconfont icon-zitibiaoti" :class="headerStatus ? 'active' : '' "></text>
				</view>
				<view class="item">
					<text @click="clickBold" class="iconfont icon-zitijiacu"
						:class=" boldStatus ? 'acitve' : '' "></text>
				</view>
				<view class="item" @click="clickItalic">
					<text class="iconfont icon-zitixieti " :class="italicStatus ? 'acitve' : '' "></text>
				</view>
				<view class="item" @click="clickDivider">
					<text class="iconfont icon-fengexian "></text>
				</view>
				<view class="item" @click="clickPictureUpload">
					<text class="iconfont icon-charutupian "></text>
				</view>
				<view class="item" @click="editorOK">
					<text class="iconfont icon-duigou_kuai "></text>
				</view>

			</view>
		</view>

	</view>
</template>

<script>
	const db = uniCloud.database()
	import {
		getImageSrc,
		getProvince
	} from '../../utils/tools.js'
	import {store} from '../../uni_modules/uni-id-pages/common/store.js'
	export default {
		data() {
			return {
				disabledStatus: true,
				toolsShow: false,
				editorCtx: undefined,
				headerStatus: false,
				boldStatus: false,
				italicStatus: false,
				article: {
					title: "",
					content: "",
					discription: '',
					piculs: undefined, // 缩略图
					province: ""
				},
			};
		},
		onLoad(e) {
			this.isLogin()
		},
		methods: {
			// 判断是否登录
			isLogin:function(){
				if(!store.hasLogin){
					uni.showToast({
						title:"用户未登录！",
						icon:"error"
					})
					setTimeout(()=>{
						uni.reLaunch({
							url:'/pages/index/index'
						})
					},1000)
				}
			},
			
			// add db data
			addData() {
				db.collection("xm-article").add({
					...this.article
				}).then(res => {
					uni.hideLoading()
					uni.showModal({
						title: '提示',
						content: '是否回到首页？',
						success: function(res) {
							if (res.confirm) {
								uni.reLaunch({
									url: "/pages/index/index"
								})
							} else if (res.cancel) {
								// 清楚页面数据
								uni.redirectTo({
									url: "/pages/edit/edit"
								})

							}
						},
						fail: function(res) {
							uni.redirectTo({
								url: "/pages/edit/edit"
							})
						}
					})

				})
			},
			// 发表的事件
			getEditorContent: function() {
				this.editorCtx.getContents({
					success: (res) => {
						this.article.discription = res.text.slice(0, 50)
						this.article.content = res.html
						this.article.piculs = getImageSrc(res.html, 3)
					}
				})
				// 获取用户发表文章的IP地址
				getProvince().then(res => {
					this.article.province = res.province
				})
				this.addData()
				uni.showLoading({
					title: "发布中"
				})
				console.log('最终发表', this.article);
			},
			// 增加点击标题的 class
			clickHeader: function() {
				this.headerStatus = !this.headerStatus
				this.editorCtx.format("header", this.headerStatus ? "H2" : '')
			},
			clickBold: function() {
				this.boldStatus = !this.boldStatus
				this.editorCtx.format("bold")
			},
			clickItalic: function() {
				this.italicStatus = !this.italicStatus
				this.editorCtx.format("italic")
			},
			// 添加图像
			clickPictureUpload: function() {
				uni.chooseImage({
					success: async (res) => {
						uni.showLoading({
							title: "上传中.....",
							mask: true
						})
						for (let item of res.tempFiles) {
							let result = await uniCloud.uploadFile({
								filePath: item.path,
								cloudPath: item.name
							})
							this.editorCtx.insertImage({
								src: result.fileID
							})
						}
						uni.hideLoading()
					}
				})
			},

			// 添加分割线
			clickDivider: function() {
				this.dividerStatus = !this.dividerStatus, this.editorCtx.insertDivider()
			},
			editorOK: function() {
				this.toolsShow = !this.toolsShow
			},

			// 样式发生改变
			statuschange: function(e) {
				let detail = e.detail
				this.checkStatus("header", detail, 'headerStatus')
				this.checkStatus("bold", detail, 'boldStatus')
				this.checkStatus("italic", detail, 'italicStatus')

			},
			checkStatus: function(name, detail, obj) {
				if (detail.hasOwnProperty(name)) {
					this[obj] = true;
				} else {
					this[obj] = false;
				}
			},
			// 获取富文本内容
			onReadyShow: function() {
				uni.createSelectorQuery().in(this).select(".editor").fields({
					size: true,
					context: true
				}, (res) => {
					this.editorCtx = res.context
				}).exec()
			},

			// 离开焦点
			onfocus: function() {
				this.toolsShow = true
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .ql-editor::before {
		font-style: normal;
		color: #e0e0e0;
	}

	.active {
		color: #0199FE
	}

	.editWrapper {
		padding: 30rpx;

		.topPart {
			.title {
				input {
					font-size: 48rpx;
					height: 120rpx;
					border-bottom: 1px solid #a4a4a4;
					margin-bottom: 32rpx;
					background-color: #f7f7f7;
				}

				.placeholder {
					color: #999;
					padding-left: 12rpx;
				}
			}

			.content {
				.editor {
					height: calc(100vh - 500rpx);
					margin-bottom: 50rpx;
				}

			}

		}

		.bottomPart {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			flex-direction: column;

			.btnGroup {
				width: 100%;
				flex-grow: 1;
			}

			.tools {
				width: 100%;
				height: 80rpx;
				background-color: #fff;
				border-top: 1rpx solid #f7f7f7;
				position: fixed;
				left: 0;
				bottom: 0%;
				display: flex;
				justify-content: space-around;
				align-items: center;

				.item {
					.iconfont {
						font-size: 36rpx;

						// color: #333;
						&.active {
							color: #0199FE
						}

					}
				}



			}
		}

	}
</style>