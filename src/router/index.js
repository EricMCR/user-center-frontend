import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const routes = [
    {
        path: '/',
        redirect: '/login'
    },
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
    {
        path: '/chartsPage',
        name: '图表页',
        component: () => import('@/components/charts-page/chartsPage.vue')
    },
    {
        path: '/adminManagement',
        name: '管理员管理',
        component: () => import('@/views/admin-management/adminManagement.vue')
    },
    {
        path: '/clientManagement',
        name: '客户管理',
        component: () => import('@/views/client-management/clientManagement.vue')
    },
    {
        path: '/orderManagement',
        name: '订单管理',
        component: () => import('@/views/order-management/orderManagement.vue')
    },
    {
        path: '/addressManagement',
        name: '地址管理',
        component: () => import('@/views/address-management/addressManagement.vue')
    },
    {
        path: '/driverManagement',
        name: '代驾信息',
        component: () => import('@/views/driver-management/driverManagement.vue')
    },
    {
        path: '/driverAudit',
        name: '代驾审核',
        component: () => import('@/views/driver-audit/driverAudit.vue')
    },
]

const router =  new Router({
    routes
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('token');

    if (token === null || token === '') {
        if (to.path !== '/login') {
            next('/login');
        }
    }else {
        if (to.path === '/login') {
            next('/homePage');
        }
    }

    next();
});

//解决  vue-router路由版本更新产生的问题,导致路由跳转失败抛出该错误
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

export default router;