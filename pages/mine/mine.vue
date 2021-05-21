<template>
	<!-- 总体 -->
	<view class="cul">
		
		<!-- 头部信息层 -->
		<view class="bg-blue text-left shadow-blur" style="padding-bottom: 150rpx;">
			<view class="ro top">
				<view class="avatar round">
				    <!-- <view class="cu-tag badge cuIcon-male bg-blue" style=" width: 40%; height:40%;
					font-size: 25upx; font-weight: 500;"> -->
						<open-data type="userAvatarUrl" class="round" style="overflow: hidden;"></open-data>
						<view class="tag badge cuIcon-male bg-blue"></view>
					<!-- </view> -->
				</view>
				<view class="culll">
						<open-data type="userNickName" lang="zh_CN" class="name"></open-data>
						<text class="intro">3年工作经验&thinsp;/&thinsp;本科&thinsp;/&thinsp;20岁</text>
				</view>
				<button class="cu-btn round shadow buto" @tap="perfect" style="background-color: #ffff00; ">待完善>个人资料</button>
			</view>	
	    </view>	
		
		<!-- 中部图标层-->
		<view class="cu-card padding" style="position: absolute;margin-top: 180rpx;width: 100%;">
			<view class="cu-item shadow-warp card">
				<view class="cu-list menu-avatar shadow row_ myrow">
					<view class="cull" @tap="resumes">
						<icon class='iconfont iconjianli iconStyle'></icon>
						<text class="text1">个人简历</text>	    
					</view>		
					<view class="cull" @tap="issue">
						<icon class='iconfont iconGroupCopy iconStyle'></icon>
						<text class="text1">我的发布</text>
					</view>
					<view class="cull" @tap="commpany">
						<icon class='iconfont icongongsi iconStyle'></icon>
						<text class="text1">我的投递</text>
					</view>
					<view class="cull" @tap="enshrine">
						<icon class='iconfont iconwodeshoucang iconStyle'></icon>			  
						<text class="text1">我的收藏</text>
					</view>
				</view>						
			</view>				
		</view>	
				
		<!-- 底部抽屉层 -->
		<view class="cu-list" style="margin-top: 100rpx;">
			<view class="cu-item arrow drawStyle" @tap="footprint">
				<view class="content fontStyle">
					<text class="cuIcon-footprint text-grey"></text>
					<text class="text-black margin-left-sm">我的足迹</text>
				</view>
			</view>
			<view class="cu-item arrow padding drawStyle" @tap="service">
				<view class="content fontStyle">
					<text class="cuIcon-service text-grey"></text>
					<text class="text-black margin-left-sm">联系客服</text>
				</view>
			</view>
			<view class="cu-item arrow padding drawStyle" @tap="setting">
				<view class="content fontStyle">
					<text class="cuIcon-settings text-grey"></text>
					<text class="text-black margin-left-sm">设置</text>
				</view>
			</view>
			<view class="cu-item arrow padding drawStyle" @tap="assistance">
				<view class="content fontStyle">
					<text class="cuIcon-info text-grey"></text>
					<text class="text-black margin-left-sm">反馈与帮助</text>
				</view>
			</view>
		</view>
	</view>	
</template>

