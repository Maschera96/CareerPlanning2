<template>
	<view class="content">
		<!--进度条-->
		<view class="progress">
			<view class="progress-box1">
				<progress :percent="quotient" show-info color="#ff6b00" backgroundColor="#eeeeee" border-radius="20"
					stroke-width="15" />
			</view>
			<view class="progress_intro">
				已达到{{fini}}个&nbsp;/&nbsp;共{{fini+unfini}}个目标</view>
		</view>

		<!--待完成-->
		<view class="Unfished">
			<view class="UnfishedTitle">
				<view class="UnLogo">
					<image class="UnfishedTitleLogo" src=/static/planning/study.png> </image>
				</view>
				<view class="Text1">待学习目标
				</view>
				<view class="adjust" @tap="gotoAdjust()">添加计划</view>

			</view>
		</view>

		<view class="move" v-for="(item, index) in noFinishTargets" :key="index">
			<uni-swipe-action>
				<uni-swipe-action-item :options="options" @click="onClick($event,item,index)">
					<view class="study">
						<view class="study_title">{{item.type}}&nbsp;|&nbsp;{{item.target}}</view>
						<view class="study_ddl">剩余时长：&nbsp;{{item.time}}天</view>
					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</view>

		<!--已完成-->
		<view class="finish">
			<view class="finish_title">
				<image class="finish_logo" src=/static/planning/finish.png> </image>
				<view class="finish_word">已达成目标
				</view>
			</view>

			<view v-for="(item, index) in finishTargets" :key="index" class="finish_item">
				<view class="finishitemtitle">{{item.type}}&nbsp;|&nbsp;{{item.target}}</view>
				<view class="finishitemdetail">
					<view class="finishitemtime">{{item.time}}完成</view>
					<view class="finishitemrecover" @tap="recoverTarget(index)">恢复目标</view>
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'

	export default {
		components: {
			uniSwipeAction,
			uniSwipeActionItem
		},
		data() {
			return {
				average: '63',
				fini: 0,
				unfini: 0,
				todayScore: '',
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				noFinishTargets: '',
				finishTargets: '',
				myScore: null,
				noFinishTargetsNumber: null,
				finishTargetsNumber: null,
				quotient: '',
				options: [{
					text: '完成',
					style: {
						backgroundColor: '#f7f7f8',
						color: '#a5a5a5',
					}
				}, {
					text: '删除',
					style: {
						backgroundColor: '#f7f7f8',
						color: '#a5a5a5',
					}
				}],

			}
		},
		
		onLoad: function(){
			//调用未完成目标数据
			// const no_finished = [{
			// 	type: 'book',
			// 	target: 'GO语言实战',
			// 	date: '2021-05-20'
			// },{
			// 	type: 'lesson',
			// 	target: '操作系统（甲）',
			// 	date: '2021-05-25'
			// },{
			// 	type: 'tech',
			// 	target: 'Uni-app',
			// 	date: '2021-06-01'
			// }]
			
			// wx.setStorage({
			// 	key: 'no_finished',
			// 	data: no_finished
			// })
			
			
			
			//调用已完成目标数据
			// const finished = [{
			// 	type: 'book',
			// 	target: 'GO语言实战',
			// 	date: '2021-04-20'
			// },{
			// 	type: 'lesson',
			// 	target: '操作系统（甲）',
			// 	date: '2021-04-25'
			// },{
			// 	type: 'tech',
			// 	target: 'Uni-app',
			// 	date: '2021-05-01'
			// },{
			// 	type: 'book',
			// 	target: 'MongoDB管理与开发精要',
			// 	date: '2021-05-03'
			// }]
			
			// wx.setStorage({
			// 	key: 'finished',
			// 	data: finished
			// })
		},
		
		onShow: function() {
			this.updateProgress()
		},

		methods: {
			//修改学习类型名称函数
			setType(e){
				switch (e){
					case 'book':
						e = '学习书籍';
						break;
					case 'lesson':
						e = '学习课程';
						break;
					case 'tech':
						e = '学习技术';
						break;
					case 'self':
						e = '自我学习';
						break;
				}
				return e
			},
			
			//更新并渲染未完成目标列表
			updateNoFinishTargets(res){
				//res应该是数组
				res.forEach((item)=>{
					item.type = this.setType(item.type)
					let time = new Date(item.date)
					let today = new Date()
					item.time = Math.ceil((time - today)/(1000*3600*24))
				})
				this.noFinishTargets = res
				return res.length
			},
			
			//更新并渲染已完成目标列表
			updateFinishTargets(res){
				//res应该是数组
				res.forEach((item)=>{
					item.type = this.setType(item.type)
					let time = new Date(item.date)
					item.time = `${time.getMonth()+1}月${time.getDate()}日`
				})
				this.finishTargets = res
				return res.length
			},
			
			updateProgress(){
				const unfiniPro = wx.getStorage({key: 'no_finished'}).then((res) => {
					return this.updateNoFinishTargets(res.data)
				})
				const finiPro = wx.getStorage({key: 'finished'}).then((res) => {
					return this.updateFinishTargets(res.data)
				});
				Promise.all([finiPro,unfiniPro]).then((result) => {
					this.quotient = parseInt(result[0] / (result[0] + result[1]) * 100);
					[this.fini,this.unfini] = result
				})
			},
			
			async onClick($event, item, index) {
				const un_finiItem = await wx.getStorage({key : 'no_finished'})
				const changeItem = un_finiItem.data.splice(index,1)
				this.updateNoFinishTargets(un_finiItem.data)
				wx.setStorage({
					key : 'no_finished',
					data: un_finiItem.data
				}).then(async () => {
					if ($event.content.text == "完成") {
						let finiItem = await wx.getStorage({
							key: 'finished'
						})
						this.updateFinishTargets(finiItem.data.concat(changeItem))
						wx.setStorage({
							key : 'finished',
							data: this.finishTargets
						})
					}
					if ($event.content.text == "删除") {
						wx.showToast({
							title: '目标已删除',
						})
					}
					this.updateProgress()
				})
			},
			change(open) {
				console.log('当前开启状态：' + open)
			},

			//跳转至添加计划
			gotoAdjust: function() {
				uni.navigateTo({
					url: '/pages/index/planning/adjustPlanning'
				})
			},

			//恢复目标(目前不能更改目标新的ddl)
			recoverTarget: async function(index) {
				const finiItem = await wx.getStorage({key: 'finished'})
				const changeItem =  finiItem.data.splice(index,1)
				this.updateFinishTargets(finiItem.data)
				wx.setStorage({
					key: 'finished',
					data: finiItem.data
				})
				let un_finiItem = await wx.getStorage({
					key : 'no_finished',
				})
				this.updateNoFinishTargets(un_finiItem.data.concat(changeItem))
				await wx.setStorage({
					key : 'no_finished',
					data: this.noFinishTargets
				})
				this.updateProgress()
			},
		}
	}
