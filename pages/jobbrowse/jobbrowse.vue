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
	
	<view class="content">
		<view class="search">
			<view class="dif-jobs">
				<view class="title1">
					<text>职位类别</text>
				</view>
				<view>
					<checkbox-group @change="checkboxChange1">
						<label class="job-list-body" v-for="(item,key) in items" :key="key">
							<checkbox class="checkbox" :value="item.value" :checked="item.checked" />
							<view class="text1">{{item.name}}</view> 
						</label> 
					</checkbox-group>
				</view>
			</view>
			
			<view class="city">
				<view class="title1">
					<text>热门城市</text>
				</view>
				<view>
					<checkbox-group @change="checkboxChange2">
						<label class="job-list-body" v-for="(item,key) in cities" :key="key">
							<checkbox class="checkbox" :value="item.value" :checked="item.checked" />
							<view class="text1">{{item.cityname}}</view> 
						</label> 
					</checkbox-group>
				</view>	
			</view>	
		</view>
		
		<view class="jobs">
			<view class="list" v-for="(value,key) in listData" :key="key" @click="gojobs">
				<view class="list-body">
					<view class="text-top">{{value.position}}</view>
					<view class="text-bottom">
						<text>{{value.content}}</text>
					</view>
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
				listData:[],
				
				items:[
				{	
					value:"1",
					name:"研发"
				},
				{
					value:"2",
					name:"产品",
				},
				{
					value:"3",
					name:"设计"
				},
				{
					value:"4",
					name:"运营"
				},
				{
					value:"5",
					name:"销售"
				},
				{
					value:"6",
					name:"市场"
				}
				],
				
				cities:[
					{
						value:"1",
						cityname:"杭州",
					},
					{
						value:"2",
						cityname:"上海"
					},
					{
						value:"3",
						cityname:"北京"
					}, 
					{
						value:"4",
						cityname:"广州"
					},
					{
						value:"5",
						cityname:"深圳"
					},
					{
						value:"6",
						cityname:"成都"
					},
						
				]
				
			}
		},
		
		onLoad:function(e){
			let th=this;
			uni.request({
				url:'http://zygh.store/api/company/腾讯/job',
				success:function(res){
					th.listData=res.data.data.data;
					console.log(th.listData);	
				}
			})
			
		}, 
		
		
		
		
		methods: {
			checkboxChange1:function(e){
			var items=this.items,
				values=e.detail.value;
			for(var i=0,lenI=items.length;i<lenI;++i){
			    const item=items[i];
				if(values.includes(item.value)){
					this.$set(item,'checked',true)
					console.log(item.name);
					let th=this;
					 uni.request({
						url:'http://zygh.store/api/company/腾讯/job?category[]='+item.name,
						success:function(res){
							th.listData=res.data.data.data; 
							console.log(th.listData);
						}
					}) 
				}else{
					this.$set(item,'checked',false)
				}
			}
			
		},
		
		checkboxChange2:function(e){
			var items=this.cities,
				values=e.detail.value;
			for(var i=0,lenI=items.length;i<lenI;++i){
			    const item=items[i];
				if(values.includes(item.value)){
					this.$set(item,'checked',true)
					console.log(item.cityname);	
					let th=this;
					uni.request({
						url:'http://zygh.store/api/company/腾讯/job?place[]='+item.cityname,
						success:function(res){
							th.listData=res.data.data.data;
							console.log(th.listData);
						}
					})
				}else{
					this.$set(item,'checked',false)
				}
			}
		},
		gojobs:function(e){
			uni.navigateTo({
				url: '/pages/position_details/position_details',
			});
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
	
	.list-body{
		display: flex;
		flex-direction: column;
		height:auto;
		width:500rpx;
		margin-bottom: 10rpx;
		margin-top: 30rpx;
	}
	
	.text-top{
		font-size: 28rpx;
		font-weight:600;
		text-align: center;
		margin-bottom: 5rpx;
	}
	
	.text-bottom{
		display:flex;
		flex-direction: column;
		font-size: 25rpx;
		color: gray;
		margin-left:30rpx;
	}
	
	.search{
		width: 200rpx;
		height:1660rpx;
		position: fixed;
		margin-top: 100rpx;
		border-right: 3rpx solid #CCCCCC;
		
	}
	
	.dif-jobs{
		display: flex;
		flex-direction: column;
		border-bottom: 3rpx solid #CCCCCC;
	}
	
	
	.jobs{
		width: 550rpx;
		margin-top: 100rpx;
		margin-left: 200rpx;
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


</style>
