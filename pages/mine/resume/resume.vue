<template>
	<view>
		<view v-if="!status">
			<view>暂无简历</view>
			<view class="end">
				<button class="cu-btn bg-blue shadow-blur buto" @click="gotoNew()">去新增简历</button>
			</view>
		</view>
		<view v-if="status" class="content">
			
			<!-- 简介 -->
			<view class="introdution">
				<view class="colum">
					<text class="text-name">{{resume.name}}</text>
					<text class="text-intro">{{resume.educationExperience[0].education}} / {{resume.educationExperience[0].major}}专业</text>
				</view>
				<view class="avatar round">
					<open-data type="userAvatarUrl" class="ava round" style="overflow: hidden;"></open-data>
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
						<text class="text-introtion1">{{resume.telephone}}</text>
					</view>
					<view class="ro">
						<icon class="iconfont iconzuobiao"></icon>
						<text class="text-introtion1">{{resume.birthday}}</text>
					</view>
					<view class="ro">
						<icon class="iconfont icongen"></icon>
						<text class="text-introtion1">{{resume.email}}</text>
					</view>
				</view>
			</view>
				
			<!-- 教育背景 -->
			<view class="colum3">
				<text class="text-subhead">教育背景</text>
				<view class="card shadow-warp">
					<view class="cu-list" v-for="(item,index) in resume.educationExperience" :key="index" style="padding: 30rpx 30rpx 30rpx 30rpx;">					
						<view class="ro1">
							<view class="colum1">
								<text class="text-university">{{item.university}}</text>
								<text class="text-introtion2">{{item.major}}专业&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.education}}</text>
								<text class="text-introtion2">{{item.startTime}}-{{item.endTime}}</text>
							</view>
							<view class="icon">
								<image class="college_icon" src="/static/school.png"></image>
							</view>						
						</view>						   
					</view>				
				</view>
				<!-- <view class="colum">
					<text class="text-introtion2">专业证书：{{resume.certificates}}</text>
					<text class="text-introtion2">英语能力：{{resume.certificates}}</text>
					<text class="text-introtion2">办公能力：{{resume.skills}}</text>
				</view>	 -->	
			</view>
			
			<!-- 工作经历 -->
			<view class="colum2">
				<text class="text-subhead_">工作经历</text>
				<swiper class="screen-swiper" indicator-dots="true"
				 circular="true" autoplay="true" interval="5000" duration="500">
					<swiper-item>
						<view class="colum">
							<text class="text-university">{{resume.workExperience[0].company}}</text>
							<view class="content-ro1">
								<text class="text-introtion3">{{resume.workExperience[0].job}}</text>
								<text class="text-introtion3" style="margin-left: 280rpx;">{{resume.workExperience[0].startTime}} - {{resume.workExperience[0].endTime}}</text>
							</view>
							<view class="card shadow-warp">
								<view class="cu-list shadow-warp" 
								style="padding: 30rpx 30rpx 30rpx 30rpx;">					
									<text class="text-introtion">{{resume.workExperience[0].jobContent}}</text>
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
							<text class="text-university">{{resume.otherExperience[0].experience}}</text>
							<view class="content-ro2">
								<text class="text-introtion3" style="margin-left: 280rpx;">{{resume.otherExperience[0].startTime}} - {{resume.otherExperience[0].endTime}}</text>
							</view>
							<view class="card shadow-warp">
								<view class="cu-list shadow-warp" 
								style="padding: 30rpx 30rpx 30rpx 30rpx;">					
									<text class="text-introtion">{{resume.otherExperience[0].content}}</text>
								</view>			   		
							</view>		
						</view>	
					</swiper-item>
				</swiper>
			</view>
			
			<!-- EDIT按钮 -->
			<view class="end">
				<button class="buto cu-btn bg-blue shadow-blur" @click="gotoEdit()">EDIT</button>
				<button v-if="jobId" class="buto cu-btn bg-orange shadow-blur" @click="getResume()">SEND</button>
			</view>
		</view>
	</view>

</template>

<script>
	export default{
		data(){
			return{
				status: false,
				resId:null,
			    resume:{},
				jobId: null,
		    }
		},
		
		onLoad:function(e){
			if(e.jobId){this.jobId = e.jobId}
			
			wx.getStorage({
				key: 'openId',
			}).then((res) => {
				// res.data = 'test001'
				console.log('当前用户为',res.data);
				uni.request({
					url: 'http://1.15.175.248:8006/mine/resume/get/'+res.data,
					success: (res) => {
						console.log(res.data.code);
						console.log(res);
						if(res.data.code === -1){
							this.status = false
						}else{
							this.status = true
							this.resume = res.data.data
						}
					}
				})
			})
		},
		methods:{
			gotoEdit:function(){
				uni.redirectTo({
					url:"editResume"
				})
			},
			gotoNew: function(){
				uni.redirectTo({
					url:"newResume"
				})
			},
			gotoSend: async function(){
				console.log(this.jobId);
				console.log(this.resume);
				let sendResume = JSON.parse(JSON.stringify(this.resume))
				let openId = await wx.getStorage({
					key: 'openId'
				}).then((res) => {return res.data})
				sendResume.openId = openId
				console.log(sendResume);
				// return
				await uni.request({
					url: `http://1.15.175.248:8002/job/${this.jobId}/send_resume`,
					method: 'POST',
					header: {
						'Content-Type': 'application/json'
					},
					data: this.resume
				})
				console.log('投递完毕');
			},
			getResume: function(){
				uni.request({
					url: `http://1.15.175.248:8002/job/${this.jobId}/get/resume/1/5`,
					success: (res) => {
						console.log(res);
						wx.showToast({
							title: '投递成功',
						})
						setTimeout(() => {uni.navigateBack({})},1500)
					}
				})
			}
		}
	}
</script>

<style>
	@import "@/colorui/resume.css";
	@import "@/colorui/iconfont.css";
	
	.ava {
		height: 128rpx;
		width: 128rpx;
	}
</style>
