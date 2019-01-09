<template>
	<view class="uni-padding-wrap uni-common-pb">
		<view class='imagesize'>
  <image src="../../static/qiwen.png" class='in-image'   >
  </image>
</view><view class="title c">天下奇闻异事大全</view>
		<view class="uni-hello-text uni-common-pb">
		天下奇闻异事大全:每日更新有趣的信息,世界奇闻怪谈、异事趣闻等等
		</view>
		<view class="uni-card">
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,key) in list" :key="key" @click="goDetailPage(item)">
					<view class="uni-list-cell-navigate uni-navigate-right"> {{item.name ? item.name : item}} </view>
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
				title: ysv8set.title,
				list:[
					{name:'浏览进入',url:'/pages/myweb/index'},
					{name:'专题',url:'/pages/myweb/s?fsize=e'},
					{name:'个人中心',url:'/pages/user/index'},
					{name:'收藏中心',url:'/pages/myweb/fav'},
					{name:'搜索中心',url:'/pages/myweb/s?fsize=s&fid=奇'},
					{name:'关于',url:'/pages/index/about'},
					
				]
			}
		},
		onLoad() {
		
		},
		onShareAppMessage() {
			return {
				title: this.title+'_YSV8简单网站',
				path: '/pages/index/index'
			}
		},
		
		methods: {

			goDetailPage(e) {
				
					uni.navigateTo({
						url: e.url
					})
			
			}
		}
	}
</script>

<style>

	.uni-card {
		box-shadow: none;
	}

	.uni-list:after {
		height: 0;
	}

	.uni-list:before {
		height: 0;
	}
	.content {
		text-align: center;
		height: 400upx;
	}
    .logo{
        height: 200upx;
        width: 200upx;
        margin-top: 200upx;
    }
	.title {
		font-size: 36upx;
		color: #333333;
	}
</style>
