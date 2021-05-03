const columns = [
    {
        key: 'userName',
        title: '用户名',
        width: 120
    },
    {
        key: 'province',
        title: '省份',
        width: 120
    },
    {
        key: 'city',
        title: '城市',
        width: 120
    },
    {
        key: 'county',
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

const query = {
    queryList: [
        {
            key: 'userName',
            label: '用户名',
            type: 'text'
        },
        {
            key: 'province',
            label: '省份',
            type: 'text'
        },
        {
            key: 'city',
            label: '城市',
            type: 'text'
        },
        {
            key: 'county',
            label: '县/区',
            type: 'text'
        },
        {
            key: 'street',
            label: '街道',
            type: 'text'
        },
        {
            key: 'detailAddress',
            label: '详细地址',
            type: 'text'
        }
    ]
}

const handle = {
    title: '操作',
    width: 150,
    fixed: 'right',
    size: 'small',
    btns: [
        {
            label: '常用地址',
            type: 'primary',
            event: 'addressList',
            icon: 'container'
        }
    ]
}

const requestOptions = {
    url: '/userAddress/selectPage',
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