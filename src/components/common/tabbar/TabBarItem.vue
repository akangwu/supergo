<template>
  <!--下面的path和activeColor都在MainTabBar里面配置了-->
  <div class="tab-bar-item" @click="itemClick">
    <!--这里是控制是否激活，根据path决定的，v-if和v-else控制显示和隐藏
    这里的item-icon在选中情况是不显示的，所以isActive是true，取反就是false，所以显示item-action-active-->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <!--动态绑定样式-->
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,
      activeColor: {
        type: String,
        default: 'red'
      }
    },
    data() {
      return {
        // isActive: true
      }
    },
    computed: {
      isActive() {
        // /home -> item1(/home) = true
        // /home -> item1(/category) = false
        // /home -> item1(/cart) = true
        // /home -> item1(/profile) =true
        //indexOf表示找到不等于-1，找不到等于-1。前面！isActive是false，每次都是获取每个路由的地址，找到路由地址，不等于-1，然后再和-1比较，是true，所以会不显示黑色的图标
        return this.$route.path.indexOf(this.path) !== -1
      },
      //动态绑定样式。这里只需要判断一下isActive是不是true就可以了
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods: {
      itemClick() {
        this.$router.replace(this.path)//这里使用replace，变成路由地址。使用replace方法点击浏览器返回按钮是没有效果的，不能返回上一页；想要实现这个需要使用push
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>
