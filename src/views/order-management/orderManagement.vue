<template>
    <div>
        <dynamic-table ref="table" :pageConfig="config" :formatData="config.formatData" @handleClick="handleClick">

        </dynamic-table>
        <a-modal dialogClass="form-modal" v-model="visible" centered
                 title="变更目的地"
                 @cancel="handleClose" @ok="submitForm('form')" :width="450">
            <a-form-model ref="form" :model="form" :rules="rules" layout="horizontal" labelAlign="left"
                          :label-col="labelCol" :wrapper-col="wrapperCol">

                <a-form-model-item label="姓名" prop="userName">
                    {{ form.userName }}
                </a-form-model-item>
                <a-form-model-item label="出发地" prop="fromAddress">
                    {{ form.fromAddress }}
                </a-form-model-item>
                <h2>目的地:</h2>
                <a-form-model-item label="省份" prop="toProvince">
                    <a-input v-model="form.toProvince" placeholder="请输入"></a-input>
                </a-form-model-item>
                <a-form-model-item label="城市" prop="toCity">
                    <a-input v-model="form.toCity" placeholder="请输入"></a-input>
                </a-form-model-item>
                <a-form-model-item label="县/区" prop="toCounty">
                    <a-input v-model="form.toCounty" placeholder="请输入"></a-input>
                </a-form-model-item>
                <a-form-model-item label="街道" prop="toStreet">
                    <a-input v-model="form.toStreet" placeholder="请输入"></a-input>
                </a-form-model-item>

            </a-form-model>
        </a-modal>
    </div>
</template>

<script>
import {pageConfig} from "./orderManagementConfig";

export default {
    name: "clientManagement",
    data() {
        return {
            config: pageConfig,

            form: {
                id: '',
                userName: '',
                fromAddress: '',
                toProvince: '',
                toCity: '',
                toCounty: '',
                toStreet: ''
            },
            rules: {
                toProvince: [
                    {required: true, message: '请输入省份', trigger: 'change'}
                ],
                toCity: [
                    {required: true, message: '请输入城市', trigger: 'change'}
                ],
                toCounty: [
                    {required: true, message: '请输入县/区', trigger: 'change'}
                ],
                toStreet: [
                    {required: true, message: '请输入街道', trigger: 'change'}
                ]
            },

            visible: false,
            labelCol: {span: 4},
            wrapperCol: {span: 19},
            layout: 'horizontal'
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let params = {
                        id: this.form.id,
                        toProvince: this.form.toProvince,
                        toCity: this.form.toCity,
                        toCounty: this.form.toCounty,
                        toStreet: this.form.toStreet
                    };

                    this.$request({
                        url: '/userOrder/update',
                        method: 'POST',
                        data: params
                    }).then(res => {
                        if (res.data.status == '200') {
                            this.$message.success('操作成功');
                            this.visible = false;
                            this.handleClose();
                            this.$refs.table.refresh();
                        } else {
                            this.$message.warning(res.data.desc);
                        }
                    })
                }
            })
        },
        handleClick(event, row) {
            switch (event) {
                case 'edit':
                    Object.assign(this.form, row);
                    this.visible = true;
                    break;
            }
        },
        handleClose() {
            this.$refs['form'].clearValidate();
            this.form = {
                id: '',
                userName: '',
                fromAddress: '',
                toProvince: '',
                toCity: '',
                toCounty: '',
                toStreet: ''
            }
        },
        keyRules(e) {
            if (e.key == 'e' || e.key == 'E' || e.key == '+' || e.key == '-' || e.key == '.') {
                e.returnValue = false;
            }
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