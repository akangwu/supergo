<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
          :is-checked="isSelectAll"
          class="checkaaa"
      @click.native="checkClick"/>
      <span class="slect-all">全选</span>
      <span class="caculte-money">合计:{{totalPrice}}</span>

    </div>
    <div class="caculte">
      <span>结算({{checkLength}})</span>
    </div>
  </div>
</template>

<script>
  import CheckButton from '../../../components/contnet/checkButton/CheckButton'
  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      totalPrice() {
        return this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.newPrice * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        if(this.$store.state.cartList.length ==0) return false
        return !this.$store.state.cartList.find(item => !item.checked)
        // return !(this.$store.state.cartList.filter(item => !item.checked).length)
      }
    },
    methods:{
      checkClick(){
        if (this.isSelectAll){ //全部选中的情况下，点击之后，全部不选中
          this.$store.state.cartList.forEach(item => item.checked = false)
        }else {//至少有一个不选中的情况下，点击之后全不选中
          this.$store.state.cartList.forEach(item => item.checked = true)
        }
      }
    }
  }
</script>
<style scoped>
  .bottom-bar {
    height: 40px;
    background-color: #eee;
    position: relative;
    left: 0;
    right: 0;
    bottom: 133px;
    /*z-index: 1000;*/
  }

  .check-content {
    display: flex;
    align-items: center;
    padding-top: 10px;
    margin-left: 10px;
  }

  .caculte-money {
    padding-left: 30px;
  }

  .caculte {
    /*display: inline-block;*/
    height: 40px;
    line-height: 40px;
    text-align: center;
    width: 100px;
    background-color: red;
    position: absolute;
    top: 0;
    right: 20px;
    font-size: 18px;
    color: #fff;
  }

  .checkaaa {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
</style>