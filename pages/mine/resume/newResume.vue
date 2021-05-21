<template>
	<view class="content">
		
		<!-- 基本信息 -->
		<view class="colum3">
			<view class="text-head">
				<text class="text-subhead">基本信息</text>
				<view class="necessary">(必填)</view>
			</view>
			
			<text class="adjust1">姓名：</text>
			<view class="card shadow-warp adjust2">
				<textarea auto-height v-model="resume.name"></textarea>
			</view>
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
			<view class="text-head">
				<text class="text-subhead">教育背景</text>
				<view class="necessary">(必填)</view>
			</view>
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
		
		<!-- 自我描述 -->
		<view class="colum3">
			<text class="text-subhead">自我描述</text>	
			<view class="card shadow-warp adjust2">
				<textarea auto-height v-model="resume.selfDescription"></textarea>
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
				resume:{
					name: null,
					telephone: null,
					birthday: null,
					email: null,
					expectedJob: '期望岗位',
					expectedPlace: '期望工作地点',
					highestEducation: '最高学历',
					educationExperience: [{
						university: null,
						education: null,
						major: null,
						startTime: null,
						endTime: null
					}],
					workExperience: [{
						company: null,
						job: null,
						jobContent: null,
						startTime: null,
						endTime: null
					}],
					otherExperience: [{
						experiences: null,
						content: null,
						startTime: null,
						endTime: null
					}]
				},
				avatarUrl: null,
				nickName: null,
		    }
		},
		onLoad:function(e){
			wx.getStorage({
				key: 'openId',
			}).then((res) => {
				res.data = 'test001'
				console.log('当前用户为',res.data);
			})
		},
		
		methods:{
			must:function(){
				wx.showToast({
					icon: 'error',
					title: '请填写必填项'
				})
			},
			editFun:function(e){
				if(!this.resume.name){this.must();return;}
				if(!this.resume.telephone){this.must();return;}
				if(!this.resume.birthday){this.must();return;}
				if(!this.resume.email){this.must();return;}
				if(!this.resume.educationExperience[0].university){this.must();return;}
				if(!this.resume.educationExperience[0].education){this.must();return;}
				if(!this.resume.educationExperience[0].major){this.must();return;}
				if(!this.resume.educationExperience[0].startTime){this.must();return;}
				if(!this.resume.educationExperience[0].endTime){this.must();return;}
				
				wx.getStorage({
					key: 'openId'
				}).then((res) => {
					// res.data = 'test001'
					this.resume.openId = res.data
					console.log(this.resume);
					uni.request({
						url: 'http://1.15.175.248:8006/mine/resume/add',
						method: 'POST',
						data: this.resume,
						header: {
							'Content-Type': 'application/json'
						},
					}).then((res) => {
							console.log(res);
							if(res[1].data.code === -1){
								wx.showToast({
									icon: 'error',
									title: res[1].data.data
								})
							}else{
								uni.navigateBack({})
							}
							// wx.showToast({
							// 	title: res.data.data,
							// }).then(() => {
							// 	uni.navigateBack({})
							// })
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
	
	.text-head{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	
	.necessary{
		color: red;
		font-size: 25rpx;
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
