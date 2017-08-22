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
                line-height: 21.067vw;
                font-size: 17px;
                font-weight: bold;
            }
            &_text {
                max-height:70vh;
                overflow:auto;
                padding:0 8.6667vw;
                font-size:14px;
                text-align:left;
                color:#3a3a3a;
                line-height:23px;
                li {
                    margin-bottom:2px;
                }
            }
            &_button {
                background: #FF3544;
                border-radius: 2px;
                width:37.467vw;
                line-height:12.053vw;
                margin:8.933vw auto 8.08vw;
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
        <div class="content_text">
            <ol>
                <li v-for="(item, index) in text">{{item}}</li>
            </ol>
        </div>
        <div v-on:click="buttonClick" class="content_button">{{button}}</div>
    </div>
  </div>
</template>

<script>



  export default {
    name: 'submitSuccess',
    props: {
      'title':{
        type: String,
        required: true
      },
      'text':{
        type: Array,
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
        },
        buttonClick(){
            this.close();
            this.$emit('buttonClick');
        }
    }
  }
</script>