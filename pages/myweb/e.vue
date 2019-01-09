<template>
	<view>
		<template v-if="ebook===false">
<view class="uni-padding-wrap">
	<template v-if="vs">
	<video class="w100" id="myVideo" :src="bucketcdn+vs" @error="videoErrorCallback" :autoplay="true" controls></video>
	<vdown :data="thread" v-bind:mask="mask"  v-bind:downactive="active" v-bind:www="www"></vdown>
	</template>
		
<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-media-list" @tap="gonav2('s?fsize=u&fid='+thread['uid']+'&website='+website)">
					<view class="uni-media-list-logo">
						<image v-if="thread['img']" :src="bucketcdn+thread['img']+'_80'"></image>
					</view>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{thread.title}}</view>
						<view class="uni-media-list-text-bottom uni-ellipsis">{{timestr(thread.atime)}}</view>
					</view>
					
				</view>
				
			</view>
			<view class="article-content">
				{{thread.des}}
			</view>
		</view>			
		
		
<view class="article-files" v-if="files">
<block v-for="(newsitem,index2) in files" :key="index2">
<filelist :data="newsitem" v-bind:mask="mask" ></filelist>
</block>
	</view>

	<!-- 评论区 start -->
			<view class="uni-comment">
				<view>
					<view class="list-view">
						
						<block v-for="(newsitem,index2) in postlist" :key="index2">
								<mediaList :data="newsitem" @close="close(index1,index2)" @click="goDetail(newsitem['id'])"></mediaList>
						</block>
						
					</view>
					<uni-load-more :loadingType="loadingType" :contentText="contentText"></uni-load-more>
				</view>
				
			</view>
			<!-- 评论区 end -->
			</view>
<postdiv v-bind:pid="pid" v-bind:thread="thread" v-bind:mask="mask" v-bind:favstart="favstart"></postdiv>
</template>
<template v-else>
	<view class="h1 c">{{ebook.title}}</view>
<view class="article-content">
			<wxParse :content="htmlString" />
		</view>
	
<view class="foot">
  <view class="row c">
			<view class="col">
			<view class="col_4" @click="pre()">上一页</view>
			<view class="col_4" @click="home">
				目录</view>
			<view class="col_4" @click="next()">
				下一页
			</view>
	      </view>
		  </view>	
  </view>			
</template>

	</view>

</template>

<script>
	import ysv8set from '@/static/ysv8/index.js';
	import mask from '@/static/ysv8/mywebebook.js';
	import filelist from '@/components/ysv8/filelist.vue';
	import vdown from '@/components/ysv8/vdown.vue';
