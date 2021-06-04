<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			
			if (!wx.cloud) {
				console.error('请使用 2.2.3 或以上的基础库以使用云能力')
			}
			else {
				// 初始化云函数
				wx.cloud.init({
				//   此处请填入环境 ID, 环境 ID 可打开云控制台查看
					env: 'zygh-test-wn16v',
					traceUser: true,
				})
			}
			this.globalData = {}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";/*每个页面公共css */
	
	page {
		background-color: #ffffff;
	}
</style>
