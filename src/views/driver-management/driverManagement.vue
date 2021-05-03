<template>
    <div>
        <dynamic-table ref="table" :pageConfig="config" @handleClick="handleClick">

        </dynamic-table>
        <a-modal dialogClass="form-modal" v-model="visible" centered
                 title="评价列表" @cancel="handleClose" :width="450"
                 :footer="null">

        </a-modal>
    </div>
</template>

<script>
import {pageConfig} from "./driverManagementConfig";

export default {
    name: "clientManagement",
    data() {
        return {
            config: pageConfig,

            commentList: [],

            visible: false,
            labelCol: {span: 6},
            wrapperCol: {span: 17},
            layout: 'horizontal',
        }
    },
    methods: {
        handleClick(event, row) {
            switch (event) {
                case 'comment':
                    this.getCommentData(row.id)
                    break;
            }
        },
        handleClose() {
            this.commentList = []
            console.log('sss')
        },
        getCommentData(driverId) {
            this.$request({
                url: '/drivercomment/selectPage',
                method: 'POST',
                data: {
                    driverId: driverId
                }
            }).then(res => {
                if (res.data.status == '200') {
                    this.commentList = res.data.list;
                    this.visible = true;
                }else {
                    this.$message.warning(res.data.desc);
                }
            })
        }
    }
}
</script>

<style>
.form-modal .ant-modal-content .ant-modal-body {
    max-height: calc(100vh - 160px);
    overflow-y: auto;
}

.main-box .login-box input::-webkit-outer-spin-button,
.main-box .login-box input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

.main-box .login-box input[type="number"] {
    -moz-appearance: textfield;
}
</style>