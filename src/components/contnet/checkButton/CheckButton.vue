<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isChecked: {
        type: Boolean,
        default: false
      }
    }
    //  在做项目中会遇到全选的选中和不选中，我们不要从界面上面修改true还是false，一定要从对象模型中修改，不能修改isChecked的值，而是isChecked的值跟随默认对象的模型的true或false来做相应的修改
  }
</script>

<style scoped>
  .check-button {
    /*background-color: red;*/
    border-radius: 50%;
    border: 2px solid #aaa;
  }

  .check {
    background-color: indianred;
    border-color: #000;
  }
</style>