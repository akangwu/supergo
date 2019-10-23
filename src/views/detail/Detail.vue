<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="detail"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <good-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowTop"/>
    <!--<toast />-->
  </div>

</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'
  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from '../../network/detail'

  import Scroll from '../../components/common/scroll/Scroll'
  import GoodList from '../../components/contnet/goods/GoodsList'
  import BackTop from '../../components/contnet/backtop/BackTop'
  // import Toast from '../../components/common/toast/Toast'
  export default {
    name: "detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      Scroll,
      GoodList,
      DetailBottomBar,
      BackTop
      // Toast
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        currentIndex: 0,
        isShowTop: false
      }
    },
    created() {
      //  获取iid
      this.iid = this.$route.params.iid
      //  请求推荐轮播图数据
      getDetail(this.iid).then(res => {
        console.log(res);
        //1.获取顶部图片的轮播数据
        const data = res.result;
        this.topImages = data.itemInfo.topImages
        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)
        //  4.保存商品的详情数据
        this.detailInfo = data.detailInfo
        //  5.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        // //  6.获取评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
    },
    methods: {
      contentScroll(position) {
        // console.log(position.y);
        //1.判断BackTop是否显示
        this.isShowTop = (-position.y) > 500
        //  2.监听滚动位置
        const positionY = -position.y
        for (let i = 0; i < this.themeTopYs.length; i++) {
          if (this.currentIndex !== i && ((i < this.themeTopYs.length - 1 && positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i === this.themeTopYs.length - 1 && positionY > this.themeTopYs[i]))) {
            this.currentIndex = i;
            console.log(this.currentIndex);
            this.$refs.detail.currentIndex = this.currentIndex
          }
        }
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 500)
        // console.log(this.$refs.scroll.msg);
      },
      imageLoad() {
        this.$refs.scroll.refresh()
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // console.log(this.themeTopYs);
      },
      titleClick(index) {
        // console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
        // this.$refs.scroll.scrollTo(0, 500, 2000)
      },
      addToCart() {
        //  1.获取需要展示的商品信息

        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.newPrice = this.goods.realPrice;
        product.iid = this.iid
        //  2.将商品加入到购物车，这里使用vuex来做,没有Vuex，所以我们需要安装vuex， npm install vuex --save  需要新建立文件夹store,里面新建index.js。调用需要使用commit，
        //  mutations调用使用commit
        this.$store.commit('addCart', product)
        //   actions调用使用dispatch
        this.$store.dispatch('addCart', product).then(resolve => {
          // console.log(resolve);
        })
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 999;
    background-color: #fff;
    height: 100vh;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 59px;
    left: 0;
    right: 0;
  }

  .detail-nav-bar {
    position: fixed;
    z-index: 99999;
    top: -1px;
    right: 0;
    left: 0;
    background-color: #fff;
  }
</style>