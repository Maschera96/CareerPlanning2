<template>
	<view class = "content">
		
		<!-- 头部层 -->
		<view class="head">
			<view class="cu-bar search ">
				<icon class="action">
					<text class="country">全国</text>
					<icon class="cuIcon-triangledownfill" style="font-size: 40rpx;"></icon>
				</icon>
					<view class="search-form round">
						<text class="cuIcon-search"></text>
						<input type="text" placeholder="搜索职位或公司名称" confirm-type="search"></input>
					</view>			
			</view>
			<view class="icon-phone">
				<icon class='cuIcon-phone' style="color:#00000;font-size: 200%;"></icon>
			</view>
		</view>

		<!-- 卡片层 -->
		<view class="card">
			<navigator url="/pages/index/temporary">
				<image class="cardp" src=../../static/index_pic/QQ图片20200307165602.png></image>
			</navigator>
		</view>	
	
		
		<!-- 按钮层  -->
		<view class ="icon">
			<navigator url="/pages/position_details/position_details">
				<view class = "ic">
					<view class="course">
						<image class="course_icon" src=../../static/index_pic/课程.png></image>
					</view>
					<view class="text2">
						<text>课程</text>
					</view>
				</view>	
			</navigator>
			
			<navigator url="/pages/college/college">
				<view class = "ic">
				<view class="college">
					<image class="college_icon" src=../../static/index_pic/学院.png></image>
				</view>
					<view class="text2">
						<text>学院</text>
					</view>
				</view>	
			</navigator>
			
			<navigator url="/pages/index/temporary">
				<view class = "ic">
					<view class="book">
						<image class="book_icon" src=../../static/index_pic/书籍.png></image>
					</view>
					<view class="text2">
						<text>书籍</text>
					</view>
				</view>	
			</navigator>
			
			<navigator url="/pages/index/temporary">
				<view class = "ic">
				<view class="competition">
					<image class="competition_icon" src=../../static/index_pic/竞赛.png></image>
				</view>
					<view class="text2">
						<text>竞赛</text>
					</view>
				</view>	
			</navigator>
		</view>
		
		<!-- 学校企业层  -->
		<view class="sc">
			<navigator url="/pages/index/temporary">
				<view class="s">
					<image class="sp" src=../../static/index_pic/%7BE4FE2AB9-6A61-A48C-3978-6999C9ADE1FC%7D.png >
					</image>
				</view>
			</navigator>
			
			<navigator url="/pages/company/company">
				<view class="c">
					<image class="cp" src=../../static/index_pic/%7B04D0918C-D4F1-FFFC-FEA5-CB4171288CDE%7D.png >
					</image>
				</view>
			</navigator>
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
			
				<view class="hotposition">
					<view class="ex" v-for="(value,index) in listData" :key="index" @click="goDetail" >
						<view class="oneitem">
							<image class="company_logo" v-bind:src=value.company_logo> </image>
							<view class="infor">
								<view class="company_position">{{value.position}}</view>
								<view class="company_request">{{value.place}}|{{value.experience}}|{{value.education}}</view>
							</view>
							<view class="company_salary">{{value.salary}}</view>
						</view>		
						<view class="divLine"></view>
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
				listData:[]
			
			}
		},
		onLoad:function(e){
			let th=this;
			uni.request({
				url:'http://zygh.store/api/job ',
				success:function(res){
					th.listData=res.data.data.data;
					console.log(th.listData);
					}
				})
		},
		methods: {

		}
	}
</script>

