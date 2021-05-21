<template>
	<view>
		
		<view class="cu-form-group align-start">
			<view class="title">标题</view>
			<textarea maxlength="-1" v-model="titleValue" placeholder="请输入标题"></textarea>
		</view>
		<view class="cu-form-group margin-top: 100rpx;">
			<textarea maxlength="-1" v-model="textValue" placeholder="请输入正文"></textarea>
		</view>
		
		<view class="margin: 100rpx 0rpx 100rpx 0rpx;" >
			<button class="cu-btn round margin-left: 60rpx;" :class="typeChange1?'bg-blue':'line-blue'" @tap="typeChange('que')">问题</button>
			<button class="cu-btn round margin-left: 60rpx;" :class="typeChange2?'bg-blue':'line-blue'" @tap="typeChange('exp')">经验</button>
		</view>
		
		<view class="padding flex flex-direction bottom">
			<button class="cu-btn bg-mauve round shadow lg" open-type="getUserInfo" @getuserinfo="submit">发布</button>
		</view>
		
	</view>
</template>

<script> 
	export default {
		data() {
			return {
				titleValue: null,
				textValue: null,
				avatarUrl: null,
				nickName: null,
				typeChange1: false,
				typeChange2: false,
				type: null,
			}
		},
		onLoad() {
			
		},
		methods:{
			
			submit:function(e){
				//检查是否授权
				this.nickName = e.detail.userInfo.nickName
				this.avatarUrl = e.detail.userInfo.avatarUrl
				
				if(!this.titleValue || !this.textValue){
					wx.showToast({
						icon: 'none',
						title: '标题和内容不能为空',
					})
					return 0
				}
				
				if(!this.typeChange1 && !this.typeChange2){
					wx.showToast({
						icon: 'none',
						title: '请选择文章标签',
					})
					return 0
				}
				
				if(this.typeChange1){this.type = '问题'}else if(this.typeChange2){this.type = '经验'}
				var aData = new Date()
				wx.cloud.init()
				const db = wx.cloud.database();
				wx.cloud.callFunction({
					name:'article',
					data:{
						$url:'publishArticle',
						other: {
							name: this.nickName,
							avatar: this.avatarUrl,
							title: this.titleValue,
							content: this.textValue,
							type: this.type,
							date: aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate()
						}
					}
				}).then(res => {
					wx.showToast({
						title: '发布成功',
					})
					setTimeout(
						function(){
							var pages = getCurrentPages();
							var beforePage = pages[pages.length - 2]; 
							uni.navigateBack({
								success: function(){
									console.log(beforePage);
									beforePage.onLoad()
								}
							})
						}, 1500 
					)
				}).catch(err => {
					console.error(err) 
				})
			},
			
			//选择标签
			typeChange:function(e){
				if (e == 'que'){
					this.typeChange1 = !this.typeChange1
					this.typeChange2 = false
				}else if(e == 'exp'){
					this.typeChange2 = !this.typeChange2
					this.typeChange1 = false
				}
			}
		}
	}
</script>

<style>
	.bottom{
		position: fixed;
		width: 100%;
		bottom: 0rpx;
	}
	
</style>
