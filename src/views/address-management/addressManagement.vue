<template>
    <div>
        <dynamic-table ref="table" :pageConfig="config" @handleClick="handleClick">

        </dynamic-table>
        <a-modal dialogClass="form-modal" v-model="visible" centered
                 title="常用地址" :footer="null"
                 @cancel="handleClose">
            <a-spin :spinning="loading" style="width: 100%;">
                <a-icon slot="indicator" type="loading" style="font-size: 30px; margin: 0 auto;" spin />
                <a-list :data-source="addressList">
                    <a-list-item slot="renderItem" slot-scope="item">
                        <a slot="actions" v-if="item.state" @click="setDefault(item.id, item.userId)">设为默认</a>
                        <a-list-item-meta>
                            <p slot="title">{{ item.province }} {{item.city}} {{item.county}} {{item.street}} {{item.detailAddress}}
                                <a-tag v-if="!item.state" color="red">默认</a-tag>
                            </p>
                        </a-list-item-meta>
                    </a-list-item>
                </a-list>
            </a-spin>
        </a-modal>
    </div>
</template>

<script>
import {pageConfig} from "./addressManagementConfig";

export default {
    name: "addressManagement",
    data() {
        return {
            config: pageConfig,

            addressList: [],
            loading: true,

            visible: false,
            labelCol: { span: 6 },
            wrapperCol: { span: 17 },
            layout: 'horizontal',

            currentUserId: ''
        }
    },
    methods: {
        handleClick(event, row) {
            switch(event) {
                case 'addressList':
                    this.addressList = []
                    this.currentUserId = row.userId;
                    this.loading = true;
                    this.visible = true;
                    this.getAddressData(this.currentUserId)
                    break;
            }
        },
        handleClose() {
            // this.addressList = [];
            this.currentUserId = '';
        },
        getAddressData(userId) {
            this.$request({
                url: '/userAddress/commonAddressList',
                method: 'POST',
                data: {
                    userId: userId
                }
            }).then(res => {
                if (res.data.status == '200') {
                    this.addressList = res.data.data;
                    this.loading = false;
                }else {
                    this.$message.warning(res.data.desc);
                }
            })
        },
        setDefault(id, userId) {
            this.loading = true;
            this.$request({
                url: '/userAddress/setDefaultAddress',
                method: 'POST',
                data: {
                    id: id,
                    userId: userId
                }
            }).then(res => {
                if (res.data.status == '200') {
                    this.getAddressData(this.currentUserId);
                }else {
                    this.$message.warning(res.data.desc);
                }
            })
        }
    }
}
</script>

<style>
.form-modal {
    width: 70%!important;
    min-width: 600px;
}
.form-modal .ant-modal-content .ant-modal-body{
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