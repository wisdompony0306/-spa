<style rel="stylesheet/less" lang="less" scoped>
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
        .content {
            background-color:#FFF;
            width:77.33vw;
            position:absolute;
            top:50%;
            left:50%;
            -webkit-transform:translate(-50%,-50%);
            transform:translate(-50%,-50%);
            text-align:center;
            &_header {
                margin-top:6.4vw;
                line-height: 9.6vw;
                font-size: 15px;
                color: #3A3A3A;
            }
            &_text {
                font-size: 35px;
                color: #3A3A3A;
                line-height:13.067vw;
            }
            &_button {
                background: #FF3544;
                border-radius: 2px;
                width:37.467vw;
                line-height:12.053vw;
                margin:6.4vw auto 8.08vw;
                color:#fff;
                font-size:17px;
            }
        }
    }
</style>

<template>
  <div class="message" v-if=value>
    <div class="backdrop"></div>
    <div class="content">
        <div class="content_header">{{title}}</div>
        <div class="content_text">{{text}}</div>
        <div v-on:click="close" class="content_button">{{button}}</div>
    </div>
  </div>
</template>

<script>



  export default {
    name: 'showCode',
    props: {
      'title':{
        type: String,
        required: true
      },
      'text':{
        type: String,
        required: true
      },
       'button':{
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
            this.$emit('buttonClick');
        }
    }
  }
</script>