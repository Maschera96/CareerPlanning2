<template>
	<view class="content">
		<view class="mainContent">

			<!-- 弹窗层 -->
			<view v-if="search">
				<view @tap="close" class="cover"></view>
				<view class="searchBox">
					<view v-for="(item,index) in searchResult" :key="index">
						<view class="searchItem" @tap="gotoJob(item.indexCode)">
							<view class="itemType">{{item.jobType}}</view>
							<view class="itemPlace">{{item.jobPlace}}</view>
							<view class="itemName">{{item.jobName}}</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 头部层 -->
			<view class="head">
				<view class="cu-bar search ">
					<icon class="action">
						<text class="country">全国</text>
						<icon class="cuIcon-triangledownfill" style="font-size: 40rpx;"></icon>
					</icon>
					<view class="search-form round">
						<text class="cuIcon-search"></text>
						<input type="text" placeholder="搜索职位名称" confirm-type="search" v-model="searchContent"
							@focus="search = true" @confirm="gotoSearch()"></input>
					</view>
				</view>
				<view class="icon-phone">
					<icon class='cuIcon-phone' style="color:#00000;font-size: 200%;"></icon>
				</view>
			</view>

			<!-- 卡片层 -->
			<view class="card">
				<image class="cardp" src=../../static/index_pic/title.jpg></image>
			</view>


			<!-- 按钮层  -->
			<view class="icon">
				<view class="ic">
					<view class="course" @tap="gotoCourse()">
						<image class="course_icon" src=../../static/index_pic/course.png></image>
					</view>
					<view class="text2">
						<text>课程</text>
					</view>
				</view>

				<view class="ic">
					<view class="college" @tap="gotoCollege()">
						<image class="college_icon" src=../../static/index_pic/college.png></image>
					</view>
					<view class="text2">
						<text>学院</text>
					</view>
				</view>

				<view class="ic">
					<view class="book" @tap="gotoBook()">
						<image class="book_icon" src=../../static/index_pic/book.png></image>
					</view>
					<view class="text2">
						<text>书籍</text>
					</view>
				</view>

				<view class="ic">
					<view class="competition">
						<image class="competition_icon" src=../../static/index_pic/competition.png></image>
					</view>
					<view class="text2">
						<text>竞赛</text>
					</view>
				</view>
			</view>

			<!-- 规划企业层  -->
			<view class="PlanningCompany">
				<view class="Company" @tap="gotoCompany()">
					<image class="CompanyPic" src=../../static/index_pic/company.jpg>
					</image>
				</view>

				<view class="Planning" @tap="gotoPlanning()">
					<image class="PlanningPic" src=../../static/index_pic/planning.jpg>
					</image>
				</view>
			</view>

		</view>

		<!--文章列表层-->
		<view class="list">
			<view class="about">
				<view class="divLine2"></view>
				<view class="word">
					<text class="hot_position">热门岗位</text>
				</view>
			</view>

			<view class="jobs">
				<view style="margin-top: 30rpx;">
					<view class="oneitem" v-for="(value,index) in hotJob" :key="index" @click="goDetail(value.indexCode)">
						<view class="company_position">{{value.jobName}}</view>
						<view class="jobRow">
							<view class="jobContent">{{value.jobPlace.split(' ')[0]}} | {{value.jobType}}</view>
							<!-- <view class="company_salary">{{value.salary}}</view> -->
							<image class="company_logo" :src="value.companyLogo"> </image>
								<!-- <view class="company_position">{{value.jobName}}</view> -->
								<!-- <view class="company_request">{{value.place}}|{{value.experience}}|{{value.education}} -->
						</view>
					</view>
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
				listData: [],
				modalName: false,
				search: false,
				searchContent: '',
				searchResult: [],
				hotJob: [],
			}
		},
		onLoad: function(e) {
			//存入code值，用于用户登陆
			wx.login({
				success: (res) => {
					wx.setStorage({
						key: 'loginCode',
						data: res.code
					})
				}
			})

			// 获取用户的openid
			wx.cloud.callFunction({
				name: 'login', // 打开微信云开发控制平台，左上角点击[云函数]
				data: {},
				success: res => {
					// 缓存用户openid，方便后续再次调用
					uni.setStorage({
						key: "openId",
						data: res.result.openid
					});
				},
				fail: err => {
					console.error('获取失败：', err);
					reject('获取失败');
				}
			});

			//获取热门岗位
			uni.request({
				url: `http://1.15.175.248:8002/job/hot_jobs/5`,
				success: (res) => {
					this.hotJob = res.data.data
					console.log(this.hotJob);
				}
			})

		},

		methods: {
			gotoCompany: function() {
				uni.navigateTo({
					url: '/pages/index/company/company'
				})
			},
			gotoCollege: function() {
				uni.navigateTo({
					url: '/pages/index/college/college_details'
				})
			},
			gotoBook: function() {
				uni.navigateTo({
					url: '/pages/index/books/books'
				})
			},
			gotoCourse: function() {
				uni.navigateTo({
					url: '/pages/index/college/college'
				})
			},
			gotoPlanning: function() {
				uni.navigateTo({
					url: '/pages/index/planning/planning'
				})
			},
			goDetail: function(id) {
				uni.navigateTo({
					url: '/pages/index/company/company_details/jobbrowse/position_details/position_details?job_id=' +
						id
				})
			},
			gotoSearch: function() {
				console.log('准备搜索', this.searchContent);
				// return

				uni.request({
					url: `http://1.15.175.248:8004/search/job/1/5`,
					method: 'POST',
					header: {
						'Content-Type': 'application/json'
					},
					data: {
						'userSearch': this.searchContent
					},
					success: (res) => {
						console.log(res.data.data.data);
						this.searchResult = res.data.data.data
					}
				})
			},
			gotoJob: function(jobId) {
				uni.navigateTo({
					url: '/pages/index/company/company_details/jobbrowse/position_details/position_details?job_id=' +
						jobId
				})
			},
			close: function() {
				this.search = false
				this.searchContent = ''
				this.searchResult = []
			}
		},
	}
