
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
        width: 200
    },
    {
        key: 'sex',
        title: '性别',
        type: 'tag'
    }
]

const handle = {
    title: '操作',
    width: 230,
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
            event: 'delete'
        }
    ]
}

export{
    columns,
    handle
}