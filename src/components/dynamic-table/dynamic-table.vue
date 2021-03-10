<template>
    <div :class="pageConfig.className">
        <a-spin :spinning="loading">
            <div class="table-top">
                <slot name="table-top"></slot>
            </div>
            <a-icon class="refresh-button" @click="refresh" type="reload" />
            <a-icon slot="indicator" type="loading" style="font-size: 30px" spin />
            <a-table class="table" :data-source="data" :bordered="true" rowKey="id" :pagination="false">
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
        //表格配置（className：自定义类名，columns：表格列配置，handle：操作栏配置）
        pageConfig: {
            type: Object,
            default: () => {}
        }
    },
    created() {
        if (this.pageConfig.requestOptions) {
            const {url, method, params} = this.pageConfig.requestOptions;
            this.initData(url, method, params);
        }
    },
    data() {
        return {
            data: [],
            currentPage: 1,
            totalCount: 3,
            pageSize: 10,

            loading: true
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
                if (res.status == '200') {
                    this.data = res.data.data.list;
                    this.totalCount = this.data.length;
                    this.loading = false;
                }
            })
        }
    }
}
</script>

<style>
.table-top {
    padding: 5px 10px;
}
.table {
    padding: 5px 10px;
    margin-bottom: 0!important;
    max-height: calc(100vh - 90px);
    overflow-y: auto;
}
.table table {
    border-bottom: 1px solid #e8e8e8!important;
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
</style>