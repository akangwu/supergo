<template>
  <div class="goods">
    <!--{{goods}}-->
    <goods-list-item v-for="item in goods" :goods-item="item" />
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem'
  export default { //这里是默认的写法，向外暴露一个目标
    name: "APP",
    props:{
      goods:{
        type:Array,
        default(){
          return []
        }
      }
    },
    components:{
      GoodsListItem
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
  }
</style>
