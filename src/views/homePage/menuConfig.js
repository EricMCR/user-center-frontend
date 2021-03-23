
//type:1-文件夹, 2-链接
export const menuList = [
    {
        title: '管理员管理',
        url: '/#/adminManagement',
        type: 2,
        icon: 'setting'
    },
    {
        title: '客户管理',
        url: '/#/clientManagement',
        type: 2,
        icon: 'user'
    },
    {
        title: '地址管理',
        url: '/#/addressManagement',
        type: 2,
        icon: 'environment',
        disabled: true
    },
    {
        title: '订单管理',
        url: '/#/orderManagement',
        type: 2,
        icon: 'money-collect',
        disabled: true
    },
    {
        title: '代驾管理',
        url: '/#/driverManagement',
        type: 2,
        icon: 'car',
        disabled: true
    }
]