const columns = [
    {
        key: 'name',
        title: '姓名',
        width: 120
    },
    {
        key: 'nickname',
        title: '昵称',
        width: 140
    },
    {
        key: 'sex',
        title: '性别',
        type: 'tag',
        width: 70
    },
    {
        key: 'mobileNo',
        title: '手机号',
        width: 140
    },
    {
        key: 'idCard',
        title: '身份证号',
        width: 180
    },
    {
        key: 'state',
        title: '状态',
        width: 170
    }
]

const query = {
    queryList: [
        {
            key: 'name',
            label: '姓名',
            type: 'text'
        },
        {
            key: 'nickname',
            label: '昵称',
            type: 'text'
        },
        {
            key: 'mobile_no',
            label: '手机号',
            type: 'number'
        },
        {
            key: 'state',
            label: '状态',
            type: 'select',
            options: [
                {
                    label: '未下单客户',
                    value: 0
                },
                {
                    label: '已下单客户',
                    value: 1
                }
            ]
        }
    ]
}

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
            label: '删除',
            type: 'danger',
            event: 'delete',
            icon: 'delete'
        }
    ]
}

const requestOptions = {
    url: '/user/selectPage',
    method: 'POST',
    params: {

    }
}

export const pageConfig = {
    columns,
    query,
    handle,
    requestOptions
}