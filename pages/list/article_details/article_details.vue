<template>
	<view class="container">
		
		<view class='send-answer'>
			<view class="cu-bar search bg-white" >
				<view class="big">
					<text :class="article.isCollectedByCurrentUser?'cuIcon-likefill text-red':'cuIcon-like'" @tap="Collect()"></text>
				</view>
				<view class="search-form round">
					<input :focus="commentText" v-model='comment.content' type="text" placeholder="留下你的看法"></input> 
				</view>
				<view class="action">
					<button class="cu-btn bg-purple shadow-blur round" open-type="getUserInfo" @getuserinfo="submintComment">留言</button>
				</view> 
			</view>
		</view>
		
		<!-- 透明遮罩层 -->
		<view :class="commentText?'textShadow':''" @tap="changeText"></view>
		
		<view class="question">
			<view class='head'>
				<image class='user_avatar' :src='article.user.avatarUrl'></image>	
				<view class='intro'>
					<text class='user_name'>{{article.user.nickName}}</text>
					<!-- <text class='user_position'>{{articles.userInfo.company}}·{{articles.userInfo.department}}</text> -->
				</view>
				<view class="date">{{articles.date}}</view>
			</view>
			 
			<view class='art_title'>
				<text>{{article.title}}</text>
			</view>
			<view class='art_content'>
				<text>{{article.content}}</text>
			</view>    
			
			<view class='attitude_like'>
				<view class='item' @click="thumbsUp()">
					<text :class="isZanByCurrentUser?'cuIcon-appreciatefill text-red':'cuIcon-appreciate'" style="height: 50rpx; width: 50rpx; font-size: 50rpx;"></text>
					<text class='count'>{{article.zanCount}}</text>
				</view>
				<view class='item' @tap="toCommentInput()">
					<image class='attitude' src='../../static/article_details/attitude.png'></image>
					<text class='count'>{{article.commentCount}}</text>
				</view>
			</view>	
		</view>
		
		<!-- 评论区 -->
		<view class='answer'>
			<view class="solids"></view>
			<view class='flex solid-top padding justify-start'>
				<text class='top_ans'>留言</text>
			</view>
			
			<view v-for="(value,index) in commitcontent.data" :key = "index" class="cu-list menu-avatar comment head">
				<image class='user_avatar' :src="value.user.avatarUrl"></image>	
				<view class='intro'>
					<text class='user_name'>{{value.user.nickName}}</text>
					<text class='attitude_content'>{{value.content}}</text>
				</view> 
				<view class='item'>
					<image class='like' src='../../static/article_details/like.png'></image>
					<!-- <text class='count'>46</text> -->
				</view>
			</view>
		</view>   
		
		<!-- 滚动到底 -->
		<view class="mybottom" id="j_page"></view>
		
	</view>
</template>

