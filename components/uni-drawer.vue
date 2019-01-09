<template>
	<view class="uni-drawer" :catchtouchmove="catchtouchmove" :class="{'uni-drawer-visible':visible,'uni-drawer-right':rightMode}">
		<view v-if="showMask" class="uni-drawer-mask" @tap="close"></view>
		<view class="uni-drawer-content">
			<view style="padding:30upx;">
									<view class="uni-common-mt">
										<button class="button" type="warn" size="mini" @tap="closeRightDrawer">关闭</button>
									</view>
									<view class="uni-list uni-common-mt">
										<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
											<view class="uni-list-cell-navigate uni-navigate-right" @tap="gonav('user/index')">
												个人中心
											</view>
										</view>
															<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
																<view class="uni-list-cell-navigate uni-navigate-right" @tap="gonav2('add')">
								发帖
																</view>
															</view>
															<view class="uni-list-cell" hover-class="uni-list-cell-hover">
																<view class="uni-list-cell-navigate uni-navigate-right" @tap="gonav2('f')">
																	栏目大全
																</view>
															</view>
										<view class="uni-list-cell" hover-class="uni-list-cell-hover">
											<view class="uni-list-cell-navigate uni-navigate-right" @tap="gonav2('fav?id=1')">
												收藏
											</view>
										</view>
										<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
											<view class="uni-list-cell-navigate uni-navigate-right" @tap="gonav2('fav?id=0')">
												历史
											</view>
										</view>
										<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
											<view class="uni-list-cell-navigate uni-navigate-right" @tap="gonav2('s?fsize=s&fid=奇')">
			搜索
											</view>
										</view>
									
									</view>
								</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			website: String,
			
			/**
			 * 显示状态
			 */
			visible: {
				type: Boolean,
				default: false
			},
			/**
			 * 显示模式（左、右），只在初始化生效
			 */
			mode: String,
			/**
			 * 蒙层显示状态
			 */
			mask: {
				type: [Boolean, String],
				default: true
			}
		},
		data() {
			return {
				
				rightMode: false,
				catchtouchmove: false
			}
		},
		computed: {
			showMask() {
				return String(this.mask) === 'true'
			}
		},
		created() {
			this.rightMode = this.mode === 'right'
			//#ifdef MP-WEIXIN
			this.catchtouchmove = true
			//#endif
		},
		methods: {
				closeRightDrawer() {
					this.$emit('close')
				},
				showRightDrawer() {
					this.$emit('close')
				},share() {
					uni.showToast({
						title: '分享'
					})
				},
				autotext:function(str){return ysv8set.langfun(str);},
				buttonbar:function(e,bool){
					if(bool){
					uni.redirectTo({url: '/pages/' + e});
					}else{
						uni.redirectTo({url:e});
					}
				},
				openright(){
				this.rightDrawerVisible = !this.rightDrawerVisible;
				},
				gonav(e){this.rightDrawerVisible = false;uni.navigateTo({url: '/pages/' + e})},
				gonav2(e){this.rightDrawerVisible = false;uni.navigateTo({url: e + '?website='+this.website})},

			
			close() {
				this.$emit('close')
			}
		}
	}
</script>

<style scoped>
	.uni-drawer {
		display: block;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
		visibility: hidden;
		z-index: 998;
		height:100%;
	}

	.uni-drawer>.uni-drawer-mask {
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.4);
	}

	.uni-drawer>.uni-drawer-content {
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 61.8%;
		height: 100%;
		background: #FFFFFF;
		transition: all 0.3s ease-out;
		transform: translatex(-100%);
	}

	.uni-drawer.uni-drawer-right>.uni-drawer-content {
		left: auto;
		right: 0;
		transform: translatex(100%);
	}

	.uni-drawer.uni-drawer-visible {
		visibility: visible;
	}

	.uni-drawer.uni-drawer-visible>.uni-drawer-mask {
		display: block;
	}

	.uni-drawer.uni-drawer-visible>.uni-drawer-content {
		transform: translatex(0);
	}
</style>
