<template>
	<view>
		<view class="top-image">
			<image class="offer" src="cloud://zygh-test-wn16v.7a79-zygh-test-wn16v-1301651483/title.jpg"></image>
		</view>
		
		<view>
			<button class="fab cu-btn bg-blue round shadow cuIcon-add" @tap="gotonew()"></button>
		</view>
		
		<view class="uni-list">
			<view v-for="(value,index) in listData" :key="index" @tap="gotoarticle(value.indexCode,value.title,value.articleType)">
				<!-- <navigator :url="'../article_details/article_details?id='+value._id"> -->
				<view class="list-body" >
					<view class="uni-media-list-text-top">来自话题：{{value.articleType}}</view>
					<view class="uni-media-list-text-center">{{value.title}}</view>
					<view class="uni-media-list-text-bottom">
						{{value.createTime.split(' ')[0]}}
						<!-- <image class='<user_avatar></user_avatar>' :src='value.user.avatarUrl' />
						<view>{{value.user.nickName}}</view> -->
					</view>	
				</view>
				<view class="line"></view>     
				<!-- </navigator> -->
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
            }
        },
		
  //       onShow:function(options){
			
		// 	let th=this;
			
		// 	wx.cloud.init()
		// 	const db = wx.cloud.database();
		// 	wx.cloud.callFunction({
		// 	  name:'article',
		// 	  data:{
		// 	    $url:'articleList',
		// 	  }
		// 	}).then(res => {
		// 		console.log(res.result);
		// 		th.listData=res.result.data; 
		// 	}).catch(err => {
		// 	  console.error(err) 
		// 	})
		// },
		onLoad: function(e) {
			let pageIndex = 1
			let pageSize = 5
			
			uni.request({
				url: `http://1.15.175.248:8005/article/list/${pageIndex}/${pageSize}`,
				method: 'GET',
				success: (res) => {
					console.log(res);
					this.listData = res.data.data.data
					console.log(this.listData);
				},
				fail: (err) => {
					console.log('failed',err);
				}
			})
		},
		
		
		
        methods: {
			gotoarticle:function(artId,title,type){
				uni.navigateTo({
					url:'/pages/list/article_details/article_details?artId='+artId
				})

				// wx.cloud.callFunction({
				// 	name:'myHistoryAdd',
				// 	data:{
				// 		foreign_id:artId,
				// 		type:'article',
				// 		data:{
				// 			title:title,
				// 			type:type,
				// 			Id:artId
				// 		}
				// 	}   
				// }).then(res =>{  
				// 	console.log(res)      
				// }).catch(err =>{
				// 	console.error(err) 
				// })
			},



			gotonew:function(){
				uni.navigateTo({
					url:'/pages/list/new_article/new_article'
				})
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
	
	.user_avatar{
		border-radius:50%;
		height: 110rpx;
		width: 110rpx;
		margin-top: 20rpx;
		margin-left: 40rpx;
	}
	
</style>
