<template>
	<view class="container">
		<view class="question">
			<view class='head'>
				<image class='user_avatar' src='../../static/20190502124614_awkne.jpg'></image>	
				<view class='intro'>
					<text class='user_name'>{{articles.user_name}}</text>
					<text class='user_position'>字节跳动·产品</text>
				</view>
				<view class="date">{{articles.date}}</view>
			</view>
			 
			<view class='art_title'>{{articles.title}}</view>
			<view class='art_content'>{{articles.content}}</view>    
			
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
				<text class='top_ans'>留言 · 142</text>
			</view>
			<navigator url="../attitude/attitude">
				<view class="cu-list menu-avatar comment solids-top">
					<view class='head' >
						<image class='user_avatar' src='../../static/20190502124614_awkne.jpg'></image>	
						<view class='intro'>
							<text class='user_name'>咔咔咔</text>
							<text class='attitude_content'>两年前CEO让CTO抽出各个团队的骨干组建一个精英团队，专门开发一款像钉钉一样牛掰但比钉钉更好用的产品现在全部开发所以说明说明说明说明。</text>
							<view class='reply'>
								<view class='reply_item'>
									<text>咔咔咔回复@咔咔咔：</text>
									<text>作为程序员，实在是太难了</text>
								</view>
								<view class='reply_item'>
									<text>咔咔咔回复@咔咔咔：</text>
									<text>同意！</text>
								</view>
							</view>
						</view> 
						<view class='item'>
							<image class='like' src='../../static/article_details/like.png'></image>
							<text class='count'>46</text>
						</view>
					</view>
				</view>
			</navigator>
			
		</view>   
		
		<view class='send-answer'>
			<view class="cu-bar search bg-white" >
				<view class="search-form round">
					<input v-model='commitcontent' type="text" placeholder="留下你的看法"></input>
				</view>
				<view class="action" @click="commitComments()">
					<button class="cu-btn bg-green shadow-blur round">发送</button>
				</view> 
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
		    return {	
				articles:{
					user_name:'',
					content:'',
					date:'',
					title:''
				},
		
				commitcontent:'',
				
		    }
		},
		
		onLoad:function(option){
			let th=this;
			wx.cloud.init()
			const db = wx.cloud.database();
			const _ = db.command;
			
			var artId=option.artId
			console.log(artId)
			
		    wx.cloud.callFunction({
			  name:'article',
			  data: {
			    $url:'artDetail',
			    other: {
				  id:artId
			    }
			  }
		    }).then(res => {
			  th.articles.user_name=res.result.data.user_name;
			  th.articles.content=res.result.data.content;
			  th.articles.date=res.result.data.date;
			  th.articles.title=res.result.data.title;
			  console.log(th.articles);
		    }).catch(err => {
			  console.error(err)
		    })
			
				
		},
		
		
		methods: {
			commitComments:function(){
				let content=this.commitcontent;
				const date = new Date();
				wx.cloud.callFunction({
					name:'article',
					data: {
					  $url:'publishArticle',
					  other: {
						user_name:'puber',
						user_avatar:'this is a imgurl',
						title:'ceshititle1',
						content:content,
						type:'ceshitype1',
						date:date
					  }
					}
				  }).then(res => {
					console.log(res)
					console.log(content);
					console.log(date);
				  }).catch(err => {
					console.error(err)
				  })
			}
		}
	}
</script>

<style>
	
	.reply_item{
		margin: 10rpx 10rpx 10rpx 10rpx ;
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
	
	.art_title{
		font-size: 40rpx;
		margin: 20rpx 10rpx 0rpx 20rpx;
		font-weight: 600;
	}
	
	.art_content{
		margin: 20rpx 20rpx 0rpx 20rpx;
		font-size: 32rpx;
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
	
	.reply{
		width:450rpx;
		background-color:#F0F0F0;
		border-radius: 20rpx;
		height: 150rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content:space-around;
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
	
	.search-form{
		height: 30rpx;
		text-align: center;
	}
</style>

