<template>
  <div class="tab-control">
    <!--这里也可以使用插槽，但是只有字不一样的情况下，完全可以不使用插槽-->
    <div v-for="(item,index) in titles"
         class="tab-control-item"
         :class="{active: index == currentIndex}"
         @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default { //这里是默认的写法，向外暴露一个目标
    name: "TabControl",
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index){
        this.currentIndex = index
        this.$emit('tabClick',index)
      }
    }

  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active span {
    border-bottom: 3px solid indianred;
  }

  .active {
    color: indianred;
  }
</style>
