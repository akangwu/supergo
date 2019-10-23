<template>
  <div class="detail-swiper">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in topImages">
        <img :src="item" alt="">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>

  export default {
    name: "DetailSwiper",
    props:{
      topImages:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .detail-swiper {
    height: 300px;
    /*margin-top: 40px;*/
    overflow: hidden;
  }
  .mint-swipe img {
    /*height: 300px;*/
    width: 100%;
    /*overflow: hidden;*/
  }
</style>
