<style rel="stylesheet/less" lang="less" scoped>
    .arrow_png {
        background-image: data-uri("image/arrow.png");
        background-repeat: no-repeat;
        background-size: contain;
        display: inline-block;
        width:6.72vw;
        height:4vw;
    }
    .message {
        position:fixed;
        top:0;
        left:0;
        width:100vw;
        height:100vh;
        z-index:11;
        .backdrop {
            width:100vw;
            height:100vh;
            position:absolute;
            top:0;
            left:0;
            background-color: rgba(0,0,0,.7);
        }
        .bj {
            position:absolute;
            z-index:11;
            width:80vw;
            right:0;
        }
        .content {
            z-index:11;
            width:77.33vw;
            position:absolute;
            top:87vw;
            left:50%;
            -webkit-transform:translate(-50%,-50%);
            transform:translate(-50%,-50%);
            text-align:center;
            &_header {
                font-size: 16px;
                color: #666666;
                line-height: 7vw;
            }
            &_text {
                margin-top:2px;
                font-size: 19px;
                color: #666666;
                line-height: 7vw;
            }
        }
    }
</style>

<template>
  <div class="message" v-if=value v-on:click="close">
    <div class="backdrop"></div>
    <img class="bj" src="//img.58cdn.com.cn/fangrs/img/4d9c9f6889cb0b29ccec2cb09978ac0b.png" />
    <div class="content">
        <i class="arrow_png" />
        <div class="content_header">{{title}}</div>
        <div class="content_text">{{text}}</div>
    </div>
  </div>
</template>

<script>



  export default {
    name: 'wxShareTip',
    props: {
      'title':{
        type: String,
        required: true
      },
      'text':{
        type: String,
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
    }
  }
</script>