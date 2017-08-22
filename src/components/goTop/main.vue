<!--
    desc: 返回顶部
-->
<style rel="stylesheet/less" lang="less" scoped>
    .goTop {
        position: fixed;
        z-index: 20;
        right: px2rem(20px);
        bottom: px2rem(130px);
        .go {
            display: block;
            width: px2rem(80px);
            height: px2rem(80px);
            background: data-uri("./images/goTop.png") no-repeat;
            background-size: cover;
        }
    }
</style>

<template>
    <div class="goTop" v-if="isShow">
        <a class="go" @click="handlerTop"></a>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data(){
            return {
                isShow: false,
            }
        },
        mounted(){
            let _this = this;
            window.addEventListener('scroll', function () {
                let sh = window.document.body.scrollTop;
                if (sh > 100) {
                    _this.isShow = true;
                } else {
                    _this.isShow = false;
                }
            })
        },
        methods: {
            handlerTop(){
                this.isShow = false;
                window.document.body.scrollTop = 0;
            }
        }
    };
</script>