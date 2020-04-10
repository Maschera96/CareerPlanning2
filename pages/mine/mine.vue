<template>
	<view class="cul">
		<view class="bg-blue text-left shadow-blur" style="padding-bottom: 150rpx;">
			<view class="ro" style="padding-left: 10rpx;padding-top: 25rpx;">
				<view class="avatar round">
				    <view class="cu-tag badge cuIcon-male bg-blue" style=" width: 40%; height:40%;
					font-size: 25upx; font-weight: 500;"></view>
				</view>
				<view class="culll">
						<text class="name">{{name}}</text>
						<text class="intro">3年工作经验&thinsp;/&thinsp;本科&thinsp;/&thinsp;20岁</text>
				</view>
				<button class="cu-btn round shadow" @click="perfect" style="border-radius: 60rpx 0 0 60rpx; 
				margin-left:calc(100rpx); width:160rpx; height: 80rpx; color: #7f7f00; background-color: #ffff00; 
				font-weight:500; padding-right: calc(10rpx); font-size: calc(30rpx);">待完善>个人资料</button>
			</view>	
	    </view>	
		<view class="cu-card padding" style="position: absolute;margin-top: 180rpx;width: 100%;">
			<view class="cu-item shadow-warp" style="border-radius: 30upx 30upx 30upx 30upx; 
			padding: 30rpx 30rpx 30rpx 15rpx;">
				<view class="cu-list menu-avatar shadow" style="display: flex;flex-direction: row;">
					<view class="cull" @click="resume">
						<icon class='iconfont iconjianli' style="color: #007AFF; font-size: 60rpx;"></icon>
						<text class="text1">个人简历</text>	    
					</view>		
					<view class="cull" @click="issue">
						<icon class='iconfont iconGroupCopy' style="color: #007AFF; font-size: 60rpx;"></icon>
						<text class="text1">我的投递</text>
					</view>
					<view class="cull" @click="commpany">
						<icon class='iconfont icongongsi' style="color: #007AFF; font-size: 60rpx;"></icon>
						<text class="text1">关注公司</text>
					</view>
					<view class="cull" @click="enshrine">
						<icon class='iconfont iconwodeshoucang' style="color: #007AFF; font-size: 60rpx;"></icon>			  
						<text class="text1">我的收藏</text>
					</view>
				</view>						
			</view>				
		</view>			
		<view class="cu-list" style="margin-top: 100rpx;">
			<view class="cu-item arrow" @click="footprint" style="padding: 30rpx 20rpx 25rpx 60rpx;">
				<view class="content" style="font-size: 40rpx;">
					<text class="cuIcon-footprint text-grey"></text>
					<text class="text-black margin-left-sm">我的足迹</text>
				</view>
			</view>
			<view class="cu-item arrow padding" @click="service" style="padding: 30rpx 20rpx 25rpx 60rpx;">
				<view class="content" style="font-size: 40rpx;">
					<text class="cuIcon-service text-grey"></text>
					<text class="text-black margin-left-sm">联系客服</text>
				</view>
			</view>
			<view class="cu-item arrow padding" @click="setting" style="padding: 30rpx 20rpx 25rpx 60rpx;">
				<view class="content"  style="font-size: 40rpx;">
					<text class="cuIcon-settings text-grey"></text>
					<text class="text-black margin-left-sm">设置</text>
				</view>
			</view>
			<view class="cu-item arrow padding" @click="assistance" style="padding: 30rpx 20rpx 25rpx 60rpx;">
				<view class="content"  style="font-size: 40rpx;">
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
				intro:[]
		    }
	    },
		onLoad:function(e){
			let th=this;
			uni.request({
				url:"http://zygh.store/api/login",
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
			resume:function(){
				uni.navigateTo({
					url:"position_details"
				})
			},
			issue:function(){
				uni.navigateTo({
					url:"position_details"
				})
			},
			commpany:function(){
				uni.navigateTo({
					url:"position_details"
				})
			},
			enshrine:function(){
				uni.navigateTo({
					url:"position_details"
				})
			},
			footprint:function(){
				uni.navigateTo({
					url:"position_details"
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
	
	.cull{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-left: 35rpx;
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

	.text1{
		display: flex;
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
	
</style>
