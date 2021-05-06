const columns = [
    {
        key: 'orderNo',
        title: '订单号',
        type: '',
        width: 150
    },
    {
        key: 'userName',
        title: '用户名',
        type: '',
        width: 120
    },
    {
        key: 'driverName',
        title: '代驾姓名',
        type: '',
        width: 120
    },
    {
        key: 'fromAddress',
        title: '出发地',
        width: 300
    },
    {
        key: 'toAddress',
        title: '目的地',
        width: 300
    },
    {
        key: 'stateName',
        title: '用户状态',
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

const formatData = (data) => {
    return data.map(item => {
        item.fromAddress = (item.fromProvince ? item.fromProvince+' ' : '') + (item.fromCity ? item.fromCity+' ' : '') +
            (item.fromCounty ? item.fromCounty+' ' : '') +(item.fromStreet ? item.fromStreet : '');
        item.toAddress = (item.toProvince ? item.toProvince+' ' : '') + (item.toCity ? item.toCity+' ' : '') +
            (item.toCounty ? item.toCounty+' ' : '') +(item.toStreet ? item.toStreet : '');
        return item;
    });
}

const handle = {
    title: '操作',
    fixed: 'right',
    width: 130,
    size: 'small',
    btns: [
        {
            label: '编辑',
            type: 'primary',
            event: 'edit',
            icon: 'edit'
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
    formatData,
    handle,
    requestOptions
}