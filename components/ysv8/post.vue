<template>
	
    <view>
		<view class="foot">
		<view class="row" v-if="postno">
			<view class="col">
			<view class="col_3"><uni-icon size="40" type="chatboxes-filled" @click="opendiv"></uni-icon></view>
			<view class="col_3">
				<template v-if="favbool">
				<uni-icon size="40" type="star-filled" @click="fav" :color="favstart?'':'red'"></uni-icon>
				</template>
				<uni-icon v-else size="40" type="star-filled" @click="fav" :color="favstart?'red':''"></uni-icon>
				</view>
			<view class="col_3">
				<uni-icon size="40" type="starhalf" @click="shang" :color="shangstart?'red':''">赏</uni-icon>
	        </view>
			<view class="col_3">
				<uni-icon size="40" type="more-filled" @click="more"></uni-icon>
			</view>
		  </view>
		</view>
		<view class="postarea" v-else>
			<form @submit="postsub">
		<textarea placeholder-style="color:#F76260" name="content" placeholder="请输入评论内容" auto-height class="posttextarea" :value="text"/>
		
		<view class="row bj">
			<view class="col">
			<view class="col_3"><button type="primary" formType="submit">提交</button></view>
			<view class="col_3 padding-top"><uni-icon size="30" type="image" @click="chooseImage" class="blue"></uni-icon></view>
			<view class="col_3 padding-top"><uni-icon size="30" type="videocam" @click="chooseVideo" class="blue"></uni-icon></view>
			<view class="col_3 padding-top"><uni-icon size="30" type="close" @click="opendiv" class="red"></uni-icon></view>
			</view>
		</view>
		</form>
		<view class="uni-list list-pd">
			<view class="uni-list-cell cell-pd">
				<view class="uni-uploader">
		<view class="uni-uploader-body">
			<view class="uni-uploader__files">
		<block v-for="(image,index) in imageList" :key="index">
			<view class="uni-uploader__file">
				<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
			</view>
		</block>
	<view class="uni-uploader__file" v-if="src">
			<video :src="src" class="video"></video>
</view>
		
		</view></view></view></view></view>
		</view>
		</view>
       
    </view>
</template>

