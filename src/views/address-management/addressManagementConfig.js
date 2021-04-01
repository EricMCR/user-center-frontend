const columns = [
    {
        key: 'nameName',
        title: '用户名',
        width: 120
    },
    {
        key: 'province',
        title: '省份',
        width: 80
    },
    {
        key: 'city',
        title: '城市',
        width: 80
    },
    {
        key: 'country',
        title: '县/区',
        width: 150
    },
    {
        key: 'street',
        title: '街道',
        width: 170
    },
    {
        key: 'detailAddress',
        title: '详细地址',
        width: 170
    },
    {
        key: 'createTime',
        title: '创建时间',
        width: 170
    },
    {
        key: 'lastUpdateTime',
        title: '更新时间',
        width: 170
    }
]

const handle = {
    title: '操作',
    width: 300,
    fixed: 'right',
    size: 'small',
    btns: [
        {
            label: '编辑',
            type: 'primary',
            event: 'edit',
            icon: 'edit'
        },
        {
            label: '修改密码',
            type: 'primary',
            event: 'editPwd',
            icon: 'lock'
        },
        {
            label: '删除',
            type: 'danger',
            event: 'delete',
            icon: 'delete'
        }
    ]
}

const requestOptions = {
    url: '/admin/getall',
    method: 'POST',
    params: {

    }
}

export const pageConfig = {
    columns,
    handle,
    requestOptions
}