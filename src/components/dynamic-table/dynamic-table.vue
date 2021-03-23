<template>
    <div :class="pageConfig.className + ' dynamic-table'" ref="dyTable">
        <a-icon class="refresh-button" @click="refresh" type="reload" />
        <a-spin :spinning="loading">
            <div class="table-top">
                <slot name="table-top"></slot>
            </div>

            <div ref="query" v-if="pageConfig.query && pageConfig.query.queryList.length" class="query-box">
                <a-form layout="inline" labelAlign="left">

                    <a-form-item v-for="item in pageConfig.query.queryList" :label="item.label" :key="item.key">
                        <a-input v-if="item.type === 'text'" v-model="queryParams[item.key]" placeholder="请输入" />
                        <a-input v-else-if="item.type === 'number'" v-model="queryParams[item.key]" placeholder="请输入"
                        type="number" @keydown.native="keyRules"/>
                    </a-form-item>

                    <a-form-item class="query-button-container">
                        <a-button @click="resetQuery">重置</a-button>
                        <a-button type="primary" @click="queryPage">查询</a-button>
                        <slot name="query-button"></slot>
                    </a-form-item>
                </a-form>
            </div>

            <a-icon slot="indicator" type="loading" style="font-size: 30px" spin />
            <a-table class="table" :data-source="data" :bordered="true" rowKey="id" :pagination="false" :scroll="{x: 1000, y:tableHeight}">
                <a-table-column v-for="item in pageConfig.columns" :key="item.key" :title="item.title" :data-index="item.key" :width="item.width">
                    <template slot-scope="value">
                        <span v-if="!item.type || item.type === ''">{{value}}</span>
                        <template v-else-if="item.type === 'tag'">
                            <template v-if="Array.isArray(value)">
                                <a-tag v-for="tag in value" :key="tag" :color="item.color ? item.color : 'blue'">{{tag}}</a-tag>
                            </template>
                            <a-tag v-else :color="item.color ? item.color : 'blue'">{{value}}</a-tag>
                        </template>

                    </template>
                </a-table-column>

                <a-table-column class="handle-container" v-if="pageConfig.handle" :title="pageConfig.handle.title" :width="pageConfig.handle.width" key="handle">
                    <template slot-scope="scope">
                        <a-button v-for="btn in pageConfig.handle.btns" class="handle-btn" :size="pageConfig.handle.size" :key="btn.event" :type="btn.type" :icon="btn.icon" @click="handleClick(btn.event, scope)">
                            {{btn.label}}
                        </a-button>
                    </template>

                </a-table-column>
            </a-table>
            <div class="pagination-container">
                <a-pagination show-size-changer show-quick-jumper :show-total="total => `共 ${total} 条`" :default-current="currentPage" :total="totalCount" :page-size="pageSize"
                              @showSizeChange="handleSizeChange" @change="handleCurrentChange"/>
            </div>
        </a-spin>

    </div>
</template>

<script>
export default {
    name: "dynamic-table",
    props: {
        //表格配置（className：自定义类名，columns：表格列配置，query：查询项配置，handle：操作栏配置）
        pageConfig: {
            type: Object,
            default: () => {}
        }
    },
    created() {
        console.log(this);
        if (this.pageConfig.requestOptions) {
            const {url, method, params} = this.pageConfig.requestOptions;
            this.initData(url, method, params);
        }
    },
    mounted() {
        console.log()
        this.tableHeight = this.$refs.dyTable.clientHeight - this.$refs.query.clientHeight - 110;
    },
    data() {
        return {
            data: [],
            queryParams: {},
            currentPage: 1,
            totalCount: 3,
            pageSize: 10,

            loading: true,

            tableHeight: ''
        }
    },
    methods: {
        handleCurrentChange(page, pageSize) {
            console.log("Current page change！")
        },
        handleSizeChange(current, size) {
            console.log("Page size change！")
            this.pageSize = size;
        },
        handleClick(event, row) {
            this.$emit('handleClick', event, row);
        },
        refresh() {
            const {url, method, params} = this.pageConfig.requestOptions;
            this.initData(url, method, params);
        },
        async initData(url, method, params) {
            this.loading = true;
            this.$request({
                url: url,
                method: method,
                data: params
            }).then(res => {
                if (res.data.status == '200') {
                    res.data.data.list.forEach(item => {
                        for (let data in item) {
                            if (!item[data] || item[data] === 'null') {
                                item[data] = '';
                            }
                        }
                        return item;
                    })
                    this.data = res.data.data.list;
                    this.totalCount = this.data.length;
                    this.loading = false;
                }else if (res.data.status == '403') {
                    localStorage.removeItem('Authorization');
                    localStorage.removeItem('username');
                    this.$modal.warning({
                        title: '登陆超时，请重新登录',
                        okText: '确 定',
                        centered: true,
                        maskClosable: false,
                        onOk: () => {
                            parent.location.reload();
                        }
                    })
                }
            })
        },
        //查询
        queryPage() {
            let queryParams = this.queryParams;
            for (let item in queryParams) {
                if (queryParams[item] === '') {
                    delete queryParams[item];
                }
            }
            const {url, method, params} = this.pageConfig.requestOptions;
            Object.assign(queryParams, params);
            this.initData(url, method, queryParams);
        },
        //重置查询条件
        resetQuery() {
            this.queryParams = {};
            this.refresh();
        },
        keyRules(e) {
            if (e.key == 'e' || e.key == 'E' || e.key == '+' || e.key == '-' || e.key == '.'){
                e.returnValue = false;
            }
        }
    }
}
</script>

<style>
.dynamic-table {
    height: 100vh;
}
.table-top {
    padding: 5px 10px;
}
.table {
    padding: 5px 10px;
    margin-bottom: 0!important;
    /*max-height: calc(100vh - 90px);*/
    /*overflow-y: auto;*/
}
.table table {
    border-bottom: 1px solid #e8e8e8!important;
}
.table .ant-table-body {
    overflow: auto;
}
.refresh-button {
    position: fixed;
    right: 2px;
    top: 2px;
    font-size: 18px;
    color: dimgray;
    z-index: 2;
}
.handle-btn {
    margin-right: 5px;
    margin-bottom: 5px;
}
.pagination-container {
    width: 100%;
    position: fixed;
    bottom: 5px;
    display: flex;
    justify-content: center;
}
.query-box {
    padding: 0px 10px;
    width: 100%;
}
.query-button-container button {
    margin-right: 7px;
}

.dynamic-table .query-box input::-webkit-outer-spin-button,
.dynamic-table .query-box input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
.dynamic-table .query-box input[type="number"] {
    -moz-appearance: textfield;
}
</style>