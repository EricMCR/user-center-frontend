
//type:1-文件夹, 2-链接
export const menuList = [
    {
        title: '管理员管理',
        url: '/#/testPage2',
        type: 2,
        icon: 'windows',
        subMenuList: []
    },
    {
        title: '客户管理',
        type: 1,
        icon: 'pie-chart',
        subMenuList: [
            {
                title: '客户账号管理',
                url: '/#/testPage1',
                type: 1,
                icon: 'rest'
            }
        ]
    },
    {
        title: '权限管理',
        url: '/#/testPage2',
        type: 2,
        icon: 'windows',
        subMenuList: []
    },
    {
        title: '配置管理',
        url: '/#/testPage3',
        type: 2,
        icon: 'mail',
        subMenuList: []
    }
]