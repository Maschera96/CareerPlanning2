<template>
	<view class="content">
		
		<!-- 简介 -->
		<view class="introdution">
			<view class="colum">
				<text class="text-name">{{resume.name}}</text>
				<text class="text-intro">{{resume.eduBackground.degree}}&thinsp;/&thinsp;计算机专业</text>
			</view>
			<view class="avatar round">
				<open-data type="userAvatarUrl" class="round" style="overflow: hidden;"></open-data>
				<view class="tag badge cuIcon-male bg-blue"></view>
			</view>
		</view>	
		
		<!-- 自我描述 -->
		<view class="colum" style="margin-top: 45rpx;">
			<text class="text-subhead">自我描述</text>
			<view class="card shadow-warp">
				<view class="cu-list shadow-warp" style="padding: 30rpx 30rpx 30rpx 30rpx;">					
					<text class="text-introtion">{{resume.selfDescription}}</text>
				</view>			   		
			</view>
		</view>		
		
		<!-- 基本信息 -->
		<view class="colum3">
			<text class="text-subhead">基本信息</text>
			<view class="colum" style="margin-top: 30rpx; margin-left: 45rpx;">
				<view class="ro">
					<icon class="iconfont icondianhua"></icon>
					<text class="text-introtion1">{{resume.phone}}</text>
				</view>
				<view class="ro">
					<icon class="iconfont icongen"></icon>
					<text class="text-introtion1">{{resume.email}}</text>
				</view>
				<view class="ro">
					<icon class="iconfont iconzuobiao"></icon>
					<text class="text-introtion1">{{resume.sex}}</text>
				</view>
			</view>
		</view>
			
		<!-- 教育背景 -->
		<view class="colum3">
			<text class="text-subhead">教育背景</text>
			<view class="card shadow-warp">
				<view class="cu-list" style="padding: 30rpx 30rpx 30rpx 30rpx;">					
					<view class="ro1">
						<view class="colum1">
							<text class="text-university">{{resume.eduBackground.major}}</text>
							<text class="text-introtion2">{{resume.eduBackground.degree}}</text>
							<text class="text-introtion2">{{resume.eduBackground.start_endTime}}</text>
						</view>
						<view class="icon">
							<image class="college_icon" src="../../static/学校.png"></image>
						</view>						
					</view>						   
				</view>				
			</view>
			<view class="colum">
				<text class="text-introtion2">专业证书：{{resume.certificates}}</text>
				<text class="text-introtion2">英语能力：{{resume.certificates}}</text>
				<text class="text-introtion2">办公能力：{{resume.skills}}</text>
			</view>		
		</view>
		
		<!-- 项目经历 -->
		<view class="colum2">
			<text class="text-subhead_">项目经历</text>
			<swiper class="screen-swiper" indicator-dots="true"
			 circular="true" autoplay="true" interval="5000" duration="500">
				<swiper-item>
					<view class="colum">
						<text class="text-university">{{resume.experirnces.data[0].project}}</text>
						<view class="ro">
							<text class="text-introtion3">{{resume.experirnces.data[0].position}}</text>
							<text class="text-introtion3" style="margin-left: 280rpx;">{{resume.experirnces.data[0].start_endTime}}</text>
						</view>
						<view class="card shadow-warp">
							<view class="cu-list shadow-warp" 
							style="padding: 30rpx 30rpx 30rpx 30rpx;">					
								<text class="text-introtion">{{resume.experirnces.data[0].content}}</text>
							</view>			   		
						</view>		
					</view>			
				</swiper-item>
			</swiper>			
		</view>
		
		<!-- 校园活动 -->
		<view class="colum2">
			<text class="text-subhead_" style="margin-bottom: 30rpx;">校园活动</text>
			<swiper class="screen-swiper" indicator-dots="true"
			 circular="true" autoplay="true" interval="5000" duration="500">
				<swiper-item>
					<view class="colum">
						<text class="text-university">{{resume.activities.data[0].activity}}</text>
						<view class="ro">
							<text class="text-introtion3">{{resume.activities.data[0].position}}</text>
							<text class="text-introtion3" style="margin-left: 280rpx;">{{resume.activities.data[0].start_endTime}}</text>
						</view>
						<view class="card shadow-warp">
							<view class="cu-list shadow-warp" 
							style="padding: 30rpx 30rpx 30rpx 30rpx;">					
								<text class="text-introtion">{{resume.activities.data[0].content}}</text>
							</view>			   		
						</view>		
					</view>	
				</swiper-item>
			</swiper>
		</view>
		
		<!-- 按钮层-->
		<view class="bottom padding">
			<button class="btn_1'" @tap='Edit'>编辑简历</button>
			<button :class="send?'btn_1':'btn_2'" @tap='Send' style="width:60%; margin-left: 20rpx;">{{text}}</button>		
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				sendId:null,
				send:null,
			    resume:{},
				text:"确认投递",
				comId:null,
				posId:null
		    }
		},
		onLoad:function(e){
			wx.cloud.init()
			const db = wx.cloud.database();
			const _ = db.command;
			this.sendId=e.id;
			this.comId="dc65fe3e5e7ad047000496dd2b29362d";
			this.posId=e.posId;
			
			
			//获取数据
		    wx.cloud.callFunction({
		    	name:'myResume',
		    	data: {
		    		id: this.sendId,
		    	}
		    }).then(res => {
		    	this.resume = res.result.data[0]
				console.log(this.resume)
		    }).catch(err => {
		    	console.error(err)
		    }),
			
			wx.cloud.callFunction({
			    name:'jobDetail',
			    data:{
					job_id:this.posId,
					company_id:this.comId
			    }
			}).then(res => {
				if (res.result.data[0].hasSent == "1"){
					this.send = true
				}else{
					this.send = false
				}
			}).catch(err => {
				console.error(err)
			})	
		},
		methods:{
			Send() {
				let th = this
				this.send=!this.send;			
				if (this.send == true){
					wx.cloud.callFunction({
						name:'jobDetail',
						data:{
							job_id:this.posId,
							company_id:this.comId
						}
					}).then(res =>{
						wx.showToast({
							title: '投递成功',
						})
						setTimeout(
							function(){
								var pages = getCurrentPages();
								var beforePage = pages[pages.length - 2];
								beforePage.$vm.issue=true;
								uni.navigateBack({
									success: function(){
										console.log(beforePage);
										beforePage.onLoad()
									}
								})
							},1500
						)
					}).catch(err => {
						console.error(err)
					})
				}
			},
			Edit:function(){
				uni.navigateTo({
					url:'editResume'
				})
			}
		}
	}
</script>

<style>
	@import "@/colorui/resume.css";
	@import "@/colorui/bottomButton.css";
</style>
