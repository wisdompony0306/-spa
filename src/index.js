/**
 * Created by luanchi on 17/5/25.
 */
import Vue from 'vue';
import router from './router/router';
import hbcExt from './plugins/vue.ext';
import IndexView from './index.vue';

Vue.use(hbcExt);

new Vue({
    el: '#app',
    router,
    render: (h) => h(IndexView),
});
