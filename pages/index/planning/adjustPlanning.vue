<template>
	<view>
		<view class="">
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-blue"></text>学习计划
				</view>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">学习内容</view>
				<input placeholder="如'Go语言实战'" v-model="detail" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">学习分类</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{index>-1?picker[index]:'如 学习书籍'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">日期选择</view>
				<picker mode="date" :value="date" start="2021-09-01" end="2022-09-01" @change="DateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
			
			<view class="action">
				<view class="sub">
					<button class="cu-btn bg-purple shadow-blur round mybtn" @tap="submitTarget">创建目标</button>
				</view>
			</view> 
		</view>
	</view>		
</template>

<script>
	export default{
		data(){
			return{
					detail:'',
					index: -1,
					picker: ['学习书籍','学习课程','学习技术','自我学习'],
					date: '2021-06-01',
			}
		},
		
		onLoad:function(option){
		},
		methods:{
			PickerChange(e) {
				this.index = e.detail.value
			},
			DateChange(e) {
				this.date = e.detail.value
			},
			
			must:function(){
				wx.showToast({
					icon: 'error',
					title: '请填写完整'
				})
			},
			submitTarget:function(e){
				if(!this.detail){this.must();return;}
				if(this.index === -1){this.must();return;}
				switch (this.index){
					case '0':
						this.type = 'book';
						break;
					case '1':
						this.type = 'lesson';
						break;
					case '2':
						this.type = 'tech';
						break;
					case '3':
						this.type = 'self';
						break;
				}
				wx.getStorage({key: 'no_finished'}).then((res) => {
					res.data.push({
						type: this.type,
						target: this.detail,
						date: this.date
					})
					return res.data
				}).then((res) => {
					wx.setStorage({
						key: 'no_finished',
						data: res
					})
					uni.navigateBack({})
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #f3f3f3;
	}
	
	
	.studySort {
		display: flex;
		flex-direction: row;
		margin-top: 30rpx;
		font-weight: 700;
		font-size: 33rpx;
	}
	
	.studydetail{
		display: flex;
		flex-direction: row;
		margin-top: 30rpx;
		font-weight: 700;
		font-size: 33rpx;
	}
	
	.studyDdl{
		display: flex;
		flex-direction: row;
		margin-top: 30rpx;
		font-weight: 700;
		font-size: 33rpx;
	}
		
	.study{
		background-color: #FFFFFF;
		/* padding: 40rpx 40rpx; */
	}
	
	.studyTitle{
		font-size: 36rpx;
		font-weight: bold;
		border:  3rpx solid #e1e1e1;
		border-radius: 10rpx;
		width: 200rpx;
		padding-left: 30rpx;
	}
	
	.competitionTitle{
		display: flex;
		flex-direction: row;
		margin-top: 30rpx;
		font-weight: 700;
		font-size: 33rpx;
		border:  3rpx solid #e1e1e1;
		border-radius: 10rpx;
		width: 200rpx;
		padding-left: 30rpx;
	}
	
	.competition{
		background-color: #FFFFFF;
		margin-left: 30rpx;
		
	}
	
	.divLine{
		background: #edefe7;
		width: 100%;
		height: 2rpx;
		margin-left: 30rpx;
	}
	
	.sub{
		width: 30%;
		margin: 70rpx auto 0rpx auto;
	}
	
	.mybtn{
		width: 100%;
	}
	
	.competitionName{
		display: flex;
		flex-direction: row;
		margin-top: 30rpx;
		font-weight: 700;
		font-size: 33rpx;
	}
	
	.competitionDdl{
		display: flex;
		flex-direction: row;
		margin-top: 30rpx;
		font-weight: 700;
		font-size: 33rpx;
	}
</style>
