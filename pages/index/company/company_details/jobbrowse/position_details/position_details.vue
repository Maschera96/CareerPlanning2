<template>
	<view class="cul">

		<!-- 顶层卡片 -->
		<view class="cu-card dynamic">
			<view class="cu-item shadow padding-sm">
				<view class="cu-list menu-avatar shadow-warp" style="padding: 50rpx 30rpx 60rpx 30rpx;">
					<view class="cul">
						<view class="ro side">
							<text class="text-position">{{job_.jobName}}</text>
							<text class="text-salary">{{job_.salary}}</text>
						</view>
						<text class="text-introtion" style="margin-top: 30rpx;">
							{{job_.jobPlace}}&ensp;|&ensp;{{job_.educationRequirement}}&ensp;|&ensp;{{job_.jobType}}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 职业描述 -->
		<view class="ro" style="margin-left: 45rpx;">
			<text class="text-char">|</text>
			<text class="text-title" style="margin-left: 10rpx;">职位描述</text>
		</view>
		<view class="job_des">
			<text class="text-description_">职位内容:</text>
			<text class="text-introtion_">{{job_.jobDuty}}</text>
		</view>
		<view class="job_des">
			<text class="text-description_">职位要求:</text>
			<text class="text-introtion_">{{job_.jobRequirement}}</text>
		</view>

		<!-- 路径推荐 -->
		<view class="ro" style="margin-left: 45rpx;margin-top: 60rpx;">
			<text class="text-char">|</text>
			<text class="text-title" style="margin-left: 10rpx;">路径推荐</text>
		</view>

		<!-- 校内学习 -->
		<text class="text-subhead">校内学习</text>
		<view class="cu-item" style="display: flex; flex-direction: column;" v-for="(item,index) in 4" :key="index">
			<view class="course_item">
				<view class="level">A类</view>
				<view class="courseone">
					<view class="course_name">计算机组成原理</view>
					<view class="course_summary">计算机的基本组成原理和内部工作机制</view>
				</view>
				<view class="course_request1" :style="index%2?'display:none;':''">必修</view>
				<view class="course_request2" :style="index%2?'':'display:none;'">选修</view>
			</view>
		</view>

		<!-- 自主学习 -->
		<!-- <text class="text-subhead">自主学习</text>
		<text class="text-description" style="margin-top: 15rpx;">{{study}}</text> -->

		<!-- 书籍学习 -->
		<text class="text-subhead">书籍学习</text>
		<view class="cu-list shadow padding mybottom">
			<view class="cu-item" style="display: flex; flex-direction: column;" v-for="(item,index) in 4" :key="index">
				<view class="ro" :style="index%2?'display:none;':''">
					<image class="imag_" src="cloud://zygh-test-wn16v.7a79-zygh-test-wn16v-1301651483/book1.png"></image>
					<view class="cul margin-left-lg">
						<text class="text-title_">Go语言实战</text>
						<text class="text-introtion_">作者: 威廉·肯尼迪</text>
						<text class="text-introtion_">出版社: 人民邮电出版社</text>
					</view>
				</view>
				<view class="ro" :style="index%2?'':'display:none;'">
					<image class="imag_" src="cloud://zygh-test-wn16v.7a79-zygh-test-wn16v-1301651483/book2.jpg"></image>
					<view class="cul margin-left-lg">
						<text class="text-title_">MongoDB管理与开发精要</text>
						<text class="text-introtion_">作者: 红丸</text>
						<text class="text-introtion_">出版社: 机械工业出版社</text>
					</view>
				</view>
			</view>
		</view>

		<!-- <text class="text-subhead">竞赛学习</text>
		<view class="cul">
			<text class="text-description" style="margin-top: 30rpx;">{{job_.name}}</text>
		</view>

		<view class="end">
			<text class="text-subhead">HR备注</text>
			<view class="cul">
				<text class="text-description" style="margin-top: 30rpx;"></text>
			</view>
		</view> -->

		<!-- 按钮层 -->
		<view class="bottom padding">
			<button :class="collect?'btn_2':'btn_1'" @tap='Collect'>立即收藏</button>
			<button class="btn_2" @tap="Issue" style="width: 60%; margin-left: 20rpx;" :disabled="issue?true:false">投递简历</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				posId: null,
				comId: null,
				job_: {},
				collect: null,
				issue: null,
				id: null
			}
		},
		onLoad: function(option) {
			console.log(option.job_id);
			let [indexCode,openId] = [option.job_id,'abc123']
			console.log(indexCode);
			uni.request({ 
				url: `http://1.15.175.248:8002/job/get/${indexCode}/${openId}`,
				success: (res) => {
					this.job_ = res.data.data
					console.log(this.job_);
				}
			})
			
			//查询是否收藏
			
		},

		methods: {
			Collect() {
				this.collect = !this.collect
				//若还未收藏
				let th = this
				if (this.collect == true) {
					wx.cloud.callFunction({
						name: 'jobDetail',
						data: {
							job_id: this.posId,
							company_id: this.comId,
						}
					}).then(res => {
						wx.showToast({
							title: '收藏成功',
						})
					}).catch(err => {
						console.error(err)
					})
					//若已收藏
				} else {
					wx.cloud.callFunction({
						name: 'jobDetail',
						data: {
							job_id: this.posId,
							company_id: this.comId,
						}
					}).then(res => {
						wx.showToast({
							title: '已取消收藏',
						})
					}).catch(err => {
						console.error(err)
					})
				}
			},
			Issue() {
				uni.navigateTo({
					url: "../resume/sendResume?posId=" + this.posId
				})
			}
		}
	}