</script>

<style>
	page {
		background-color: #f7f7f8;
	}

	.content {
		background-color: #f7f7f8;
		display: flex;
		flex-direction: column;
	}

	.progress {
		background-color: #FFFFFF;
	}

	.progress-box1 {
		margin-top: 50rpx;
		width: 600rpx;
		height: 70rpx;
		margin-left: auto;
		margin-right: auto;
	}

	.progress_intro {
		color: grey;
		margin-left: 450rpx;
		margin-bottom: 20rpx;
	}

	.Unfished {
		margin-top: 100rpx;
	}

	.UnfishedTitle {
		display: flex;
		flex-direction: row;
		margin-bottom: 20rpx;
	}

	.UnLogo {
		border: 3px solid #ff4400;
		border-radius: 50%;
		background-color: #ff4400;
		width: 55rpx;
		height: 55rpx;
		margin-left: 30rpx;
	}

	.UnfishedTitleLogo {
		max-width: 100%;
		max-height: 100%;
		width: 60rpx;
		height: 60rpx;
		margin-top: 2rpx;
	}

	.Text1 {
		margin-left: 20rpx;
		font-weight: bold;
		font-size: 36rpx;
		margin-top: 5rpx;
	}

	.adjust {
		border: 5px solid #ffffff;
		border-radius: 20%;
		background-color: #ffffff;
		margin-left: 300rpx;
		margin-top: -2rpx;
		color: #ff4400;
		font-weight: 600;
		font-size: 30rpx;
	}

	.move {
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		border: 5px solid #ffffff;
		border-radius: 20rpx;
		width: 650rpx;
		height: 140rpx;
		margin-left: auto;
		margin-right: auto;
		box-shadow: 0rpx 5rpx 8rpx #d3d3d3;
	}

	.study {
		margin-left: 20rpx;
		height: 110rpx;
		margin-top: 10rpx;
	}

	.study_title {
		white-space: nowrap;
		font-size: 33rpx;
		font-weight: bold;
		letter-spacing: 4rpx;
	}

	.study_ddl {
		font-size: 30rpx;
		color: grey;
		margin-top: 10rpx;
	}

	.finish {
		margin-top: 30rpx;
	}

	.finish_title {
		display: flex;
		flex-direction: row;
	}

	.finish_logo {
		border-radius: 50%;
		width: 55rpx;
		height: 55rpx;
		margin-left: 30rpx;
	}

	.finish_word {
		margin-left: 20rpx;
		font-weight: bold;
		font-size: 36rpx;
	}

	.finish_item {
		margin-left: 20rpx;
		width: 650rpx;
		height: 100rpx;
		margin-left: 80rpx;
		margin-top: 30rpx;
		margin-bottom: 50rpx;
	}

	.finishitemtitle {
		white-space: nowrap;
		font-size: 33rpx;
		font-weight: bold;
		letter-spacing: 4rpx;
		color: grey;
		text-decoration: line-through;
		/*文字删除线*/
	}

	.finishitemdetail {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 20rpx;
	}

	.finishitemtime {
		font-size: 30rpx;
		color: grey;
	}

	.finishitemrecover {
		color: #6c6c6c;
		font-size: 32rpx;
		font-weight: 600;
		margin-right: 70rpx;
	}

	.qiun-columns {
		margin-left: auto;
		margin-right: auto;
		margin-top: 30rpx;
		border: 10px solid #ffffff;
		/*框体不好设置圆角，有漏，可以把边框加粗填满*/
		border-radius: 30rpx;
		width: 680upx;
		height: 560upx;
		background-color: #FFFFFF;
	}

	.qiun_title {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		background-color: #FFFFFF;
		font-size: 33rpx;
	}

	.title_late {
		margin-left: 200rpx;
	}

	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 650upx;
		height: 400upx;
		background-color: #FFFFFF;
	}

	.charts {
		width: 650upx;
		height: 400upx;
		background-color: #FFFFFF;
	}

	.average {
		color: #ff6b00;
		font-size: 40rpx;
		font-weight: 600rpx;
	}

	.today {
		display: flex;
		flex-direction: row;
		margin-top: 20rpx;
		background-color: #FFFFFF;
	}

	.addScore {
		margin-left: 150rpx;
		margin-top: 5rpx;
		font-size: 32rpx;
	}

	.todayScore {
		margin-right: 10rpx;
	}

	.addIcon {
		max-width: 100%;
		max-height: 100%;
		height: 40rpx;
		width: 40rpx;
		margin-top: 8rpx;
	}
</style>
