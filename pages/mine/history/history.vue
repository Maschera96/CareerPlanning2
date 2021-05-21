<template>
	<view>
		<view class='delete' @tap="historydelete(e)">
			<button >删除</button>
		</view>
		
		<view class="uni-list">
			<view v-for="(value,index) in lists" :key="index" @tap="gotodetails(value.data.Id,value.type)">
				<view class="list-body" >
					<view class="uni-media-list-text-top">来自：{{value.type}}</view>
					<view class="uni-media-list-text-center">{{value.data.title}}</view>
					<view class="uni-media-list-text-bottom">
						<view>{{value.data.content}}</view>
					</view>	
				</view>
				<view class="line"></view>  
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lists:[],
				historyid:[],
			}
		},
		
		onLoad:function(e){
			
			wx.cloud.init()
			const db = wx.cloud.database();
			
			wx.cloud.callFunction({
			  name:'myHistoryList',
			}).then(res => {
				this.lists=res.result.data.data.reverse();
				for(let item of this.lists){
					this.historyid.push(item._id)
				}
			}).catch(err => {   
			  console.error(err)
			})
		},
	
		methods: {
			gotodetails:function(Id,type){
				if(type=='article'){
					uni.navigateTo({  
						url:'../article_details/article_details?artId='+Id
					})
				}else if(type=='job'){
					uni.navigateTo({
						url:'../position_details/position_details?job_id='+Id
					})   
				}else if(type=='company'){
					uni.navigateTo({
						url:'../company_details/company_details?company_id='+Id
					})
				}
			},
			      
			historydelete:function(e){
			    let id=this.historyid;
				wx.cloud.callFunction({   
				  name:'myHistoryDelete',
				  data:{
				   _id:id,
				  },
				  success:res=>{
					console.log(res)
					uni.showToast({
						title:'删除成功',
					})
					wx.cloud.callFunction({
						name:'myHistoryList',
					}).then(res =>{
						this.lists=res.result.data.data;
					})
				
				  },
   
				})
				
			}
		}
	}
</script>

<style>
	.uni-list{
		margin-top:rpx;
	}
	.list-body{
		height: 200rpx;  
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
		margin-top:20rpx;
	}
	.uni-media-list-text-center{
		height:auto;
		font-size: 32rpx;
		overflow: hidden;
		font-weight: 600;
		}
		
	.uni-media-list-text-bottom {
	    margin-top: 20rpx;
	    font-size:30rpx;
	    overflow: hidden;
	    word-break: break-all;  /* break-all(允许在单词内换行。) */
	    text-overflow: ellipsis;  /* 超出部分省略号 */
	    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	    -webkit-line-clamp: 1; /** 显示的行数 **/
	}
	
	.delete{
		z-index:1;
		position: fixed;
		height: 80rpx;
		width: 100%;
		bottom:0;
	}
	
</style>

