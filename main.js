import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

wx.setEnableDebug({
  enableDebug: true
})

const app = new Vue({
    ...App
})
app.$mount()
