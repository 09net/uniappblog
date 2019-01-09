<template>
    <view>
		
		<view class="uni-list">
					<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-if="data.user">
						<view class="uni-media-list">
							<view class="uni-media-list-logo">
								<image :src="bucketcdn+data.avatar+'_80'"></image>
							</view>
							<view class="uni-media-list-body">
								<text class="uni-media-list-text-top">{{data.user}}</text>
								<view class="uni-media-list-text-bottom uni-ellipsis">{{timestr(data.atime)}}
								<view class="uni-right"><uni-icon size="20" type="chatboxes-filled"></uni-icon>{{data.posts}}</view>
							</view>
							<video class="w100" v-if="data.vs" id="myVideo" :src="bucketcdn+data['vs']" @error="videoErrorCallback" controls></video>
							<image class="image-list3" v-if="source" :src="imgcdn+source" v-for="(source, i) in data.imglist"
									:key="i" />
							<rich-text :nodes="data.content"></rich-text>
						</view>
					</view>
				</view>		
    </view></view>	
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
			bucketcdn(){
				return ysv8set.bucketcdn;
			},
			imgcdn(){
				return ysv8set.imgcdn;
			}
        },
		components: {
			uniIcon
		},
        methods: {
			videoErrorCallback:function(e){},
			autotext:function(str){return ysv8set.langfun(str);},
			timestr:function(str){return ysv8set.timeStamp2String(str);},
            bindClick() {
                this.$emit('click');
            }
        }
    }
</script>

<style>
	.uni-comment-list{flex: 1;
	background-color:#F8F8F8;
	flex-direction: column;
	border-bottom-width: 1upx;
	border-bottom-style: solid;
	border-bottom-color: #c8c7cc;
	padding: 20upx 0;
	}
</style>
