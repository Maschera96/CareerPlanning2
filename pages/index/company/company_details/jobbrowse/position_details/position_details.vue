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
		<view class="cu-item" style="display: flex; flex-direction: column;" v-for="(item,index) in job_.courses" :key="index">
			<view class="course_item" @tap="myDialog('lesson',item.courseName)">
				<view class="level">{{item.indexCode[0]}}类</view>
				<view class="courseone">
					<view class="course_name">{{item.courseName}}</view>
					<view class="course_summary">{{item.collegeName}}</view>
				</view>
				<view class="course_request1" :style="item.indexCode[0] !== 'A'?'display:none;':''">必修</view>
				<view class="course_request2" :style="item.indexCode[0] !== 'A'?'':'display:none;'">选修</view>
			</view>
		</view>

		<!-- 自主学习 -->
		<!-- <text class="text-subhead">自主学习</text>
		<text class="text-description" style="margin-top: 15rpx;">{{study}}</text> -->

		<!-- 书籍学习 -->
		<text class="text-subhead">书籍学习</text>
		<view class="cu-list shadow padding mybottom">
			<view class="cu-item" style="display: flex; flex-direction: column;" v-for="(item,index) in job_.books" :key="index">
				<view class="ro bookItem" @tap="myDialog('book',item.title)">
					<image class="imag_" :src="item.img"></image>
					<view class="cul bookContent">
						<text class="text-title_">{{item.title.split(' ')[0]}}</text>
						<text class="text-introtion_">作者: {{item.author}}</text>
						<text class="text-introtion_">出版社: {{item.publish}}</text>
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
			<button :class="mark?'btn_2':'btn_1'" @tap='Collect'>{{btnMessage}}</button>
			<button class="btn_2" @tap="Issue" style="width: 60%; margin-left: 20rpx;">投递简历</button>
		</view>
		
		<!-- 弹窗层 -->
		<view class="cu-modal" :class="modalName?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">注意</view>
					<view class="action" @tap="modalName = false">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					确定要将 {{modalTitle}} 添加到“我的规划”中吗？
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="modalName = false">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="addToPlan()">确定</button>
		
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				indexCode: null,
				posId: null,
				comId: null,
				job_: {},
				collect: null,
				issue: null,
				id: null,
				modalName: null,
				modalType: null,
				modalTitle: null,
				mark: null,
				btnMessage: '立即收藏',
			}
		},
		onLoad: async function(option) {
			console.log(option.job_id);
			const res = await wx.getStorage({
				key: 'openId'
			})
			this.openId = res.data
			this.indexCode = option.job_id
			uni.request({ 
				url: `http://1.15.175.248:8002/job/get/${this.indexCode}/${this.openId}`,
				success: (res) => {
					this.job_ = res.data.data
					console.log(this.job_);
					this.mark = res.data.data.isCollectedByCurrentUser
					if(this.mark){this.btnMessage = '已收藏'}
					else{this.btnMessage = '立即收藏'}
				}
			})
			
			//查询是否收藏
			
		},

		methods: {
			Collect() {
				this.mark = !this.mark
				//若还未收藏
				if (this.mark) {
					this.btnMessage = '已收藏'
					uni.request({
						url: `http://1.15.175.248:8002/job/collect/${this.indexCode}/${this.openId}`,
						success: (res) => {
							if(res.data.code === 0){
								wx.showToast({title: '收藏成功'})
							}
						}
					})
				} 
				//若已收藏
				else {
					this.btnMessage = '立即收藏'
					uni.request({
						url: `http://1.15.175.248:8002/job/cancel_collect/${this.indexCode}/${this.openId}`,
						success: (res) => {
							if(res.data.code === 0){
								wx.showToast({title: '取消收藏成功'})
							}
						}
					})
				}
			},
			myDialog(type,title){
				if(type === 'lesson'){
					this.modalType = 'lesson'
					this.modalTitle = title
				}else if(type === 'book'){
					this.modalType = 'book'
					this.modalTitle = title.split(' ')[0] 
				}
				this.modalName = true
			},
			addToPlan(){
				console.log(this.modalType,this.modalTitle);
				uni.navigateTo({
					url: `/pages/index/planning/adjustPlanning?type=${this.modalType}&title=${this.modalTitle}`,
				})
			},
			Issue() {
				uni.navigateTo({
					url: `/pages/mine/resume/resume?jobId=${this.indexCode}`
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
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.course_summary {
		color: #5b5b5b;
		margin-top: 10rpx;
		font-size: 32rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
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
		flex-shrink: 0;
		
	}
	
	.bookItem{
		margin: 20rpx 0rpx;
	}
	
	.bookContent{
		flex-shrink: 0;
		width: 70%;
		margin-left: 40rpx;
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
		font-size: 40rpx;
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
		/* margin-left: 70rpx; */
		/* width: 30%; */
		white-space: nowrap;
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
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.mybottom{
		margin-bottom: 120rpx;
	}
</style>
