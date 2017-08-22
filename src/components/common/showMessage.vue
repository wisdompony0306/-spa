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
            background-color: rgba(0,0,0,.5);
        }
        .content {
            background-color:#FFF;
            width:92vw;
            position:absolute;
            top:50%;
            left:50%;
            -webkit-transform:translate(-50%,-50%);
            transform:translate(-50%,-50%);
                background: 
                linear-gradient(to left top, transparent 50%, #c5d4ca 0) 100% 100% no-repeat, 
                linear-gradient(-34deg, transparent 7vw, #fff 0);
            background-size: 13vw 9vw, auto;
            &_header {
                line-height: 18vw;
                font-size: 25px;
                background: #ECF1EE;
                font-weight: bold;
            }
            &_text {
                max-height:70vh;
                overflow:auto;
                padding:8.4vw 7.3vw 15vw;
                font-size:13px;
                text-align:left;
                color:#666666;
                line-height:25px;
                li {
                    margin-bottom:5px;
                }
            }
        }
    }
</style>

<template>
  <div class="message" v-if=value v-on:click="close" >
    <div class="backdrop" ></div>
    <div class="content">
        <div class="content_header">{{title}}</div>
        <div class="content_text">
            <ol>
                <li v-for="(item, index) in text">{{(index+1)+'.'+item}}</li>
            </ol>
        </div>
    </div>
  </div>
</template>

<script>



  export default {
    name: 'showMessage',
    props: {
      'title':{
        type: String,
        required: true
      },
      'text':{
        type: Array,
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