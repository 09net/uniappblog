<template>
    <view>
			
			<uni-nav-bar color="#333333" background-color="#FFFFFF" fixed="false">

				
			</uni-nav-bar>
 <view class="list-view">
    <block v-for="(newsitem,index2) in data"  :key="index2">
                        <media-list v-if="fsize!='e'" :data="newsitem" @close="close(index1,index2)" @click="goDetail(newsitem)"></media-list>
						 <ebooklist v-else :data="newsitem" @close="close(index1,index2)" @click="goDetail(newsitem)"></ebooklist>
                    </block>
	
						<uni-load-more :loadingType="loadingType" :contentText="loadingText"></uni-load-more>

</view>
				
				
	
	
<view class="foot"><view class="row"><view class="col">
	       <view class="col_4" @tap="buttonbar('index?mode=0',false)"><view class="uni-tabbar__bd"><view class="uni-tabbar__label" :class="mode=='0'?'tar_active':'tar_no'">
           <uni-icon size="25" type="home"></uni-icon>
        </view><!----></view></view>
		<view class="col_4" @tap="buttonbar('s?fsize=e&fid=my',false)"><view class="uni-tabbar__bd"><view class="uni-tabbar__label" :class="mode=='1'?'tar_active':'tar_no'">
         <uni-icon size="25" type="eye"></uni-icon>
        </view><!----></view></view>
		<view class="col_4" @tap="more()"><view class="uni-tabbar__bd"><view class="uni-tabbar__label" :class="mode=='3'?'tar_active':'tar_no'">
        <uni-icon size="25" type="more-filled"></uni-icon>
        </view><!----></view></view></view></view></view></view>				
				
    </view>
