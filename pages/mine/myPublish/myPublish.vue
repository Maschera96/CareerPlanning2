<template>
	<view>
		<!-- 导航栏 -->
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub text-blue cur">
					文章
				</view>
			</view>
		</scroll-view>
		
		<!-- 列表 -->
		<view v-for="(item,index) in articleList" :key="index" @tap="gotoArticle(item.indexCode)">
			<view class="item">
				<view class="title">{{item.title}}</view>
				<view class="content">
					<!-- <view class="time">{{item.createTime}}</view> -->
					<view class="type">来自话题：{{item.articleType}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				articlePage: 1,
				articleList: [],
				openId: ''
			}
		},
		
		onLoad:async function(e){
			let res = await wx.getStorage({
				key: 'openId'
			})
			this.openId = res.data
			this.reqArticle()
		}, 
	
		methods: {
			reqArticle: function (){
				uni.request({
					url: `http://1.15.175.248:8006/my_publish/list/${this.openId}/${this.articlePage}/20`,
					success: (res) => {
						console.log(res.data.data.data);
						this.articleList = this.articleList.concat(res.data.data.data)
					}
				})
			},
			gotoArticle: function(indexCode){
				uni.navigateTo({
					url:'/pages/list/article_details/article_details?artId='+indexCode
				})
			}
		}
	}
</script>

<style>
	.item{
		width: 90%;
		margin: 30rpx auto;
		border-radius: 30rpx;
		box-shadow: 0rpx 3rpx 15rpx #e6e6e6;
		padding: 30rpx;
		display: flex;
		flex-direction: column;
	}
	
	.title{
		font-size: 30rpx;
		font-weight: 600;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.content{
		margin-top: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	
	.time{}
	
	.type{}
</style>

