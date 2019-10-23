import Vue from 'vue'
import Vuex from 'vuex'

//1.安装插件
Vue.use(Vuex)
//2.创建Store对象
const store = new Vuex.Store({
  state: {
    //当有很多状态需要共享时候可以用vuex来实现状态管理，安装方法和router的方法一样
    //用数组来存放数据，数组里面放置对象
    cartList: []
  },
  mutations: {
// mutations唯一的目的就是修改state中的状态，所以进肯能的让每个方法中完成的事情比较单一一点
    //  修改状态的时候是在mutations里面进行的
    addCart(state, payload){
      payload.checked = true
    }

  },
  actions:{
    // 在axtions里面第一个参数是context的参数

      addCart(context, payload) {
        return new Promise((resolve, reject) =>{
        // payload新添加的商品
        // let oldProduct = null
        // for (let item of state.cartList) {
        //   if (item.iid = payload.iid) {
        //     oldProduct = item
        //   }
        // }
        let oldProduct = context.state.cartList.find(function (item) {
          return item.iid === payload.iid

        })
        //判断oldProduct是否有值
        if (oldProduct) {
          oldProduct.count +=1
          resolve('当前商品数量+1')
        } else {
          payload.count = 1
          context.state.cartList.push(payload)
          resolve('添加了新的商品')
        }
      })
    }
  }
})
//3.导出store,同时也要在main.js里面导入注册一下
export default store