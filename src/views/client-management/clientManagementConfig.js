const columns = [
    {
        key: 'username',
        title: '昵称',
        fixed: 'left',
        width: 120
    },
    {
        key: 'userAccount',
        title: '账号',
        width: 140
    },
    {
        key: 'genderText',
        title: '性别',
        type: 'tag',
        color(row) {
            return row.gender == 0 ? 'blue' : 'red';
        },
        width: 70
    },
    {
        key: 'phone',
        title: '手机号',
        width: 140
    },
    {
        key: 'email',
        title: '邮箱',
        width: 180
    },
    {
        key: 'statusText',
        title: '状态',
        type: 'tag',
        color(row) {
            return row.status ? 'green' : 'orange';
        },
        width: 130
    },
    {
        key: 'createTime',
        title: '创建时间',
        width: 170
    },
    {
        key: 'updateTime',
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
    url: '/user/search',
    method: 'POST',
    params: {

    }
}

const formatData = (data) => {
    return data.map(item => {

        item.genderText = item.gender == 0 ? '男' : '女';
        item.statusText = item.status == 0 ? '正常' : '';

        return item;
    });
}

export const pageConfig = {
    columns,
    query,
    handle,
    requestOptions,
    formatData
}