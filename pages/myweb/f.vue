<template>
    <view>
			
			<uni-nav-bar color="#333333" background-color="#FFFFFF" fixed="false">
			
			</uni-nav-bar>
			
 <view class="list-view">

    <block v-for="(newsitem,index2) in data"  :key="index2">
                        <media-list :data="newsitem" @close="follow(newsitem)" @click="goDetail(newsitem)"></media-list>
                    </block>
	
						<uni-load-more :loadingType="loadingType" :contentText="loadingText"></uni-load-more>

</view>
				
			
	
	
				
				
    </view>
</template>
<script>
    import ysv8set from '@/static/ysv8/index.js';
    import mediaList from '@/components/ysv8/flist.vue';
		import uniDrawer from '@/components/uni-drawer.vue';
	import uniLoadMore from '@/components/uni-load-more.vue';
	import uniNavBar from '@/components/uni-nav-bar.vue'
	import uniIcon from '@/components/uni-icon.vue'
    export default {
        components: {
            mediaList,
						uniDrawer,
			uniLoadMore,uniNavBar,
			uniIcon
        },onNavigationBarButtonTap(e) {
			this.rightDrawerVisible = !this.rightDrawerVisible
		},
		onReachBottom(e) {
			setTimeout(() => {
				this.getlist();
			}, 500);
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
				rightDrawerVisible: false,
				showImg: false,
				pagtime:0,
				loadingText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				ajaxi:true,
				loadingType:0,
                scrollLeft: 0,
                isClickChange: false,
                tabIndex: 1,
                data:[],
				imgcdn:ysv8set.imgcdn,
				bucketcdn:ysv8set.bucketcdn,
				active:'blog',
				method:'a',
				mode:'bbs',
				website:ysv8set.website,/*默认简单网站*/
				www:ysv8set.www,
            }
        },
        onLoad: function(e) {
					if(e.mode){
						this.mode=e.mode;
					}
					if(e.website){
						this.website=e.website;
						
					}
					this.www='https://'+this.website+'.'+ysv8set.Domain+'.com/'
					setTimeout(() => {
					this.getlist();
					this.showImg = true;
					},400);
        },
        methods: {
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
			follow:function(e){
				var addstate=mask.add_array(newsitem,ysv8set.userdata['forum'],true);
				ysv8set.userdata['forum']=addstate[0];
				ysv8set.localStorage.setItem("user",JSON.stringify(ysv8set.userdata));  
				
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
                    url: 's?fid=' + e.id+'&website='+this.website
                })
            },
            follow(newsitem) {/*关注*/	
			var addstate=mask.add_array(newsitem,ysv8set.userdata['forum'],true);
			ysv8set.userdata['forum']=addstate[0];
			ysv8set.localStorage.setItem("user",JSON.stringify(ysv8set.userdata['forum']));    
            },
				getlist:function(){
				if (this.loadingType !== 0) {return;}
				this.loadingType = 1;
				this.ajaxi++;
			
		var ajaxurl=this.www+this.active+'/'+this.method+'/'+this.pagtime+'.api';
				
				
				uni.request({
				method:'POST',
								url: ajaxurl,
							data: {
								YSV8_HEX: ysv8set.ysv8hex
							},
							success: (res) => {
								var data=res.data;
				
				if('title'  in data){this.setNaivgationBarTitle(data['title']);}
				var setdataarray=ysv8set.setdata_f(data['data'], 'down', this.data, this.pagtime);
					if(ysv8set.isArray(setdataarray) ==true){
				this.data=setdataarray[0];
				this.pagtime=setdataarray[1];
				}
				console.log(this.data);
			
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
</style>