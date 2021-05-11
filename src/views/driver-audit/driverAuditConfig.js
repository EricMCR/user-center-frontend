const columns = [
    {
        key: 'name',
        title: '姓名',
        width: 120
    },
    {
        key: 'age',
        title: '年龄',
        width: 80
    },
    {
        key: 'sex',
        title: '性别',
        type: 'tag',
        width: 80,
        color(row) {
            return row.sex === '男' ? 'blue' : 'red';
        }
    },
    {
        key: 'phone',
        title: '手机号',
        width: 150
    },
    {
        key: 'idCard',
        title: '身份证号',
        width: 170
    },
    {
        key: 'stateName',
        title: '状态',
        type: 'tag',
        width: 100,
        color(row) {
            return row.state ? 'red' : 'blue';
        }
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
            key: 'phone',
            label: '手机号',
            type: 'number'
        },
        {
            key: 'state',
            label: '状态',
            type: 'select',
            options: [
                {
                    label: '待审核',
                    value: 0
                },
                {
                    label: '未通过',
                    value: 1
                }
            ]
        }
    ]
}

const handle = {
    title: '操作',
    width: 170,
    fixed: 'right',
    size: 'small',
    btns: [
        {
            label: '查看原因',
            type: 'primary',
            event: 'remark',
            icon: 'file-search',
            ifRender(row){
                return row.state === 1;
            }
        },
        {
            label: '审核详情',
            type: 'primary',
            event: 'audit',
            icon: 'audit',
            ifRender(row){
                return row.state == 0;
            }
        }
    ]
}

const requestOptions = {
    url: '/driver/auditList',
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