<template>
    <view>
		<view v-if="zurl!==false">如果页面无法下载请用浏览器打开下方链接
		<input class="uni-input" type="text" placeholder="请输入剪贴板内容" :value="zurl"></input>
		<button type="primary" @click="setClipboard">复制</button>
		</view>
        <web-view v-if="show" :src="url"></web-view>

    </view>
</template>

<script>
    export default {
		data() {
			return {
				url: '',
				zurl:false,
				show:false
			}
		},
		onLoad(e) {
			// #ifdef H5
			this.show=true
			// #endif
			if(e.zurl){
				this.zurl = e.zurl;
				}
			
			if(e.url){
				this.url = e.url;
			}else{
				uni.showModal({
					title: "错误",
					content: "错误内容",
					showCancel: false,
					confirmText: "确定"
				})
				
			}
	
		},methods: {
			setClipboard: function () {
				var data = this.zurl;
				if (data.length === 0) {
					uni.showModal({
						title: '设置剪贴板失败',
						content: '内容不能为空',
						showCancel: false
					})
				} else {
					uni.setClipboardData({
						data: data,
						success: () => {
							uni.showModal({
								content: '设置剪贴板成功',
								showCancel: false
							})
						},
						fail: () => {
							uni.showModal({
								content: '储存数据失败!',
								showCancel: false
							})
						}
					});
				}
			}
		}
		
		
	}
</script>

<style>

</style>
