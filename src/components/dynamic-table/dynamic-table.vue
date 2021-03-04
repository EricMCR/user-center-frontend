<template>
    <div :class="className">
        <a-table class="table" :data-source="data" :bordered="true" rowKey="id" :pagination="false">
            <a-table-column v-for="item in columns" :key="item.key" :title="item.title" :data-index="item.key">
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
        </a-table>
        <div class="pagination-container">
            <a-pagination show-size-changer show-quick-jumper :show-total="total => `共 ${total} 条`" :default-current="currentPage" :total="totalCount" :page-size="pageSize"/>
        </div>

    </div>
</template>

<script>
export default {
    name: "dynamic-table",
    props: {
        // 自定义类名
        className: {
            type: String,
            default: ''
        },
        // 表格字段配置
        columns: {
            type: Array,
            default: () => [
                {
                    key: 'name',
                    title: '姓名',
                    type: ''
                },
                {
                    key: 'age',
                    title: '年龄',
                    type: ''
                },
                {
                    key: 'sex',
                    title: '性别',
                    type: 'tag'
                }
            ]
        },
        // 列表数据
        data: {
            type: Array,
            default: () => [
                {
                    id: '2313',
                    name: '马超然',
                    age: 22,
                    sex: 1
                },
                {
                    id: '2323',
                    name: '马超然',
                    age: 22,
                    sex: 2
                },
                {
                    id: '1253',
                    name: '马超然',
                    age: 22,
                    sex: [1,4,5]
                }
            ]
        }
    },
    data() {
        return {
            currentPage: 1,
            totalCount: 3,
            pageSize: 10
        }
    },
    methods: {
        handleChangePage() {

        }
    }
}
</script>

<style>
.table {
    padding: 10px;
    margin-bottom: 0!important;
}
.table table {
    border-bottom: 1px solid #e8e8e8!important;
}
.pagination-container {
    display: flex;
    justify-content: center;
}
</style>