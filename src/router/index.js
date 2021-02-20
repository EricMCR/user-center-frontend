import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const routes = [
    {
        path: '/loginPage',
        name: '登录页',
        component: () => import('@/views/loginPage/loginPage.vue')
    },
    {
        path: '/home',
        name: '主页',
        component: () => import('@/components/HelloWorld.vue')
    },
]

const router =  new Router({
    routes
})
export default router;