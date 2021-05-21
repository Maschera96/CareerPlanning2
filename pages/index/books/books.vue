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
						<text>书籍类别</text>
					</view>
					<view>
						<checkbox-group @change="checkboxChange1">
							<label class="job-list-body" v-for="(item,key) in category" :key="key">
								<checkbox class="checkbox" :value="item.value" :checked="item.checked" />
								<view class="text1">{{item.name}}</view> 
							</label> 
						</checkbox-group>
					</view>
				</view>	
			</view>	
					    
			<view class="course">
				<view class="list" v-for="(value,key) in book" :key="key">
					<view class='book_item'>
						<image class="book_pic" style="width: 160rpx;height: 160rpx;" v-bind:src="value.pic"></image>
						<view class='book_title'>{{value.title}}</view>
					</view>
				</view>	
			</view>
	
			
		</view>
		
		
		
	</view>
</template>

<script>
	let newcategory=[]

	export default {
		data() {
			return {
				book:[],
				category:[
					{
						value:"1",
						name:"程序设计"
					},
					{
						value:"2",
						name:"操作系统/系统开发",
					},
					{
						value:"3",
						name:"数据库"
					},
					{
						value:"4",
						name:"人工智能"
					},
					{
						value:"5",
						name:"图形图像 多媒体"
					},
					{
						value:"6",
						name:"移动开发"
					},
				],
			}
		},
		
		onLoad:function(){
			wx.cloud.init()
			const db = wx.cloud.database();
			const _ = db.command;
			wx.cloud.callFunction({
				name:'index',
				data:{
					$url:'books'
				}
			}).then(res => {
				 for(let i=0;i<20;i++)
					this.book.push(res.result.data[i])
				}).catch(err => {
				console.error(err)
			})   
		}, 
		
		methods: {
			checkboxChange1:function(e){
				let items=this.category,
					values=e.detail.value;
				
				newcategory.splice(0,newcategory.length);	
				
				for(var i=0,lenI=items.length;i<lenI;++i){ 
					let item=items[i];   
					if(values.includes(item.value)){
						this.$set(item,'checked',true)
						newcategory.push(item.name);
						console.log(newcategory);
					}else{
						this.$set(item,'checked',false)
					}
				}
				
				wx.cloud.callFunction({
					name:'index',
					data:{
						$url:'books'
					}
				}).then(res => {
					let len=this.book.length
					this.book.splice(0,len)
					for(let i=0;i<res.result.data.length;i++){
						if(newcategory.includes(res.result.data[i].category_1)){
							this.book.push(res.result.data[i])
						}else if(newcategory.length==0){
							this.book.push(res.result.data[0])
						}
					}
					console.log(this.book)
				}).catch(err => {
					console.error(err)
				}) 
				
			}	
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
	
	.book_item{
		border:1rpx solid #ffffff;
		box-shadow: 0rpx 3rpx 6rpx #e6e6e6; 
		margin-left: auto;
		margin-right: auto; 
		display: flex;
		flex-direction:row;
		height:200rpx;
		width:450rpx;
		margin-top: 30rpx;
	}
	
	.book_title{
		font-size: 30rpx;
		font-weight: bold;
		width: 300rpx;
		margin-right: 10rpx;
	}
	
</style>
