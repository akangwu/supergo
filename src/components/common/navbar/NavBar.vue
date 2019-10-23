<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  .nav-bar {
    height: 44px;
    line-height: 44px;
    display: flex;
    text-align: center;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
    z-index:9;
  }
  .left,.right{
    width: 60px;
  }
  .center {
    /*//flex布局中，其他的给定宽度，还剩一个，一个没有给定宽度，直接给flex：1，这个就会把剩下的全部占满*/
    flex: 1;
  }
</style>
