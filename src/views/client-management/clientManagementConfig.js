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
            key: 'mobile_no',
            label: '手机号',
            type: 'number'
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
            label: '常用地址',
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