<style rel="stylesheet/less" lang="less" scoped>
    .backdrop {
         width:100vw;
        height:100vh;
        position:fixed;
        top:0;
       left:0;
       background-color: rgba(0,0,0,.5);
       z-index: 10;
     }
   .select {
       width:100vw;
       background-color: #fff;
        position: fixed;
        bottom: 0;
        z-index: 11;
        padding-bottom: 6vw;
       li{
           line-height:13vw;
           font-size:18px;
           color:#999;
       }
       .title {
           background: #E3E3E4;
           line-height:12vw;
           font-size:15px;
           color:#999;
           margin-bottom:2vw;
           span{
               position:absolute;
               right:4vw;
               font-size:13px;
               color:#333;
               border: 1px solid #CCCCCC;
                border-radius: 3px;
                line-height:14px;
                padding:1.5vw 3vw;
                margin-top:2.3vw;
           }
       }
   }
   li.selected {
       font-weight:bold;
       font-size:25px;
       color:#000;
   }
   .slide-in-up {
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
    }

    .slide-in-up.active {
     -webkit-transform: translate3d(0, 0, 0);
         transform: translate3d(0, 0, 0);
    }

    .slide-in-up {
     -webkit-transition: transform cubic-bezier(.1, .7, .1, 1) 400ms;
     transition: transform cubic-bezier(.1, .7, .1, 1) 400ms;
    }
</style>

<template>
    <div>
        <div class="backdrop" v-on:click="close" v-if="value"></div>
        <ul class="select slide-in-up" :class="{ active: value }">
            <li class="title">{{title}}<span v-on:click="submit">确定</span></li>
            <li v-for="(item, index) in list" v-on:click="selectIndex=index" :class="{ selected: selectIndex==index }">{{item}}</li>
        </ul>
    </div>
</template>

<script>



  export default {
    name: 'selectModal',
    props: {
      'title':{
        type: String,
        required: true
      },
      'list':{
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
          selectIndex:null
      }
    },
    computed: {
    },
    methods: {
        close(){
            this.$emit('input', false);
        },
        submit(){
            this.$emit('selected', this.list[this.selectIndex],this.selectIndex);
            this.close();
        }
    }
  }
</script>