<template>
	<view class="content">
		
		<!-- 简介 -->
		<view class="colum">
			<text class="adjust1">姓名：</text>
			<view class="card shadow-warp adjust2">
				<textarea auto-height v-model="resume.name"></textarea>
			</view>
		</view>	
		
		<!-- 自我描述 -->
		<view class="colum3">
			<text class="text-subhead">自我描述</text>	
			<view class="card shadow-warp adjust2">
				<textarea auto-height v-model="resume.selfDescription"></textarea>
			</view>
		</view>		
		
		<!-- 基本信息 -->
		<view class="colum3">
			<text class="text-subhead">基本信息</text>
				<text class="adjust1">电话：</text>
				<view class="card shadow-warp adjust2">
					<textarea auto-height v-model="resume.telephone"></textarea>
				</view>
				<text class="adjust1">生日：</text>
				<view class="card shadow-warp adjust2">
					<textarea auto-height v-model="resume.birthday"></textarea>
				</view>
				<text class="adjust1">邮箱：</text>
				<view class="card shadow-warp adjust2">
					<textarea auto-height v-model="resume.email"></textarea>
				</view>
		</view>
			
		<!-- 教育背景 -->
		<view class="colum3">
			<text class="text-subhead">教育背景</text>
			<text class="adjust1">学校：</text>
			<view class="card shadow-warp adjust2">
				<textarea auto-height v-model="resume.educationExperience[0].university"></textarea>
			</view>
			<text class="adjust1">专业：</text>
			<view class="card shadow-warp adjust2">
				<textarea auto-height v-model="resume.educationExperience[0].major"></textarea>
			</view>
			<text class="adjust1">学位：</text>
			<view class="card shadow-warp adjust2">
				<textarea auto-height v-model="resume.educationExperience[0].education"></textarea>
			</view>
			<text class="adjust1">起始时间：</text>
			<view class="card shadow-warp adjust2">
				<textarea auto-height v-model="resume.educationExperience[0].startTime"></textarea>
			</view>
			<text class="adjust1">结束时间：</text>
			<view class="card shadow-warp adjust2">
				<textarea auto-height v-model="resume.educationExperience[0].endTime"></textarea>
			</view>
			<!-- <text class="adjust1">专业证书：</text>
			<view class="card shadow-warp adjust2">
				<textarea auto-height v-model="certificatesValue" :placeholder="resume.certificates"></textarea>
			</view>
			<text class="adjust1">英语能力：</text>
			<view class="card shadow-warp adjust2">
				<textarea auto-height v-model="certificatesValue" :placeholder="resume.certificates"></textarea>
			</view>
			<text class="adjust1">办公技能：</text>
			<view class="card shadow-warp adjust2">
				<textarea auto-height v-model="skillValue" :placeholder="resume.skills"></textarea>
			</view> -->
		</view>
		
		<!-- 工作经历 -->
		<view class="colum2">
			<text class="text-subhead_">工作经历</text>
					<view class="colum">
						<text class="adjust1">公司名称：</text>
						<view class="card shadow-warp adjust2">
							<textarea auto-height v-model="resume.workExperience[0].company"></textarea>
						</view>
						<text class="adjust1">岗位名称：</text>
						<view class="card shadow-warp adjust2">
							<textarea auto-height v-model="resume.workExperience[0].job"></textarea>
						</view>
						<text class="adjust1">工作内容：</text>
						<view class="card shadow-warp adjust2">
							<textarea auto-height v-model="resume.workExperience[0].jobContent"></textarea>
						</view>			
						<text class="adjust1">起始时间：</text>
						<view class="card shadow-warp adjust2">
						    <textarea auto-height v-model="resume.workExperience[0].startTime"></textarea>
						</view>
						<text class="adjust1">结束时间：</text>
						<view class="card shadow-warp adjust2">
						    <textarea auto-height v-model="resume.workExperience[0].endTime"></textarea>
						</view>
					</view>
		</view>
		
		<!-- 校园经历 -->
		<view class="colum2">
			<text class="text-subhead_">校园经历</text>
					<view class="colum">
						<text class="adjust1">经历：</text>
						<view class="card shadow-warp adjust2">
							<textarea auto-height v-model="resume.otherExperience[0].experience"></textarea>
						</view>
						<text class="adjust1">内容：</text>
						<view class="card shadow-warp adjust2">
							<textarea auto-height v-model="resume.otherExperience[0].content"></textarea>
						</view>
						<text class="adjust1">起始时间：</text>
						<view class="card shadow-warp adjust2">
							<textarea auto-height v-model="resume.otherExperience[0].startTime"></textarea>
						</view>
						<text class="adjust1">结束时间：</text>
						<view class="card shadow-warp adjust2">				
							<textarea auto-height v-model="resume.otherExperience[0].endTime"></textarea>
						</view>		
					</view>
		</view>
		
		
		<!-- 发布按钮 -->
		<view class="end">
			<button class="cu-btn bg-blue shadow-blur buto" @tap="editFun">提交</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				resId:null,
				resume:{},
				avatarUrl: null,
				nickName: null,
		    }
		},
		onLoad:function(e){
			wx.getStorage({
				key: 'openId',
			}).then((res) => {
				// res.data = 'test001'
				console.log('当前用户为',res.data);
				uni.request({
					url: 'http://1.15.175.248:8006/mine/resume/get/'+res.data,
					success: (res) => {
						if(res.data.code === 0){
							if(res.data.data.workExperience.length === 0){
								res.data.data.workExperience = [{
									company: '',
									job: '',
									jobContent: '',
									startTime: '',
									endTime: ''
								}]
							}
							if(res.data.data.otherExperience.length === 0){
								res.data.data.otherExperience = [{
									experiences: '',
									content: '',
									startTime: '',
									endTime: ''
								}]
							}
							this.resume = res.data.data
							console.log(this.resume);
						}
					}
				})
			})
		},
		
		methods:{
			editFun:function(e){
				wx.getStorage({
					key: 'openId'
				}).then((res) => {
					uni.request({
						url: 'http://1.15.175.248:8006/mine/resume/update',
						method: 'PUT',
						data: this.resume,
						header: {
							'Content-Type': 'application/json'
						}
					}).then(() => {
						wx.showToast({
							title: '修改成功',
						})
					}).then(() => {
						uni.navigateBack({})
					})
				})
			}
		}
	}
