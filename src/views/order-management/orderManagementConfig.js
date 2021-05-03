const columns = [
    {
        key: 'userName',
        title: '用户名',
        type: '',
        width: 120
    },
    {
        key: 'age',
        title: '年龄',
        type: '',
        width: 80
    },
    {
        key: 'sex',
        title: '性别',
        type: 'tag',
        width: 80
    },
    {
        key: 'phone',
        title: '手机号',
        width: 150
    },
    {
        key: 'authName',
        title: '身份',
        type: 'tag',
        width: 170
    }
]

const handle = {
    title: '操作',

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
    url: '/userOrder/selectPage',
    method: 'POST',
    params: {

    }
}

export const pageConfig = {
    columns,
    //handle,
    requestOptions
}