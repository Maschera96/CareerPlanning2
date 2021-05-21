<template>
	<view class="cul">
		<view class="cu-card shadow-warp" v-for="(item,index) in company" :key="index"
			style="background-color: #FFFFFF; margin-top: 25rpx;">
			<view class="cu-list" @tap="gotocompanys(item.indexCode)">
				<view class="ro">
					<image style="width: 200rpx; height: 180rpx; margin-left: 25rpx;" :src="item.companyLogo" mode="aspectFit">
					</image>
					<!-- <view>item.companyLogo{{item.companyLogo}}</view> -->
					<view class="cul">
						<text class="text-title">{{item.companyName}}</text>
						<view class="ro">
							<text class="text-introtion_">面试评分</text>
							<text class="text-introtion_"
								style="margin-left: 180rpx;">在招职位&nbsp;{{item.jobs_count}}</text>
						</view>
						<text class="text-introtion">
							北京&ensp;|&ensp;C轮200以上&ensp;|&ensp;文娱&ensp;|&ensp;内容</text>
					</view>
				</view>
				<view class="text-ps">
					<text class="text-introtion" style="margin-left: 25rpx;">{{item.slogan}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				company: []
			}
		},
		onLoad: function(e) {
			let pageIndex = 1
			let pageSize = 5
			
			uni.request({
				url: `http://1.15.175.248:8000/company/list/${pageIndex}/${pageSize}`,
				method: 'GET',
				success: (res) => {
					console.log(res);
					this.company = res.data.data.data
					console.log(this.company);
				},
				fail: (err) => {
					console.log('failed',err);
				}
			})
		},
		methods: {
			gotocompanys: function(companyId) {
				uni.navigateTo({
					url: "/pages/index/company/company_details/company_details?company_id=" + companyId
				})
			}
		}
	}
</script>

<style>
	.cul {
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
	}

	.ro {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.text-introtion {
		color: #AAAAAA;
		font-size: 30rpx;
		margin-top: 10rpx;
	}

	.text-introtion_ {
		color: #5b2d00;
		font-size: 30rpx;
		margin-top: 10rpx;
	}

	.text-title {
		font-size: 37rpx;
		font-weight: 600;
	}

	.text-ps {
		color: #AAAAAA;
		justify-content: center;
		padding: 15rpx;
		font-size: 30rpx;
		margin-left: 25rpx;
		margin-right: 25rpx;
		line-height: 1.5em;
		border-top: 1upx solid #eee;
	}
</style>
