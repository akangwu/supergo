import BackTop from '../components/contnet/backtop/BackTop'
export const backTopMixin = {
  conponents:{
    BackTop
  },
  data(){
    return{
      isShowTop:false
    }
  },
  methods:{

    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
      // console.log(this.$refs.scroll.msg);
    },
  }
}