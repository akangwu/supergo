<template>
  <div class="recommend">
    <!--这里循环的时候要循环props里面的数据名称-->
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props: {//是一个对象，后面直接写从父亲那里传过来的数据
      recommends: {//recommends是数据名称，但是要个父亲一致。
        type: Array,//要写type，数组还是对象或者字符串或者数字等，default后面有括号，可以认为是一个函数，要写return，后面写数组，对象等。这种是固定写法
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;

    padding: 13px 0 20px;
    border-bottom: 10px solid #eee;
  }

  .recommend-item {
    flex: 1;
  }

  .recommend-item img {
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
</style>
