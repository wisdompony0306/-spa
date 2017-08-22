<!--
    desc: 
-->
<style rel="stylesheet/less" lang="less" scoped>
    .loadingBox {
        display: -webkit-flex;
        display: flex;
        -webkit-justify-content: center;
        -webkit-align-items: center;
        justify-content: center;
        align-items: center;
        &.pop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 30;

            .loadWrap {
                width: px2rem(200px);
                height: px2rem(200px);
                background-color: rgba(0, 0, 0, 0.5);
                display: -webkit-flex;
                display: flex;
                -webkit-justify-content: center;
                -webkit-align-items: center;
                justify-content: center;
                align-items: center;
            }
        }
        .loading {
            display: block;
            border-radius: 100%;
            border: px2rem(5px) solid #fff;
            border-bottom-color: transparent;
            height: px2rem(50px);
            width: px2rem(50px);
            -webkit-animation: loadingRotate .75s 0s linear infinite;
            animation: loadingRotate .75s 0s linear infinite;
        }

        @-webkit-keyframes loadingRotate {
            0% {
                -webkit-transform: rotate(0deg);
                transform: rotate(0deg)
            }
            50% {
                -webkit-transform: rotate(180deg);
                transform: rotate(180deg)
            }
            100% {
                -webkit-transform: rotate(360deg);
                transform: rotate(360deg)
            }
        }
    }
</style>

<template>
    <div class="loadingBox" :class="[mode]" v-if="isShow">
        <div class="loadWrap">
            <i class="loading"></i>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            isShow: {
                type: Boolean,
                required: true,
                default: false
            },
            mode: {
                type: String,
                default: '',
                validator: function (value) {
                    let flag = true;
                    switch (value) {
                        case 'pop':
                            break;
                        case '':
                            break;
                        default:
                            flag = false;
                            break;
                    }
                    return flag;
                }
            }
        },
        watch: {
            isShow(val, old){
            }
        },
        mounted(){
        },
        methods: {},
    };
</script>