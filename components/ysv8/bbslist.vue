<template>
    <view>
        <view class="list-cell" hover-class="uni-list-cell-hover" @click="bindClick">
            <view class="media-list" v-if="data.title">
                <view :class="[isImgRight?'media-image-right':'',isImgLeft?'media-image-left':'']">
                    <rich-text :class="['media-title',isImgRight||isImgLeft?'media-title2':'']" :nodes="data.title"></rich-text>

										
										
                    <view v-if="showImg" :class="['image-section',isImgRight?'image-section-right':'',isImgLeft?'image-section-left':'']">
                       
					   <template v-if="data['vs']!=''">
						   <image :class="['image-list1',isImgRight||isImgLeft?'image-list2':'']" v-if="data['vs'].indexOf('.mp3')>0"
						   	src="/static/mp3.png"></image>
						   <image :class="['image-list1',isImgRight||isImgLeft?'image-list2':'']" v-else
						   :src="bucketcdn+data['vs']+'?x-oss-process=video/snapshot,t_1000,w_150,h_150,f_jpg,m_fast'"></image>
						  </template> 
						  <template v-else>
					   
					   
						<image :class="['image-list1',isImgRight||isImgLeft?'image-list2':'']" v-if="data.img"
                            :src="bucketcdn+data['img']+'_180'"></image>
                        <image class="image-list3" v-if="data.image_list" :src="source.url" v-for="(source, i) in data.image_list"
                            :key="i" />
							</template>

                    </view>
                </view>
                <view class="media-foot">
                    <view class="media-info">
                        <text class="info-text">{{data.user}}</text>
                        <text class="info-text">{{data.posts}}条评论</text>
                        <text class="info-text">{{timestr(data.btime)}}</text>
                    </view>
                   
					<view class="max-close-view">
					<uni-icon v-if="data['mode']=='2'" size="30" type="download" style="color:#FF0000"></uni-icon>
					<template v-else>
					<uni-icon v-if="data['mode']=='3'" size="30" type="videocam" style="color:#FF0000"></uni-icon>
					</template>
					                        </view>
					                    </view>


                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
	import ysv8set from '@/static/ysv8/index.js';
	import uniIcon from '@/components/uni-icon.vue'
    export default {
        props: {
            data: {
                type: Object,
                default: function(e) {
                    return {}
                }
            }
        },
        computed: {
            isImgRight() {
               if(this.data['img']) return true
                 return false
            },
            isImgLeft() {
				if(this.data['vs']) return true
                return false
            },
            showImg() {
				if(this.data['vs'] || this.data['img']) return true;
                return false;
            },
			bucketcdn(){
				return ysv8set.bucketcdn;
			}
        },
		components: {
			uniIcon
		},
        methods: {
			autotext:function(str){return ysv8set.langfun(str);},
			timestr:function(str){return ysv8set.timeStamp2String(str);},
            bindClick() {
                this.$emit('click');
            }
        }
    }
</script>

<style>
    view {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
    }

    .list-cell {
        width: 750upx;
        padding: 0 30upx;
    }

    .uni-list-cell-hover {
        background-color: #eeeeee;
    }

    .media-list {
        flex: 1;
        flex-direction: column;
        border-bottom-width: 1upx;
        border-bottom-style: solid;
        border-bottom-color: #c8c7cc;
        padding: 20upx 0;
    }

    .media-image-right {
        flex-direction: row;
    }

    .media-image-left {
        flex-direction: row-reverse;
    }

    .media-title {
        flex: 1;
    }

    .media-title {
        lines: 3;
        text-overflow: ellipsis;
        font-size: 32upx;
        color: #555555;
    }

    .media-title2 {
        flex: 1;
        margin-top: 6upx;
        line-height: 40upx;
    }

    .image-section {
        margin-top: 20upx;
        flex-direction: row;
        justify-content: space-between;
    }

    .image-section-right {
        margin-top: 0upx;
        margin-left: 10upx;
        width: 225upx;
        height: 146upx;
    }

    .image-section-left {
        margin-top: 0upx;
        margin-right: 10upx;
        width: 225upx;
        height: 146upx;
    }

    .image-list1 {
        width: 690upx;
        height: 481upx;
    }

    .image-list2 {
        width: 225upx;
        height: 146upx;
    }

    .image-list3 {
        width: 225upx;
        height: 146upx;
    }

    .media-info {
        flex-direction: row;
    }

    .info-text {
        margin-right: 20upx;
        color: #999999;
        font-size: 24upx;
    }

    .media-foot {
        margin-top: 20upx;
        flex-direction: row;
        justify-content: space-between;
    }

    .max-close-view {
        align-items: center;
        justify-content: flex-end;
        flex-direction: row;
        height: 40upx;
        width: 80upx;
    }

    .close-view {
        border-style: solid;
        border-width: 1px;
        border-color: #999999;
        border-radius: 10upx;
        justify-content: center;
        height: 30upx;
        width: 40upx;
        line-height: 30upx;
    }

    .close {
        text-align: center;
        color: #999999;
        font-size: 28upx;
    }
</style>
