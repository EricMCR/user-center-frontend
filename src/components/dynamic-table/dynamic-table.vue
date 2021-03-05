<template>
    <div :class="className">
        <a-table class="table" :data-source="data" :bordered="true" rowKey="id" :pagination="false">
            <a-table-column v-for="item in columns" :key="item.key" :title="item.title" :data-index="item.key" :width="item.width">
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

            <a-table-column class="handle-container" v-if="handle" :title="handle.title" :width="handle.width" key="handle">
                <template slot-scope="scope">
                    <a-button v-for="btn in handle.btns" class="handle-btn" :size="handle.size" :key="btn.event" :type="btn.type" :icon="btn.icon" @click="handleClick(btn.event, scope.row, scope.$index)">
                        {{btn.label}}
                    </a-button>
                </template>

            </a-table-column>
        </a-table>
        <div class="pagination-container">
            <a-pagination show-size-changer show-quick-jumper :show-total="total => `共 ${total} 条`" :default-current="currentPage" :total="totalCount" :page-size="pageSize"
                          @showSizeChange="handleSizeChange" @change="handleCurrentChange"/>
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
            default: () => []
        },
        //操作栏配置
        handle: {
            type: Object,
            default: () => {}
        },
        // 列表数据
        data: {
            type: Array,
            default: () => []
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
        handleCurrentChange(page, pageSize) {
            console.log("Current page change！")
        },
        handleSizeChange(current, size) {
            console.log("Page size change！")
            this.pageSize = size;
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
.handle-btn {
    margin-right: 5px;
    margin-bottom: 5px;
}
.pagination-container {
    display: flex;
    justify-content: center;
}
</style>