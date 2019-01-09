<template>
    <view class="uni-tab-bar">
        <scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
            <view v-for="(tab,index) in tabBars" :key="tab.id" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']"
                :id="'div'+tab.id" :data-current="index" @tap="tapTab">{{tab.name}}</view>
        </scroll-view>
        <swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
            <swiper-item v-for="(tab,index1) in newsitems" :key="index1">
                <scroll-view class="list" scroll-y @scrolltolower="loadMore(index1)">
                    <block v-for="(newsitem,index2) in tab.data" :key="index2">
                        <media-list :data="newsitem" @close="close(index1,index2)" @click="goDetail(newsitem)"></media-list>
                    </block>
					<view class="uni-tab-bar-loading">
						<uni-load-more :loadingType="tab.loadingType" :contentText="loadingText"></uni-load-more>
					</view>
                </scroll-view>
            </swiper-item>
        </swiper>
				
				<uni-drawer :visible="rightDrawerVisible" mode="right" @close="closeRightDrawer" v-bind:website="website">
					
				</uni-drawer>
	
		<view class="foot"><view class="row"><view class="col">
	       <view class="col_20" @tap="buttonbar('index?mode=0',false)"><view class="uni-tabbar__bd"><view class="uni-tabbar__label" :class="mode=='0'?'tar_active':'tar_no'">
           <uni-icon size="25" type="home"></uni-icon>
        </view><!----></view></view><view class="col_20" @tap="buttonbar('index?mode=1',false)"><view class="uni-tabbar__bd"><view class="uni-tabbar__label" :class="mode=='1'?'tar_active':'tar_no'">
         <uni-icon size="25" type="image"></uni-icon>
        </view><!----></view></view><view class="col_20" @tap="buttonbar('index?mode=2',false)"><view class="uni-tabbar__bd"><view class="uni-tabbar__label" :class="mode=='2'?'tar_active':'tar_no'">
         <uni-icon size="25" type="download"></uni-icon>
        </view><!----></view></view><view class="col_20" @tap="buttonbar('index?mode=3',false)"><view class="uni-tabbar__bd"><view class="uni-tabbar__label" :class="mode=='3'?'tar_active':'tar_no'">
          <uni-icon size="25" type="videocam"></uni-icon>
        </view><!----></view></view><view class="col_20" @tap="openright()"><view class="uni-tabbar__bd"><view class="uni-tabbar__label" :class="mode=='3'?'tar_active':'tar_no'">
        <uni-icon size="25" type="more-filled"></uni-icon>
        </view><!----></view></view></view></view></view></view>
				
				
				
    </view>
