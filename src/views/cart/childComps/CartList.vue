<template>
  <div class="cart-list">
    <scroll ref="scroll" class="content">
      <cart-list-item
          v-for="(item,index) in $store.state.cartList"
          :key="index"
          :item-info="item"/>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  import CartListItem from './CartListItem'

  export default {
    name: "CartList",
    components: {
      Scroll,
      CartListItem
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list {
    position: relative;
    /*height: 500px;*/
    height: 100vh;
    /*overflow: hidden;*/
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 133px;
  }

</style>