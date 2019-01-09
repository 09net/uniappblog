<template>
	<view>
	
			<view class="uni-list">
						<view class="uni-list-cell" hover-class="uni-list-cell-hover">
							<view class="uni-media-list">
								<view class="uni-media-list-logo">
									<image src="../../static/logo.png"></image>
								</view>
								<view class="uni-media-list-body">
									<view class="uni-media-list-text-top">来源：YSV8简单网站</view>
									<view class="uni-media-list-text-bottom uni-ellipsis">程序支持：娄底零久网络科技有限公司出品</view>
								</view>
							</view>
						</view>
					</view>
			
			<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-media-list">
					<view class="uni-media-list-logo">宗旨</view>
					<view class="uni-media-list-body r">知识也是商品，互动应有回报</view>
					</view>
				</view>
			</view>
				<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-media-list">
						<view class="uni-media-list-logo">创建</view>
						<view class="uni-media-list-body r">https://zh.ysv8.com/website</view>
						</view>
					</view>
				</view>
				<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-media-list">
						<view class="uni-media-list-logo">邮箱</view>
						<view class="uni-media-list-body r">719048503@qq.com</view>
						</view>
					</view>
				</view>
				<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-media-list">
						<view class="uni-media-list-logo">合作电话</view>
						<view class="uni-media-list-body r">15973827429</view>
						</view>
					</view>
				</view>
					
	

	</view>
</template>

<script>
	import ysv8set from '@/static/ysv8/index.js';

	export default {

		
		data() {
			return {
				islogin:false,
				userdata:ysv8set.userdata,
				bucketcdn:ysv8set.bucketcdn
			};
		},methods: {
			gonav(e){uni.navigateTo({url: '/pages/' + e})},
			websiteadd(e){
				uni.navigateTo({
									url: '/pages/user/web?url=https://'+ysv8set.lang+'.ysv8.com/website'
								})
				
			},
			timestr:function(str){return ysv8set.timeStamp2String(str);},
			autotext:function(str){return ysv8set.langfun(str);},
			setislogin:function(e) {
				var data=JSON.parse(e);
				this.islogin=e;
				if(data['code']=='200'){
					this.islogin=true;
					this.userdata=data['my'];
				 ysv8set.localStorage.setItem("user",JSON.stringify(data['my']));
				
				}else{
					this.islogin=false;
					
				}
				
				
				
				
			},out:function(){
				this.islogin=false;
				ysv8set.ysv8hex
				
			}
			
			},onLoad(e) {
			
			
			
		
			
		}
	}
</script>

<style>
	.uni-media-list-logo2 {padding-right: 40upx;}
</style>
