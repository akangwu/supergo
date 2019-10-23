<template>
  <div id="home">
    <nav-bar class="nav-bar">
      <!--在创建插槽的时候使用的是div里面包裹了slot，slot里面给了具名插槽。但是在引用插槽的时候直接div里面写上slot的名字就可以了-->
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','推荐','精选']"
                 @tabClick=tabClick
                 ref="homeTabControl"
                 v-show="isTabFixed"
                 class="homeTabControl"/>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUpLoad="loadMore">
      <!--这里引用了MintUI的轮播图部分，所以需要引用相关代码-->
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in banners">
          <a :href="item.link">
            <img :src="item.image" alt="" @load="imageLoad">
          </a>
        </mt-swipe-item>
      </mt-swipe>
      <!--父亲这里:recommends是名称，可以任意，但是要和子组件props里面的recommends名称保持一致。recomm是数据名称，也就是data里面的recomm-->
      <recommend-view :recommends=recommends />
      <feature-view />
      <tab-control :titles="['流行','推荐','精选']"
                   @tabClick=tabClick
                   ref="contentTabControl"/>
      <goods-list :goods="goods[currentType].list"/>

    </scroll>
    <back-top @click.native="backClick" v-show="isShowTop"/>
  </div>

</template>

<script>
  //导入公共组件
  import NavBar from 'components/common/navbar/NavBar'
  import RecommendView from './childComps/RecommendView'
  import TabControl from '../../components/contnet/tabControl/TabControl'
  import GoodsList from '../../components/contnet/goods/GoodsList'
  import Scroll from '../../components/common/scroll/Scroll'
  import BackTop from 'components/contnet/backtop/BackTop'

  //导入子组件
  import FeatureView from './childComps/FeatureView'

  //导入网络请求文件
  import {getMultidata, getHomeGoods} from "../../network/home";

  export default {
    name: "Home",
    components: {
      NavBar,
      RecommendView,
      TabControl,
      GoodsList,
      Scroll,
      FeatureView,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          "pop": {page: 0, list: []},
          "new": {page: 0, list: []},
          "sell": {page: 0, list: []}
        },
        currentType: "pop",
        showTabControl: false,
        isShowTop: false,
        tabOffsetTop: 0,
        isLoad: false,
        isTabFixed: false
      }
    },
    created() {
      //1.请求多个数据。通过.then来获取数据
      this.getHomeMultidata()
      //2.请求商品数据。这里可以调用三次方法，来把每个type的数据都请求过来
      this.getHomeGoods("pop")
      this.getHomeGoods("new")
      this.getHomeGoods("sell")
      //  3.监听GoodsListItem里面图片加载完成
      this.$bus.$on('itemImageLoad', () => {
        // this.$refs.scroll.refresh()
      })
    },
    methods: {
      //事件监听的相关方法
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break
          case 1:
            this.currentType = 'new';
            break
          case 2:
            this.currentType = 'sell'
        }
        this.$refs.homeTabControl.currentIndex = index;
        this.$refs.contentTabControl.currentIndex = index;
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 500)
        // console.log("aaa");
        // console.log(this.$refs.scroll.msg);
      },
      contentScroll(position) {
        //1.判断BackTop是否显示
        // console.log(position.y);
        this.isShowTop = (-position.y) > 500
        //  2.决定TabControl是否吸顶，到达一定距离，给一个fixed定位
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      imageLoad() {
        //这里打印会有四次，但是我们只需要调用一次 这里使用isLoad判断一下
        if (!this.isLoad) {
          // console.log(this.$refs.contentTabControl.$el.offsetTop);
          this.tabOffsetTop = this.$refs.contentTabControl.$el.offsetTop
        }
        this.isLoad = true
      },
      //网络请求的相关方法
      getHomeMultidata() {
        getMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // console.log(res);
          // res.data.list是一个数组，pop的list也是一个数组，如何把数组放到另外一个数组 简单方法就是...方法还有一种方法就是循环遍历
          this.goods[type].list.push(...res.data.list)
          // 上面只是把请求的数据加到了相应的type的list数组中，但是还没有完，page也需要处理
          this.goods[type].page += 1
          //  完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      }

    }
  }
</script>

<style scoped>
  #home {
    position: relative;
    padding-top: 44px;
    height: 100vh;
  }

  .nav-bar {
    background-color: #ff5777;
    color: #fff;
    /*在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }

  .mint-swipe {
    height: 200px;
    /*margin-top: 40px;*/
  }

  .mint-swipe img {
    width: 100%;
    height: 100%;
  }

  .homeTabControl {
    position: relative;
    z-index: 99;
    height: 40px;
    background-color: #fff;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0;
  }
</style>
