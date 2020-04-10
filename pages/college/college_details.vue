<template>
	<view class="content">
		
		<!--头顶图片 -->
		<view class="head">
			<image class="head_pic" src=../../static/college_details/杭电校门.jpg></image>
		</view>
		
		<!--学院介绍 -->
		<view class="college_intro">
			<view class="intro_word">
				<view class="collegename">计算机学院</view>
				<view class="intro_details">1980年&nbsp;&nbsp;|&nbsp;&nbsp;教职工180人&nbsp;&nbsp;|&nbsp;&nbsp;三个专业</view>
			</view>
			<view class="intro_logo">
				<image class="collge_logo" src=../../static/college_details/杭电校徽.png></image>
			</view>	
		</view>
		
		<!--开设专业 -->
		<view class="college_major">
			<view class="major">
				<view class="divLine"></view>
				<view class="major_word">
					<text class="title1">开设专业</text>
				</view>
			</view>		
			
			<view class="own_major">
				<view class="majoritem">计算机科学与技术</view>
				<view class="majoritem">软件工程</view>
				<view class="majoritem">物联网</view>
			</view>
		</view>
		
		<!--开设课程-->
		<view class="college_course">
			<view class="course">
				<view class="divLine"></view>
				<view class="major_word">
					<text class="title1">特色课程</text>
				</view>
			</view>		
			<!-- 待循环-->
				<view class="course_item">
					<view class="level">A类</view>
					<view class="courseone">
						<view class="course_name">计算机组成原理</view>
						<view class="course_summary">计算机的基本组成原理和内部工作机制</view>
					</view>
					<view class="course_request1">必修</view>
				</view>	
				<view class="course_item">
					<view class="level">B类</view>
					<view class="courseone">
						<view class="course_name">计算机网络</view>
						<view class="course_summary">计算机网络的基本概念，、局域网组网方法、网络互联技术等</view>
					</view>
					<view class="course_request2">选修</view>
				</view>	
				<view class="course_item">
					<view class="level">A类</view>
					<view class="courseone">
						<view class="course_name">计算机组成原理</view>
						<view class="course_summary">计算机的基本组成原理和内部工作机制</view>
					</view>
					<view class="course_request1">必修</view>
				</view>	
				<view class="course_item">
					<view class="level">B类</view>
					<view class="courseone">
						<view class="course_name">计算机网络</view>
						<view class="course_summary">计算机网络的基本概念，、局域网组网方法、网络互联技术等</view>
					</view>
					<view class="course_request2">选修</view>
				</view>	
				
				<view class="course_more">查看更多</view>
		</view>
		
		<!--导师 -->
		<view class="tutor">
			<view class="course">
				<view class="divLine"></view>
				<view class="major_word">
					<text class="title1">导师</text>
				</view>
			</view>		
			
			<view class="tutor_item">
				<image class="tutor_logo" src="../../static/college_details/孔万增.png"></image>
				<view class="tutor_intro">
					<view class="tutor_name">孔万增</view>
					<view class="tutor_positiom">博士、教授、博士生导师</view>
					<view class="tutor_emaildress">邮箱：kongwangzeng@hdu.edu.cn</view>
				</view>
			</view>
			<view class="tutor_item">
				<image class="tutor_logo" src="../../static/college_details/张建辉.jpg"></image>
				<view class="tutor_intro">
					<view class="tutor_name">张建辉</view>
					<view class="tutor_positiom">博士、教授、博士生导师</view>
					<view class="tutor_emaildress">邮箱：jh_zhang@hdu.edu.cn</view>
				</view>
			</view>
			<view class="tutor_item">
				<image class="tutor_logo" src="../../static/college_details/孔万增.png"></image>
				<view class="tutor_intro">
					<view class="tutor_name">孔万增</view>
					<view class="tutor_positiom">博士、教授、博士生导师</view>
					<view class="tutor_emaildress">邮箱：kongwangzeng@hdu.edu.cn</view>
				</view>
			</view>
			<view class="tutor_item">
				<image class="tutor_logo" src="../../static/college_details/张建辉.jpg"></image>
				<view class="tutor_intro">
					<view class="tutor_name">张建辉</view>
					<view class="tutor_positiom">博士、教授、博士生导师</view>
					<view class="tutor_emaildress">邮箱：jh_zhang@hdu.edu.cn</view>
				</view>
			</view>
			
				<view class="course_more">查看更多</view>
				
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
				url:'http://zygh.store/api/college/学院id/teachers ',
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
		justify-content: center;
		align-items: center;
	}
	
	.head_pic{
		max-width: 100%;
		max-height: 100%;
		border-radius: 30rpx;
		width: 700rpx;
		height: 230rpx;
	}
	
	.college_intro{
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		margin-top: 30rpx;
	}
	
	.collegename{
		font-weight: bolder;
		font-size: 60rpx;
		letter-spacing: 3rpx;
	}
	
	.intro_details{
		color: grey;
		margin-top: 20rpx;
		font-size: 30rpx;
	}
	
	.collge_logo{
		max-width: 100%;
		max-height: 100%;
		width:180rpx;
		height: 180rpx;
	}
	
	.major{
		display: flex;
		flex-direction: row;
		margin-top: 10rpx;
	}
	
	.divLine{
		padding:12px 6px 0px 6px;
		margin-left: 30rpx;
		border-left: 10rpx solid #535353;
		height: 48rpx;
		margin-top: 8rpx;
	}
	 
	.title1{
		font-size: 44rpx;
		font-weight: bold;
		letter-spacing: 3rpx;
	}
	
	.majoritem{
		border:1rpx solid #ffffff;
		width: 400rpx;
		height: 120rpx;
		margin-left: auto;
		margin-right: auto;    /*框体水平居中 */
		margin-top: 20rpx;
		box-shadow: 0rpx 3rpx 5rpx #e6e6e6; 
		font-size: 40rpx;
		font-weight: bold;
		display: flex;
		justify-content: center;
		align-items: center; /*文字水平垂直居中 */
	}
	
	.course{
		display: flex;
		flex-direction: row;
		margin-top: 50rpx;
	}
	
	.course_item{
		border:1rpx solid #ffffff;
		box-shadow: 0rpx 3rpx 6rpx #e6e6e6; 
		margin-left: auto;
		margin-right: auto; 
		display: flex;
		flex-direction: row;
		width: 680rpx;
		height: 200rpx;
		margin-top: 30rpx;
	}
	
	.level{
		border:1rpx solid #5b5b5b;
		color: #5b5b5b;
		height: 40rpx;
		width: 70rpx;
		display: flex;
		justify-content: center;
		align-items: center; 
		margin-top: 80rpx;
		margin-left: 30rpx;
	}
	
	.courseone{
		display: flex;
		flex-direction: column;
		width: 450rpx;
		margin-top: 30rpx;
		margin-left: 40rpx;
	}
	
	.course_name{
		font-size: 40rpx;
		font-weight: bold;
		color: #5f656c;
	}
	
	.course_summary{
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
	
	.course_more{
		color:#5b5b5b;
		font-size: 32rpx;
		margin-left: 550rpx;
		margin-top: 25rpx;
	}
	
	.tutor{
		margin-bottom: 30rpx;
	}
	
	.tutor_item{
		display: flex;
		flex-direction: row;
		margin-top: 50rpx;
	}
	
	.tutor_logo{
		border-radius:50%;
		height: 150rpx;
		width: 150rpx;
		margin-left: 40rpx;
	}
	
	.tutor_intro{
		margin-left: 60rpx;
		color:#5b5b5b ;
	}
	
	.tutor_name{
		font-size: 40rpx;
		font-weight: bold;
	}
	
	.tutor_positiom{
		font-size: 32rpx;
		margin-top: 10rpx;
	}
	
	.tutor_emaildress{
		font-size: 28rpx;
		margin-top: 10rpx;
	}
</style>
