<style rel="stylesheet/less" lang="less" scoped>
    .message {
        position:fixed;
        top:0;
        left:0;
        line-height:12vw;
        z-index:11;
        top:50%;
        left:50%;
        -webkit-transform:translate(-50%,-50%);
        transform:translate(-50%,-50%);
        text-align:center;
        background-color:rgba(0,0,0,.7);
        color:#fff;
        font-size:16px;
        padding :0 9.067vw;
        border-radius: 2px;
    }
</style>

<template>
  <p class="message" v-if=value>
    {{text}}
  </p>
</template>

<script>
  export default {
    name: 'toast',
    props: {
      'text':{
        type: String,
        required: true
      },
       'time':{
        type: Number,
        required: true
      },     
      'value':{
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
      }
    },
    computed: {
    },
    methods: {
        close(){
            this.$emit('input', false);
        }
    },
    watch: {
        value(newValue){
            if(newValue){
                setTimeout(()=>{this.close()},this.time);
            }
        }
    }
  }
</script>