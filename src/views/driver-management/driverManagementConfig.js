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
        width: 170
    },
    {
        key: 'starLevel',
        title: '等级',
        type: 'rate',
        width: 150
    },
    {
        key: 'stateName',
        title: '状态',
        type: 'tag',
        width: 100
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
                    label: '启用',
                    value: 0
                },
                {
                    label: '禁用',
                    value: 1
                }
            ]
        },
        {
            key: 'starLevel',
            label: '等级',
            type: 'select',
            options: [
                {
                    label: '一星',
                    value: 1
                },
                {
                    label: '二星',
                    value: 2
                },
                {
                    label: '三星',
                    value: 3
                },
                {
                    label: '四星',
                    value: 4
                },
                {
                    label: '五星',
                    value: 5
                }
            ]
        }
    ]
}

const handle = {
    title: '操作',
    width: 140,
    fixed: 'right',
    size: 'small',
    btns: [
        {
            label: '查看评价',
            type: 'primary',
            event: 'comment',
            icon: 'file-search'
        }
    ]
}

const requestOptions = {
    url: '/driver/selectPage',
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