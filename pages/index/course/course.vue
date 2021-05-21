<template>
	<view class='container'>
		<view class="head">
			 <view class="search-item">
				<view class="search-form">
					<input type="text"  placeholder="职位搜索" confirm-type="search"></input>
				</view>	
				<button class="bu">搜索</button>	
			</view>
		</view>
		   
		<view class='content'>
			<view class='search'>
				<view class="dif-jobs">
					<view class="title1">
						<text>开课学院</text>
					</view>
					<view>
						<checkbox-group @change="checkboxChange1">
							<label class="job-list-body" v-for="(item,key) in college" :key="key">
								<checkbox class="checkbox" :value="item.value" :checked="item.checked" />
								<view class="text1">{{item.name}}</view> 
							</label> 
						</checkbox-group>
					</view>
				</view>	
				
				<view class="dif-jobs">
					<view class="title1">
						<text>课程类别</text>
					</view>
					<view>
						<checkbox-group @change="checkboxChange2">
							<label class="job-list-body" v-for="(item,key) in category" :key="key">
								<checkbox class="checkbox" :value="item.value" :checked="item.checked"></checkbox>
								<view class="text1">{{item.name}}</view> 
							</label> 
						</checkbox-group>
					</view>
				</view>	
			</view>
			
			
			
			<view class="course">
				<view class="list" v-for="(value,key) in course" :key="key">
					<view class="course_item">
						<view class="level">{{value.COURSECODE.substr(0,1)}}类</view>
						<view class="course_name">{{value.CLASSNAME}}</view>
						<view class="course_request1" v-if="value.COURSECODE.substr(0,1)=='A'">必修</view>
						<view class="course_request1" style="color:#007AFF" v-else>选修</view>
					</view>
				</view>	
			</view>
			
			
		</view>
		
		
		
	</view>
</template>

<script>
	let newcategory=[],
		newcollege=[];
		
	export default {
		data() {
			return {
				course:[],
				showcourse:[],
				category:[
					{
						value:"1",
						name:"通识必修/专业必修",
						code:'A'
					},
					{
						value:"3",
						name:"专业选修",
						code:'B'
					},
					{
						value:"4",
						name:"通识选修",
						code:'C'
					},
					{
						value:"5",
						name:"体育课",
						code:'T'
					},
					{
						value:"6",
						name:"新生研讨课",
						code:'YJ'
					},
					{
						value:"7",
						name:"实验课",
						code:'S'
					}
				],
				college:[
					{
						value:"1",
						name:"计算机学院（软件学院）"
					},
					{
						value:"2",   
						name:"机械工程学院",
					},
					{
						value:"3",
						name:"外国语学院"
					},
					{
						value:"4",
						name:"管理学院"
					},
					{
						value:"5",
						name:"经济学院"
					},
					{
						value:"5",
						name:"人文与法学院"
					},
				]
			}
		},
		
		onLoad:function(){
			wx.cloud.init()
			const db = wx.cloud.database();
			const _ = db.command;
			wx.cloud.callFunction({      
				name:'index',
				data:{
					$url:'courses'
				}
			}).then(res => {
				for(let i=0;i<20;i++){
					this.course.push(res.result.data[i])
					this.showcourse.push(res.result.data[i])
				}
				console.log(this.course)
				console.log(this.showcourse)
			}).catch(err => {
				console.error(err)
			})
			
		}, 
		
		methods: {
			checkboxChange1:function(e){
				let items=this.college,
					values=e.detail.value;
				
				newcollege.splice(0,newcollege.length);
						  
				for(var i=0,lenI=items.length;i<lenI;++i){
					let item=items[i];
					if(values.includes(item.value)){
						this.$set(item,'checked',true);     
						newcollege.push(item.name);
						console.log(newcollege);
					}else{
						this.$set(item,'checked',false)
					}
				}
				
				wx.cloud.callFunction({
					name:'index',
					data:{
						$url:'courses'
					}
				}).then(res => {
					let len=this.course.length
					this.course.splice(0,len)
					for(let i=0;i<res.result.data.length;i++){
						if(newcollege.includes(res.result.data[i].SCHOOLNAME)&&
						(newcategory.includes(res.result.data[i].COURSECODE.substr(0,1))||newcategory.includes(res.result.data[i].COURSECODE.substr(0,2)))){
							this.course.push(res.result.data[i])
						}else if(newcategory.length==0){
							if(newcollege.includes(res.result.data[i].SCHOOLNAME)){
								this.course.push(res.result.data[i])
							}
						}else if(newcollege.length==0){
							if(newcategory.includes(res.result.data[i].COURSECODE.substr(0,1))||newcategory.includes(res.result.data[i].COURSECODE.substr(0,2))){
								this.course.push(res.result.data[i])
							}
						}else if(newcategory.length==0&&newcollege.length==0){
							this.course=this.showcourse
						}
					}
					console.log(this.course)
				}).catch(err => {
					console.error(err)
				}) 
			},
			
			
			
			
			checkboxChange2:function(e){   
				let items=this.category,
					values=e.detail.value;
				
				newcategory.splice(0,newcategory.length);	
				
				for(var i=0,lenI=items.length;i<lenI;++i){ 
					let item=items[i];       
					if(values.includes(item.value)){
						this.$set(item,'checked',true)
						newcategory.push(item.code);
						console.log(newcategory);
					}else{
						this.$set(item,'checked',false)
					}
				}
				
				wx.cloud.callFunction({
					name:'index',
					data:{
						$url:'courses'
					}
				}).then(res => {
					let len=this.course.length
					this.course.splice(0,len)
					for(let i=0;i<res.result.data.length;i++){  
						if(newcollege.includes(res.result.data[i].SCHOOLNAME)&&
						(newcategory.includes(res.result.data[i].COURSECODE.substr(0,1))||newcategory.includes(res.result.data[i].COURSECODE.substr(0,2)))){
							this.course.push(res.result.data[i])
						}else if(newcollege.length==0){
							if(newcategory.includes(res.result.data[i].COURSECODE.substr(0,1))||newcategory.includes(res.result.data[i].COURSECODE.substr(0,2))){
								this.course.push(res.result.data[i])
							}
						}else if(newcategory.length==0){
							if(newcollege.includes(res.result.data[i].SCHOOLNAME)){
								this.course.push(res.result.data[i])
							}
						}else if(newcategory.length==0&&newcollege.length==0){
							this.course=this.showcourse
						}
					}
					console.log(this.course)      
				}).catch(err => {
					console.error(err)
				}) 
				
			},
			
			
			
			
			
			
		}
	}
