const columns = [
    {
        key: 'name',
        title: '姓名',
        fixed: 'left',
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
        color(row) {
            return row.sex === '男' ? 'blue' : 'red';
        },
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
        key: 'stateName',
        title: '状态',
        type: 'tag',
        color(row) {
            return row.state ? 'green' : 'orange';
        },
        width: 130
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
            key: 'mobileNo',
            label: '手机号',
            type: 'number'
        },
        {
            key: 'state',
            label: '状态',
            type: 'select',
            options: [
                {
                    label: '未认证',
                    value: 0
                },
                {
                    label: '已认证',
                    value: 1
                }
            ]
        }
    ]
}

const handle = {
    title: '操作',
    size: 'small',
    width: 200,
    fixed: 'right',
    btns: [
        {
            label: '编辑',
            type: 'primary',
            event: 'edit',
            icon: 'edit'
        },
        {
            label: '启用',
            type: 'primary',
            event: 'open',
            icon: 'check',
            ifRender(row) {
                return row.state == 0;
            }
        },
        {
            label: '禁用',
            type: 'primary',
            event: 'close',
            icon: 'close',
            ifRender(row) {
                return row.state == 1;
            }
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