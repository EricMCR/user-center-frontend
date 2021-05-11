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
        key: 'mobileNo',
        title: '手机号',
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
        key: 'amount',
        title: '金额',
        type: '',
        width: 100
    },
    {
        key: 'stateName',
        title: '状态',
        type: 'tag',
        color(row) {
            switch(row.state){
                case 0:
                    return 'red';
                case 1:
                    return 'cyan';
                case 2:
                    return 'green';
                case 3:
                    return 'orange';
                case 4:
                    return 'purple';
            }
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

const query = {
    queryList: [
        {
            key: 'orderNo',
            label: '订单号',
            type: 'text'
        },
        {
            key: 'userName',
            label: '用户名',
            type: 'text'
        },
        {
            key: 'mobileNo',
            label: '手机号',
            type: 'text'
        },
        {
            key: 'state',
            label: '状态',
            type: 'select',
            options: [
                {
                    label: '待接单',
                    value: 0
                },
                {
                    label: '已接单',
                    value: 1
                },
                {
                    label: '已完成',
                    value: 2
                },
                {
                    label: '已取消',
                    value: 3
                },
                {
                    label: '待支付',
                    value: 4
                }
            ]
        },
        {
            key: 'minAmount',
            label: '最小金额',
            type: 'number'
        },
        {
            key: 'maxAmount',
            label: '最大金额',
            type: 'number'
        },

    ]
}

const handle = {
    title: '操作',
    fixed: 'right',
    width: 220,
    size: 'small',
    btns: [
        {
            label: '编辑',
            type: 'primary',
            event: 'edit',
            icon: 'edit',
            ifRender(row) {
                return row.state != 2;
            }
        },
        {
            label: '查看评价',
            type: 'primary',
            event: 'comment',
            icon: 'file-search',
            ifRender(row){
                return row == 2;
            }
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
    query,
    handle,
    requestOptions
}