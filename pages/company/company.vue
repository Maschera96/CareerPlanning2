<template>
	<view class="cul">
		<view class="cu-card shadow-warp" v-for="(item,index) in company" :key="index" 
		style="background-color: #FFFFFF; margin-top: 25rpx;">
			<view class="cu-list" @click="com">					
				<view class="ro">
					<image style="width: 200rpx; height: 180rpx; margin-left: 25rpx;"
					:src="item.logo" mode="aspectFit"></image>
					<view class="cul" >
						<text class="text-title">{{item.name}}</text>
						<view class="ro">
							<text class="text-introtion_">面试评分</text>
							<text class="text-introtion_" style="margin-left: 180rpx;">在招职位&nbsp;5913</text>
						</view>				
						<text class="text-introtion">
						北京&ensp;|&ensp;C轮200以上&ensp;|&ensp;文娱&ensp;|&ensp;内容</text>
					</view>	
				</view>	
				<view class="text-ps">
					<text class="text-introtion" style="margin-left: 25rpx;">和优秀的人&nbsp;做有挑战的事</text>
				</view>		
			</view>			   			
		</view>
	</view>	
</template>

<script>
	export default{
		data(){
			return{
				company:[]
			}
		},
		onLoad:function(e) {
			var th=this;
			uni.request({
				url:"http://zygh.store/api/company",
				method:"GET",
				success:function(res){
					th.company=res.data.data.data;
					console.log(res.data);
				}
			})
		},
		methods:{
			com:function(){
				uni.navigateTo({
					url:"../company_details/company_details"
				})
			}
		}
	}
</script>

<style>
	.cul{
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
	}
	
	.ro{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
		
	.text-introtion{
		color: #AAAAAA;
		font-size: 30rpx;
		margin-top: 10rpx;
	}	
	
	.text-introtion_{
		color: #5b2d00;
		font-size: 30rpx;
		margin-top: 10rpx;
	}
	
	.text-title{
		font-size: 37rpx;
		font-weight: 600;
	}
	
	.text-ps{
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
