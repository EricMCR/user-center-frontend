const columns = [
    {
        key: 'name',
        title: '姓名',
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
        color(row) {
            return row.sex === '男' ? 'blue' : 'red';
        },
        width: 80
    },
    {
        key: 'phone',
        title: '手机号',
        width: 150
    },
    {
        key: 'idCard',
        title: '身份证号',
        width: 150
    },
    {
        key: 'authName',
        title: '职务',
        type: 'tag',
        color(row) {
            return row.auth === 2 ? 'orange' : row.auth === 1 ? 'blue': 'green';
        },
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
            key: 'auth',
            label: '职务',
            type: 'select',
            options: [
                {
                    label: '普通员工',
                    value: 0
                },
                {
                    label: '组长',
                    value: 1
                },
                {
                    label: '总监',
                    value: 2
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
    query,
    handle,
    requestOptions
}