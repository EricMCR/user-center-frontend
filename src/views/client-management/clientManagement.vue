<template>
    <div>
        <dynamic-table ref="table" :pageConfig="config" @handleClick="handleClick">

<!--            <a-button slot="query-button" type="primary" icon="plus" @click="handleAdd">新增</a-button>-->

        </dynamic-table>
        <a-modal dialogClass="form-modal" v-model="visible" centered
                 :title="editType === 1 ? '新增客户' : editType === 2 ? '编辑客户' : '修改密码'"
                 @cancel="handleClose" @ok="submitForm('form')" :width="450">
            <a-form-model ref="form" :model="form" :rules="rules" layout="horizontal" labelAlign="left"
                          :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-form-model-item label="姓名" prop="name">
                    <a-input v-model="form.name" placeholder="请输入"></a-input>
                </a-form-model-item>
                <a-form-model-item label="昵称" prop="nickname">
                    <a-input v-model="form.nickname" placeholder="请输入"></a-input>
                </a-form-model-item>
                <a-form-model-item label="性别" prop="sex">
                    <a-select v-model="form.sex" placeholder="请选择">
                        <a-select-option key="男" value="男">男</a-select-option>
                        <a-select-option key="女" value="女">女</a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="手机号" prop="mobileNo">
                    <a-input v-model="form.mobileNo" placeholder="请输入" type="number" @keydown.native="keyRules"> </a-input>
                </a-form-model-item>
            </a-form-model>
        </a-modal>
    </div>
</template>

<script>
import {pageConfig} from "./clientManagementConfig";

export default {
    name: "clientManagement",
    data() {
        return {
            config: pageConfig,

            isEdit: false,
            editType: 1, // 1-新增，2-编辑,3-修改状态
            form: {
                id: '',
                name: '',
                nickname: '',
                sex: '',
                mobileNo: '',
                idCard: '',
                state: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'change' }
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: 'change' }
                ],
                nickname: [
                    { required: true, message: '请输入昵称', trigger: 'change' }
                ],
                mobileNo: [
                    { required: true, message: '请输入手机号', trigger: 'change' },
                    { max: 11, message: '手机号不正确', trigger: 'change' }
                ]
            },

            visible: false,
            labelCol: { span: 6 },
            wrapperCol: { span: 17 },
            layout: 'horizontal',

            authList: [
                {
                    label: '普通员工',
                    value: 0
                },
                {
                    label: '组长',
                    value: 1
                },
                {
                    label: '总监',
                    value: 2
                }
            ]
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let params = {};
                    let api = '';
                    switch (this.editType) {
                        case 1:
                            params = {
                                name: this.form.name,
                                sex: this.form.sex,
                                age: this.form.age,
                                phone: this.form.phone,
                                auth: this.form.auth,
                                password: this.form.password
                            }
                            api = 'add';
                            break;
                        case 2:
                            params = {
                                id: this.form.id,
                                name: this.form.name,
                                sex: this.form.sex,
                                age: this.form.age,
                                phone: this.form.phone,
                                auth: this.form.auth
                            }
                            api = 'update';
                            break;
                        case 3:
                            params = {
                                id: this.form.id,
                                oldPassword: this.form.oldPassword,
                                newPassword: this.form.password
                            }
                            api = 'updateState';
                            break;
                    }
                    this.$request({
                        url: '/admin/' + api,
                        method: 'POST',
                        data: params
                    }).then(res => {
                        if (res.data.status == '200') {
                            this.$message.success('操作成功');
                            this.visible = false;
                            this.handleClose();
                            this.$refs.table.refresh();
                        }else {
                            this.$message.warning(res.data.desc);
                        }
                    })
                }
            })
        },
        handleAdd() {
            this.editType = 1;
            this.visible = true;
        },
        handleClick(event, row) {
            switch(event) {
                case 'edit':
                    this.editType = 2;
                    Object.assign(this.form, row);
                    this.form.idCard = '';
                    this.visible = true;
                    break;
                case 'editPwd':
                    this.editType = 3;
                    Object.assign(this.form, row);
                    this.form.idCard = '';
                    this.visible = true;
                    break;
                case 'delete':
                    this.$modal.confirm({
                        title: '删除管理员',
                        content: '确认要删除管理员【'+row.name+'】吗？',
                        onOk: () => {
                            this.$request({
                                url: '/admin/delete',
                                method: 'DELETE',
                                data: {
                                    id: row.id
                                }
                            }).then(res => {
                                if (res.data.status == '200') {
                                    this.$message.success('操作成功');
                                    this.$refs.table.refresh();
                                }else {
                                    this.$message.warning(res.data.msg);
                                }
                            })
                        }
                    })
                    break;
            }
        },
        handleClose() {
            this.$refs['form'].clearValidate();
            this.form = {
                id: '',
                name: '',
                nickname: '',
                sex: '',
                mobileNo: '',
                idCard: '',
                state: ''
            }
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