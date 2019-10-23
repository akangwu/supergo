<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad: {
        type:Boolean,
        default:false
      }
    },
    data() {
      return {
        scroll: null,
        msg:"hahaa",
      }
    },
    components:{
      BScroll
    },
    mounted() {
      //1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click:true, //想要div监听点击，必须要设置click=true
        probeType:this.probeType, //必须要写这个才能实时监听
        pullUpLoad:this.pullUpLoad
      })
    //  2.实时监听滚动位置
      this.scroll.on('scroll',(position)=>{
        // console.log(positon);
        this.$emit('scroll',position)
      })
    //  3.监听scroll的滚动位置
      if (this.pullUpLoad){
        this.scroll.on('pullingUp',() =>{
          this.$emit('pullingUpLoad')
        })
      }
    },
    methods:{
      scrollTo(x,y,time=300){
        this.scroll && this.scroll.refresh && this.scroll.scrollTo(x, y, time)
      },
      refresh(){
        this.scroll && this.scroll.refresh && this.scroll.refresh()
      },
      finishPullUp(){
        this.scroll && this.scroll.refresh && this.scroll.finishPullUp()
      }
    }
  }
</script>

<style scoped>

</style>