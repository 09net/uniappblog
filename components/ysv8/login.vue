<template>
	<view>
		<view class="uni-padding-wrap">
			<form @submit="formSubmit" @reset="formReset">
				<view>
					<view class="uni-title">账号</view>
					<view class="uni-list">
						<view class="uni-list-cell">
							<input class="uni-input" name="user" focus placeholder="账号" />
						</view>
					</view>
				</view>
				<view>
					<view class="uni-title">密码</view>
					<view class="uni-list">
						<view class="uni-list-cell">
							<input class="uni-input" name="pass" password placeholder="密码" />
						</view>
					</view>
				</view>
				<view v-if="add">
					<view class="uni-title">密码重复</view>
					<view class="uni-list">
						<view class="uni-list-cell">
							<input class="uni-input" name="pass2" password placeholder="密码重复" />
						</view>
					</view>
				</view>
				<view v-if="add">
					<view class="uni-title">电子邮箱</view>
					<view class="uni-list">
						<view class="uni-list-cell">
							<input class="uni-input" name="email" placeholder="邮箱" value="@qq.com" />
						</view>
					</view>
				</view>
				
				<view class="uni-btn-v uni-common-mt">
					<button class="btn-submit" type="primary" formType="submit">{{btext}}</button>
					<view class="row c">
					<view class="col">
					<view class="col_6"><view id='mima' class="mui-btn mui-btn-block mui-btn-success" @click="safepw">动态密码</view></view>
					<view class="col_6"><view class="btn-submit" type="primary" @click="setadd">{{stext}}</view></view>
					</view>
				</view>
				</view>
			</form>
		</view>
	</view>
</template>
<script>
import ysv8set from '@/static/ysv8/index.js';
	export default {
		name:'login',
		props:['islogin'],
		data() {
			return {
				add:false,
				btext:'登录',
				stext:'注册',
				regid:'login'
			}
		},methods: {
			
			
			formSubmit:function(e){
				var formData = e.detail.value;
				uni.request({method:'POST',
url: ysv8set.www+'user/'+this.regid+'.api',
											data: formData,
											success: (res) => {
				var data=res.data;
				if(data['code']=='200'){
			
				if(typeof(data['hex'])!="undefined"){ 
				ysv8set.ysv8hex=data['hex'];
				 ysv8set.localStorage.setItem("ysv8hex",data['hex']);
				 }
				this.getdata();
				}else{
					
					uni.showModal({
						content:data['info'],
						showCancel:false
					})
					
				}
									
									
									
									
											},
											fail: (err) => {
												uni.showModal({
													content:err.errMsg,
													showCancel:false
												})
											},
											complete:()=> {
											
											}
										})
				
				
			},
			
			
			getdata:function(){
				var __self=this;
				uni.request({
							
				method:'POST',
								url: ysv8set.www+'user/get.api',
							data: {
								YSV8_HEX: ysv8set.ysv8hex
							},
							success: (res) => {
var data=res.data;
this.$emit("Changed",JSON.stringify(data));
					
					
					
					
							},
							fail: (err) => {
								uni.showModal({
									content:err.errMsg,
									showCancel:false
								})
							},
							complete:()=> {
							
							}
						})
				
				
			},
			
			setadd:function(){
				if(this.add){
					this.add=false;
					this.btext='登录';
					this.stext='注册';
					this.regid='login'
					
				}else{
					this.add=true;
					this.stext='登录';
					this.btext='注册';
					this.regid='add'
					
				}
				
			},
			safepw:function(){
				
				uni.navigateTo({
									url: '/pages/user/web?url=https://'+ysv8set.lang+'.ysv8.com/cp/aq'
								})
			},
	
			formReset: function (e) {
				
			}
		}
	}
</script>

<style>
	
</style>
