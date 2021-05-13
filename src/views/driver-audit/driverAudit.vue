<template>
    <div>
        <dynamic-table ref="table" :pageConfig="config" @handleClick="handleClick">

        </dynamic-table>

        <a-modal dialogClass="form-modal" v-model="visible" centered
                 title="审核信息" @cancel="handleClose"
                 :footer="null">
            <a-spin :spinning="loading" style="width: 100%;">
                <a-icon slot="indicator" type="loading" style="font-size: 30px; margin: 0 auto;" spin/>
                <a-descriptions :column="1">
                    <a-descriptions-item label="审核结果">
                        {{ form.stateName }}
                    </a-descriptions-item>
                    <a-descriptions-item label="审核备注">
                        {{ form.audit }}
                    </a-descriptions-item>
                </a-descriptions>
            </a-spin>
        </a-modal>

        <a-modal dialogClass="form-modal2" v-model="visible2" centered
                 title="审核详情" @cancel="handleClose">
            <a-spin :spinning="loading2" style="width: 100%;">
                <a-icon slot="indicator" type="loading" style="font-size: 30px; margin: 0 auto;" spin/>
                <a-descriptions :column="2">
                    <a-descriptions-item label="姓名">
                        {{ form.name }}
                    </a-descriptions-item>
                    <a-descriptions-item label="性别">
                        {{ form.sex }}
                    </a-descriptions-item>
                    <a-descriptions-item label="年龄">
                        {{ form.age }}
                    </a-descriptions-item>
                    <a-descriptions-item label="手机号">
                        {{ form.phone }}
                    </a-descriptions-item>
                    <a-descriptions-item label="身份证号">
                        {{ form.idCard }}
                    </a-descriptions-item>
                    <a-descriptions-item label="驾照" :span="2">
                        <figure class="image is-128x128" @click="openImg" style="cursor: pointer;">
                            <img :src="form.licenseImg">
                        </figure>
                    </a-descriptions-item>
                </a-descriptions>
            </a-spin>
            <template slot="footer">
                <a-button key="back" @click="handleClose">
                    取消
                </a-button>
                <a-button key="refuse" type="danger" @click="handleRefuse">
                    拒绝
                </a-button>
                <a-button key="approve" type="primary" @click="handleApprove">
                    通过
                </a-button>
            </template>
        </a-modal>

        <a-modal dialogClass="form-modal3" v-model="visible3" centered
                 :footer="null">
            <figure>
                <img style="border-radius: 4px; width: 100%; height: 100%;"
                     :src="form.licenseImg">
            </figure>
        </a-modal>

        <a-modal dialogClass="form-modal4" v-model="visible4" centered title="审核拒绝"
                 @ok="submitRefuse">
            <a-form-model ref="form" :model="form" :rules="rules" layout="horizontal" labelAlign="left"
                          :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-form-model-item label="拒绝原因" prop="auditRemark">
                    <a-input v-model="form.auditRemark" placeholder="请输入"></a-input>
                </a-form-model-item>
            </a-form-model>
        </a-modal>
    </div>
</template>

<script>
import {pageConfig} from "./driverAuditConfig";

export default {
    name: "clientAudit",
    data() {
        return {
            config: pageConfig,

            form: {
                age: "",
                audit: "",
                createTime: "",
                id: "",
                idCard: "",
                licenseImg: "",
                name: "",
                phone: "",
                sex: "",
                state: '',
                stateName: "",
                updateTime: "",
                auditRemark: ''
            },
            rules: {
                auditRemark: [
                    {required: true, message: '请输入原因', trigger: 'change'}
                ]
            },



            loading: true,
            visible: false,

            loading2: true,
            visible2: false,

            visible3: false,
            visible4: false,

            labelCol: {span: 5},
            wrapperCol: {span: 17},
            layout: 'horizontal',

        }
    },
    methods: {
        handleClick(event, row) {
            switch (event) {
                case 'remark':
                    this.loading = true;
                    this.visible = true;
                    Object.assign(this.form, row)
                    this.loading = false;
                    break;
                case 'audit':
                    this.loading2 = true;
                    this.visible2 = true;
                    Object.assign(this.form, row)
                    this.loading2 = false;
                    break;
            }
        },
        handleClose() {
            this.visible2 = false;
            this.form = {
                age: "",
                audit: "",
                createTime: "",
                id: "",
                idCard: "",
                licenseImg: "",
                name: "",
                phone: "",
                sex: "",
                state: '',
                stateName: "",
                updateTime: ""
            }
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
                    this.commentList = res.data.data.list;
                    console.log(this.commentList)
                    this.loading = false;
                } else {
                    this.$message.warning(res.data.desc);
                }
            })
        },
        handleRefuse() {
            this.visible4 = true;

        },
        submitRefuse() {
            this.$refs['form'].validate(valid => {
                if (valid) {
                    this.$request({
                        url: '/driver/refused',
                        method: 'POST',
                        data: {
                            id: this.form.id,
                            audit: this.form.auditRemark
                        }
                    }).then(res => {
                        if (res.data.status == '200') {
                            this.$message.success('操作成功');
                            this.visible4 = false;
                            this.visible2 = false;
                            this.$refs.table.refresh();
                        } else {
                            this.$message.warning(res.data.desc);
                        }
                    })
                }
            })
        },
        handleApprove() {
            this.$request({
                url: '/driver/approved',
                method: 'POST',
                data: {
                    id: this.form.id
                }
            }).then(res => {
                if (res.data.status == '200') {
                    this.$message.success('操作成功');
                    this.visible2 = false;
                    this.$refs.table.refresh();
                } else {
                    this.$message.warning(res.data.desc);
                }
            })
        },
        openImg() {
            this.visible3 = true;
        }
    }
}
</script>

<style>
.form-modal, .form-modal2 .ant-modal-content .ant-modal-body {
    padding: 15px 23px;
    max-height: calc(100vh - 160px);
    overflow-y: auto;
}

.form-modal {
    width: 650px !important;
}

.form-modal2, .form-modal3 {
    width: 70% !important;
    min-width: 650px;
}

.form-modal3 .ant-modal-body {
    padding: 0px;
}

.main-box .login-box input::-webkit-outer-spin-button,
.main-box .login-box input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

.main-box .login-box input[type="number"] {
    -moz-appearance: textfield;
}
</style>