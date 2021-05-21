<template>
	<view>
		<view class="top-image">
			<image class="offer" src="cloud://zygh-test-wn16v.7a79-zygh-test-wn16v-1301651483/title.jpg"></image>
		</view>
		
		<view class="cu-list">
			<view class="cu-item" v-for="(value,index) in listData" :key="index" :class="modalName=='move-box-'+ index?'move-cur':''" @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index">
				<!-- <navigator :url="'../article_details/article_details?id='+value._id"> -->
					<view class="move">
						<!-- <view class="bg-grey">置顶</view> -->
						<view class="bg-red">删除</view>
					</view>
				<view style="display: inline-block" @tap="gotoarticle(value._id)">
					<view class="list-body" >
						<view class="uni-media-list-text-top">来自话题：{{value.type}}</view>
						<view class="uni-media-list-text-center">{{value.title}}</view>
						<view class="uni-media-list-text-bottom">
							<view>{{value}}收藏</view>
						</view>	
					</view>
				</view>
				<view class="line"></view>     
			</view>
		</view>
		
		<view id="j_page" class="mybottom"></view>
	</view> 
</template>

<script>
 export default {
		
        data() {
            return {
                listData:[],
				modalName: null,
				listTouchStart: 0,
				listTouchDirection: null,
            }
        },
		
        onLoad:function(options){
			
			let th=this;
			
			wx.cloud.init()
			const db = wx.cloud.database();
			wx.cloud.callFunction({
			    name:'article',
			    data: {
					$url:'myArticles',
			    }
			}).then(res =>{
				console.log(res)
				th.listData = res.result.data
			})
			.catch(err => console.error(err))
			
			// wx.cloud.callFunction({
			//   name:'article',
			//   data:{
			//     $url:'articleList',
			//   }
			// }).then(res => {
			// 	console.log(res.result);
			// 	th.listData=res.result.data; 
			// }).catch(err => {
			//   console.error(err) 
			// })
		},
		
		
		
        methods: {
			gotoarticle:function(artId){
				uni.navigateTo({
					url:'../article_details/article_details?artId='+artId
				})
			},
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},
			
			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},
			
			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					console.log('这里！');
					console.log(e.currentTarget.dataset);
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			},
        }
    };
</script>
<style>
	.mybottom{
		height: 1rpx;
		bottom: 0rpx;
	}
	.uni-list{
		margin-top: 30rpx;
	}
	.list-body{
		height: 210rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		margin-top: 10rpx;
	}
	.line{
		height:3rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		border-width: 0rpx;
		background-color:#DDDDDD;
		
	}
	
    .uni-media-list-text-top {
        height:60rpx;
		width:588rpx;
        font-size: 32upx;
        overflow: hidden;
		margin-top: 40rpx;
    }
	.uni-media-list-text-center{
		height:80rpx;
		font-size: 32rpx;
		overflow: hidden;
		font-weight: 600;
		}
		
    .uni-media-list-text-bottom {
        display: flex;
        flex-direction: row;
		margin-top:15rpx;
    }
	
	.answer-count{
		margin-left: 20rpx;
	}
	
	.top-image{
		width: 700rpx;
		margin-top: 20rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 30rpx;	
	}
	
	.offer{
		border-radius: 15rpx 15rpx 15rpx 15rpx;
		height:280rpx;
		width: 730rpx;
	}
	
	.fab{
		position: fixed;
		width:100rpx;
		height:100rpx;
		bottom: 90rpx;
		right: 60rpx;
		font-size: 50rpx;
	}
	
</style>