</script>

<style>
	.content{
		background-color: #FFFFFF;
	}
	
	.colum{
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 30rpx;
	}
	
	.colum3{
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 30rpx;
		margin-top: 45rpx;
	}
	
	.colum1{
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	
	.colum2{
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-top: 45rpx;
	}
	
	.ro{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-top: 15rpx;
	}
	
	.ro1{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	
	.card {
		display: block;
		overflow: hidden;
		display: block;
		background-color: #ffffff;
		overflow: hidden;
		border-radius: 10upx;
		width: 95%;
		margin-top: 30rpx;
	}
	
	.basicinfo{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	
	.icon{
		border:3px solid #ff8735;
		border-radius:50%;
		background-color: #ff8735;
		width: 120rpx;
		height: 120rpx;
		margin-left: 220rpx;
		align-items: center;
		padding: 10rpx 15rpx 20rpx 15rpx;
	}
	
	.college_icon{
		max-width: 100%;
		max-height: 100%;
		width: 80rpx;
		height: 80rpx;
	}
	
	.introdution{
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-left: 10rpx;
		padding-top: 25rpx;
	}
	
	.end{
		justify-content: center;
		align-items: center;
		margin-top: 40rpx;
		margin-bottom: 40rpx;
	}
	
	.buto{
		margin-left: 30%;
		width: 40%;
	}
	
	.text-subhead{
		font-size: 38rpx;
		font-weight: 600;
		margin-left: 38%;
	}
	
	.text-subhead_{
		font-size: 38rpx;
		font-weight: 600;
		margin-left: 38%;
		
	}
	
	.adjust1{
		margin-top: 25rpx;
		color: #000000;
	}
	
	.adjust2{
		padding: 30rpx 30rpx 30rpx 30rpx;
	}
</style>
