/**
 * Created by luanchi on 17/5/25.
 * //activityhouse.m.58.com
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

import Mainvenue from '../views/mainvenue/mainvenue.vue';
import Apartment from '../views/apartment/apartment.vue';
import Benefit from '../views/benefit/benefit.vue';
import Mycenter from '../views/mycenter/mycenter.vue';
import Apply from '../views/apply/apply.vue';
import Rentplan from '../views/rentplan/rentplan.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
        const position = {x: 0, y: 0};
        return position;
    },
    routes: [{
        path: '/nestplan/index',
        name: 'index',
        redirect: '/nestplan/mainvenue',
    }, {
        path: '/nestplan/mainvenue',
        name: 'mainvenue',
        component: Mainvenue,
    }, {
        path: '/nestplan/apartment',
        name: 'apartment',
        component: Apartment,
    }, {
        path: '/nestplan/benefit',
        name: 'benefit',
        component: Benefit,
    }, {
        path: '/nestplan/mycenter',
        name: 'mycenter',
        component: Mycenter,
    }, {
        path: '/nestplan/apply',
        name: 'apply',
        component: Apply,
    }, {
        path: '/nestplan/rentplan',
        name: 'rentplan',
        component: Rentplan,
    }]
});

export default router;