</script>

<style>

	.mainContent {
		background-color: #FFFFFF;
		padding-bottom: 60rpx;
	}

	.cover {
		position: absolute;
		left: 0px;
		top: 0px;
		background: rgba(0, 0, 0, 0.4);
		width: 100%;
		/*宽度设置为100%，这样才能使隐藏背景层覆盖原页面*/
		height: 100%;
		/* display:none; */
		z-Index: 100;
	}

	.searchBox {
		width: 100%;
		background-color: #FFFFFF;
		padding: 20rpx 20rpx;
		position: absolute;
		top: 104rpx;
		border-radius: 0rpx 0rpx 20rpx 20rpx;
		z-index: 200;
	}

	.searchItem {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		height: 80rpx;
	}

	.itemType .itemPlace {
		width: 20%;
	}

	.itemName {
		width: 40%;
	}

	.content {
		display: flex;
		flex-direction: column;
		background-color: #FFFFFF;

	}

	.head {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		z-index: 200;
		background-color: #FFFFFF;
	}

	.cu-bar {
		width: 680rpx;
		font-size: 20rpx;
		margin-top: 15rpx;
	}

	.action {
		width: 120rpx;
		flex-direction: row;
		font-size: 100rpx;
		justify-content: space-around;
		margin-top: -20rpx;
	}


	.icon-phone {
		margin-top: 35rpx;
		margin-right: 20rpx;
	}

	.country {
		font-size: 30rpx;
		font-weight: 600;
		letter-spacing: 2rpx;
	}

	.card {
		display: flex;
		justify-content: space-around;
	}

	.cardp {
		height: 250rpx;
		width: 700rpx;
		margin-top: 20rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 30rpx;
	}

	.course {
		border: 3px solid #51c3b9;
		border-radius: 50%;
		background-color: #51c3b9;
		width: 90rpx;
		height: 90rpx;
	}

	.college {
		border: 3px solid #9835ff;
		border-radius: 50%;
		background-color: #9835ff;
		width: 90rpx;
		height: 90rpx;
	}

	.book {
		border: 3px solid #ff3572;
		border-radius: 50%;
		background-color: #ff3572;
		width: 90rpx;
		height: 90rpx;
	}

	.competition {
		border: 3px solid #ff8735;
		border-radius: 50%;
		background-color: #ff8735;
		width: 90rpx;
		height: 90rpx;
	}

	.course_icon {
		max-width: 100%;
		max-height: 100%;
		width: 60rpx;
		height: 60rpx;
		margin-left: 10rpx;
		margin-top: 8rpx;
	}

	.college_icon {
		max-width: 100%;
		max-height: 100%;
		width: 60rpx;
		height: 60rpx;
		margin-left: 10rpx;
		margin-top: 9rpx;
	}

	.book_icon {
		max-width: 100%;
		max-height: 100%;
		width: 60rpx;
		height: 60rpx;
		margin-left: 10rpx;
		margin-top: 10rpx;
	}

	.competition_icon {
		max-width: 100%;
		max-height: 100%;
		width: 60rpx;
		height: 60rpx;
		margin-left: 10rpx;
		margin-top: 10rpx;
	}

	.icon {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		margin-top: 10rpx;
		margin-right: 30rpx;
		margin-left: 30rpx;
	}

	.text2 {
		margin-top: 15rpx;
		font-size: 31rpx;
		color: #808080;
		font-weight: 600;
		letter-spacing: 4rpx;
	}


	.ic {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 36rpx;
		color: #8799A3;
	}

	.PlanningCompany {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		height: 480rpx;
	}

	.PlanningPic {
		border-radius: 8%;
		max-width: 100%;
		max-height: 100%;
		height: 440rpx;
		width: 310rpx;
		margin-top: 40rpx;
		margin-right: 20rpx;
	}

	.CompanyPic {
		border-radius: 8%;
		max-width: 100%;
		max-height: 100%;
		height: 440rpx;
		width: 310rpx;
		margin-top: 40rpx;
		margin-left: 20rpx;
	}

	.list {
		margin-top: 20rpx;
	}

	.about {
		display: flex;
		flex-direction: row;
		background-color: #FFFFFF;
		height: 80rpx;
		align-items: center;
	}



	.company_request {
		color: #AAAAAA;
	}

	.jobRow {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.company_logo {
		max-width: 100%;
		max-height: 100%;
		height: 100rpx;
		width: 150rpx;
	}

	.company_salary {
		font-size: 30rpx;
		color: #397af3;
		/* width: 35%; */
	}
	
	.jobContent{
		font-size: 30rpx;
		color: #7c7c7c;
		/* width: 45%; */
	}

	.hot_position {
		font-weight: bolder;
		font-size: 42rpx;
		letter-spacing: 4rpx;
		margin-left: -5rpx;
	}

	.company_position {
		font-weight: bold;
		font-size: 35rpx;
	}

	.infor {
		flex-direction: column;
		margin-top: 35rpx;
	}

	.oneitem {
		display: flex;
		flex-direction: column;
		height: 200rpx;
		width: 90%;
		border-radius: 30rpx;
		box-shadow: 0rpx 3rpx 15rpx #e6e6e6;
		margin: 0rpx auto 40rpx auto;
		padding: 30rpx 30rpx;
		
	}

	.company_request {
		margin-top: 10rpx;
	}

	.divLine {
		background: #edefe7;
		width: 95%;
		height: 2rpx;
		margin: 0rpx auto;
	}

	.divLine2 {
		padding: 12px 6px 0px 6px;
		margin-left: 30rpx;
		border-left: 10rpx solid #359bff;
		height: 48rpx;
		margin-top: 5rpx;
	}
</style>
