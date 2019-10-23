<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    data() {
      return {
        message: 'hahaa',
        isShow: false
      }
    },
    methods: {
      show(message, duration) {
        this.isShow = true;
        this.message = message
        setTimeout(() => {
          this.isShow = false;
          this.message = ''
        }, duration)
      }
    }
  }
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  color: #fff;
  padding: 8px 10px;
  transform: translate(-50%,-50%);
  background-color: rgba(0,0,0,.7);
}
</style>