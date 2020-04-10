<template>
	<view class="container">
		<view class="question">
			<view class='head'>
				<image class='user_avatar' src='../../static/20190502124614_awkne.jpg'></image>	
				<view class='intro'>
					<text class='user_name'>咔咔咔</text>
					<text class='user_position'>字节跳动·产品</text>
				</view>
				<view class="date">2019年09月09日</view>
			</view>
			
			<view class="attitude_content_detail">
				两年前CEO让CTO抽出各个团队的骨干组建一个精英团队，专门开发一款像钉钉一样牛掰但比钉钉更好用的产品现在全部开发所以说明说明说明说明。
			</view>
			
			<view class='attitude_like'>
				<view class='item'>
					<image class='like' src='../../static/article_details/like.png'></image>
					<text class='count'>46</text>
				</view>
				<view class='item'>
					<image class='attitude' src='../../static/article_details/attitude.png'></image>
					<text class='count'>9</text>
				</view>
			</view>
			
		</view>
		
		<view class='answer'>
			<view class='flex solid-bottom padding justify-start'>
				<text class='top_ans'>回复 · 142</text>
			</view>
			<view class='content'>
				<view class='reply_list'>
					<view class='head'>
						<image class='user_avatar' src='../../static/20190502124614_awkne.jpg'></image>	
						<view class='intro'>
							<text class='user_name'>咔咔咔回复@咔咔咔</text>
							<text class='attitude_content'>两年前CEO让CTO抽出各个团队的骨干组建一个精英团队，专门开发一款像钉钉一样牛掰但比钉钉更好用的产品现在全部开发所以说明说明说明说明。</text>
						</view>
						<view class='item'>
							<image style="height: 35rpx; width: 35rpx;" src='../../static/article_details/like.png'></image>
							<text class='count'>46</text>
						</view>
					</view>
					
					<view class='head'>
						<image class='user_avatar' src='../../static/20190502124614_awkne.jpg'></image>	
						<view class='intro'>
							<text class='user_name'>咔咔咔回复@咔咔咔</text>
							<text class='attitude_content'>两年前CEO让CTO抽出各个团队的骨干组建一个精英团队，专门开发一款像钉钉一样牛掰但比钉钉更好用的产品现在全部开发所以说明说明说明说明。</text>
						</view>
						<view class='item'>
							<image style="height: 35rpx; width: 35rpx;" src='../../static/article_details/like.png'></image>
							<text class='count'>46</text>
						</view>
					</view>
				</view>
				
			</view>
		</view>
			
		
		<view class='send-answer'>
			<view class="cu-bar search bg-white">
				<view class="search-form round">
					<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="留下你的看法" confirm-type="search"></input>
				</view>
				<view class="action">
					<button class="cu-btn bg-green shadow-blur round">发送</button>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		
		methods: {
			
		}
	}
</script>

<style>
	
	page{
		background-color: #FFFFFF;
	}
	.reply_list{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	
	.question{
		height: auto;
		background-color: #FFFFFF;
	}
	
	.head{
		display: flex;
		flex-direction: row;
		height:auto;
	}
	
	.user_avatar{
		border-radius:50%;
		height: 110rpx;
		width: 110rpx;
		margin-top: 20rpx;
		margin-left: 40rpx;
	}
	.intro{
		display: flex;
		flex-direction: column;
		margin-left: 30rpx;
		padding-top: 30rpx;
	}
	
	.user_name{
		font-size: 37rpx;
		font-weight: 600;
	}
	
	.user_position{
		font-size: 32rpx;
		color:#8799A3;
	}
	
	.date{
		color:#8799A3;
		font-size: 30rpx;
		margin-left: 150rpx;
		margin-top: 60rpx;
		
	}
	
	.attitude_content_detail{
		margin: 20rpx 0rpx 0rpx 20rpx;
		font-size: 32rpx;
		color: #8799A3;
	}
	
	.attitude_like{
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		margin-top: 40rpx;
		margin-top: 40rpx;
	}
	
	.item{
		display: flex;
		flex-direction: row;
		padding: 30rpx 20rpx 20rpx 0rpx;
	}
	
	.count{
		padding-left:10rpx;
		padding-top: 10rpx;
	}
	
	.attitude{
		height: 50rpx;
		width: 50rpx;
	}
	
	.like{
		height: 50rpx;
		width: 50rpx;
	}
	
	.answer{
		background-color: #FFFFFF;
		margin-top: 20rpx;
		height: auto ;
	}
	
	.top_ans{
		font-size: 37rpx;
	}
	
	.reply_list{
		margin:25rpx 25rpx 0rpx 25rpx;
		border-radius: 20rpx;
		background-color:#F1F1F1;
		
	}
	
	.attitude_content{
		font-size:30rpx;
		color:#8799A3 ;
		width: 450rpx;
		overflow: hidden;
		word-break: break-all;  /* break-all(允许在单词内换行。) */
		text-overflow: ellipsis;  /* 超出部分省略号 */
		display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 3; /** 显示的行数 **/
		
	}
	
	.send-answer{
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		height:100rpx;
		width: 100%;
		position: fixed;
		bottom: 0rpx;
		z-index: 1;
		background-color: #FFFFFF;
	}
	
	.cu-bar{
		height: 100rpx;
		width: 100%;
	}
	
	.cu-btn{
		background-color: #9C26B0;
		color: #FFFFFF;
	}
	.search-form{
		height: 30rpx;
		text-align: center;
	}
</style>