<script>
	export default {
		data() {
			return {
				name:"某某某",
				introdution:"3年工作经验",
				intro:[],
				resId:null,
				resume:{}
		    }
	    },
		onLoad:function(e){
			let th=this;
			uni.request({
				url:"zygh.store/api/login",
				method:"POST",
				success:function(res){
					th.intro=res.data.data;
					console.log(res.data);
				}
			})
		},
		methods:{
			perfect:function(){
				uni.navigateTo({
					url:"position_details"
				})
			},
			resumes:function(e){
				wx.cloud.init()
				const db = wx.cloud.database();
				const _ = db.command;
				this.resId=e.id;

				wx.cloud.callFunction({
					name:'myResume',
					data: {
					 	resume_id: this.resId,
					}
				}).then(res=>{
					this.resume = res.result.data[0]			
				}).catch(err => {
					console.error(err) 
				})
				
				if(this.resume){
					uni.navigateTo({
						url:'/pages/mine/resume/resume'
					})
				}
				else{
					wx.cloud.callFunction({
						name:'addMyResume',
						data:{
							resume_id:this.resId
						}
					}).then(res=>{
						uni.navigateTo({
							url:'/pages/mine/resume/editResume'
						})
					}).catch(err => {
						console.error(err) 
					})
				}
			},
			issue:function(){
				uni.navigateTo({
					url:"/pages/mine/myPublish/myPublish"
				})
			},
			commpany:function(){
				uni.navigateTo({
					url:"position_details"
				})
			},
			enshrine:function(){
				uni.navigateTo({
					url:"/pages/mine/myArticles/myArticles"
				})
			},
			footprint:function(){
				uni.navigateTo({
					url:"/pages/mine/history/history"
				})
			},
			service:function(){
				uni.navigateTo({
					url:"position_details"
				})
			},
			setting:function(){
				uni.navigateTo({
					url:"position_details"
				})
			},
			assistance:function(){
				uni.navigateTo({
					url:"position_details"
				})
			}
		}
	}
</script>

<style>
	@import url("../../colorui/iconfont.css");
	.cul{
		display: flex;
		flex-direction: column;
		background: #FFFFFF;
		height: 100%;
	}
	
	.myrow{
		justify-content: space-around;
	}
	
	.cull{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		/* margin-left: 35rpx; */
	}
	
	.culll{
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 15upx;
	}
	
	.ro{
		display: flex;
		flex-direction: row;
		margin-left: 30rpx;
		margin-top: 30rpx;
		align-items: center;
	}
	
	.row_{
		display: flex;
		flex-direction: row;
	}

	.text1{
		display: flex;
		white-space: nowrap;
		flex-direction: row;
		align-items: center;
		font-size: 30rpx;
		font-weight: 400;
		color: #222222;
	}
		
	.name {
		font-size: 55rpx;
		font-weight:600rpx;
		color: #ffffff;
	}
	
	.intro{
		font-size: 30rpx;
		font-weight:200rpx;
		color: #ffffff;
	}
	
	.avatar {
		font-variant: small-caps;
		margin: 0;
		padding: 0;
		display: inline-flex;
		text-align: center;
		justify-content: center;
		align-items: center;
		background-color: #ccc;
		color: #ffffff;
		white-space: nowrap;
		position: relative;
		width: 128upx;
		height: 128upx;
		background-size: cover;
		background-position: center;
		vertical-align: middle;
		font-size: 2.5em;
		border: 8upx solid #f1f1f1;
	}
	
	.tag {
		width: 36%;
		height:36%;
		font-size: 25upx; 
		font-weight: 500;
		vertical-align: middle;
		margin-top: 90upx;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		white-space: nowrap;
		border: 5upx solid #f1f1f1;
		border-radius: 200upx;
		position: absolute;
		top: -10upx;
		right: -10upx;
		padding: 0upx 16upx;
		color: #ffffff;
	} 
	
	.buto{
		border-radius: 60rpx 0 0 60rpx;
		margin-left:calc(100rpx); 
		width:160rpx; 
		height: 80rpx; 
		color: #7f7f00; 
		font-weight:500; 
		padding-right: calc(10rpx); 
		font-size: calc(30rpx);
	}
	
	.top{
		padding-left: 10rpx;
		padding-top: 25rpx;
	}
	
	.card{
		border-radius: 30upx;
		padding: 30rpx;
	}
	
	.iconStyle{
		color: #007AFF; 
		font-size: 60rpx;
	}
	
	.drawStyle{
		padding: 30rpx 20rpx 25rpx 60rpx;
	}
	
	.fontStyle{
		font-size: 40rpx;
	}
</style>
