<template>
	<view>
		<!-- 导航栏 -->
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub text-blue cur">
					岗位
				</view>
			</view>
		</scroll-view>
		
		<!-- 岗位 -->
		<view v-if="TabCur === 0">
			<view v-for="(item,index) in jobList" :key="index" @tap="gotoJob(item.indexCode)">
				<view class="item">
					<view class="title">{{item.jobName}}</view>
					<view class="content">
						<view class="time">{{item.jobPlace}} | {{item.jobType}}</view>
						<!-- <view class="type">来自话题：{{item.articleType}}</view> -->
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
				TabCur: 0,
				jobPage: 1,
				jobList: [],
				openId: ''
			}
		},
		
		onLoad:async function(e){
			let res = await wx.getStorage({
				key: 'openId'
			})
			this.openId = res.data
			this.reqJob()
		}, 
	
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
			},
			reqJob: function(){
				uni.request({
					url: `http://1.15.175.248:8006/mine/resume/my_send/${this.openId}/${this.jobPage}/20`,
					success: (res) => {
						console.log(res);
						this.jobList = this.jobList.concat(res.data.data.data)
					}
				})
			},
			gotoJob: function(indexCode){
				uni.navigateTo({
					url: '/pages/index/company/company_details/jobbrowse/position_details/position_details?job_id=' + indexCode
				})
			},
		}
	}
</script>

<style>
	.item{
		width: 90%;
		margin: 30rpx auto;
		border-radius: 30rpx;
		box-shadow: 0rpx 3rpx 15rpx #e6e6e6;
		padding: 30rpx;
		display: flex;
		flex-direction: column;
	}
	
	.title{
		font-size: 30rpx;
		font-weight: 600;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.content{
		margin-top: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	
	.time{}
	
	.type{}
</style>

