<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<uni-segmented-control :current="current" :values="items" v-on:clickItem="onClickItem" :styleType="styleType" :activeColor="activeColor"></uni-segmented-control>
		</view>
		<view class="content">
			<view v-show="current === 0">
				<block v-for="(newsitem,index2) in datalook" :key="index2">
						<media-list :data="newsitem"  @click="goDetail(newsitem)"></media-list>
				</block>
			</view>
			<view v-show="current === 1">
				<block v-for="(newsitem,index2) in datafav" :key="index2">
						<media-list :data="newsitem"  @click="goDetail(newsitem)"></media-list>
				</block>
			</view>
			<view v-show="current === 2">
				<block v-for="(newsitem,index2) in datacom" :key="index2">
						<media-list :data="newsitem"  @click="goDetail(newsitem)"></media-list>
				</block>
			</view>
		</view>
		
		
		
	
		
	</view>
</template>

<script>
	import ysv8set from '@/static/ysv8/index.js';
	import mask from '@/static/ysv8/myweb.js';
	import mediaList from '@/components/ysv8/bbslist.vue';
	import uniSegmentedControl from '@/components/uni-segmented-control.vue';
	export default {
		components: {
				mediaList,
				uniSegmentedControl
				},
		data() {
			return {
		title: ysv8set.title,
			datalook:[],
			datafav:[],
			datacom:[],
			items: [
				'历史',
				'收藏',
				'精华'
			],
			current: 0,
			activeColor: '#007aff',
			styleType: 'button'
			};
		},
		methods: {
			goDetail(e) {
					uni.navigateTo({
						  url: 't?id=' + e.id+"&website="+e.website
					})
			},
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
				}
			}
			},
		onLoad(e) {
		    mask.datalook.reverse();
			var setdataarray=ysv8set.setdata(mask.datalook, 'down',[], 0);
				if(ysv8set.isArray(setdataarray) ==true){
			this.datalook=setdataarray[0];
			}
			
			
			
			
			mask.datafav.reverse();
			var setdataarray=ysv8set.setdata(mask.datafav, 'down',[], 0);
				if(ysv8set.isArray(setdataarray) ==true){
			this.datafav=setdataarray[0];
			}
			
			
			
			mask.datacom.reverse();
			
				var setdataarray=ysv8set.setdata(mask.datacom, 'down',[], 0);
				if(ysv8set.isArray(setdataarray) ==true){
			this.datacom=setdataarray[0];
			}

			if(e.id){
				this.current=Number(e.id);
			}
			this.setNaivgationBarTitle(this.items[this.current]);
		
			
		},methods:{
			setNaivgationBarTitle: function (title) {this.title=title;uni.setNavigationBarTitle({title: title});},
			
		},onShareAppMessage() {
			return {
				title: this.title+'_YSV8简单网站',
				path: '/pages/index/index'
			}
		}
	}
</script>

<style>

</style>
