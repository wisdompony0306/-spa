<style rel="stylesheet/less" lang="less" scoped>
    .money20_png {
        background-image: data-uri("../../views/benefit/image/money20.png");
        background-repeat: no-repeat;
        background-size: contain;
        width:15vw;
    }
    .battery_png  {
        background-image: data-uri("../../views/benefit/image/battery.png");
        background-repeat: no-repeat;
        background-size: contain;
        width:15vw;
    }
    .ring_png  {
        background-image: data-uri("../../views/benefit/image/ring.png");
        background-repeat: no-repeat;
        background-size: contain;
        width:15vw;
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
        .content {
            width:100vw;
            position:absolute;
            top:50%;
            left:50%;
            -webkit-transform:translate(-50%,-50%);
            transform:translate(-50%,-50%);
            &_close {
                width:4.8vw;
                height:4.8vw;
                background-repeat: no-repeat;
                background-size: contain;
                background-image: url(//img.58cdn.com.cn/fangrs/img/56d4dab5f09113db4041802f1cfcf45e.png);
                display:block;
                position:absolute;
                right:4vw;
                top:0;
            }
        }
        .invitation {
        margin: 6vw 4vw 0 4vw;
        &_header{
            line-height: 11vw;
            font-size: 19px;
            background-color: #23e9eb;
        }
        &_content{
            font-size: 12px;
            text-align: center;
            padding-top: 3vw;
            padding-bottom : 4.5vw;
            background-color:  rgba(35,233,235,0.85);
            color:#fff;
            P{
                color:#fff;
                font-size: 12px;
                span {
                    position: absolute;
                    right: 4vw;
                    font-size:11px;
                    i{
                        display: inline-block;
                        width: 3vw;
                        height: 3vw;
                        border: #FFF solid 1px;
                        border-radius: 100%;
                        font-size: 10px;
                    }
                }
            }
            &_img {
                display:flex;
                flex-wrap: nowrap;
                justify-content: space-around;
                margin-top:2vw;
                i {
                    height:15vw;
                }
                
            }
            &_word {
                display: -webkit-flex;
                display: flex;
                -webkit-flex-wrap: nowrap;
                -webkit-justify-content: space-around;
                flex-wrap: nowrap;
                justify-content: space-around;
                color: #fff;
                font-size: 15px;
                margin-top: 2vw;
                span {
                     width:30.7vw;
                }
            }
            &_bar {
                display: -webkit-flex;
                display: flex;
                -webkit-flex-wrap: nowrap;
                -webkit-justify-content: space-around;
                flex-wrap: nowrap;
                justify-content: space-around;
                margin:3vw 4vw 0 4vw;
                li {
                    background:#FFF;
                    width:5vw;
                    height:12px;
                    display:inline-block;
                    background-color:#92da6d;
                }
                li.invitated {
                    background-color:#ffff00;
                }
            }
            &_barnum {
                margin:4px 4vw;
                color:#fff;
                font-size:12px;
                text-align:left;
                .barnum1 {
                    padding-left:14vw;
                }
                .barnum2 {
                    padding-left:17vw;
                }
                .barnum3 {
                    float:right;
                }
            }
            &_button {
                line-height: 11vw;
                background-color: #fed732;
                width: 72vw;
                margin: 5vw 10vw 0 10vw;
                font-size: 14px;
                color: #4547c0;
                box-shadow: 3px 3px 1px #031afd;
            }
            &_instruction {
                margin-top:4vw;
                font-size:11px;
                color:#eee;
            }
        }
    }
    }
</style>

<template>
  <div class="message" v-if=value>
    <div class="backdrop"></div>
    <div class="content">
        <i class="content_close" v-on:click="close"></i>
        <div class="invitation">
            <p class = "invitation_header">邀请有礼</p>
            <div class="invitation_content">
                <p>{{!invitationNum?'您还没有邀请过好友,快去邀请吧!':'您已邀请'+invitationNum+'位好友,加油～'}}</p>
                <div class="invitation_content_img">
                    <i class="money20_png" />
                    <i class="battery_png" />
                    <i class="ring_png" />
                </div>
                <div class="invitation_content_word">
                    <span>20元话费</span>
                    <span>小米移动电源</span>
                    <span>小米运动手环</span>
                </div>
                <ul class="invitation_content_bar">
                    <li v-for="n in 15" :class="n<=invitationNum?'invitated':'notInvitated'" ></li>
                </ul>
                <div class="invitation_content_barnum">
                    <span class="barnum1">3位</span>
                    <span class="barnum2">7位</span>
                    <span class="barnum3">15位</span>
                </div>
                <div class="invitation_content_button" v-on:click="share">火速分享给小伙伴</div>
                <p class="invitation_content_instruction">点击上方按钮，邀请好友赢大奖</p>
            </div>
        </div>
    </div>
  </div>
</template>

<script>



  export default {
    name: 'invitationAlert',
    props: {
      'invitationNum':{
        type: Number,
        required: true
      },
    //   'text':{
    //     type: Array,
    //     required: true
    //   },
    //    'button':{
    //     type: String,
    //     required: true
    //   },     
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
        share(){
            this.close();
            this.$emit('share');
        }
    }
  }
</script>