</template>
<script>
    import ysv8set from '@/static/ysv8/index.js';
    import mediaList from '@/components/ysv8/bbslist.vue';
		import uniDrawer from '@/components/uni-drawer.vue';
	import uniLoadMore from '@/components/uni-load-more.vue';
	import uniIcon from '@/components/uni-icon.vue'
    export default {
        components: {
            mediaList,
						uniDrawer,
			uniLoadMore,uniIcon
        },onNavigationBarButtonTap(e) {
			this.rightDrawerVisible = !this.rightDrawerVisible
		},
        data() {
            return {
				title: ysv8set.title,
				rightDrawerVisible: false,
				showImg: false,
				loadingText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				ajaxi:true,
                scrollLeft: 0,
                isClickChange: false,
                tabIndex: 1,
                newsitems: [],
				imgcdn:ysv8set.imgcdn,
				bucketcdn:ysv8set.bucketcdn,
				active:'index',
				method:'index',
				mode:0,
				website:ysv8set.website,/*默认简单网站*/
				www:ysv8set.www,
        tabBars: [{name:'精华',id:'topall'},{name:'综合',id:'index'}]
            }
        },onShareAppMessage() {
			return {
				title: this.title+'_YSV8简单网站',
				path: '/pages/myweb/index'
			}
		},
        onLoad: function(e) {
			if(e.mode){
				this.mode=e.mode;
			}
					if(e.website){
						this.website=e.website;
						
					}
					this.www='https://'+this.website+'.44api.com/'
					this.newsitems = this.randomfn()
					
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
			setNaivgationBarTitle: function (title) {this.title=title;uni.setNavigationBarTitle({title: title});},
			gonav(e){this.rightDrawerVisible = false;uni.navigateTo({url: '/pages/' + e})},
			gonav2(e){this.rightDrawerVisible = false;uni.navigateTo({url: e + '?website='+this.website})},
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
            loadMore(e) {
            	setTimeout(() => {
            		this.getlist();
            	}, 500);
            },
			
				getlist:function(){
				var	e=this.tabIndex
				if (this.newsitems[e].loadingType !== 0) {return;}
				this.newsitems[e].loadingType = 1;
				this.ajaxi++;
				if(ysv8set.isNumber(this.tabBars[e].id)){this.active='blog/f';}else{this.active='index';}
				
				
				uni.request({
				method:'POST',
								url: this.www+this.active+'/'+this.tabBars[e].id+'/'+this.mode+'/'+this.newsitems[e].pagtime+'.api?upuid='+ysv8set.upuid,
							data: {
								YSV8_HEX: ysv8set.ysv8hex
							},
							success: (res) => {
								var data=res.data;
				if('bucketcdn'  in data){ this.bucketcdn=data['bucketcdn']; ysv8set.localStorage.setItem("bucketcdn",data['bucketcdn'])}
				if('imgcdn'  in data){ this.imgcdn=data['imgcdn'];ysv8set.localStorage.setItem("imgcdn",data['imgcdn'])}
				if('title'  in data){this.setNaivgationBarTitle(data['title']);}
				if('forum'  in data && this.ajaxi){data['forum'].unshift({name:'精华',id:'topall'},{name:'综合',id:'index'});
				data['forum']=ysv8set.forum(data['forum']);
				this.tabBars=data['forum'];this.ajaxi=false; this.randomfn() }
				var setdataarray=ysv8set.setdata(data['data'], 'down', this.newsitems[e].data, this.newsitems[e].pagtime);
					if(ysv8set.isArray(setdataarray) ==true){
				this.newsitems[e].data=setdataarray[0];
				this.newsitems[e].pagtime=setdataarray[1];
				}
			
				setTimeout(() => {
								if (setdataarray[2]<10) {
							
									this.newsitems[e].loadingType = 2;
				
									return;
								}
								this.newsitems[e].loadingType = 0;

							}, 500);		
							},
							fail: (err) => {
								uni.showModal({content:'网络故障',showCancel:false})
								this.newsitems[e].loadingType = 0;
							},
							complete:()=> {
							
							}
						})
				},
            async changeTab(e) {
                let index = e.target.current;

                if (this.isClickChange) {
                    this.tabIndex = index;
                    this.isClickChange = false;
                    return;
                }
                let tabBar = await this.getElSize("tab-bar"),
                    tabBarScrollLeft = tabBar?tabBar.scrollLeft:tabBarScrollLeft;
                let width = 0;

                for (let i = 0; i < index; i++) {
                    let result = await this.getElSize(this.tabBars[i].id);
                    if(result && 'width' in result){width += result.width;}
                }
                let winWidth = uni.getSystemInfoSync().windowWidth,
                    nowElement = await this.getElSize(this.tabBars[index].id),
                    nowWidth = nowElement.width;
                if (width + nowWidth - tabBarScrollLeft > winWidth) {
                    this.scrollLeft = width + nowWidth - winWidth;
                }
                if (width < tabBarScrollLeft) {
                    this.scrollLeft = width;
                }
                this.isClickChange = false;
                this.tabIndex = index; //一旦访问data就会出问题
setTimeout(() => {
this.getlist();
},400);
            },
            getElSize(id) { //得到元素的size
                return new Promise((res, rej) => {
                    uni.createSelectorQuery().select("#div" + id).fields({
                        size: true,
                        scrollOffset: true
                    }, (data) => {
                        res(data);
                    }).exec();
                })
            },
            async tapTab(e) { //点击tab-bar
                if (this.tabIndex === e.target.dataset.current) {
                    return false;
                } else {
                    let tabBar = await this.getElSize("tab-bar"),
					 tabBarScrollLeft = tabBar?tabBar.scrollLeft:tabBarScrollLeft;
                    this.scrollLeft = tabBarScrollLeft;
                    this.isClickChange = true;
                    this.tabIndex = e.target.dataset.current
                }
								
setTimeout(() => {
this.getlist();
},400);
            },
            randomfn() {
							let ary = [];

							for (let i = 0, length = 50; i < length; i++) {/*最多显示30个栏目*/
	
								ary.push({
									loadingType : 0,
									data: [],
									pagtime:0
								});
							}
							return ary;
							

                
            }
        }
    }
</script>

<style>
.tar_active{
	color: rgb(0, 122, 255); 
}
.tar_no{
	color: rgb(122, 126, 131);
}
.uni-tabbar__icon{display:flex; 
 justify-content: center; 
 }
.uni-tabbar__icon image{ width: 60upx; height: 60upx;}
.foot {
	padding-top: 10upx;
	width: 100%;
	position: fixed;
	bottom: 0px;
	background-color: #FFFFFF;
	z-index: 999;
	text-align: center;
}
.swiper-box{padding-bottom: 80upx;}
</style>