</template>
<script>
    import ysv8set from '@/static/ysv8/index.js';
    import mediaList from '@/components/ysv8/bbslist.vue';
	 import ebooklist from '@/components/ysv8/ebooklist.vue';
		import uniDrawer from '@/components/uni-drawer.vue';
	import uniLoadMore from '@/components/uni-load-more.vue';
	import uniNavBar from '@/components/uni-nav-bar.vue'
	import uniIcon from '@/components/uni-icon.vue'
    export default {
        components: {
            mediaList,
						uniDrawer,
			uniLoadMore,uniNavBar,
			uniIcon,ebooklist
        },onNavigationBarButtonTap(e) {
			this.rightDrawerVisible = !this.rightDrawerVisible
		},
		onReachBottom(e) {
			setTimeout(() => {
				this.getlist();
			}, 500);
		},
        data() {
            return {
				title: ysv8set.title,
				rightDrawerVisible: false,
				showImg: false,
				pagtime:0,
				loadingText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				follow:false,
				ajaxi:true,
				loadingType:0,
                scrollLeft: 0,
                isClickChange: false,
                tabIndex: 1,
                data:[],
				imgcdn:ysv8set.imgcdn,
				bucketcdn:ysv8set.bucketcdn,
				active:'index',
				method:'index',
				mode:0,
				fsize:'f',
				fid:1,
				website:ysv8set.website,/*默认简单网站*/
				www:ysv8set.www,
            }
        },
        onLoad: function(e) {
			if(e.website){
				this.website=e.website;
				
			}
			this.www='https://'+this.website+'.'+ysv8set.Domain+'.com/'
					if(e.mode){
						this.mode=e.mode;
					}
					if(e.fsize){
						this.fsize=e.fsize;
					}
					if(e.fid){
						this.fid=e.fid;
					}
					if(this.fsize=='f'){
						if(ysv8set.isArray(ysv8set.userdata['forum']) && ysv8set.in_array(this.fid,ysv8set.userdata['forum'])){ this.follow=true}else{
				this.follow=false
						}
						
					}
					setTimeout(() => {
					this.getlist();
					this.showImg = true;
					},400);
        },
		onShareAppMessage() {
			return {
				title: this.title+'_YSV8简单网站',
				path: '/pages/index/index'
			}
		},
        methods: {
			more:function(){
				uni.showActionSheet({
					itemList: ['我的书架'],
					success: (e) => {
						this.buttonbar('s?fsize=e&fid=my',false);
					}
				})
				
			},
			closeRightDrawer() {
				this.rightDrawerVisible = false;
			},
			showRightDrawer() {
				this.rightDrawerVisible = true;
			},share() {
				uni.showToast({
					title: '分享'
				})
			},
			scan() {
				uni.showToast({
					title: '扫码'
				})
			},
			confirm:function(str){
				uni.redirectTo({url:'s?fsize=s&fid='+str.detail.value});

				
				
			},
			autotext:function(str){return ysv8set.langfun(str);},
			buttonbar:function(e,bool){
				if(bool){
				uni.redirectTo({url: '/pages/' + e});
				}else{
					uni.redirectTo({url:e});
				}
			},
			
			
			setNaivgationBarTitle: function (title) {this.title=title;uni.setNavigationBarTitle({title: title});},
			gonav(e){this.rightDrawerVisible = false;uni.navigateTo({url: '/pages/' + e})},
			gonav2(e){this.rightDrawerVisible = false;uni.navigateTo({url: e})},
            goDetail(e) {
                uni.navigateTo({
                     url: 't?id=' + e.id+"&website="+e.website
                })
            },
            close(index1, index2) {
                uni.showModal({
                    content: '是否删除本条信息？',
                    success: (res) => {
                        if (res.confirm) {
                            this.newsitems[index1].data.splice(index2, 1);
                        }
                    }
                })
            },
				getlist:function(){
				if (this.loadingType !== 0) {return;}
				this.loadingType = 1;
				this.ajaxi++;
			
			
if (this.fsize=='u'){var ajaxurl=this.www+'blog/u/'+this.fid+'/thread/'+this.pagtime+'.api';}else if(this.fsize=='s'){
var ajaxurl=this.www+'blog/s/'+encodeURIComponent(this.fid)+'.api?page='+this.pagtime;
}else if(this.fsize=='e'){
	if(this.fid=='my'){
var ajaxurl=this.www+'ebook/my/0/'+this.pagtime+'.api';
}else{
	
var ajaxurl=this.www+'ebook/index/0/'+this.pagtime+'.api';	
}


}else{var ajaxurl=this.www+'blog/f/'+this.fid+'/0/'+this.pagtime+'.api';}
			
				
				
				uni.request({
				method:'POST',
								url: ajaxurl,
							data: {
								YSV8_HEX: ysv8set.ysv8hex
							},
							success: (res) => {
								var data=res.data;
								if(data['code']!=200){
									ysv8set.muialert(data)
									return false;
									}
								
								
								
			
				if('title'  in data){this.setNaivgationBarTitle(data['title']);}
			
				var setdataarray=ysv8set.setdata(data['data'], 'down', this.data, this.pagtime);
					if(ysv8set.isArray(setdataarray) ==true){
				this.data=setdataarray[0];
				if(this.fsize=='s'){this.pagtime=this.pagtime+1; }else{
				this.pagtime=setdataarray[1];
				}
				}
			
				setTimeout(() => {
								if (setdataarray[2]<10) {
							
									this.loadingType = 2;
				
									return;
								}
								this.loadingType = 0;

							}, 500);		
							},
							fail: (err) => {
								uni.showModal({content:'网络故障',showCancel:false})
								this.loadingType = 0;
							},
							complete:()=> {
							
							}
						})
				},

            
        }
    }
</script>

<style>
.tar_active{
	color: rgb(0, 122, 255); font-size: 10px;
}
.tar_no{
	color: rgb(122, 126, 131); font-size: 10px;
}
.swiper-box{padding-bottom: 80upx;}
.title {
		font-size: 15px;
		line-height: 20px;
		color: #333333;
		padding: 15px;
	}

	.city {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		margin-left:8px;
	}

	.input-view {
		width: 92%;
		display: flex;
		background-color: #e7e7e7;
		height: 30px;
		border-radius: 15px;
		padding: 0 4%;
		flex-wrap:nowrap;
		margin:7px 0;
		line-height:30px;
	}
	
	.input-view .uni-icon{
		line-height:30px !important;
	}

	.input-view .input {
		height:30px;
		line-height:30px;
		width:94%;
		padding: 0 3%;
	}
	.foot {
		padding-top: 10upx;
		width: 100%;
		position: fixed;
		bottom: 0px;
		background-color: #FFFFFF;
		z-index: 999;
		text-align: center;
	}
</style>