</script>

<style>
	page{background-color: #FFFFFF;}
	
	.container{
		display: flex;
		flex-direction: row;
	}
	
	.head{
		display: flex;
		flex-direction: row;
		height: 100rpx;
		width: 100%;
		box-shadow: 0 0 5rpx 0 #AAAAAA;
		justify-content: center;
		position: fixed;
		top: 0;
		z-index: 1;
		background-color: #FFFFFF;
		
	}
	
	 .search-item{
		display: flex;
		flex-direction: row;
	}
	
	.search-form{
		width: 550rpx;
		height: 65rpx;
		margin-top: 20rpx;
		border-radius: 30rpx 0 0 30rpx;
		box-shadow: 5rpx 5rpx 5rpx 2rpx #DDDDDD;
		font-size: 36rpx;
		text-align: center;
	}

	.bu{
		background-color: #0081FF;
		color: #FFFFFF;
		margin-top: 20rpx;
		width: 130rpx;
		height: 65rpx;
		line-height: 65rpx;
		font-size: 36rpx;
		border-radius:0 30rpx 30rpx 0;
		font-weight: 500;
		box-shadow: 5rpx 5rpx 5rpx 2rpx #DDDDDD;
	} 
	
	.content{
		display: flex;
		background-color: #FFFFFF;
	}
	
	.search{
		width: 300rpx;
		height:auto;
		position: fixed;
		bottom:0;
		top:0;
		margin-top: 100rpx;
		border-right: 3rpx solid #CCCCCC;
		
	}
	
	.dif-jobs{
		display: flex;
		flex-direction: column;
		border-bottom: 3rpx solid #CCCCCC;
	}
	
	.title1{
		text-align: center;
		font-size: 35rpx;
		font-weight: 600;
		margin-top: 40rpx;
		margin-bottom: 20rpx;
	}
	
	.job-list-body{
		display:flex;
		margin-bottom: 15rpx;
		margin-left: 40rpx;
		vertical-align: middle;
	}
	
	.text1{
		margin-left: 20rpx;
		font-size:30rpx;
	}
	
	.checkbox{
		transform: scale(0.8);
	}
	
	.course{
		width: 430rpx;
		margin-top: 100rpx;
		margin-left: 300rpx;
	}
	
	.course_item{
		border:1rpx solid #ffffff;
		box-shadow: 0rpx 3rpx 6rpx #e6e6e6; 
		margin-left: auto;
		margin-right: auto; 
		display: flex;
		flex-direction:row;
		height:150rpx;
		width:450rpx;
		margin-top: 30rpx;
	}
	
	.level{
		border:1rpx solid #5b5b5b;
		color: #5b5b5b;
		height: 40rpx;
		width: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center; 
		margin-top: 55rpx;
		margin-left: 30rpx;
	}
	
	.course_name{
		font-size: 30rpx;
		font-weight: bold;
		color: #5f656c;
		width: 220rpx;
		display: flex;
		align-items: center;
		margin-left: 30rpx;
	}
	
	.course_request1{
		color: #e1945f;
		display: flex;
		align-items: center;
		margin-left: 5rpx;
		font-size: 32rpx;
	}
	
	
	
	
</style>
