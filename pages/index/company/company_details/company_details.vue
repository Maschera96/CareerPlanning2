<template>
	<view class="body">
		<view class="content">
			
			<!-- 头部层 -->
			<view class="head">
				<image class="background" src=cloud://zygh-test-wn16v.7a79-zygh-test-wn16v-1301651483/company_background/background.jpg	></image>
			</view>	
			
			<!-- 卡片层 -->
			<view class="card">
				<view class="viewHead">
					<view class ="font">
						<view class="Name">{{company.companyName}}</view>
						<!-- <image class="ic1" src=/static/company_details/wodeqiye.png></image> -->
						<text class="text-grey">北京|C轮 200人以上|文娱|内容</text>
					</view>
					<image class="logo" :src="company.companyLogo"></image>
				</view>
				<text class="text2">公司介绍</text>
				<text class="tag">移动互联网</text>
				<text class='production_detail' :class= "modalName?'ellipsis':'unellipsis'">{{company.introduction}}</text>
				<view class='bg-white-ellipsis' @tap ="changeData">
					<image class='img-ellipsis' :src= "modalName?'/static/company_details/ellipsis.png':'/static/company_details/unellipsis.png'"></image>
				</view>
			</view>	
			
			<!--轮播层 -->
			<view class="product">
				<text class="text2">主要产品</text>
			</view>
			<scroll-view scroll-x="true" class="scroll">
				<view v-for="(value,index) in company.products" :key="index" class="box">
					<image :src="value.logo" class="images"></image>
					<view class="main_product">
						<text class="main_product_name">{{value.name}}</text>
						<view class="main_product_pro">{{value.introduction}}</view>
					</view>
				</view>
				<!-- <view class="box">
					<image src=../../static/index_pic/034e2e9d3cfe49f8bb0a3367c9afec47_noop%20(1).png class="images"></image>   
					<view class="main_product">
						<text class="main_product_name">今日头条</text>
						<view class="main_product_pro">今日头条,一款基于数据挖掘的推荐引擎产品</view>
					</view>
				</view>
				<view class="box">
					<image src=../../static/company_details/西瓜视频.png class="images"></image>   
					<view class="main_product">
						<text class="main_product_name">西瓜视频</text>
						<view class="main_product_pro">西瓜视频通过人工智能帮助每个人发现自己喜欢的视频，并帮助视频创作人们轻松地向全世界分享自己的视频作品</view>
					</view>
				</view> -->
			</scroll-view>
			
			<!-- 企业高管层 -->
			<view class="management">
				<text class="text2">企业高管</text>
				<view class="pic_name">
					<image class="headpic" :src="company.managers.logo"></image>
					<view class="manage_name">
						<text class="manage_position">CEO\n</text>
						<text class="manege_com">{{company.managers[0].name}}</text>
					</view>
				</view>
				<view class="manage_intro">{{company.managers[0].introduction}}</view>
			</view>	
			
			<!-- 大事记 -->
			<!-- <view class="importantmatter">
				<view class="guide">
					<view class="text2">大事记</view>
					<text class="more">查看更多&nbsp;></text>
				</view>	
				
				<view class="matter_list">
					<view class="matter_item">
						<view class="date">
							<view class="date-month">10月\n</view>
							<view class="years">2018</view>
						</view>
						<view class="matter_infor">
							<view class="matter_title">今日头条进行 750 亿美元估值融资</view>
							<view class="matter_detail">根据公众号「IPO 早知道」独家消息源，今日头条正进行 750 亿美元估值的私募融资，富达等知名长线基金将参与本轮融资。本轮融资将于下月初交割。</view>
						</view>		
					</view>
					<view class="divLine"></view>
				</view>	
				
				<view class="matter_list">
					<view class="matter_item">
						<view class="date">
							<view class="date-month">10月\n</view>
							<view class="years">2018</view>
						</view>
						<view class="matter_infor">
							<view class="matter_title">今日头条进行 750 亿美元估值融资</view>
							<view class="matter_detail">根据公众号「IPO 早知道」独家消息源，今日头条正进行 750 亿美元估值的私募融资，富达等知名长线基金将参与本轮融资。本轮融资将于下月初交割。</view>
						</view>		
					</view>
					<view class="divLine"></view>
				</view>	
				
				<view class="matter_list">
					<view class="matter_item">
						<view class="date">
							<view class="date-month">10月\n</view>
							<view class="years">2018</view>
						</view>
						<view class="matter_infor">
							<view class="matter_title">今日头条进行 750 亿美元估值融资</view>
							<view class="matter_detail">根据公众号「IPO 早知道」独家消息源，今日头条正进行 750 亿美元估值的私募融资，富达等知名长线基金将参与本轮融资。本轮融资将于下月初交割。</view>
						</view>		
					</view>
					<view class="divLine"></view>
				</view>	
				
			</view> -->
			
			<!-- 问答层 -->
			<!-- <view class="qa">
				<view class="guide">
					<view class="text2">公司问答</view>
					<text class="more">查看全部&nbsp;></text>
				</view>	
				<view class="question">
					<image class="que_pic" src=../../static/company_details/wenda.png></image>
					<text class="que_des">是996吗？</text>
				</view>
				<view class="answer">
					<text class="ans">1关注&nbsp;0回答&nbsp;</text>
				</view>
				
				<view class="divLine1"></view>
				
				<view class="question">
					<image class="que_pic" src=../../static/company_details/wenda.png></image>
					<text class="que_des">是996吗？</text>
				</view>
				<view class="answer">
					<text class="ans">1关注&nbsp;0回答&nbsp;</text>
				</view>
			</view> -->
			
			<!-- 公司网站 -->
			<view class="website">
				<text class="text2">公司官网</text>
				<view class="web">{{company.website}}</view>
			</view>
			
			<!--地图层 -->

			<!--工商信息 -->
			<view class="ic">
				<view class="text2">工商信息</view>
				<view class="ic_infor">
					<view class="line1">
						<view class="ic_title">公司全称</view>
						<view class="ic_detail">{{company.fullName}}</view>
					</view>
					<view class="line1">
						<view class="ic_title">成立时间</view>
						<view class="ic_detail">{{company.establishTime}}</view>
					</view>
					<view class="line1">
						<view class="ic_title">注册资本</view>
						<view class="ic_detail">{{company.registerMoney}}万人民币</view>
					</view>
					<view class="line1">
						<view class="ic_title">法人代表</view>
						<view class="ic_detail">{{company.legalPerson}}</view>
					</view>
				</view>	
			</view>
		</view>	

		<view class="bottom">
				<view class="collect">
					<image class="collect_pic" src=/static/company_details/collect.png></image>
					<view class=bottom_word1>收藏企业</view>
				</view>
				<view class="divLine2"></view>
				<view class="share">
					<image class="share_pic" src=/static/company_details/share.png></image>
					<view class=bottom_word2>分享</view>
				</view>
				<view class="toview" @tap="com(id)">
					<view class="view_word">查看岗位</view>
				</view>
		
	</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				modalName: true, // 文字是否收起，默认收起
				company:{},
				id: null,
			}
		},
		onLoad:function(option){
			this.id = option.company_id
			
			uni.request({
				url: 'http://1.15.175.248:8000/company/get/' + this.id,
				success: (res) => {
					this.company = res.data.data
					console.log(this.company);
				}
			})
		},
			   
		methods:{ 
			changeData: function () {
				var value = !this.modalName;
				this.modalName = value;
			},
			com:function(id){
				uni.navigateTo({
					url:"/pages/index/company/company_details/jobbrowse/jobbrowse?company_id="+id
				})
			},
		},
	}