<script>
	import ysv8set from '@/static/ysv8/index.js';
	import uniIcon from '@/components/uni-icon.vue'
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]
    export default {
			props:['pid','thread','favstart','mask'],
  data() {
 return {
	 favbool:false,
postno:true,
					text:'',
					shangstart:false,
					imageList: [],
					sourceTypeIndex: 2,
					sourceType: ['拍照', '相册', '拍照或相册'],
					sizeTypeIndex: 2,
					sizeType: ['压缩', '原图', '压缩或原图'],
					countIndex: 2,
					src:'',
					count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
					votetype:['goods','nos','jubao']
}
},
        computed: {
			bucketcdn(){
				return ysv8set.bucketcdn;
			}
        },
		onUnload() {
			
			this.imageList = [],
			this.src = '',
				this.sourceTypeIndex = 2,
				this.sourceType = ['拍照', '相册', '拍照或相册'],
				this.sizeTypeIndex = 2,
				this.sizeType = ['压缩', '原图', '压缩或原图'],
				this.countIndex = 2;
		},
		components: {
			uniIcon
		},
        methods: {
			more:function(){
				uni.showActionSheet({
					itemList: ['顶', '踩', '举报','赞赏(G100)','收藏'],
					success: (e) => {
						if(e.tapIndex=='3'){this.shang();return false;}
						if(e.tapIndex=='4'){this.fav();return false;}
						uni.request({method:'POST',
						url: 'https://'+ysv8set.website+'.44api.com/'+this.mask.vote+'/vote.api',
						data: {
						id:this.thread['id'],
						type:this.votetype[e.tapIndex],
						YSV8_HEX: ysv8set.ysv8hex
						},
						success: (res) => {
						var data=res.data;
						ysv8set.muialert(data);							
						},
						fail: (err) => {uni.showModal({content:err.errMsg,showCancel:false})},complete:()=> {}})
						
						
						
						
						
						
						
						
						
					}
				})
				
			},
					shang:function(){
						if(this.thread['uid']=='0'){return false;}
						uni.request({method:'POST',
												url: ysv8set.www+this.mask.postactive+'/shang.api',
																							data: {
																								uid:this.thread['uid'],
																								tid:this.thread['id'],
																								pid:0,
																								YSV8_HEX: ysv8set.ysv8hex
																							},
																							success: (res) => {
																var data=res.data;
																ysv8set.muialert(data);
																
																this.shangstart=true;
																this.mask.datacom=this.mask.add_array(this.thread,this.mask.datacom,false);
																ysv8set.localStorage.setItem("datacom"+this.mask.apiid,JSON.stringify(this.mask.datacom));
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
					fav:function(){
						var addstate=this.mask.add_array(this.thread,this.mask.datafav,true);
					
						this.mask.datafav=addstate[0];
						this.favbool=!this.favbool;
						
						
						ysv8set.localStorage.setItem("datafav"+this.mask.apiid,JSON.stringify(this.mask.datafav));
					},
					share:function(){
						
					},
					postsub:function(e){
						var formData = e.detail.value;				
							uni.request({method:'POST',
						url: ysv8set.www+this.mask.postactive+'/'+this.thread['id']+'.api',
																	data: {
																		content:formData['content'],
																		pid:this.pid,
																		imgv:this.imageList.join(','),
																		vidv:this.src,
																		YSV8_HEX: ysv8set.ysv8hex
																	},
																	success: (res) => {
										var data=res.data;
										uni.showModal({
											content:data['info'],
											showCancel:false
										})
										if(data['code']==200){
									
									uni.redirectTo({
										url: 't?id='+this.thread['id']
									});
									
									
										}
										this.mask.add_array(this.thread,this.mask.datacom,false);
										ysv8set.localStorage.setItem("datacom"+this.mask.apiid,JSON.stringify(this.mask.datacom));
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
			autotext:function(str){return ysv8set.langfun(str);},
			timestr:function(str){return ysv8set.timeStamp2String(str);},
			opendiv:function(){this.postno=!this.postno;},
			post:function(){this.text='';this.postno=!this.postno;},
			chooseImage: async function() {
					if (this.imageList.length === 3) {
						let isContinue = await this.isFullImg();
						console.log("是否继续?", isContinue);
						if (!isContinue) {
							return;
						}
					}
					uni.chooseImage({
						sourceType: sourceType[this.sourceTypeIndex],
						sizeType: sizeType[this.sizeTypeIndex],
						count: this.imageList.length + this.count[this.countIndex] > 3 ? 3 - this.imageList.length : this.count[this.countIndex],
						success: (res) => {
				
							
						for (var i in res.tempFilePaths){
									var imageSrc = res.tempFilePaths[i]
							uni.uploadFile({
								url: "https://zh.ysv8.com/post/upload.api",
								filePath: imageSrc,
								name: 'photo',
								formData:{
									YSV8_HEX: ysv8set.ysv8hex
								},
								success: (res) => {
									var data=eval('(' + res.data + ')');
								if(data.code!='200'){ ysv8set.muialert(data);
								return false;
								}
				
									uni.showToast({
										title: '上传成功',
										icon: 'success',
										duration: 1000
									})
									this.imageList = this.imageList.concat(data.url);
								},
								fail: (err) => {
									console.log('uploadImage fail', err);
									uni.showModal({
										content:err.errMsg,
										showCancel:false
									});
									uni.hideLoading();
								},
								complete: () => {
									console.log("complate")
								}
							});
							
							}
						}
					})
				},
				isFullImg: function() {
					return new Promise((res) => {
						uni.showModal({
							content: "已经有3张图片了,是否清空现有图片？",
							success: (e) => {
								if (e.confirm) {
									this.imageList = [];
									res(true);
								} else {
									res(false)
								}
							},
							fail: () => {
								res(false)
							}
						})
					})
				},
				previewImage: function(e) {
					var current = e.target.dataset.src
					uni.previewImage({
						current: current,
						urls: this.imageList
					})
				},chooseVideo: function () {
				uni.chooseVideo({
					sourceType: sourceType[this.sourceTypeIndex],
					success: (res) => {
						
									var imageSrc = res.tempFilePath
									uni.uploadFile({
										url: "https://zh.ysv8.com/post/uploadfile.api",
										filePath: imageSrc,
										name: 'photo',
										formData:{
											YSV8_HEX: ysv8set.ysv8hex
										},
										success: (res) => {
											var data=eval('(' + res.data + ')');
										if(data.code!='200'){ ysv8set.muialert(data);
										return false;
										}
						
											uni.showToast({
												title: '上传成功',
												icon: 'success',
												duration: 1000
											})
											this.src = this.imageList.concat(data.name);
										},
										fail: (err) => {
											console.log('uploadImage fail', err);
											uni.showModal({
												content:err.errMsg,
												showCancel:false
											});
											uni.hideLoading();
										},
										complete: () => {
											console.log("complate")
										}
									});
					
					}
				})
			}
        }
    }
</script>

<style>

.postarea{padding: 20upx;}
.posttextarea{background-color: #FFFFFF; width: 100%;min-height: 150upx; padding-bottom: 100upx;}
.padding-top{padding-top: 20upx;}
.foot {
	padding-top: 10upx;
	width: 100%;
	position: fixed;
	bottom: 0px;
	background-color: #FFFFFF;
	z-index: 999;
	text-align: center;
}
.shang{ font-size: 40upx;}
.bj{background-color: #BEBEBE;}
</style>
