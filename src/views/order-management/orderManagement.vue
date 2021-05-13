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

        <a-modal dialogClass="form-modal" v-model="visible2" centered
                 title="订单评价"
                 @cancel="handleClose2" :width="600"
                 :footer="null">
            <a-spin :spinning="loading" style="width: 100%;">
                <a-icon slot="indicator" type="loading" style="font-size: 30px; margin: 0 auto;" spin/>
                <a-comment>
                    <template slot="author">
                        <p style="font-size: 16px;">{{ commentData.nickname ? commentData.nickname : '匿名用户' }}</p>
                    </template>
                    <template slot="avatar">
                        <a-avatar
                            shape="circle"
                            size="default"
                            :style="{ backgroundColor: '#f56a00', verticalAlign: 'middle' }">
                            {{ commentData.nickname ? commentData.nickname[0] : '用户' }}
                        </a-avatar>
                    </template>
                    <p slot="content">
                        {{ commentData.comments }}
                    </p>
                    <template slot="actions">
                        <p style="font-size: 13px;">{{ commentData.createTime }}</p>
                    </template>
                    <template slot="datetime">
                        <a-rate :value="commentData.score" disabled/>
                    </template>
                </a-comment>
            </a-spin>
        </a-modal>

        <a-modal dialogClass="form-modal" v-model="visible3" centered
                 title="查看原因" @cancel="handleClose"
                 :footer="null">
            <a-icon slot="indicator" type="loading" style="font-size: 30px; margin: 0 auto;" spin/>
            <a-descriptions :column="1">
                <a-descriptions-item label="订单状态">
                    {{ form.stateName }}
                </a-descriptions-item>
                <a-descriptions-item label="取消原因">
                    {{ form.reason }}
                </a-descriptions-item>
            </a-descriptions>
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
            layout: 'horizontal',

            //订单评价
            visible2: false,
            loading: true,
            commentData: {
                id: '',
                nickname: '',
                mobileNo: '',
                orderNo: '',
                comments: '',
                score: 0,
                createTime: '',
                lastUpdateTime: ''
            },

            visible3: false
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
                case 'comment':
                    this.loading = true;
                    this.visible2 = true;
                    this.initComment(row.id);
                    break;
                case 'reason':
                    Object.assign(this.form, row);
                    this.visible3 = true;
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
        handleClose2() {
            this.commentData = {
                id: '',
                nickname: '',
                mobileNo: '',
                orderNo: '',
                comments: '',
                score: 0,
                createTime: '',
                lastUpdateTime: ''
            }
        },
        keyRules(e) {
            if (e.key == 'e' || e.key == 'E' || e.key == '+' || e.key == '-' || e.key == '.') {
                e.returnValue = false;
            }
        },
        initComment(id) {
            this.$request({
                url: '/userOrder/comment',
                method: 'POST',
                data: {
                    id: id
                }
            }).then(res => {
                if (res.data.status == '200') {
                    this.commentData = res.data.data;
                    this.loading = false;
                } else {
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

.form-modal .ant-comment {
    width: 100%;
}

.form-modal .ant-comment-content-author-time {
    color: rgba(0, 0, 0, 0.65);
}

.form-modal .ant-comment-actions {
    display: flex;
    flex-direction: row-reverse;
}

.main-box .login-box input::-webkit-outer-spin-button,
.main-box .login-box input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

.main-box .login-box input[type="number"] {
    -moz-appearance: textfield;
}
</style>