<script> 
	export default {
		data() {
		    return {
				article: {},
				artId: null,
				status: false,
				commitcontent: {},
				comment: {
					content: null,
					userOpenId: null,
					articleIndexCode: null
				}
		    }
		},
		
		onLoad:function(option){
			this.artId = option.artId
			wx.getStorage({
				key: 'openId',
			}).then((res) => {
				// res.data = 'test001'
				console.log('当前用户为',res.data);
				uni.request({
					url: 'http://1.15.175.248:8005/article/get/'+ this.artId + '/' + res.data,
					success: (res) => {
						console.log(res.data.code);
						console.log(res);
						if(res.data.code === -1){
							this.status = false
						}else{
							this.status = true
							this.article = res.data.data
						}
					}
				})
				uni.request({
					url: 'http://1.15.175.248:8005/comment/list/'+ this.artId + '/1/5',
					success: (res) => {
						console.log(res.data.code);
						console.log(res);
						if(res.data.code === -1){
							this.status = false
						}else{
							this.status = true
							this.commitcontent = res.data.data
						}
					}
				})
			})
			// wx.cloud.init()
			// const db = wx.cloud.database();
			// const _ = db.command;
			
			// this.artId=option.artId
			// //获取数据
		 //    wx.cloud.callFunction({
			// 	name:'article',
			// 	data: {
			// 		$url:'artDetail',
			// 		other: {
			// 			id:this.artId,
			// 		}
			// 	}
		 //    }).then(res => {
			// 	console.log(res);
			// 	this.articles = res.result.data
			// 	this.thumbsNumber = res.result.data.thumbsUp.length
		 //    }).catch(err => {
			// 	console.error(err)
		 //    }),
			// //查询是否收藏
			// wx.cloud.callFunction({
			//     name:'article',
			//     data:{
			//         $url:'queryfollow',
			//         other:{
			// 			id:this.artId
			//         }
			//     }
			// }).then(res => {
			// 	if (res.result.data.followed == "1"){
			// 		this.collect = true
			// 	}else{
			// 		this.collect = false
			// 	}
			// }).catch(err => {
			// 	console.error(err)
			// }),
			// //查询是否点赞
			// wx.cloud.callFunction({
			//       name:'article',
			//       data:{
			//         $url:'queryThumbsUp',
			//         other:{
			//           id:this.artId
			//         }
			//       }
			//     }).then(res => {
			// 		this.thumbsNumber = res.result.data.thumbsUped
			// 	  if(res.result.data.thumbsUped == '1'){
			// 		  this.thumbs = true
			// 	  }else{
			// 		  this.thumbs = false
			// 	  }
			//     }).catch(err => {
			//       console.error(err)
			//     })
			// //渲染评论
			// wx.cloud.callFunction({
			//      name:'articleCompents',
			//      data: {
			//        articleId:this.artId,
			//      }
			//    }).then(res => {
			// 	   this.commitcontent = res.result.data
			//    });
			
		},
		
		
		methods: {
			//收藏
			Collect() {
				// this.collect = !this.collect
				// //若还未收藏
				// let th = this
				if (this.article.isCollectedByCurrentUser == false){
					wx.getStorage({
						key: 'openId',
					}).then((res) => {
						// res.data = 'test001'
						console.log('当前用户为',res.data);
						uni.request({
							url: 'http://1.15.175.248:8005/article/collect/'+ this.artId + '/' + res.data,
							success: (res) => {
								console.log(res.data.code);
								console.log(res);
								if(res.data.code === -1){
									this.status = false
								}else{
									this.status = true
								}
							}
						})
					})
					// wx.cloud.callFunction({
					// 	name: 'article',
					// 	data: {
					// 		$url: 'followArt',
					// 		other: {
					// 			id: this.artId,
					// 			nickName:'biboer2',
					// 			avatarUrl:'https:image.com'
					// 		}
					// 	}
					// }).then(res =>{
					// 	wx.showToast({
					// 		title: '收藏成功',
					// 	})
					// }).catch(err => {
					// 	console.error(err)
					// })
				//若已收藏
				}else{
					wx.getStorage({
						key: 'openId',
					}).then((res) => {
						// res.data = 'test001'
						console.log('当前用户为',res.data);
						uni.request({
							url: 'http://1.15.175.248:8005/article/cancel_collect/'+ this.artId + '/' + res.data,
							success: (res) => {
								console.log(res.data.code);
								console.log(res);
								if(res.data.code === -1){
									this.status = false
								}else{
									this.status = true
								}
							}
						})
					})
					// wx.cloud.callFunction({
					// 	name:'article',
					// 	data: {
					// 		$url:'resetfollow',
					// 		other:{
					// 		id:this.artId,
					// 		}
					// 	}
					// }).then(res => {
					// 	wx.showToast({
					// 		title: '已取消收藏',
					// 	})
					// }).catch(err => {
					// 	console.error(err)
					// })
				}
			},
			//发布评论
			submintComment:function(e){
				//检查是否授权
				this.nickName = e.detail.userInfo.nickName
				this.avatarUrl = e.detail.userInfo.avatarUrl
				
				if(this.comment.content){
					wx.getStorage({
						key: 'openId',
					}).then((res) => {
						// res.data = 'test001'
						console.log('当前用户为',res.data);
						this.comment.userOpenId = res.data
						this.comment.articleIndexCode = this.artId;
						uni.request({
							url: 'http://1.15.175.248:8005/comment/add/',
							method: 'POST',
							data: this.comment,
							header: {
								'Content-Type': 'application/json'
							},
							success: (res) => {
								console.log(res.data.code);
								console.log(res);
								if(res.data.code === -1){
									this.status = false
								}else{
									this.status = true
								}
							}
						})
					})
					// wx.cloud.callFunction({
					// 	name:'articleReview',
					// 	data: {
					// 		content:this.comment,
					// 		date:new Date(),
					// 		articleId:this.artId,
					// 		sender: {
					// 			avatarUrl: this.avatarUrl,
					// 			nickName: this.nickName,
					// 		}
					// 	}
					// }).then(res => {
					// 	wx.showToast({
					// 		title: '评论成功',
					// 	}),
					// 	this.comment = ''
					// 	//重新渲染一次评论
					// 	wx.cloud.callFunction({
					// 		name:'articleCompents',
					// 		data: {
					// 			articleId:this.artId,
					// 	    }
					// 	}).then(res => {
					// 		this.commitcontent = res.result.data
					// 	});
					// })
					// .catch(err => {
					// 	console.error(err)
					// })
					//页面滚动
					wx.createSelectorQuery().select('#j_page').boundingClientRect(function(rect){
						console.log(rect);
						wx.pageScrollTo({
							scrollTop: rect.bottom + 6000
						})
					}).exec()
				}else{
					wx.showToast({
						icon: 'none',
						title: '留言内容不能为空',
					})
				}
			},
			//点赞 
			thumbsUp() {   
				// this.thumbs = !this.thumbs
				// //若还未点赞
				// let th = this
				if(this.article.isZanByCurrentUser == false){
					wx.getStorage({
						key: 'openId',
					}).then((res) => {
						// res.data = 'test001'
						console.log('当前用户为',res.data);
						uni.request({
							url: 'http://1.15.175.248:8005/article/zan/'+ this.artId + '/' + res.data,
							success: (res) => {
								console.log(res.data.code);
								console.log(res);
								if(res.data.code === -1){
									this.status = false
								}else{
									this.status = true
								}
							}
						})
					})
					// wx.cloud.callFunction({     
					// 	name:'article',//云函数名     
					// 	data: {       
					// 		$url:'thumbsUp',//接口路由       
					// 		other:{         
					// 			nickName: this.nickName,//用户昵称         
					// 			avatarUrl: this.avatarUrl,//用户头像         
					// 			id: this.artId//文章id       
					// 		}    
					// 	}   
					// }).then(res => {
					// 	this.thumbsNumber ++
					// 	wx.showToast({
					// 		title: '点赞成功',
					// 	})
					// })
					// .catch(err => {console.log(err)}) 
				//若已点赞
				}else{
					wx.getStorage({
						key: 'openId',
					}).then((res) => {
						// res.data = 'test001'
						console.log('当前用户为',res.data);
						uni.request({
							url: 'http://1.15.175.248:8005/article/cancel_zan/'+ this.artId + '/' + res.data,
							success: (res) => {
								console.log(res.data.code);
								console.log(res);
								if(res.data.code === -1){
									this.status = false
								}else{
									this.status = true
								}
							}
						})
					})
					// wx.cloud.callFunction({
					// 	name:'article',
					// 	data: {
					// 		$url:'resetThumbsUp',
					// 		other:{
					// 			id: this.artId,//文章id
					// 		}
					// 	}
					// }).then(res => {
					// 	this.thumbsNumber --
					// 	wx.showToast({
					// 		title: '取消点赞',
					// 	})
					// }).catch(err => {
					// 	console.error(err)
					// })
				}
			},
			toCommentInput(){
				this.commentText = true
			},
			changeText(){
				this.commentText = false
			}
		}
	}