</script>


<style>
	.content{
		display: flex;
		flex-direction: column;
		background-color:#FFFFFF;
		margin-bottom: 120rpx;
	}
	
	.background{
		height: 400rpx;
		width: 800rpx;
		margin-bottom: 30rpx;	
		margin-top: -40rpx;
	}
	
	.card{
		display:flex;
		flex-direction: column;
		background-color: #FFFFFF;
		border-top-left-radius:50rpx;
		border-top-right-radius:50rpx;
		margin-top: -100rpx;
		z-index: 1;
	}
	
	.font{
		display: flex;
		flex-direction: column;
		margin-top: 50rpx;
		
	}
	
	.Name{
		font-size: 54rpx;
		font-weight: bolder;
		margin-left: 60rpx;
		white-space: nowrap;
	}
	
	.ic1{
		max-width: 100%;
		max-height: 100%;
		height: 75rpx;
		width: 75rpx;
		margin-left: 20rpx;
		
	}
	.logo{
		display: flex;
		max-width: 270rpx;
		max-height: 150rpx;
		margin-right: 20rpx;
		position: relative;
		top: 30rpx;
	} 
	
	.viewHead{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.text-grey{
		margin-left: 60rpx;
		font-size: 30rpx;
		margin-top: 10rpx;
	}
	
	.production{
		font-size:40rpx ;
		font-weight: bolder;
		margin-left: 60rpx;
		margin-top: 35rpx;
	}
	
	.tag{
		margin-left: 60rpx;
		color: #AAAAAA;
		margin-top: 20rpx;
		border: 1rpx solid;
		width: 150rpx;
		text-align: center;
	}
	
	.production_detail{
		margin-left: 60rpx;
		margin-top: 20rpx;
		text-indent:2em;
		font-size: 30rpx;
		display: -webkit-box;
		-webkit-box-orient:vertical;
		text-overflow: ellipsis;
		overflow:hidden; 
		font-weight: 600;
		line-height:1.5em;
		margin-right: 60rpx;
		text-align: justify;/*解决文本右端不对齐问题*/
	}
	
	.ellipsis{
	  -webkit-line-clamp:3; 
	  opacity: 0.75 ;
	}
	
	.unellipsis{
	  -webkit-line-clamp:0; 
	  opacity: 1 ;
	  }
	
	.img-ellipsis{
		color: #39B54A;
        max-width: 100%;
		max-height: 100%;
		width: 40rpx;
		height: 40rpx;
		margin-left: 330rpx;
		margin-top: 15rpx;
	}	
	
	.product{
		margin-top: 35rpx;
	}
	
	.text2{
		margin-left: 60rpx;
		font-size:44rpx ;
		font-weight: bolder;
		margin-top: 35rpx;
	}  
	
	.scroll {
	    width: 100%;
	    overflow: hidden;/*溢出处理*/
	    white-space: nowrap;/*规定不换行*/
	}
	 
	.box {
	    display: inline-block;/*，inline-block：将对象呈递为内联对象，但是对象的内容作为块对象呈递。旁边的内联对象会被呈递在同一行内*/
	    width: 450rpx;
	    height: 180rpx;
	    background: #ffffff;
	    margin-right: 30rpx;
		margin-top: 30rpx;
		margin-left: 60rpx;
		box-shadow: 1px 1px  2px #a6a6a6;
		border-radius: 16rpx;
	}
	
	 .main_product{
		 margin-left: 200rpx;
		 margin-top: -130rpx;
	 }
	 
	.main_product_name{
		font-size: 40rpx;
		font-weight: bolder;
	}
	
	.main_product_pro{
		margin-top: 15rpx;
		overflow: hidden;
		text-overflow:ellipsis;
		color:#AAAAAA;
	}
	
	.box:last-child {
	    margin-right: 30rpx;
	}
	 
	.images {
	    width: 140rpx;
	    height: 140rpx;
		margin-left: 20rpx;
		margin-top: 20rpx;
	}
	
	.management{
		margin-top: 40rpx;
	}
	
	.pic_name{
		margin-left: 80rpx;
		display: flex;
		flex-direction: row;
	}
	
	.headpic{
		border-radius:50%;
		height: 90rpx;
		width: 90rpx;
		margin-top: 30rpx;
	}
	
	.manage_name{
		margin-top: 35rpx;
		margin-left: 20rpx;
	}
	
	.manage_position{
		font-weight: bold;
		font-size: 40rpx;
	}
	
	.manege_com{
		color:grey;	
	}
	
	.manage_intro{
		margin-left: 100rpx;
		margin-top: 20rpx;
		margin-right: 40rpx;
		text-align: justify;/*解决文本右端不对齐问题*/
		font-size: 30rpx;
		text-indent:2em;
		font-weight: 600;/*粗细设置 默认粗细为500*/
		line-height:1.5em;/*字体行间距，相对设置 1.5字符宽*/
	}

	.guide{
		display: flex;
		flex-direction: row;
	}
	
	.more{
		color:grey;
		font-size: 32rpx;
		margin-top: 40rpx;
		position:absolute; /*绝对定位*/
		left: 560rpx;
	}
	
	.divLine{
		background: #e7eae1;
		width: 100%;
		height: 3rpx;
		margin-top: 20rpx;
	}
	
	.divLine1{
		background: #e7eae1;
		margin-left: 60rpx;
		height: 3rpx;
		margin-top: 20rpx;
	}
	.matter_list{
		margin-top: 30rpx;
		margin-left: 80rpx;
	}
	
	.matter_item{
		display: flex;
		flex-direction: row;
	}
	
	.matter_title{
		font-size: 33rpx;
		font-weight: 600;
	}
	
	.matter_infor{
		margin-left: 10rpx;
	}
	
	.matter_detail{
		color:grey;
		overflow : hidden;
		text-overflow: ellipsis;  /*多行文字省略号*/
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	.date{
		border: 3rpx solid #e9e8ec;
		background-color:#e9e8ec ;
		width: 300rpx;
	}
	
	.date-month{
		color: grey;
		font-size: 33rpx;
		font-weight: 600;
		text-align: center;
		margin-top: 15rpx;
	}
	
	.years{
		color: grey;
		font-size: 30rpx;
		font-weight: 600;
		text-align: center;
	}
	
	.qa{
		margin-top: 20rpx;
	}
	
	.que_des{
		font-size: 33rpx;
		font-weight: 600;
	}
	
	.website{
		margin-top: 60rpx;
	}
	
	.web{
		margin-left: 60rpx;
		margin-top: 20rpx; /*对text无作用*/
		font-weight: 600;
		font-size: 32rpx;
		color:grey;
	}
	
	.question{
		margin-left: 60rpx;
		margin-top: 30rpx;
		display: flex;
		flex-direction: row;
	}
	
	.answer{
		margin-left: 60rpx;
		color:grey;
		margin-top: 20rpx;
	}
	
	.que_pic{
		max-width: 100%;
		max-height: 100%;
		width:40rpx;
		height: 40rpx;
	}
	
	.line1{
		display: flex;
		flex-direction: row;
	}
	
	.ic{
		margin-top: 30rpx;
		margin-bottom: 30rpx;
		height: 480rpx;
	}
	
	.ic_title{
		color:grey;
		font-weight: 600;
		font-size: 33rpx;
		margin-left: 30rpx;
		margin-top: 30rpx;
		white-space: nowrap;
	}
	
	.ic_detail{
		color:grey;
		font-weight: 600;
		font-size: 33rpx;
		margin-top: 30rpx;
		margin-left: 50rpx;
	}
	
	.ic_infor{
		border:  5rpx solid #e1e1e1;
		margin: 30rpx 30rpx 0rpx 60rpx;
		padding-bottom: 20rpx;
		
		/* height: 320rpx; */
	}
	
	.collect{
		margin-left: 30rpx;
		margin-top: 20rpx;
	}
	
	.share{
		margin-left: 20rpx;
		margin-top: 25rpx;
	}
	
	.collect_pic{
		max-width: 100%;
		max-height: 100%;
		width:50rpx;
		height: 50rpx;
		margin-left: 30rpx;
	}
	
	.share_pic{
		max-width: 100%;
		max-height: 100%;
		width:42rpx;
		height: 42rpx;
	}
	
	.bottom{
		display: flex;
		flex-direction: row;
		width:100%;
		border:  2rpx solid #e1e1e1;
		position: fixed;
		bottom:0rpx;
		z-index: 1;
		height: 120rpx;
		background-color:#FFFFFF;
		
	}
	
	.bottom_word1{
		color: grey;
	}
	
	.bottom_word2{
		color: grey;
		margin-left: -5rpx;
		margin-top: 5rpx;
	}
	
	.divLine2{
		padding:12px 6px 0px 6px;
		margin-left: 30rpx;
		border-left: 2px solid #d5d5d5;
		font-size: 0;
		height: 60%;
		margin-top: 20rpx;
	}
	
	.toview{
		border:  5rpx solid #298df8;
		background-color: #298df8;
		margin-left: 70rpx;
		height: 60%;
		margin-top: 24rpx;
		width: 380rpx;
		border-radius: 10rpx;
	}
	
	.view_word{
		font-size: 36rpx;
		font-weight: 500;
		color: #FFFFFF;
		text-align:  center;	
		letter-spacing: 8rpx;
		margin-top: 5rpx;
	}
</style>
