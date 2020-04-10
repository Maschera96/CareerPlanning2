<template>
	<view class="cul">
		
		<view class="imag">
			<view class="bg-img" style="background-image: url(../../static/v2_q72jv1.jpg);
			height: 300rpx;width: 100%; border-radius: 30rpx 30rpx 30rpx 30rpx;">
			</view>
		</view>
			
		<view class="cu-list shadow-warp menu" style="margin-left: 20rpx;margin-right: 20rpx;
		margin-top: 30rpx;border-radius: 30rpx 30rpx 30rpx 30rpx;">
			<view class="cu-item" style="display: flex; flex-direction: column;" 
			v-for="(item,index) in college" :key="index" @click="colle">
				<view class="ro">
					<image style="width: 230rpx; height: 180rpx; margin-top: 30rpx; margin-bottom: 30rpx;" 
					src="../../static/v2_q70v3r.png"></image>
					<view class="cul margin-left-lg">
						<text class="text-title">{{item.name}}</text>
						<text class="text-introtion">{{item.major}}</text>	
					</view>			
				</view>	
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				college:[]
			}
		},
		onLoad:function(e) {
			var th=this;
			uni.request({
				url:"http://zygh.store/api/college",
				method:"GET",
				success:function(res){
					th.college=res.data.data.data;
					console.log(res.data);
				}
			})
		},
		methods:{
			colle:function(){
				uni.navigateTo({
					url:"college_details"
				})
			}
		}
	}
</script>

<style>
	.cul{
		display: flex;
		flex-direction: column;	
		background-color: #FFFFFF;
    }
	
	.ro{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	
	.text-title{
		font-size: 40rpx;
		font-weight: 700;
	}
	
	.text-introtion{
		color: #AAAAAA;
		font-size: 30rpx;
		margin-top: 10rpx;
	}	
	
	.imag{
		padding-left: 20rpx;
		padding-right: 20rpx;
		padding-top: 30rpx;
		padding-bottom: 15rpx;
	}
</style>
