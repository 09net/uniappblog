<template>
	<view>
		<view class="postarea">
			<form @submit="postsub">
				<input class="uni-input" maxlength="60" name="title" placeholder="标题" />
		<textarea placeholder-style="color:#F76260" name="content" placeholder="请输入评论内容" maxlength="65535" auto-height class="posttextarea" :value="text"/>
		
		<view class="row bj">
			<view class="col">
			<view class="col_3"><button type="default" @click="showSinglePicker">{{fidtext}}</button></view>
			<view class="col_3"><button type="primary" formType="submit">提交</button></view>
			<view class="col_3 padding-top"><uni-icon size="30" type="image" @click="chooseImage" class="blue"></uni-icon></view>
			<view class="col_3 padding-top"><uni-icon size="30" type="videocam" @click="chooseVideo" class="blue"></uni-icon></view>
				</view>
		</view>
		</form>
		</view>
<view class="uni-list list-pd">
			<view class="uni-list-cell cell-pd">
				<view class="uni-uploader">
		<view class="uni-uploader-body">
			<view class="uni-uploader__files">
		<block v-for="(image,index) in imageList" :key="index">
			<view class="uni-uploader__file">
				<image class="uni-uploader__img" :src="image" :data-src="image" @click="previewImage"></image>
			</view>
		</block>
<view class="uni-uploader__file" v-if="src">
<video :src="src" class="video"></video>
</view>
</view>
</view>
</view>
</view>
</view>
	<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="forum"></mpvue-picker>
</view>
</template>

<script>
	import ysv8set from '@/static/ysv8/index.js';
	import uniIcon from '@/components/uni-icon.vue'
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
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
		components: {
			uniIcon,
			mpvuePicker,
		},
		onShareAppMessage() {
			return {
				title: this.title+'_YSV8简单网站',
				path: '/pages/index/index'
			}
		},
		data() {
			return {
				title: ysv8set.title,
				shangstart:false,
				pickerValueDefault: [0],
				themeColor: '#007AFF',
				mode: '',
				deepLength: 1,
                pickerValueArray:[],
				forum: [],
				fid:0,
				imageList: [],
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 2,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				src:'',
				website:ysv8set.website,/*默认简单网站*/
				www:ysv8set.www,
				mask:{
				postactive:'blog/post'	
				},
				text:'',
				fidtext:'选择'
			};
		},onLoad(e) {
if(e.website){
 this.website=e.website;
}
			
			
			this.www='https://'+this.website+'.'+ysv8set.Domain+'.com/'
		this.get_Forum();	
			if(e.fid && e.fidtext){
				
				this.fid=e.fid 
				this.fidtext=e.fidtext
			}else{
			
			if(ysv8set.userdata==false){
				
				uni.showModal({
													content:'请登录',
													showCancel:false,
													success: function (res) {
														uni.navigateTo({url: '/pages/user/index'});
				
														}
												});					
												return false;
				
			}
			}
		}, methods: {/*获取栏目*/
			get_Forum(){
				uni.request({
				method:'POST',
				url: this.www+'/blog/a.api',
data: {YSV8_HEX: ysv8set.ysv8hex},
success: (res) => {
var data=res.data['data'];
for (var i in data) {
data[i]['label']=data[i]['name']
data[i]['value']=data[i]['id']
}
this.forum=data;
},
fail: (err) => {
uni.showModal({content:'网络故障',showCancel:false})
this.newsitems[e].loadingType = 0;
},
complete:()=> {}
})
},
			onCancel(e){
				
			},
			onConfirm(e) {
				console.log(e.value[0])
				this.fid=e.value[0]
				this.fidtext=e.label
			},
					showSinglePicker() {
						this.pickerValueArray = this.pickerSingleArray
						this.mode = 'selector'
						this.pickerValueDefault = [0]
						this.$refs.mpvuePicker.show()
					},
					postsub:function(e){
						var __self=this;
						var formData = e.detail.value;	
									if(this.fid<1){ 
										uni.showModal({
											content:'栏目为空',
											showCancel:false,
											success () {
												__self.showSinglePicker()
											}
										})
										
										return false;
										}
										
										if(formData['title'].length<4 || formData['content'].length<10){ 
											uni.showModal({
												content:'内容太少',
												showCancel:false,
												
											})
											
											return false;
											}
										
							uni.request({method:'POST',
						url: this.www+this.mask.postactive+'.api',
																	data: {
																		title:formData['title'],
																		content:formData['content'],
																		fid:this.fid,
																		imgv:this.imageList.join(','),
																		vs:this.src,
																		text:1,
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
										url: 't?id='+data.id+'&website='+this.website
									});
									
									
										}else{
											ysv8set.muialert(data);
											
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
			autotext:function(str){return ysv8set.langfun(str);},
			timestr:function(str){return ysv8set.timeStamp2String(str);},
			opendiv:function(){this.postno=!this.postno;},
			post:function(){this.text='';this.postno=!this.postno;},
			chooseImage: async function() {
					if (this.imageList.length === 8) {
						let isContinue = await this.isFullImg();
						console.log("是否继续?", isContinue);
						if (!isContinue) {
							return;
						}
					}
					uni.chooseImage({
						sourceType: sourceType[this.sourceTypeIndex],
						sizeType: sizeType[this.sizeTypeIndex],
						count: this.imageList.length + this.count[this.countIndex] > 8 ? 8 - this.imageList.length : this.count[this.countIndex],
						success: (res) => {
				for (var i in res.tempFilePaths){
							var imageSrc = res.tempFilePaths[i]
							uni.uploadFile({
								url: ysv8set.www+"post/upload.api",
								filePath: imageSrc,
								name: 'photo',
								formData:{
									YSV8_HEX: ysv8set.ysv8hex
								},
								success: (res) => {
									var data=JSON.parse(res.data);
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
										url: ysv8set.www+"post/uploadfile.api",
										filePath: imageSrc,
										name: 'photo',
										formData:{
											YSV8_HEX: ysv8set.ysv8hex
										},
										success: (res) => {
											var data=JSON.parse(res.data);
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
.padding-top{padding-top: 20upx;text-align: center;}
.posttextarea{min-height: 500upx; width: 100%;  background-color: #FFFFFF; padding: 10upx;margin: 10upx; padding-bottom: 100upx;}
.bj{position: fixed;	bottom: 0px;z-index: 999; text-align: center; width: 100%; height: 80upx; overflow: hidden;background-color: #FFFFFF;}
</style>
