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
				<view class="more" @tap="gotomorecities()">更多</view>
			</view>	
		</view>
		
		
		
		<view class="jobs">
			<view class="list" v-for="(value,key) in listData" :key="key" @tap="gojobs(value.indexCode)">
				<view class="list-body">
					<view class="text-top">{{value.jobName}}</view>
					<view class="text-bottom">
						<text>{{value.jobRequirement}}</text>
					</view>
				</view>
			</view>	
		</view>
		
	</view>
	</view>
</template>

<script>
	let newitem=[],
		newcities=[];
	
		
	export default {
		data() {
			return {
				listData:[],
				id: null,
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
						value:"7",
						cityname:"杭州",
					},
					{
						value:"8",
						cityname:"上海"
					},
					{
						value:"9",
						cityname:"北京"
					}, 
					{
						value:"10",
						cityname:"广州"
					},
					{
						value:"11",
						cityname:"深圳"
					},
					{
						value:"12",
						cityname:"成都"
					},
						
				]
				
			}
		},
		
		onLoad:function(e){
			this.id = e.company_id
			let [pageIndex,pageSize] = [1,5]
			console.log('company_id:',this.id);
			
			uni.request({
				url: `http://1.15.175.248:8002/job/list/${this.id}/${pageIndex}/${pageSize}`,
				success: (res) => {
					this.listData = res.data.data.data
					console.log(res);
					console.log(this.listData);
				}
			})
			// wx.cloud.init()
			// const db = wx.cloud.database();
			// const _ = db.command;
			// wx.cloud.callFunction({
			// 	name:'company_jobsList',
			// 	data: {   
			// 		company_id: this.id
			// 	}
			// }).then(res => {
			// 	this.listData = res.result.data.data
			// 	console.log(res)
				
			// }).catch(err => {
			// 	console.error(err)
			// })
			
		}, 
		
		
		
		
		methods: {	
			checkboxChange1:function(e){
				let items=this.items,
					values=e.detail.value;
				
				newitem.splice(0,newitem.length);	
				
				for(var i=0,lenI=items.length;i<lenI;++i){ 
					let item=items[i];
					if(values.includes(item.value)){
						this.$set(item,'checked',true)
						newitem.push(item.name);
						console.log(newitem);
					}else{
						this.$set(item,'checked',false)
					}
				}
				
				 wx.cloud.callFunction({
					name:'company_jobsList',
					data: {   
						company_id:comp_id
					}
				}).then(res => {
					let len=this.listData.length
					this.listData.splice(0,len)
					for(let i=0;i<res.result.data.data.length;i++){  
						if((newitem.includes(res.result.data.data[i].category)&&newcities.includes(res.result.data.data[i].place[0]))||
						(newitem.includes(res.result.data.data[i].category)&&newcities.includes(res.result.data.data[i].place[1]))){
							this.listData.push(res.result.data.data[i]);
						}else if(newitem.includes(res.result.data.data[i].category)){
							this.listData.push(res.result.data.data[i])
						}else if(newitem.length==0&&newcities.length==0){
							this.listData=res.result.data.data
						}else if(newitem.length==0){
							if(newcities.includes(res.result.data.data[i].place[0])||newcities.includes(res.result.data.data[i].place[1])){
								this.listData.push(res.result.data.data[i]);
							}
						}
					}
					console.log(this.listData)
				}).catch(err => {
					console.error(err)
				}) 
			},
			
			checkboxChange2:function(e){
				let items=this.cities,
					values=e.detail.value;
				
				newcities.splice(0,newcities.length);
						  
				for(var i=0,lenI=items.length;i<lenI;++i){
					let item=items[i];
					if(values.includes(item.value)){
						this.$set(item,'checked',true);     
						newcities.push(item.cityname);
						console.log(newcities);
					}else{
						this.$set(item,'checked',false)
					}
				}
				
				wx.cloud.callFunction({
					name:'company_jobsList',
					data: {   
						company_id:comp_id
					}    
				}).then(res => {
					let len=this.listData.length  
					this.listData.splice(0,len)     
					for(let i=0;i<res.result.data.data.length;i++){
						if(newitem.includes(res.result.data.data[i].category)&&newcities.includes(res.result.data.data[i].place)){
							this.listData.push(res.result.data.data[i])
						}else if(newcities.includes(res.result.data.data[i].place[0])||newcities.includes(res.result.data.data[i].place[1])){  
							this.listData.push(res.result.data.data[i]);
						}else if(newitem.length==0&&newcities.length==0){
							this.listData=res.result.data.data 
						}else if(newcities.length==0){
							if(newitem.includes(res.result.data.data[i].category)){
								this.listData.push(res.result.data.data[i]);
							}
						}
					}
					console.log(this.listData)
				}).catch(err => { 
					console.error(err)
				})   
			},
		
		gotomorecities:function(e){
			uni.navigateTo({
				url:''
			})
		},
		
		gojobs:function(jobId){
			console.log('before jump',jobId);
			uni.navigateTo({
			    url: '/pages/index/company/company_details/jobbrowse/position_details/position_details?job_id='+jobId,
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
		font-size: 35rpx;
		font-weight:600;
		margin-bottom: 5rpx;
		margin-left:30rpx;
	}
	
	.text-bottom{
		display:flex;
		flex-direction: column;
		font-size: 25rpx;
		color: gray;
		margin-left:30rpx;
		margin-bottom: 20rpx;
	}
	
	.search{
		width: 200rpx;
		height:1660rpx;
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

	.more{
		text-align: center;
		color: #C0C0C0;
	}
</style>