</script>

<style>	
	.mybottom{
		height: 120rpx;
	}
	
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
		margin-top: 20rpx;
		margin-bottom: 30rpx;
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
		margin-left: 40rpx;
		padding-top: 30rpx;
		width: 380rpx;
	}
	
	.user_name{
		font-size: 41rpx;
		font-weight: 600;
	}
	
	.user_position{
		font-size: 32rpx;
		color:#8799A3;
	}
	
	.date{
		color:#8799A3;
		font-size: 30rpx;
		margin-top: 60rpx;
		
	}
	
	.art_title{
		font-size: 40rpx;
		margin: 50rpx 30rpx 0rpx 30rpx;
		font-weight: 600;
		text-align: justify; 
	}
	
	.art_content{
		margin: 40rpx 30rpx 0rpx 30rpx;
		font-size: 32rpx;
		text-align: justify; 
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
		padding: 15rpx 20rpx 20rpx 0rpx;
	}
	
	.count{
		font-size:30rpx;
		padding-left:30rpx;
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
		/* margin-bottom: 120rpx; */
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
		z-index: 2;
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
	
	.big{
		margin: 1upx 0upx 1upx 40upx;
		justify-content: space-between;
		font-size: 70rpx;
	}
	
	.textShadow{
		height: 100%;
		width: 100%;
		position: fixed;
		z-index: 1;
	}
</style>