import mediaList from '@/components/ysv8/elist.vue';
import uniLoadMore from '@/components/uni-load-more.vue'
import postdiv from '@/components/ysv8/epost.vue';
	import marked from '@/components/marked'
	import wxParse from '@/components/mpvue-wxparse/src/wxParse.vue'
	export default {
	components: {
		mediaList,
	uniLoadMore,
	postdiv,
	wxParse,
	filelist,
	vdown
		},
		data() {
			return {
				title: ysv8set.title,
				favstart:false,
				banner: {},
				id:0,
				pid:0,
				vs:'',
				showImg:true,
				thread:[{
					uid:0,
				}
				],
				bucketcdn:ysv8set.bucketcdn,
				bannerShow:false,
				htmlString: "",
				postlist:[],
				cid:0,
				pagtime:0,
				loadingType:0,
			website:ysv8set.website,/*默认简单网站*/
				www:ysv8set.www,
				ebook:false,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},mask:mask,files:[],active:'blog',
			}
		},
		onReachBottom() {
			if (this.loadingType !== 0) {return;}
			this.loadingType = 1;
			this.ajaxi++;
			var __self=this;
			uni.request({
				url: 'https://iimg.44api.com/ebook/l/'+this.id+'/'+this.pagtime+'.api',
			
						success: (res) => {
							var data=res.data;
			var setdataarray=ysv8set.setdata_ebook(data['data'], 'down', __self.postlist, __self.pagtime);
				if(ysv8set.isArray(setdataarray) ==true){
			__self.postlist=setdataarray[0];
			__self.pagtime=setdataarray[1];
			}
			setTimeout(() => {
							if (setdataarray[2]<10) {
								__self.loadingType = 2;
								return;
							}
							__self.loadingType = 0;
						}, 500);		
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
		onShareAppMessage() {
			return {
				title: this.title,
				path: '/pages/myweb/e?id=' + this.id
			}
		},
		onLoad(e) {
			if(e.website){
this.website=e.website
			}
			this.www='https://'+this.website+'.ysv8.com/'
			if(e.id){
				this.id = e.id;
			}else{
				uni.showModal({
					title: "错误",
					content: "错误内容",
					showCancel: false,
					confirmText: "确定"
				})
				
			}
			this.getDetail();
			
		},onBackPress() {
        	if (this.bannerShow) {
        		this.bannerShow = false;
        		return true;
        	}
        },
		methods: {
			home:function(e){
				this.ebook=false;
			},next:function(){
				this.goDetail(Number(this.cid)+1);
			}
			,pre:function(){
				this.goDetail(Number(this.cid)-1);
			
			},
			goDetail:function(e){
				uni.pageScrollTo({
        scrollTop: 0
      })
				this.ebook=ysv8set.get_id(this.postlist,e);
				if(!this.ebook) return false;
				
				this.setNaivgationBarTitle(this.ebook.title);
				this.cid=e;
				uni.request({
					url: 'https://iimg.44api.com/hash/' + this.ebook.pid + '.js',
				success: (res) => {
					var data=res.data;
					this.htmlString=marked(data.content.replace(/data-original/g, 'src'));
					},
					});
				
			},
			gonav2(e){this.rightDrawerVisible = false;uni.navigateTo({url: e})},
			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
			timestr:function(str){return ysv8set.timeStamp2String(str);},
			autotext:function(str){return ysv8set.langfun(str);},
			setNaivgationBarTitle: function (title) {
				this.title=title;
				uni.setNavigationBarTitle({
					title: title,
					success: () => {
						console.log('setNavigationBarTitle success')
					},
					fail: (err) => {
						console.log('setNavigationBarTitle fail, err is', err)
					}
				})
			},
			getDetail() {
				var __self=this;
				uni.request({
								url: 'https://iimg.44api.com/ebook/l/'+this.id+'.api',
							success: (res) => {
								var data=res.data;
				//data['thread']['uidstate']=in_myfr(data['thread']['uid']);
//data['fdate']['state']=in_f(data['fdate']['id']);
if(data['code']!='200'){uni.showModal({
									content:data['info'],
									showCancel:false,
									success: function (res) {
										uni.navigateBack();

										}
								});					
								return false;
								}
								
__self.thread=data['edata']
mask.datalook =mask.add_array(data['edata'],mask.datalook,false)[0]
ysv8set.localStorage.setItem("datalook"+mask.apiid,JSON.stringify(mask.datalook));
this.favstart=ysv8set.in_array(data['edata']['id'],mask.datafav);/*是否收藏*/
var setdataarray=ysv8set.setdata_ebook(data['data'], 'down', [], __self.pagtime);
					if(ysv8set.isArray(setdataarray) ==true){
				__self.postlist=setdataarray[0];
				__self.pagtime=setdataarray[1];
				}
				setTimeout(() => {
								if (setdataarray[2]<10) {
									__self.loadingType = 2;
									return;
								}
								__self.loadingType = 0;
							}, 500);							
					
					
							},
							fail: (err) => {
								console.log('request fail', err);
								uni.showModal({
									content:err.errMsg,
									showCancel:false
								})
							},
							complete:()=> {
							
							}
						})
				
				
			
			}
		}
	}
</script>
<style>
	@import url("../../components/mpvue-wxparse/src/wxParse.css");
	.foot {
		padding-top: 10upx;
		width: 100%;
		position: fixed;
		bottom: 0px;
		background-color: #FFFFFF;
		z-index: 999;
		text-align: center;
	}
	.h1 {
		font-size: 40upx;
		padding: 20upx;
		font-weight: bold;
	}

	.banner-img {
		width: 100%;
	}

	.banner-title {
		max-height: 84upx;
		overflow: hidden;
		position: absolute;
		left: 30upx;
		bottom: 30upx;
		width: 90%;
		font-size: 32upx;
		font-weight: 400;
		line-height: 42upx;
		color: white;
		z-index: 11;
	}

	.article-meta {
		padding: 20upx 40upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		color: gray;
	}

	.article-text {
		font-size: 26upx;
		line-height: 50upx;
		margin: 0 20upx;
	}

	.article-author,
	.article-time {
		font-size: 30upx;
	}

	.article-content {
		padding: 0 30upx;
		overflow: hidden;
		font-size: 30upx;
		margin-bottom: 30upx;
	}
    /* 遮罩层 */
    .uni-mask {
        background: rgba(0, 0, 0, 0.6);
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 1;
    }

    /* 弹出层形式的广告 */
    .uni-banner {
        width: 70%;
        position: fixed;
        left: 50%;
        top: 50%;
        background: #FFF;
        border-radius: 10upx;
        z-index: 99;
        transform: translate(-50%, -50%);
    }
		.uni-padding-wrap{ padding-bottom: 80upx;}
</style>