<style>
	.content{
		display: flex;
		flex-direction: column;
		background-color: #FFFFFF;
		
	}
	.head{
		display: flex;
		flex-direction: row;
		justify-content:space-around;
	}
		
	.cu-bar {
		width:680rpx;
		font-size:20rpx ;
		margin-top: 15rpx;
	}	
	
	.action{
		width: 120rpx;
		flex-direction: row;
		font-size: 100rpx;
		justify-content:space-around;
		margin-top: -20rpx;
	}
	
	
	.icon-phone{
		margin-top: 35rpx;
		margin-right: 20rpx;
	}
	
	.country{
		font-size: 30rpx;
		font-weight: 600;
		letter-spacing: 2rpx;
	}
	
	.card {
		display:flex;
		justify-content:space-around;
	}
	
	.cardp {
		height: 250rpx;
		width: 700rpx;
		margin-top: 20rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 30rpx;	
	}
	
	.course{
		border:3px solid #51c3b9;
		border-radius:50%;
		background-color: #51c3b9;
		width: 90rpx;
		height: 90rpx;
	}
	
	.college{
		border:3px solid #9835ff;
		border-radius:50%;
		background-color: #9835ff;
		width: 90rpx;
		height: 90rpx;
	}
	
	.book{
		border:3px solid #ff3572;
		border-radius:50%;
		background-color: #ff3572;
		width: 90rpx;
		height: 90rpx;
	}
	
	.competition{
		border:3px solid #ff8735;
		border-radius:50%;
		background-color: #ff8735;
		width: 90rpx;
		height: 90rpx;
	}
	
	.course_icon{
		max-width: 100%;
		max-height: 100%;
		width: 60rpx;
		height: 60rpx;
		margin-left: 10rpx;
		margin-top: 8rpx;
	}
	
	.college_icon{
		max-width: 100%;
		max-height: 100%;
		width: 60rpx;
		height: 60rpx;
		margin-left: 10rpx;
		margin-top: 9rpx;
	}
	
	.book_icon{
		max-width: 100%;
		max-height: 100%;
		width: 60rpx;
		height: 60rpx;
		margin-left: 10rpx;
		margin-top: 10rpx;
	}
	
	.competition_icon{
		max-width: 100%;
		max-height: 100%;
		width: 60rpx;
		height: 60rpx;
		margin-left: 10rpx;
		margin-top: 10rpx;
	}
	.icon {
		display: flex;
		flex-direction:row;
		align-items:center;
		justify-content:space-around;
		margin-top: 10rpx;
		margin-right:  30rpx;
		margin-left:  30rpx;
	}
	
	.text2{
		margin-top: 15rpx;
		font-size: 31rpx;
		color: #808080;
		font-weight: 600;
		letter-spacing: 4rpx;
	}
	
	
	.ic{
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 36rpx;
		color: #8799A3;
	}

	.sc {    
		display: flex;
		flex-direction: row;
		justify-content:space-around;
		height:480rpx;
	}
	
	.sp {
		border-radius: 8%;
		max-width: 100%;  
	    max-height: 100%;
		height: 440rpx;
		width: 310rpx;
		margin-top: 40rpx;
		margin-left: 20rpx;
	}	
	.cp {
		border-radius: 8%;
		max-width: 100%;
		max-height: 100%;
		height: 440rpx;
	    width: 310rpx;
		margin-top: 40rpx;
		margin-right:  20rpx;
	}
	
	.list{
		margin-top: 40rpx;
	}
	
	.about{
		display: flex;
		flex-direction: row;
	}


	
	.company_request{
		color:#AAAAAA;
	}
	
	.company_logo{
		max-width: 100%;
		max-height: 100%;
		height: 100rpx;
		width: 200rpx;
		margin-left: 40rpx;
		margin-top: 20rpx;
	}
	
	.company_salary{
		margin-top: 20rpx;
		font-size: 30rpx;
		color:#397af3;
	}
	
	.hot_position{
		font-weight: bolder;
		font-size: 42rpx;
		letter-spacing:4rpx; 
		margin-left: -5rpx;
	}
	
	.company_position{
		font-weight: bold;
		font-size: 30rpx;
	}
	
	.infor{
		flex-direction: column;  
		margin-top: 35rpx;
	}
		
	.oneitem{
		display: flex;
		flex-direction: row;
		height:130rpx;
	}
	
	.company_request{
		margin-top: 10rpx;
	}
	
	.company_salary{
		position:absolute;
		left: 650rpx;
		margin-top: 40rpx;
	}
	
	.divLine{
		background: #edefe7;
		width: 100%;
		height: 2rpx;
		margin-left: 30rpx;
	}
	
	.divLine2{
		padding:12px 6px 0px 6px;
		margin-left: 30rpx;
		border-left: 10rpx solid #359bff;
		height: 48rpx;
		margin-top: 5rpx;
	}
</style>
