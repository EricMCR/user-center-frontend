import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const routes = [
    {
        path: '/login',
        name: '登录页',
        component: () => import('@/views/login/login.vue')
    },
    {
        path: '/homePage',
        name: '主页',
        component: () => import('@/views/homePage/homePage.vue')
    },
]

const router =  new Router({
    routes
})
export default router;