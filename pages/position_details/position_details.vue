<template>
	<view class="cul">
		
		<view class="cu-card dynamic">
			<view class="cu-item shadow padding-sm" v-for="(item,index) in jobs" :key="index">
				<view class="cu-list menu-avatar shadow-warp" style="padding: 50rpx 30rpx 60rpx 30rpx;">					
					<view class="cul" >
						<view class="ro">
							<text class="text-position">{{item.position}}</text>
							<text class="text-salary">{{item.salary}}</text>
						</view>				
						<text class="text-introtion" style="margin-top: 30rpx;">
						{{item.company_name}}&nbsp;|&nbsp;{{item.place}}&nbsp;|&nbsp;{{item.experience}}&nbsp;|&nbsp;{{item.education}}</text>
					</view>	
				</view>			   
			</view>				
		</view>
		
		<view class="ro" style="margin-left: 45rpx;">
			<text class="text-char">|</text>
			<text class="text-title" style="margin-left: 10rpx;">职位描述</text>
		</view>		
		<text class="text-description" style="margin-top: 30rpx;">职位内容:</text>
		<view class="cul" v-for="(item,index) in jobs" :key="index">
			<text class="text-description" style="margin-top: 15rpx;">{{item.content}}</text>
		</view>
		<text class="text-description" style="margin-top: 30rpx;">职位要求:</text>
		<view class="cul" v-for="(item,index) in jobs" :key="index">
			<text class="text-description" style="margin-top: 15rpx;">{{item.requirement}}</text>
		</view>
		
		<view class="ro" style="margin-left: 45rpx;margin-top: 60rpx;">
			<text class="text-char">|</text>
			<text class="text-title" style="margin-left: 10rpx;">路径推荐</text>
		</view>
		<text class="text-subhead">校内学习</text>
		<view class="cu-list shadow-warp menu" style="margin-top: 30rpx; margin-left: 45rpx; 
		margin-right: 45rpx;border-radius: 30rpx 30rpx 30rpx 30rpx;">
			<view class="cu-item" style="display: flex; flex-direction: column;" 
			v-for="(item,index) in courses" :key="index">
				<view class="ro">
					<image style="width: 180rpx; height: 200rpx; margin-top: 30rpx; margin-bottom: 30rpx;
					border-radius: 20rpx 20rpx 20rpx 20rpx;" 
					src="../../static/20190502124614_awkne.jpg"></image>
					<view class="cul margin-left-sm">
						<text class="text-title_">{{item.name}}</text>
						<text class="text-introtion_">学院: {{item.college_name}}</text>
						<text class="text-introtion_">学分: {{item.credit}}</text>
						<view class="ro" style="margin-top: 10rpx;">
							<button class="cu-btn line-blue shadow" 
							style="width: 120rpx; height: 50rpx;
							padding: 30rpx 0rpx 30rpx 0rpx;">基础巩固</button>
							<button class="cu-btn line-blue shadow margin-left-sm"
							style="width: 120rpx; height: 50rpx;
							padding: 30rpx 0rpx 30rpx 0rpx;">查漏补缺</button>
						</view>				
					</view>			
				</view>	
			</view>
		</view>			   
		
		<text class="text-subhead">自主学习</text>
		<text class="text-description" style="margin-top: 15rpx;">{{study}}</text>
		
		<text class="text-subhead">书籍学习</text>
		<view class="cu-list shadow padding">
			<view class="cu-item" style="display: flex; flex-direction: column;" v-for="(item,index) in books" :key="index">
				<view class="ro">
					<image style="width: 200rpx; height: 200rpx; background-color: #eeeeee;" :src="item.pic"></image>
					<view class="cul margin-left-lg">
						<text class="text-title_">{{item.title}}</text>
						<text class="text-introtion_">作者: {{item.author}}</text>
						<text class="text-introtion_">出版社: {{item.press}}</text>
					</view>			
				</view>	
			</view>
		</view>			  
		
		<text class="text-subhead">竞赛学习</text>
		<view class="cul" v-for="(item,index) in competitions" :key="index">
			<text class="text-description" style="margin-top: 30rpx;">{{item.name}}</text>
		</view>	
		
		<view class="end">
			<text class="text-subhead">HR备注</text>
			<view class="cul" v-for="(item,index) in HR" :key="index">
				<text class="text-description" style="margin-top: 30rpx;">{{item}}</text>
			</view>	
		</view>	
				
		<view class="bottom padding">
			<button class="cu-btn text-blue line-blue shadow " style="width: 30%;" @click="communication">立即收藏</button>
			<button class="cu-btn bg-blue shadow-blur margin-left " style="width: 60%;" @click="issue">投递简历</button>
		</view>	
				
	</view>
</template>

<script>
	export default{	
		data(){
			return{
				jobs:[],
				courses:[],
				study:[],
				books:[],
			    competitions:[],
				HR:[],
			}
		},
		onLoad:function(e){
				var th=this;
				uni.request({
					url:'http://zygh.store/api/company/腾讯/job/1',
					method:'GET',
					success: function(res){	
						th.jobs=res.data.data;
						console.log(res.data);
						 }
					}),
			    uni.request({
			    	url:'http://zygh.store/api/company/腾讯/job/1/courses',
					method:'GET',
					success: function(res){
						th.courses=res.data.data.data;	
						console.log(res.data);
						 }
			    }),
				uni.request({
					url:'http://zygh.store/api/company/腾讯/job/1/books',
					success: (res) => {			
						th.books=res.data.data.data;
						console.log(res.data);
					    }
				}),
				uni.request({
					url:'http://zygh.store/api/company/腾讯/job/1/competitions',
					success: (res) => {			
						th.competitions=res.data.data.data;
						console.log(res.data);
					    }
				})
		},
		methods:{
			issue:function(){
				uni.navigateTo({
					url:""
				})
			},
			communication:function(){
				uni.navigateTo({
					url:""
				})
			},
		}
	}
</script>
<style>
	@import "../../colorui/main_.css";
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
	
	.text-position{
		font-size: 38rpx;
		font-weight: 600;
	}
	
	.text-char{
		font-weight:900;
		font-size: 50rpx;
	}
	
	.text-salary{
		color: #DD514C;
		font-weight: 400;
		font-size: 40rpx;
		margin-left: 30rpx;
	}
	
	.text-introtion{
		color: #AAAAAA;
		font-size: 30rpx;
		margin-top: 15rpx;
	}
	
	.text-introtion_{
		color: #AAAAAA;
		font-size: 30rpx;
		margin-top: 5rpx;
	}	
	
	.text-description{
		color:#000000;
		font-size: 35rpx;
		font-weight: 500;
		margin-left: 45rpx;

	}

	.text-subhead{
		font-size: 40rpx;
		font-weight: 500;
		margin-left: 45rpx;
		margin-top: 30rpx;
	}
	
	.text-title{
		font-size: 45rpx;
		font-weight: 500;
	}
	
	.text-title_{
		font-size: 38rpx;
		font-weight: 500;
	}
	
	.bottom{
		display: flex;
		flex-direction: row;
		justify-content: center;
		width:100%;
		border:  2rpx solid #e1e1e1;
		position: fixed;
		bottom:0rpx;
		z-index: 1;
		height: 120rpx;
		background-color:#FFFFFF;		
	}
	
	.end{
		margin-bottom: calc(120rpx);
		margin-top: 30rpx;
	}
	
</style>
