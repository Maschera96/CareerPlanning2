<template>
	<view class="content">
		<view class="top-image">
			<image class="offer" src="../../static/TIM图片202003101605361.jpg"></image>
		</view>
		<view class="uni-list">
			<view v-for="(value,index) in listData" :key="index" @click="gotoarticle(value._id)">
				<!-- <navigator :url="'../article_details/article_details?id='+value._id"> -->
				<view class="list-body" >
					<view class="uni-media-list-text-top">来自话题：{{value.type}}</view>
					<view class="uni-media-list-text-center">{{value.title}}</view>
					<view class="uni-media-list-text-bottom">
						<view>{{value.article_follows_count}}收藏</view>
					</view>	
				</view>
				<view class="line"></view>     
				<!-- </navigator> -->
			</view>
		</view>
	</view>
</template>

<script>
 export default {
		
        data() {
            return {
                listData:[],
            }
        },
		
        onLoad:function(options){
			let th=this;
			
			/* th.setData({
			  artId:options.artId
			}) */
			
			wx.cloud.init()
			const db = wx.cloud.database();
			const _ = db.command;
			wx.cloud.callFunction({
			  name:'article',
			  data:{
			    $url:'articleList',
			  }
			}).then(res => {
				th.listData=res.result.data; 
				console.log(th.listData);
			}).catch(err => {
			  console.error(err)
			})
		},
		
        methods: {
			gotoarticle:function(artId){
				uni.navigateTo({
					url:'../article_details/article_details?artId='+artId
				})
			}
				     
        }
    };
</script>
<style>
	.content{
		background-color: #FFFFFF;
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
		height:2rpx;
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
		display: flex;
		justify-content: space-around;
	}
	
	.offer{
		border-radius: 15rpx 15rpx 15rpx 15rpx;
		height:280rpx;
		width: 730rpx;
	}
</style>
