<template>
    <div>
        <dynamic-table ref="table" :pageConfig="config" @handleClick="handleClick">
            <a-button slot="query-button" type="primary" icon="plus" @click="handleAdd">新增</a-button>
        </dynamic-table>
        <a-modal dialogClass="form-modal" v-model="visible" centered
                 :title="editType === 1 ? '新增管理员' : editType === 2 ? '编辑管理员' : '修改密码'"
                 @cancel="handleClose" @ok="submitForm('form')" :width="450">
            <a-form-model ref="form" :model="form" :rules="rules" layout="horizontal" labelAlign="left"
                          :label-col="labelCol" :wrapper-col="wrapperCol">
                <template v-if="editType === 1 || editType === 2">
                    <a-form-model-item label="姓名" prop="name">
                        <a-input v-model="form.name" placeholder="请输入"></a-input>
                    </a-form-model-item>
                    <a-form-model-item label="性别" prop="sex">
                        <a-select v-model="form.sex" placeholder="请选择">
                            <a-select-option key="男" value="男">男</a-select-option>
                            <a-select-option key="女" value="女">女</a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="年龄" prop="age">
                        <a-input v-model="form.age" placeholder="请输入" type="number" @keydown.native="keyRules"></a-input>
                    </a-form-model-item>
                    <a-form-model-item label="手机号" prop="phone">
                        <a-input v-model="form.phone" placeholder="请输入" type="number" @keydown.native="keyRules"> </a-input>
                    </a-form-model-item>
                    <a-form-model-item label="权限" prop="auth">
                        <a-select v-model="form.auth" placeholder="请选择">
                            <a-select-option v-for="item in authList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                        </a-select>
                    </a-form-model-item>
                </template>

                <a-form-model-item v-if="editType === 3" label="原密码" prop="oldPassword">
                    <a-input-password v-model="form.oldPassword" placeholder="请输入"> </a-input-password>
                </a-form-model-item>
                <a-form-model-item v-if="editType === 1 || editType === 3" label="设置新密码" prop="password">
                    <a-input-password v-model="form.password" placeholder="请输入"> </a-input-password>
                </a-form-model-item>
                <a-form-model-item v-if="editType === 3" label="确认新密码" prop="confirmPassword">
                    <a-input-password v-model="form.confirmPassword" placeholder="请输入"> </a-input-password>
                </a-form-model-item>
            </a-form-model>
        </a-modal>
    </div>
</template>

<script>
import {pageConfig} from "./adminManagementConfig";

export default {
    name: "adminManagement",
    data() {
        let validatePwd = (rule, value, callback) => {
            if (value !== this.form.password) {
                callback(new Error("两次输入不一致"));
            } else {
                callback();
            }
        };
        return {
            config: pageConfig,

            isEdit: false,
            editType: 1, // 1-新增，2-编辑,3-修改密码
            form: {
                id: '',
                name: '',
                sex: '',
                age: '',
                phone: '',
                auth: '',
                authName: '',
                password: '',
                oldPassword: '',
                confirmPassword: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'change' }
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: 'change' }
                ],
                age: [
                    { required: true, message: '请输入年龄', trigger: 'change' }
                ],
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'change' },
                    {max: 11, message: '手机号不正确', trigger: 'change' }
                ],
                auth: [
                    { required: true, message: '请选择权限', trigger: 'change' }
                ],
                password: [
                    { required: true, message: '请设置密码', trigger: 'change' },
                    { min: 6, message: '密码最少6位', trigger: 'change' }
                ],
                oldPassword: [
                    { required: true, message: '请输入原密码', trigger: 'change' }
                ],
                confirmPassword: [
                    { required: true, message: '请再次输入新密码', trigger: 'change' },
                    { validator: validatePwd, trigger: 'change'}
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
                            api = 'updatePwd';
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
                    this.visible = true;
                    break;
                case 'editPwd':
                    this.editType = 3;
                    Object.assign(this.form, row);
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
                sex: '',
                age: '',
                phone: '',
                auth: '',
                authName: '',
                password: ''
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