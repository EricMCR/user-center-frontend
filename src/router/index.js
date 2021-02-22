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

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next();
    } else {
        let token = localStorage.getItem('Authorization');

        if (token === 'null' || token === '') {
            next('/login');
        } else {
            next();
        }
    }
});

export default router;