<template>
	<view class="cul">
		<view class="item cu-card shadow-warp" v-for="(item,index) in company" :key="index"
			style="background-color: #FFFFFF; margin-top: 25rpx;">
			<view class="cu-list" @tap="gotocompanys(item.indexCode)">
				<view class="ro">
					<image style="width: 27%; height: 180rpx; margin-left: 25rpx;" :src="item.companyLogo"
						mode="aspectFit">
					</image>
					<!-- <view>item.companyLogo{{item.companyLogo}}</view> -->
					<view class="cul" style="width: 73%; padding: 30rpx;">
						<view class="ro">
							<text class="text-title">{{item.companyName}}</text>
							<text class="text-introtion_">在招职位&nbsp;{{item.jobsCount}}</text>
						</view>
						<text class="text-introtion">
							{{item.companyAddress.split('市')[0]}}&ensp;|&ensp;{{item.financing}}&ensp;|&ensp;{{item.companyType}}</text>
					</view>
				</view>
				<view class="text-ps">
					<text class="text-introtion" style="margin-left: 25rpx;">{{item.slogan}}</text>
				</view>
			</view>
		</view>
		<view style="height: 1140rpx;"></view>
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
					for(let i = 0; i<this.company.length; i++){
						let str = this.company[i].companyAddress
						console.log(str);
						let newStr = /[国|省](.{2})市/.exec(str)
						if(newStr){this.company[i].companyAddress = newStr[1];continue}
						newStr = /[国|省](.{2})/.exec(str)
						if(newStr){this.company[i].companyAddress = newStr[1];continue}
						newStr = /(.{2})市/.exec(str)
						if(newStr){this.company[i].companyAddress = newStr[1];continue}
					}
				},
				fail: (err) => {
					console.log('failed', err);
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
		justify-content: space-between;
		align-items: center;
	}

	.item {
		border-radius: 30rpx;
		width: 90%;
		padding: 20rpx 0rpx;
		margin: 0rpx auto;
		box-shadow: 0rpx 3rpx 15rpx #e6e6e6;
	}

	.text-introtion {
		color: #AAAAAA;
		font-size: 30rpx;
		margin-top: 10rpx;
	}

	.text-introtion_ {
		color: #5b2d00;
		font-size: 30rpx;
	}

	.text-title {
		font-size: 37rpx;
		font-weight: 600;
		width: 55%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
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