</script>
<style>
	@import "@/colorui/main_.css";
	@import "@/colorui/bottomButton.css";

	.cul {
		display: flex;
		flex-direction: column;
		background-color: #FFFFFF;
	}

	.course_item {
		border: 1rpx solid #ffffff;
		box-shadow: 0rpx 3rpx 6rpx #e6e6e6;
		margin-left: auto;
		margin-right: auto;
		display: flex;
		flex-direction: row;
		width: 680rpx;
		height: 200rpx;
		margin-top: 30rpx;
	}

	.courseone {
		display: flex;
		flex-direction: column;
		width: 450rpx;
		margin-top: 30rpx;
		margin-left: 40rpx;
	}

	.level {
		border: 1rpx solid #5b5b5b;
		color: #5b5b5b;
		height: 40rpx;
		width: 70rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 80rpx;
		margin-left: 30rpx;
	}

	.course_name {
		font-size: 40rpx;
		font-weight: bold;
		color: #5f656c;
	}

	.course_summary {
		color: #5b5b5b;
		margin-top: 10rpx;
		font-size: 32rpx;
	}
	
	.course_request1{
		color: #e1945f;
		display: flex;
		align-items: center;
		margin-left: 5rpx;
		font-size: 32rpx;
	}
	
	.course_request2{
		color:#37c17c;
		display: flex;
		align-items: center; 
		margin-left: 5rpx;
		font-size: 32rpx;
	}

	.job_des {
		display: flex;
		flex-direction: column;
		padding-right: 45rpx;
		padding-left: 45rpx;
	}

	.imag {
		width: 180rpx;
		height: 200rpx;
		margin-top: 30rpx;
		margin-bottom: 30rpx;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
	}

	.imag_ {
		width: 160rpx;
		height: 200rpx;
		background-color: #eeeeee;
	}

	.buto {
		width: 120rpx;
		height: 50rpx;
		padding: 30rpx 0rpx 30rpx 0rpx;
	}

	.adjust {
		width: 60%;
		margin-left: 20rpx;
	}

	.menuu {
		margin-top: 30rpx;
		margin-left: 45rpx;
		margin-right: 45rpx;
		border-radius: 30rpx 30rpx 30rpx 30rpx;
	}

	.ro {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	
	.side{
		justify-content: space-between;
	}

	.text-position {
		font-size: 46rpx;
		font-weight: 600;
	}

	.text-char {
		font-weight: 900;
		font-size: 50rpx;
	}

	.text-salary {
		color: #df325d;
		font-weight: 400;
		font-size: 50rpx;
		font-weight: 500;
		margin-left: 70rpx;
	}

	.text-introtion {
		color: #AAAAAA;
		font-size: 30rpx;
		margin-top: 15rpx;
	}

	.text-introtion_ {
		color: #AAAAAA;
		font-size: 30rpx;
		margin-top: 5rpx;
	}

	.text-description {
		color: #000000;
		font-size: 35rpx;
		font-weight: 500;
		margin-top: 15rpx;
	}

	.text-description_ {
		color: #000000;
		font-size: 35rpx;
		font-weight: 500;
		margin-top: 30rpx;
	}

	.text-subhead {
		font-size: 40rpx;
		font-weight: 500;
		margin-left: 45rpx;
		margin-top: 30rpx;
	}

	.text-title {
		font-size: 45rpx;
		font-weight: 500;
	}

	.text-title_ {
		font-size: 38rpx;
		font-weight: 500;
	}

	.mybottom{
		margin-bottom: 120rpx;
	}
</style>
