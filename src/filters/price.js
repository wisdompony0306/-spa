/**
 * Created by luanchi on 17/5/25.
 * 价格过滤器 格式:¥+价格+/月
 */
import Vue from 'vue';
Vue.filter('price', function (value) {
    return "¥ "+value+"/月";
});