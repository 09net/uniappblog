<template>
	<view>
		<template v-if="islogin">		
			<view class="uni-list">
						<view class="uni-list-cell" hover-class="uni-list-cell-hover">
							<view class="uni-media-list">
								<view class="uni-media-list-logo">
									<image v-if="userdata['avatar']" :src="bucketcdn+userdata['avatar']+'_80'"></image>
								</view>
								<view class="uni-media-list-body">
									<view class="uni-media-list-text-top">{{userdata.user}}</view>
									<view class="uni-media-list-text-bottom uni-ellipsis">{{userdata.ps}}</view>
								</view>
							</view>
						</view>
					</view>
			
			
			<view class="uni-list">
				<view class="uni-list-cell">
					<view v-if="userdata['website']" class="uni-media-list" @tap="gonav('myweb/index?website='+userdata['website'])">
						<view class="uni-media-list-logo2">
						我的网站
						</view>
						<view class="uni-media-list-body r"><uni-badge :text="userdata['website']" type="danger"></uni-badge></view>
					</view>
					
					<view v-else class="uni-media-list"  @tap="websiteadd()">
						<view class="uni-media-list-logo">
							创建网站
							
						</view>
						<view class="uni-media-list-body r"><uni-badge text="G100" type="danger"></uni-badge></view>
					</view>
					</view>
				</view>
				<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-media-list">
						<view class="uni-media-list-logo">ID</view>
						<view class="uni-media-list-body r"><uni-badge :text="userdata['id']" type="danger"></uni-badge></view>
						</view>
					</view>
				</view>
				
				
				<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-media-list">
						<view class="uni-media-list-logo">金币</view>
						<view class="uni-media-list-body r"><uni-badge :text="userdata['gold']" type="danger"></uni-badge></view>
						</view>
					</view>
				</view>
					<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-media-list">
						<view class="uni-media-list-logo">积分</view>
						<view class="uni-media-list-body r"><uni-badge :text="userdata['credits']" type="danger"></uni-badge></view>
						</view>
					</view>
				</view>
						<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-media-list">
						<view class="uni-media-list-logo">等级</view>
						<view class="uni-media-list-body r"><uni-badge :text="userdata['group']" type="danger"></uni-badge></view>
						</view>
					</view>
				</view>
					<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-media-list">
						<view class="uni-media-list-logo">邮箱</view>
						<view class="uni-media-list-body r"><uni-badge :text="userdata['email']" type="danger"></uni-badge></view>
						</view>
					</view>
				</view>	
					
	
		<button class="btn-submit" type="primary" @click="out">退出</button>
		</template>
		<login v-else v-bind:islogin="islogin" v-on:Changed = "setislogin($event)" ref="login"></login>
	</view>
</template>

<script>
	import ysv8set from '@/static/ysv8/index.js';
	import login from '@/components/ysv8/login.vue';
	import uniBadge from "@/components/uni-badge.vue";

	export default {

		components: {
			login,
			uniBadge
			},
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
			
			
			
			if(e.data){
			}else{
				setTimeout(() => {this.$refs.login.getdata();
				});
			}
			
		}
	}
</script>

<style>
	.uni-media-list-logo2 {padding-right: 40upx;}
</style>
